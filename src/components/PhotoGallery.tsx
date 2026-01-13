import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Photo {
  id: number;
  url: string;
  caption: string;
}

export default function PhotoGallery() {
  const photos: Photo[] = [
    {
      id: 1,
      url: "/photos/image.png",
      caption: "Pas Masih Jadi Cowo Cool 😎"
    },
    {
      id: 2,
      url: "/photos/fotoceria.png",
      caption: "Pas Lagi Ceriaa bangett ❤️"
    },
    {
      id: 3,
      url: "/photos/maumakan.png",
      caption: "Pas lagi mau makan bersama pemilik hati aww awww 😍"
    },
    {
      id: 4,
      url: "/photos/fotokecil.png",
      caption: "Pas Masih Kecil cantik and maniezz abizz 😍"
    },
    {
      id: 5,
      url: "/photos/fotobersama.png",
      caption: "Pas Lagi bersama sang ceo kaisar Kangmas Raden Irwan 😍"
    },
    {
      id: 6,
      url: "/photos/fotomangap.png",
      caption: "Ini Bonus yaa pas lagi membuka jurus rahasia biar makin sayang😘"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = photos.length - 1;
      if (newIndex >= photos.length) newIndex = 0;
      return newIndex;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <motion.div
        className="text-center mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-pink-600 mb-2">Galeri Kita 📸</h2>
        <p className="text-gray-600">Swipe atau klik untuk melihat foto lainnya</p>
      </motion.div>

      {/* Main Gallery */}
      <div className="relative w-full max-w-2xl">
        <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-pink-100 to-purple-100">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full h-full cursor-grab active:cursor-grabbing"
              onClick={() => setShowFullscreen(true)}
            >
              <ImageWithFallback
                src={photos[currentIndex].url}
                alt={photos[currentIndex].caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white text-center">{photos[currentIndex].caption}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-pink-600" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-pink-600" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-pink-600 w-8'
                  : 'bg-pink-300 w-2'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-8 max-w-2xl w-full">
        {photos.map((photo, index) => (
          <motion.button
            key={photo.id}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`relative aspect-square rounded-lg overflow-hidden ${
              index === currentIndex ? 'ring-4 ring-pink-500' : ''
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ImageWithFallback
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullscreen(false)}
          >
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-3 rounded-full z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl w-full"
            >
              <ImageWithFallback
                src={photos[currentIndex].url}
                alt={photos[currentIndex].caption}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
