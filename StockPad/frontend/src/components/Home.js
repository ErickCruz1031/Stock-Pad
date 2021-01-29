import React, {Component} from 'react';
import {render} from 'react-dom'
import Dashboard from './Dashboard/Dashboard';
import Header from './Header'
import Grid from '@material-ui/core/Grid';
import Content from './Content';
import StockRow from './StockRow';
import { Card } from '@material-ui/core';
import { sizing,palette  } from '@material-ui/system';
import {makeStyles} from '@material-ui/styles'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles(() =>({
    root: {
        flexGrow: 1,
      },
    typographyStyle : {
        flex : 1
    },


}))


const Home = () =>{

    const classes = useStyles();
   
    return(
        <div className={classes.root}>
            <Grid container direction="column" spacing={1}>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Header />
                    </Grid>
                </Grid>

                <Grid container direction="row">
                    <Grid item xs={2} />
                    <Grid item xs={8}>
                        <Grid container direction="columns" spacing={10} justify="center" alignItems="center">
                            <Grid item xs={12} alignItems="center" justify="center">
                                <Box pt={10}>
                                    <TextField id="standard-basic" placeholder="Enter Ticker Here"/>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <StockRow/>
                                <StockRow />
                                <StockRow />
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
