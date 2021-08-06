import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import * as gistService  from '../gistService'
import {useRouter} from 'next/router'
import siteData from '../site-data'
import Loader from '../components/loader'
import { getPlaiceholder } from "plaiceholder";
import LoaderImage from '../components/loaderImage'
const url = `https://api.github.com/gists`
const {GIST_LIST_ID, GITHUB_USERNAME} =  siteData

export const getStaticProps = async () => {
  const res = await fetch(`${url}/${GIST_LIST_ID}`);
  const data = await res.json()
  let gistList = gistService.formatGistListResponse(data);
 let files = [...await Promise.all(
    gistList?.map(async item => {
      let file_res = await fetch(`${url}/${item.gist_id}`);
      let file_data = await file_res.json();
      return {file_data, gist_id: item.gist_id};
    })

  )]
 

  const raw_posts = gistService.formatPostData(files)
  let posts = [...await Promise.all(
    raw_posts?.map(async post => {
      let blur = await getPlaiceholder(post.imageUrl);
      return {...post, blurhash: blur.base64};
    })
  )] 


  return {
      props: {
        init_posts: posts.map(post => { return {...post, active:true}})
      }
    }
}

export default function Home({init_posts}) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(init_posts);
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    if(!selectedTags.length) {
      setPosts(posts.map(p => { 
        p.active = true;
        return p;
      }));
      return;
    } 

    let updatedPosts = 
    posts.map(p => { 
        p.active = false;
        return p;
    })
    .map(p => {
      let tagFound = false;
      selectedTags.map(st => {
         if(p.tags.find(tag => tag === st)) tagFound = true;
      });

      if(tagFound) p.active = true;
      return p;
    });

    setPosts(updatedPosts)
  }, [selectedTags])

  const removeTag = (tag) => {
     setSelectedTags(selectedTags.filter(ft => ft !== tag))
  }

  const selectNewTag = (tag, e) => {
    e.stopPropagation();

    if(!!selectedTags.find(st => st === tag)) return;
    setSelectedTags([...selectedTags, tag]);
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }


   return (
     <>
     { loading 
       ? <Loader/> 
       : <>
      <Head>
        <title>{siteData?.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <button 
      type="button" 
      className="z-20 mt-5 absolute top-5 right-10 items-center px-1 py-1 border-2 border-black text-xs font-medium rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500"
      onClick={() => router.push(siteData.home_site_url.link)}
     >
       {siteData.home_site_url.name} 
    </button>

    <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
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
          <div className="flex justify-center flex-wrap my-5"> 
          {selectedTags.map(tag => {
            return <div className='p-1'>
              <span className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700">
                 {tag} 
                <button
                  type="button"
                  className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                  onClick={() => removeTag(tag)}
                  tag
                >
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
          {posts.filter(post => post.active).map((post, i) => (
            <div 
              key={i}
              onClick={() => router.push(`/post/${post.id}`)} key={post.id} 
              className="flex flex-col rounded-lg shadow-lg overflow-hidden hover:shadow-xl z-0">
              <div className="flex-shrink-0">
                <Image 
                    className={`h-48 w-full object-cover`}
                    placeholder="blur" 
                    blurDataURL={post.blurhash}
                    src={post.imageUrl} 
                    layout="responsive"
                    width={500}
                    height={250}
                    priority={true}
                ></Image>
                {/* <LoaderImage imageUrl={post.imageUrl} blurhash={post.blurhash.hash}></LoaderImage> */}
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between hover:bg-blue-50">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    {post?.tags?.length && post.tags.map((tag,i) => {
                      return (
                        <span>
                          <a onClick={(e) => selectNewTag(tag, e)}  className="z-10 hover:underline">
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
    </>
   }
  </>
  )
}
