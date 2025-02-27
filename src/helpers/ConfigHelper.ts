export const config = (token: string | null = null) => {
    return {
        baseURL: 'http://localhost:8080/',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? {'Authorization': `Bearer ${token}`} : {}),
        },
    }
}