import {React, useRef, useEffect} from 'react';
import './App.css';
import Home from './Home';
import AU from "/AU.png";
import Lenis from 'lenis';
import TakeATest from './TakeATest';
import SignUp from './Register/SignUp';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Register/Login';
import { AuthProvider } from './authContext';
import BookASession from './BookASession';
import Sessions from './Sessions';
import BlogPage from './BlogPage';
import AddBlog from './AddBlog';
import MainBlog from './MainBlog';

function App() {
  return (
      <AuthProvider>
        <div className="app h-screen w-screen relative overflow-x-hidden">
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/take-a-test' element={<TakeATest/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/book-a-session' element={<BookASession/>}/>
            <Route path='/blog' element={<BlogPage/>}/>
            <Route path='/add-blog' element={<AddBlog/>}/>
            <Route path="/sessions/*" element={<Sessions />} />
            <Route path='/blog/:blogName' element={<MainBlog/>}/>
          </Routes>
          <img src={AU} alt="AU" className="fixed h-25 bottom-0 right-0 bg-white max-sm:hidden"/>
        </div>
      </AuthProvider>    
  )
}

export default App