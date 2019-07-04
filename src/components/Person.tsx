import * as React from 'react';
import {Row, Col} from 'antd';
import {IPerson} from "../main/Person";


export interface IPersonProps extends IPerson{

}

export class Person extends React.Component<IPersonProps,{}>{
    render(){
        return(

            <Row gutter={8}>
                <Col span={4}><p>{this.props.firstName}</p></Col>
                <Col span={5}><p>{this.props.lastName}</p></Col>
                <Col span={5}><p>{this.props.middleName}</p></Col>
                <Col span={5}><p>{this.props.gender}</p></Col>
                <Col span={5}><p>{this.props.birthDate.format('YYYY-MM-DD')}</p></Col>
            </Row>
        )
    }
}