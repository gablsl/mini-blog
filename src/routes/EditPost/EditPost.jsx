import { useState, useEffect } from 'react';
import { useUpdateDocument } from './../../hooks/useUpdateDocument';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from './../../hooks/useFetchDocument';

import styles from './EditPost.module.css';

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument('posts', id);

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);

            const textTags = post.tagsArray.join(', ');
            setTags(textTags);
        }
    }, [post]);

    const { user } = useAuthValue();

    const { updateDocument, response } = useUpdateDocument('posts');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError('');

        // validate image
        try {
            new URL(image);
        } catch (error) {
            setFormError('The image needs to be an URL');
        }

        // create tags array
        const tagsArray = tags
            .split(',')
            .map((tag) => tag.trim().toLowerCase());

        // check values
        if (!title || !image || !tags || !body) {
            setFormError('Please fill in all fields');
        }

        if (formError) return;

        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        };

        updateDocument(id, data);

        // redirect to dashboard
        navigate('/dashboard');
    };

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editing post: {post.title}</h2>
                    <p>Change your post as desired</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Title:</span>
                            <input
                                type='text'
                                name='text'
                                required
                                placeholder='Think about a good title...'
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </label>
                        <label>
                            <span>Image URL:</span>
                            <input
                                type='text'
                                name='image'
                                required
                                placeholder='Insert an image that represents your post!'
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                            />
                        </label>
                        <label>
                            <p className={styles.preview_title}>
                                Image preview:
                            </p>
                            <img
                                className={styles.image_review}
                                src={post.image}
                                alt={post.title}
                            />
                            <span>Content:</span>
                            <textarea
                                name='body'
                                required
                                placeholder='Enter post content'
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                            ></textarea>
                        </label>
                        <label>
                            <span>Tags:</span>
                            <input
                                type='text'
                                name='tags'
                                required
                                placeholder='Enter tags separated by comma'
                                onChange={(e) => setTags(e.target.value)}
                                value={tags}
                            />
                        </label>
                        {!response.loading && (
                            <button className='btn'>Edit post</button>
                        )}
                        {response.loading && (
                            <button className='btn' disabled>
                                Wait...
                            </button>
                        )}
                        {(response.error || formError) && (
                            <p className='error'>
                                {response.error || formError}
                            </p>
                        )}
                    </form>
                </>
            )}
        </div>
    );
};

export default EditPost;
