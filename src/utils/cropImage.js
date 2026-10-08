/**
 * Utility function to create a cropped image from canvas coordinates
 * Supports circular / rectangular cropping, rotation, and zoom.
 */

export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on canvas
    image.src = url
  })

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation)
  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
  }
}

/**
 * Crops and rotates an image source based on pixel coordinates.
 * If isCircular is true, it masks the canvas with a perfect circle.
 */
export async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  isCircular = true
) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const rotRad = getRadianAngle(rotation)

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  )

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  // translate canvas center to draw rotated image
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.translate(-image.width / 2, -image.height / 2)

  // draw rotated image
  ctx.drawImage(image, 0, 0)

  // croppedAreaPixels values are bounding-box relative
  // extract the cropped image onto a new clean canvas
  const croppedCanvas = document.createElement('canvas')
  const croppedCtx = croppedCanvas.getContext('2d')

  if (!croppedCtx) {
    throw new Error('No 2d context for cropped canvas')
  }

  // Set the size of the output canvas
  croppedCanvas.width = pixelCrop.width
  croppedCanvas.height = pixelCrop.height

  if (isCircular) {
    croppedCtx.beginPath()
    croppedCtx.arc(
      pixelCrop.width / 2,
      pixelCrop.height / 2,
      Math.min(pixelCrop.width, pixelCrop.height) / 2,
      0,
      2 * Math.PI
    )
    croppedCtx.closePath()
    croppedCtx.clip()
  }

  // Draw the cropped image from the rotated canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // Return both Blob (for API upload) and Data URL (for instant preview)
  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'))
          return
        }
        const previewUrl = croppedCanvas.toDataURL('image/png')
        // Give blob a filename
        const file = new File([blob], 'cropped-circle.png', { type: 'image/png' })
        resolve({ blob, file, previewUrl })
      },
      'image/png',
      1.0
    )
  })
}
