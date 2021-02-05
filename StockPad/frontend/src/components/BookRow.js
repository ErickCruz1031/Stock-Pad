import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useState, useEffect} from 'react';
//import "core-js/stable";
//import "regenerator-runtime/runtime";
import regeneratorRuntime from "regenerator-runtime"
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AlarmIcon from '@material-ui/icons/Alarm';


/*

  root: {
    maxWidth: 345,
    paddingTop:2,
  },

    expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },


*/
const useStyles = makeStyles((theme) => ({
  media: {
    height: 60,
  },
  expand: {
    transform: 'rotate(0deg)',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));





const BookRow = ({currentTicker}) =>{
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    
    const [compTicker, setTicker] = useState("");
    const [compNotes, setNotes] = useState(""); 
    const [compInfo, setInfo] = useState("");//For future use for the price and news for the day

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    useEffect(() =>{

      const apiCall = async () =>{
        //api/get-stocknote/?symbol=AAPL
        var query = "/api/get-stocknote?symbol=" + currentTicker;
        const res = await fetch(query);
        const data = await res.json();
        console.log("Here is the data ", data);
        console.log("Query is :", query)
        setTicker(data.ticker);
        setNotes(data.notes);
      }

      apiCall();
    }, [])
  

    return(
        <Card>
            <CardActionArea>
                <CardContent className={classes.media}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {compTicker}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {compNotes}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}>
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
            </CardActionArea>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>Method:</Typography>
                    <Typography>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default BookRow;

/*
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}>
                        <ExpandMoreIcon />
                    </IconButton>

                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    */
