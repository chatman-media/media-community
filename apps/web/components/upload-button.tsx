'use client'

import { Upload } from 'lucide-react'
import * as React from 'react'
import { Button } from './ui/button'
import { uploadFile } from '@/lib/upload'

interface UploadButtonProps {
  onUploadComplete?: (url: string) => void
  accept?: string
  maxSize?: number // in MB
}

export function UploadButton({ onUploadComplete, accept, maxSize = 10 }: UploadButtonProps) {
  const [uploading, setUploading] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size
    const fileSizeMB = file.size / 1024 / 1024
    if (fileSizeMB > maxSize) {
      alert(`Файл слишком большой. Максимальный размер: ${maxSize}MB`)
      return
    }

    try {
      setUploading(true)
      const result = await uploadFile(file)
      onUploadComplete?.(result.url)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Ошибка загрузки файла')
    } finally {
      setUploading(false)
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button onClick={handleClick} disabled={uploading} variant="outline" className="gap-2">
        <Upload className="size-4" />
        {uploading ? 'Загрузка...' : 'Загрузить файл'}
      </Button>
    </>
  )
}
