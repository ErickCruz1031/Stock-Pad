import React, {Component} from 'react';
import {render} from 'react-dom'
import Dashboard from './Dashboard/Dashboard';
import Header from './Header'
import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';
import { sizing,palette  } from '@material-ui/system';
import {makeStyles} from '@material-ui/styles'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(() =>({
    root: {
        flexGrow: 1,
      },
    typographyStyle : {
        flex : 1
    },
    media: {
        height: 140,
    },
    rootCard: {
        height: 550,
    },
}))

/*    rootCard: {
        maxWidth: 345,
      },

      */


const CompanyPage = () =>{

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
                                        image="/static/images/cards/contemplative-reptile.jpg"
                                        title="Contemplative Reptile"
                                        />
                                        <CardContent>
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

                    <Grid item xs={2} />

                </Grid>
            </Grid>
        </div>
    )
    
}

export default CompanyPage;