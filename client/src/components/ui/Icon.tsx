import { icons, Iconkey } from '@/constants'
import Image from 'next/image'
import React from 'react'

const Icon = ({icon, width, height}:{
    icon: Iconkey,
    width?: number,
    height?: number
}) => {
  return (
    <Image
      src={icons[icon]}
      alt="Icon"
      width={width || 24}
      height={height || 24}
      className="object-contain"
    />
  )
}

export default Icon