import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Calendar, Clock } from 'lucide-react';

export default function LoveLetter() {
  // Ganti tanggal ini dengan tanggal mulai hubungan kalian (format: YYYY-MM-DD)
  const relationshipStartDate = new Date('2005-01-14');
  const [daysTogether, setDaysTogether] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference = now.getTime() - relationshipStartDate.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((difference % (1000 * 60)) / 1000);
      
      setDaysTogether(days);
      setHours(hrs);
      setMinutes(mins);
      setSeconds(secs);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <motion.div
        className="w-full max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Countdown Section */}
        <motion.div
          className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-8 mb-8 shadow-2xl text-white"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <div className="text-center mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <Heart className="w-12 h-12 mx-auto mb-3 fill-white" />
            </motion.div>
            <h2 className="mb-2">Perjalanan Hidup Syanas</h2>
            <p className="opacity-90">sudah selama ini...</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-2">
                <Calendar className="w-6 h-6 mx-auto" />
              </div>
              <motion.div
                key={daysTogether}
                initial={{ scale: 1.2, color: '#FFD700' }}
                animate={{ scale: 1, color: '#FFFFFF' }}
                transition={{ duration: 0.3 }}
              >
                {daysTogether}
              </motion.div>
              <p className="text-sm opacity-90">Hari</p>
            </motion.div>

            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-2">
                <Clock className="w-6 h-6 mx-auto" />
              </div>
              <motion.div
                key={hours}
                initial={{ scale: 1.2, color: '#FFD700' }}
                animate={{ scale: 1, color: '#FFFFFF' }}
                transition={{ duration: 0.3 }}
              >
                {hours}
              </motion.div>
              <p className="text-sm opacity-90">Jam</p>
            </motion.div>

            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-2">⏱️</div>
              <motion.div
                key={minutes}
                initial={{ scale: 1.2, color: '#FFD700' }}
                animate={{ scale: 1, color: '#FFFFFF' }}
                transition={{ duration: 0.3 }}
              >
                {minutes}
              </motion.div>
              <p className="text-sm opacity-90">Menit</p>
            </motion.div>

            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-2">⏰</div>
              <motion.div
                key={seconds}
                initial={{ scale: 1.2, color: '#FFD700' }}
                animate={{ scale: 1, color: '#FFFFFF' }}
                transition={{ duration: 0.3 }}
              >
                {seconds}
              </motion.div>
              <p className="text-sm opacity-90">Detik</p>
            </motion.div>
          </div>

          <motion.p
            className="text-center mt-6 text-sm opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Semoga tiap detik ini cinta kita juga bertumbuh yaa... 💕
          </motion.p>
        </motion.div>

        {/* Love Letter Section */}
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-2xl"
          initial={{ rotateY: 90 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-pink-600 mb-2">Surat Cinta Untukmu 💌</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4 text-gray-700">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              Untuk orang yang paling spesial di hidupku, selamat bertambah usia semoga di umur yang baru ini kamu selalu diberikan kesehatan, kebahagiaan, dan kesuksesan dalam setiap langkahmu dan bertambah juga rasa sayangmu padaku hehehhe.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              Di hari ulang tahunmu yang istimewa ini, aku ingin kamu tahu betapa bersyukurnya aku memilikimu dalam hidupku. Setiap hari bersamamu adalah hadiah yang tak ternilai harganya.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              Kamu bukan hanya pacarku, tapi juga sahabat terbaik, partner dalam segala hal, dan sumber kebahagiaanku. Senyummu mampu mengubah hari terburukku menjadi hari terbaik. Tawamu adalah musik favorit yang selalu ingin kudengar.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
            >
              Terima kasih sudah menjadi dirimu yang luar biasa. Terima kasih untuk setiap momen, setiap tawa, bahkan setiap pertengkaran kecil yang membuat kita semakin kuat. Terima kasih sudah memilih untuk bersama denganku.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
            >
              Di tahun ini dan tahun-tahun selanjutnya, aku berharap semua mimpi dan impianmu menjadi kenyataan. Aku akan selalu ada di sampingmu, mendukungmu, dan mencintaimu dengan sepenuh hatiku.
            </motion.p>

            <motion.p
              className="text-center text-pink-600 mt-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
            >
              Selamat ulang tahun, sayangku! 🎂✨
            </motion.p>

            <motion.p
              className="text-center text-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              I love you more than words can say 💖
            </motion.p>

            <motion.div
              className="text-right text-gray-600 mt-8 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
            >
              <p>Dengan cinta,</p>
              <p className="text-pink-600 mt-1">Orang yang paling mencintaimu ❤️</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Hearts Decoration */}
        <div className="fixed top-20 left-10 text-4xl animate-bounce" style={{ animationDelay: '0s' }}>
          💕
        </div>
        <div className="fixed bottom-32 right-10 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>
          💝
        </div>
        <div className="fixed top-40 right-20 text-2xl animate-bounce" style={{ animationDelay: '2s' }}>
          💖
        </div>
      </motion.div>
    </div>
  );
}
