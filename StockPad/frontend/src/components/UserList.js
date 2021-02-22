import React, {useState, useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import BookRow from './BookRow'
import Box from '@material-ui/core/Box';



const useStyles = makeStyles(() =>({
    root: {
        flexGrow: 1,
      },
    typographyStyle : {
        flex : 1
    },


}))

/*

                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + JSON.stringify(userToken),
                }

*/

const UserList = ({userToken}) =>{

    const classes = useStyles();
    const [userStocks, setStocks] = useState([{ticker: "", notes: ""}]); //Set to empty array

    useEffect (() =>{
        console.log("In the frontend about to get the stocknotes...");
        console.log("This is the token we are going ton use ", userToken)
  
        const callFetch = async () =>{
            var tokenString = 'Token ' + userToken
            var res = await fetch( 'http://localhost:8000/api/get-stocknote/',{
                method: 'GET',
                headers :{
                    'Authorization' : tokenString,
                    'Content-Type': 'application/json',
                }
                }).then(response =>
                response.json().then(data=> {

                    console.log("Made it to the call here");
                    console.log("This is the data from get-stocknote", data.length)
                    console.log(data)
                
                    for(var i=0; i < data.length; i++){
                        var obj = {
                            ticker : data[i].ticker, 
                            notes : data[i].notes
                        }
                        console.log(i, " and it is ", obj)
                        setStocks([...userStocks, obj]) 
                        console.log("This is the other object ", userStocks)
                    }//prevMovies => ([...prevMovies, ...result])
                    
                   console.log(userStocks, " is the obj afterwards")
                   console.log(typeof([]))
                    //setStocks([...userStocks, data]) //Set the stocks for this user
                    console.log(typeof(data))
                    
                    
  
            }));
  
        }
        callFetch();
        console.log("THis is what was returned");
        
  
    }, []) //Include the empty dependency array for the useEffect
    //This call will get called when this component gets mounted 


    return(
        <div className={classes.root}>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Header />
                </Grid>
                <Grid container direction="row" spacing={1}>
                    <Grid item xs={2} />

                    <Grid item xs={8}>
                        <Box pt={6}>
                        <Grid container direction="column" spacing={2}>
                            {userStocks.map((stock) =>{ 
                                <Grid item xs={12}>
                                    <BookRow stockObj={stock}/>
                                </Grid>
                            })}


                        </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={2} />

                </Grid>
            </Grid>

        </div>
    )
}

export default UserList;

/*


    useEffect (() =>{
        console.log("In the frontend about to get the stocknotes...");
        console.log("This is the token we are going ton use ", userToken)
  
        const callFetch = async () =>{
            var tokenString = 'Token ' + userToken
            var res = await fetch( 'http://localhost:8000/api/get-stocknote/',{
                method: 'GET',
                headers :{
                    'Authorization' : tokenString,
                    'Content-Type': 'application/json',
                }
                }).then(response =>
                response.json().then(data=> {

                    console.log("Made it to the call here");
                    console.log("This is the data from get-stocknote", data.length)
                    console.log(data)
                
                    for(var i=0; i < data.length; i++){
                        console.log(i, " and it is ", data[i])
                        setStocks([...userStocks, data[i]])
                    }
                    
                   console.log(typeof(userStocks))
                    setStocks([...userStocks, data]) //Set the stocks for this user
                    console.log(typeof(data))
                    console.log("This is the other object ", userStocks)
                    
  
            }));
  
        }
        callFetch();
        console.log("THis is what was returned");
        
  
    }, []) //Include the empty dependency array for the useEffect
    //This call will get called when this component gets mounted 

    */
