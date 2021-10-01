
import React, { useState, useEffect } from 'react'
import { Blurhash } from "react-blurhash"
import Image from 'next/image'
import hashes from '../blur-hashes'

export default function LoaderImage({imageUrl}){
  const [loaded, setLoaded] = useState(false);

  return (
    <>
    <Blurhash
      className='h-48 w-full object-cover'
      style={{display:loaded?'none':''}}
      hash={hashes[Math.floor(Math.random() * 29)]}
      width={500}
      height={205}
      resolutionX={32}
      resolutionY={32}
      punch={1}
    />
    <Image 
      className={`h-48 w-full object-cover`}
      style={{display: !loaded?'block':'hidden'}}
      src={imageUrl} 
      layout="responsive"
      width={500}
      height={loaded ? 250 : 0}
      priority={true}
      onLoadingComplete={() => setLoaded(true)}
    />
  </>)
}
