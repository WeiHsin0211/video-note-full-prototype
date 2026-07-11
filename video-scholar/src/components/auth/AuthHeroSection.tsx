import { motion } from "framer-motion";

interface AuthHeroSectionProps {
  subline: string;
}

export function AuthHeroSection({ subline }: AuthHeroSectionProps) {
  return (
    <div className="hidden lg:block lg:flex-1 bg-gradient-hero relative overflow-hidden">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Abstract SVG elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Timeline */}
        <motion.svg
          className="absolute top-20 left-10 w-32 h-32 text-accent/20"
          viewBox="0 0 100 100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <line
            x1="10"
            y1="50"
            x2="90"
            y2="50"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {[20, 40, 60, 80].map((x, i) => (
            <circle
              key={i}
              cx={x}
              cy="50"
              r="4"
              fill="currentColor"
              opacity={0.3 + i * 0.2}
            />
          ))}
        </motion.svg>

        {/* Transcript blocks */}
        <motion.div
          className="absolute top-32 right-16 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-3 bg-accent/10 rounded"
              style={{
                width: `${60 + i * 20}px`,
                opacity: 0.3 + i * 0.1,
              }}
            />
          ))}
        </motion.div>

        {/* AI highlights */}
        <motion.svg
          className="absolute bottom-32 left-20 w-24 h-24 text-primary/20"
          viewBox="0 0 100 100"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
          <path
            d="M 35 50 L 45 60 L 65 40"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>

        {/* Note cards */}
        <motion.div
          className="absolute bottom-20 right-12"
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-16 h-20 bg-card/5 rounded-lg border border-card/10 shadow-lg transform rotate-3" />
          <div
            className="w-16 h-20 bg-card/5 rounded-lg border border-card/10 shadow-lg transform -rotate-2 -mt-4 ml-2"
            style={{ opacity: 0.7 }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <motion.div
          className="text-center text-card max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            把任何影片
            <br />
            <span className="text-gradient-accent">
              變成可搜尋、可複習的 AI 筆記
            </span>
          </h2>
          <p className="text-lg text-card/70">{subline}</p>
        </motion.div>
      </div>
    </div>
  );
}

