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
import UserListV2 from './UserListV2';
import PageController from './PageController';
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
        setCompPage(!compPageStatus);
        setQuery(input);

        
    }

    
    const updateLogState = (current, token) =>{
        console.log("This is the value ", current);
        console.log("This is the new token ", token);
        setToken(token);//Set the current session token to pass on to other functions
        /*
        const callFetch = async () =>{
            console.log("In the string call to CALLFETCH")
            var tokenString = 'Token ' + token
            var res = await fetch( 'http://localhost:8000/api/get-stocknote/',{
                method: 'GET',
                headers :{
                    'Authorization' : tokenString,
                    'Content-Type': 'application/json',
                }
                }).then(response =>
                response.json().then(data=> {

                    console.log("Made it to the call here");
                    console.log("This is the data from get-stocknote", data.length)
                    console.log(data)
                    console.log(userStocks, " is the obj afterwards")
                    setStocks(data) //Set the stocks for this user
                    //history.push('/home')
                    
                    
  
            }));
  
        }
        if (userStocks.length == 0){
            callFetch();
        }//Only call on the first one
        */
    }


   
    return(        
            <Router>
                <Switch>
                    <Route exact path='/' component={() => <SignIn setLogState={updateLogState}/>} />
                    <Route path='/home' component = {() => <Home stockList={tickerList} />} />
                    <Route path='/companypage' component={CompanyPage} />
                    <Route path='/userlist' component={() => <UserList userToken={sessionToken} array={userStocks}/>} />
                    <Route path='/' component={() => <SignIn setLogState={updateLogState}/>} />
                </Switch>
            
            </Router>
    )
    
}

export default withRouter(App);

const rootDiv = document.getElementById('root');
render(<App />, rootDiv);
