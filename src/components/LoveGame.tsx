import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star } from 'lucide-react';

interface LoveItem {
  id: number;
  message: string;
  revealed: boolean;
  x: number;
  y: number;
}

export default function LoveGame() {
  const [items, setItems] = useState<LoveItem[]>([
    { id: 1, message: "Kamu Cantik Banget! 😍", revealed: false, x: 20, y: 20 },
    { id: 2, message: "Senyummu Bikin Hari Cerah ☀️", revealed: false, x: 60, y: 15 },
    { id: 3, message: "Kamu Istimewa 💎", revealed: false, x: 40, y: 40 },
    { id: 4, message: "I Love You 3000 💕", revealed: false, x: 15, y: 60 },
    { id: 5, message: "Kamu Luar Biasa! ⭐", revealed: false, x: 70, y: 55 },
    { id: 6, message: "Best Thing Ever! 🌟", revealed: false, x: 45, y: 70 },
    { id: 7, message: "My Everything 💖", revealed: false, x: 30, y: 85 },
    { id: 8, message: "Forever & Always 💍", revealed: false, x: 65, y: 80 },
  ]);

  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleClick = (id: number) => {
    setItems(items.map(item => {
      if (item.id === id && !item.revealed) {
        setScore(score + 1);
        return { ...item, revealed: true };
      }
      return item;
    }));

    const allRevealed = items.every(item => item.revealed || item.id === id);
    if (allRevealed) {
      setTimeout(() => setShowCelebration(true), 500);
    }
  };

  const resetGame = () => {
    setItems(items.map(item => ({ ...item, revealed: false })));
    setScore(0);
    setShowCelebration(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <motion.div
        className="text-center mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-pink-600 mb-2">Love Game 💝</h2>
        <p className="text-gray-600 mb-4">Klik semua hati untuk membuka kata-kata spesial!</p>
        <div className="flex items-center justify-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="text-purple-600">Score: {score}/{items.length}</span>
        </div>
      </motion.div>

      {/* Game Area */}
      <div className="relative w-full max-w-2xl h-[500px] bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl shadow-2xl overflow-hidden">
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="absolute"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: item.id * 0.1, type: 'spring' }}
          >
            {!item.revealed ? (
              <motion.button
                onClick={() => handleClick(item.id)}
                className="relative"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: item.id * 0.2
                }}
              >
                <Heart className="w-12 h-12 text-pink-500 fill-pink-500 drop-shadow-lg" />
              </motion.button>
            ) : (
              <motion.div
                className="bg-white rounded-2xl px-4 py-2 shadow-xl border-2 border-pink-300"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring' }}
              >
                <p className="text-sm text-purple-600 whitespace-nowrap">{item.message}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Celebration Modal */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md text-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity
                }}
              >
                <h3 className="text-pink-600 mb-4">Kamu Hebat! 🎉</h3>
              </motion.div>
              <p className="text-gray-700 mb-6">
                Kamu berhasil menemukan semua kata-kata cinta! Sama seperti kamu yang selalu berhasil membuat hariku lebih baik 💕
              </p>
              <motion.button
                onClick={resetGame}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Main Lagi 🔄
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
