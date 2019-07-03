export type Gender = "male" | "female" | "other" | "unknown";

export interface IPerson {
    firstName: string;
    lastName: string;
    middleName:string;
    birthDate: Date;
    address: string;
    id: string;
    gender: Gender;
}