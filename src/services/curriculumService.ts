import { CourseContext, CurriculumTopic } from '../types';
import { 
  VTU_2025_SEM3_CSE, 
  NCERT_GRADE7_SCIENCE, 
  getCurriculumData, 
  convertSubjectToCurriculumTopics,
  CurriculumSubjectData
} from '../data/curriculumRepository';

const STORAGE_COURSE_CONTEXT_KEY = 'mindmesh_active_course_context_v2';

export const DEFAULT_VTU_CONTEXT: CourseContext = {
  university: 'Visvesvaraya Technological University (VTU)',
  scheme: '2025 Scheme',
  branch: 'Computer Science and Engineering',
  semester: '3rd Semester',
  subjectCode: '1BCS305',
  subjectTitle: 'Data Structures and Applications'
};

export const DEFAULT_NCERT_CONTEXT: CourseContext = {
  university: 'NCERT / CBSE',
  scheme: '2026 Revised',
  branch: 'General Science',
  semester: 'Grade 7',
  subjectCode: 'NCERT-SCI-7',
  subjectTitle: 'Science / Biology'
};

type ContextListener = (context: CourseContext, topics: CurriculumTopic[], isAvailable: boolean) => void;

class CurriculumService {
  private activeContext: CourseContext;
  private listeners: ContextListener[] = [];
  private backendUrl: string = 'http://127.0.0.1:8000/api/curriculum';

  constructor() {
    this.activeContext = this.loadContextFromStorage();
  }

  private loadContextFromStorage(): CourseContext {
    try {
      const stored = localStorage.getItem(STORAGE_COURSE_CONTEXT_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not load course context from storage:', e);
    }
    return DEFAULT_VTU_CONTEXT;
  }

  public getActiveContext(): CourseContext {
    return this.activeContext;
  }

  public subscribe(listener: ContextListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(topics: CurriculumTopic[], isAvailable: boolean) {
    this.listeners.forEach(listener => listener(this.activeContext, topics, isAvailable));
  }

  public async setCourseContext(newContext: Partial<CourseContext>): Promise<{ available: boolean; topics: CurriculumTopic[]; subject?: CurriculumSubjectData }> {
    this.activeContext = { ...this.activeContext, ...newContext };
    
    try {
      localStorage.setItem(STORAGE_COURSE_CONTEXT_KEY, JSON.stringify(this.activeContext));
    } catch (e) {
      console.warn('Failed to save active course context to localStorage:', e);
    }

    // Try fetching from backend API first
    try {
      const queryParams = new URLSearchParams({
        university: this.activeContext.university,
        scheme: this.activeContext.scheme,
        branch: this.activeContext.branch,
        semester: this.activeContext.semester,
        subject: this.activeContext.subjectCode || this.activeContext.subjectTitle
      });

      const resp = await fetch(`${this.backendUrl}/syllabus?${queryParams.toString()}`);
      if (resp.ok) {
        const data = await resp.json();
        if (data.available && data.subject) {
          const topics = convertSubjectToCurriculumTopics(data.subject);
          this.notifyListeners(topics, true);
          return { available: true, topics, subject: data.subject };
        }
      }
    } catch (err) {
      console.warn('Backend curriculum API fetch notice, using local repository:', err);
    }

    // Fallback to local repository
    const localResult = getCurriculumData(
      this.activeContext.university,
      this.activeContext.scheme,
      this.activeContext.branch,
      this.activeContext.semester,
      this.activeContext.subjectCode
    );

    if (localResult.available && localResult.topics) {
      this.notifyListeners(localResult.topics, true);
      return { available: true, topics: localResult.topics, subject: localResult.subject };
    }

    // Unconfigured Syllabus
    this.notifyListeners([], false);
    return { available: false, topics: [] };
  }

  public async importSyllabus(subjectCode: string, subjectTitle: string, modules: any[]): Promise<boolean> {
    try {
      const resp = await fetch(`${this.backendUrl}/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          university: this.activeContext.university,
          scheme: this.activeContext.scheme,
          branch: this.activeContext.branch,
          semester: this.activeContext.semester,
          subject_code: subjectCode,
          subject_title: subjectTitle,
          credits: 3,
          modules: modules
        })
      });
      if (resp.ok) {
        await this.setCourseContext({ subjectCode, subjectTitle });
        return true;
      }
    } catch (err) {
      console.warn('Backend import syllabus notice:', err);
    }

    // Local Fallback import
    const newSubjectData: CurriculumSubjectData = {
      code: subjectCode,
      title: subjectTitle,
      credits: 3,
      type: "PCC",
      modules: modules,
      textbooks: ["Uploaded Syllabus Document"],
      reference_books: ["Official University Curriculum Specification"]
    };

    VTU_2025_SEM3_CSE.subjects.push(newSubjectData);
    await this.setCourseContext({ subjectCode, subjectTitle });
    return true;
  }
}

export const curriculumService = new CurriculumService();
