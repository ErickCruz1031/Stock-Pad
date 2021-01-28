import React, {Component} from 'react';
import {render} from 'react-dom'
import Dashboard from './Dashboard/Dashboard';
import Header from './Header'
import Grid from '@material-ui/core/Grid';
import Content from './Content';
import { sizing,palette  } from '@material-ui/system';
import {makeStyles} from '@material-ui/styles'


const useStyles = makeStyles(() =>({
    typographyStyle : {
        flex : 1
    }

}))

export class App extends Component{
    render(){
        return(
            <Grid container direction="column">
                <Grid item > <Header /> </Grid>

                <Grid item container direction="row"> 
                    <Grid item xs={2} />
                        <Grid item xs={3}>
                            <Content />
                        </Grid>
                        <Grid item xs={3}>
                            <Content />
                        </Grid>
                        <Grid item xs={3}>
                            <Content />
                        </Grid>
                    <Grid item xs={2} />
                </Grid>
            </Grid>
        )
    }
}

const rootDiv = document.getElementById('root');
render(<App />, rootDiv);

//ReactDOM.render(<App />, document.getElementById('root'));
//    <link rel="stylesheet" type="text/css" href="{% static "css/index.css" %}" />