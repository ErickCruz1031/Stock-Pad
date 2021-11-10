import React, {Component, useEffect} from 'react';
import {render} from 'react-dom'
import Header from './Header'
import Grid from '@material-ui/core/Grid';
import StockRow from './StockRow';
import { Card } from '@material-ui/core';
import { sizing,palette  } from '@material-ui/system';
import {makeStyles} from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(() =>({
    root: {
        flexGrow: 1,
      },
    typographyStyle : {
        flex : 1
    },


}))


//const Home = ({stockList, queryFunc}) =>{
const Home = ({stockList, queryFunc, apiK}) =>{

    const classes = useStyles();
    const history = useHistory();

    const [textInput, setText] = useState("");

    const inputChange = e =>{
        setText(e.target.value);
    }

    const enterTrigger = (e) =>{
        e.preventDefault();
        console.log("This is the Enter event trigger "); 
        queryFunc(textInput);
        history.push('/companypage');
        
    }

    const notebookLink = () =>{
        console.log("Opted to go for the notebook, pushing...", history);
        history.push('/userlist');


    }

   
    return(
        <div className={classes.root}>
            <Grid container direction="column" spacing={1}>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Header noteCall={notebookLink}/>
                    </Grid>
                </Grid>

                <Grid container direction="row">
                    <Grid item xs={2} />
                    <Grid item xs={8}>
                        <Grid container direction="row" spacing={10} justify="center" alignItems="center">
                            <Grid item xs={4}>
                                <Box pt={10}>
                                    <TextField id="standard-basic" placeholder="Enter Ticker Here" onChange={inputChange}/>
                                </Box>
                            </Grid>

                            <Grid item xs={2}>
                                <Box pt={10}>
                                    <Button variant="contained" color="secondary" onClick={enterTrigger}>
                                        Search
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={6} />

                            <Grid item xs={12}>
                                <StockRow newsItem={stockList[0]} polygonKey={apiK}/>
                                <StockRow newsItem={stockList[1]} polygonKey={apiK}/>
                                <StockRow newsItem={stockList[2]} polygonKey={apiK}/>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={2} />
                </Grid>
            </Grid>
        </div>
    )
    
}

export default Home;
