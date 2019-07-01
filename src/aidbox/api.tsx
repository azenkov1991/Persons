import config from './config.json';

interface IHL7Address{
    city: string;
    country: string;
    line: string[];
    state: string
}

interface IHL7Name{
    family: string;
    given: string[];
}

interface IHL7Resource{
    id: string;
    name: IHL7Name[];
    address: IHL7Address[];
    birthDate: string;
    gender: string;
}

interface IHL7PatientAnswer{
    fullUrl: string;
    resource: IHL7Resource;
}

interface IHL7Person{
    fullUrl: string;

}

type Gender = "male" | "female" | "other" | "unknown";

export interface IPerson {
     firstName: string;
     lastName: string;
     middleName:string;
     birthDate: Date;
     address: string;
     id: string;
     gender: Gender;
 }

function IHL7ResourceToPerson(resource:IHL7Resource):IPerson{
    console.log(resource);
    return{
        firstName: resource.name[0].given[0],
        lastName: resource.name[0].given[1]?resource.name[0].given[1]:'',
        middleName: resource.name[0].family,
        birthDate: new Date(resource.birthDate),
        address: resource.address[0].line[0],
        id: resource.id,
        gender: resource.gender as Gender
    };
}

export let Patients = fetch(config.url + 'Patient/',
    {
        method: 'GET',
        headers: {
            'Authorization': config.authorization,
        }
    },
).then(response=>{
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json().then(
            (data)=>{
                return data.entry.map(
                    (answer:IHL7PatientAnswer)=>{
                        return IHL7ResourceToPerson(answer.resource);
                    }
                );
            }
        );
    }
);


