import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const RepoName = () => {
 const {slug1,slug2}= useParams()
 const [repoInfo,setRepoInfo] = useState({})
 useEffect (() => {
   const getRepoInfo = async ()=>{
   const response= await axios.get(`https://api.github.com/repos/laravel/laravel`)
   setRepoInfo(response.data)
  }

  getRepoInfo() 
  console.log(repoInfo)
}, [slug1,slug2])

  return (
    <div>RepoName {repoInfo.homepage}</div>
  )
}

export default RepoName