import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

import PostDetails from '../../components/PostDetails/PostDetails';

import styles from './Home.module.css';

const Home = () => {
    const [query, setQuery] = useState('');
    const { documents: posts, loading } = useFetchDocuments('posts');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query) {
            return navigate(`/search?q=${query}`);
        }
    };

    return (
        <div className={styles.home}>
            <h1>See our most recent posts</h1>
            <form className={styles.search_form} onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Search for tags...'
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className='btn btn-dark'>Search</button>
            </form>
            <div>
                {loading && <p>Loading...</p>}
                {posts &&
                    posts.map((post) => (
                        <PostDetails key={post.id} post={post} />
                    ))}
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>No posts found</p>
                        <Link to='/posts/create' className='btn'>
                            Create first post
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
