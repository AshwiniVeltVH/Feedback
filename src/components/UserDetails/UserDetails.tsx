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
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setError('');

    // Convert form data to JSON
    const userData = {
      phonenumber: formData.phone,
      firstname: formData.firstName,
      secondname: formData.lastName,
      designation: formData.designation,
      organization: formData.organization,
    };

    console.log('User Data:', JSON.stringify(userData, null, 2));

    navigate('/feedback-questions');
  };

  return (
    <div className='formContainer'>
      <div className='formBox'>
        <h2>User Information</h2>
        <div className="inputGroup">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone No" value={formData.phone} onChange={handleChange} />
          <input type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} />
          <input type="text" name="organization" placeholder="Organization" value={formData.organization} onChange={handleChange} />
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
