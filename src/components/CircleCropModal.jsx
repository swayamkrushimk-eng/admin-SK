import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import {
  X,
  Check,
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Crop as CropIcon,
  Move
} from 'lucide-react'
import { getCroppedImg } from '../utils/cropImage'

export default function CircleCropModal({
  isOpen,
  imageSrc,
  title = 'Crop Photo to Circle',
  subtitle = 'Drag image to pan, scroll or use slider to zoom into the exact circle area.',
  onClose,
  onSaveCroppedImage
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleReset = () => {
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setRotation(0)
  }

  const handleApplyCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return
    setIsProcessing(true)
    try {
      const croppedResult = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
        true // isCircular = true
      )
      await onSaveCroppedImage(croppedResult)
      onClose()
    } catch (err) {
      console.error('Failed to crop image:', err)
      alert('Failed to crop image. ' + (err.message || ''))
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isOpen || !imageSrc) return null

  return (
    <div className="admin-modal-overlay" style={{ zIndex: 10000 }}>
      <div
        className="admin-modal"
        style={{
          maxWidth: '680px',
          width: '94%',
          background: '#ffffff',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '92vh'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 22px',
            background: 'linear-gradient(135deg, #2d161e 0%, #4a1525 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CropIcon size={20} color="#e5a93c" />
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#fff' }}>
                {title}
              </h3>
            </div>
            <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#f3e1cb' }}>
              {subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Cropper Viewport Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '380px',
            background: '#111115',
            overflow: 'hidden'
          }}
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            cropShape="round"
            showGrid={true}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                background: '#111115'
              },
              cropAreaStyle: {
                border: '3px solid #e5a93c',
                boxShadow: '0 0 0 9999em rgba(0, 0, 0, 0.65)'
              }
            }}
          />

          {/* Helper hint */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(0,0,0,0.75)',
              color: '#fff',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              pointerEvents: 'none',
              backdropFilter: 'blur(4px)'
            }}
          >
            <Move size={13} color="#e5a93c" />
            <span>Drag photo to position · Scroll to zoom</span>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div
          style={{
            padding: '16px 22px',
            background: '#faf8f5',
            borderTop: '1px solid #eee'
          }}
        >
          {/* Zoom Slider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#444',
                width: '65px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <ZoomIn size={14} color="#6e1e38" /> Zoom
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(1, Number((z - 0.1).toFixed(2))))}
              style={{
                background: '#eee',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer'
              }}
            >
              <ZoomOut size={14} />
            </button>
            <input
              type="range"
              min={1}
              max={3}
              step={0.02}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              style={{
                flex: 1,
                accentColor: '#6e1e38',
                cursor: 'pointer'
              }}
            />
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(3, Number((z + 0.1).toFixed(2))))}
              style={{
                background: '#eee',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer'
              }}
            >
              <ZoomIn size={14} />
            </button>
            <span
              style={{
                fontSize: '11.5px',
                fontWeight: 700,
                color: '#6e1e38',
                width: '45px',
                textAlign: 'right'
              }}
            >
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Rotation & Reset Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#444',
                  width: '65px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <RotateCw size={14} color="#6e1e38" /> Rotate
              </span>
              <button
                type="button"
                onClick={() => setRotation((r) => (r - 90 < -180 ? 180 : r - 90))}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '4px 10px', fontSize: '11.5px', gap: '4px' }}
                title="Rotate 90° Left"
              >
                <RotateCcw size={13} /> -90°
              </button>
              <button
                type="button"
                onClick={() => setRotation((r) => (r + 90 > 180 ? -180 : r + 90))}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '4px 10px', fontSize: '11.5px', gap: '4px' }}
                title="Rotate 90° Right"
              >
                <RotateCw size={13} /> +90°
              </button>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="admin-btn admin-btn-secondary"
              style={{ padding: '4px 10px', fontSize: '11.5px', gap: '4px', color: '#666' }}
            >
              <RefreshCw size={12} /> Reset
            </button>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div
          style={{
            padding: '14px 22px',
            background: '#ffffff',
            borderTop: '1px solid #e8e3d9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px'
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="admin-btn admin-btn-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApplyCrop}
            disabled={isProcessing}
            className="admin-btn admin-btn-primary"
            style={{
              padding: '9px 18px',
              fontSize: '13.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {isProcessing ? (
              <>
                <RefreshCw size={15} className="spin" />
                <span>Applying Circular Crop...</span>
              </>
            ) : (
              <>
                <Check size={16} />
                <span>Apply & Save Circular Crop</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
