import PropTypes from 'prop-types';
import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() =>({
    typographyStyle : {
        flex : 1
    }

}))


const Header = () =>{

    const classes = useStyles();

    return(
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.typographyStyle}>
                    Stock Pad
                </Typography>
                
                <Button variant="contained" color="secondary">
                    Notebook
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header;