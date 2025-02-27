import React, { useState, useCallback } from 'react';
import { CalendarIcon, MapPinIcon, HashIcon, ImageIcon, HeadingIcon } from 'lucide-react';
import { Loader2 } from 'lucide-react'; // Import Loader icon

const EventForm = ({ onSubmit, initialValues = {} }) => {
    const [title, setTitle] = useState(initialValues.title || '');
    const [description, setDescription] = useState(initialValues.description || '');
    const [date, setDate] = useState(initialValues.date ? new Date(initialValues.date).toISOString().split('T')[0] : '');
    const [location, setLocation] = useState(initialValues.location || '');
    const [capacity, setCapacity] = useState(initialValues.capacity === undefined ? '' : initialValues.capacity);
    const [selectedImage, setSelectedImage] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(initialValues.thumbnail || null);
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };


    const handleSubmit = async (e) => { // Make handleSubmit async to use async/await
        e.preventDefault();
        setIsLoading(true); // Set loading to true when submit starts

        let base64Thumbnail = null;

        const convertToBase64AndSubmit = async () => {
            try {
                await onSubmit({ // Call onSubmit and wait for it to complete
                    title,
                    description,
                    date,
                    location,
                    capacity: capacity === '' ? 0 : parseInt(capacity, 10),
                    thumbnail: base64Thumbnail,
                });
            } finally {
                setIsLoading(false); // Set loading to false after onSubmit completes (success or error)
            }
        };


        if (selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                base64Thumbnail = reader.result;
                convertToBase64AndSubmit();
            };
            reader.readAsDataURL(selectedImage);
        } else {
            convertToBase64AndSubmit();
        }
    };


    const dragAndDropZoneStyle = `
        border-2 border-dashed rounded-md p-4 text-center cursor-pointer
        ${thumbnailPreview ? 'bg-gray-100' : 'bg-white'}
        hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500
    `;

    return (
        <div className="container mx-auto px-4 py-8 md:py-10 lg:py-12">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 lg:space-y-10">
                <div>
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        <HeadingIcon className="inline-block mr-2 align-text-top" size={16} />
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        <HashIcon className="inline-block mr-2 align-text-top" size={16} />
                        Description:
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                        <CalendarIcon className="inline-block mr-2 align-text-top" size={16} />
                        Date:
                    </label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                        <MapPinIcon className="inline-block mr-2 align-text-top" size={16} />
                        Location:
                    </label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2">
                        <HashIcon className="inline-block mr-2 align-text-top" size={16} />
                        Capacity (optional):
                    </label>
                    <input
                        type="number"
                        id="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-bold mb-2">
                        <ImageIcon className="inline-block mr-2 align-text-top" size={16} />
                        Thumbnail (optional):
                    </label>
                    <div className={dragAndDropZoneStyle}>
                        <input
                            type="file"
                            id="thumbnail"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="thumbnail" className="cursor-pointer">
                            {thumbnailPreview ? (
                                <img src={thumbnailPreview} alt="Thumbnail Preview" className="max-h-48 mx-auto rounded-md" />
                            ) : (
                                <>
                                    <ImageIcon size={48} className="mx-auto text-gray-500" />
                                    <p className="text-gray-700 text-sm mt-2">Drag & drop an image here or click to browse</p>
                                </>
                            )}
                        </label>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin mr-2 inline-block" size={20} /> // Loading icon and text
                        ) : (
                            'Submit'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;