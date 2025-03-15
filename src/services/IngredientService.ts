import Api from "../api/AxiosClientApi.ts";
import {Ingredient} from "../constant.ts";

class IngredientService {
    private http: ReturnType<typeof Api>;

    constructor() {
        this.http = Api();
    }

    async index(){
        const response = await this.http.get('/ingredients')
        return response.data
    }

    async delete(id: string){
        const response = await this.http.delete(`/notes/destroy/${id}`)
        return response.data
    }

    async addMultipleIngredients(data: Ingredient[]) {
        const formData = new FormData();
        data.forEach((ingredient) => {
            formData.append("name", ingredient.name);
            formData.append("color", ingredient.color);
            formData.append("width", ingredient.width);
            formData.append("type", ingredient.type);
            if (ingredient.image instanceof File) {
                formData.append("image", ingredient.image);
            }
        });

        try {
            const response = await this.http.post(`/ingredients`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error uploading ingredients:", error);
            throw error;
        }
    }

}

export default new IngredientService()