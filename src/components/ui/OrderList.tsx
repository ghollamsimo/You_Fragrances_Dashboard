import React, { useState } from "react";
import { Search } from "lucide-react";
import { Ingredient, OrderListProps } from "../../constant.ts";
import { useDispatch } from "react-redux";
import { addMultipleIngredients } from "../../redux/slices/IngredientSlice.ts";
import { AppDispatch } from "../../redux/Store.ts";

const OrderList = ({ ingredients }: OrderListProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newIngredients, setNewIngredients] = useState<Partial<Ingredient>[]>([
        { name: "", color: "", width: "", image: "", type: "" }
    ]);
    const dispatch = useDispatch<AppDispatch>();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewIngredients([{ name: "", color: "", width: "", image: "", type: "" }]);
    };

    const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | File) => {
        const updatedIngredients = [...newIngredients];
        updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
        setNewIngredients(updatedIngredients);
    };

    const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const updatedIngredients = [...newIngredients];
            updatedIngredients[index] = { ...updatedIngredients[index], image: e.target.files[0] };
            setNewIngredients(updatedIngredients);
        }
    };

    const handleAddIngredient = () => {
        setNewIngredients((prev) => [
            ...prev,
            { name: "", color: "", width: "", image: "", type: "" }
        ]);
    };

    const handleSubmit = async () => {
        const invalidIngredients = newIngredients.filter((ingredient) => {
            return !ingredient.name || !ingredient.color || !ingredient.width || !ingredient.type || !ingredient.image;
        });

        if (invalidIngredients.length > 0) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            await dispatch(addMultipleIngredients(newIngredients));
            closeModal();
        } catch (error) {
            console.error("Failed to add ingredients:", error);
            alert("Failed to add ingredients: " + (error.message || "Unknown error"));
        }
    };

    return (
        <div className="bg-gray-900 rounded-lg p-5 overflow-x-auto">
            <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Ingredients List</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by category..."
                        className="bg-gray-800 border-0 rounded-lg py-2 pl-10 pr-4 w-64 text-sm text-white"
                    />
                    <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4"/>
                </div>
                <button
                    onClick={openModal}
                    className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-blue-400"
                >
                    +
                </button>
            </div>

            <table className="w-full border-collapse">
                <thead className="border-b-2 border-gray-700">
                <tr className="text-white">
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Ingredients</th>
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {ingredients?.map((ingredient) => (
                    <tr key={ingredient._id} className="text-white">
                        <td className="p-3 capitalize">{ingredient.type_note}</td>
                        <td className="p-3">{ingredient.name}</td>
                        <td className="p-3">
                            <img className="w-14 h-14" src={ingredient.image} alt={ingredient.name} />
                        </td>
                        <td className="p-3">
                            <button
                                onClick={() => openModal()}
                                className="text-blue-400 underline hover:text-blue-300 text-sm"
                            >
                                Show Details
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg w-3/4 max-w-lg text-white">
                        <h3 className="text-md font-semibold mb-4">Add New Ingredient</h3>

                        {newIngredients.map((ingredient, index) => (
                            <div key={index} className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={ingredient.name || ""}
                                    onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                                    className="bg-gray-700 text-white p-2 rounded-lg w-full mb-3"
                                />
                                <input
                                    type="text"
                                    placeholder="Color (e.g., #FFFFFF)"
                                    value={ingredient.color || ""}
                                    onChange={(e) => handleIngredientChange(index, "color", e.target.value)}
                                    className="bg-gray-700 text-white p-2 rounded-lg w-full mb-3"
                                />
                                <input
                                    type="text"
                                    placeholder="Width (e.g., 50%)"
                                    value={ingredient.width || ""}
                                    onChange={(e) => handleIngredientChange(index, "width", e.target.value)}
                                    className="bg-gray-700 text-white p-2 rounded-lg w-full mb-3"
                                />
                                <input
                                    type="text"
                                    placeholder="Type (e.g., top_note, middle_note)"
                                    value={ingredient.type || ""}
                                    onChange={(e) => handleIngredientChange(index, "type", e.target.value)}
                                    className="bg-gray-700 text-white p-2 rounded-lg w-full mb-3"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(index, e)}
                                    className="bg-gray-700 text-white p-2 rounded-lg w-full mb-3"
                                />
                            </div>
                        ))}

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleAddIngredient}
                                className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
                            >
                                Add Another Ingredient
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderList;
