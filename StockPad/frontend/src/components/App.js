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
import {useState, useEffect} from 'react';
import UserList from './UserList';
import PageController from './PageController';



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

    const [tickerList, updateTickerList] = useState([
        {ticker : "TSLA", headline: "Tesla news", description: "New Desc."},
        {ticker : "AAPL", headline: "AAPL News", description: "News Desc."},
        {ticker : "GME", headline: "GME News", description: "News Desc."}
    ]); //Set the array to an empty list 

    const [compPageStatus, setCompPage] = useState(false); //At first the company page doesn't show 
    const [notebookStatus, setNotebookStatus] = useState(false);
    const [queryTicker, setQuery] = useState("");

    const queryTrigger = input =>{
        console.log("This was the input of the query ", input);
        setCompPage(!compPageStatus);
        setQuery(input);
    }


   
    return(        

     
            
            <div className={classes.root}>
                <UserList/>
            </div>

 
    
            
        
    )
    
}

const rootDiv = document.getElementById('root');
render(<App />, rootDiv);


/*
   return(        

        compPageStatus ?
            
            <div className={classes.root}>
                <PageController queryTicker={queryTicker}/>
            </div>

            : 

            <div className={classes.root}>
                <Home stockList={tickerList} queryFunc={queryTrigger}/>
            </div>
    
    
            
        
    )
    
    
*/
