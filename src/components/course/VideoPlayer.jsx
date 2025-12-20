import React from 'react';
import styles from './VideoPlayer.module.css';

export default function VideoPlayer({ videoUrl, title, description }) {
  const renderVideo = (url) => {
    if (!url) return <div style={{ color: '#aaa' }}>No Video URL</div>;
    let embedUrl = url;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      embedUrl = url.replace('watch?v=', 'embed/');
    }
    return <iframe src={embedUrl} title="Lesson Video" frameBorder="0" allowFullScreen></iframe>;
  };

  return (
    <>
      <div className={styles.wrapper}>
        {renderVideo(videoUrl)}
      </div>
      <div className={styles.infoBox}>
        <h1>{title}</h1>
        <p>{description || "No description available."}</p>
      </div>
    </>
  );
}