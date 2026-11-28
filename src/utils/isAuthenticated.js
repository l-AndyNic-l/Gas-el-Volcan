export const isAuthenticated = () => {
    const token = localStorage.getItem("token"); // o sessionStorage
    return !!token;
};