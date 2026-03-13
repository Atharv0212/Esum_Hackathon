export function BlossomDecoration() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Cherry blossom petals */}
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
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-pink-300"
          >
            <path
              d="M10 0C10 3 8 5 5 5C8 5 10 7 10 10C10 7 12 5 15 5C12 5 10 3 10 0Z"
              fill="currentColor"
            />
            <path
              d="M10 10C10 13 8 15 5 15C8 15 10 17 10 20C10 17 12 15 15 15C12 15 10 13 10 10Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
