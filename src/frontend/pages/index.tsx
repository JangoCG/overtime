import { Month, Week } from "@prisma/client";
import type { NextPage } from "next";
import { useState } from "react";
import useSWR from "swr";
import Modal from "../components/modal";
import Table from "../components/table/table";
import { EndPoints } from "../lib/api/axios";
import { fetcher } from "../lib/api/fetcher";

const mockMonth: MonthDto = {
  id: 21,
  name: "July",
  year: 2022,
  weeks: [
    {
      id: 1,
      monday: 8,
      tuesday: 5,
      wednesday: 6,
      thursday: 5,
      friday: 6,
      totalHours: 30,
      monthId: 1
    }
  ]
};
export type MonthDto = Month & {
  weeks: Week[];
};
const Home: NextPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data: months, error } = useSWR<MonthDto[]>(
    `${EndPoints.time}/months`,
    fetcher
  );

  if (!months) {
    return <pre>loading</pre>;
  }

  return (
    <div>
      {months.map(month => (
        <Table key={month.id} setShowModal={setShowModal} month={month} />
      ))}

      <Modal setShowModal={setShowModal} showModal={showModal} />
    </div>
  );
};

export default Home;
