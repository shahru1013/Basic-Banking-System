import React, { Component } from 'react';
import transfer from './transfer.css';
import axios from 'axios';
class Transfer extends Component {
    constructor(){
        super();
        this.state={
            userList:[],
            isLoading:false,
            userNames:[],
            sender:'x',
            receiver:'z',
            errorMessage:'',
            sendStatus:'',
            amount:'',
            usersDataForValidation:[]
        }
    }
     
    componentDidMount(){
        this.getUser();
        this.setState({
            isLoading:true
        });
    }
    getUser(){

        axios({
            method:'get',
            url:'http://localhost:4000/getData'
        }).then((response)=>{
            //console.log(response.data)
           if(response.data.error===true){
               alert('Network Error');
               this.setState({
                  isLoading:false
              });
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
          let tempUserName = [];
          let tempValidation = [];
          data.forEach(element => {
              tempUserName.push(
                  <option value={element.Username}>{element.Username}</option>
              )
              let objUser = {};
              objUser[element.Username]=element.Balance;
              tempValidation.push(
                 objUser
              );
              objUser={};
              tempUser.push(
                  <tr>
                      
                       <td>{element.Username}</td>
                       <td>{element.Balance}</td>
                    
                  </tr>
              )
              //console.log(element.Sl+" "+element.Username);
          });
  
          this.setState({
              userList:tempUser,
              isLoading:false,
              userNames:tempUserName,
              usersDataForValidation:tempValidation
          });
      }

    //   validity check

    checkValidity(value) {
        if(this.state.receiver==value){
            //alert('match receiver')
            this.setState({
                errorMessage:'Sender and Receiver Must be Different',
                sendStatus:'none'
            })
            return true;
        }
        if(this.state.sender==value){
            //alert('match sender')
            this.setState({
                errorMessage:'Sender and Receiver Must be Different',
                sendStatus:'none'
            })
            return true;
        }
    }

    sendMoney(){
        let confir = window.confirm(" Sender: "+this.state.sender+"\n Receiver: "+this.state.receiver+"\n Send Balance: "+this.state.amount+"$ \n Are You Sure?");
        if(confir){
            this.sendMoneyToDatabase();
            this.setState({
                isLoading:true
            })
            //alert(this.state.sender +' '+this.state.receiver+' '+this.state.amount)
        }
        else{
            //alert('no')
        }
        
    }
    
    // get input amount

    getAmount(val){
     
      if(this.state.sender == 'x' || this.state.receiver =='z' || this.state.sender === this.state.receiver){
          this.setState({
              errorMessage:'Select Sender and Receiver First'
          })
      }
      else{
       
        //  key
       
       
        for(let i=0;i<this.state.usersDataForValidation.length;i++){
            //console.log(Object.keys(this.state.usersDataForValidation[i]));
            if(Object.keys(this.state.usersDataForValidation[i]) == this.state.sender){
                console.log(Object.keys(this.state.usersDataForValidation[i]));
                // balance validity

                if(parseInt(this.state.usersDataForValidation[i][this.state.sender]) <= parseInt(val) ){
                    this.setState({
                        errorMessage:'User has only : '+this.state.usersDataForValidation[i][this.state.sender]+'$'
                    });
                }
                else{
                    this.setState({
                        amount:val,
                        errorMessage:''
                    });
                }
               break;
            }
           // console.log(Object.keys(elem));
        }


        //console.log(this.state.usersDataForValidation[0][this.state.sender] +' '+val)

      }
      
     
      
    }


    // send money request to db
     sendMoneyToDatabase(){
        //  let obj={
        //      sender:this.state.sender,
        //      receiver:this.state.receiver,
        //      amount:this.state.amount
        //  }
         let obj = new FormData();
         obj.append('sender',this.state.sender);
         axios.get('http://localhost:4000/sendMoney',{
             params:{
                 sender:this.state.sender,
                 receiver:this.state.receiver,
                 amount:this.state.amount
             }
         }).then((response)=>{
            //  this.setState({
            //      isLoading:false
            //  })
             if(response.data.okay===true){
                 //reinitialize all state value
                 this.setState({
                    userList:[],
                    isLoading:false,
                    userNames:[],
                    sender:'x',
                    receiver:'z',
                    errorMessage:'',
                    sendStatus:'',
                    amount:'',
                    usersDataForValidation:[]
                 })
                  this.getUser();
             }
            console.log(response.data.okay);
        }).catch((err)=>{
            this.setState({
                isLoading:false
            })
        })

     }


    render() {
        function selectedFrom(event){
            //alert(event.target.value);
            let x = this.checkValidity(event.target.value);
            this.setState({
                sender:event.target.value
            });
            if(x!=true){
                this.setState({
                    sender:event.target.value,
                    errorMessage:'',
                    sendStatus:''
                });

            }
            
          }

        function selectedTo(event) {
            
            let x = this.checkValidity(event.target.value);
            this.setState({
                receiver:event.target.value
            });
            if(x!=true){
                this.setState({
                    receiver:event.target.value,
                    errorMessage:'',
                    sendStatus:''
                });
            }
        }

    

        return (
           <div className="transfer_div">
                {this.state.isLoading===true && <div className="loading_div"><div className="loading"></div></div>}
               <div className="transfer_sec">
                   <div className="main_content">
                       <div className="left_sec">
                           <div className="user_list_left">
                               <table>
                                   <tr>
                                       <th>UserName</th>
                                       <th>Balance</th>
                                   </tr>

                                   {this.state.userList}

                               </table>
                           </div>
                       </div>
                       <div className="right_sec">
                           <div className="transfer_balance">
                              <h2 style={{color:'whitesmoke',textAlign:'center'}}>Transfer Balance</h2>
                              <div className="sender_selection">
                              <div className="arrow">
                                      <h1>→</h1>
                                  </div>
                                  <div className="user_box">
                                      
                                      <div className="from_user">
                                          <p>Choose Sender User:</p>
                                          <select name="from" onChange={selectedFrom.bind(this)}>
                                              <option>Sender</option>
                                              {this.state.userNames}
                                          </select>
                                          <h4 style={{marginTop:'10px',color:'tomato',width:'150%'}}>{this.state.errorMessage}</h4>
                                      </div>
                                      
                                      <div className="to_user">
                                           <p>Choose Receiver User:</p>
                                           <select name="to" onChange={selectedTo.bind(this)}>
                                               <option>Receiver</option>
                                              {this.state.userNames}
                                          </select>
                                          <input type="text" placeholder="Amount" onChange={(e)=>this.getAmount(e.target.value)} value={this.state.amount}></input>
                                          <button style={{pointerEvents:`${this.state.sendStatus}`}} onClick={()=>this.sendMoney()}>Send</button>
                                      </div>
                                  </div>
                              </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
        );
    }
}

export default Transfer;