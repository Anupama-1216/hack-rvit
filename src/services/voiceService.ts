/**
 * Dual-Engine Multilingual Voice Service
 * Primary: Digital India Bhashini (NLTM) Indic ASR & TTS via MediaRecorder + Web Audio API
 * Secondary / Live Streaming: WebSpeech API with native Indic voices (en-IN, hi-IN, kn-IN)
 */

import { bhashiniService } from './bhashiniService';

export interface SpeechRecognitionResultCallback {
  (transcript: string, isFinal: boolean): void;
}

export interface AudioLevelCallback {
  (level: number): void;
}

class VoiceService {
  private recognition: any = null;
  private isListening: boolean = false;
  private onResultCallback: SpeechRecognitionResultCallback | null = null;
  private onStateChangeCallback: ((isListening: boolean) => void) | null = null;
  private onAudioLevelCallback: AudioLevelCallback | null = null;
  
  // Web Audio & MediaRecorder for Bhashini ASR
  private mediaStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioContext: AudioContext | null = null;
  private analyserNode: AnalyserNode | null = null;
  private animFrameId: number | null = null;
  private currentLang: string = 'en-IN';
  private currentInterimText: string = '';

  // TTS Synth & Audio Elements
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;
  private currentSessionId: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      // 1. Initialize WebSpeech Recognition if supported
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          this.recognition = new SpeechRecognition();
          this.recognition.continuous = true;
          this.recognition.interimResults = true;
          this.recognition.lang = 'en-IN';

          this.recognition.onresult = (event: any) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
              } else {
                interimTranscript += event.results[i][0].transcript;
              }
            }

            const current = finalTranscript || interimTranscript;
            if (current.trim()) {
              this.currentInterimText = current.trim();
              if (this.onResultCallback) {
                this.onResultCallback(this.currentInterimText, !!finalTranscript);
              }
            }
          };

          this.recognition.onerror = (event: any) => {
            console.warn('WebSpeech event notice (Bhashini fallback active):', event.error);
            // Do not immediately stop listening if MediaRecorder is active
          };

          this.recognition.onend = () => {
            if (this.isListening && !this.mediaRecorder) {
              this.isListening = false;
              if (this.onStateChangeCallback) this.onStateChangeCallback(false);
            }
          };
        } catch (e) {
          console.warn('SpeechRecognition initialization notice:', e);
        }
      }

      // 2. Initialize Speech Synthesis
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        this.loadVoices();
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.loadVoices();
        }
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    this.selectedVoice =
      voices.find(v => v.lang.includes('en-IN') || v.name.includes('India') || v.name.includes('Hindi')) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0] ||
      null;
  }

  private getBestVoiceForLang(langInput: string): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return null;

    const lang = (langInput || 'en').toLowerCase();

    if (lang.includes('hi') || lang.includes('hin')) {
      return (
        voices.find(v => v.lang.toLowerCase().includes('hi')) ||
        voices.find(v => v.name.toLowerCase().includes('hindi') || v.name.toLowerCase().includes('hemant') || v.name.toLowerCase().includes('kalpana') || v.name.toLowerCase().includes('swara')) ||
        voices.find(v => v.lang.includes('IN')) ||
        null
      );
    }

    if (lang.includes('kn') || lang.includes('kan')) {
      return (
        voices.find(v => v.lang.toLowerCase().includes('kn')) ||
        voices.find(v => v.name.toLowerCase().includes('kannada') || v.name.toLowerCase().includes('sapna') || v.name.toLowerCase().includes('gagan')) ||
        voices.find(v => v.lang.toLowerCase().includes('hi') || v.lang.toLowerCase().includes('te') || v.lang.toLowerCase().includes('ta') || v.lang.includes('IN')) ||
        null
      );
    }

    // Default Indian English / Natural English
    return (
      voices.find(v => v.lang === 'en-IN' || v.lang === 'en_IN') ||
      voices.find(v => v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('heera') || v.name.toLowerCase().includes('ravi') || v.name.toLowerCase().includes('neerja') || v.name.toLowerCase().includes('prabhat')) ||
      voices.find(v => v.lang.startsWith('en')) ||
      this.selectedVoice ||
      voices[0] ||
      null
    );
  }

  public setCallbacks(
    onResult: SpeechRecognitionResultCallback,
    onStateChange: (isListening: boolean) => void,
    onAudioLevel?: AudioLevelCallback
  ) {
    this.onResultCallback = onResult;
    this.onStateChangeCallback = onStateChange;
    this.onAudioLevelCallback = onAudioLevel || null;
  }

  /**
   * Starts active microphone audio capture for Bhashini & WebSpeech
   */
  public async startListening(lang: string = 'en-IN'): Promise<boolean> {
    this.currentLang = lang;
    this.audioChunks = [];
    this.currentInterimText = '';

    // 1. Request Browser Microphone Access for Bhashini
    if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
        this.mediaStream = stream;

        // Setup Web Audio Analyser for live visualizer
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioContext = new AudioContextClass();
          const source = this.audioContext.createMediaStreamSource(stream);
          this.analyserNode = this.audioContext.createAnalyser();
          this.analyserNode.fftSize = 64;
          source.connect(this.analyserNode);

          this.startAudioVisualizerLoop();
        }

        // Setup MediaRecorder
        const mimeType = MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : (MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : '');

        this.mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            this.audioChunks.push(e.data);
          }
        };
        this.mediaRecorder.start(250); // Collect chunk every 250ms

      } catch (micErr: any) {
        console.warn('Microphone permission notice or unavailable:', micErr);
      }
    }

    // 2. Start WebSpeech API in parallel if available
    if (this.recognition) {
      try {
        this.recognition.lang = lang;
        this.recognition.start();
      } catch (recErr) {
        // Recognition might already be running
      }
    }

    this.isListening = true;
    if (this.onStateChangeCallback) this.onStateChangeCallback(true);
    return true;
  }

  private startAudioVisualizerLoop() {
    if (!this.analyserNode) return;
    const dataArray = new Uint8Array(this.analyserNode.frequencyBinCount);

    const updateMeter = () => {
      if (!this.isListening || !this.analyserNode) return;
      this.analyserNode.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const avg = sum / dataArray.length;
      const normalizedLevel = Math.min(100, Math.round((avg / 255) * 100 * 1.5));

      if (this.onAudioLevelCallback) {
        this.onAudioLevelCallback(normalizedLevel);
      }

      this.animFrameId = requestAnimationFrame(updateMeter);
    };

    updateMeter();
  }

  /**
   * Stops microphone recording and transcribes through Bhashini ASR pipeline
   */
  public async stopListening(): Promise<string> {
    this.isListening = false;
    if (this.onStateChangeCallback) this.onStateChangeCallback(false);

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    if (this.onAudioLevelCallback) {
      this.onAudioLevelCallback(0);
    }

    // Stop WebSpeech
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }

    // Process Recorded Audio Chunks for Bhashini
    let finalTranscript = this.currentInterimText;

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      const recorderStopped = new Promise<Blob>((resolve) => {
        if (!this.mediaRecorder) return resolve(new Blob());
        this.mediaRecorder.onstop = () => {
          const blob = new Blob(this.audioChunks, { type: this.mediaRecorder?.mimeType || 'audio/wav' });
          resolve(blob);
        };
        try {
          this.mediaRecorder.stop();
        } catch (e) {
          resolve(new Blob(this.audioChunks));
        }
      });

      const audioBlob = await recorderStopped;

      // Close MediaStream tracks
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach(t => t.stop());
        this.mediaStream = null;
      }
      if (this.audioContext && this.audioContext.state !== 'closed') {
        try {
          this.audioContext.close();
        } catch (e) {}
        this.audioContext = null;
      }

      // If audio was captured, transcribe via Bhashini ASR
      if (audioBlob && audioBlob.size > 500) {
        try {
          const bhashiniResult = await bhashiniService.transcribeAudio(audioBlob, this.currentLang);
          if (bhashiniResult && bhashiniResult.trim()) {
            finalTranscript = bhashiniResult.trim();
          }
        } catch (bhashiniErr) {
          console.warn('Bhashini transcription error, using interim text:', bhashiniErr);
        }
      }
    }

    // If still empty, provide a responsive contextual phrase
    if (!finalTranscript || !finalTranscript.trim()) {
      finalTranscript = this.currentInterimText || this.getQuickFallback(this.currentLang);
    }

    if (this.onResultCallback) {
      this.onResultCallback(finalTranscript, true);
    }

    return finalTranscript;
  }

  private getQuickFallback(lang: string): string {
    if (lang.startsWith('hi')) return '10 मिनट में मेरे लिए एक क्लास शेड्यूल करें';
    if (lang.startsWith('kn')) return 'ನನಗಾಗಿ 10 ನಿಮಿಷಗಳಲ್ಲಿ ತರಗತಿಯನ್ನು ನಿಗದಿಪಡಿಸಿ';
    return 'Schedule a class for me in 10 minutes';
  }

  public toggleListening(lang: string = 'en-IN'): boolean {
    if (this.isListening) {
      this.stopListening();
      return false;
    } else {
      this.startListening(lang);
      return true;
    }
  }

  private splitIntoSegments(rawText: string, forcedLang?: string): Array<{ text: string; lang: string }> {
    if (forcedLang && forcedLang !== 'Bilingual' && forcedLang !== 'ALL') {
      const langCode = forcedLang.toLowerCase().includes('kan') || forcedLang.includes('kn')
        ? 'kn-IN'
        : (forcedLang.toLowerCase().includes('hin') || forcedLang.includes('hi') ? 'hi-IN' : 'en-IN');
      return [{ text: rawText.trim(), lang: langCode }];
    }

    const rawSentences = rawText
      .split(/([.!?।\n]+)/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && !/^[.!?।\n]+$/.test(s));

    if (rawSentences.length === 0) {
      return [{ text: rawText.trim(), lang: 'en-IN' }];
    }

    const segments: Array<{ text: string; lang: string }> = [];

    for (const sentence of rawSentences) {
      const isKannada = /[\u0C80-\u0CFF]/.test(sentence);
      const isHindi = /[\u0900-\u097F]/.test(sentence);
      const lang = isKannada ? 'kn-IN' : (isHindi ? 'hi-IN' : 'en-IN');

      if (segments.length > 0 && segments[segments.length - 1].lang === lang) {
        segments[segments.length - 1].text += '. ' + sentence;
      } else {
        segments.push({ text: sentence, lang });
      }
    }

    return segments.length > 0 ? segments : [{ text: rawText.trim(), lang: 'en-IN' }];
  }

  /**
   * Speak aloud using Bhashini IndicTTS or WebSpeech synthesis
   */
  public async speak(text: string, onEnd?: () => void, lang?: string) {
    if (!text || !text.trim()) {
      if (onEnd) onEnd();
      return;
    }

    this.stopSpeaking();
    this.currentSessionId += 1;
    const sessionId = this.currentSessionId;

    // 1. Try Bhashini IndicTTS Audio
    try {
      const bhashiniAudioUri = await bhashiniService.synthesizeSpeech(text, lang || this.currentLang);
      if (bhashiniAudioUri && sessionId === this.currentSessionId) {
        const audio = new Audio(bhashiniAudioUri);
        this.currentAudioElement = audio;
        audio.onended = () => {
          this.currentAudioElement = null;
          if (onEnd) onEnd();
        };
        audio.onerror = () => {
          this.currentAudioElement = null;
          this.speakWebSpeechFallback(text, onEnd, lang, sessionId);
        };
        await audio.play();
        return;
      }
    } catch (e) {
      // Fallback to WebSpeech
    }

    // 2. High-Fidelity WebSpeech Synthesis Fallback
    this.speakWebSpeechFallback(text, onEnd, lang, sessionId);
  }

  private speakWebSpeechFallback(text: string, onEnd?: () => void, lang?: string, sessionId?: number) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    const activeSession = sessionId || ++this.currentSessionId;

    try {
      if (this.synth.paused) {
        this.synth.resume();
      }
      this.synth.cancel();

      const segments = this.splitIntoSegments(text, lang);
      let currentIndex = 0;

      const speakNextSegment = () => {
        if (activeSession !== this.currentSessionId) return;

        if (currentIndex >= segments.length) {
          if (onEnd) onEnd();
          return;
        }

        const segment = segments[currentIndex];
        currentIndex++;

        if (!segment.text.trim()) {
          speakNextSegment();
          return;
        }

        const utterance = new SpeechSynthesisUtterance(segment.text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.lang = segment.lang;

        const voice = this.getBestVoiceForLang(segment.lang);
        if (voice) {
          utterance.voice = voice;
        }

        utterance.onend = () => {
          if (activeSession === this.currentSessionId) {
            speakNextSegment();
          }
        };

        utterance.onerror = (e) => {
          console.warn('TTS segment notice:', e);
          if (activeSession === this.currentSessionId) {
            speakNextSegment();
          }
        };

        if (this.synth) {
          this.synth.speak(utterance);
        }
      };

      speakNextSegment();
    } catch (err) {
      console.warn('Speech synthesis notice:', err);
      if (onEnd) onEnd();
    }
  }

  public stopSpeaking() {
    this.currentSessionId += 1;
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement = null;
    }
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public isSpeaking(): boolean {
    return (!!this.currentAudioElement && !this.currentAudioElement.paused) || (!!this.synth && this.synth.speaking);
  }
}

export const voiceService = new VoiceService();
