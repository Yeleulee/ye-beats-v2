
import { useState, useCallback } from 'react';
import { searchMusic, YouTubeTrack } from '../services/youtubeService';

const REGIONS = [
    { name: 'Tokyo', emoji: '🇯🇵', searchTerm: 'Japanese' },
    { name: 'London', emoji: '🇬🇧', searchTerm: 'British UK' },
    { name: 'Detroit', emoji: '🇺🇸', searchTerm: 'Detroit Motown' },
    { name: 'Lagos', emoji: '🇳🇬', searchTerm: 'Nigerian Afrobeat' },
    { name: 'Berlin', emoji: '🇩🇪', searchTerm: 'German Techno' },
    { name: 'Seoul', emoji: '🇰🇷', searchTerm: 'Korean K-pop' },
];

const DECADES = ['1970s', '1980s', '1990s', '2000s'];

export const useCrateDigger = () => {
    const [region, setRegion] = useState(REGIONS[0].name);
    const [decade, setDecade] = useState(DECADES[1]);
    const [loading, setLoading] = useState(false);
    const [playlist, setPlaylist] = useState<YouTubeTrack[]>([]);

    const handleDig = useCallback(async () => {
        setLoading(true);
        try {
            const selectedRegion = REGIONS.find(r => r.name === region);
            const searchQuery = `${selectedRegion?.searchTerm} music ${decade}`;

            console.log(`🎵 Searching for: ${searchQuery}`);

            const results = await searchMusic(searchQuery, 10);

            setPlaylist(results);
            console.log(`✅ Found ${results.length} tracks for ${region} - ${decade}`);
        } catch (error) {
            console.error('❌ Error fetching tracks:', error);
            alert('Failed to fetch tracks. Please try again.');
            setPlaylist([]);
        } finally {
            setLoading(false);
        }
    }, [region, decade]);

    return {
        region,
        setRegion,
        decade,
        setDecade,
        loading,
        playlist,
        handleDig,
        regions: REGIONS,
        decades: DECADES,
    };
};
