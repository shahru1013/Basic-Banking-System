const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const port = process.env.PORT || 4000;
const expressObj = express();
const bodyParser = require('body-parser');
expressObj.listen(port,console.log('success man o'));

expressObj.use(bodyParser.urlencoded({ extended: true }));
expressObj.use(bodyParser.json());
expressObj.use(cors());
// Fetch Mysql data and 

expressObj.get('/getData',(req,res)=>{
    console.log('data ');
    connectToDatabase(res);
})

expressObj.get('/sendMoney',(req,res)=>{
    let sender = req.query.sender;
    let receiver = req.query.receiver;
    let amount = req.query.amount;
    console.log(sender,receiver,amount);
    addBalanceToUser(sender,receiver,amount,res);
})

expressObj.get('/getHistory',(req,res)=>{
    getHistory(res);
})

// Sql db connection
const connectToDatabase=(res)=>{
    let connectDb = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'basic_bank'
    });

    connectDb.connect((err)=>{
        if(!err){
            console.log('cn db');
            let qry = "SELECT * from bankusers";
            connectDb.query(qry,(error,result)=>{
                if(!error){
                    res.send(result);
                }
                else{
                    res.send({
                        error:true
                    })
                }
            })
        }
        else{
            res.send({
                error:true
            })
            console.log('err db cnt')
        }
    })
}



// Amount sender-receiver save and count

const addBalanceToUser=(sender,receiver,amount,res)=>{
    let connectDb = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'basic_bank'
    });

    connectDb.connect((err)=>{
        if(!err){
           let cutToSender = `UPDATE bankusers set Balance = Balance-${amount} WHERE Username = "${sender}"`;
           let addtoReceiver = `UPDATE bankusers set Balance = Balance+${amount} WHERE Username = "${receiver}"`;
           connectDb.query(cutToSender,(error,result)=>{//cut from sender money
              if(!error){ 
                connectDb.query(addtoReceiver,(error,result)=>{//Add receiver money
                   if(!error){
                        // Save transaction to history
                       let historyQry = `INSERT INTO history VALUES('','${sender}','${receiver}','${amount}','${new Date()}')`;
                       connectDb.query(historyQry,(error,result)=>{
                           if(!error){
                               console.log('History Saved');
                           }
                           else{
                               console.log('History error' + error)
                           }
                       })
                       res.send({
                           okay:true
                       });
                   }
                   else{
                       console.log('1')
                       console.log(error)
                    res.send({
                        okay:false
                    });
                   }
                })
              }
              else{
                console.log('2')
                console.log(error)
                res.send({
                    okay:false
                });
              }
           });
        }
        else{
            console.log('3')
            console.log(error)
            res.send({
                okay:false
            });
        }
    })
}


// Get history and send to

const getHistory = (res) =>{
    let connectDb = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'basic_bank'
    });

    connectDb.connect((err)=>{
        if(!err){
            let historyQry = "SELECT * FROM history";
            connectDb.query(historyQry,(error,result)=>{
                if(!error){
                    res.send(result);
                }
                else{
                    res.send({
                        res:false
                    });
                }
                
            })
        }
        else{
            res.send({
                res:false
            });
        }
    })
}

