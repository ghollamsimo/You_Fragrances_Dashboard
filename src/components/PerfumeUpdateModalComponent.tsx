import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store.ts";
import ModalComponent from "./StoringModalComponent";
import usePerfumeForm from "../hooks/usePerfumeForm.ts";
import { allBrands } from "../redux/slices/BrandSlice.ts";

const initialData = {
    name: "",
    brand: "",
    image: null,
    topNotes: [],
    middleNotes: [],
    baseNotes: [],
    TargetAudience: "Women",
    Volume: "",
    Barcode: "",
    Concentration: "",
    sillage: "",
};

const PerfumeUpdateModalComponent = ({ onClose, onSave, setIsOpen, isOpen, perfume }) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(allBrands());
    }, [dispatch]);

    const brands = useSelector((state: RootState) => state.brands.brandsData);
    const notes = useSelector((state: RootState) => state.ingredients.notesData);

    const { perfumeData, handleChange, handleNoteChange, setPerfumeData, resetForm } = usePerfumeForm(initialData);

    useEffect(() => {
        if (perfume && typeof perfume === "object") {
            setPerfumeData({
                name: perfume.name || "",
                brand: perfume.brand || "",
                Concentration: perfume.Concentration || "",
                sillage: perfume.sillage || "",
                image: null,
                topNotes: perfume.topNotes || [],
                middleNotes: perfume.middleNotes || [],
                baseNotes: perfume.baseNotes || [],
                TargetAudience: perfume.TargetAudience || "Women",
                Volume: perfume.Volume || "",
                Barcode: perfume.Barcode || "",
            });
        }
    }, [perfume, setPerfumeData]);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPerfumeData((prev) => ({
                ...prev,
                image: file,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        Object.entries(perfumeData).forEach(([key, value]) => {
            if (key === "image") return;
            if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });

        if (perfumeData.image instanceof File) {
            formData.append("image", perfumeData.image);
        }

        await onSave(perfume?._id || "", formData);
        resetForm();
        onClose();
    };

    const topNotesIngredients = notes.filter((note) => note.type === "top_note");
    const middleNotesIngredients = notes.filter((note) => note.type === "middle_note");
    const baseNotesIngredients = notes.filter((note) => note.type === "base_note");

    return (
        <ModalComponent isOpen={isOpen} onClose={() => setIsOpen(false)} title="Update Perfume">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" value={perfumeData.name} onChange={handleChange}
                           className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input type="file" name="image" onChange={handleFileChange} className="mt-1 block w-full" />
                    {perfumeData.image && (
                        <img src={URL.createObjectURL(perfumeData.image)} alt="Preview"
                             className="mt-2 h-20 w-20 rounded" />
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Brand</label>
                    <select name="brand" value={perfumeData.brand} onChange={handleChange}
                            className="mt-1 block w-full bg-transparent border border-gray-300 rounded-lg shadow-sm">
                        <option value="">Select a brand</option>
                        {brands?.map((brand) => (
                            <option key={brand._id} value={brand._id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>
                {["topNotes", "middleNotes", "baseNotes"].map((noteType) => (
                    <div key={noteType}>
                        <label className="block text-sm font-medium text-gray-700">
                            {noteType.replace("Notes", " Notes")}
                        </label>
                        <div className="mt-1 grid grid-cols-2 gap-2">
                            {(noteType === "topNotes" ? topNotesIngredients :
                                noteType === "middleNotes" ? middleNotesIngredients :
                                    baseNotesIngredients).map((ingredient) => (
                                <label key={ingredient._id} className="flex items-center space-x-2">
                                    <input type="checkbox" checked={perfumeData[noteType].includes(ingredient._id)}
                                           onChange={() => handleNoteChange(noteType, ingredient._id)}
                                           className="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                                    <span>{ingredient.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Concentration</label>
                    <input type="text" name="Concentration" value={perfumeData.Concentration} onChange={handleChange}
                           className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sillage</label>
                    <input type="text" name="sillage" value={perfumeData.sillage} onChange={handleChange}
                           className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Target Audience</label>
                    <select name="TargetAudience" value={perfumeData.TargetAudience} onChange={handleChange}
                            className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm">
                        <option value="Women">Women</option>
                        <option value="Man">Man</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Volume (ml)</label>
                    <input type="text" name="Volume" value={perfumeData.Volume} onChange={handleChange}
                           className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Barcode</label>
                    <input type="text" name="Barcode" value={perfumeData.Barcode} onChange={handleChange}
                           className="mt-1 block bg-transparent w-full border border-gray-300 rounded-lg shadow-sm" />
                </div>
                <div className="flex space-x-2">
                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">Save</button>
                    <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-400 text-white rounded">Reset</button>
                </div>
            </form>
        </ModalComponent>
    );
};

export default PerfumeUpdateModalComponent;
