import { useState } from "react";
import { Search } from "lucide-react";
import DeleteModalComponent from "../DeleteModalComponent.tsx";
import PerfumeModal from "../PerfumeModal.tsx";

const PerfumeTable = ({ perfumes , onDeletePerfume}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [storing, setStoring] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPerfume, setSelectedPerfume] = useState(null);
    const handleDeleteClick = (perfume) => {
        setSelectedPerfume(perfume);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (selectedPerfume) {
            onDeletePerfume(selectedPerfume._id);
        }
        setIsModalOpen(false);
    };
    const itemsPerPage = 3;

    const filteredPerfumes = Array.isArray(perfumes)
        ? perfumes.filter(perfume =>
            perfume.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];


    const totalPages = Math.ceil(filteredPerfumes.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPerfumes = [...filteredPerfumes].slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="bg-gray-900 rounded-lg p-5">
            <div className='flex justify-between'>
                <h2 className="text-xl font-bold text-white mb-6">Perfume List</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="bg-gray-800 border-0 rounded-lg py-2 pl-10 pr-4 w-64 text-sm text-white"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                </div>
                <button onClick={() => setStoring(true)} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-blue-400">
                    +
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm bg-transparent text-white rounded-lg">
                    <thead>
                    <tr className="bg-transparent border-b-2 border-b-gray-700">
                        <th className="p-3 text-left">Image</th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Brand</th>
                        <th className="p-3 text-left">Volume</th>
                        <th className="p-3 text-left">Concentration</th>
                        <th className="p-3 text-left">Sillage</th>
                        <th className="p-3 text-left">Rating</th>
                        <th className="p-3 text-left">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPerfumes.length > 0 ? (
                        currentPerfumes.map((perfume) => (
                            <tr key={perfume._id} className="border-b border-gray-700">
                                <td className="p-3">
                                    <img src={perfume.image} alt={perfume.name}
                                         className="w-16 h-16 object-cover rounded"/>
                                </td>
                                <td className="p-3">{perfume.name}</td>
                                <td className="p-3 flex items-center gap-2">
                                    {/*<img src={perfume.brand.image} alt={perfume.brand.name} className="w-8 h-8 object-cover rounded-full" />*/}
                                    {perfume.brand.name}
                                </td>
                                <td className="p-3">{perfume.Volume}</td>
                                <td className="p-3">{perfume.Concentration}</td>
                                <td className="p-3">{perfume.sillage}</td>
                                <td className="p-3">{perfume.averageRating}</td>
                                <td className="p-3">
                                    <button onClick={() => handleDeleteClick(perfume)}
                                            className="px-4 py-1 text-center rounded-lg bg-gray-800 flex items-center justify-center text-blue-400"
                                    >
                                        delete
                                    </button>
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="7" className="text-center p-5 text-gray-400">
                                No perfumes found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <nav className="mt-5 flex justify-end">
                    <ul className="inline-flex -space-x-px text-sm">
                        <li>
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight   rounded-s-lg 
                                ${currentPage === 1 ? "text-gray-400 bg-gray-700 cursor-not-allowed" : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"}`}
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`flex items-center justify-center px-3 h-8 leading-tight 
                                    ${currentPage === index + 1
                                        ? " bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                        : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`flex items-center justify-center px-3 h-8  rounded-e-lg 
                                ${currentPage === totalPages ? "text-gray-400 bg-gray-700 cursor-not-allowed" : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"}`}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}

            <DeleteModalComponent
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Perfume"
                message={`Are you sure you want to delete "${selectedPerfume?.name}"?`}
            />
            {storing && <PerfumeModal onClose={() => setStoring(false)} onSave={undefined} setIsOpen={setStoring}
                                      isOpen={storing} initialData={undefined} />}
        </div>
    );
};

export default PerfumeTable;
