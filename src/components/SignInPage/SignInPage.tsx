import { useNavigate } from 'react-router-dom';
import './SignInPage.css';
import { auth, provider } from './config';
import { signInWithPopup } from 'firebase/auth';
import { useState, useEffect } from 'react';

const SignInPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        const email = data.user.email;
        if (email) {
          setValue(email);
          localStorage.setItem("email", email);
        }
        navigate('/user-details');
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
      });
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setValue(email);
      navigate('/user-details');
    }
  }, [navigate]);

  return (
    <div className='sign-in-page'>
      <h2>Good, bad, or hilarious — we want it all! <br /> Sign in to spill the tea!</h2>
      <div className="sign-in-container">
        {value ? (
          <p>Redirecting to user details...</p>
        ) : (
          <button className="google-button" onClick={handleGoogleSignIn}>
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google logo" />
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
