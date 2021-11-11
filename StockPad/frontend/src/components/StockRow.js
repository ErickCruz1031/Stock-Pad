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

const useStyles = makeStyles({
  media: {
    height: 160,
  },
});





const StockRow = ({newsItem, polygonKey}) =>{
    const classes = useStyles();

    const [tickerHeadline, updateHeadline] = useState("");
    const [headlineDesc, updateDesc] = useState("");
    const [articleURL, setURL] = useState("");//This will be the URL of the article for this component

    const cardClick = e =>{
      e.preventDefault();
      console.log("User clicked the card!")
      window.open(articleURL);//Testing this first
    }//Function to redirect the user if they click on one of the articles


    useEffect(() =>{
      console.log("We are mounting this component into the page.");
    
      const apiCall = async () =>{
        console.log("Fetching the API request")
        const query = "https://api.polygon.io/v2/reference/news?limit=10&order=descending&sort=published_utc&ticker="+ newsItem.ticker + "&apiKey=" + polygonKey;
        console.log("The query in this component is ", query);
        const res = await fetch(query);
        const data = await res.json();
        console.log("This is the data for ", newsItem.ticker, " ", data.results[0]);
        updateHeadline(data.results[0].title);
        updateDesc(data.results[0].description);
        setURL(data.results[0].article_url);
        //Just use the title and summary for the first one right now

        console.log("We are in the new and improved Stockrow");

      }



      apiCall();

    
    }, [])


    return(
        <Card onClick={cardClick}>
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
}//Component that shows up within the Home component to show news/descriptions of articles

export default StockRow;

