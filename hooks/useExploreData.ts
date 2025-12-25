import { useState, useEffect } from 'react';
import { fetchTrendingMusic, searchMusic, YouTubeTrack } from '../services/youtubeService';
import { apiKeyManager } from '../utils/apiKeyManager';

export const useExploreData = () => {
    const [globalTracks, setGlobalTracks] = useState<YouTubeTrack[]>([]);
    const [tokyoTracks, setTokyoTracks] = useState<YouTubeTrack[]>([]);
    const [newReleaseTracks, setNewReleaseTracks] = useState<YouTubeTrack[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchExploreData = async () => {
            try {
                setIsLoading(true);
                console.log('🌍 Fetching Explore page data...');

                const results = await Promise.allSettled([
                    fetchTrendingMusic(20),
                    searchMusic('City Pop Tokyo', 10),
                    searchMusic('new music 2025', 10)
                ]);

                const global = results[0].status === 'fulfilled' ? results[0].value : [];
                const tokyo = results[1].status === 'fulfilled' ? results[1].value : [];
                const newReleases = results[2].status === 'fulfilled' ? results[2].value : [];

                results.forEach((result, index) => {
                    if (result.status === 'rejected') {
                        const labels = ['Global', 'Tokyo', 'New Releases'];
                        console.warn(`⚠️ Failed to fetch ${labels[index]}:`, result.reason);
                    }
                });

                setGlobalTracks(global || []);
                setTokyoTracks(tokyo || []);
                setNewReleaseTracks(newReleases || []);

                console.log('✅ Explore data loaded!');
                console.log('📊 API Stats:', apiKeyManager.getStats());
            } catch (error) {
                console.error('❌ Error loading explore data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchExploreData();
    }, []);

    return { globalTracks, tokyoTracks, newReleaseTracks, isLoading };
};
