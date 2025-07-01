import React from 'react'
import styles from './Footer.module.scss'
import logo from '../assets/images/logo.png'
import message from '../assets/images/message.png'
import { FloatButton } from 'antd'

const Footer = () => {
  return (
    <>
      <hr style={{ margin: '60px 80px', border: '1px solid rgba(218, 191, 255, 0.99)' }} />
      <footer className={styles.footer}>
        <div className={styles.columns}>
          <div className={styles.groupLeft}>
            <div className={styles.column}>
              <h3><img src={logo} width={30} style={{ marginRight: '10px' }} />DataWarehouse</h3>
              <ul>
                <li><h4>Warehouse Society, 234</h4></li>
                <li><h4>Bahagia Ave Street PRBW 29281</h4></li>
                <li></li>
                <li>info@warehouse.project</li>
                <li>1-232-3434 (Main)</li>
              </ul>
            </div>
          </div>

          <div className={styles.groupRight}>
            <div className={styles.column}>
              <h3>About</h3>
              <ul>
                <li>Profile</li>
                <li>Features</li>
                <li>Careers</li>
                <li>DW News</li>
              </ul>
            </div>

            <div className={styles.column}>
              <h3>Help</h3>
              <ul>
                <li>Support</li>
                <li>Sign up</li>
                <li>Guide</li>
                <li>Reports</li>
                <li>Q&A</li>
              </ul>
            </div>

            <div className={styles.column}>
              <h3>Social Media</h3>
              
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          &copy; Datawarehouse<sup>TM</sup>, 2020. All rights reserved.<br/>
          Company Registration Number: 21479524.
        </div>

        <FloatButton icon={<img src={message} style={{ width: 20 }} />} style={{ backgroundColor: '#ebe1f9', marginRight: '206px' }} />
      </footer>
    </>
  )
}

export default Footer