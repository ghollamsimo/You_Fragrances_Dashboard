import { useState, ChangeEvent } from "react";

interface PerfumeData {
    name: string;
    image: File | null;
    brand: string;
    topNotes: string[];
    middleNotes: string[];
    baseNotes: string[];
    TargetAudience: string;
    Volume: string;
    Concentration: string;
    sillage: string;
    Barcode: string;
}

const usePerfumeForm = (initialData?: PerfumeData) => {
    const [perfumeData, setPerfumeData] = useState<PerfumeData>(
        initialData || {
            name: "",
            image: null,
            brand: "",
            topNotes: [],
            middleNotes: [],
            baseNotes: [],
            TargetAudience: "",
            Volume: "",
            Concentration: "",
            sillage: "",
            Barcode: "",
        }
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPerfumeData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNoteChange = (noteType: keyof Pick<PerfumeData, "topNotes" | "middleNotes" | "baseNotes">, ingredientId: string) => {
        setPerfumeData((prev) => {
            const currentNotes = prev[noteType];
            return {
                ...prev,
                [noteType]: currentNotes.includes(ingredientId)
                    ? currentNotes.filter((id) => id !== ingredientId)
                    : [...currentNotes, ingredientId],
            };
        });
    };

    const resetForm = () => {
        setPerfumeData({
            name: "",
            image: null,
            brand: "",
            topNotes: [],
            middleNotes: [],
            baseNotes: [],
            TargetAudience: "",
            Volume: "",
            Concentration: "",
            sillage: "",
            Barcode: "",
        });
    };

    return { perfumeData, setPerfumeData, handleChange, handleNoteChange, resetForm };
};

export default usePerfumeForm;
