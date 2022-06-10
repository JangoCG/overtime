import { useSWRConfig } from "swr";
import api, { EndPoints } from "../api/axios";

export async function createMonth(month: number) {
  const year = new Date().getFullYear();
  return await api.post(`${EndPoints.time}/month`, { monthIndex: month, year });
}

export const addWeekToMonth = async (monthName: string) => {
  const year = new Date().getFullYear();
  await api.patch(`${EndPoints.time}/month/${monthName}/${year}`, {
    monday: 6,
    tuesday: 4,
    wednesday: 9,
    thursday: 10,
    friday: 10
  });
};

