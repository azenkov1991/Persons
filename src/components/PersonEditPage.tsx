import React, {Component} from 'react';
import {RouteChildrenProps} from 'react-router';
import {Icon, Button} from 'antd';
import {PersonEditForm} from "./PersonEditForm";

interface params{
  id: string;
}

export class PersonEditPage extends Component<RouteChildrenProps,{}>{
    render(){
        console.log(this.props);

        return (
            <div>
                <Button type="primary" onClick={()=>this.props.history.goBack()}>
                    <Icon type="left" />
                    Go back
                </Button>
                <PersonEditForm id={(this.props.match.params as params).id}/>
            </div>
        );
    }
}
