import React, { useState } from 'react';
import { Play, Share2, Heart, MessageCircle, Star } from 'lucide-react';
import { Movie } from '../types/movie';
import { WatchRoom } from './WatchRoom';

type MovieCardProps = Movie;

export function MovieCard(movie: MovieCardProps) {
  const [showWatchRoom, setShowWatchRoom] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <>
      <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
        <div className="relative aspect-video">
          <img 
            src={movie.thumbnail} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={() => setShowWatchRoom(true)}
              className="bg-white/90 p-3 rounded-full hover:bg-white transition-colors"
            >
              <Play className="w-6 h-6 text-purple-600" />
            </button>
          </div>
          <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-sm rounded-md">
            {movie.duration}
          </span>
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-md">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm">{movie.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-800">{movie.title}</h3>
            <div className="flex gap-1">
              {movie.genre.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{movie.description}</p>
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex space-x-4">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-1 transition-colors ${
                  isLiked ? 'text-red-500' : 'hover:text-purple-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{formatNumber(movie.likes)}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-purple-600 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{formatNumber(movie.comments)}</span>
              </button>
            </div>
            <button className="hover:text-purple-600 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showWatchRoom && (
        <WatchRoom 
          movie={movie} 
          onClose={() => setShowWatchRoom(false)} 
        />
      )}
    </>
  );
}