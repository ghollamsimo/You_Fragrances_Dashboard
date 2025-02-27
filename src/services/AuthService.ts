import Api from "../api/AxiosClientApi.ts";
import {LoginField} from "../constant.ts";

class AuthService {
    private http: ReturnType<typeof Api>;

    constructor() {
        this.http = Api();
    }

    async login(data: LoginField): Promise<{token: string}>{
        const response = await this.http.post('/users/login', data);
        return response.data;     }

    show(id: string){
        return this.http.get(`/users/show/${id}`)
    }

    index(){
        return this.http.get('/users/index')
    }
}

export default new AuthService()