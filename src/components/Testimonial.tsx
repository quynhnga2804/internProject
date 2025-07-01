import React, { useEffect, useState } from 'react'
import { Button, Image } from 'antd'
import styles from './Testimonial.module.scss'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { getGalleries } from '../services/api'

type GalleryItem = {
  id: string;
  description: string;
  imageUrl: string;
};

const Testimonial = () => {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const res = await getGalleries();
        const formatted = res.map((item: any) => ({
          id: item.id,
          description: item.desctiption,
          imageUrl: item.imageUrl,
        }));
        setGalleries(formatted);
      } catch (err) {
        console.error('Failed to fetch galleries:', err);
      }
    };

    fetchGalleries();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleries.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === galleries.length - 1 ? 0 : prev + 1));
  };

  if (!galleries.length) return <p>Loading...</p>;
  const current = galleries[currentIndex];

  return (
    <section className={styles.testimonial}>
      <h2>Testimonials</h2>

      <div className={styles.box}>
        <Button onClick={handlePrev} style={{ border: 'none', background: '#9c69e2', color: '#fff', margin: '40px 0 0 -115px', fontSize: '30px' }} icon={<CaretLeftOutlined />} />

        <Image className='avt' src={current.imageUrl} width={65} height={45} alt='avatar' style={{ borderRadius: '50%', objectFit: 'cover' }} onError={(e) => {
          e.currentTarget.src = 'https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png';
        }} />

        <div style={{ flex: 1 }}>
          <h5 style={{ color: '#000', margin: '0 0 0 -35px' }}>{`User ${currentIndex + 1}`}</h5>
          <label>from galleries</label>
          <p className={styles.content}>{current.description}</p>
        </div>

        <Button onClick={handleNext} style={{ border: 'none', background: '#9c69e2', color: '#fff', margin: '40px -115px 0 0', fontSize: '30px' }} icon={<CaretRightOutlined />} />
      </div>

      <div className={styles.dots}>
        {galleries.map((_, index) => (
          <span
            key={index}
            className={currentIndex === index ? styles.dotActive : styles.dot}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
