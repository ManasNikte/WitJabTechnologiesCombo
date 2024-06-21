import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Section from './Section';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://witjabtechnologiescombo.onrender.com/api/getreviews');
        // Filter reviews where visibility is 'public'
        const publicReviews = response.data.filter(review => review.visibility === 'public');
        setReviews(publicReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Section id="reviews">
      <div className="container">
        <h2 className="h2 mb-8 text-center">Reviews</h2>
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review._id} className="p-8">
              <div className="bg-transparent p-6 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((star, index) => (
                    <svg
                      key={index}
                      className={`w-6 h-6 ${index < review.stars ? 'text-yellow-500' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.431L24 9.745l-6 5.845 1.416 8.255L12 18.902l-7.416 4.943L6 15.59 0 9.745l8.332-1.727z" />
                    </svg>
                  ))}
                </div>
                <h4 className="h4 mb-2">{review.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{review.post} at {review.company}</p>
                <p className="text-lg">{review.text}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Section>
  );
};

export default Review;
