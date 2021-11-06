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
    const [passTwo, setPassTwo] = useState("");//The second password entered used to confirm that they both match
    const [email, setEmail] = useState("");
    const [triggerCall, setTrigger] = useState(false); //Trigger that will be used for the API call 
    const [errorAlert, setErrorAlert] = useState(false); //At first the alert is not shown
    const [passMismatch, setMismatch] = useState(false);//Variable that will set off alert if the passwords do not match


    const classes = useStyles();
    const history = useHistory(); 

    const user_Ref = useRef();//Ref for username child
    const pass_Ref = useRef();//Ref for password child

    const changeUsername = (e) =>{
      setUsername(e.target.value)
    }//Function sets the username that will be send in the request

    const changePass = (e) =>{
      setPass(e.target.value);
      //When we submit we need to check whether the passwords in the two text fields match 
    }

    const changeSecondPass = e => {
      setPassTwo(e.target.value);//Set the second password which will be used when the user tries to send the request
    }

    const changeEmail = e =>{
        setEmail(e.target.value);
    }//Function sets the email that will be used when the user sends the request

    const submitCreds = (e) =>{
      e.preventDefault();
      console.log("Submitted the credentials");
      //Change the state of the trigger variable so that the useEffect will execute 
      setTrigger(true)
      user_Ref.current.value = "";
      pass_Ref.current.value = "";
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
                    "username": username,
                    "email" : email,
                    "password": pass,
                })
            }).then(response =>
            response.json().then(data=> {
                if (data.ok) {
                  console.log("We hit the OK");
                  //This is the function from the parent component App
                  console.log("Created the user successfully");
                  console.log("The token is ", data.token);
                  console.log("The user is ", data.user);
                  console.log("This is the data:", data);
                  setTrigger(false);
                  history.push('/home')
                } else {
                  //If there was a bad request entered then throw an error (Turn on vaiable to make a visible warning)
                  setErrorAlert(true); //If it was a bad request show the alert
                  console.log(data)
                  throw new Error('Something went wrong ...');
                }
    
            }));
    
        } //Function to register the new user 
        if (triggerCall){
          console.log("Going in these are the two passwords: ", pass, " and ", passTwo);
          //Before we call the request, check if the two passwords match
          if(pass == passTwo){
            console.log("The two passwords match, making the call...");
            setMismatch(true)//Toggle off the alert(Don't think this matters since we're switching the view)
            RegisterUser();
          }//If the two passwords match make the call. Otherwise, throw out a warning 
          else{
            setMismatch(true)//If the passwords don't match, trigger the alert
            setTrigger(false);//Reset the trigger for this call in case the user wants to re-submit the request

          }//If they dont match, show a warning indicating that the passwords do not match
          
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
              error = {true === errorAlert}
              ref={user_Ref}
              onChange={changeUsername}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
          <TextField
            error = {true === errorAlert}
            ref={user_Ref}
            onChange={changeEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            error = {true === errorAlert}
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
            error = {true === errorAlert}
            ref={pass_Ref}
            onChange = {changeSecondPass}
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

          <Grid container direction="row" xs={12}>
          <Grid item xs={12}>
            <Grid container direction="column" alignItems="center" justify="center">
              <Box pt={1}>
                {errorAlert?
                                    
                  <Slide direction="up" in={errorAlert} mountOnEnter unmountOnExit>
                      
                      <Alert severity="error">The username, password and/or email entered are not valid. Please try again.</Alert>
                      
                  </Slide>
                  
                  :
                  <> </>

                }
                {passMismatch ?
                                    
                  <Slide direction="up" in={passMismatch} mountOnEnter unmountOnExit>
                      
                      <Alert severity="error">The two passwords entered did not match. Please try again.</Alert>
                      
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
        </Grid>

      </div>

    </Container>
  );
}
export default Register;