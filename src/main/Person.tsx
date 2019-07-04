import moment, {Moment}  from 'moment';

export type Gender = "male" | "female" | "other" | "unknown";


export interface IPerson {
    firstName: string;
    lastName: string;
    middleName:string;
    birthDate: Moment;
    //address: string;
    id: string;
    gender: Gender;
}
