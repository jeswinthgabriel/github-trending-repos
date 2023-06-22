import React from 'react'
import { Badge, Col, Container, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeFork } from '@fortawesome/free-solid-svg-icons';
import { faStar, faEye } from '@fortawesome/free-regular-svg-icons';
const RepositoryInfo = (props) => {
    const repoInfo = props.repoInfo
    return (
      <>
        {" "}
        <Container >
          <Row>
            <Col>
            <Image style={{ width: '5%' }} src={repoInfo.owner?.avatar_url} rounded />
            
            { repoInfo.name}
            <Badge className='border' bg="light" text="dark">
            { repoInfo.visibility}
      </Badge>
      <Row>
          <Col>
          <span>Language - {repoInfo.language}</span> <span><FontAwesomeIcon icon={faCodeFork} /> Fork {repoInfo.forks_count}</span> <span><FontAwesomeIcon icon={faStar} />Star {repoInfo.watchers_count}</span>
          <span> <FontAwesomeIcon icon={faEye} /> Watch 
               { repoInfo.subscribers_count}</span>
          </Col>
        </Row>
              
            </Col>
          </Row>
          <Row>
            <Col>
           
            </Col>
          </Row>
          <Row>
            
          </Row>
        </Container>
      </>
    );
 
}

export default RepositoryInfo