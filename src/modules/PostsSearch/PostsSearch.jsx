import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import PostsSearchForm from './PostsSearchForm/PostsSearchForm';
import PostList from 'shared/components/PostList/PostList';

import { searchPosts } from 'shared/servises/post-api';

import styles from './posts-search.module.scss';

const PostsSearch = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');

  const page = searchParams.get('page');

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await searchPosts(search, page);
        setItems(prevItems => [...prevItems, ...data]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [search, page, setLoading, setItems, setError, setLoading, searchPosts]);

  const onSearchPosts = useCallback(({ search }) => {
    setSearchParams({ search, page: 1 });
    setItems([]);
  }, []);

  const loadMore = useCallback(() => {
    setSearchParams({ search, page: Number(page) + 1 });
  }, [search]);

  return (
    <>
      <PostsSearchForm onSubmit={onSearchPosts} />
      <PostList items={items} />
      {error && <p className={styles.errorMessage}>{error}</p>}
      {loading && <p>...Load posts</p>}
      {Boolean(items.length) && <button onClick={loadMore}>Load more</button>}
    </>
  );
};

export default PostsSearch;
