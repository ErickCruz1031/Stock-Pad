import React, {useState, useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import BookRow from './BookRow'
import Box from '@material-ui/core/Box';
import useStateWithCallback from 'use-state-with-callback';
import List from './List'


const useStyles = makeStyles(() =>({
    root: {
        flexGrow: 1,
      },
    typographyStyle : {
        flex : 1
    },


}))

const UserList = ({userToken, array}) =>{

    const classes = useStyles();
    const [userStocks, setStocks] = useState([]);
    const [fetched, setFetch] = useState(false) //Set to empty array


    useEffect (() =>{
        console.log("In the frontend about to get the stocknotes...");
        console.log("This is the token we are going ton use ", userToken)
        console.log("This is userStocks going into it ", userStocks)
  
        const callFetch = async () =>{
            var tokenString = 'Token ' + userToken
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
                   console.log(typeof([]))
                   setStocks(data)
                   setFetch(!fetched) //Set the stocks for this user
                   console.log(typeof(data))
                    
                    
  
            }));
  
        }
        if (userStocks.length == 0){
            callFetch();
        }//Only call on the first one
        
        console.log("THis is what was returned");
        
  
    }, [userStocks]) //Include the empty dependency array for the useEffect
    //This call will get called when this component gets mounted 


    return(
        <div className={classes.root}>

            <List objectArray={userStocks} />

        </div>
    )
}

export default UserList;


    

