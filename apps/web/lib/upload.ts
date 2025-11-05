/**
 * Upload file to Vercel Blob storage
 * @param file - File object from input
 * @returns Object with url, pathname, and downloadUrl
 */
export async function uploadFile(file: File) {
  const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
    method: 'POST',
    body: file,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Upload failed')
  }

  return response.json()
}

/**
 * Upload multiple files to Vercel Blob storage
 * @param files - Array of File objects
 * @returns Array of upload results
 */
export async function uploadFiles(files: File[]) {
  const uploads = files.map(file => uploadFile(file))
  return Promise.all(uploads)
}

/**
 * Get optimized image URL from Vercel Blob
 * @param url - Original blob URL
 * @param options - Image optimization options
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  url: string,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: 'auto' | 'webp' | 'avif'
  }
) {
  const params = new URLSearchParams()

  if (options?.width) params.set('w', options.width.toString())
  if (options?.height) params.set('h', options.height.toString())
  if (options?.quality) params.set('q', options.quality.toString())
  if (options?.format) params.set('f', options.format)

  const queryString = params.toString()
  return queryString ? `${url}?${queryString}` : url
}
