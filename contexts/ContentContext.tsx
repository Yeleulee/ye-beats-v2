import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchMixedContent, YouTubeTrack, Artist, Podcast } from '../services/youtubeService';

interface ContentData {
  ethiopianArtists: Artist[];
  internationalArtists: Artist[];
  ethiopianPodcasts: Podcast[];
  internationalPodcasts: Podcast[];
  trendingTracks: YouTubeTrack[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const ContentContext = createContext<ContentData | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Omit<ContentData, 'loading' | 'error' | 'refetch'>>({
    ethiopianArtists: [],
    internationalArtists: [],
    ethiopianPodcasts: [],
    internationalPodcasts: [],
    trendingTracks: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const content = await fetchMixedContent();
      setData(content);
      
      console.log('🎉 Real data loaded successfully!');
    } catch (err) {
      console.error('❌ Error fetching content:', err);
      setError('Failed to load content. Please check your API keys.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const value: ContentData = {
    ...data,
    loading,
    error,
    refetch: fetchData,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
