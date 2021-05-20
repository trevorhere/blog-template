import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import {getPost} from '../../gistService'
import ReactMarkdown from 'react-markdown'

export default function Post() {
  const router = useRouter()
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
     <div
      className="lg:w-1/2 md:w-3/4 sm:w-full mx-auto flex-initial"
     >
    <div className="relative py-16 bg-white overflow-hidden">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="mt-2 block text-3xl  leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {post.title} 
            </span>
          </h1>
          <p>
            {post.tags.map((tag,i) => {
              return <>{`${tag.name.trim()} ${i !== post.tags.length - 1 ? ', ' : ''}`}</>
            })}
          </p>
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

        <div className="my-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
        <div className="flex my-8 ">
          <img
            className=" mx-auto rounded-lg " 
            src={post.imageUrl}
            alt=""
            layout="cover"
          />
        </div> 
        <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </div>
    </div>
   )
  } else {
  return (
    <div>
      Post {id}
    </div>
  )}
}