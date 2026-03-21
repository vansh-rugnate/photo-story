export default function ImageGrid({ images, onRemove }) {
  if (!images.length) return null

  return (
    <div className="w-full max-w-2xl mt-6 grid grid-cols-3 sm:grid-cols-4 gap-3">
      {images.map((img) => (
        <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-800">
          <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
          <button
            onClick={() => onRemove(img.id)}
            className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={`Remove ${img.name}`}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
