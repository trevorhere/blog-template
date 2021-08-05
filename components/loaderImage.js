
import React, { useState, useEffect } from 'react';
import { Blurhash } from "react-blurhash";
import Image from 'next/image'

export default function LoaderImage({imageUrl}){
  const [loaded, setLoaded] = useState(false);

  return (
    <>
    { !loaded
      ?<Blurhash
        className='h-48 w-full object-cover'
        hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
        width={500}
        height={250}
        resolutionX={32}
        resolutionY={32}
        punch={1}
      />
      : <Image 
        className={`h-48 w-full object-cover`}
        src={imageUrl} 
        layout="responsive"
        width={500}
        height={250}
        priority={true}
        onLoadingComplete={() => setLoaded(true)}
      />}
  </>)
}
