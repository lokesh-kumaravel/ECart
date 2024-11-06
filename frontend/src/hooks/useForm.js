import { useContext, useState } from 'react';
import commonContext from '../contexts/common/commonContext';
import axios from 'axios';

const useForm = () => {
    const { toggleForm, setFormUserInfo, setUser, user } = useContext(commonContext);
    const [inputValues, setInputValues] = useState({});

    const handleInputValues = (e) => {
        const { name, value } = e.target;

        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const loggedUserInfo = inputValues.mail.split('@')[0].toUpperCase();
        const userData = {
            username: inputValues.username,
            email: inputValues.mail, 
            password: inputValues.password 
        };

        console.log("Form Data:", userData);

        try {
            const response = await axios.post('http://localhost:3000/api/users/register', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Response:", response.data);
            setInputValues({});
            loggedUserInfo = response.data
            setFormUserInfo(loggedUserInfo); 
            toggleForm(false); 
            alert(`Hello ${loggedUserInfo}, you're successfully registered.`);
        } catch (error) {
            console.error("Error during form submission:", error.response.data || error);
            alert("There was an error submitting the form. Please try again.");
        }
    };
    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email: inputValues.mail,
            password: inputValues.password
        };
    
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response && response.data) {
                console.log("Response:", response.data);
                setUser(response.data); 
                localStorage.setItem('user', JSON.stringify(response.data)); 
                localStorage.setItem('token',response.data.token)
                setInputValues({});
                let userUsername = response.data.user.username;
                setFormUserInfo(userUsername);
                toggleForm(false); 
                alert(`Hello ${userUsername}, you're successfully logged in.`);
            } else {
                console.error("Unexpected response format:", response);
                alert("Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during form submission:", error.response ? error.response.data : error);
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