import React,{ useState } from 'react'
const Blog = ({ blog,handleUpdateBlog,handleRemoveBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [viewOrHide,setViewOrHide] =useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    viewOrHide==='view'?setViewOrHide('hide'):setViewOrHide('view')
  }

  return (
    <div style={blogStyle} className="blogContainter">
      <div className="blogTitle">
        {blog.title}, {blog.author}
        <button onClick={toggleVisibility}>{viewOrHide}</button>
      </div>
      <div style={showWhenVisible} className="blogDetail">
        <div className="blogUrl">{blog.url}</div>
        <div className="blogLikes">likes : {blog.likes}
          <button
            className='likeButton'
            onClick={() => {
              const likedBlog = {
                user:blog.user.id,
                likes:blog.likes+1,
                author:blog.author,
                title:blog.title,
                url:blog.url
              }
              handleUpdateBlog(blog.id,likedBlog)
            }}>like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={() =>
          window.confirm('Really wanna delete ') && handleRemoveBlog(blog.id)
        }>Delete</button>
      </div>
    </div>
  )
}

export default Blog