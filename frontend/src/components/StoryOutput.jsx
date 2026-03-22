export default function StoryOutput({ images, story }) {
  if (!images.length) return null

  return (
    <div className="w-full max-w-4xl mt-12 pb-16">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">Processed Images</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="rounded-2xl overflow-hidden bg-gray-200 shadow-md">
            <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {story && (
        <div className="mt-10 bg-gray-100 rounded-2xl p-8 border border-gray-300">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{story}</p>
        </div>
      )}
    </div>
  )
}
