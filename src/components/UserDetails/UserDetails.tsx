import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDetails.css';
import NextButton from '../../uiComponents/NextButton/NextButton';
import { validateEmail } from '../../helper/EmailValidation';
import { validatePhone } from '../../helper/PhoneValidation';
import axios from 'axios';

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
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setError('');

    const userData = {
      mailid: formData.email,         
      phonenumber: formData.phone,    
      firstname: formData.firstName,  
      secondname: formData.lastName,  
      designation: formData.designation,   
      organization: formData.organization, 
    };

    console.log('User Data:', userData);

    try {
      const response = await axios.post('https://feedbacksystem-rutm.onrender.com/api/userdetails/', userData);
      console.log('User Data:', response.data);
      navigate('/feedback-questions');
    } catch (error) {
      console.error('Error saving user details:', error);
      setError('Failed to save user details. Please try again.');
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