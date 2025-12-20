
export enum AudioMode {
  OFFICIAL = 'OFFICIAL',
  VIDEO = 'VIDEO'
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  videoUrl?: string;
  videoId?: string; // YouTube video ID
  isLossless: boolean;
  duration: number; // in seconds
  heatmap?: number[]; // normalized 0-1 replay frequency
  samples?: string[];
  isSampledIn?: string[];
  playNext?: () => void; // Function to trigger play next behavior
}

export interface Room {
  id: string;
  name: string;
  host: string;
  participantCount: number;
  currentTrackId: string;
}

export interface FriendActivity {
  id: string;
  name: string;
  avatar: string;
  status: 'listening' | 'idle' | 'offline';
  currentTrack?: Track;
}
