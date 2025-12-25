export interface LyricsResult {
  id: number;
  trackName: string;
  artistName: string;
  albumName: string;
  duration: number;
  instrumental: boolean;
  plainLyrics: string;
  syncedLyrics: string;
}

const LRCLIB_BASE_URL = 'https://lrclib.net/api';

/**
 * Search for lyrics using track name and artist name
 */
export const searchLyrics = async (
  trackName: string, 
  artistName: string, 
  albumName?: string, 
  duration?: number
): Promise<LyricsResult | null> => {
  try {
    const params = new URLSearchParams({
      track_name: trackName,
      artist_name: artistName,
    });

    if (albumName) params.append('album_name', albumName);
    
    // LRCLIB recommends using the get endpoint if duration is known for better matching
    // But search is more flexible if duration doesn't match exactly
    const response = await fetch(`${LRCLIB_BASE_URL}/search?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Lyrics search failed: ${response.statusText}`);
    }

    const data: LyricsResult[] = await response.json();
    
    // Find the best match
    if (data && data.length > 0) {
      // If we have duration, try to find a close match (within 2 seconds)
      if (duration) {
        const bestMatch = data.find(item => Math.abs(item.duration - duration) < 2);
        if (bestMatch) return bestMatch;
      }
      // Otherwise return the first result
      return data[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return null;
  }
};

/**
 * Get lyrics by LRCLIB ID
 */
export const getLyricsById = async (id: number): Promise<LyricsResult | null> => {
  try {
    const response = await fetch(`${LRCLIB_BASE_URL}/get/${id}`);
    
    if (!response.ok) {
      throw new Error(`Get lyrics failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching lyrics by ID:', error);
    return null;
  }
};
