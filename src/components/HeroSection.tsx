import React from 'react'
import styles from './HeroSection.module.scss'

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Save your data storage here.</h1>
        <p>Data Warehouse is a data storage area that has been tested for security, so you can store your data here safety but not be afraid of being stolen by others.</p>
        <button className={styles.getStarted}>Learn more</button>
      </div>
    </section>
  )
}

export default HeroSection