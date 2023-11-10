import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginValidation'
import Validation from './LoginValidation';
import axios from 'axios'
import upValidation from './SignUpValidation';
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [serverError, setServerError] = useState('');

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([])
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleInput = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      setErrors(Validation(formData));
    } else {
      setErrors(upValidation(formData));
    }
  
    // Check if there are any validation errors
    if (
      (!isLogin && errors.username === '') ||
      errors.email === '' ||
      errors.password === ''
    ) {
      // Proceed with the form submission
      if (isLogin) {
        axios
          .post('http://localhost:5000/signin', formData)
          .then((res) => {
            if (res.data.message === 'Success') {
              // Store user data in localStorage
              const userData = { ...formData, userId: res.data.userId };
              localStorage.setItem('userData', JSON.stringify(userData));
              navigate('/');
            } else if (res.data === 'Fail') {
              setServerError('Invalid email or password.');
            }
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post('http://localhost:5000/signup', formData)
          .then((res) => {
            if (res.data === 'User already exists') {
              setServerError('User already exists. Please choose a different email.');
              alert("User Already Exists");
            } else {
              // Store user data in localStorage
              const userData = { ...formData, userId: res.data.userId };
              localStorage.setItem('userData', JSON.stringify(userData));
              navigate('/');
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };
  
  
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };




  const containerStyle = {
    marginTop: '7.3rem',
    marginBottom: '3.3rem',
    backgroundColor: '#f8f9fa',
  };

  const formStyle = {
    border: '1px solid #dee2e6',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    padding: '20px',
  };

  const buttonStyle = {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
  };

  return (
    <div className="container" style={containerStyle}>
      <div className="row justify-content-center">
        <div className="col-md-6" style={formStyle}>
          <h2 className="mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
          
          <form onSubmit={handleSubmit}>
            {isLogin || (
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                  name='username'
                  onChange={handleInput}
                />
                {errors.username && <span className='text-danger'>{errors.username}</span>}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                name='email'
                onChange={handleInput}
              />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name='password'
                  onChange={handleInput}
                />
                 {errors.password && <span className='text-danger'>{errors.password}</span>}
              </div>
              <button
                  style={buttonStyle}
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
            </div>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  name='confirmPassword'
                  onChange={handleInput}
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <p className="mt-3">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <Link to="/Login" onClick={toggleForm}>
              {isLogin ? 'Sign Up' : 'Login'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
