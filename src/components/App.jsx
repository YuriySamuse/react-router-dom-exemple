import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from 'modules/Navbar/Navbar';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const PostSearchPage = lazy(() =>
  import('pages/PostSearchPage/PostSearchPage')
);
const ContactsPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));
const SinglePostPage = lazy(() =>
  import('pages/SinglePostPage/SinglePostPage')
);
const SinglePostCommentPage = lazy(() =>
  import('pages/SinglePostCommentPage/SinglePostCommentPage')
);

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<p>...loading</p>}>
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
      </Suspense>
    </BrowserRouter>
  );
};
