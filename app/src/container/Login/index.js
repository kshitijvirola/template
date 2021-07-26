import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col,Checkbox } from 'antd';
import {LoginStyle} from './style';
import {logo} from "components/Images"


 class Login extends Component {
  render() {
    return (
      <LoginStyle> 
    <Row justify="space-around" align="middle" >      
      <Col lg={12} md={12} sm={24} xs={24} className="titleDiv">
          <img src={logo} className="logo"></img>
          <p className="porter">Porter App</p>
          <p className="lorem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
            ex ea commodo consequat.</p>
      </Col>
      <Col lg={12} md={12} sm={24} xs={24} >        
    <div className="box">
      
      <h1 className="head">Login</h1> 
      <p className="fill">Fill out the form below to login</p>


       <div className="box-email">
       <div className="email">Email</div>
         <div className="part">
          <div className="password">Password</div>
           </div> 
       </div>  
       <div className="submit-box">
       <h3 className="submit">Submit</h3>
      

      </div>
      <div> 
        <p className="remember">
          <Checkbox className="check"/>
Remember me</p>
        <span className="forgot">Forgot Password?</span>
      </div>
     

      <div className="last-box"></div>

      </div>

       </Col>
      
    </Row>
      </LoginStyle>


      
    );
  }
}

export default withRouter(Login);
