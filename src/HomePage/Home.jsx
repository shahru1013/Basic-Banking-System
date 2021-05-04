import React, { Component } from 'react';
import homestyle from './homestyle.css';
import { Link} from 'react-router-dom'
class Home extends Component {
    render() {
        return (
         
            <div className="home_body">
                <div className="home_sec">
                    <div className="navbar_sec">
                        <div className="name">
                            <h1>Basic Bank</h1>
                        </div>
                        <div className="nav_item_sec">
                            
                           <ul>
                               <li><Link to="/" className="link">Home</Link></li>
                               <li><Link to="/Users" className="link">Users</Link></li>
                               <li><Link to="/Transfer" className="link">Transfer</Link></li>
                               <li><Link to="/History" className="link">History</Link></li>
                           </ul>
                        </div>
                    </div>
                    <div className="mid_sec">
                       
                    </div>
                </div>
            </div>
        
        );
    }
}

export default Home;