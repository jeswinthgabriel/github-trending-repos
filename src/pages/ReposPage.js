import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Repositories from '../components/Repositories'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ReposPage = () => {
  const [repositories,setRepositories] = useState([])
  useEffect (() => {
    const getRepositories= async ()=>{
     const response= await axios.get('https://api.github.com/search/repositories?q=created&sort=stars&order=desc')
     setRepositories(response.data.items)
    }
  
    getRepositories()
    console.log(repositories)
  }, [])
  
  return (<>
  <Container fluid className="text-center bg-light border py-5">
  <h2>Trending</h2>
  <dic>See what the GitHub community is most excited about today.</dic>
    </Container> 
  <Container className="mt-5">
      <Row className="justify-content-md-center text-start">
        <Col xs lg="10">
        <Card>
        <Card.Header><Button variant="primary">Repositories</Button>{' '}<Button variant="light">Developers</Button>{' '}</Card.Header>
        <Card.Body>
          
          {repositories.map(rep=><div key={rep.full_name} className="border-bottom text-start"><Repositories data={rep}/>
          </div>)}
          
        </Card.Body>
      </Card>
        
        </Col>
      </Row>
      
    </Container>
    
    
    </>
    
    
  )
}

export default ReposPage