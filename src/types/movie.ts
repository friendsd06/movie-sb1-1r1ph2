export interface Movie {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  likes: number;
  comments: number;
  description: string;
  genre: string[];
  rating: number;
  viewers?: ViewerStatus[];
}

export interface ViewerStatus {
  userId: string;
  username: string;
  avatar: string;
  isHost: boolean;
  isReady: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: number;
  reaction?: string;
}