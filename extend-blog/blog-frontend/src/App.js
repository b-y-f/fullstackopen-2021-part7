import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'


const App = () => {


  const [blogs, setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((firstItem,secondItem) => secondItem.likes - firstItem.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username,password })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const handleNewBlog =async(newBlog) => {

    try {
      const resBlog = await blogService.create(newBlog)
      setErrorMessage(`a new blog: ${newBlog.title}   by ${newBlog.author} added!!!`)
      setTimeout(() => {
        setErrorMessage(null)
      },5000)

      setBlogs(blogs.concat(resBlog.data))



    } catch (error) {
      setErrorMessage('Wrong credential')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }

  const handleUpdateBlog = async (editedBlogId,editedBlog) => {
    try {
      await blogService.update(editedBlogId,editedBlog)
      setErrorMessage('you liked!!!')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)

      setBlogs(
        blogs.map(blog =>
          blog.id === editedBlogId
            ? { ...blog, likes: editedBlog.likes }
            : blog).sort((firstItem,secondItem) => secondItem.likes - firstItem.likes)
      )

    } catch (error) {
      setErrorMessage('Wrong credential')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }

  }

  const handleRemoveBlog = async (blogId) => {

    try {
      await blogService.remove(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
    } catch (error) {
      setErrorMessage('Wrong credential')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }

  }



  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification message={errorMessage} />

        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />

      <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
      <br/>
      <div>
        <Togglable buttonLabel="create new blog">
          <NewBlogForm createBlog={handleNewBlog} />
        </Togglable>



      </div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdateBlog={handleUpdateBlog}
          handleRemoveBlog={handleRemoveBlog}
        />
      )}
    </div>
  )

}

export default App