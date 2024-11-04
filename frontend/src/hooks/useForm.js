import { useContext, useState } from 'react';
import commonContext from '../contexts/common/commonContext';
import axios from 'axios';

const useForm = () => {
    const { toggleForm, setFormUserInfo } = useContext(commonContext);
    const [inputValues, setInputValues] = useState({});

    // Handling input values
    const handleInputValues = (e) => {
        const { name, value } = e.target;

        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    // Handling form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Ensure email is stored correctly
        const loggedUserInfo = inputValues.mail.split('@')[0].toUpperCase();
        const userData = {
            username: inputValues.username, // Make sure this key matches your backend model
            email: inputValues.mail, // Match your backend model
            password: inputValues.password // Password from the input
        };

        console.log("Form Data:", userData); // Log the user data being sent

        try {
            const response = await axios.post('http://localhost:3000/api/users/register', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Check for successful response
            console.log("Response:", response.data);
            setInputValues({}); // Reset input values
            setFormUserInfo(loggedUserInfo); // Set user info for UI
            toggleForm(false); // Close form
            alert(`Hello ${loggedUserInfo}, you're successfully registered.`);
        } catch (error) {
            // Handle error appropriately
            console.error("Error during form submission:", error.response.data || error);
            alert("There was an error submitting the form. Please try again.");
        }
    };
    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        const loggedUserInfo = inputValues.mail.split('@')[0].toUpperCase();
        const userData = {
            email: inputValues.mail, // Match your backend model
            password: inputValues.password // Password from the input
        };
        console.log("Form Data:", userData); // Log the user data being sent
        try {
            const response = await axios.post('http://localhost:3000/api/users/register', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Check for successful response
            console.log("Response:", response.data);
            setInputValues({}); // Reset input values
            setFormUserInfo(loggedUserInfo); // Set user info for UI
            toggleForm(false); // Close form
            alert(`Hello ${loggedUserInfo}, you're successfully registered.`);
        } catch (error) {
            // Handle error appropriately
            console.error("Error during form submission:", error.response.data || error);
            alert("There was an error submitting the form. Please try again.");
        }
    };

    return { inputValues, handleInputValues, handleFormSubmit, handleLoginFormSubmit };
};

export default useForm;

// import { useContext, useState } from 'react';
// import commonContext from '../contexts/common/commonContext';

// const useForm = () => {
//     const { toggleForm, setFormUserInfo } = useContext(commonContext);
//     const [inputValues, setInputValues] = useState({});

//     // handling input-values
//     const handleInputValues = (e) => {
//         const { name, value } = e.target;

//         setInputValues((prevValues) => {
//             return {
//                 ...prevValues,
//                 [name]: value
//             };
//         });
//     };

//     // handling form-submission
//     const handleFormSubmit = (e) => {
//         const loggedUserInfo = inputValues.mail.split('@')[0].toUpperCase();

//         e.preventDefault();
//         setInputValues({});
//         setFormUserInfo(loggedUserInfo);
//         toggleForm(false);
//         alert(`Hello ${loggedUserInfo}, you're successfully logged-in.`);
//     };

//     return { inputValues, handleInputValues, handleFormSubmit };
// };

// export default useForm;