import {Moment} from 'moment';
import * as React from 'react';
import {Link} from 'react-router-dom';
import {Table, Icon, Button} from 'antd';
import 'antd/dist/antd.css';
import {IPerson} from '../main/Person'
import {Patients} from "../aidbox/api";


interface IPersonsListState {
    persons: IPerson[];
    errorHasOccured: boolean;
    errorMessage: string;
}

const columns =[
    // {
    //     title: 'FullName',
    //     key: 'FullName',
    //     dataIndex: 'firstName',
    //     render: (data:string, row:IPerson) => (row.firstName + ' ' + row.middleName + ' ' +row.lastName)
    // },
    {
        title: 'FirstName',
        dataIndex: 'firstName',
        key:'FirstName',

    },
    {
        title: 'MiddleName',
        dataIndex: 'middleName',
        key: 'middleName'
    },
    {
        title: 'LastName',
        dataIndex: 'lastName',
        key: 'lastName'
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'Gender',

    },
    {
        title: 'BirthDate',
        key: 'BirthDate',
        dataIndex: 'birthDate',
        render: (birthDate:Moment) => birthDate.format('YYYY-MM-DD')
    },
    {
        title: 'Edit',
        key: 'Edit',
        dataIndex: 'id',
        render: (id:string)=> <Link to={"/person/" + id }><Icon type="edit"></Icon></Link>
    }

];

export class PersonsTable extends React.Component<{},IPersonsListState>{
    state:IPersonsListState = {
        persons: [

        ],
        errorHasOccured: false,
        errorMessage: ''
    };
    async componentDidMount(){
        try {
            const persons = await Patients();
            this.setState({persons: persons});
        }
        catch (err){
            this.setState({
                errorHasOccured: true,
                errorMessage: err.message
            });
        }
    }
    render(){
        if ( this.state.errorHasOccured ) {
            return <h1>{this.state.errorMessage}</h1>
        }
        return (
            this.state.persons.length === 0 ?
                <Icon type="loading" style={{fontSize: 50}}/> :
                <React.Fragment>
                    <Table rowKey= {'id'} columns={columns} dataSource={this.state.persons}/>,
                    <Link to={"/person/new"}>
                        <Button type={"primary"}>Add new person</Button>
                    </Link>
                </React.Fragment>
        )
    }
}