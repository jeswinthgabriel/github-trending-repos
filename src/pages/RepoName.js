import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RepositoryInfo from '../components/RepositoryInfo';
import Sidebar from '../components/Sidebar';
const RepoName = () => {
 const {slug1,slug2}= useParams()
 const [repoInfo,setRepoInfo] = useState({})
 useEffect (() => {
   const getRepoInfo = async ()=>{
   const response= await axios.get(`https://api.github.com/repos/${slug1}/${slug2}`)
   setRepoInfo(response.data)
  }

  getRepoInfo() 
  console.log(repoInfo)
}, [slug1,slug2])

  return (
   <>
   <Container fluid className="text-center bg-light border py-5">
        <h2>{repoInfo.full_name}</h2>
        
      </Container>
      
      <Container className='mt-5'>
      <Row>
        <Col lg={9} xs={12}><RepositoryInfo repoInfo={repoInfo}/></Col>
        <Col lg={3} xs={12}><Sidebar repoInfo={repoInfo} /></Col>
      </Row>
      </Container>

      </>

    );
    
  
}

export default RepoName