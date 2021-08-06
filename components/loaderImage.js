
import React, { useState, useEffect } from 'react';
import { Blurhash } from "react-blurhash";
import Image from 'next/image'

export const getStaticProps = async (test) => {  
  console.log('props', props)
  // const {css,img} = await getPlaiceholder("/path-to-your-image.jpg");
  return {
    props: {
      test
      // css,
   },
  };};

  export default function LoaderImage({imageUrl, blurhash}){
    console.log('test: ', test);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
    <Blurhash
      className='h-48 w-full object-cover'
      hash={blurhash}
      width={500}
      height={250}
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
