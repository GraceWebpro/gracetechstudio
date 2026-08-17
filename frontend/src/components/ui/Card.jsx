export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-border
        bg-surface
        p-6
        shadow-card
        transition-all
        duration-300
        hover:border-primary/40
        hover:-translate-y-1
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"/>

      {children}
    </div>
  );
}