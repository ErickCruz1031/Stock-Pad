import PropTypes from 'prop-types';
import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles(() =>({
    typographyStyle : {
        flex : 1
    }

}))


const Header = ({noteCall, homeCall}) =>{

    const classes = useStyles();

    return(
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.typographyStyle}>
                    Stock Pad
                </Typography>

                <Box pl={5}>
                    <Button variant="contained" color="secondary" onClick={homeCall}>
                        Home
                    </Button>
                </Box>
                
                <Box pl={5}>
                    <Button variant="contained" color="secondary" onClick={noteCall}>
                        Notebook
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
