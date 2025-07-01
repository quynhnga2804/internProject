import React from 'react'
import styles from './FeaturesSection.module.scss'
import { url } from 'inspector';
import { icons } from 'antd/es/image/PreviewGroup';
import { Content } from 'antd/es/layout/layout';
import { link } from 'fs';
import { ArrowRightOutlined } from '@ant-design/icons';

const features = [
  { title: 'Search Data', description: 'Don\'t worry if your data is very large, the Data Warehoue provides a serach engine, which is useful for making it easier to find data effectively saving time.', image: require('../assets/images/bgd1.png'), icon: require('../assets/images/icon1.png'), link: 'link1' },
  { title: '24 Hours Access', description: 'Access is given 24 hours a full morning to night and meet again in the morning, giving you comfort when you need data when urgent.', image: require('../assets/images/bgd2.png'), icon: require('../assets/images/icon2.png'), link: 'link2' },
  { title: 'Print Out', description: 'Print uot service gives you convenience if someday you need print data, just edit it all and hust print it.', image: require('../assets/images/bgd3.png'), icon: require('../assets/images/icon3.png'), link: 'link3' },
  { title: 'Security Code', description: 'Data Security is one of our best facilities. Allows for your files to be safer. The file can be secured with a code or password that you created, so only you can open the file.', image: require('../assets/images/bgd4.png'), icon: require('../assets/images/icon4.png'), link: 'link4' }
];

const FeaturesSection = () => {
  return (
    <section className={styles.features}>
      <h2>Features</h2>
      <label className={styles.cnt} style={{ fontSize: '12px', color: 'rgb(76, 76, 76)', display: 'inline-block', maxWidth: '55%', lineHeight: '1.5', marginTop: '15px' }}>
        Some of the features and advantages that we provide for those of you who store data in this Data Warehoue.
      </label>
      <div className={styles.grid}>
        {features.map((item, index) => (
          <div key={index} className={styles.card} style={{ backgroundImage: `url(${item.image})` }}>
            <img src={item.icon} alt={item.title} style={{ width: '135px', margin: '10px 18px 40px 0' }} />
            <label style={{ fontSize: '15px', color: 'rgb(0, 0, 78)' }}>{item.title}</label>
            <p className={styles.content}>{item.description}</p>
            <h6><a href={item.link}>Learn more</a> <ArrowRightOutlined /></h6>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection