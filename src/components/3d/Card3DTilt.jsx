import React from 'react';

export const Card3DTilt = ({ title, subtitle, image, accent = 'cyan' }) => {
  return (
    <article className={`card-3d-tilt card-${accent}`}>
      <div className="card-3d-frame">
        <img src={image} alt={title} className="card-3d-image" />
        <span className="card-3d-shine" />
      </div>
      <div className="card-3d-meta">
        <span className="card-3d-kicker">{subtitle}</span>
        <h3>{title}</h3>
      </div>
    </article>
  );
};
