import ModalComponent from "./StoringModalComponent";
import usePerfumeForm from "../hooks/usePerfumeForm.ts";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store.ts";

const PerfumeModal = ({ onClose, onSave, setIsOpen, isOpen, initialData }) => {
    const { perfumeData, handleChange, handleNoteChange, setPerfumeData, resetForm } = usePerfumeForm(initialData);
    const notes = useSelector((state: RootState) => state.notes.notesData);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPerfumeData((prev) => ({
                ...prev,
                image: URL.createObjectURL(e.target.files[0]),
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(perfumeData);
        resetForm();
        onClose();
    };

    const topNotesIngredients = notes
        .filter((note) => note.type === "top_note")
        .flatMap((note) => note.ingredients);
    const middleNotesIngredients = notes
        .filter((note) => note.type === "middle_note")
        .flatMap((note) => note.ingredients);
    const baseNotesIngredients = notes
        .filter((note) => note.type === "base_note")
        .flatMap((note) => note.ingredients);

    return (
        <ModalComponent isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Perfume">
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={perfumeData.name}
                        onChange={handleChange}
                        className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm"
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input type="file" name="image" onChange={handleFileChange} className="mt-1 block w-full" />
                    {perfumeData.image && (
                        <img src={perfumeData.image} alt="Preview" className="mt-2 h-20 w-20 rounded" />
                    )}
                </div>

                {/* Brand */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={perfumeData.brand}
                        onChange={handleChange}
                        className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm"
                    />
                </div>

                {/* Notes with Checkboxes */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Top Notes</label>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                        {topNotesIngredients.map((ingredient) => (
                            <label key={ingredient.name} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={perfumeData.topNotes.includes(ingredient.name)}
                                    onChange={() => handleNoteChange("topNotes", ingredient.name)}
                                    className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                                />
                                <span>{ingredient.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Middle Notes</label>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                        {middleNotesIngredients.map((ingredient) => (
                            <label key={ingredient.name} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={perfumeData.middleNotes.includes(ingredient.name)}
                                    onChange={() => handleNoteChange("middleNotes", ingredient.name)}
                                    className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                                />
                                <span>{ingredient.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Base Notes</label>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                        {baseNotesIngredients.map((ingredient) => (
                            <label key={ingredient.name} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={perfumeData.baseNotes.includes(ingredient.name)}
                                    onChange={() => handleNoteChange("baseNotes", ingredient.name)}
                                    className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                                />
                                <span>{ingredient.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Target Audience */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Target Audience</label>
                    <select
                        name="TargetAudience"
                        value={perfumeData.TargetAudience}
                        onChange={handleChange}
                        className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm"
                    >
                        <option value="Women">Women</option>
                        <option value="Man">Man</option>
                        <option value="UniSex">Unisex</option>
                    </select>
                </div>

                {/* Volume */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Volume (ml)</label>
                    <input
                        type="text"
                        name="Volume"
                        value={perfumeData.Volume}
                        onChange={handleChange}
                        className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm"
                    />
                </div>

                {/* Concentration */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Concentration</label>
                    <select
                        name="Concentration"
                        value={perfumeData.Concentration}
                        onChange={handleChange}
                        className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm"
                    >
                        <option value="Eau de Parfum">Eau de Parfum</option>
                        <option value="Eau de Toilette">Eau de Toilette</option>
                        <option value="Extrait de Parfum">Extrait de Parfum</option>
                    </select>
                </div>

                {/* Sillage */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sillage</label>
                    <select
                        name="sillage"
                        value={perfumeData.sillage}
                        onChange={handleChange}
                        className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm"
                    >
                        <option value="Soft">Soft</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Heavy">Heavy</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex space-x-2">
                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">
                        Save
                    </button>
                    <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-400 text-white rounded">
                        Reset
                    </button>
                </div>
            </form>
        </ModalComponent>
    );
};

export default PerfumeModal;