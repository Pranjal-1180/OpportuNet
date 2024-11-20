import React from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
const NotFound = () => {
  return (
    <div>
      <Navbar/>
      <div style={{
    height: '81vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}}>
   


      <h1>Page not found</h1>
      </div>
      <Footer/>
    </div>
  )
}

export default NotFound
