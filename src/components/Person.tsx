import * as React from 'react';
import {IPerson} from '../aidbox/api';

export interface IPersonProps extends IPerson{

}

export class Person extends React.Component<IPersonProps,{}>{
    render(){
        return(
            <div>
                <div><p>{this.props.firstName}</p></div>
                <div><p>{this.props.lastName}</p></div>
                <div><p>{this.props.middleName}</p></div>
                <div><p>{this.props.gender}</p></div>
                <div><p>{this.props.birthDate.toDateString()}</p></div>
            </div>
        )
    }
}