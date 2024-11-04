import React, { useState, useRef } from 'react';
import { Play, Pause, MessageCircle, Users, X, SmilePlus, Settings } from 'lucide-react';
import { Movie, ChatMessage, ViewerStatus } from '../types/movie';
import { Poll, Reaction, MovieMoment, WatchRoomTheme } from '../types/interactions';
import { InteractiveFeatures } from './InteractiveFeatures';

interface WatchRoomProps {
  movie: Movie;
  onClose: () => void;
}

export function WatchRoom({ movie, onClose }: WatchRoomProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [viewers, setViewers] = useState<ViewerStatus[]>(movie.viewers || []);
  const [currentTime, setCurrentTime] = useState(0);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [moments, setMoments] = useState<MovieMoment[]>([]);
  const [theme, setTheme] = useState<WatchRoomTheme>({
    id: 'default',
    name: 'Classic Theater',
    background: 'bg-black',
    color: 'text-white',
    decorations: []
  });

  const handleCreatePoll = (pollData: Omit<Poll, 'id' | 'votes'>) => {
    const newPoll: Poll = {
      ...pollData,
      id: Date.now().toString(),
      votes: {}
    };
    setPolls([...polls, newPoll]);
  };

  const handleCaptureReaction = (reactionData: Omit<Reaction, 'id'>) => {
    const newReaction: Reaction = {
      ...reactionData,
      id: Date.now().toString()
    };
    setReactions([...reactions, newReaction]);
  };

  const handleCaptureMoment = (momentData: Omit<MovieMoment, 'id'>) => {
    const newMoment: MovieMoment = {
      ...momentData,
      id: Date.now().toString()
    };
    setMoments([...moments, newMoment]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: 'current-user',
      username: 'You',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100',
      message: message.trim(),
      timestamp: Date.now(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className={`fixed inset-0 ${theme.background} flex`}>
      {/* Video Player */}
      <div className="flex-1 relative">
        <img 
          src={movie.thumbnail} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        
        <InteractiveFeatures
          movieId={movie.id}
          timestamp={currentTime}
          onCreatePoll={handleCreatePoll}
          onCaptureReaction={handleCaptureReaction}
          onCaptureMoment={handleCaptureMoment}
        />

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-6">
          <div className="flex items-center justify-between text-white">
            <div>
              <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
              <p className="text-sm text-gray-300">{movie.duration}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-white/20 hover:bg-white/30 p-4 rounded-full backdrop-blur-sm"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={() => {
                  const themes: WatchRoomTheme[] = [
                    {
                      id: 'default',
                      name: 'Classic Theater',
                      background: 'bg-black',
                      color: 'text-white',
                      decorations: []
                    },
                    {
                      id: 'cozy',
                      name: 'Cozy Living Room',
                      background: 'bg-warmth-pattern',
                      ambientMusic: '/ambient/fireplace.mp3',
                      color: 'text-amber-50',
                      decorations: ['fireplace', 'sofa']
                    }
                  ];
                  const currentIndex = themes.findIndex(t => t.id === theme.id);
                  const nextTheme = themes[(currentIndex + 1) % themes.length];
                  setTheme(nextTheme);
                }}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar with Chat and Viewers */}
      <div className="w-96 bg-white flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex gap-4">
            <button
              onClick={() => setShowChat(true)}
              className={`p-2 rounded ${showChat ? 'bg-purple-100 text-purple-600' : 'text-gray-600'}`}
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowChat(false)}
              className={`p-2 rounded ${!showChat ? 'bg-purple-100 text-purple-600' : 'text-gray-600'}`}
            >
              <Users className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {showChat ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.userId === 'current-user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <img
                    src={msg.avatar}
                    alt={msg.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className={`max-w-[70%] ${
                    msg.userId === 'current-user' 
                      ? 'bg-purple-100' 
                      : 'bg-gray-100'
                  } rounded-2xl p-3`}>
                    <p className="text-sm font-medium">{msg.username}</p>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}

              {polls.map((poll) => (
                <div key={poll.id} className="bg-purple-50 rounded-lg p-4">
                  <p className="font-medium mb-2">{poll.question}</p>
                  <div className="space-y-2">
                    {poll.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const newPolls = [...polls];
                          const pollIndex = newPolls.findIndex(p => p.id === poll.id);
                          if (pollIndex !== -1) {
                            const votes = { ...newPolls[pollIndex].votes };
                            votes['current-user'] = index;
                            newPolls[pollIndex].votes = votes;
                            setPolls(newPolls);
                          }
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          poll.votes['current-user'] === index
                            ? 'bg-purple-600 text-white'
                            : 'bg-white hover:bg-purple-100'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <SmilePlus className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 p-4">
            <h3 className="font-semibold mb-4">Viewers ({viewers.length})</h3>
            <div className="space-y-3">
              {viewers.map((viewer) => (
                <div key={viewer.userId} className="flex items-center gap-3">
                  <img
                    src={viewer.avatar}
                    alt={viewer.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sm">
                      {viewer.username}
                      {viewer.isHost && (
                        <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                          Host
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {viewer.isReady ? 'Ready' : 'Not ready'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}