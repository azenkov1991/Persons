import moment, {Moment}  from 'moment';
import React, {Component} from 'react';
import {Icon, Form, Input, DatePicker, Select, Button} from "antd";


import {IPerson, Gender} from "../main/Person";
import {Patient} from "../aidbox/api";


interface  IPersonEditFormState {
    wasEdit: boolean;
    wasSaved: boolean;
    wasLoaded: boolean;
    person?: IPerson;
}

interface IPersonEditFormProps {
    id: string;
}

export class PersonEditForm extends Component<IPersonEditFormProps, IPersonEditFormState>{

    state: IPersonEditFormState={
        wasEdit: false,
        wasSaved: false,
        wasLoaded: false,
    };

    handleSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        console.log(this.state.person);
        console.log(event.currentTarget);
    };


    handleBirthDateChange = (date:Moment, dateString:string)=>{
        if (date){
            this.state.person.birthDate = date.toDate();
        }

        //this.state.person.birthDate = event.currentTarget.value.toDate();
    };
    componentDidMount() {

        const patient = Patient(this.props.id);
        patient.then((person:IPerson)=> {
            this.setState({
                wasLoaded: true,
                person: person
            });


            console.log('at person edit form');
            console.log(this.state.person);
            }
        )
        .catch((error)=>{
            console.log('error!!:  ' + error.message);
        })
    };
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
                               onChange={(e:React.FormEvent<HTMLInputElement>)=>this.setState({person: {...this.state.person, firstName: (e.currentTarget.value)}})}/>
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
                        <DatePicker defaultValue={moment(this.state.person.birthDate)}
                                    onChange={(date:Moment)=>this.setState({person: {...this.state.person, birthDate: (date.toDate())}})}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            :
                <Icon type="loading"/>
        )
    }
}
