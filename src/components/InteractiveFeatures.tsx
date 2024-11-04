import React, { useState } from 'react';
import { MessageSquarePlus, Sparkles, Camera, Music2 } from 'lucide-react';
import { Poll, Reaction, MovieMoment } from '../types/interactions';

interface InteractiveFeaturesProps {
  movieId: string;
  timestamp: number;
  onCreatePoll: (poll: Omit<Poll, 'id' | 'votes'>) => void;
  onCaptureReaction: (reaction: Omit<Reaction, 'id'>) => void;
  onCaptureMoment: (moment: Omit<MovieMoment, 'id'>) => void;
}

export function InteractiveFeatures({
  movieId,
  timestamp,
  onCreatePoll,
  onCaptureReaction,
  onCaptureMoment
}: InteractiveFeaturesProps) {
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  const handleCreatePoll = (e: React.FormEvent) => {
    e.preventDefault();
    onCreatePoll({
      question: pollQuestion,
      options: pollOptions.filter(Boolean),
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    });
    setShowPollCreator(false);
    setPollQuestion('');
    setPollOptions(['', '']);
  };

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      <button
        onClick={() => setShowPollCreator(true)}
        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
        title="Create Poll"
      >
        <MessageSquarePlus className="w-6 h-6 text-purple-600" />
      </button>
      
      <button
        onClick={() => onCaptureReaction({
          userId: 'current-user',
          username: 'You',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100',
          type: 'emoji',
          content: '👏',
          timestamp
        })}
        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
        title="Quick Reaction"
      >
        <Sparkles className="w-6 h-6 text-purple-600" />
      </button>

      <button
        onClick={() => onCaptureMoment({
          userId: 'current-user',
          username: 'You',
          timestamp,
          title: 'Movie Moment',
          thumbnail: `https://api.movieshare.app/movies/${movieId}/thumbnail?t=${timestamp}`,
        })}
        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
        title="Capture Moment"
      >
        <Camera className="w-6 h-6 text-purple-600" />
      </button>

      {showPollCreator && (
        <div className="absolute top-0 right-12 bg-white rounded-lg shadow-lg p-4 w-80">
          <form onSubmit={handleCreatePoll}>
            <input
              type="text"
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
              placeholder="Ask a question..."
              className="w-full mb-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {pollOptions.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...pollOptions];
                  newOptions[index] = e.target.value;
                  if (index === pollOptions.length - 1 && e.target.value) {
                    newOptions.push('');
                  }
                  setPollOptions(newOptions);
                }}
                placeholder={`Option ${index + 1}`}
                className="w-full mb-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            ))}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPollCreator(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Create Poll
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}