import { useFileStore } from '@/utils/hooks/useFileStore'
import { toast } from 'sonner'

export function addVideo(file: File) {
  // check if the file is a video
  if (!file.type.includes('video/')) {
    toast.error('File type not supported.')
    return

    // check if the file size is less than 50MB
  } else if (file.size / 1024 / 1024 > 50) {
    toast.error('File size too big (max 50MB).')
    return
  }

  const blob = URL.createObjectURL(file)
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => {
    const bytes = reader.result as string
    const buffer = Buffer.from(bytes, 'binary')
    useFileStore.getState().addFile({
      type: 'video',
      blob,
      filename: file.name,
      content: buffer.toString('base64')
    })
  }
  return blob
}

export function getScreenshot(videoUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.src = videoUrl
    video.muted = true

    video.addEventListener('loadedmetadata', () => {
      video.currentTime = 0

      video.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const context = canvas.getContext('2d')!

        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageUrl = canvas.toDataURL('image/png')
        resolve(imageUrl)
      })

      video.addEventListener('error', (error) => {
        reject(error)
      })
    })

    video.addEventListener('error', (error) => {
      reject(error)
    })
  })
}
