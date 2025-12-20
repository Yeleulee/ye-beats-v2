import { apiKeyManager, makeAPIRequest } from '../utils/apiKeyManager';

export interface YouTubeTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  duration: number;
  videoId: string;
  channelId: string;
}

export interface Artist {
  id: string;
  name: string;
  thumbnail: string;
  channelId: string;
  subscribers?: string;
}

export interface Podcast {
  id: string;
  title: string;
  creator: string;
  episodes: string;
  cover: string;
  channelId: string;
}

/**
 * Fetch popular Ethiopian artists
 */
export async function fetchEthiopianArtists(): Promise<Artist[]> {
  const ethiopianArtists = [
    'Teddy Afro',
    'Aster Aweke',
    'Mahmoud Ahmed',
    'Tilahun Gessesse',
    'Gossaye Tesfaye',
    'Betty G',
  ];

  const artists: Artist[] = [];

  for (const artistName of ethiopianArtists) {
    const result = await makeAPIRequest(async (apiKey) => {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
        `key=${apiKey}&part=snippet&q=${encodeURIComponent(artistName + ' official')}&` +
        `type=channel&maxResults=1`
      );
      return response.json();
    });

    if (result?.items?.[0]) {
      const item = result.items[0];
      artists.push({
        id: item.id.channelId,
        name: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        channelId: item.id.channelId,
      });
    }
  }

  return artists;
}

/**
 * Fetch popular international artists
 */
export async function fetchPopularArtists(): Promise<Artist[]> {
  const popularArtists = [
    'The Weeknd',
    'Drake',
    'Burna Boy',
    'Wizkid',
    'Rema',
    'Tems',
  ];

  const artists: Artist[] = [];

  for (const artistName of popularArtists.slice(0, 6)) {
    const result = await makeAPIRequest(async (apiKey) => {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
        `key=${apiKey}&part=snippet&q=${encodeURIComponent(artistName + ' official')}&` +
        `type=channel&maxResults=1`
      );
      return response.json();
    });

    if (result?.items?.[0]) {
      const item = result.items[0];
      artists.push({
        id: item.id.channelId,
        name: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        channelId: item.id.channelId,
      });
    }
  }

  return artists;
}

/**
 * Fetch popular tracks from an artist
 */
export async function fetchArtistTracks(artistName: string, maxResults = 10): Promise<YouTubeTrack[]> {
  const result = await makeAPIRequest(async (apiKey) => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `key=${apiKey}&part=snippet&q=${encodeURIComponent(artistName + ' official audio')}&` +
      `type=video&maxResults=${maxResults}&videoCategoryId=10`
    );
    return response.json();
  });

  if (!result?.items) return [];

  return result.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    album: item.snippet.title,
    coverArt: item.snippet.thumbnails.high.url,
    duration: 180, // Default duration
    videoId: item.id.videoId,
    channelId: item.snippet.channelId,
  }));
}

/**
 * Fetch popular podcasts from Ethiopia
 */
export async function fetchEthiopianPodcasts(): Promise<Podcast[]> {
  const ethiopianPodcasts = [
    'Seifu on EBS',
    'Zehabesha',
    'Ethiopia 360',
    'Tadias Addis',
  ];

  const podcasts: Podcast[] = [];

  for (const podcastName of ethiopianPodcasts) {
    const result = await makeAPIRequest(async (apiKey) => {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
        `key=${apiKey}&part=snippet&q=${encodeURIComponent(podcastName)}&` +
        `type=channel&maxResults=1`
      );
      return response.json();
    });

    if (result?.items?.[0]) {
      const item = result.items[0];
      podcasts.push({
        id: item.id.channelId,
        title: item.snippet.title,
        creator: 'Ethiopian Content',
        episodes: '100+ Episodes',
        cover: item.snippet.thumbnails.high.url,
        channelId: item.id.channelId,
      });
    }
  }

  return podcasts;
}

/**
 * Fetch popular international podcasts
 */
export async function fetchPopularPodcasts(): Promise<Podcast[]> {
  const popularPodcasts = [
    'Joe Rogan Experience',
    'The Daily',
    'SmartLess',
    'Call Her Daddy',
  ];

  const podcasts: Podcast[] = [];

  for (const podcastName of popularPodcasts) {
    const result = await makeAPIRequest(async (apiKey) => {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
        `key=${apiKey}&part=snippet&q=${encodeURIComponent(podcastName + ' podcast')}&` +
        `type=channel&maxResults=1`
      );
      return response.json();
    });

    if (result?.items?.[0]) {
      const item = result.items[0];
      podcasts.push({
        id: item.id.channelId,
        title: item.snippet.title,
        creator: 'Podcast Creator',
        episodes: '500+ Episodes',
        cover: item.snippet.thumbnails.high.url,
        channelId: item.id.channelId,
      });
    }
  }

  return podcasts;
}

/**
 * Fetch trending music globally
 */
export async function fetchTrendingMusic(maxResults = 20): Promise<YouTubeTrack[]> {
  const result = await makeAPIRequest(async (apiKey) => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?` +
      `key=${apiKey}&part=snippet&chart=mostPopular&videoCategoryId=10&` +
      `regionCode=US&maxResults=${maxResults}`
    );
    return response.json();
  });

  if (!result?.items) return [];

  return result.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    album: item.snippet.title,
    coverArt: item.snippet.thumbnails.high.url,
    duration: 180,
    videoId: item.id,
    channelId: item.snippet.channelId,
  }));
}

/**
 * Search for music
 */
export async function searchMusic(query: string, maxResults = 10): Promise<YouTubeTrack[]> {
  const result = await makeAPIRequest(async (apiKey) => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `key=${apiKey}&part=snippet&q=${encodeURIComponent(query)}&` +
      `type=video&videoCategoryId=10&maxResults=${maxResults}`
    );
    return response.json();
  });

  if (!result?.items) return [];

  return result.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    album: item.snippet.title,
    coverArt: item.snippet.thumbnails.high.url,
    duration: 180,
    videoId: item.id.videoId,
    channelId: item.snippet.channelId,
  }));
}

/**
 * Get mixed content (Ethiopian + International)
 */
export async function fetchMixedContent(): Promise<{
  ethiopianArtists: Artist[];
  internationalArtists: Artist[];
  ethiopianPodcasts: Podcast[];
  internationalPodcasts: Podcast[];
  trendingTracks: YouTubeTrack[];
}> {
  console.log('📡 Fetching mixed content from YouTube API...');

  const [
    ethiopianArtists,
    internationalArtists,
    ethiopianPodcasts,
    internationalPodcasts,
    trendingTracks,
  ] = await Promise.all([
    fetchEthiopianArtists(),
    fetchPopularArtists(),
    fetchEthiopianPodcasts(),
    fetchPopularPodcasts(),
    fetchTrendingMusic(20),
  ]);

  console.log('✅ Content fetched successfully:', {
    ethiopianArtists: ethiopianArtists.length,
    internationalArtists: internationalArtists.length,
    ethiopianPodcasts: ethiopianPodcasts.length,
    internationalPodcasts: internationalPodcasts.length,
    trendingTracks: trendingTracks.length,
  });

  return {
    ethiopianArtists,
    internationalArtists,
    ethiopianPodcasts,
    internationalPodcasts,
    trendingTracks,
  };
}
