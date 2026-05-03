import { useState } from 'react';
import { FiZoomIn } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import AnimatedHeadline from '../AnimatedHeadline';

// Load all images from the gallery folder automatically and sort by filename
const imageGallery = Object.keys(import.meta.glob('/public/gallery/*.{jpg,jpeg,png,svg}', { eager: true }))
  .sort((a, b) => {
    // Extract numbers if present to sort numerically (1, 2, 10 instead of 1, 10, 2)
    const numA = parseInt(a.match(/\d+/)?.[0] || 0);
    const numB = parseInt(b.match(/\d+/)?.[0] || 0);
    return numA - numB || a.localeCompare(b);
  })
  .map((path, index) => ({
    id: index + 1,
    url: path.replace('/public', '')
  }));

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };





  return (
    <div className="h-full  text-black overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <AnimatedHeadline
            highlight="Gallery"
            className="text-3xl sm:text-4xl font-bold mb-2 text-[#113959]"
          >
            Image Gallery
          </AnimatedHeadline>
          <p className="text-gray-400">
            View Department events, workshops, and memorable moments captured in our gallery. Click on any image to see it in full size.
          </p>
        </div>



        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {imageGallery.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="group relative cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-[#2f2f2f] shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[4/3]">
                <img
                  src={image.url}
                  alt="Gallery image"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
