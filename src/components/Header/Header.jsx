import React from 'react'
import {Container,Logo, LogoutButton} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state)=>state.status)
  const navigate = useNavigate();

  console.log("Auth Status: ", authStatus);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  }
  ]

  return (
    <header className='sticky top-0 z-50 py-3 shadow-sm bg-white border-b border-gray-200'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-6 flex items-center'>
            <Link to='/'>
              <Logo width='70px' className="ml-3 text-2xl font-bold text-gray-800 tracking-wide"/>
            </Link>
            {/* <span className="ml-3 text-2xl font-bold text-gray-800 tracking-wide">Blogger</span> */}
          </div>

          <ul className='flex ml-auto gap-2'>
              {navItems.map((item)=>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={()=>navigate(item.slug)}
                    className='px-5 py-2 rounded-full font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 bg-white border border-gray-200 shadow-sm'
                  >{item.name}</button>
                </li>
              ) : null
              )}

              {authStatus && (
                <li>
                  <LogoutButton/>
                </li>
              )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
