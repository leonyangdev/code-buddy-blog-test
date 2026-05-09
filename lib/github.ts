import "server-only"

const GITHUB_USERNAME = "leonyangdev"
const GITHUB_API = "https://api.github.com"

interface GitHubUser {
  public_repos: number
  followers: number
  following: number
  created_at: string
  avatar_url: string
  bio: string | null
  name: string | null
  location: string | null
  login: string
}

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  topics: string[]
  fork: boolean
  language: string | null
}

export interface GitHubProfile {
  username: string
  name: string
  bio: string
  location: string
  avatarUrl: string
  publicRepos: number
  followers: number
  following: number
  memberSince: string
}

export interface GitHubProject {
  id: number
  title: string
  description: string
  tags: string[]
  github: string
  demo: string
  stars: number
  featured: boolean
}

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

async function fetchGitHub<T>(endpoint: string): Promise<T | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    }
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }
    const res = await fetch(`${GITHUB_API}${endpoint}`, {
      headers,
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
  const user = await fetchGitHub<GitHubUser>(`/users/${GITHUB_USERNAME}`)
  if (!user) return null

  return {
    username: user.login,
    name: user.name || user.login,
    bio: user.bio || "",
    location: user.location || "",
    avatarUrl: "/avatar.png",
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    memberSince: new Date(user.created_at).getFullYear().toString(),
  }
}

export async function getGitHubTopRepos(count: number = 10): Promise<GitHubProject[]> {
  const repos = await fetchGitHub<GitHubRepo[]>(
    `/users/${GITHUB_USERNAME}/repos?sort=stars&direction=desc&per_page=100`
  )
  if (!repos) return []

  return repos
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, count)
    .map((r) => ({
      id: r.id,
      title: r.name,
      description: r.description || "",
      tags: [r.language, ...r.topics].filter(Boolean).slice(0, 5) as string[],
      github: r.html_url,
      demo: r.homepage || "",
      stars: r.stargazers_count,
      featured: r.stargazers_count >= 10,
    }))
}

export async function getGitHubContributions(): Promise<ContributionDay[]> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
    }
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { headers, next: { revalidate: 21600 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.contributions || []).map((d: { date: string; count: number; level: number }) => ({
      date: d.date,
      count: d.count,
      level: Math.min(d.level, 4) as 0 | 1 | 2 | 3 | 4,
    }))
  } catch {
    return []
  }
}
