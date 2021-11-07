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

  const ResetPass = () => {

    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("");
    const [reqState, setReqState] = useState(false);


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

      resetAttempt();
      user_Ref.current.value = "";
      pass_Ref.current.value = "";
      console.log("Finished the calll")
            

    }

    const regTrigger = e =>{
      e.preventDefault();//Prevent the form from submitting 
      console.log("Trying to register new user ");
      history.push("/register")
    }


    const resetAttempt = () =>{
      console.log("In the frontend about to send reset request...");

      const callReset = async () =>{
          var res = await fetch( 'http://localhost:8000/auth/resetpassword/',{
              method: 'POST',
              headers : {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  "user": username,
                  "new_password": pass,
              })
          })
          .then(response =>
          response.json().then(data=> {
              console.log("This is what was returned: \n", data.error)
              if (data.error){
                console.log("There was an error with the request: \n", data.error[0]);
                setReqState(true);//If the reset password request failed trigger the alert
              }
              else{
                console.log("The request was successful");
              }


          }));

      }//Function that makes the request to reset password for appropriate username
      callReset();
      

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
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
            ref={pass_Ref}
            onChange={changePass}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newpassword"
            label="New Password"
            type="newpassword"
            id="newpassword"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitCreds}
          >
            Submit Request
          </Button>
          <Grid container>
            <Grid item cs={12}>
              <Link href="#" variant="body2" onClick = {regTrigger}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            <Grid item xs={2}/>

            <Grid item xs={12}>
              <Box pt={4}>
                 {reqState ?
                  <Alert severity="error">The username could not be found. Please try again.</Alert>
                  : 
                  <> </>
                 }
              </Box>
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
export default ResetPass;