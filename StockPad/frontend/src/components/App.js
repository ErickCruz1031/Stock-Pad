import React, {Component} from 'react';
import {render} from 'react-dom'
import Dashboard from './Dashboard/Dashboard';
import Header from './Header'
import Home from './Home'
import Grid from '@material-ui/core/Grid';
import Content from './Content';
import StockRow from './StockRow';
import CompanyPage from './CompanyPage'
import { Card } from '@material-ui/core';
import { sizing,palette  } from '@material-ui/system';
import {makeStyles} from '@material-ui/styles'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles(() =>({
    root: {
        flexGrow: 1,
      },
    typographyStyle : {
        flex : 1
    },


}))


const App = () =>{

    const classes = useStyles();
   
    return(
        <div className={classes.root}>
            <CompanyPage />
        </div>
    )
    
}

const rootDiv = document.getElementById('root');
render(<App />, rootDiv);

