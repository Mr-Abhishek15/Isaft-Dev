import Link from 'next/link'
import React from 'react'
import Navbar from './Navbar'

function Home() {
  return (
    <div>
        <Navbar />
        <p className='text-center text-2xl'> Landing page</p>
        <br/>
     
      <Link href="/Upload">Click me to go to upload</Link>
    </div>
  )
}

export default Home
