export const getPosts = async (url, isLoadingCallback) => {
  isLoadingCallback(true);

  try {
    const res = await fetch(url);
    const data = await res.json();
    Object.keys(data.files).map(item => console.log(item))
    
    const files = Object.keys(data.files).map(fileName => {
      const {title, content, date, imageUrl} = formatContent(data.files[fileName].content)
      return {
        filename: `${fileName}`,
        content,
        title,
        href: "#",
        category: { name: 'Case Study', href: '#' },
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
        imageUrl,
        datetime: '2020-02-12',
        date,
        readingTime: '11 min',
        author: {
          name: 'Daniela Metz',
          href: '#',
          imageUrl:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },

      }
    })

    console.log('files in gist: ', files) 
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
  let title = content.split('---')[1].split('\n')[2].split(':')[1] + `\n\n\n\n`;
  return {
    title,
    content: content.split('---')[2],
    date: content.split('---')[1].split('\n')[3].split(':')[1],
    mdImage: `![](https:${content.split('---')[1].split('\n')[4].split(':')[2]})`,
    imageUrl: `https:${content.split('---')[1].split('\n')[4].split(':')[2]}`
  }
}

const handleFetchResponse = (data, targetFile) => {
  if (data) {
    const { title, date, content, image } = formatContent( data.files[`${targetFile}.md`].content )

    return {
      filename: targetFile,
      title,
      date,
      content,
      image
    };
  }
}

const translateTitleDate = (fileName) => {
  let arr = fileName.split("__");
  let title = arr[0].split("_").join(" ");
  let date = arr[1]
    .substr(0, arr[1].length - 3)
    .split("_")
    .join("/");

  return { title: title, date: date };
}