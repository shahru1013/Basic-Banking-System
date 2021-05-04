import React, { Component } from 'react';
import '../Users/users.css';
import axios from 'axios';
class Users extends Component {
    constructor(){
        super();
        this.state={
            userList:[],
            isLoading:false
        }
    }

    componentDidMount(){
      this.getUserData();
      this.setState({
          isLoading:true
      })
    }
   // Send Request for user data
    getUserData(){
      axios({
          method:'get',
          url:'http://localhost:4000/getData'
      }).then((response)=>{
          //console.log(response.data)
         if(response.data.error===true){
             alert('Network Error');
             this.setState({
                isLoading:false
            })
         }
         else{
           this.seperateData(response.data);
           
         }
         //seperateData
      }).catch((error)=>{
          alert(error)
          this.setState({
            isLoading:false
        })
      })
    }

    seperateData(data){
        let tempUser = [];
        data.forEach(element => {
            tempUser.push(
                <tr>
                     <td>{element.Sl}</td>
                     <td>{element.Username}</td>
                     <td>{element.Balance}</td>
                     <td>{element.Address}</td>
                     <td>{element.Reg_Date}</td>
                </tr>
            )
            //console.log(element.Sl+" "+element.Username);
        });

        this.setState({
            userList:tempUser,
            isLoading:false
        });
    }

    render() {
        return (
            <div className="user_div">
                {this.state.isLoading===true && <div className="loading_div"><div className="loading"></div></div>}
                <h2 style={{textAlign:'center',color:'whitesmoke',marginTop:'20px',marginBottom:'20px'}}><u>Basic Bank User Lists</u></h2>
                <div className="table_sec">
                    <table>
                        <tr>
                            <th>Sl. No</th>
                            <th>Username</th>
                            <th>Balance($)</th>
                            <th>Address</th>
                            <th>Registration Date</th>
                        </tr>
                       {this.state.userList}
                    </table>
                </div>
            </div>
        );
    }
}

export default Users;