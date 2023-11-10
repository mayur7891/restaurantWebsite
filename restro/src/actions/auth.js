// import { FORM_SUBMIT } from '../constants/actionTypes'; // Define a new action type
// import Validation from '../components/LoginValidation';
// import upValidation from '../components/SignUpValidation';
// export const formSubmit = (formData, isLogin, navigate) => async (dispatch) => {
//   try {
//     // Your validation code here
//     const errors = isLogin ? Validation(formData) : upValidation(formData);

//     if (
//       (!isLogin && errors.username === '') ||
//       errors.email === '' ||
//       errors.password === ''
//     ) {
//       // Proceed with the form submission
//       const endpoint = isLogin ? 'signin' : 'signup';

//       const response = await axios.post(`http://localhost:5000/${endpoint}`, formData);

//       if (response.data === 'Success' || response.data === 'User created') {
//         // Dispatch the action with the response data
//         dispatch({ type: FORM_SUBMIT, data: response.data });

//         // Navigate to the desired route
//         navigate('/');
//       } else if (response.data === 'Fail') {
//         // Handle errors as needed
//         console.error('Invalid email or password.');
//       } else if (response.data === 'User already exists') {
//         // Handle errors as needed
//         console.error('User already exists. Please choose a different email.');
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
