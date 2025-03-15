import ModalComponent from "./StoringModalComponent";
import React, { useState } from "react";

const BrandModal = ({ onClose, onSave, setIsOpen, isOpen }) => {
    const [brandFields, setBrandFields] = useState({
        name: "",
        imageFile: null,  // Fichier image réel
        imagePreview: "", // Aperçu temporaire
        description: "",
        country: "",
        founded: ""
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setBrandFields((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBrandFields((prev) => ({
                    ...prev,
                    imageFile: file,
                    imagePreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", brandFields.name);
        formData.append("description", brandFields.description);
        formData.append("country", brandFields.country);
        formData.append("founded", brandFields.founded);

        if (!brandFields.imageFile) {
            alert("Please select an image.");
            return;
        }

        formData.append("image", brandFields.imageFile);
        await onSave(formData);
        onClose();
    };


    return (
        <ModalComponent isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Brand">
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={brandFields.name}
                        onChange={handleChange}
                        className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm"
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full" />
                    {brandFields.imagePreview && (
                        <img src={brandFields.imagePreview} alt="Preview" className="mt-2 h-20 w-20 rounded" />
                    )}
                </div>



                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={brandFields.description}
                        onChange={handleChange}
                        className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm"
                    />
                </div>

                {/* Country */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={brandFields.country}
                        onChange={handleChange}
                        className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm"
                    />
                </div>

                {/* Founded Year */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Founded</label>
                    <input
                        type="text"
                        name="founded"
                        value={brandFields.founded}
                        onChange={handleChange}
                        className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm"
                    />
                </div>

                {/* Buttons */}
                <div className="flex space-x-2">
                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">
                        Save
                    </button>
                    <button type="button" onClick={() => setBrandFields({ name: "", image: "", description: "", country: "", founded: "" })} className="px-4 py-2 bg-gray-400 text-white rounded">
                        Reset
                    </button>
                </div>
            </form>
        </ModalComponent>
    );
};

export default BrandModal;
