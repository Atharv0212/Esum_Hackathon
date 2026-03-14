export function BambooDecoration() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating bamboo leaves */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-emerald-400"
          >
            {/* Bamboo leaf shape */}
            <path
              d="M12 2C12 2 8 6 8 12C8 6 4 2 4 2C4 2 8 6 12 12C12 6 16 2 16 2C16 2 12 6 12 12Z"
              fill="currentColor"
              opacity="0.6"
            />
            <path
              d="M12 12C12 12 8 16 8 22C8 16 4 12 4 12C4 12 8 16 12 22C12 16 16 12 16 12C16 12 12 16 12 22Z"
              fill="currentColor"
              opacity="0.4"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
