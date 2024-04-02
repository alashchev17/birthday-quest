import { FC, useState, useEffect } from 'react'
import { Image as AntImage, Skeleton } from 'antd'
import { DEVICE_WIDTH } from '@/constants/DEVICE_WIDTH'

interface ImageComponentProps {
  imageSrcToImport: string
}

export const ImageComponent: FC<ImageComponentProps> = ({ imageSrcToImport }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  useEffect(() => {
    const image = new Image()
    image.src = imageSrcToImport
    image.onload = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setImageSrc(image.src)
      setIsLoading(false)
    }
    image.onerror = (error) => {
      setIsLoading(false)
      alert(JSON.stringify(error))
    }
  }, [imageSrcToImport])

  if (isLoading) {
    return <Skeleton.Image active style={{ width: DEVICE_WIDTH > 768 ? 500 : '85vw', height: DEVICE_WIDTH > 768 ? 500 : '85vw' }} />
  }

  return imageSrc ? <AntImage src={imageSrc} width={DEVICE_WIDTH > 768 ? 500 : '85vw'} /> : null
}
