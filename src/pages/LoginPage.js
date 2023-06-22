import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/authSlice'
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
const LoginPage = () => {
  const[password,setPassword]=useState('')
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const {isLoggedIn} = useSelector(state=>state.auth)
  const state = useSelector(state=>state.auth)
  const handleLogin=(e)=>{
    e.preventDefault()
    dispatch(login(password));
    navigate("/repos")
  }
  console.log(state)
  return (
    

    <>
    <Container className="mt-5 h-100">
<Row className="d-flex h-100">
    <Col className="justify-content-center align-self-center h-100">
    <Form className=""  onSubmit={handleLogin}>
      <Form.Label htmlFor="inputPassword5">Password</Form.Label>
      <Form.Control onChange={(e)=>setPassword(e.target.value)}
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
      />
      <Form.Text id="passwordHelpBlock" muted>
        Please provide a valid Personal Access Token for GitHub
      </Form.Text>
      </Form></Col>
      </Row>
      </Container>

    </>
  

      
    
  )
}

export default LoginPage