import * as React from 'react';
import * as ReactDom from 'react-dom';

import {PersonsList} from "./components/PersonsList";


ReactDom.render(
    <PersonsList></PersonsList>,
    document.getElementById('persons')
);