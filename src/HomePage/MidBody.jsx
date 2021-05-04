import React, { Component } from 'react';
import homestyle from '../HomePage/homestyle.css'
class MidBody extends Component {
    render() {
        return (
            <div className="boss_sec">
                <div className="mid_body">
                    <div className="mid_sec">
                        <div className="content">
                            <div className="head_sec">
                               <h1 style={{color:'rgb(90, 219, 155)',fontSize:'45px'}}>Basic Bank</h1>
                               <marquee direction="left" width="60%" > <h4>Transfer Money easily with every transaction history!</h4> 
                               </marquee> 
                            </div>
                            <div className="bottom_sec">
                               <button>About Us</button>
                               <button>Transfer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MidBody;