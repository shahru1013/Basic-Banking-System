import React, { Component } from 'react';
import history from './history.css';
import axios from 'axios';
class History extends Component {
constructor(){
    super();
    this.state={
        history:[],
        isLoading:false
    }
}

componentDidMount(){
    this.getHistory();
    this.setState({
        isLoading:true
    })
}
// get history data from db

getHistory(){
  axios.get('http://localhost:4000/getHistory').then((response)=>{
      this.seperateHistory(response.data);
      //console.log(response.data);
  }).catch((err)=>{
    this.setState({
        isLoading:false
    })
  })

}

seperateHistory(data){
    let tempHistory = [];
    data.forEach(element => {
        tempHistory.push(
            <tr>
                 <td>{element.sender}</td>
                 <td>{element.receiver}</td>
                 <td>{element.amount}</td>
                 <td>{element.time}</td>
            </tr>
        )
        //console.log(element.Sl+" "+element.Username);
    });
    this.setState({
        history:tempHistory
    })
    this.setState({
        isLoading:false
    })
}

    render() {
        return (
            <div className="history_div">
                 {this.state.isLoading===true && <div className="loading_div"><div className="loading"></div></div>}
                <div className="history_sec">
                    <h2 style={{textAlign:'center',color:'whitesmoke',textDecoration:'underline',marginBottom:'25px'}}>History Of Transaction</h2>
                  <div className="table_sec">
                  <table>
                        <tr>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Amount($)</th>
                            <th>Date/Time</th>
                        </tr>
                       {this.state.history}
                    </table>
                  </div>
                </div>
            </div>
        );
    }
}

export default History;

// I just complete my Task-1, "Basic Banking System" given by The Sparks Foundation Web Development Internship program. Here's given some basic tasks to do like show all users information from database , transfer balance between users and saved transaction history etc. 



// Here I'm using , ReactJs, NodeJs with Express and MySql Database.



// #internship #webdevelopment #reactjsdevelopment #javascript #programming #basicbankingsystem #mysql 

//naimul@ibos.io