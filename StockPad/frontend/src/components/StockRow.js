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


/*

  root: {
    maxWidth: 345,
    paddingTop:2,
  },

*/
const useStyles = makeStyles({
  media: {
    height: 160,
  },
});





const StockRow = ({newsItem}) =>{
    const classes = useStyles();

    const [tickerHeadline, updateHeadline] = useState("");
    const [headlineDesc, updateDesc] = useState("");


    useEffect(() =>{
      console.log("We are mounting this component into the page.");
      console.log("Placing this for testing hereeeeee")
    
      const apiCall = async () =>{
        //https://api.polygon.io/v2/reference/news?limit=10&order=descending&sort=published_utc&ticker=TSLA&apiKey=EwdgXn2W7ptj4vkx9B40T3HiVEvV4v3e
        //const query = "https://api.polygon.io/v1/meta/symbols/" + newsItem.ticker + "/news?perpage=10&page=1&apiKey=EwdgXn2W7ptj4vkx9B40T3HiVEvV4v3e";
        const query = "https://api.polygon.io/v2/reference/news?limit=10&order=descending&sort=published_utc&ticker="+ newsItem.ticker + "&apiKey=EwdgXn2W7ptj4vkx9B40T3HiVEvV4v3e";
       console.log("The query in this component is ", query);
        const res = await fetch(query);
        const data = await res.json();
        console.log("This is the data for ", newsItem.ticker, " ", data.results[0]);
        updateHeadline(data.results[0].title);
        updateDesc(data.results[0].description);
        //Just use the title and summary for the first one right now

        console.log("We are in the new and improved Stockrow");

        /*
        var res = await fetch("https://api.polygon.io/v2/reference/news?limit=10&order=descending&sort=published_utc&ticker="+ newsItem.ticker + "&apiKey=EwdgXn2W7ptj4vkx9B40T3HiVEvV4v3e")
          .then(response => 
            response.json().then(data =>{
              console.log("Now the data for ", newsItem.ticker, " ", data[0])
            }))
            */

      }







      apiCall();

    
    }, [])


    return(
        <Card>
        <CardActionArea>
          <CardContent className={classes.media}>
            <Typography gutterBottom variant="h5" component="h2">
              {tickerHeadline}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {headlineDesc}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
}

export default StockRow;

