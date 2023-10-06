import React, { useState } from 'react'
import LoginPage from './Pages/LoginPage/LoginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserData } from './Global/GlobalState'
import SigninPage from './Pages/SigninPage/SigninPage'
import PostPage from './Pages/PostPage/PostPage'
import CommentPage from './Pages/CommentPage/CommentPage'

export default function App() {
  const [userData, setUserData] = useState({
    connected: false,
    jwt: null
  })
  return (
    <div>
      <BrowserRouter>
      <UserData.Provider
      value={{
        userData: userData,
        setUserData: setUserData
      }}
      >

        <Routes>
          <Route index element={<LoginPage></LoginPage>}></Route>
          <Route path="/signin" element={<SigninPage></SigninPage>}></Route>
          <Route path="/posts" element={<PostPage></PostPage>}></Route>
          <Route path="/comment" element={<CommentPage></CommentPage>}></Route>
        </Routes>

      </UserData.Provider>
      </BrowserRouter>
    </div>
  )
}
