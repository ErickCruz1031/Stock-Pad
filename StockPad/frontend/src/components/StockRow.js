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
    
      const apiCall = async () =>{
        const query = "https://api.polygon.io/v1/meta/symbols/" + newsItem.ticker + "/news?perpage=10&page=1&apiKey=EwdgXn2W7ptj4vkx9B40T3HiVEvV4v3e";
        const res = await fetch(query);
        const data = await res.json();
        updateHeadline(data[0].title);
        updateDesc(data[0].summary);
        //Just use the title and summary for the first one right now

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

/*


    return(
        <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {newsItem.headline}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {newsItem.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
}
*/
