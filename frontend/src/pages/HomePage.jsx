import { useState } from 'react'
import DropZone from '../components/DropZone'
import ImageGrid from '../components/ImageGrid'
import StoryOutput from '../components/StoryOutput'
import { useImageUpload } from '../hooks/useImageUpload'
import { processImages, regenerateStory } from '../services/imageService'

export default function HomePage() {
  const { images, dragging, inputRef, onDrop, onDragOver, onDragLeave, onFileInput, removeImage } = useImageUpload()
  const [rendered, setRendered] = useState([])
  const [captions, setCaptions] = useState([])
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const [error, setError] = useState(null)

  const handleProcess = async () => {
    setLoading(true)
    setStory(null)
    setError(null)
    try {
      const data = await processImages(images)
      setRendered(images)
      setCaptions(data.captions)
      setStory(data.story)
    } catch {
      setError("Something went wrong, make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegenerate = async () => {
    setRegenerating(true)
    setError(null)
    try {
      const data = await regenerateStory(captions)
      setStory(data.story)
    } catch {
      setError("Something went wrong, make sure the backend is running.")
    } finally {
      setRegenerating(false)
    }
  }

  return (
    <div className="w-full flex flex-col items-center px-4">
      <p className="text-gray-600 mb-10 text-lg">
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
            ? 'bg-violet-600 hover:bg-violet-500 text-white cursor-pointer shadow-md'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
      >
        {loading ? "Processing..." : "Generate Story"}
      </button>

      {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}

      <StoryOutput images={rendered} story={story} />

      {story && (
        <button
          onClick={handleRegenerate}
          disabled={regenerating}
          className="mt-4 px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 bg-gray-300 hover:bg-gray-400 text-gray-800"
        >
          {regenerating ? "Regenerating..." : "Regenerate Story"}
        </button>
      )}
    </div>
  )
}
