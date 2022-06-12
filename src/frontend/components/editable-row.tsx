import { nanoid } from "nanoid";
import React from "react";
import { FormData } from "./time-table";

type Props = {
  editFormData: FormData;
  handleEditClick?: () => void;
  handleCancelClick?: () => void;
  handleEditFormChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditableRow = ({
  editFormData,
  handleCancelClick,
  handleEditFormChange
}: Props) => {
  const removeKeysThatShouldNotBeRendered = (entry: string) => {
    return entry !== "id" && entry !== "monthId";
  };

  return (
    <tr key={nanoid()}>
      {Object.keys(editFormData)
        .filter(entry => removeKeysThatShouldNotBeRendered(entry))
        .map((day, i) => (
          <>
            {console.log("i got rendered")}
            <td className="px-6 py-4" key={i}>
              <input
                type="number"
                name={day}
                value={editFormData[day as keyof FormData] as number}
                onChange={handleEditFormChange}
              ></input>
            </td>
          </>
        ))}
      {/* TODO: Calculate this */}
      <td className="px-6 py-4">5h</td>
      <td className="px-6 py-4">
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
