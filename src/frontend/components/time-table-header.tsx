import React from "react";
import { IconWrapper } from "./icon-wrapper";
import Plus from "../public/plus.svg";
import { addWeekToMonth } from "../lib/services/timeService";
import { useSWRConfig } from "swr";
import { EndPoints } from "../lib/api/axios";

const TimeTableHeader = () => {
  const { mutate } = useSWRConfig();
  const handleAddWeek = async () => {
    await addWeekToMonth("August");
    mutate(`${EndPoints.time}/months`);
  };

  return (
    <div className="flex items-center py-3">
      <div className="py-4">
        <h1 className="text-lg font-bold">August 2022</h1>
      </div>
      <div className="ml-auto mr-5" onClick={handleAddWeek}>
        <IconWrapper>
          <Plus className="text-gray-600 h-5 w-auto" />
        </IconWrapper>
      </div>
    </div>
  );
};

export default TimeTableHeader;
