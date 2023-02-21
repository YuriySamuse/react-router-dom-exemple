import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { getCommentByPostId } from 'shared/servises/post-api';

import styles from './single-post-comment-page.module.scss';

const SinglePostCommentPage = () => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentByPostId(id);
        setComments(data);
      } catch ({ response }) {
        console.log(response.data.message);
      }
    };
    fetchComments();
  }, []);

  const elements = comments.map(({ id, name, text }) => (
    <li key={id}>
      <p>Name: {name}.</p>
      <p>{text}</p>
    </li>
  ));
  return <ol>{elements}</ol>;
};

export default SinglePostCommentPage;
