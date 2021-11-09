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
import Register from './Signin/Register';
//import LoginPage from './Signin/LoginPage';
import Signin from './Signin/Signin'
import {BrowserRouter as Router,
    Switch, Route, Link, Redirect, withRouter} from 'react-router-dom';
import SignIn from './Signin/Signin';
import {useHistory} from 'react-router-dom';
import ResetPass from './Signin/ResetPass';


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
    const [apiKey, setKey] = useState("");//This will be the API key that we pass onto the other components. We fetch during useEffect

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

    useEffect(() => {

        const fetchApiKey = async () =>{
            console.log("Fetching the API key");

            var AWS = require('aws-sdk'),
                region = "us-east-2",
                secretName = "arn:aws:secretsmanager:us-east-2:144067153410:secret:polygonKey-JKfwAT",
                secret,
                decodedBinarySecret;
    
            // Create a Secrets Manager client
            var client =  new AWS.SecretsManager({
                region: region
            });
    
            client.getSecretValue({SecretId: secretName}, function(err, data) {
                if (err) {
                    console.log("Seems we got an error \n", err);
                    if (err.code === 'DecryptionFailureException'){
                        console.log("Seems we got 1");
                        // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                        // Deal with the exception here, and/or rethrow at your discretion.
                        throw err;
                    }
                    else if (err.code === 'InternalServiceErrorException'){
                        // An error occurred on the server side.
                        // Deal with the exception here, and/or rethrow at your discretion.
                        console.log("Seems we got 2")
                        throw err;
                    }
                    else if (err.code === 'InvalidParameterException')
                        // You provided an invalid value for a parameter.
                        // Deal with the exception here, and/or rethrow at your discretion.
                        throw err;
                    else if (err.code === 'InvalidRequestException')
                        // You provided a parameter value that is not valid for the current state of the resource.
                        // Deal with the exception here, and/or rethrow at your discretion.
                        throw err;
                    else if (err.code === 'ResourceNotFoundException')
                        // We can't find the resource that you asked for.
                        // Deal with the exception here, and/or rethrow at your discretion.
                        throw err;
                }
                else {
                    // Decrypts secret using the associated KMS CMK.
                    // Depending on whether the secret is a string or binary, one of these fields will be populated.
                    console.log("We got in here");
                    if ('SecretString' in data) {
                        console.log("Data: ", data);
                        secret = JSON.parse(data.SecretString);
                    } else {
                        console.log("In the else with data : \n", data)
                        let buff = new Buffer(data.SecretBinary, 'base64');
                        decodedBinarySecret = buff.toString('ascii');
                    }
                }
            
                console.log("We got here");
                //var source_secret = JSON.stringify(secret);
                console.log("This is the secret: ", secret.apiKey);
                
                // Your code goes here. 
            });


        }//Function to fetch the AWS Secret (Polygon API Key)

        fetchApiKey();//Call function to fetch the API key


        //TODO: Integrate the code from example.js into here
    });//It seems that this is how we get it to run only one at the first mount

   
    return(        
            <Router>
                <Switch>
                    <Route exact path='/' component={() => <SignIn setLogState={updateLogState}/>} />
                    <Route path= '/register' component = { () => <Register />} />
                    <Route path= '/reset' component = { () => <ResetPass />} />
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
