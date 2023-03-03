import React from 'react'
import { Content } from 'antd/es/layout/layout'
import Search from 'antd/es/input/Search'
import { Link } from 'react-router-dom'
const Banner = () => {
  return (
    <>
     <Content className='contentBg'>
        <h1>Download High Quality Images by Creators</h1>
        <h5>Over 2.4 million+ stock Images by our talented community</h5>
        <Link to='/search' >
        <Search
        className='search-image'
        placeholder="Search for images..."
        style={{ width: 1000 }}
        onChange={(value) => console.log(value)}
        />
        </Link>
     </Content>
    </>
  )
}

export default Banner