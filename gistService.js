

export const postStoreService = () => {
  let store = [];

  const getStore = () => {
    return store;
  }

  const setStore = (store) => {
    store = [...store];
    return store;
  }

}


const getGistList = async(url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    let fileKey = Object.keys(data.files)[0];
    let list = JSON.parse(data.files[fileKey].content);
    return list;

  } catch (error) {
    console.log(error)
    return {error};
  } 
}

export const getPosts = async (base_url, gist_list_id, isLoadingCallback) => {
  isLoadingCallback(true);
  let files = [];

  try {
    
    let list = await getGistList(`${base_url}/${gist_list_id}`);
    files = [...await Promise.all(
      list.map(async item => {
        let file_res = await fetch(`${base_url}/${item.gist_id}`);
        let file_data = await file_res.json();
        return {file_data, gist_id: item.gist_id};
      })
      ).then(res => { 
        return res.map(data => {

          let fileKey = Object.keys(data.file_data.files)[0];
          let file_content = data.file_data.files[fileKey].content;
        
         const {
          authorName, 
          description, 
          tags, 
          authorImage, 
          preview, 
          title, 
          content, 
          date, 
          imageUrl,
          mdImage
        } = formatContent(file_content) 
        
        return {
          id: data.gist_id,
          content,
          title,
          href: "#",
          tags: tags.map(tag => tag.trim()),
          description,
          imageUrl,
          mdImage,
          datetime: date,
          date,
          readingTime: `${Math.max(1, Math.round(content.length / 200))} min` ,
          author: {
            name: authorName,
            href: '#',
            imageUrl: authorImage // add null option here
          },
        }


      });
    })]

    files.sort((a,b) => { return new Date(b.date) - new Date(a.date) })
    return  {posts: files}
  } catch (error) {
    console.log(error)
    return {error};
  } finally {
    isLoadingCallback(false)
  }

};

export const getPost = async (base_url, gist_id, isLoadingCallback) => {
  try {
    // store in context, if not present, pull
    let res = await fetch(`${base_url}/${gist_id}`)
    let data = await res.json()

    let fileKey = Object.keys(data.files)[0];
    let file_content = data.files[fileKey].content;
    
    const {
      authorName, 
      description, 
      tags, 
      authorImage, 
      preview, 
      title, 
      content, 
      date, 
      imageUrl, 
      mdImage
    } = formatContent(file_content) 
    
    let post =  {
      id: data.gist_id,
      content,
      title,
      href: "#",
      tags: tags.map(tag => tag.trim()),
      description,
      imageUrl,
      mdImage,
      datetime: date,
      date,
      readingTime: `${Math.max(1, Math.round(content.length / 200))} min` ,
      author: {
        name: authorName,
        href: '#',
        imageUrl: authorImage // add null option here
      },
    }


    return { post }
  } catch (error) {
    console.log('error in get post', error)
    return {error}
  } finally {
    isLoadingCallback(false);
  }
}

const formatContent = (content) => {
  return  {
    authorName: content.split('---')[1].split('\n')[1].split(':')[1],
    title: content.split('---')[1].split('\n')[2].split(':')[1] + `\n\n\n\n`,
    date: content.split('---')[1].split('\n')[3].split(':')[1],
    mdImage: `![](https:${content.split('---')[1].split('\n')[4].split(':')[2]})`,
    imageUrl: `https:${content.split('---')[1].split('\n')[4].split(':')[2]}`,
    authorImage: content.split('---')[1].split('\n')[5].split(':')[2],
    tags: content.split('---')[1].split('\n')[6].split(':')[1].split(','),
    description: content.split('---')[1].split('\n')[7].split(':')[2],
    content: content.split('---')[2],
  }
}
