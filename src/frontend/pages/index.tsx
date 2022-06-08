import type { NextPage } from "next";
import Table from "../components/table/table";
import Modal from "../components/modal";
import { useState } from "react";

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <Table setShowModal={setShowModal} />
      <Modal setShowModal={setShowModal} showModal={showModal} />
    </div>
  );
};

export default Home;
