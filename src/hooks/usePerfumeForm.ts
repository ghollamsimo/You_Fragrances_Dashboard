import { useState, ChangeEvent } from "react";

interface PerfumeData {
    name: string;
    image: string;
    brand: string;
    topNotes: string[]; // Array of selected ingredient names
    middleNotes: string[];
    baseNotes: string[];
    TargetAudience: string;
    Volume: string;
    Concentration: string;
    sillage: string;
}

const usePerfumeForm = (initialData?: PerfumeData) => {
    const [perfumeData, setPerfumeData] = useState<PerfumeData>(
        initialData || {
            name: "",
            image: "",
            brand: "",
            topNotes: [],
            middleNotes: [],
            baseNotes: [],
            TargetAudience: "",
            Volume: "",
            Concentration: "",
            sillage: "",
        }
    );

    // Handle text/select input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPerfumeData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle checkbox changes for notes
    const handleNoteChange = (noteType: keyof Pick<PerfumeData, "topNotes" | "middleNotes" | "baseNotes">, ingredientName: string) => {
        setPerfumeData((prev) => {
            const currentNotes = prev[noteType];
            if (currentNotes.includes(ingredientName)) {
                // Remove if already selected
                return { ...prev, [noteType]: currentNotes.filter((name) => name !== ingredientName) };
            } else {
                // Add if not selected
                return { ...prev, [noteType]: [...currentNotes, ingredientName] };
            }
        });
    };

    const resetForm = () => {
        setPerfumeData({
            name: "",
            image: "",
            brand: "",
            topNotes: [],
            middleNotes: [],
            baseNotes: [],
            TargetAudience: "",
            Volume: "",
            Concentration: "",
            sillage: "",
        });
    };

    return { perfumeData, setPerfumeData, handleChange, handleNoteChange, resetForm };
};

export default usePerfumeForm;