export const config = (token: string | null = null) => {
    return {
        baseURL: 'http://192.168.1.116:8080/',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? {'Authorization': `Bearer ${token}`} : {}),
        },
    }
}