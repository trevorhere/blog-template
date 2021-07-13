import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import {getPost} from '../../gistService'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import siteData from '../../site-data' 
import {FaPencilAlt} from 'react-icons/fa'

export default function Post() {
  const router = useRouter()
  const {GITHUB_USERNAME} =  siteData
  const {id} = router.query
  const [post, setPost] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const url = `https://api.github.com/gists`

  useEffect(async () => {
    await getPost(url, id, setIsLoading)
    .then(response => {
      setPost(response.post)
    });
  }, [id])

  
  if(post){
   return ( 
     <>
    <button 
      type="button" 
      class="absolute top-5 right-10 items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={() => router.push('/')}
     >
       Home 
    </button>
    {/* <div>
      <a className="absolute top-5 right-10 mt-2 text-blue-600 hover:underline" href="/">Home</a>
    </div> */}
    <div className="lg:w-1/2 md:w-3/4 sm:w-full mx-auto flex-initial">
    <div className="relative py-16 bg-white overflow-hidden">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg mx-auto flex flex-row justify-between">
          <div>
            <h1>
              <span className="mt-2 block text-3xl  leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {post.title} 
              </span>
            </h1>
            <p>
              {post.tags.map((tag,i) => {
                return <>{` ${tag.trim()} ${i !== post.tags.length - 1 ? ', ' : ''}`}</>
              })}
            </p>
          </div>
          <div>
            <button 
              type="button"
              class="absolute top-5 right-10 items-center px-2.5 py-1.5 border-2 border-black text-xs font-medium rounded  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => router.push(`https://gist.github.com/${GITHUB_USERNAME}/${id}`)}
            >   <FaPencilAlt className="mx-2 mr-2 h-5 w-5" aria-hidden="true" /></button>
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <a href={post.author.href}>
              <span className="sr-only">{post.author.name}</span>
              <img className="h-10 w-10 rounded-full" src={post.author.imageUrl} alt="" />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <a href={post.author.href} className="hover:underline">
                {post.author.name}
              </a>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={post.datetime}>{post.date}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTime} read</span>
            </div>
          </div>
        </div>

          <div className="flex my-8 ">
            <img
              className=" mx-auto rounded-lg " 
              src={post.imageUrl}
              alt=""
              layout="cover"
            />
          </div> 
            <ReactMarkdown  className="markdown" remarkPlugins={[gfm]} children={post.content} />
      </div>
    </div>
    </div>

     </>
   )
  } else {
  return (
    <div>
       loading 
    </div>
  )}
}