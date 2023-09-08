import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

//context
import { AuthProvider } from './context/AuthContext';

//components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

//pages
import Home from './routes/Home/Home';
import About from './routes/About/About';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import CreatePost from './routes/CreatePost/CreatePost';
import EditPost from './routes/EditPost/EditPost';
import Dashboard from './routes/Dashboard/Dashboard';
import Search from './routes/Search/Search';
import Post from './routes/Post/Post';

import './App.css';

const App = () => {
    const [user, setUser] = useState(undefined);
    const { auth } = useAuthentication();

    const loadingUser = user === undefined;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, [auth]);

    if (loadingUser) {
        return <p>Waiting...</p>;
    }

    return (
        <div className='App'>
            <AuthProvider value={{ user }}>
                <BrowserRouter>
                    <Navbar />
                    <div className='container'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/search' element={<Search />} />
                            <Route path='/posts/:id' element={<Post />} />
                            <Route
                                path='/login'
                                element={
                                    !user ? <Login /> : <Navigate to='/' />
                                }
                            />
                            <Route
                                path='/register'
                                element={
                                    !user ? <Register /> : <Navigate to='/' />
                                }
                            />
                            <Route
                                path='/posts/edit/:id'
                                element={
                                    user ? (
                                        <EditPost />
                                    ) : (
                                        <Navigate to='/login' />
                                    )
                                }
                            />
                            <Route
                                path='/posts/create'
                                element={
                                    user ? <CreatePost /> : <Navigate to='/' />
                                }
                            />
                            <Route
                                path='/dashboard'
                                element={
                                    user ? <Dashboard /> : <Navigate to='/' />
                                }
                            />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
};

export default App;
