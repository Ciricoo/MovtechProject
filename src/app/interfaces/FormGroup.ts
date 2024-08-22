import { FormModel } from "./Form";

export interface FormGroupModel  {
    id: number;
    name: string;
    forms: FormModel[];
}