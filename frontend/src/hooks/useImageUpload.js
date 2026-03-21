import { useState, useRef, useCallback } from 'react'

export function useImageUpload() {
  const [images, setImages] = useState([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const addFiles = (files) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'))
    if (!imageFiles.length) return
    const newImages = imageFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }))
    setImages((prev) => [...prev, ...newImages])
  }

  const removeImage = (id) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id)
      if (img) URL.revokeObjectURL(img.url)
      return prev.filter((i) => i.id !== id)
    })
  }

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }, [])

  const onDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const onDragLeave = () => setDragging(false)

  const onFileInput = (e) => addFiles(e.target.files)

  return {
    images,
    dragging,
    inputRef,
    onDrop,
    onDragOver,
    onDragLeave,
    onFileInput,
    removeImage,
  }
}
