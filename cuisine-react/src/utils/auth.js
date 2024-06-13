export function isAuthenticated() {
    return localStorage.getItem('access_token') !== null;
}

export function getAuthHeader() {
    const token = localStorage.getItem('access_token');
    return { Authorization: `Bearer ${token}` };
}

export function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}
