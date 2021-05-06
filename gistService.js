export const getPosts = async (url, isLoadingCallback) => {
  isLoadingCallback(true);

  try {
    const res = await fetch(url);
    const data = await res.json();
    Object.keys(data.files).map(item => console.log(item))
    
    const files = Object.keys(data.files).map(fileName => {
      const {authorName, description, tags, authorImage, preview, title, content, date, imageUrl} = formatContent(data.files[fileName].content)
      return {
        filename: `${fileName}`,
        content,
        title,
        href: "#",
        tags: tags.map(tag => {return {name: tag, href: tag}}),
        description,
        imageUrl,
        datetime: date,
        date,
        readingTime: `${Math.max(1, Math.round(content.length / 200))} min` ,
        author: {
          name: authorName,
          href: '#',
          imageUrl: authorImage // add null option here
        },

      }
    })

    files.sort((a,b) => { return new Date(b.date) - new Date(a.date) })
    return  {posts: files}
  } catch (error) {
    console.log(error)
    return {error};
  } finally {
    isLoadingCallback(false)
  }

};

const formatContent = (content) => {
  let res = {
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
  console.log('res:', res)

  return res;
}
