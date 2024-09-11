export interface AnswerModal {
    id: number;
    grade: number | null;
    description: string;
    idQuestion: number;
    idUser: number;
    username?: string; 
    questionText?: string;
  }
  