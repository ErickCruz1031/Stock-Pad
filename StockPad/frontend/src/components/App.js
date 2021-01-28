import React, {Component} from 'react';
import {render} from 'react-dom'

export class App extends Component{
    render(){
        return(
            <h1>this is the NOOOO</h1>
        )
    }
}

const rootDiv = document.getElementById('root');
render(<App />, rootDiv);

//ReactDOM.render(<App />, document.getElementById('root'));