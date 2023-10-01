import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Routes,
  // Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';



export default class App extends Component {
  pageSize = 12;
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress:0
  }
//  apiKey={this.apiKey}
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
        <Router>
      <div>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        {/* <Switch> */}
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country={"us"} category={'general'} badgeMode={"primary"}/>}/>
          <Route exact path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country={"us"} category={'business'} badgeMode={"secondary"}/>}/>
          <Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country={"us"} category={'science'} badgeMode={"danger"}/>}/>
          <Route path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country={"us"} category={'entertainment'} badgeMode={"warning"}/>}/>
          {/* <Route path='/general' element={<News setProgress={this.setProgress} pageSize={this.pageSize} country={"us"} category={'general'}/>}/> exact */}
          <Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country={"us"} category={'health'} badgeMode={"success"}/>}/>
          <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country={"us"} category={'sports'} badgeMode={"dark"}/>}/>
          <Route exact path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country={"us"} category={'technology'}  badgeMode={"light"}/>}/>
          </Routes>
        {/* </Switch> */}
      </div>
        </Router>
    )
  }
}
