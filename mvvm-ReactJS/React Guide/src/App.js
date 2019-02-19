import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home'
import List from './pages/List'
import Detail from './pages/Detail'
import Login from './pages/User/Login'

import Topbar from './components/Layouts/Topbar'
import Header from './components/Layouts/Header'
import Nav from './components/Layouts/Nav'
import Footer from './components/Layouts/Footer'

import './App.css';

// 路由配置
const router = () => (
  <Router>
    <div id="app">
      <Topbar/>
      <Header/>
      <Nav/>

      <Route path="/" component={Home} exact/>
      <Route path="/list" component={List}/>
      <Route path="/detail" component={Detail}/>
      <Route path="/login" component={Login}/>

      <Footer/>
    </div>
  </Router>
)

export default router;
