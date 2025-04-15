export default function Hoverable({
  label,
  text,
}: {
  label: string;
  text?: string;
}) {
  return (
    <span className="relative group cursor-help">
      <span className="group-hover:bg-yellow-100 transition-colors">
        {text}
      </span>
      <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 whitespace-nowrap">
        {label}
      </span>
    </span>
  );
}
