import React, { useState } from 'react'

const NewBlogForm = ({ handleNewBlog }) => {

  const [title, setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleNewBlog({ 'title':title,'author':author,'url':url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }


  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
            author:
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
            url:
          <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}


export default NewBlogForm