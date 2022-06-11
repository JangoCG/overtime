import React from "react";
import useSWR from "swr";
import { MonthDto } from "../../shared/dto/MonthDto";
import TimeTable from "../components/time-table";
import { EndPoints } from "../lib/api/axios";
import { fetcher } from "../lib/api/fetcher";

const TimeTracking = () => {
  const { data: months, error } = useSWR<MonthDto[]>(
    `${EndPoints.time}/months`,
    fetcher
  );

  if (!months) {
    return <pre>loading</pre>;
  }
  return (
    <>
      {months.map(month => (
        <TimeTable key={month.id} month={month} />
      ))}
    </>
  );
};

export default TimeTracking;
