import { createContext, useReducer, useEffect, useState } from 'react';
import commonReducer from './commonReducer';

// Common-Context
const commonContext = createContext();

// Initial State
const initialState = {
    isFormOpen: false,
    formUserInfo: '',
    isSearchOpen: false,
    searchResults: [],
    products: []  // New products state
};

// Common-Provider Component
const CommonProvider = ({ children }) => {
    const [state, dispatch] = useReducer(commonReducer, initialState);
    // const [user, setUser] = useState(null); // Declare user state here
    const [user, setUser] = useState(() => {
        // Retrieve user data from localStorage
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null; // Parse user data or return null
    });
    // Form actions
    const toggleForm = (toggle) => {
        return dispatch({
            type: 'TOGGLE_FORM',
            payload: { toggle }
        });
    };

    const setFormUserInfo = (info) => {
        return dispatch({
            type: 'SET_FORM_USER_INFO',
            payload: { info }
        });
    };

    // Search actions
    const toggleSearch = (toggle) => {
        return dispatch({
            type: 'TOGGLE_SEARCH',
            payload: { toggle }
        });
    };

    const setSearchResults = (results) => {
        return dispatch({
            type: 'SET_SEARCH_RESULTS',
            payload: { results }
        });
    };

    // Product actions
    const setProducts = (products) => {
        return dispatch({
            type: 'SET_PRODUCTS',
            payload: { products }
        });
    };

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products'); 
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
    
        fetchProducts();
    }, []);

    // Context values
    const values = {
        ...state,
        toggleForm,
        setFormUserInfo,
        toggleSearch,
        setSearchResults,
        user,
        setUser
    };

    return (
        <commonContext.Provider value={values}>
            {children}
        </commonContext.Provider>
    );
};

export default commonContext;
export { CommonProvider };


// import { createContext, useReducer } from 'react';
// import commonReducer from './commonReducer';

// // Common-Context
// const commonContext = createContext();

// // Initial State
// const initialState = {
//     isFormOpen: false,
//     formUserInfo: '',
//     isSearchOpen: false,
//     searchResults: []
// };

// // Common-Provider Component
// const CommonProvider = ({ children }) => {

//     const [state, dispatch] = useReducer(commonReducer, initialState);

//     // Form actions
//     const toggleForm = (toggle) => {
//         return dispatch({
//             type: 'TOGGLE_FORM',
//             payload: { toggle }
//         });
//     };

//     const setFormUserInfo = (info) => {
//         return dispatch({
//             type: 'SET_FORM_USER_INFO',
//             payload: { info }
//         });
//     };

//     // Search actions
//     const toggleSearch = (toggle) => {
//         return dispatch({
//             type: 'TOGGLE_SEARCH',
//             payload: { toggle }
//         });
//     };

//     const setSearchResults = (results) => {
//         return dispatch({
//             type: 'SET_SEARCH_RESULTS',
//             payload: { results }
//         });
//     };

//     // Context values
//     const values = {
//         ...state,
//         toggleForm,
//         setFormUserInfo,
//         toggleSearch,
//         setSearchResults
//     };

//     return (
//         <commonContext.Provider value={values}>
//             {children}
//         </commonContext.Provider>
//     );
// };

// export default commonContext;
// export { CommonProvider };