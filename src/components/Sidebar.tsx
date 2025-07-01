import React from 'react'
import './Sidebar.scss'
import logo from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className='sidebar'>
      <div className='logo'><img onClick={() => navigate('/')} src={logo} alt='logo' width={30} style={{ marginLeft: 30 }} /></div>
      <ul>
        <li>Posts</li>
        <li onClick={() =>{ navigate('/'); localStorage.clear() }}>Logout</li>
      </ul>
    </div>
  )
}

export default Sidebar