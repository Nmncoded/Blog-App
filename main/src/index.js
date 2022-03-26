import React from 'react';
import ReactDOM from 'react-dom';
import './Stylesheets/main-styles/main.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Header from './Components/header.js';
import Home from './Components/home.js';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <BrowserRouter>
                {/* <Switch> */}
                <Header />
                <Route path='/' exact >
                    <Home />
                </Route>
                {/* </Switch> */}
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById(`root`));