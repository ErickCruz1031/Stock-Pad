import React, {useState, useRef} from 'react';
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
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';

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

//const SignIn = ({logFunc}) => {
  const SignIn = ({setLogState}) => {

    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("");


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

    const submitCreds = (e) =>{
      e.preventDefault();
      console.log("Submitted the credentials");
      console.log("These are the inputs ", username, ' ', pass)

      loginAttempt();
      user_Ref.current.value = "";
      pass_Ref.current.value = "";
      console.log("Finished the calll")
            

    }


    const loginAttempt = () =>{
      console.log("In the frontend about to login...");

      const callSignIn = async () =>{
          var res = await fetch( 'http://localhost:8000/auth/login/',{
              method: 'POST',
              headers : {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  "username": username,
                  "password": pass,
              })
          }).then(response =>
          response.json().then(data=> {
              if (data.non_field_errors){
                  console.log("WARNING")
                  console.log("This is the data ", data);

              }
              else{
                  setLogState(true, data.token); //Alter the state
                  console.log("The token is ", data.token);
                  console.log("The user is ", data.user);
                  history.push('/home')
              }

          }));

      }
      callSignIn();
      

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            ref={user_Ref}
            onChange={changeUsername}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitCreds}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default SignIn;