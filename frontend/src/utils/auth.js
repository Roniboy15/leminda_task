export const getToken = () => localStorage.getItem('auth_token');

export const saveToken = token => {
  localStorage.setItem('auth_token', token);
};

export const removeToken = () => {
  localStorage.removeItem('auth_token');
};

export const isAuthenticated = () => !!getToken();
