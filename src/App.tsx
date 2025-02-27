import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import FeedbackQuestions from "./components/FeedbackQuestions/FeedbackQuestions";
import SignInPage from "./components/SignInPage/SignInPage";
import UserDetails from "./components/UserDetails/UserDetails";
import QuestionModule from "./components/QuestionModule/QuestionModule";
import "./styles/Reset.css";
import "./styles/Variables.css";
import ThankYouPage from "./components/ThankYouPage/ThankYouPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="feedBack">
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route
              path="/user-details"
              element={
                <ProtectedRoute>
                  <UserDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/question-module"
              element={
                <ProtectedRoute requiredPermission="manage:questions">
                  <QuestionModule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feedback-questions"
              element={
                <ProtectedRoute>
                  <FeedbackQuestions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/thankyou-page"
              element={
                <ProtectedRoute>
                  <ThankYouPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
