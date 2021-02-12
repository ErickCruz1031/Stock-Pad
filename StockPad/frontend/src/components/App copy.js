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
import LoginPage from './LoginPage';
import Signin from './Signin/Signin'
import {BrowserRouter as Router,
    Switch, Route, Link, Redirect, withRouter} from 'react-router-dom';
import SignIn from './Signin/Signin';


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
    const [loggedIn, setLogState] = useState(false); //Variable to tell if user is logged in

    const queryTrigger = input =>{
        console.log("This was the input of the query ", input);
        setCompPage(!compPageStatus);
        setQuery(input);
    }

    const loginAttempt = (user, password) =>{
        console.log("In the frontend about to login...");

        const callSignIn = async () =>{
            var res = await fetch( 'http://localhost:8000/auth/login/',{
                method: 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": user,
                    "password": password,
                })
            }).then(response =>
                response.json().then(data=> {
                    if (data.non_field_errors){
                        console.log("WARNING")
                        console.log("This is the data ", data);

                    }
                    else{
                        setLogState(!loggedIn); //Alter the state
                        console.log("The token is ", data.token);
                        console.log("The user is ", data.user);
                    }

                }));




            //var data = res.json();
            //console.log("This is what it returns", data);
            //console.log("This is the token", data.object.token);
            //console.log("User", data.user); 
        }
        callSignIn();
        

    }
/*
fetch(url).then(response => 
    response.json().then(data => ({
        data: data,
        status: response.status
    })
).then(res => {
    console.log(res.status, res.data.title)
}));


*/

   
    return(        

     
            <Router>
            
                <Route exact path='/' >
                    {loggedIn ? <Home stockList={tickerList} queryFunc={queryTrigger} /> : <SignIn logFunc={loginAttempt}/>}
                </Route>
                <Route path='/companypage' component={CompanyPage} />
            
            </Router>
            

 
    
            
        
    )
    
}

export default withRouter(App);

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
