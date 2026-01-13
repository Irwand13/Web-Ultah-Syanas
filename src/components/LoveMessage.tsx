import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export default function LoveMessage() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [heartCounter, setHeartCounter] = useState(0);

  const createHeart = () => {
    const newHeart: FloatingHeart = {
      id: heartCounter,
      x: 20 + Math.random() * 60,
      delay: 0,
      duration: 2 + Math.random() * 2,
      size: 20 + Math.random() * 20
    };

    setHearts((prev) => [...prev, newHeart]);
    setHeartCounter((prev) => prev + 1);

    // Remove heart after animation
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, newHeart.duration * 1000);
  };

  useEffect(() => {
    // Auto generate hearts periodically
    const interval = setInterval(() => {
      createHeart();
    }, 500);

    return () => clearInterval(interval);
  }, [heartCounter]);

  const messages = [
    "Kamu adalah hadiah terbaik dalam hidupku 🎁",
    "Setiap hari bersamamu adalah petualangan yang indah 🌟",
    "Senyummu adalah hal favorit yang selalu kutunggu 😊",
    "Terima kasih sudah menjadi alasan kebahagiaanku 💖",
    "Kamu membuatku menjadi versi terbaik dari diriku 🌸"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Floating Hearts */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-500"
            style={{
              left: `${heart.x}%`,
              bottom: '-50px',
              fontSize: `${heart.size}px`
            }}
            initial={{ y: 0, opacity: 1, scale: 0 }}
            animate={{
              y: -window.innerHeight - 100,
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.8],
              rotate: [0, 10, -10, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: heart.duration,
              ease: 'easeOut'
            }}
          >
            <Heart className="fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Message Content */}
      <motion.div
        className="max-w-2xl bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl z-10"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.8 }}
      >
        <motion.div
          className="flex justify-center mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Heart className="w-16 h-16 text-pink-500 fill-pink-500" />
        </motion.div>

        <motion.h2
          className="text-pink-600 text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Pesan Cinta Untukmu ❤️
        </motion.h2>

        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.2 }}
              whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
            >
              <p className="text-gray-700 text-center">{message}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-purple-600">
            Selamat ulang tahun, sayang! Semoga semua impianmu menjadi kenyataan 🎉
          </p>
        </motion.div>

        <motion.button
          onClick={createHeart}
          className="mt-6 mx-auto block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Kirim Hati 💕
        </motion.button>
      </motion.div>
    </div>
  );
}
