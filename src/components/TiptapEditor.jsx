import React, { useCallback, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Node, mergeAttributes } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Youtube from '@tiptap/extension-youtube'
import TextAlign from '@tiptap/extension-text-align'
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Video as VideoIcon,
  Film,
  Minus,
  Undo,
  Redo,
  Upload,
  Code,
  Loader2
} from 'lucide-react'
import { uploadImage, uploadMedia } from '../services/api'
import './TiptapEditor.css'

// Custom Tiptap Video Extension for native HTML5 video playback
export const VideoExtension = Node.create({
  name: 'video',
  group: 'block',
  selectable: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      controls: {
        default: true,
      },
      width: {
        default: '100%',
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'video',
        getAttrs: (element) => ({
          src: element.getAttribute('src'),
          controls: element.hasAttribute('controls'),
        }),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'video',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        controls: 'true',
        playsinline: 'true',
        style: 'max-width: 100%; border-radius: 8px; margin: 20px auto; display: block; background: #000;'
      })
    ]
  },

  addCommands() {
    return {
      setVideo: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
    }
  },
})

export default function TiptapEditor({ content, onChange, placeholder = 'Start writing your story or article here...' }) {
  const imageFileInputRef = useRef(null)
  const videoFileInputRef = useRef(null)

  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [isUploadingVideo, setIsUploadingVideo] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Image.configure({
        inline: true,
        allowBase64: true
      }),
      VideoExtension,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'tiptap-link',
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      }),
      Placeholder.configure({
        placeholder
      }),
      Youtube.configure({
        inline: false,
        width: 640,
        height: 360
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      })
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      if (onChange) {
        onChange(html)
      }
    }
  })

  // Insert link
  const setLink = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL link:', previousUrl)

    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  // Insert image via direct URL
  const addImageUrl = useCallback(() => {
    if (!editor) return
    const url = window.prompt('Enter Image URL (e.g. Cloudinary, Web link):')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  // Insert image via direct file upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return
    setIsUploadingImage(true)
    setUploadStatus('Uploading image to Cloudinary...')
    try {
      const cdnUrl = await uploadImage(file)
      editor.chain().focus().setImage({ src: cdnUrl }).run()
    } catch (err) {
      alert('Image upload failed: ' + err.message)
    } finally {
      setIsUploadingImage(false)
      setUploadStatus('')
      if (imageFileInputRef.current) imageFileInputRef.current.value = ''
    }
  }

  // Insert video via direct file upload
  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return
    setIsUploadingVideo(true)
    setUploadStatus('Uploading video file to Cloudinary (this may take a few moments)...')
    try {
      const cdnUrl = await uploadMedia(file)
      if (editor.commands.setVideo) {
        editor.chain().focus().setVideo({ src: cdnUrl }).run()
      } else {
        editor.chain().focus().insertContent(`<video src="${cdnUrl}" controls style="max-width:100%; border-radius:8px; margin:20px auto; display:block;" playsinline></video><p></p>`).run()
      }
    } catch (err) {
      alert('Video upload failed: ' + err.message)
    } finally {
      setIsUploadingVideo(false)
      setUploadStatus('')
      if (videoFileInputRef.current) videoFileInputRef.current.value = ''
    }
  }

  // Insert Video by URL (MP4 or YouTube)
  const addVideoByUrl = useCallback(() => {
    if (!editor) return
    const url = window.prompt('Enter Video URL (MP4 direct link or YouTube URL):')
    if (!url) return

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 360
      })
    } else {
      if (editor.commands.setVideo) {
        editor.chain().focus().setVideo({ src: url }).run()
      } else {
        editor.chain().focus().insertContent(`<video src="${url}" controls style="max-width:100%; border-radius:8px; margin:20px auto; display:block;" playsinline></video><p></p>`).run()
      }
    }
  }, [editor])

  if (!editor) {
    return <div className="tiptap-loading">Loading rich text editor...</div>
  }

  return (
    <div className="tiptap-container">
      {/* Top Toolbar */}
      <div className="tiptap-toolbar" role="toolbar" aria-label="Editor toolbar">
        {/* Headings */}
        <div className="tiptap-toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`tiptap-btn ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
            title="Heading 1"
          >
            <Heading1 size={17} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`tiptap-btn ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
            title="Heading 2"
          >
            <Heading2 size={17} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`tiptap-btn ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
            title="Heading 3"
          >
            <Heading3 size={17} />
          </button>
        </div>

        <div className="tiptap-divider" />

        {/* Text Formats */}
        <div className="tiptap-toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`tiptap-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
            title="Bold (Ctrl+B)"
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`tiptap-btn ${editor.isActive('italic') ? 'is-active' : ''}`}
            title="Italic (Ctrl+I)"
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`tiptap-btn ${editor.isActive('strike') ? 'is-active' : ''}`}
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`tiptap-btn ${editor.isActive('code') ? 'is-active' : ''}`}
            title="Inline Code"
          >
            <Code size={16} />
          </button>
        </div>

        <div className="tiptap-divider" />

        {/* Alignment */}
        <div className="tiptap-toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`tiptap-btn ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
            title="Align Left"
          >
            <AlignLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`tiptap-btn ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
            title="Align Center"
          >
            <AlignCenter size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`tiptap-btn ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
            title="Align Right"
          >
            <AlignRight size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`tiptap-btn ${editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}`}
            title="Justify"
          >
            <AlignJustify size={16} />
          </button>
        </div>

        <div className="tiptap-divider" />

        {/* Lists & Quotes */}
        <div className="tiptap-toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`tiptap-btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}
            title="Bullet List"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`tiptap-btn ${editor.isActive('orderedList') ? 'is-active' : ''}`}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`tiptap-btn ${editor.isActive('blockquote') ? 'is-active' : ''}`}
            title="Blockquote"
          >
            <Quote size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="tiptap-btn"
            title="Horizontal Divider"
          >
            <Minus size={16} />
          </button>
        </div>

        <div className="tiptap-divider" />

        {/* Media & Uploads */}
        <div className="tiptap-toolbar-group">
          {/* Link */}
          <button
            type="button"
            onClick={setLink}
            className={`tiptap-btn ${editor.isActive('link') ? 'is-active' : ''}`}
            title="Insert Link"
          >
            <LinkIcon size={16} />
          </button>

          {/* 1. Direct Image File Upload Button */}
          <button
            type="button"
            onClick={() => imageFileInputRef.current?.click()}
            disabled={isUploadingImage || isUploadingVideo}
            className="tiptap-btn tiptap-btn-accent"
            title="Upload Photo File to Cloudinary"
          >
            {isUploadingImage ? <Loader2 size={15} className="tiptap-spin" /> : <Upload size={15} />}
            <span className="tiptap-btn-label">{isUploadingImage ? 'Uploading...' : 'Upload Image'}</span>
          </button>
          <input
            ref={imageFileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />

          {/* 2. Direct Video File Upload Button */}
          <button
            type="button"
            onClick={() => videoFileInputRef.current?.click()}
            disabled={isUploadingImage || isUploadingVideo}
            className="tiptap-btn tiptap-btn-video-accent"
            title="Upload Video File (MP4/WebM) to Cloudinary"
          >
            {isUploadingVideo ? <Loader2 size={15} className="tiptap-spin" /> : <Film size={15} />}
            <span className="tiptap-btn-label">{isUploadingVideo ? 'Uploading...' : 'Upload Video'}</span>
          </button>
          <input
            ref={videoFileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg,video/quicktime,video/*"
            style={{ display: 'none' }}
            onChange={handleVideoUpload}
          />

          {/* Image by URL */}
          <button
            type="button"
            onClick={addImageUrl}
            className="tiptap-btn"
            title="Insert Image by URL"
          >
            <ImageIcon size={16} />
          </button>

          {/* Video by URL / YouTube */}
          <button
            type="button"
            onClick={addVideoByUrl}
            className="tiptap-btn"
            title="Insert Video by URL / YouTube"
          >
            <VideoIcon size={16} />
          </button>
        </div>

        <div className="tiptap-divider" />

        {/* Undo / Redo */}
        <div className="tiptap-toolbar-group" style={{ marginLeft: 'auto' }}>
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="tiptap-btn"
            title="Undo"
          >
            <Undo size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="tiptap-btn"
            title="Redo"
          >
            <Redo size={16} />
          </button>
        </div>
      </div>

      {/* Upload Status Banner */}
      {uploadStatus && (
        <div className="tiptap-upload-banner">
          <Loader2 size={14} className="tiptap-spin" />
          <span>{uploadStatus}</span>
        </div>
      )}

      {/* Editor Content Area */}
      <div className="tiptap-content-wrap">
        <EditorContent editor={editor} />
      </div>

      {/* Footer */}
      <div className="tiptap-footer">
        <span>Rich Text & Media Editor (Tiptap) · Supports direct Image & Video uploads</span>
      </div>
    </div>
  )
}
