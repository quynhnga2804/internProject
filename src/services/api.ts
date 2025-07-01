import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-test-web.agiletech.vn',
});

// Gắn accessToken từ localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;

// Xử lý tự refresh token nếu bị 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const res = await axios.post(`${api.defaults.baseURL}/auth/refresh-token`, {
            refreshToken,
          });
          const newAccessToken = res.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        } catch (err) {
          window.location.href = '/auth/login';
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      const newToken = localStorage.getItem('accessToken');
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export const login = async (username: string) => {
  const res = await api.post('/auth/login', { username });
  const { accessToken, refreshToken, username: user } = res.data;

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('username', username);

  return res.data;
};

export const logout = async () => {
  await api.post('/auth/logout');
  localStorage.clear();
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  const res = await api.post('/auth/refresh-token', { refreshToken });
  localStorage.setItem('accessToken', res.data.accessToken);
  return res.data.accessToken;
};

export const getPosts = async (title = '', page = 1) => {
  const res = await api.get('/posts', { params: { title, page } });
  return res.data;
};

export const createPost = async (data: any) => {
  const res = await api.post('/posts', data);
  return res.data;
};

export const updatePost = async (id: string, data: any) => {
  const res = await api.patch(`/posts/${id}`, data);
  return res.data;
};

export const deletePost = async (id: string) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};

export const getTags = async () => {
  const res = await api.get('/posts/tags');
  return res.data;
};

export const getGalleries = async () => {
  const res = await api.get('/galleries');
  return res.data;
};

export default api;
