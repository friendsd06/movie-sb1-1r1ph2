import React from 'react';
import { Home, Film, Users, Heart, Settings, LogOut } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-purple-600 flex items-center gap-2">
          <Film className="w-6 h-6" />
          MovieShare
        </h1>
      </div>
      <nav className="mt-6">
        {[
          { icon: Home, label: 'Home', active: true },
          { icon: Film, label: 'Library' },
          { icon: Users, label: 'Friends' },
          { icon: Heart, label: 'Favorites' },
          { icon: Settings, label: 'Settings' },
        ].map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
              active
                ? 'text-purple-600 bg-purple-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>
      <div className="absolute bottom-8 w-full px-6">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}