import { QuestionModel } from "./Question";

export interface FormModel {
    id: number;
    name: string;
    IdFormsGroup: number;
    questions: QuestionModel[];
}