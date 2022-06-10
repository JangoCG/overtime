import api from "../api/axios";

export const fetcher = (url: string) => api.get(url).then(res => res.data);
