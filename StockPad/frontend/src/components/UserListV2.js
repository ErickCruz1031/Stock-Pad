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


class UserListV2 extends React.Component{
    state ={
        classes : useStyles(),
        userStocks : []
    }; 

    componentDidMount(){
        console.log("In the NEWWWWW about to get the stocknotes...");
        console.log("This is the token we are going ton use ", this.props.userToken)
  
        const callFetch = async () =>{
            var tokenString = 'Token ' + this.props.userToken
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
                    this.setState({userStocks : [...this.state.userStocks, data]}, () =>{
                        console.log("After the update this is the thing ", this.state.userStocks)

                    })
                    

                    
                    
  
            }));
  
        }
        callFetch();
        console.log("THis is what was returned");

    }


    render(){
        return(
            <div className={this.state.classes.root}>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Header />
                </Grid>
                <Grid container direction="row" spacing={1}>
                    <Grid item xs={2} />

                    <Grid item xs={8}>
                        <Box pt={6}>
                        <Grid container direction="column" spacing={2}>
                            {this.state.userStocks.map((stock) =>{ 
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
}

export default UserListV2;