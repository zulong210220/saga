import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from "react";

//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Navigation from "./components/Navigation";
import Singlepost from "./pages/SinglePost";
import Home from "./pages/Home";
import About from "./pages/About";
import UsersWithReduxSaga from "./pages/Users";



function App() {
  return (
      <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/:id" element={<Singlepost/>} />
            <Route exact path="/redux-saga" element={<UsersWithReduxSaga/>}/>
        </Routes>
      </Router>
      </div>
  );
}

export default App;
