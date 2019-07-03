import config from './config.json';
import {IPerson, Gender} from "../main/Person";

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


function IHL7ResourceToPerson(resource:IHL7Resource):IPerson{
    return{
        firstName: resource.name[0].given[0],
        lastName: resource.name[0].family,
        middleName: resource.name[0].given[1]?resource.name[0].given[1]:'',
        birthDate: new Date(resource.birthDate),
        address: resource.address[0].line[0],
        id: resource.id,
        gender: resource.gender as Gender
    };
}

// function PersonToIHL7Resource(patient:IPerson){
//     let name:IHL7Name ={
//         family: patient.lastName,
//         given: [patient.firstName,],
//
//     };
//     return{
//         name[
//             given[]
//         ]
//     }
// }

export let Patients = () => fetch(config.url + 'Patient/',
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
export let Patient = (id:string) => fetch(config.url + 'Patient/' + id,
    {

        method: 'GET',
        headers: { 'Authorization': config.authorization,},
    }
).then(response=> {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json().then(
            (data) => {
                console.log('here is ok');
                console.log(data);
                return IHL7ResourceToPerson(data);
            }
        );
    }

);

