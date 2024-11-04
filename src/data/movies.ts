import { Movie } from '../types/movie';

export const MOVIES: Movie[] = [
  {
    id: '1',
    title: "The Grand Adventure",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800",
    duration: "2:15:30",
    likes: 1200,
    comments: 384,
    description: "An epic journey through uncharted territories, where a group of explorers discover more than just new lands.",
    genre: ["Adventure", "Drama"],
    rating: 4.5,
    viewers: [
      {
        userId: "1",
        username: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100",
        isHost: true,
        isReady: true
      },
      {
        userId: "2",
        username: "Mike Wilson",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100",
        isHost: false,
        isReady: true
      }
    ]
  },
  {
    id: '2',
    title: "Urban Stories",
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800",
    duration: "1:45:20",
    likes: 856,
    comments: 234,
    description: "A collection of interconnected tales exploring life in the modern metropolis, where strangers' paths cross in unexpected ways.",
    genre: ["Drama", "Romance"],
    rating: 4.2
  },
  {
    id: '3',
    title: "Nature's Call",
    thumbnail: "https://images.unsplash.com/photo-1518134346374-184f9d21cea2?auto=format&fit=crop&w=800",
    duration: "1:58:45",
    likes: 2100,
    comments: 567,
    description: "An immersive documentary showcasing Earth's most breathtaking landscapes and the wildlife that calls them home.",
    genre: ["Documentary", "Nature"],
    rating: 4.8
  }
];