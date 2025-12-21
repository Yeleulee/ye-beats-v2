
import { Track, FriendActivity } from './types';

export const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Professional',
    artist: 'The Weeknd',
    album: 'Kiss Land',
    coverArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&h=300&auto=format&fit=crop',
    isLossless: true,
    duration: 368,
    heatmap: [0.1, 0.2, 0.5, 0.8, 0.9, 0.4, 0.3, 0.6, 1.0, 0.7, 0.3, 0.2],
    samples: [],
    isSampledIn: [],
    videoId: 'K5LqYewA_ec'
  },
  {
    id: '2',
    title: 'Candy Rain',
    artist: 'Soul For Real',
    album: 'Candy Rain',
    coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&h=300&auto=format&fit=crop',
    isLossless: false,
    duration: 275,
    heatmap: [0.3, 0.4, 0.6, 0.7, 0.5, 0.8, 0.9, 1.0, 0.9, 0.8, 0.7, 0.6],
    samples: [],
    isSampledIn: [],
    videoId: 'Cx0zObxA8NE'
  },
  {
    id: '3',
    title: 'Plastic Love',
    artist: 'Mariya Takeuchi',
    album: 'Variety',
    coverArt: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=300&h=300&auto=format&fit=crop',
    isLossless: false,
    duration: 472,
    heatmap: [0.3, 0.4, 0.6, 0.7, 0.5, 0.8, 0.9, 1.0, 0.9, 0.8, 0.7, 0.6],
    samples: [],
    isSampledIn: ['Night Tempo - Plastic Love Edit'],
    videoId: '9Gj47G2e1Jc'
  },
  {
    id: '4',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    coverArt: 'https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=300&h=300&auto=format&fit=crop',
    isLossless: true,
    duration: 200,
    heatmap: [0.2, 0.5, 0.9, 1.0, 0.8, 0.4, 0.3, 0.6, 0.8, 0.9, 0.5, 0.2],
    samples: [],
    isSampledIn: [],
    videoId: '4NRXx6U8ABQ'
  },
  {
    id: '5',
    title: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We\'re Dreaming',
    coverArt: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=300&h=300&auto=format&fit=crop',
    isLossless: true,
    duration: 243,
    heatmap: [0.1, 0.3, 0.7, 0.9, 1.0, 0.8, 0.6, 0.4, 0.3, 0.2, 0.2, 0.1],
    samples: [],
    isSampledIn: [],
    videoId: 'dX3k_QDnzHE'
  },
  {
    id: '6',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    coverArt: 'https://images.unsplash.com/photo-1514525253361-bee8718a7439?q=80&w=300&h=300&auto=format&fit=crop',
    isLossless: true,
    duration: 215,
    heatmap: [0.4, 0.5, 0.6, 0.8, 0.9, 1.0, 0.9, 0.7, 0.5, 0.4, 0.3, 0.2],
    samples: [],
    isSampledIn: [],
    videoId: 'XXYlFuWEuKI'
  }
];

export const MOCK_FRIENDS: FriendActivity[] = [
  {
    id: 'f1',
    name: 'Liam Chen',
    avatar: 'https://i.pravatar.cc/100?u=liam',
    status: 'listening',
    currentTrack: MOCK_TRACKS[1]
  },
  {
    id: 'f2',
    name: 'Sarah Miller',
    avatar: 'https://i.pravatar.cc/100?u=sarah',
    status: 'listening',
    currentTrack: MOCK_TRACKS[0]
  },
  {
    id: 'f3',
    name: 'Marcus Wright',
    avatar: 'https://i.pravatar.cc/100?u=marcus',
    status: 'idle'
  }
];
