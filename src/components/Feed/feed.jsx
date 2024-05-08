import React from 'react'
import Navbar from './navbar'
import PostModal from './post-model'
import './feed.css'
import { Button, Stack } from '@mui/material'
import { Posts } from './posts'
const Feed = () => {
  return (
    <>
    <Stack height={'68px'}>
      <Navbar /> 
    </Stack>
      <PostModal/>
      <Posts/>
    </> 
  )
}

export default Feed