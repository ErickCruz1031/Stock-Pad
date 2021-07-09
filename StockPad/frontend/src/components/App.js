import React, {Component} from 'react';
import {render} from 'react-dom'
import Header from './Header'
import Home from './Home'
import Grid from '@material-ui/core/Grid';
import StockRow from './StockRow';
import CompanyPage from './CompanyPage'
import { Card } from '@material-ui/core';
import { sizing,palette  } from '@material-ui/system';
import {makeStyles} from '@material-ui/styles'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import {useState, useEffect} from 'react';
import UserList from './UserList';
import LoginPage from './LoginPage';
import Signin from './Signin/Signin'
import {BrowserRouter as Router,
    Switch, Route, Link, Redirect, withRouter} from 'react-router-dom';
import SignIn from './Signin/Signin';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles(() =>({
    root: {
        flexGrow: 1,
      },
    typographyStyle : {
        flex : 1
    },


}))


//When you login you have to call the backend and check if it is logged in. If so, push the notebook view to the stack

const App = () =>{
    const classes = useStyles();
    const history = useHistory(); 

    const [tickerList, updateTickerList] = useState([
        {ticker : "TSLA", headline: "Tesla news", description: "New Desc."},
        {ticker : "AAPL", headline: "AAPL News", description: "News Desc."},
        {ticker : "GME", headline: "GME News", description: "News Desc."}
    ]); //Set the array to an empty list 

    const [compPageStatus, setCompPage] = useState(false); //At first the company page doesn't show 
    const [notebookStatus, setNotebookStatus] = useState(false);
    const [sessionToken, setToken] = useState("");
    const [queryTicker, setQuery] = useState("");
    const [tempUserList, setUserList] = useState([]);
    const [loggedIn, setLogState] = useState(false); //Variable to tell if user is logged in

    const [userStocks, setStocks] = useState([]);

    const queryTrigger = input =>{
        console.log("This was the input of the query ", input);
        console.log("We are in the query trigger")
        //setCompPage(!compPageStatus); Seems to be a redundant line of code. Commenting out to see if thats the case
        setQuery(input);

        
    }

    
    const updateLogState = (current, token) =>{
        console.log("This is the value ", current);
        console.log("This is the new token ", token);
        setToken(token);//Set the current session token to pass on to other functions
    }


   
    return(        
            <Router>
                <Switch>
                    <Route exact path='/' component={() => <SignIn setLogState={updateLogState}/>} />
                    <Route path='/home' component = {() => <Home stockList={tickerList} queryFunc={queryTrigger}/>} />
                    <Route path='/companypage' component={() => <CompanyPage searchTicker={queryTicker} userToken={sessionToken}/>} />
                    <Route path='/userlist' component={() => <UserList userToken={sessionToken} array={userStocks}/>} />
                    <Route path='/' component={() => <SignIn setLogState={updateLogState}/>} />
                </Switch>
            
            </Router>
    )
    
}

export default withRouter(App);

const rootDiv = document.getElementById('root');
render(<App />, rootDiv);
