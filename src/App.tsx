import { useState } from 'react';
import HomePage from './components/HomePage';
import LoveMessage from './components/LoveMessage';
import LoveGame from './components/LoveGame';
import PhotoGallery from './components/PhotoGallery';
import LoveLetter from './components/LoveLetter';
import { Heart, Camera, GamepadIcon, Mail, Home } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'message' | 'game' | 'gallery' | 'letter'>('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200">
      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-lg z-50">
        <div className="flex justify-around items-center px-4 py-3 max-w-2xl mx-auto">
          <button
            onClick={() => setCurrentPage('home')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
              currentPage === 'home' ? 'text-pink-600' : 'text-gray-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setCurrentPage('message')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
              currentPage === 'message' ? 'text-pink-600' : 'text-gray-600'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs">Pesan</span>
          </button>
          <button
            onClick={() => setCurrentPage('game')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
              currentPage === 'game' ? 'text-pink-600' : 'text-gray-600'
            }`}
          >
            <GamepadIcon className="w-5 h-5" />
            <span className="text-xs">Game</span>
          </button>
          <button
            onClick={() => setCurrentPage('gallery')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
              currentPage === 'gallery' ? 'text-pink-600' : 'text-gray-600'
            }`}
          >
            <Camera className="w-5 h-5" />
            <span className="text-xs">Galeri</span>
          </button>
          <button
            onClick={() => setCurrentPage('letter')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
              currentPage === 'letter' ? 'text-pink-600' : 'text-gray-600'
            }`}
          >
            <Mail className="w-5 h-5" />
            <span className="text-xs">Surat</span>
          </button>
        </div>
      </nav>

      {/* Pages */}
      <div className="pb-20">
        {currentPage === 'home' && <HomePage onOpenMessage={() => setCurrentPage('message')} />}
        {currentPage === 'message' && <LoveMessage />}
        {currentPage === 'game' && <LoveGame />}
        {currentPage === 'gallery' && <PhotoGallery />}
        {currentPage === 'letter' && <LoveLetter />}
      </div>
    </div>
  );
}
