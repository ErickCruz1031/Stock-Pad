import React, {Component} from 'react';
import {render} from 'react-dom'
import Header from './Header'
import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';
import { sizing,palette  } from '@material-ui/system';
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CenterFocusStrong } from '@material-ui/icons';
import {useEffect, useState} from 'react'
import regeneratorRuntime from "regenerator-runtime";
//import FittedImage from 'react-fitted-image';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useHistory} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles(() =>({
    root: {
        flexGrow: 1,
      },
    typographyStyle : {
        flex : 1
    },
    media: {
        height: 100,
        width:100,
        borderRadius:'5px',
    },
    rootCard: {
        minHeight: 600,
        alignItems: 'center',
    },
    picCont:{ 
        display:'flex', 
        flexDirection:'column', 
        alignItems:'center' 
    },
    gridCard:{
        display : 'flex',
        flexDirection:'column',
        alignItems:'center',

    },
    textCont:{
        width:'200%',
    },
}))


//const CompanyPage = ({searchTicker}) =>{
const CompanyPage = ({searchTicker, userToken}) =>{

    const classes = useStyles();
    const history = useHistory();

    //Need to change this 
    const [currentTicker, setSearch] = useState(searchTicker);
    const [compName, setName] = useState("");
    const [ceoText, setCeo] = useState("");
    const [descText, setDesc] = useState("");
    const [capText, setCap] = useState(0);
    const [similar, setSimilar] = useState([]); //Empty array at first 
    const [compURL, setcompURL] = useState("");
    const [imageURL, setURL] = useState("");
    const [apiState, setAPI] = useState(true) // Initially we are going to set the API ---> Going to change to a boolean instead of a integer variable
    const [showAlert, updateAlert] = useState(false)//Do not show teh alert at the beginning 
    const [errorAlert, updateErrorAlert] = useState(false)//This is for the error alert when the ticker is already on the user's 

    const [createTrigger, setTrigger] = useState(false) //We aren't creating new notes going into the component


    useEffect(() =>{

        const createNote = async () =>{
            console.log("Trying to make a new stock note with this ticker: ", currentTicker);
            var tokenString = 'Token ' + userToken
            var res = await fetch( 'http://localhost:8000/api/create-new/',{
                method: 'POST',
                headers :{
                    'Authorization' : tokenString,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "ticker": currentTicker,
                    "notes": "Placeholder",
                })
                }).then(response =>{

                    
                   return response.json()
                   //return [response.json(), response.status]

                }).then(data=> {
                   //var res = data.json()
                   console.log("Made it to the call here with code ", data.Status);
                   console.log("This is the data from create-new", data)
                   if (data.Status == 400){
                       console.log("The error was 400")
                       updateErrorAlert(true)//Show the error alert
                       console.log("About to delay the trigger to turn off the alert ");
                       setTimeout(() => {console.log("The TIMEOUT FINISHED"); updateErrorAlert(false)}, 4000);
                   }//This is an alert when there is 
                   else{
                    updateAlert(true)//Show the successful alert 
                    console.log("About to delay the trigger to turn off the alert ");
                    setTimeout(() => {console.log("The TIMEOUT FINISHED"); updateAlert(false)}, 4000); //Let the alert stay on for 4 seconds and then get rid of it 

                   }
                   setTrigger(false)//Set trigger off for next call to this function
            });
  
        }//API call for the backend to create a new object for this stock (STILL WORKING)




        const apiCall = async() =>{
            const query = "https://api.polygon.io/v1/meta/symbols/" + currentTicker + "/company?apiKey=EwdgXn2W7ptj4vkx9B40T3HiVEvV4v3e";
            console.log("this is the query: ", query);
            const res = await fetch(query).catch(function(error){ console.log(error)});
            const data = await res.json();
            console.log("This is the data ", data);
            setName(data.name);//Set company name
            setCeo(data.ceo);//Set CEO name
            setDesc(data.description)//Set company name
            setCap(data.marketcap);//Set market cap (Will have to format this number at a later time)
            setSimilar(data.similar); //Set equal to array of similar tickers
            setURL(data.logo);//Set image URL for logo pictire
            setcompURL(data.url);//Set the url to the website of the company
            setAPI(false); //Set it to false before returning
            //We're going to have to query to see if any ticker the user tries to add is already in the user list 
            //Here check if the company is already in the list for this user 


        }//API cal to fetch data from the third-party API


        console.log("We are in the call for the company page")
        
        if(apiState){

            console.log("Executing the API call")
            apiCall();
        }//Only call the polygon API if the state is true 

        if(createTrigger){
            //Query the tickers that this user already has on their list 
            //Update: createNote already returns an error 400 if the ticker is already part of the user's book

            createNote();
            console.log("We just called the new function to test it out");

        }//If the call was to create a new Stocknote then call the backend API

        


    }, [apiState, createTrigger]) //Make sure it only executed when the component is created or when the API call is triggered to add new element

    const changeInput = (e) =>{
        setSearch(e.target.value);

    }

    const buttonTrigger = e =>{
        e.preventDefault();
        setAPI(true) //Just change it to trigger the API to call and change the state
        
    }

    const addStock = e =>{
        console.log("User wants to add ", currentTicker);
        console.log("The states are ", errorAlert , " and ",showAlert )
        setTrigger(true)//Set the trigger to call the backend
        //console.log("About to delay the trigger to turn off the alert ");
        //setTimeout(() => {console.log("The TIMEOUT FINISHED"); setTrigger(false)}, 4000); //Let the alert stay on for 4 seconds and then get rid of it 
        //When you do this toggle an alert on
    }

    const notebookLink = () =>{
        console.log("Opted to go for the notebook from the company page, pushing...", history);
        history.push('/userlist');

    }

    const homeLink = () =>{
        console.log("Going home. Pushing to the history");
        history.push('/home');
    }



   
    return(
        <div className={classes.root}>
            <Grid container directtion="column" spacing={1}>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Header noteCall={notebookLink} homeCall={homeLink}/>
                    </Grid>
                </Grid>

                <Grid container direction="row">
                    <Grid item xs={2} />
                    <Grid item xs={8}>
                        <Grid container direction-="column" alignItems="center" justify="center">

                            <Grid item xs={2}/>
                            <Grid item xs={8}>
                            <Box pt={1}>
                            {showAlert?
                                
                                    
                                <Slide direction="up" in={showAlert} mountOnEnter unmountOnExit>
                                    
                                    <Alert severity="success">Ticker Saved to List!</Alert>
                    
                                </Slide>
                                
                                :
                                <> </>

                            }

                            {errorAlert?
                                
                                <Slide direction="up" in={errorAlert} mountOnEnter unmountOnExit>
                                    
                                    <Alert severity="error">Ticker Is Alread on the User's List!</Alert>
                                   
                                </Slide>
                                
                                :
                                <> </>

                            }
                            </Box>
                            </Grid>
                            <Grid item xs={2} />


                            <Grid item xs={4}>
                                <Box pt={3} pb={3}>
                                    <TextField id="standard-basic" placeholder="Enter Ticker Here" onChange={changeInput}/>
                                </Box>
                            </Grid>

                            <Grid item xs={2}>
                                <Box pt={5} pb={3}>
                                    <Button variant="contained" color="secondary" onClick={buttonTrigger}>
                                        Search
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={6} />

                            <Grid item xs={12}>
                                <Card className={classes.rootCard}>
                                    <CardActionArea>
                                                <> {imageURL ? 

                                                    <CardMedia
                                                    className={classes.media}
                                                    image={imageURL}
                                                    title="TSLA"
                                                    />

                                                    :

                                                    <CircularProgress />

                                                 }          
                                                </>
                                    
                                                <CardContent >
                                                    <Grid container className={classes.gridCard} spacing={1} direction="column">
                                                            <Grid item xs={12}>
                                                                <Typography variant="h4" component="p">
                                                                    {compName}
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <Typography gutterBottom variant="h5" component="p">
                                                                    Description
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography gutterBottom variant="body1" component="p">
                                                                    {descText}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography gutterBottom variant="h5" component="p">
                                                                    CEO
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography gutterBottom variant="body1" component="p">
                                                                    {ceoText}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography gutterBottom variant="h5" component="p">
                                                                    Market Cap
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography gutterBottom variant="body1" component="p">
                                                                    {capText}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography gutterBottom variant="h5" component="p">
                                                                    Company Site
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography gutterBottom variant="body1" component="p">
                                                                    {compURL} 
                                                                </Typography>
                                                            </Grid>
                                                            
                                                            
                                                    </Grid>
                                                </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={addStock}>
                                        Add to Notebook
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2} />


                
                </Grid>

                    

     
            </Grid>
        </div>
    )

}

export default CompanyPage;
