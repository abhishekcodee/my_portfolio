import React from 'react';
import { SCENE_SETTINGS } from './SceneSettings';

const steps = [
  { label: 'Strategy', tone: 'cyan', details: 'Discovery' },
  { label: 'Prototype', tone: 'violet', details: 'Design System' },
  { label: 'Ship', tone: 'blue', details: 'Launch' },
  { label: 'Scale', tone: 'ember', details: 'Operate' },
];

export const ArchitecturePipeline3D = () => {
  return (
    <section className="architecture-pipeline-3d">
      <div className="architecture-pipeline-head">
        <span className="section-label">Architecture Pipeline</span>
        <span className="pipeline-status">
          <span className="status-dot" /> Live Systems
        </span>
      </div>

      <div className="pipeline-rail">
        {steps.map((step, index) => (
          <div className="pipeline-node-wrap" key={step.label}>
            <div className={`pipeline-node node-${step.tone}`}> 
              <span className="pipeline-node-index">0{index + 1}</span>
              <span className="pipeline-node-title">{step.label}</span>
              <span className="pipeline-node-details">{step.details}</span>
            </div>
            {index < steps.length - 1 && <span className="pipeline-line" />}
          </div>
        ))}
      </div>

      <div className="pipeline-image-strip">
        <img src={SCENE_SETTINGS.images.stack} alt="" />
        <div className="pipeline-image-card">
          <span className="mini-grid-label">Systems</span>
          <span className="mini-grid-value">24 / 7</span>
        </div>
      </div>
    </section>
  );
};
