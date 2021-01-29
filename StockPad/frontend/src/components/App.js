import React, {Component} from 'react';
import {render} from 'react-dom'
import Dashboard from './Dashboard/Dashboard';
import Header from './Header'
import Grid from '@material-ui/core/Grid';
import Content from './Content';
import StockRow from './StockRow'
import { sizing,palette  } from '@material-ui/system';
import {makeStyles} from '@material-ui/styles'


const useStyles = makeStyles(() =>({
    root: {
        flexGrow: 1,
      },
    typographyStyle : {
        flex : 1
    },


}))


const App = () =>{

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
                        <StockRow />
                        <StockRow />
                    </Grid>
                    <Grid item xs={2} />
                </Grid>
            </Grid>
        </div>
    )
    
}

const rootDiv = document.getElementById('root');
render(<App />, rootDiv);


/*
               <Grid item > <Header /> </Grid>

                <Grid item container direction="row">
                    <Grid item xs={2} />

                    <Grid item xs={4}>
                        <Content />
                    </Grid>

                    <Grid item xs={4}>
                        <Content />
                    </Grid>

                    <Grid item xs={2} />
                </Grid>

*/