import React from 'react';
import { PROFILE } from '../../config/profile';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Sparkles } from 'lucide-react';
import { Github, Linkedin, Instagram, Facebook } from '../ui/Icons';
import heroImage from '../../assets/profile-office.jpeg';
import fullBodyImage from '../../assets/profile-full-body.jpeg';
import { ThreeBackgroundCanvas } from '../3d/ThreeBackgroundCanvas';

const PortraitCard = () => {
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 140, damping: 22, mass: 0.6 });
  const springRotateY = useSpring(rotateY, { stiffness: 140, damping: 22, mass: 0.6 });

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const setFallbackTilt = () => {
    if (!prefersReducedMotion) {
      rotateX.set(-1.5);
      rotateY.set(1.5);
    }
  };

  const handlePointerMove = (event) => {
    if (prefersReducedMotion || event.pointerType === 'touch') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateX.set(normalizedY * -7);
    rotateY.set(normalizedX * 8);
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : 0.2 }}
    >
      <div className="hero-profile-card">
        <motion.div
          tabIndex={0}
          role="img"
          aria-label={`${PROFILE.name} profile portrait`}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
          onPointerDown={(event) => {
            if (event.pointerType === 'touch') setFallbackTilt();
          }}
          onPointerUp={resetTilt}
          onPointerCancel={resetTilt}
          onFocus={setFallbackTilt}
          onBlur={resetTilt}
          style={prefersReducedMotion ? undefined : {
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformPerspective: 900,
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            className="hero-profile-image"
            style={prefersReducedMotion ? undefined : { translateZ: 18 }}
          >
            <img src={heroImage} alt="Abhishek Upadhyay" />
            <div className="hero-image-caption">01 / 04</div>
          </motion.div>
          <div className="hero-profile-meta">
            <div>
              <p className="hero-profile-name">{PROFILE.name}</p>
              <p className="hero-profile-role">Full-stack builder & problem solver</p>
            </div>
             <div className="flex items-center gap-2">
               <img
                 src={fullBodyImage}
                 alt={`${PROFILE.name} full-body portrait`}
                 className="w-12 h-16 object-cover rounded-md border border-white/30 shadow-lg"
               />
               <MapPin className="w-5 h-5" />
             </div>
          </div>
          <div className="hero-profile-note">Building practical tools for people, teams, and growing businesses.</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Hero = () => {
  const hasGitHub = Boolean(PROFILE.socials?.github || PROFILE.githubUsername);
  const hasLinkedIn = Boolean(PROFILE.socials?.linkedin);
  const hasInstagram = Boolean(PROFILE.socials?.instagram);
  const hasFacebook = Boolean(PROFILE.socials?.facebook);
  const hasEmail = Boolean(PROFILE.email || PROFILE.socials?.email);
  const githubUrl = PROFILE.socials?.github || (PROFILE.githubUsername ? `https://github.com/${PROFILE.githubUsername}` : '');

  return (
    <section id="home" className="hero-editorial relative overflow-hidden">
      <div className="hero-noise" />
      <div className="hero-sun" />
      <ThreeBackgroundCanvas />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end min-h-0 lg:min-h-[720px] py-20 sm:py-28 lg:py-40">
          
          {/* Left Column: Greeting, Headline, Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Status Badge */}
            {PROFILE.statusBadge && (
              <div className="eyebrow-pill">
                <span className="status-dot" />
                <span>{PROFILE.statusBadge}</span>
              </div>
            )}

            {/* Name & Title */}
            <p className="hero-kicker"><Sparkles className="w-4 h-4" /> {PROFILE.title} · {PROFILE.location}</p>

            {/* Main Tagline */}
            <h1 className="hero-title">
              I turn complex ideas into <em>useful software.</em>
            </h1>

            {/* Supporting Subtitle */}
            <p className="hero-copy">
              {PROFILE.subheading}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-12 w-full sm:w-auto">
              <a
                href="#projects"
                className="hero-primary w-full sm:w-auto"
              >
                <span>Explore my work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="hero-secondary w-full sm:w-auto"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Secondary Quick Social Links */}
            {(hasGitHub || hasLinkedIn || hasInstagram || hasFacebook || hasEmail) && (
              <div className="hero-links">
                  <span className="hero-links-label">
                  Connect:
                </span>

                {hasGitHub && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-link"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}

                {hasLinkedIn && (
                  <a
                    href={PROFILE.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-link"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}

                {hasInstagram && (
                  <a
                    href={PROFILE.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-link"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>
                )}

                {hasFacebook && (
                  <a
                    href={PROFILE.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-link"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Facebook</span>
                  </a>
                )}

                {hasEmail && (
                  <a
                    href={PROFILE.socials?.email || `mailto:${PROFILE.email}`}
                    className="hero-link"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* Right Column: editorial profile card */}
          <div className="lg:col-span-5 lg:pb-3">
            <PortraitCard />
          </div>
        </div>
      </div>
    </section>
  );
};
