# CineVault

A movie and TV show discovery app built with Nuxt 4, Tailwind CSS, and DaisyUI. Browse trending content, search for movies and TV shows, and view detailed information including cast, reviews, and trailers.

## Features

- Browse trending movies and TV shows
- Search for movies, TV shows, and people
- View movie and TV show details (cast, reviews, similar titles, trailers)
- View person/actor profiles
- Responsive design

## Tech Stack

- Nuxt 4
- Tailwind CSS 4
- DaisyUI
- TMDB API

## Deployment

Deployed on Cloudflare Pages.

## API Caching

Server-side caching is enabled to reduce API calls and improve performance:

| Endpoint | Cache Duration |
|----------|---------------|
| Trending | 1 hour |
| Popular movies | 1 hour |
| Movie/TV details | 24 hours |
| Similar titles | 24 hours |
| Reviews | 24 hours |
| Videos/Trailers | 24 hours |
| Person details | 24 hours |
| Search results | 30 minutes |

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file with your TMDB API key:

```
TMDB_API_KEY=your_tmdb_api_key
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```
