import React from 'react';
import { Card3DTilt } from './Card3DTilt';
import { SCENE_SETTINGS } from './SceneSettings';

export const Hero3DCanvas = () => {
  return (
    <section className="hero-3d-canvas">
      <div className="hero-3d-grid">
        <div className="hero-3d-ring">
          <div className="hero-3d-orbit orbit-one" />
          <div className="hero-3d-orbit orbit-two" />
          <div className="hero-3d-orbit orbit-three" />
          <Card3DTilt
            title="Digital Systems"
            subtitle="Engineering
            Lab"
            image={SCENE_SETTINGS.images.hero}
            accent="cyan"
          />
        </div>
      </div>
    </section>
  );
};
