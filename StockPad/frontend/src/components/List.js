import React, {useState, useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import BookRow from './BookRow'
import Box from '@material-ui/core/Box';
import useStateWithCallback from 'use-state-with-callback';


const useStyles = makeStyles(() =>({
    root: {
        flexGrow: 1,
      },
    typographyStyle : {
        flex : 1
    },


}))


const List = ({objectArray}) =>{

    const classes = useStyles();

    useEffect(() =>{
        console.log("MOUNTING the List object with ", objectArray)
    }, [objectArray])

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
                        {objectArray.map((stock) =>( 
                            <Grid item xs={12} key={stock.ticker}>
                                <BookRow stockObj={stock}/>
                            </Grid>
                        ))}


                    </Grid>
                    </Box>
                </Grid>

                <Grid item xs={2} />

            </Grid>
        </Grid>

    </div>

    )
}

export default List;

//<div key={stock.ticker}> HIIII {stock.ticker}</div>