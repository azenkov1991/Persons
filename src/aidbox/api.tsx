import moment, {Moment}  from 'moment';

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
    //address: IHL7Address[];
    birthDate: string;
    gender: string;
}

interface IHL7PatientAnswer{
    fullUrl: string;
    resource: IHL7Resource;
}


function HL7ResourceToPerson(resource:IHL7Resource):IPerson{
    return{
        firstName: resource.name[0].given[0],
        lastName: resource.name[0].family,
        middleName: resource.name[0].given[1]?resource.name[0].given[1]:'',
        birthDate: moment(resource.birthDate),
        //address: resource.address[0].line[0],
        id: resource.id,
        gender: resource.gender as Gender
    };
}

export function PersonToHL7Resource(patient:IPerson){
    let name:IHL7Name ={
        family: patient.lastName,
        given: patient.middleName?[patient.firstName, patient.middleName]:[patient.firstName],


    };
    return{
        id: patient.id,
        name: [name,],
        birthDate: patient.birthDate.format('YYYY-MM-DD'),
        gender: patient.gender
    }
}

export let Patients = () => fetch(config.url + 'Patient/?_sort=name',
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
                console.log(data);
                return data.entry.map(
                    (answer:IHL7PatientAnswer)=>{
                        return HL7ResourceToPerson(answer.resource);
                    }
                );
            }
        );
    }
);
export let Patient = (id:string) => fetch(config.url + 'Patient/' + id,
    {
        method: 'GET',
        headers: {
            'Authorization': config.authorization,
            'cache-control': 'no-cache'
        },
    }
).then(response=> {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json().then(
            (data) => {
                console.log(data);
                return HL7ResourceToPerson(data);
            }
        );
    }
);

export let updatePatient = (patient:IPerson) => fetch(config.url + 'Patient/' + patient.id + '?_method=merge-patch',
    {
        method: 'PATCH',
        headers: {
            'Authorization': config.authorization,
            'content-type': 'application/merge-patch+json'
        },
        body: JSON.stringify(PersonToHL7Resource(patient))
    }

    ).then(response=>{
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }
);

export let createPatient = (patient:IPerson) => fetch(config.url + 'Patient/?_format=json' ,
    {
        method: 'POST',
        headers: {
            'Authorization': config.authorization,
            'content-type': 'application/merge-patch+json'
        },
        body: JSON.stringify(PersonToHL7Resource(patient))
    }

).then(response=>{
        if (!response.ok) {
            console.log(response);
            throw new Error(response.statusText);
        }
        return response.json();
    }
);
