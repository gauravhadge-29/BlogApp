import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from "./pages/AllPosts.jsx"
import AddPost from './pages/addPost.jsx'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <Login/>
            ),
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/all-posts",
            element: (
                
                   
                    <AllPosts />
                
            ),
        },
        {
            path: "/add-post",
            element: (
                
                    <AddPost />
                
                    
                
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                
                    <EditPost />
                
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
      ],
    }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
