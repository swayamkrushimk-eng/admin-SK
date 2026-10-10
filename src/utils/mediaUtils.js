/**
 * mediaUtils.js - Swayamkrushi Universal Media & Video Normalization Helper for Admin CMS
 */

/**
 * Extracts / generates an automatic clean JPG thumbnail URL from a Cloudinary video URL.
 * Handles MP4, WebM, MOV, and preserves version/public IDs without transformation stacking.
 *
 * @param {string} videoUrl - Raw video URL
 * @returns {string|null} - JPG thumbnail URL or null
 */
export function getVideoThumbnailUrl(videoUrl) {
  if (!videoUrl || typeof videoUrl !== 'string') return null
  const trimmed = videoUrl.trim()
  if (!trimmed) return null

  try {
    if (trimmed.includes('cloudinary.com') && trimmed.includes('/video/upload/')) {
      const urlObj = new URL(trimmed)
      const pathname = urlObj.pathname
      const prefixMatch = pathname.match(/^(\/[^/]+\/video\/upload\/)/)
      if (prefixMatch) {
        const prefix = prefixMatch[1]
        const remainder = pathname.substring(prefix.length)
        let cleanPath = remainder
        const versionMatch = cleanPath.match(/(v\d+\/.+)$/)
        if (versionMatch) {
          cleanPath = versionMatch[1]
        } else {
          cleanPath = cleanPath.replace(/^([a-z0-9_,:]+\/)+/i, '')
        }
        cleanPath = cleanPath.replace(/\.(mp4|webm|mov|m4v|mkv|avi|ogg|3gp|flv|ts)$/i, '.jpg')
        if (!cleanPath.endsWith('.jpg')) {
          cleanPath += '.jpg'
        }

        urlObj.pathname = prefix + cleanPath
        urlObj.protocol = 'https:'
        return urlObj.toString()
      }
    }
  } catch {
    if (trimmed.includes('cloudinary.com') && trimmed.includes('/video/upload/')) {
      const base = trimmed.split('?')[0]
      return base.replace(/\.(mp4|webm|mov|m4v|mkv|avi|ogg|3gp|flv|ts)$/i, '.jpg')
    }
  }

  return null
}

/**
 * Returns a safe, browser-compatible HTML5 MP4 delivery URL using f_mp4,q_auto,vc_h264.
 * Safely strips any previously stacked or invalid transformations (such as f_auto,q_auto,vc_h264).
 * Preserves cloud name, version, folder, and public ID without stacking transformations.
 *
 * @param {string} videoUrl - Raw video URL
 * @returns {string} - Playable MP4 delivery URL
 */
export function getPlayableVideoUrl(videoUrl) {
  if (!videoUrl || typeof videoUrl !== 'string') return ''
  let trimmed = videoUrl.trim()
  if (!trimmed) return ''

  if (trimmed.startsWith('http://res.cloudinary.com/')) {
    trimmed = trimmed.replace('http://', 'https://')
  }

  if (trimmed.includes('cloudinary.com') && trimmed.includes('/video/upload/')) {
    try {
      const urlObj = new URL(trimmed)
      const pathname = urlObj.pathname
      const prefixMatch = pathname.match(/^(\/[^/]+\/video\/upload\/)/)
      if (prefixMatch) {
        const prefix = prefixMatch[1]
        const remainder = pathname.substring(prefix.length)
        let cleanPath = remainder
        const versionMatch = cleanPath.match(/(v\d+\/.+)$/)
        if (versionMatch) {
          cleanPath = versionMatch[1]
        } else {
          cleanPath = cleanPath.replace(/^([a-z0-9_,:]+\/)+/i, '')
        }
        cleanPath = cleanPath.replace(/\.(mp4|webm|mov|m4v|mkv|avi|ogg|3gp|flv|ts)$/i, '.mp4')
        if (!cleanPath.endsWith('.mp4')) {
          cleanPath += '.mp4'
        }

        urlObj.pathname = `${prefix}f_mp4,q_auto,vc_h264/${cleanPath}`
        urlObj.protocol = 'https:'
        return urlObj.toString()
      }
    } catch {
      return trimmed
    }
  }

  return trimmed
}

export const getDeliveryVideoUrl = getPlayableVideoUrl
export const getOptimizedVideoUrl = getPlayableVideoUrl

/**
 * Universal resolver for article media type, thumbnail, poster, and video delivery URLs.
 */
export function resolveArticleMedia(article, fallbackImage = null) {
  if (!article) {
    return {
      featuredMediaType: 'text',
      isVideo: false,
      isImage: false,
      isText: true,
      videoUrl: '',
      deliveryVideoUrl: '',
      playableVideoUrl: '',
      videoPosterUrl: null,
      videoThumbnailUrl: null,
      posterUrl: fallbackImage,
      imageUrl: '',
      hasThumbnail: false
    }
  }

  let type = article.featuredMediaType || article.mediaType

  const rawVideoUrl =
    article.videoUrl ||
    (typeof article.featuredMediaUrl === 'string' && article.featuredMediaUrl.match(/\.(mp4|webm|mov|m4v)$/i) ? article.featuredMediaUrl : '') ||
    (typeof article.mediaUrl === 'string' && article.mediaUrl.match(/\.(mp4|webm|mov|m4v)$/i) ? article.mediaUrl : '')

  const hasValidVideo = typeof rawVideoUrl === 'string' && rawVideoUrl.trim().length > 5

  if (!type) {
    if (hasValidVideo) {
      type = 'video'
    } else if (article.hasThumbnail === false || article.showThumbnail === false) {
      type = 'text'
    } else {
      type = 'image'
    }
  }

  if (type === 'text' || article.hasThumbnail === false || article.showThumbnail === false) {
    return {
      featuredMediaType: 'text',
      isVideo: false,
      isImage: false,
      isText: true,
      videoUrl: '',
      deliveryVideoUrl: '',
      playableVideoUrl: '',
      videoPosterUrl: null,
      videoThumbnailUrl: null,
      posterUrl: null,
      imageUrl: '',
      hasThumbnail: false
    }
  }

  if (type === 'video' && hasValidVideo) {
    const customPoster =
      article.videoPosterUrl && typeof article.videoPosterUrl === 'string' && article.videoPosterUrl.trim().length > 5
        ? article.videoPosterUrl.trim()
        : null

    const generatedThumb = getVideoThumbnailUrl(rawVideoUrl)
    const storedThumb =
      article.videoThumbnailUrl && typeof article.videoThumbnailUrl === 'string' && article.videoThumbnailUrl.trim().length > 5
        ? article.videoThumbnailUrl.trim()
        : null

    const fallbackArticleImg =
      article.imageUrl && typeof article.imageUrl === 'string' && article.imageUrl.trim().length > 5
        ? article.imageUrl.trim()
        : null

    const resolvedPoster = customPoster || storedThumb || generatedThumb || fallbackArticleImg || fallbackImage
    const playableUrl = getPlayableVideoUrl(rawVideoUrl)

    return {
      featuredMediaType: 'video',
      isVideo: true,
      isImage: false,
      isText: false,
      videoUrl: rawVideoUrl.trim(),
      deliveryVideoUrl: playableUrl,
      playableVideoUrl: playableUrl,
      videoPosterUrl: customPoster,
      videoThumbnailUrl: storedThumb || generatedThumb,
      posterUrl: resolvedPoster,
      imageUrl: fallbackArticleImg || resolvedPoster,
      hasThumbnail: true
    }
  }

  const rawImageUrl =
    article.imageUrl ||
    (typeof article.featuredMediaUrl === 'string' && !article.featuredMediaUrl.match(/\.(mp4|webm|mov|m4v)$/i) ? article.featuredMediaUrl : '') ||
    (typeof article.mediaUrl === 'string' && !article.mediaUrl.match(/\.(mp4|webm|mov|m4v)$/i) ? article.mediaUrl : '') ||
    fallbackImage

  return {
    featuredMediaType: 'image',
    isVideo: false,
    isImage: Boolean(rawImageUrl),
    isText: !rawImageUrl,
    videoUrl: '',
    deliveryVideoUrl: '',
    playableVideoUrl: '',
    videoPosterUrl: null,
    videoThumbnailUrl: null,
    posterUrl: rawImageUrl || fallbackImage,
    imageUrl: rawImageUrl || '',
    hasThumbnail: Boolean(rawImageUrl)
  }
}

/**
 * Checks if two image URLs point to the same file (supports Cloudinary public IDs and standard URLs)
 */
export function isSameImage(url1, url2) {
  if (!url1 || !url2) return false
  const u1 = url1.trim().toLowerCase()
  const u2 = url2.trim().toLowerCase()
  if (u1 === u2) return true
  const matchA = u1.match(/\/v\d+\/([^.?#]+)/)
  const matchB = u2.match(/\/v\d+\/([^.?#]+)/)
  if (matchA && matchB && matchA[1] === matchB[1]) return true
  return false
}
