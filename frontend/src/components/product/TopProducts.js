import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import useActive from '../../hooks/useActive';
import ProductCard from './ProductCard';
import commonContext from '../../contexts/common/commonContext';
import { useContext } from 'react';

const TopProducts = () => {
    const { products } = useContext(commonContext);
    const [product, setProducts] = useState(products);
    const { activeClass, handleActive } = useActive(0);

    const productsCategory = [
        'All',
        ...new Set(products.map(item => item.category))
    ];

    const handleProducts = (category, i) => {
        if (category === 'All') {
            setProducts(products);
            handleActive(i);
            return;
        }

        const filteredProducts = products.filter(item => item.category === category);
        setProducts(filteredProducts);
        handleActive(i);
    };


    return (
        <>
            <div className="products_filter_tabs">
                <ul className="tabs">
                    {
                        productsCategory.map((item, i) => (
                            <li
                                key={i}
                                className={`tabs_item ${activeClass(i)}`}
                                onClick={() => handleProducts(item, i)}
                            >
                                {item}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="wrapper products_wrapper">
                {
                    product.slice(0, 11).map(item => (
                        <ProductCard
                            key={item.id}
                            {...item}
                        />
                    ))
                }
                <div className="card products_card browse_card">
                    <Link to="/all-products">
                        Browse All <br /> Products <BsArrowRight />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TopProducts;