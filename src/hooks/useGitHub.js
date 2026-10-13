import { useState, useEffect } from 'react';
import { PROFILE } from '../config/profile';

export const useGitHub = () => {
  const [data, setData] = useState({
    profile: null,
    repos: [],
    loading: true,
    error: null,
    isFallback: false,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchGitHub = async () => {
      const username = PROFILE.githubUsername || PROFILE.socials.github.replace(/https?:\/\/github\.com\/?/, '').replace(/\/$/, '');

      if (!username) {
        if (isMounted) {
          setData({
            profile: null,
            repos: [],
            loading: false,
            error: 'No GitHub username is configured.',
            isFallback: false,
          });
        }
        return;
      }

      try {
        const headers = { Accept: 'application/vnd.github+json' };
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers }),
          fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`, { headers })
        ]);

        if (!profileRes.ok || !reposRes.ok) {
          throw new Error(`GitHub data unavailable (${profileRes.status === 403 || reposRes.status === 403 ? 'rate limited' : 'request failed'})`);
        }

        const profileData = await profileRes.json();
        const reposData = reposRes.ok ? await reposRes.json() : [];

        if (isMounted) {
          setData({
            profile: {
              name: profileData.name || profileData.login || username,
              login: profileData.login || username,
              avatar_url: profileData.avatar_url || '',
              bio: profileData.bio || '',
              public_repos: profileData.public_repos || 0,
              followers: profileData.followers || 0,
              following: profileData.following || 0,
              location: profileData.location || '',
              html_url: profileData.html_url || `https://github.com/${username}`,
            },
            repos: Array.isArray(reposData)
              ? reposData.map((r) => ({
                  id: r.id,
                  name: r.name,
                   description: r.description || '',
                  html_url: r.html_url,
                  stargazers_count: r.stargazers_count || 0,
                  forks_count: r.forks_count || 0,
                   language: r.language || '',
                   topics: r.topics || []
                 }))
               : [],
            loading: false,
            error: null,
            isFallback: false,
          });
        }
      } catch (err) {
        if (isMounted) {
          setData({
            profile: null,
            repos: [],
            loading: false,
            error: err.message,
            isFallback: false,
          });
        }
      }
    };

    fetchGitHub();

    return () => {
      isMounted = false;
    };
  }, []);

  return data;
};
