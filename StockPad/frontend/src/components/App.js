import React, {Component} from 'react';
import {render} from 'react-dom'
import Dashboard from './Dashboard/Dashboard';

export class App extends Component{
    render(){
        return(
            <Dashboard />
        )
    }
}

const rootDiv = document.getElementById('root');
render(<App />, rootDiv);

//ReactDOM.render(<App />, document.getElementById('root'));
//    <link rel="stylesheet" type="text/css" href="{% static "css/index.css" %}" />