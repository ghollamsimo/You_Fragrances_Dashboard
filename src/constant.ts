export interface LoginField{
    email: string;
    password: string;
}
export interface Ingredient {
    name: string;
    color: string;
    width: string;
    image: any;
    type : string
}

export interface Note {
    _id: string;
    type: "top_note" | "middle_note" | "base_note";
    category: string;
    ingredients: Ingredient[];
}

export interface OrderListProps {
    notes: Note[];
}