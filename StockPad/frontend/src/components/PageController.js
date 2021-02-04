import CompanyPage from './CompanyPage'
import { Card } from '@material-ui/core';
import { sizing,palette  } from '@material-ui/system';
import {makeStyles} from '@material-ui/styles'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import {useState, useEffect} from 'react';
import UserList from './UserList';
import React from 'react';



const useStyles = makeStyles(() =>({
    root: {
        flexGrow: 1,
      },
    typographyStyle : {
        flex : 1
    },


}))


const PageController = ({queryTicker}) =>{

    const classes = useStyles();


    return(
        <div className={classes.root}>
            <CompanyPage searchTicker={queryTicker}/>
        </div>

    )
}

export default PageController;