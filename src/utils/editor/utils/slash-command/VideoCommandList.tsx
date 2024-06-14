import MDEMenuButton from '@/components/MDEMenuButton'
import {
  CommandItemProps,
  updateScrollView
} from '@/utils/editor/extensions/SlashCommand'
import { Editor, Range } from '@tiptap/react'
import { Link, Upload } from 'lucide-react'
import {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { addVideo, getScreenshot } from '../addVideo'

type VideoCommandListProps = {
  editor: Editor
  setVideoMenu: (value: boolean) => void
  range: Range
}

const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString))
  } catch (e) {
    return false
  }
}

const items = [
  {
    title: 'Video Upload',
    description: 'Upload or embed with a link.',
    searchTerms: ['upload', 'video', 'media'],
    icon: <Upload size={18} />
  },
  {
    title: 'Video from URL',
    description: 'Upload or embed with a link.',
    searchTerms: ['video', 'media'],
    icon: <Link size={18} />
  }
]

const VideoCommandList = ({
  editor,
  range,
  setVideoMenu
}: VideoCommandListProps) => {
  const [showLink, setShowLink] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const [errors, setErrors] = useState({ videoUrl: '', uploadVideo: '' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const addVideoFile = async () => {
    editor.chain().focus().deleteRange(range).run()
    // upload video
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'video/mp4,video/x-m4v,video/*'
    input.onchange = async () => {
      if (input.files?.length) {
        const file = input.files[0]
        const video = addVideo(file)
        const imageUrl = await getScreenshot(video!)
        if (video) {
          editor.chain().focus().setImage({ src: imageUrl, alt: '' }).run()
        }
      }
    }
    input.click()
  }

  const handleVideoInput = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value)
  }

  const addVideoUrl = () => {
    if (!isValidUrl(videoUrl)) {
      setErrors((oldState) => ({ ...oldState, videoUrl: 'Invalid URL' }))
      return null
    }

    if (videoUrl) {
      // TODO: Jump to new paragraph after adding video
      editor.chain().focus().deleteRange(range).run()
      editor
        .chain()
        .focus()
        //.setVideo({ src: videoUrl, alt: '', title: '' })
        .insertContent('')
        .run()
      editor.chain().blur().run()
    }
    setShowLink(false)
  }

  useEffect(() => {
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'Enter', 'Escape']
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault()
        if (e.key === 'ArrowUp') {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length)
          return true
        }
        if (e.key === 'ArrowDown') {
          setSelectedIndex((selectedIndex + 1) % items.length)
          return true
        }
        if (e.key === 'Enter') {
          if (items[selectedIndex].title === 'Video Upload') {
            addVideoFile()
          } else {
            showLink ? addVideoUrl() : setShowLink(true)
          }
          return true
        }
        if (e.key === 'Escape') {
          if (showLink) {
            setShowLink(false)
          } else {
            setVideoMenu(false)
            editor.chain().focus().run()
          }
          return true
        }
        return false
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedIndex, showLink])

  useEffect(() => {
    editor.chain().blur().run()
  }, [])

  useEffect(() => {
    setSelectedIndex(0)
  }, [items])

  const commandListContainer = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = commandListContainer?.current

    const item = container?.children[selectedIndex] as HTMLElement

    if (item && container) updateScrollView(container, item)
  }, [selectedIndex])

  return (
    <div id="outstatic">
      {showLink ? (
        <div className="flex w-[500px] rounded-sm border border-black outline-none">
          <div
            className={`relative w-[500px] border-r outline-none border-black`}
          >
            <input
              type="text"
              className={`w-full h-full py-2 px-3 outline-none ${
                errors.videoUrl ? 'bg-red-50' : 'bg-white'
              }`}
              placeholder="Insert link here"
              onChange={handleVideoInput}
              value={videoUrl}
              onFocus={() => setErrors({ ...errors, videoUrl: '' })}
              autoFocus
            />
            {errors.videoUrl && (
              <span className="absolute text-red-500 top-10 left-0">
                {errors.videoUrl}
              </span>
            )}
          </div>
          <MDEMenuButton onClick={addVideoUrl} editor={editor} name="back">
            Done
          </MDEMenuButton>
        </div>
      ) : (
        <div
          id="slash-command"
          ref={commandListContainer}
          className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-stone-200 bg-white px-1 py-2 shadow-md transition-all"
        >
          {items.map((item: CommandItemProps, index: number) => {
            return (
              <button
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm text-stone-900 hover:bg-stone-100 ${
                  index === selectedIndex ? 'bg-stone-100 text-stone-900' : ''
                }`}
                key={index}
                onClick={() =>
                  item.title === 'Video Upload'
                    ? addVideoFile()
                    : setShowLink(true)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    item.title === 'Video Upload'
                      ? addVideoFile()
                      : setShowLink(true)
                  }
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 bg-white">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-stone-500">{item.description}</p>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default VideoCommandList
