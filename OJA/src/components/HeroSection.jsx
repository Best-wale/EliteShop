import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useState } from "react";
import image2 from "../assets/new2.jfif";
import image3 from "../assets/new3.jpg";

function HeroSection() {
  const { current, setCurrent } = useState();

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full animate-float blur-xl"></div>
      <div className="absolute bottom-32 right-20 w-48 h-48 bg-secondary/10 rounded-full animate-float blur-xl"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/10 rounded-full animate-float blur-xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center px-4 py-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full text-sm font-medium text-primary mb-6 shadow-lg">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              New Collection Available
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Premium
              </span>
              <span className="block">Shopping</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              Experience luxury shopping with our curated collection of premium
              products, exclusive deals, and unmatched quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/product"
                className="text-primary font-semibold hover:underline"
              >
                <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold text-lg">
                  Shop Now
                </button>
              </Link>
              <Link
                to="/product"
                className="text-primary font-semibold hover:underline"
              >
                <button className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl font-semibold text-lg">
                  Explore Collections
                </button>
              </Link>
            </div>
          </div>

          {/* Hero Image Carousel */}
          <div className="relative animate-scale-in">
            <Slider {...settings}>
              <div className="relative">
                <div className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center ">
                    {/*  <img src= alt="Premium Collection 2" />*/}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Premium Collection
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Discover our handpicked selection of luxury items
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">
                      From ₦5000
                    </span>
                    <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg transition-all">
                      View All
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-6">
                    {/*<img src={image2} alt="Premium Collection 3" />*/}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Premium Collection
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Discover our handpicked selection of luxury items
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">
                      From ₦5000
                    </span>
                    <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg transition-all">
                      View All
                    </button>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
