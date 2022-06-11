import React, { Dispatch, SetStateAction, useState } from "react";
import { IconWrapper } from "./icon-wrapper";
import Logo from "../public/pencil.svg";
import { MonthDto } from "../../shared/dto/MonthDto";
import TimeTableHeader from "./time-table-header";
import { Week } from "@prisma/client";

type TimeTableProps = {
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  month: MonthDto;
};

const TimeTable = ({ month }: TimeTableProps) => {
  const removeKeysThatShouldNotBeRendered = (entry: string) => {
    return entry !== "id" && entry !== "monthId";
  };

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null
  });

  const [unitPrice, setUnitPrice] = useState(null);

  const onEdit = ({ id, currentUnitPrice }) => {
    setInEditMode({
      status: true,
      rowKey: id
    });
    setUnitPrice(currentUnitPrice);
  };

  /**
   *
   * @param id
   * @param newUnitPrice
   */
  const updateInventory = ({ id, newUnitPrice }) => {
    fetch(`${INVENTORY_API_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        unit_price: newUnitPrice
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        // reset inEditMode and unit price state values
        onCancel();

        // fetch the updated data
        fetchInventory();
      });
  };

  /**
   *
   * @param id -The id of the product
   * @param newUnitPrice - The new unit price of the product
   */
  const onSave = ({ id, newUnitPrice }) => {
    updateInventory({ id, newUnitPrice });
  };

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null
    });
    // reset the unit price state value
    setUnitPrice(null);
  };

  return (
    <div className="flex flex-col">
      <TimeTableHeader />
      <div className="shadow border-b border-gray-200 rounded-lg">
        <table className="w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50 text-gray-500">
            <tr className="font-normal">
              <th className="px-8 text-left font-medium tracking-wide py-2 uppercase text-xs">
                Monday
              </th>
              <th className="px-8 text-left font-medium tracking-wide py-2 uppercase text-xs">
                Tuesday
              </th>
              <th className="px-8 text-left tracking-wide py-2 uppercase text-xs">
                Wednesday
              </th>
              <th className="px-8 text-left tracking-wide py-2 uppercase text-xs">
                Thursday
              </th>
              <th className="px-8 text-left tracking-wide py-2 uppercase text-xs">
                Friday
              </th>
              <th className="px-8 text-left tracking-wide py-2 uppercase text-xs">
                Total Hours
              </th>
              <th className="px-8 text-left tracking-wide py-2 uppercase text-xs">
                Overtime
              </th>
              <th className="px-8 text-left tracking-wide py-2 uppercase text-xs">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="divide-gray-200 divide-y">
            {month.weeks.map(week => (
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
                <td className="px-6 py-4">
                  <IconWrapper>
                    <Logo
                      className="text-gray-600 h-5 w-auto"
                      alt="Site Title"
                    />
                  </IconWrapper>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
