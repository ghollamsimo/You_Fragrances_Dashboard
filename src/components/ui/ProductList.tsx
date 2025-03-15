import { useState } from "react";
import DeleteModalComponent from "../DeleteModalComponent.tsx";
import BrandModal from "../BrandModal.tsx";
import BrandUpdateModal from "../BrandUpdateModalComponent.tsx";

const ProductList = ({updateBrand, onSave, brandsData = [], onDeleteBrand }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [storingModal, setStoringModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const normalizedBrands = Array.isArray(brandsData) ? brandsData : [];
    const brandsPerPage = 5;
    const totalPages = Math.ceil(normalizedBrands.length / brandsPerPage);

    const indexOfLastBrand = currentPage * brandsPerPage;
    const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
    const currentBrands = normalizedBrands.slice(indexOfFirstBrand, indexOfLastBrand);

    const handleDeleteClick = (brand) => {
        setSelectedBrand(brand);
        setIsModalOpen(true);
    };

    const handleUpdateClick = (brand) => {
        console.log(brand); // Ensure `brand._id` is valid
        setSelectedBrand(brand);
        setUpdateModal(true);
    };



    const confirmDelete = () => {
        if (selectedBrand) {
            onDeleteBrand(selectedBrand._id);
        }
        setIsModalOpen(false);
        setSelectedBrand(null);

        const updatedTotalPages = Math.ceil((normalizedBrands.length - 1) / brandsPerPage);
        if (currentPage > updatedTotalPages && updatedTotalPages > 0) {
            setCurrentPage(updatedTotalPages);
        }
    };



    return (
        <div className="bg-gray-900 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Trending Brands</h2>
                <button onClick={() => setStoringModal(true)}
                        className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-blue-400">
                    +
                </button>
            </div>

            <div className="space-y-4">
                {currentBrands.length > 0 ? (
                    currentBrands.map((brand, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src={brand.image || "/placeholder.svg"}
                                    alt={brand.name}
                                    className="w-20 h-12 rounded-lg bg-gray-800 object-cover"
                                />
                                <div>
                                    <p className="text-white">{brand.name}</p>
                                    <div className="flex items-center gap-1 my-1">
                                        <p>{brand.description.slice(0, 32)}...</p>
                                    </div>
                                    <p className="text-xs text-gray-400">country • {brand.country}</p>
                                </div>
                            </div>
                            <div className="text-white flex gap-2 font-medium">
                                <button
                                    onClick={() => handleDeleteClick(brand)}
                                    className="px-4 py-1 text-center rounded-lg bg-gray-800 flex items-center justify-center text-blue-400"
                                >
                                    delete
                                </button>
                                <button
                                    onClick={() => handleUpdateClick(brand)}
                                    className="px-4 py-1 text-center rounded-lg bg-gray-800 flex items-center justify-center text-blue-400"
                                >
                                    update
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No brands available.</p>
                )}
            </div>

            {normalizedBrands.length > 5 && (
                <nav className="mt-5 flex justify-end">
                    <ul className="inline-flex -space-x-px text-sm">
                        <li>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight rounded-s-lg 
                  ${
                                    currentPage === 1
                                        ? "text-gray-400 bg-gray-700 cursor-not-allowed"
                                        : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                                }`}
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`flex items-center justify-center px-3 h-8 leading-tight 
                    ${
                                        currentPage === index + 1
                                            ? "bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                            : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                }
                                disabled={currentPage === totalPages}
                                className={`flex items-center justify-center px-3 h-8 rounded-e-lg 
                  ${
                                    currentPage === totalPages
                                        ? "text-gray-400 bg-gray-700 cursor-not-allowed"
                                        : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                                }`}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}

            {isModalOpen && (
                <DeleteModalComponent
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={confirmDelete}
                    title="Delete Brand"
                    message={`Are you sure you want to delete "${selectedBrand?.name}"?`}
                />
            )}
            {storingModal && <BrandModal onClose={() => setStoringModal(false)} setIsOpen={setStoringModal} isOpen={storingModal}
                                         onSave={onSave}/>}
            {updateModal &&<BrandUpdateModal
                onClose={() => setUpdateModal(false)}
                setIsOpen={setUpdateModal}
                isOpen={updateModal}
                brand={selectedBrand}
                onSave={updateBrand}

            />}

        </div>
    );
};

export default ProductList;