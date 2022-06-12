import { Week } from "@prisma/client";
import React from "react";
import { IconWrapper } from "./icon-wrapper";
import EditIcon from "../public/pencil.svg";

type Props = {
  week: Week;
  handleEditClick: (event: React.MouseEvent, week: Week) => void;
  handleDeleteClick?: () => void;
};

const ReadOnlyRow = ({ week, handleEditClick }: Props) => {
  const removeKeysThatShouldNotBeRendered = (entry: string) => {
    return entry !== "id" && entry !== "monthId";
  };
  return (
    <tr key={week.id}>
      {Object.keys(week)
        .filter(entry => removeKeysThatShouldNotBeRendered(entry))
        .map((day, i) => (
          <td className="px-6 py-4" key={i}>
            <p className="font-medium">{week[day as keyof Week]}h</p>
          </td>
        ))}
      {/* TODO: Calculate this */}
      <td className="px-6 py-4">5h</td>
      <td className="px-6 py-4" onClick={event => handleEditClick(event, week)}>
        <IconWrapper>
          <EditIcon className="text-gray-600 h-5 w-auto" alt="Site Title" />
        </IconWrapper>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
