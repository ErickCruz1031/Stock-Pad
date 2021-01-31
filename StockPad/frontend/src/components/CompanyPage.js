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

//The textcont was the one that got the spacing and other stuff down

/*    rootCard: {
        maxWidth: 345,
      },

      */


const CompanyPage = ({stockList}) =>{

    const classes = useStyles();


   
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
                                                <CardMedia
                                                className={classes.media}
                                                image="https://s3.polygon.io/logos/tsla/logo.png"
                                                title="TSLA"
                                                />
                                               <CardContent >

                                                    <Grid container className={classes.gridCard} spacing={1} direction="column">
                                                            <Grid item xs={12}>
                                                                <Typography variant="h3" component="p">
                                                                    Tesla
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <Typography gutterBottom variant="h6" component="p">
                                                                    CEO
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography gutterBottom variant="h6" component="p">
                                                                    Narket Cap
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography gutterBottom variant="h6" component="p">
                                                                    Price
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
<Typography gutterBottom variant="h5" component="h2">
                                                Tesla
                                            </Typography>
                                            <Typography variant="h5" color="textSecondary" component="p">
                                                Company description
                                            </Typography>
                                            <Typography variant="h5" color="textSecondary" component="p">
                                                Company description
                                            </Typography>
                                            <Typography variant="h5" color="textSecondary" component="p">
                                                Company description
                                            </Typography>
                                            <Typography variant="h5" color="textSecondary" component="p">
                                                Company description
                                            </Typography>
                                            <Typography variant="h5" color="textSecondary" component="p">
                                                Company description
                                            </Typography>
                                            <Typography variant="h5" color="textSecondary" component="p">
                                                Company description
                                            </Typography>
                                            <Typography variant="h5" color="textSecondary" component="p">
                                                Company description
                                            </Typography>
                                            <Typography variant="h5" color="textSecondary" component="p">
                                                Company description
                                            </Typography>
                                            <Typography variant="h5" color="textSecondary" component="p">
                                                Company description
                                            </Typography>
                                            <Typography variant="h5" color="textSecondary" component="p">
                                                Company description
                                            </Typography>



*/