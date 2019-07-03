import * as React from 'react';
import {Row, Col} from 'antd';
import 'antd/dist/antd.css';
import {Person, IPersonProps} from "./Person";
import {Patients} from "../aidbox/api";


interface IPersonsListState {
    persons: IPersonProps[];
}

export class PersonsList extends React.Component<{},IPersonsListState>{
    state:IPersonsListState = {
        persons: [

        ],
    };
    componentDidMount(){
        console.log('Person list did mount');

        Patients().then(data=> {
                this.setState({persons: data})
            }
        ).catch(err=>{
            console.log(err.message);
        })
    }
    render(){
        return (
            this.state.persons.length === 0 ?
                <h1>The person list is empty</h1> :
                [
                    <Row gutter={8}>
                        <Col>Header</Col>
                    </Row>,
                this.state.persons.map(
                    (person) => <Person key={person.id} {...person}/>
                )]


        )
    }
}