import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import {getPosts} from '../gistService'
import {useRouter} from 'next/router'
import siteData from '../site-data' 

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const {GIST_LIST_ID} =  siteData
  const url = `https://api.github.com/gists`
  const [selectedTags, selectTag] = useState([])

  useEffect(async () => {
    await getPosts(url, GIST_LIST_ID, setIsLoading)
    .then(response => {
      setPosts(response.posts)
    });
  }, [GIST_LIST_ID])

  const selectNewTag = (tag) => {
    console.log('sc', selectedTags)
    if(!!selectedTags.find(st => st === tag)) return;

    selectTag([...selectedTags, tag])
    console.log('st ', selectedTags)
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }


   return (
     <>
     { loading ? <p>loading</p> :
     <div >
      <Head>
        <title>{siteData?.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex justify-end mr-10 mt-5 text-blue-600 hover:underline'>
       <a href={siteData.home_site_url.link} >{siteData.home_site_url.name}</a>
      </div>
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
           {siteData?.title} 
         </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
           {siteData?.description} 
          </p>
        </div>
        { !!selectedTags.length &&
          <div className="flex justify-center my-5"> 
          {selectedTags.map(tag => {
            return <div className='px-1'>
              <span className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700">
                 {tag} 
                <button
                  type="button"
                  className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                  onClick={() => { 
                    console.log('st', selectedTags)
                    selectTag(selectedTags.filter(ft => ft !== tag))
                    console.log('st', selectedTags)
                    }
                  }
                >
                <span className="sr-only">Remove large option</span>
                <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                  <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                </svg>
              </button>
              </span>
            </div>
          })}
         </div> 
        }
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {posts.map((post, i) => (
            <div 
              // onClick={() => router.push(`/post/${post.id}`)} key={post.id} 
              className="flex flex-col rounded-lg shadow-lg overflow-hidden hover:shadow-xl">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={post.imageUrl} alt="" />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between hover:bg-blue-50">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    {post?.tags?.length && post.tags.map((tag,i) => {
                      return (
                        <span>
                          <a onClick={() => { 
                                selectNewTag(tag);
                                console.log('atgs: ', selectedTags); 
                              }
                            }  className="hover:underline">
                            {` ${tag}`}
                          </a>{(i !== post.tags.length - 1) && ','}
                       </span>
                      )
                    })}
                  </p>
                  <a href={post.href} className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                    <p className="mt-3 text-base text-gray-500">{post.description}</p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href={post?.author.href}>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
   }
  </>
  )
}
