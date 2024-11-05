import { useEffect } from 'react';

const useDocTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} - ZOROZ`;
        } else {
            document.title = 'ZOROZ | The Perfect ecommerce Store';
        }
    }, [title]);

    return null;
};

export default useDocTitle;
