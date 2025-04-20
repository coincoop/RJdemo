'use client'

import { useState } from "react"
import React from 'react'
import { ArrowBigLeft, ArrowBigRight, Search } from "lucide-react"
import "@/styles/ImageSlider.css"
import SearchForm from "../ui/SearchForm"

const ImageSlider = ({ imgUrls, query }: ImageSliderProps) => {

  const [imgIndex, setImgIndex] = useState(0)

  const showNextImage = () => {
    setImgIndex(index => {
      if (index === imgUrls.length - 1) return 0
      return index + 1
    })
  }
  const showPrevImage = () => {
    setImgIndex(index => {
      if (index === 0) return imgUrls.length - 1
      return index - 1
    })
  }
  return (
    <section className="img-slider-container">
      <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden" }}>
        {imgUrls.map((url, index) => (
          <img key={index} src={url} className="img-slider-img" style={{
            translate: `${-100 * imgIndex}%`
          }} />
        ))}
      </div>
      <button
        className="img-slider-btn"
        style={{ left: 0 }}
        onClick={showPrevImage}
      >
        <ArrowBigLeft />
      </button>
      <button
        className="img-slider-btn"
        style={{ right: 0 }}
        onClick={showNextImage}

      >
        <ArrowBigRight />
      </button>
    </section>
  )
}

export default ImageSlider