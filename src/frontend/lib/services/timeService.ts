import api, { EndPoints } from "../api/axios";

export async function createMonth(month: number) {
  const year = new Date().getFullYear();
  return await api.post(`${EndPoints.time}/month`, { monthIndex: month, year });
}
