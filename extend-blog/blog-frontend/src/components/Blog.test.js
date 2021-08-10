import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import NewBlogForm from './NewBlogForm'


import Blog from './Blog'

test('display title, author. BUT NOT url and likes!', () => {
  const blog = {
    url: 'www.www.www',
    title: 'test',
    author: 'Bill',
    likes:12,
    user: { name:'sdd' }
  }

  const component = render(
    <Blog
      blog={blog}
    />
  )

  const blogTitle = component.container.querySelector('.blogTitle')
  expect(blogTitle).toHaveTextContent('test')
  expect(blogTitle).toHaveTextContent('Bill')
  expect(blogTitle).toBeVisible()

  const blogUrl = component.container.querySelector('.blogUrl')
  expect(blogUrl).toHaveTextContent('www.www.www')
  expect(blogUrl).not.toBeVisible()

  const blogLikes = component.container.querySelector('.blogLikes')
  expect(blogLikes).toHaveTextContent(12)
  expect(blogLikes).not.toBeVisible()

})

test('check if view button and like button clicked work', () => {

  const blog = {
    url: 'www.ccc.mmm',
    title: 'test2',
    author: 'Bill',
    likes:2,
    user: { name:'fff' }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      handleUpdateBlog={mockHandler}
    />
  )


  const button = component.getByText('view')
  const blogDetail = component.container.querySelector('.blogDetail')
  expect(blogDetail).not.toBeVisible()
  fireEvent.click(button)
  expect(blogDetail).toBeVisible()

  const likeButton = component.container.querySelector('.likeButton')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)

})

test('test new blog form',() => {
  const createBlog = jest.fn()

  const component = render(
    <NewBlogForm handleNewBlog={createBlog}/>
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  const form = component.container.querySelector('form')


  fireEvent.change(title,{
    target: {
      value: 'Test_titile'
    }
  })
  fireEvent.change(author,{
    target: {
      value: 'Aaaaaaaaaaa'
    }
  })
  fireEvent.change(url,{
    target: {
      value: 'Urlllllllllllllllllllll'
    }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('Aaaaaaaaaaa' )
  expect(createBlog.mock.calls[0][0].url).toBe('Urlllllllllllllllllllll' )

})