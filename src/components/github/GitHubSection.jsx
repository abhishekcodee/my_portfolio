import React from 'react';
import { useGitHub } from '../../hooks/useGitHub';
import { PROFILE } from '../../config/profile';
import { motion } from 'framer-motion';
import { Star, GitFork, BookOpen, ExternalLink } from 'lucide-react';
import { Github } from '../ui/Icons';

export const GitHubSection = () => {
  const { profile, repos, loading, error } = useGitHub();
  const githubUsername = profile?.login || PROFILE.githubUsername || '';
  if (loading) return <section id="github" className="py-20 text-center text-slate-500">Loading live GitHub data…</section>;
  if (error || !profile) return <section id="github" className="py-20 text-center text-slate-600"><p>Live GitHub data is unavailable right now.</p><a className="underline" href={PROFILE.socials?.github || '#'} target="_blank" rel="noreferrer">Open GitHub profile</a></section>;
  const profileUrl = profile.html_url || PROFILE.socials?.github || `https://github.com/${githubUsername}`;

  return (
    <section id="github" className="py-14 lg:py-20 relative overflow-hidden bg-dot-pattern">
      {/* Background Ambient Glow Orb */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-cyan-500/10 light:bg-blue-200/40 blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 light:text-indigo-600 text-xs font-mono font-semibold mb-3 border border-cyan-500/20">
            <Github className="w-3.5 h-3.5" />
            <span>GITHUB INTEGRATION</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-100 light:text-slate-900 tracking-tight">
            Code &{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 light:from-indigo-600 light:to-cyan-600 bg-clip-text text-transparent">
              Repositories.
            </span>
          </h2>

          <p className="text-slate-400 light:text-slate-600 text-base sm:text-lg mt-4 font-sans">
            Real repositories and source code activities connected live from GitHub.
          </p>
        </motion.div>

        {/* Profile Card Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 shadow-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl"
        >
          <div className="flex items-center gap-5 w-full md:w-auto">
            <a
              href="#/dashboard"
              className="relative group/avatar cursor-pointer block shrink-0"
              title="Click to Open Developer Dashboard"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 shadow-lg shrink-0 group-hover/avatar:scale-105 transition-transform">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-950 light:bg-slate-100 rounded-[14px] flex items-center justify-center text-cyan-400 light:text-indigo-600 font-extrabold font-mono text-xl">
                    AU
                  </div>
                )}
              </div>
              <div className="absolute inset-0 rounded-2xl bg-black/65 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity text-white text-[9px] font-mono font-bold">
                Dashboard
              </div>
            </a>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-xl text-slate-100 light:text-slate-900">
                  {profile.name}
                </h3>
                <span className="text-xs font-mono text-slate-400">@{githubUsername}</span>
              </div>
              <p className="text-xs text-slate-300 light:text-slate-600 mt-1 max-w-xl font-sans">
                {profile.bio}
              </p>
            </div>
          </div>

          {/* GitHub Metrics & Profile Action */}
          <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-800 light:border-slate-200">
            {profile.public_repos > 0 && (
              <div className="text-center">
                <div className="font-heading font-extrabold text-xl text-cyan-400 light:text-indigo-600">
                  {profile.public_repos}
                </div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Public Repos</div>
              </div>
            )}

            {profile.followers > 0 && (
              <div className="text-center">
                <div className="font-heading font-extrabold text-xl text-cyan-400 light:text-indigo-600">
                  {profile.followers}
                </div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Followers</div>
              </div>
            )}

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 light:bg-slate-100 hover:bg-slate-700 light:hover:bg-slate-200 text-slate-200 light:text-slate-800 text-xs font-medium border border-slate-700 light:border-slate-300 transition-colors shrink-0"
            >
              <Github className="w-4 h-4" /> View GitHub Profile
            </a>
          </div>
        </motion.div>

        {/* Repositories Grid */}
        {repos && repos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <motion.div
                key={repo.id || repo.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-6 rounded-2xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading font-bold text-base text-slate-100 light:text-slate-900 hover:text-cyan-400 light:hover:text-indigo-600 transition-colors flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 text-cyan-400 light:text-indigo-600 shrink-0" />
                      <span className="line-clamp-1">{repo.name}</span>
                    </a>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${repo.name} on GitHub`}
                      className="text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed line-clamp-3 mb-4 font-sans">
                    {repo.description}
                  </p>

                  {/* Repo Tags */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {repo.topics.slice(0, 4).map((topic, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/60 light:bg-slate-100 text-slate-400 light:text-slate-600">
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Repo Footer Language & Stars */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 light:border-slate-200 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium text-slate-300 light:text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                     {repo.language}
                  </span>

                  <div className="flex items-center gap-3">
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {repo.stargazers_count}
                      </span>
                    )}

                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1 text-cyan-400">
                        <GitFork className="w-3.5 h-3.5" />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200 text-center">
            <Github className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <p className="text-sm font-mono text-slate-300">
              Repositories load live from GitHub username <code className="text-cyan-400">@{githubUsername}</code>.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
