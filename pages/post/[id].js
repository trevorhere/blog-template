import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import {getPost} from '../../gistService'
import ReactMarkdown from 'react-markdown'

export default function Post() {
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState(null);
  const url = `https://api.github.com/gists/68cc754fb298f3121b5b2b4cfaa754d4`
  const [loading, setIsLoading] = useState(false);

  useEffect(async () => {
    await getPost(url, setIsLoading, id)
    .then(response => {
      setPost(response.post)
      console.log('posts: ', response)
    });
  }, [id])

  
  if(post){
   return ( 
     <div
      className="lg:w-1/2 md:w-3/4 sm:w-full"
     >
      <p>
        {post.tags.map((tag,i) => {
          return <>{`${tag.name} ${i !== post.tags.length - 1 ? ', ' : ''}`}</>
        })}
      </p>
    <div className="relative py-16 bg-white overflow-hidden">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {post.title} 
            </span>
          </h1>
        </div>
        <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
        <div className="flex h-64 w-128">
          <img
            className=" mx-auto rounded-lg " 
            src={post.imageUrl}
            alt=""
            layout="cover"
          />

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