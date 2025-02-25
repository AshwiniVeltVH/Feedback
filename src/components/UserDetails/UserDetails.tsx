import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDetails.css';
import NextButton from '../../uiComponents/NextButton/NextButton';
import { validateEmail } from '../../helper/EmailValidation';
import { validatePhone } from '../../helper/PhoneValidation';

const UserDetails = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    designation: '',
    organization: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    // Perform validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.designation || !formData.organization) {
      setError('Please fill in all fields.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid phone number in the format +<country code><10-digit number>.');
      return;
    }
    setError('');

    // Prepare data for API
    const userData = {
      mailid: formData.email,
      phonenumber: formData.phone,
      firstname: formData.firstName,
      secondname: formData.lastName,
      designation: formData.designation,
      organization: formData.organization,
    };

    try {
      const response = await fetch('https://feedbacksystem-rutm.onrender.com/api/userdetails/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit user details');
      }

      // Log user details in the specified JSON format
      console.log('User Details:', JSON.stringify(userData, null, 2));

      // Store first name and last name separately in local storage
      localStorage.setItem("firstName", formData.firstName);
      localStorage.setItem("lastName", formData.lastName);

      // Navigate to the QuestionModule page
      navigate('/question-module');
    } catch (error: any) {
      setError(error.message || 'An error occurred while submitting your details. Please try again.');
    }
  };

  return (
    <div className='formContainer'>
      <div className='formBox'>
        <h2>User Information</h2>
        <div className="inputGroup">
          <div className="inputContainer">
            <i className="fas fa-user icon"></i>
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          </div>
          <div className="inputContainer">
            <i className="fas fa-user icon"></i>
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          </div>
          <div className="inputContainer">
            <i className="fas fa-envelope icon"></i>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="inputContainer">
            <i className="fas fa-phone icon"></i>
            <input type="tel" name="phone" placeholder="Phone No" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="inputContainer">
            <i className="fas fa-briefcase icon"></i>
            <input type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} />
          </div>
          <div className="inputContainer">
            <i className="fas fa-building icon"></i>
            <input type="text" name="organization" placeholder="Organization" value={formData.organization} onChange={handleChange} />
          </div>
        </div>
        {error && <p className="errorMessage">{error}</p>}
        <div className="submitButton">
          <NextButton className='nextBtn' onClick={handleNext} label="Next" />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
