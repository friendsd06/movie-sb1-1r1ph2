export interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: Record<string, number>;
  expiresAt: number;
}

export interface Reaction {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  type: 'emoji' | 'gif' | 'voice';
  content: string;
  timestamp: number;
}

export interface MovieMoment {
  id: string;
  userId: string;
  username: string;
  timestamp: number;
  title: string;
  description?: string;
  thumbnail: string;
}

export interface WatchRoomTheme {
  id: string;
  name: string;
  background: string;
  ambientMusic?: string;
  decorations: string[];
  color: string;
}