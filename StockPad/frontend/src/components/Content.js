import {AppBar, Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import StockRow from './StockRow';
import React from 'react';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    cardForm : {
        color:'red'
    }
})

const Content = () =>{

    return(
            <StockRow />
    )
}

export default Content;
