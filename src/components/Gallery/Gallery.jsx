import { useState } from 'react';
import { FiZoomIn } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

// Define total number of gallery images
const TOTAL_GALLERY_IMAGES = 13;

// Dynamically load gallery images
const loadGalleryImages = () => {
  const images = [];
  for (let i = 1; i <= TOTAL_GALLERY_IMAGES; i++) {
    images.push({
      id: i,
      url: `/gallery/${i}.jpg`
    });
  }
  return images;
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Gallery images array loaded dynamically
  const imageGallery = loadGalleryImages();

  



  return (
    <div className="h-full  text-black overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">
            Image Gallery
          </h1>
          <p className="text-gray-400">
            View projects, certificates, and achievements
          </p>
        </div>

       

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {imageGallery.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="group relative break-inside-avoid mb-4 cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-[#2f2f2f] shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src={image.url}
                  alt="Gallery image"
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FiZoomIn className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

    
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <IoClose className="w-6 h-6 text-white" />
          </button>

          <div className="max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt="Gallery"
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
