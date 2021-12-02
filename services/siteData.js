// To generate SSH keys for github
// ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
// https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

/*
 Example Test Post:

 ---
 author: Trevor Lane  
 title:  My First Post
 date:   12/01/1985 
 image:  https://i.imgur.com/ZBqmTXz.png
 authorImage: https://avatars.githubusercontent.com/u/15148900
 tags: blog, writing, post 
 ---

POST LIST EXAMPLE:

[{
   "name":"first post",
   "gist_id": "5d0c8819cf46fea931bb089aa566d227"
}]

*/

const siteData =  {
  "title": "Trevors Blog",
  "description":"Fortitudine vincimus",
  "githubUsername":"trevorhere",
  "baseUrl":"https://blog.trevorlane.dev",
  "showSocialShareLinks": true,
  'gistListId':'3797a38c4fb8b5a65f24aac2631eb3ed',
  'useCTA': true,
  "home_site_url":{ 
    "link": "https://trevorlane.dev",
    "name": "trevorlane.dev"
  }
}

export default siteData