const API_URL = "http://localhost:8000"

export async function processImages(imageFiles) {
  const formData = new FormData()
  imageFiles.forEach((img) => formData.append("files", img.file))

  const res = await fetch(`${API_URL}/process`, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) throw new Error("Server error")
  return res.json() // { captions, story }
}
