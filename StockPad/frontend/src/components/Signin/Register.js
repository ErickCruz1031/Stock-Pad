import React, {useState, useRef, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Stock Pad
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {

    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [triggerCall, setTrigger] = useState(false); //Trigger that will be used for the API call 
    const [errorAlert, setErrorAlert] = useState(false); //At first the alert is not shown


    const classes = useStyles();
    const history = useHistory(); 

    const user_Ref = useRef();//Ref for username child
    const pass_Ref = useRef();//Ref for password child

    const changeUsername = (e) =>{

      setUsername(e.target.value)
    }

    const changePass = (e) =>{
      setPass(e.target.value);
    }

    const changeEmail = e =>{
        setEmail(e.target.value);
    }

    const submitCreds = (e) =>{
      e.preventDefault();
      console.log("Submitted the credentials");
      console.log("These are the inputs ", username, ' ', pass)

      //Change the state of the trigger variable so that the useEffect will execute 
      //triggerCall = true; //Set it to true so that useEffect executes 
      setTrigger(true)
      user_Ref.current.value = "";
      pass_Ref.current.value = "";

      console.log("Finished the calll")
            

    }

    useEffect(() =>{
        console.log("In the frontend about to register new user...");
    
        const RegisterUser = async () =>{
            var res = await fetch( 'http://localhost:8000/auth/register/',{
                method: 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": email,
                    "email" : email,
                    "password": pass,
                })
            }).then(response =>
            response.json().then(data=> {
                /*
                if (data.non_field_errors){
                    console.log("WARNING")
                    console.log("This is the data ", data);
    
                }
                else{
                    //setLogState(true, data.token); //Alter the state
                    //This is the function from the parent component App
                    console.log("Created the user successfully");
                    console.log("The token is ", data.token);
                    console.log("The user is ", data.user);
                    console.log("This is the data:", data);
                    //triggerCall = false; //Might not be necessary
                    setTrigger(false);
                    history.push('/home')
                }*/

                if (data.ok) {
                  console.log("We hit the OK");
                  //This is the function from the parent component App
                  console.log("Created the user successfully");
                  console.log("The token is ", data.token);
                  console.log("The user is ", data.user);
                  console.log("This is the data:", data);
                  //triggerCall = false; //Might not be necessary
                  setTrigger(false);
                  history.push('/home')
                  //return response.json();
                } else {
                  //If there was a bad request entered then throw an error (Turn on vaiable to make a visible warning)
                  setErrorAlert(true); //If it was a bad request show the alert
                  throw new Error('Something went wrong ...');
                }
    
            }));
    
        } //Function to register the new user 
        if (triggerCall){
            RegisterUser();
        } //If triggerCall is true then we make the call. Otherwise we skip
    
            
      
          

    },[triggerCall]);//This is where the API call will be to create the new user 




  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            ref={user_Ref}
            onChange={changeEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            ref={pass_Ref}
            onChange={changePass}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            ref={pass_Ref}
            onChange={changePass}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitCreds}
          >
            Register
          </Button>
        </form>
      </div>

      <Grid container direction="row">
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Grid container direction="column" alignItems="center" justify="center">
            <Box pt={1}>
              {errorAlert?
                                  
                <Slide direction="up" in={errorAlert} mountOnEnter unmountOnExit>
                    
                    <Alert severity="error">The username or password endetered are not valid. Please try again.</Alert>
                    
                </Slide>
                
                :
                <> </>

              }
            </Box>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={2} />
      </Grid>

    </Container>
  );
}
export default Register;