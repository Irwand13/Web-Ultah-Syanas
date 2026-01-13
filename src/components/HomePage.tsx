import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface HomePageProps {
  onOpenMessage: () => void;
}

interface Confetti {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
}

export default function HomePage({ onOpenMessage }: HomePageProps) {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Generate confetti
    const newConfetti: Confetti[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      color: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#DDA0DD', '#DA70D6'][Math.floor(Math.random() * 6)]
    }));
    setConfetti(newConfetti);

    // Show button after animation
    setTimeout(() => setShowButton(true), 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Confetti */}
      {confetti.map((conf) => (
        <motion.div
          key={conf.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${conf.x}%`,
            top: '-10px',
            backgroundColor: conf.color
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 20,
            opacity: 0,
            rotate: 360
          }}
          transition={{
            duration: conf.duration,
            delay: conf.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      {/* Main Content */}
      <motion.div
        className="text-center z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-pink-500" />
        </motion.div>
        
        <motion.h1
          className="text-pink-600 mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Selamat Ulang Tahun
        </motion.h1>
        
        <motion.h2
          className="text-purple-600 mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Sayangku! 💕
        </motion.h2>
        
        <motion.p
          className="text-gray-700 max-w-md mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Di hari spesialmu ini, aku ingin kamu tahu betapa berartinya kamu dalam hidupku. 
          Terima kasih sudah menjadi bagian terpenting dalam hidupku.
        </motion.p>

        {showButton && (
          <motion.button
            onClick={onOpenMessage}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Tap Here! ✨
          </motion.button>
        )}
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute bottom-10 left-10 text-4xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        🎂
      </motion.div>

      <motion.div
        className="absolute top-20 right-10 text-4xl"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -10, 10, 0]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5
        }}
      >
        🎈
      </motion.div>
    </div>
  );
}
