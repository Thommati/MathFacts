export interface MathProblem {
  left: number;
  right: number;
  operator: '+' | '-';
  answer: number;
}

export interface Attempt {
  problem: MathProblem;
  userAnswer: number;
  correct: boolean;
  responseTimeMs: number;
}

export interface SessionSummary {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  averageResponseTimeMs: number;
}
