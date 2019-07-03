import * as React from 'react';
import * as ReactDom from 'react-dom';
import {PersonsTable} from "./components/PersonsTable";
import {PersonEditPage} from "./components/PersonEditPage";
import {Router, Route} from 'react-router-dom';
import {createBrowserHistory} from "history";
//import {PersonsList} from "./components/PersonsList";
const history = createBrowserHistory();

ReactDom.render(
//    <PersonsList></PersonsList>,
    <Router history={history}>
        <Route exact path="/" component={PersonsTable}/>
        <Route path="/person/:id" component={PersonEditPage}/>
    </Router>,
    document.getElementById('persons')
);