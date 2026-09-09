import React from 'react';

const nodes = [
  { label: 'React', x: '50%', y: '10%' },
  { label: 'PHP', x: '86%', y: '16%' },
  { label: 'Python', x: '75%', y: '44%' },
  { label: 'SQL', x: '58%', y: '66%' },
  { label: 'IoT', x: '20%', y: '50%' },
  { label: 'Cloud', x: '14%', y: '24%' },
];

export const TechSphere3D = () => {
  return (
    <section className="tech-sphere-3d">
      <div className="tech-sphere-frame">
        <div className="tech-sphere-core">
          <span className="tech-sphere-core-label">STACK</span>
        </div>
        {nodes.map((node, index) => (
          <span
            key={node.label}
            className="tech-sphere-node"
            style={{ left: node.x, top: node.y, animationDelay: `${index * 180}ms` }}
          >
            {node.label}
          </span>
        ))}
      </div>
    </section>
  );
};
