// import { FORM_SUBMIT, LOGOUT } from '../constants/actionTypes';

// const authReducer = (state = { authData: null }, action) => {
//     switch (action.type) {
//         case FORM_SUBMIT:
//             try {
//                 if (action?.data) {
//                     localStorage.setItem('profile', JSON.stringify({ ...action.data }));
//                 }
//             } catch (error) {
             
//                 console.error('Error storing data in local storage:', error);
//             }
//             return { ...state, authData: action?.data };
        

//         case LOGOUT:
//             try {
            
//                 localStorage.removeItem('profile');
//                 return {...state, authData:null}
//             } catch (error) {
    
//                 console.error('Error removing data from local storage:', error);
//             }
//             return { ...state, authData: null };

//         default:
//             return state;
//     }
// };

// export default authReducer;
