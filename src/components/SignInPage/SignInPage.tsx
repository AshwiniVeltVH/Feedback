import { useNavigate } from "react-router-dom";
import "./SignInPage.css";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const SignInPage = () => {
  const navigate = useNavigate();
  const { user, login, loading } = useAuth();

  useEffect(() => {
    if (user) {
      // Navigate based on user role
      if (user.roles.includes("admin")) {
        navigate("/question-module");
      } else {
        navigate("/user-details");
      }
    }
  }, [user, navigate]);

  return (
    <div className="signInPage">
      <h2>
        Good, bad, or hilarious — we want it all! <br /> Sign in to spill the
        tea!
      </h2>
      <div className="signInContainer">
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <p>Redirecting...</p>
        ) : (
          <button className="googleButton" onClick={login}>
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google logo"
            />
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
