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
const CompanyPage = ({searchTicker}) =>{

    const classes = useStyles();
    const history = useHistory();

    //Need to change this 
    const [currentTicker, setSearch] = useState(searchTicker);
    const [compName, setName] = useState("");
    const [ceoText, setCeo] = useState("");
    const [descText, setDesc] = useState("");
    const [capText, setCap] = useState(0);
    const [similar, setSimilar] = useState([]); //Empty array at first 
    const [imageURL, setURL] = useState("");
    const [apiCount, setAPI] = useState(0) // Initially we are going to set the API
    const [showAlert, updateAlert] = useState(false)//Do not show teh alert at the beginning 


    useEffect(() =>{

        const apiCall = async() =>{
            const query = "https://api.polygon.io/v1/meta/symbols/" + currentTicker + "/company?apiKey=EwdgXn2W7ptj4vkx9B40T3HiVEvV4v3e";
            console.log("this is the query: ", query);
            const res = await fetch(query);
            const data = await res.json();
            console.log("This is the data ", data);
            setName(data.name);//Set company name
            setCeo(data.ceo);//Set CEO name
            setDesc(data.description)//Set company name
            setCap(data.marketcap);//Set market cap (Will have to format this number at a later time)
            setSimilar(data.similar); //Set equal to array of similar tickers
            setURL(data.logo);//Set image URL for logo pictire
            //We're going to have to query to see if any ticker the user tries to add is already in the user list 
            //Here check if the company is already in the list for this user 


        }
        apiCall();


    }, [apiCount]) //Make sure it only executed when the component is created

    const changeInput = (e) =>{
        setSearch(e.target.value);

    }

    const buttonTrigger = e =>{
        e.preventDefault();
        setAPI(apiCount + 1) //Just change it to trigger the API to call and change the state
        
    }

    const addStock = e =>{
        console.log("User wants to add ", currentTicker);
        updateAlert(true)
        //When you do this toggle an alert on
    }

    const notebookLink = () =>{
        console.log("Opted to go for the notebook from the company page, pushing...", history);
        history.push('/userlist');


    }



   
    return(
        <div className={classes.root}>
            <Grid container directtion="column" spacing={1}>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Header noteCall={notebookLink}/>
                    </Grid>
                </Grid>

                <Grid container direction="row">
                    <Grid item xs={2} />
                    <Grid item xs={8}>
                        <Grid container direction-="column" alignItems="center" justify="center">


                            {showAlert?
                                <>
                                    <Grid item xs={2} />
                                    <Grid item xs={8}>
                                    <Slide direction="up" in={showAlert} mountOnEnter unmountOnExit>
                                        <Box pt={1}>
                                            <Alert severity="success">Ticker Saved to List!</Alert>
                                        </Box>
                                    </Slide>
                                    </Grid>
                                    <Grid item xs={2} />
                                </>
                                :
                                <> </>

                            }


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
                                                                    Similar
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography gutterBottom variant="body1" component="p">
                                                                    {similar}
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

/*
                    <Grid item xs={2} />
                    <Grid item xs={8}>
                        <Box pt={5}>
                            <Alert severity="success">Ticker Saved to List!</Alert>
                        </Box>
                    </Grid>
                    <Grid item xs={2} />
*/