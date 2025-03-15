import Api from "../api/AxiosClientApi.ts";

class BrandService {
    private http: ReturnType<typeof Api>;

    constructor() {
        this.http = Api();
    }

    async index(){
        const response = await this.http.get('/brand/index')
        return response.data
    }

    async delete(id: string){
        const response = await this.http.delete(`/brand/destroy/${id}`)
        return response.data
    }

    async storeBrand(data: any){
        const response = await this.http.post(`/brand/store`, data ,{ headers: {
                "Content-Type": "multipart/form-data",
            },})
        return response.data
    }

    async updateBrand(id: string, data :any){
        const response = await this.http.patch(`/brand/update/${id}`, data, { headers: {
                "Content-Type": "multipart/form-data",
            },})
        console.log('ududud', response.data)
        return response.data
    }
}

export default new BrandService()