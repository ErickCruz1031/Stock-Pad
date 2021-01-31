import React, {Component} from 'react';
import {render} from 'react-dom'
import Dashboard from './Dashboard/Dashboard';
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
        height: 550,
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


const CompanyPage = ({queryTicker}) =>{

    const classes = useStyles();

    const [compName, setName] = useState("");
    const [ceoText, setCeo] = useState("");
    const [descText, setDesc] = useState("");
    const [capText, setCap] = useState(0);
    const [similar, setSimilar] = useState([]); //Empty array at first 
    const [imageURL, setURL] = useState("");


    useEffect(() =>{

        const apiCall = async() =>{
            const query = "https://api.polygon.io/v1/meta/symbols/" + queryTicker + "/company?apiKey=EwdgXn2W7ptj4vkx9B40T3HiVEvV4v3e";
            //https://api.polygon.io/v1/meta/symbols/TSLA/company?apiKey=EwdgXn2W7ptj4vkx9B40T3HiVEvV4v3e
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

        }

        apiCall();


    }, []) //Make sure it only executed when the component is created



   
    return(
        <div className={classes.root}>
            <Grid container directtion="column" spacing={1}>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Header />
                    </Grid>
                </Grid>

                <Grid container direction="row">
                    <Grid item xs={2} />

                    <Grid item xs={8}>
                        <Grid container direction-="column" alignItems="center" justify="center">
                            <Grid item xs={12}>
                                <Box pt={10} pb={8}>
                                    <TextField id="standard-basic" placeholder="Enter New Here"/>
                                </Box>
                            </Grid>

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
                                                                <Typography variant="h3" component="p">
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
                                        <Button size="small" color="primary">
                                        Add to Notebook
                                        </Button>
                                    </CardActions>
                                </Card>

                            </Grid>
                        </Grid>
                    </Grid>
                
                </Grid>
                <Grid>

                    <Grid item xs={2} />

                 </Grid>
             </Grid>
    </div>
)

}

export default CompanyPage;

/*
This was after the <CardActionArea> tag 


<CardMedia
className={classes.media}
image="https://s3.polygon.io/logos/tsla/logo.png"
title="TSLA"
/>


*/