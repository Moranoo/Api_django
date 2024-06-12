export function isAuthenticated() {
    return localStorage.getItem('access_token') !== null;
}

export function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}
