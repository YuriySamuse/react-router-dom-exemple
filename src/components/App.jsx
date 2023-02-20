import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from 'modules/Navbar/Navbar';

import HomePage from 'pages/HomePage/HomePage';
import PostSearchPage from 'pages/PostSearchPage/PostSearchPage';
import ContactsPage from 'pages/ContactsPage/ContactsPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import SinglePostPage from 'pages/SinglePostPage/SinglePostPage';
import SinglePostCommentPage from 'pages/SinglePostCommentPage/SinglePostCommentPage';

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/posts-search" element={<PostSearchPage />}></Route>
        <Route path="/contacts" element={<ContactsPage />}></Route>
        <Route path="/posts/:id" element={<SinglePostPage />}>
          <Route path="comments" element={<SinglePostCommentPage />}></Route>
          <Route />
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
