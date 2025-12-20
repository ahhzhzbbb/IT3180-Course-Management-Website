import React from 'react';

export default function VideoPlayer({ videoUrl, title, description }) {
  const renderVideo = (url) => {
    if (!url) return <div style={{ color: '#aaa', padding: 50, textAlign: 'center', background: '#000', borderRadius: '12px' }}>No Video URL Provided</div>;

    let embedUrl = url;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      embedUrl = url.replace('watch?v=', 'embed/');
    }
    return <iframe src={embedUrl} title="Lesson Video" frameBorder="0" allowFullScreen style={{ width: '100%', height: '100%' }}></iframe>;
  };

  return (
    <>
      <div className="video-wrapper">
        {renderVideo(videoUrl)}
      </div>
      <div className="lesson-info-box">
        <h1>{title}</h1>
        <p>{description || "No description available."}</p>
      </div>
    </>
  );
}