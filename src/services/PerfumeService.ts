import Api from "../api/AxiosClientApi.ts";

class PerfumeService {
    private http: ReturnType<typeof Api>;

    constructor() {
        this.http = Api();
    }

    async index(){
        const response = await this.http.get('/perfumes/allPerfumes')
        return response.data
    }

    async delete(id: string){
        const response = await this.http.delete(`/perfumes/destroy/${id}`)
        return response.data
    }

}

export default new PerfumeService()