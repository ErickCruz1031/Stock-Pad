import React, {useState, useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import BookRow from './BookRow'
import Box from '@material-ui/core/Box';
import useStateWithCallback from 'use-state-with-callback';
import {useHistory} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Alert from '@material-ui/lab/Alert';


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
    const history = useHistory();

    const [userStocks, setStocks] = useState([]);
    const [fetched, setFetch] = useState(false) //Set to empty array
    const [deleteTicker, setDeleteTicker] = useState("")//This is the ticker that we are going to delete when we opt for that option
    const [deleteRequest, setDeleteState] = useState(false);//Will trigger the delete call]
    const [emptyList, setEmptyState] = useState(false);//This variable indicates whether or not the user list is empty
    //Add a variable so that when the stockList is empty, we display a message that says so


    useEffect (() =>{
        console.log("In the frontend about to get the stocknotes...");
        console.log("This is the token we are going ton use ", userToken)
        console.log("This is userStocks going into it ", userStocks)

        const deleteCall = async () =>{
            console.log("Going to delete ", deleteTicker);
            var tokenString = 'Token ' + userToken
            var res = await fetch( 'http://localhost:8000/api/delete-stocknote/',{
                method: 'POST',
                headers :{
                    'Authorization' : tokenString,
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({
                  "ticker": deleteTicker,
                  "notes": 'Filter',
                })
                }).then(response =>
                response.json().then(data=> {
    
                    console.log("Made it to the callback for the delete callback");
                    console.log("This is the data from DELETE", data)
                    console.log("Backend call completed")
                    if (data.Status == 200){
                        setStocks(data.objects)
                    }
                   
                    
    
            }));
    
          }//Call to delete the selected Stocknote object with particular ticker
  
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
                    setStocks(data)
                    if (data.length == 0){
                        console.log("This user did not have any stocks in their personal list.");
                        setEmptyState(true);//Set the variable to true if the data returned from the call is empty
                    }
                    //Might have to deal with the scenario where user list was previously 0 but now its not
                    //Dont think that can be changed from this single view right now 
                    console.log(typeof(data))

            }));
  
        }
        if (userStocks.length == 0){
            callFetch();
        }//Only call on the first one
        else{//Different if statement here 
            deleteCall();
        }
        
        console.log("THis is what was returned");
        
  
    }, [deleteRequest]) //Include the empty dependency array for the useEffect
    //This call will get called when this component gets mounted
    
    const notebookLink = () =>{
        console.log("Opted to go for the notebook from the user list page, pushing...", history);
        history.push('/userlist');

    }

    const homeLink = () =>{
        console.log("Going home. Pushing to the history");
        history.push('/home');
    }

    const deleteCallback = tick =>{
        console.log("We are going to delete this ticker ", tick)
        setDeleteTicker(tick);//Set the variable to the ticker that we are deleting
        setDeleteState(!deleteRequest);//Trigger the call to the delete backend API

    }



    return(
        <div className={classes.root}>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Header noteCall={notebookLink} homeCall={homeLink}/>
                </Grid>
                <Grid container direction="row" spacing={1}>
                    <Grid item xs={2} />

                    { emptyList ? 

                        <Grid item xs={8}>
                            <Box pt={6}>
                                <Alert severity="error">User List is Empty!</Alert>
                            </Box>
                        </Grid>
                    
                
                    
                    : 

                        <Grid item xs={8}>
                            <Box pt={6}>
                            <Grid container direction="column" spacing={2}>
                                {userStocks.map((stock) =>( 
                                    <Grid item xs={12} key={stock.ticker}>
                                        <BookRow stockObj={stock} sessionToken={userToken} deleteFunc={deleteCallback}/>
                                    </Grid>
                                ))}


                            </Grid>
                            </Box>
                        </Grid>
                    
                    
                    
                    }

                    

                    <Grid item xs={2} />

                </Grid>
            </Grid>

         </div>

    )
}

export default UserList;


/*
        <div className={classes.root}>

            <List objectArray={userStocks} />

        </div>

*/

    

