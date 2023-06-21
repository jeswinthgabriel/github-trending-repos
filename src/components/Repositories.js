import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeFork } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom';
const Repositories = ({data}) => {
    const {full_name,description,forks_count,watchers_count,language} = data
  return (
    <>
    <div className='fw-bold'>
        <Link to={`/repos/${full_name}`}>{ full_name}</Link>
    
    </div>
    <div className=''>
    { description}
    </div>
    <div>
<span>{language}</span> <span><FontAwesomeIcon icon={faCodeFork} /> {forks_count}</span> <span><FontAwesomeIcon icon={faStar} />{watchers_count}</span>
    </div>

    </>
  )
}

export default Repositories 