import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, A11y, Autoplay } from 'swiper';
import { displayMoney } from '../../helpers/utils';
import commonContext from '../../contexts/common/commonContext';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import "swiper/scss/effect-coverflow";

const FeaturedSlider = () => {
    const { products } = useContext(commonContext) || {};
    const featuredProducts = products ? products.filter(item => item.tag === 'featured-product') : [];

    if (featuredProducts.length === 0) {
        return <p>No featured products available.</p>;
    }

    try {
        return (
            <Swiper
                modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
                loop={true}
                speed={400}
                spaceBetween={100}
                slidesPerView={"auto"}
                pagination={{ clickable: true }}
                effect={"coverflow"}
                centeredSlides={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 70,
                    modifier: 3,
                    slideShadows: false,
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 200
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 250
                    },
                }}
                className="featured_swiper"
            >
                {featuredProducts.map((item) => {
                    const { _id, images, title, finalPrice, originalPrice, path } = item;
                    const newPrice = displayMoney(finalPrice);
                    const oldPrice = displayMoney(originalPrice);

                    return (
                        <SwiperSlide key={_id} className="featured_slides">
                            <div className="featured_title">{title}</div>
                            <figure className="featured_img">
                                <Link to={`${path}${_id}`}>
                                    <img src={images[0]} alt={title} />
                                </Link>
                            </figure>
                            <h2 className="products_price">
                                {newPrice} &nbsp;
                                <small><del>{oldPrice}</del></small>
                            </h2>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        );
    } catch (error) {
        console.error('Error initializing Swiper:', error);
        return <p>Error loading featured products.</p>;
    }
};

export default FeaturedSlider;
