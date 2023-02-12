import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import FriendChatBox from './components/ChatLayoutChildren/FriendChatBox';
import Photo from './components/ChatLayoutChildren/Photo';
import ChatLayout from './components/ChatLayout';
import HomePage from './components/HomePage';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<HomePage />} />
      <Route path='/reactChatWeb/:adminId' element={<ChatLayout />} >
        <Route index element={<Photo />} />
        <Route path=':friendId' element={<FriendChatBox />} />
      </Route>
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  );
}

export default App;