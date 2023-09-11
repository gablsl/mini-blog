import styles from './Search.module.css';

// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

// components
import PostDetails from '../../components/PostDetails/PostDetails';
import { Link } from 'react-router-dom';

const Search = () => {
    const query = useQuery();
    const search = query.get('q');

    const { documents: posts } = useFetchDocuments('posts', search);

    return (
        <div className={styles.search_container}>
            <h1>Results found for: {search}</h1>
            <div className='post-list'>
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>No posts were found for your search...</p>
                        <Link to='/mini-blog' className='btn btn-dark'>
                            Back to home
                        </Link>
                    </div>
                )}
                {posts &&
                    posts.map((post) => (
                        <PostDetails key={post.id} post={post} />
                    ))}
            </div>
        </div>
    );
};

export default Search;
