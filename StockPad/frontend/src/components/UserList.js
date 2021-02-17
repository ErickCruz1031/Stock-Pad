import React, {useState, useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import BookRow from './BookRow'
import Box from '@material-ui/core/Box';



const useStyles = makeStyles(() =>({
    root: {
        flexGrow: 1,
      },
    typographyStyle : {
        flex : 1
    },


}))

/*

                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + JSON.stringify(userToken),
                }

*/

const UserList = ({userToken}) =>{

    const classes = useStyles();


    useEffect (() =>{
        console.log("In the frontend about to get the stocknotes...");
        console.log("This is the token we are going ton use ", userToken)
  
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
                    console.log("This is the data from get-stocknote")
                    console.log(data)
  
            }));
  
        }
        callFetch();
        
  
    }, []) //Include the empty dependency array for the useEffect
    //This call will get called when this component gets mounted 

    return(
        <div className={classes.root}>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Header />
                </Grid>
                <Grid container direction="row" spacing={1}>
                    <Grid item xs={2} />

                    <Grid item xs={8}>
                        <Box pt={6}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs={12}>
                                <BookRow currentTicker={"TSLA"}/>
                            </Grid>

                            <Grid item xs={12}>
                                <BookRow currentTicker={"AAPL"}/>
                            </Grid>

                            <Grid item xs={12}>
                                <BookRow currentTicker={"GME"}/>
                            </Grid>

                            <Grid item xs={12}>
                                <BookRow currentTicker={"MSFT"}/>
                            </Grid>
                        </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={2} />

                </Grid>
            </Grid>

        </div>
    )
}

export default UserList;