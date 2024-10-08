import { QuestionModel } from "./Question";

export interface FormModel {
    id: number;
    name: string;
    idFormsGroup: number;
    questions: QuestionModel[];
    groupName?: string;
}