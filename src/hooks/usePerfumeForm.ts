import { useState, ChangeEvent } from "react";

// Define a TypeScript interface for the perfume data structure
interface PerfumeData {
    name: string;
    image: string;
    brand: string;
    topNotes: string[];
    middleNotes: string[];
    baseNotes: string[];
    TargetAudience: string;
    Volume: string;
    Concentration: string;
    sillage: string;
}

// Define the hook
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

    // Handle input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPerfumeData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Reset the form
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

    return { perfumeData, setPerfumeData, handleChange, resetForm };
};

export default usePerfumeForm;
