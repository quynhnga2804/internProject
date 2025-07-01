import React, { useState } from 'react'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import Testimonial from '../components/Testimonial'
import Footer from '../components/Footer'
import logo from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  return (
    <>
      <div style={{ padding: '35px 230px 100px' }}>
        <img src={logo} alt='logo' width={30} />
        {username ? (
          <>
            <button onClick={() =>{ navigate('/'); localStorage.clear() }} style={{ float: 'right', width: '130px', borderRadius: '30px', fontSize: '12px', color: '#fff', padding: 9, marginLeft: '20px' }}>Log out</button>
            <button onClick={() => navigate('/profile')} style={{ float: 'right', width: '130px', borderRadius: '30px', fontSize: '12px', color: '#fff', padding: 9 }}>Profile</button>
          </>
        ) : (
          <button onClick={() => navigate('/auth/login')} style={{ float: 'right', width: '130px', borderRadius: '30px', fontSize: '12px', color: '#fff', padding: 9 }}>Sign In</button>
        )}
      </div>
      <HeroSection />
      <FeaturesSection />
      <Testimonial />
      <Footer />
    </>
  )
}

export default HomePage