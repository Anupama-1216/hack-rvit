"""
Quizzes API Route
POST /quizzes/{quiz_id}/submit
GET  /quizzes/{quiz_id}
"""

from typing import Dict, List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..models.quiz import Quiz, QuizQuestion, QuizAttempt
from .voice import MOCK_STUDENTS

router = APIRouter(prefix="/quizzes", tags=["Formative Quizzes"])

MOCK_QUIZ = Quiz(
    id="quiz-photo-1",
    plan_id="plan-photo-40-init",
    topic="Photosynthesis & Stomata Mechanics",
    grade=7,
    total_marks=3,
    questions=[
        QuizQuestion(
            id="q1",
            question_en="Which gas is taken in by green leaves through stomata during daytime photosynthesis?",
            question_hi="दिन के समय प्रकाश संश्लेषण के दौरान पत्तियों द्वारा रंध्रों से कौन सी गैस अंदर ली जाती है?",
            options_en=["Oxygen (O2)", "Carbon Dioxide (CO2)", "Nitrogen (N2)", "Hydrogen (H2)"],
            options_hi=["ऑक्सीजन (O2)", "कार्बन डाइऑक्साइड (CO2)", "नाइट्रोजन (N2)", "हाइड्रोजन (H2)"],
            correct_option_index=1,
            explanation_en="Carbon dioxide is taken in via stomata guard cells to combine with water for glucose production.",
            explanation_hi="कार्बन डाइऑक्साइड रंध्रों से अवशोषित होकर पानी के साथ मिलकर ग्लूकोज बनाती है।",
            targeted_concept="Stomata Gas Exchange",
            difficulty="Easy"
        ),
        QuizQuestion(
            id="q2",
            question_en="What is the primary role of Chlorophyll in leaf chloroplasts?",
            question_hi="पत्ती के क्लोरोप्लास्ट में क्लोरोफिल (पर्णहरित) का मुख्य कार्य क्या है?",
            options_en=["Absorb water from soil", "Trap solar light energy", "Release CO2", "Protect plant from insects"],
            options_hi=["मिट्टी से पानी सोखना", "सूर्य के प्रकाश की ऊर्जा को अवशोषित करना", "हवा में CO2 छोड़ना", "पौधे को कीड़ों से बचाना"],
            correct_option_index=1,
            explanation_en="Chlorophyll traps solar photons to drive chemical synthesis.",
            explanation_hi="क्लोरोफिल सूर्य के प्रकाश की ऊर्जा को रासायनिक क्रिया चलाने के लिए पकड़ता है।",
            targeted_concept="Chloroplast Function",
            difficulty="Medium"
        ),
        QuizQuestion(
            id="q3",
            question_en="In the balanced equation (6CO2 + 6H2O + Light -> ? + 6O2), what is the missing primary product?",
            question_hi="संतुलित समीकरण (6CO2 + 6H2O + प्रकाश -> ? + 6O2) में मुख्य उत्पाद क्या है?",
            options_en=["Glucose (C6H12O6)", "Methane (CH4)", "Calcium Carbonate", "Hydrochloric Acid"],
            options_hi=["ग्लूकोज (C6H12O6)", "मीथेन (CH4)", "कैल्शियम कार्बोनेट", "हाइड्रोक्लोरिक एसिड"],
            correct_option_index=0,
            explanation_en="Glucose (C6H12O6) is the simple sugar synthesized as food.",
            explanation_hi="ग्लूकोज (C6H12O6) वह शर्करा (भोजन) है जो पौधे द्वारा बनाई जाती है।",
            targeted_concept="Balanced Stoichiometry",
            difficulty="Medium"
        )
    ]
)

class SubmitQuizRequest(BaseModel):
    student_id: str
    answers: Dict[int, int]  # question_index -> selected_option_index

@router.get("/{quiz_id}")
def get_quiz(quiz_id: str):
    return MOCK_QUIZ.dict()

@router.post("/{quiz_id}/submit")
def submit_quiz_attempt(quiz_id: str, body: SubmitQuizRequest):
    student = next((s for s in MOCK_STUDENTS if s.id == body.student_id), None)
    student_name = student.name if student else "Learner"

    score = 0
    detailed_feedback = []

    for idx, q in enumerate(MOCK_QUIZ.questions):
        chosen = body.answers.get(idx)
        is_correct = chosen == q.correct_option_index
        if is_correct:
            score += 1
        detailed_feedback.append({
            "question_index": idx,
            "targeted_concept": q.targeted_concept,
            "is_correct": is_correct,
            "explanation_en": q.explanation_en,
            "explanation_hi": q.explanation_hi
        })

    # Update student profile telemetry
    if student:
        # Reduce risk score as formative mastery increases
        reduction = score * 18.0
        student.calculated_risk_score = max(10.0, student.calculated_risk_score - reduction)
        if student.calculated_risk_score < 40:
            student.risk_level = "low"
        elif student.calculated_risk_score < 70:
            student.risk_level = "medium"

    attempt = QuizAttempt(
        id=f"att-{len(MOCK_QUIZ.questions)}-{body.student_id}",
        quiz_id=quiz_id,
        student_id=body.student_id,
        student_name=student_name,
        answers=body.answers,
        score=score,
        max_score=len(MOCK_QUIZ.questions),
        percentage=round((score / len(MOCK_QUIZ.questions)) * 100.0, 1),
        timestamp="Just now",
        remediation_required=score < 2
    )

    return {
        "status": "GRADED",
        "attempt": attempt.dict(),
        "detailed_feedback": detailed_feedback,
        "updated_student_risk_score": student.calculated_risk_score if student else None,
        "telemetry_message": "Student knowledge state updated. Predicted future gap risk reduced by formative practice."
    }
