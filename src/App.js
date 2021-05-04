import './App.css';
import Home from '../src/HomePage/Home'
import Users from './Users/Users'
import Transfer from './Transfer/Transfer'
import MidBody from './HomePage/MidBody'
import History from './History/History'
import { Route, Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <div className="bg_pic">
        
      </div>
      <div className="app_body">
         <Home/>
         <Switch>
          
             <Route exact path='/Users' component={Users} /> 
             <Route exact path='/' component={MidBody} /> 
             <Route exact path='/Transfer' component={Transfer} /> 
             <Route exact path='/History' component={History} /> 
           
         </Switch>
     </div>
    </div>
  );
}

export default App;
