import React, {useRef} from 'react';
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
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';

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


const BookRow = ({stockObj, sessionToken}) =>{
    const classes = useStyles();
    const inputRef = useRef();

    const [inputText, updateInput] = useState(stockObj.notes) //The initial value is going to be the notes
    const [expanded, setExpanded] = useState(false);
    const [showAlert, setAlert] = useState(false); //Only show the alert when the user submits edit change and succeeds
    const [callBackend, setBackend] = useState(false) //variable to keep track of whether we are 
    
    const [compTicker, setTicker] = useState(stockObj.ticker);
    const [compNotes, setNotes] = useState(stockObj.notes); 
    const [compInfo, setInfo] = useState("");//For future use for the price and news for the day
    const [deleteState, setDeleteState] = useState(true);//Controls whether we show the delete or the edit view for the 'Collapse'

    const handleExpandClick = () => {
      setExpanded(!expanded);
      setAlert(false); //Hide the alert in case it's showing
    };
    useEffect(() =>{

      const apiCall = async () =>{
        var tokenString = 'Token ' + sessionToken
        var res = await fetch( 'http://localhost:8000/api/create-stocknote/',{
            method: 'POST',
            headers :{
                'Authorization' : tokenString,
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
              "ticker": compTicker,
              "notes": inputText,
            })
            }).then(response =>
            response.json().then(data=> {

                console.log("Made it to the callback");
                console.log("This is the data from get-stocknote", data)
                console.log("Backend call completed")
                
                

        }));
      }

      if (callBackend){
        console.log("Checked for status on backend")
        apiCall();
        setBackend(false) //Toggle it for next call

      }
    }, [callBackend])
    
  
    const submitChange = e =>{
      e.preventDefault();
      console.log("Sending edit request for the ticker")
      console.log("This is what the input is: ", inputText)
      setAlert(true);//This might have to be switched to the end of the call 
      setBackend(true)//Change the state to useEffect gets triggered and calls backend
      setNotes(inputText); 
    }

    const inputChange = e =>{
      updateInput(e.target.value)
      
    }

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
              {deleteState?
                <>
                  <Grid container direction='column' spacing={1} alignItems='center'>
                    <Grid item xs={12}>
                      <Box pt={4}>
                        <Typography>
                          Are you sure you want to delete this ticker from your list?  
                        </Typography> 
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box pt={2} pb={2}>
                            <Button variant="outlined" color="primary"> 
                                Yes
                            </Button>
                      </Box>
                    </Grid>

                    <Grid item xs={6}>
                      <Box pt={2} pb={2}>
                            <Button variant="outlined" color="secondary"> 
                                No
                            </Button>
                      </Box>
                    </Grid>
                  </Grid>
                
                </>


                :
                <>
                  { showAlert ? 
                      <Alert severity="success">Note Change Saved!</Alert>
                    : 
                    <> </>

                  }
                
                  <CardContent>
                      <TextField
                        ref={inputRef}
                        label="Edit Stock Note"
                        multiline
                        rows={4}
                        defaultValue={inputText}
                        variant="outlined"
                        id="standard-full-width"
                        placeholder={inputText}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={inputChange}
                      />

                      <Box pt={3}>
                          <Button variant="outlined" color="primary" onClick={submitChange}> 
                              Submit Change
                          </Button>
                      </Box>
                  </CardContent>
                </>
              }
            </Collapse>
        </Card>
    )
}

export default BookRow;

/*
<>
                  { showAlert ? 
                      <Alert severity="success">Note Change Saved!</Alert>
                    : 
                    <> </>

                  }
                </>
                <CardContent>
                    <TextField
                      ref={inputRef}
                      label="Edit Stock Note"
                      multiline
                      rows={4}
                      defaultValue={inputText}
                      variant="outlined"
                      id="standard-full-width"
                      placeholder={inputText}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={inputChange}
                    />

                    <Box pt={3}>
                        <Button variant="outlined" color="primary" onClick={submitChange}> 
                            Submit Change
                        </Button>
                    </Box>
                </CardContent>

*/

