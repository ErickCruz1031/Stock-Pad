import React, {useState, useEffect, useRef} from 'react';
import Header from './Header'
import Grid from '@material-ui/core/Grid';
import StockRow from './StockRow';
import { Card, Typography } from '@material-ui/core';
import { sizing,palette  } from '@material-ui/system';
import {makeStyles} from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Signin from './Signin/Signin'


const useStyles = makeStyles(() =>({
    root: {
        flexGrow: 1,
      },
    typographyStyle : {
        flex : 1
    },


}))

const LoginPage = () =>{

    const classes = useStyles();



    return(
        <div className={classes.root}>
            <Grid container direction="column" spacing={1}>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Header />
                    </Grid>
                </Grid>

                <Signin />
            </Grid>
        </div>
    )
}


export default LoginPage;

/*

<Grid container direction="row">
                    <Grid item xs={4} />
                    <Grid item xs={8}>
                        <Grid container direction="row" spacing={10} justify="center" alignItems="center">
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h5">
                                    Login
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box pt={10}>
                                    <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                        />
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Box pt={10}>
                                    <Button variant="contained" color="secondary" >
                                        Search
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} />
                </Grid>

*/