import moment, {Moment}  from 'moment';
import deepEqual from "deep-equal";
import React, {Component} from 'react';
import {Icon, Form, Input, DatePicker, Select, Button, message} from "antd";


import {IPerson, Gender} from "../main/Person";
import {Patient, updatePatient, createPatient, PersonToHL7Resource} from "../aidbox/api";


interface  IPersonEditFormState {
    wasEdit: boolean;
    wasSaved: boolean;
    wasLoaded: boolean;
    person?: IPerson;
    savedPerson?:IPerson;
}

interface IPersonEditFormProps {
    id: string;
    afterEditAction: ()=>void;
}

export class PersonEditForm extends Component<IPersonEditFormProps, IPersonEditFormState>{

    state: IPersonEditFormState={
        wasEdit: false,
        wasSaved: false,
        wasLoaded: false,
    };

    handleSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        event.stopPropagation();

        console.log(this.state.person);
        if ((this.props.id == 'new') && !this.state.wasSaved){
            let newPerson= {...this.state.person};

            console.log(JSON.stringify(PersonToHL7Resource(newPerson as IPerson)));
            let cP = createPatient(newPerson as IPerson);
            cP.then(
                (data) => {
                    console.log(data);
                    this.setState({
                        wasSaved: true, wasEdit: false,
                        person: {...newPerson, id: data['id']},
                        savedPerson: {...newPerson, id: data['id']}
                    });
                    message.success('Person was created successfully',4);

                }
            ).catch((error) => message.error(error.message));

        }else {

            let uP = updatePatient(this.state.person);
            uP.then(
                (data) => {
                    console.log(data);
                    this.setState({wasSaved: true, wasEdit: false, savedPerson: {...this.state.person}});
                    message.success('Person was updated');
                }
            ).catch(
                (error) => message.error(error.message)
            );
        }
    };

    componentDidMount() {
        if (this.props.id=='new'){
            this.setState({
                wasLoaded: true,
                person:{
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    birthDate: null,
                    gender: 'unknown'
                } as IPerson,
                savedPerson:{
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    birthDate: null,
                    gender: 'unknown'
                } as IPerson
            });
        }
        else{
            const patient = Patient(this.props.id);
            patient.then((person:IPerson)=> {
                    this.setState({
                        wasLoaded: true,
                        person: person,
                        savedPerson: {...person}
                    });
                }
            ).catch((error)=>{
                    console.log('error!!:  ' + error.message);
            })
        }
    };
    componentDidUpdate(prevProp:IPersonEditFormProps, prevState:IPersonEditFormState){
        if (this.state.savedPerson && this.state.person){
            if ( !this.state.wasEdit && !deepEqual(this.state.savedPerson, this.state.person)){
                this.setState({wasEdit:true});
            }
            else if (this.state.wasEdit && deepEqual(this.state.savedPerson, this.state.person)){
                this.setState({wasEdit:false});
            }
        }

    }
    render(){
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            this.state.wasLoaded?
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item required label="First name">
                        <Input name='firstName' placeholder="Enter first name"
                               defaultValue={this.state.person.firstName}
                               onChange={
                                   (e:React.FormEvent<HTMLInputElement>)=>{this.setState({person: {...this.state.person, firstName: (e.currentTarget.value)}})}
                               }/>
                    </Form.Item>
                    <Form.Item label="Middle name">
                        <Input name="middleName" placeholder="Enter middle name"
                               defaultValue={this.state.person.middleName}
                               onChange={(e:React.FormEvent<HTMLInputElement>)=>this.setState({person: {...this.state.person, middleName: (e.currentTarget.value)}})}/>
                    </Form.Item>
                    <Form.Item required label="Last Name">
                        <Input name="lastName" placeholder="Enter last name"
                               defaultValue={this.state.person.lastName}
                               onChange={(e:React.FormEvent<HTMLInputElement>)=>this.setState({person: {...this.state.person, lastName: (e.currentTarget.value)}})}/>
                    </Form.Item>
                    <Form.Item required label="Gender">
                        <Select  defaultValue={this.state.person.gender}
                                 onChange={(value:string)=>this.setState({
                                     person: {...this.state.person, gender: value as Gender}
                                 })}
                        >
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                            <Select.Option value="other">Other</Select.Option>
                            <Select.Option value="unknown">Unknown</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item required label="Birth date">
                        <DatePicker defaultValue={this.state.person.birthDate?moment(this.state.person.birthDate):null}
                                    onChange={(date:Moment)=>this.setState({person: {...this.state.person, birthDate: date}})}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button disabled = {!this.state.wasEdit} type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            :
                <Icon type="loading"/>
        )
    }
}
