import { useState } from 'react'
import DropZone from '../components/DropZone'
import ImageGrid from '../components/ImageGrid'
import StoryOutput from '../components/StoryOutput'
import { useImageUpload } from '../hooks/useImageUpload'
import { processImages } from '../services/imageService'

export default function HomePage() {
  const { images, dragging, inputRef, onDrop, onDragOver, onDragLeave, onFileInput, removeImage } = useImageUpload()
  const [rendered, setRendered] = useState([])
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleProcess = async () => {
    setLoading(true)
    setStory(null)
    setError(null)
    try {
      const data = await processImages(images)
      setRendered(images)
      setStory(data.story)
    } catch {
      setError("Something went wrong, make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-col items-center px-4">
      <p className="text-gray-400 mb-10 text-sm">
        Upload your images to start converting your favourite holiday pictures into memorable stories!
      </p>

      <DropZone
        dragging={dragging}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onFileInput={onFileInput}
        inputRef={inputRef}
      />

      <ImageGrid images={images} onRemove={removeImage} />

      <button
        onClick={handleProcess}
        disabled={images.length === 0 || loading}
        className={`mt-8 px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-200
          ${images.length > 0 && !loading
            ? 'bg-violet-600 hover:bg-violet-500 text-white cursor-pointer shadow-lg shadow-violet-900/40'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
      >
        {loading ? "Processing..." : "Generate Story"}
      </button>

      {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}

      <StoryOutput images={rendered} story={story} />
    </div>
  )
}
