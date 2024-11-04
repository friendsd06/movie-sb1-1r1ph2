import React from 'react';
import { Sidebar } from './components/Sidebar';
import { MovieCard } from './components/MovieCard';
import { Search, Bell } from 'lucide-react';
import { MOVIES } from './data/movies';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 p-8">
        <header className="flex items-center justify-between mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-64"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </header>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Continue Watching</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOVIES.map((movie) => (
              <MovieCard key={movie.title} {...movie} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;