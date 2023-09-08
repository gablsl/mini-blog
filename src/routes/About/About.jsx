import { Link } from 'react-router-dom';
import styles from './About.module.css';

const About = () => {
    return (
        <div className={styles.about}>
            <h2>
                About Mini <span>Blog</span>
            </h2>
            <p>
                This project was created with React in front end and Firebase in
                back end
            </p>
            <Link to='/posts/create' className='btn'>
                Create post
            </Link>
        </div>
    );
};

export default About;
