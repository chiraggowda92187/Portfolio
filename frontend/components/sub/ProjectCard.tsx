import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaGithub, FaLink } from 'react-icons/fa';
import { FaCodeFork, FaEarthAsia, FaEarthOceania } from 'react-icons/fa6';
import axios from 'axios';
import { BACKEND_URL } from '@/constants';

interface Props {
  src: string;
  title: string;
  description: string;
  live_url: string | null;
  github_url: string;
  imagesKeyList: string[];
  fork : boolean
}

export const ProjectCard = ({
  src,
  title,
  description,
  live_url,
  github_url,
  imagesKeyList,
  fork
}: Props) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const getImageUrls = async () => {
        if (imagesKeyList.length === 0) {
          return;
        }
      const imageUrls = await Promise.all(
        imagesKeyList.map(async (key) => {
          try {
            const res = await axios.get(`${BACKEND_URL}/fetchStatic/${key}`, {
              responseType: 'blob',
            });
            const blob = new Blob([res.data], {
              type: res.headers['Content-Type']?res.headers['Content-Type']as string : undefined,
            });
            const url = URL.createObjectURL(blob);
            return url;
          } catch (error) {
            console.log('Error while fetching the static images: ', error);
            return null;
          }
        })
      );
      const filteredImageUrls = imageUrls.filter(
        (url) => url !== null
      ) as string[];
      setImages((prevUrls) => [...prevUrls, ...filteredImageUrls]);
    };

    getImageUrls();
  }, []);

  useEffect(() => {
    //console.log('Images:', images);
  }, [images]);

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] z-[20] hover:scale-105 transition-transform duration-300">
      {/* <Image
        src={src}
        alt={title}
        height={1000}
        width={1000}
        className="w-full object-contain"
      /> */}
      {images.length > 0 ? (
        <Carousel imageUrls={images} />
      ) : (
        <div className="text-white"></div>
      )}
      <div className="relative p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          <div className="flex space-x-3">
            <a
              href={github_url}
              target="_blank"
              className="cursor-pointer z-[25]"
            >
              <FaGithub className="hover:animate-slowspin w-6 h-6 invert" />
            </a>
            {live_url && (
              <a
                href={live_url}
                target="_blank"
                className="cursor-pointer z-[25]"
              >
                <FaEarthAsia className="w-6 h-6 invert" />
              </a>
            )}
            {fork && (
              <div className="cursor-pointer z-[25]"
              >
                <FaCodeFork className="w-6 h-6 invert" />
              </div>
            )}
          </div>
        </div>
        <p className="mt-2 text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const Carousel = ({ imageUrls }: { imageUrls: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [imageUrls.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % imageUrls.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((currentIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <div className="relative overflow-hidden w-full h-64 rounded-lg shadow-lg">
      {imageUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Image ${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={goToPreviousSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
      >
        &gt;
      </button>

      {/* Indicator Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {imageUrls.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
