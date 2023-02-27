import { useState, useEffect, useCallback } from 'react';
import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import { getPostById } from 'shared/servises/post-api';

const SinglePostPage = () => {
  const [post, setPost] = useState();
  const { id } = useParams();

  const navigate = useNavigate();

  const location = useLocation();
  const some = location.state?.from || '/';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await getPostById(id);
        setPost(result);
      } catch ({ response }) {
        console.log(response.data.message);
      }
    };
    fetchPost();
  }, []);

  // console.log('SinglrPostPage', some);

  const goBack = useCallback(() => navigate(some), [navigate]);

  return (
    <>
      <button onClick={goBack}>Go back</button>
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
      <Link to="comments" state={{ some }}>
        Comments
      </Link>
      <Outlet />
    </>
  );
};

export default SinglePostPage;
