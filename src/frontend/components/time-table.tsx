import React, { Dispatch, SetStateAction, useState } from "react";
import { IconWrapper } from "./icon-wrapper";
import Logo from "../public/pencil.svg";
import { MonthDto } from "../../shared/dto/MonthDto";
import TimeTableHeader from "./time-table-header";
import { Week } from "@prisma/client";
import { updateWeekOfMonth } from "../lib/services/timeService";
import { useSWRConfig } from "swr";
import { EndPoints } from "../lib/api/axios";
import { prettyJson } from "../lib/services/prettyJson";

type TimeTableProps = {
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  month: MonthDto;
};

export type WeekForm = {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
};

const TimeTable = ({ month }: TimeTableProps) => {
  const removeKeysThatShouldNotBeRendered = (entry: string) => {
    return entry !== "id" && entry !== "monthId";
  };

  const { mutate } = useSWRConfig();

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null
  });

  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [formDataState, setFormDataState] = React.useState<WeekForm>({
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0
  });

  function handleChange(evt) {
    console.log("event", evt.target.name);
    const value = evt.target.value;
    setFormDataState({
      ...formDataState,
      [evt.target.name]: Number(value)
    });
  }

  const onEdit = (week: Week) => {
    setInEditMode({
      status: true,
      rowKey: week.id
    });
    setUnitPrice(5);
    setFormDataState({
      monday: week.monday || 0,
      tuesday: week.tuesday || 0,
      wednesday: week.wednesday || 0,
      thursday: week.thursday || 0,
      friday: week.friday || 0
    });
  };

  /**
   *
   * @param id
   * @param newUnitPrice
   */
  const updateInventory = async ({ id, newUnitPrice }) => {
    await updateWeekOfMonth(id, formDataState);
    mutate(`${EndPoints.time}/months`);
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
    setFormDataState(null);
  };

  return (
    <div className="flex flex-col">
      <TimeTableHeader />
      <div className="shadow border-b border-gray-200 rounded-lg">
        <pre>{prettyJson(formDataState)}</pre>
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
                      {inEditMode.status && inEditMode.rowKey === week.id ? (
                        <input
                          type="number"
                          value={formDataState[day as keyof WeekForm] || 0}
                          name={day}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="font-medium">
                          {week[day as keyof Week]}h
                        </p>
                      )}
                    </td>
                  ))}
                {/* TODO: Calculate this */}
                <td className="px-6 py-4">5h</td>
                <td className="px-6 py-4">
                  {inEditMode.status && inEditMode.rowKey === week.id ? (
                    <React.Fragment>
                      <button
                        className={"btn-success"}
                        onClick={() =>
                          onSave({ id: week.id, newUnitPrice: unitPrice })
                        }
                      >
                        Save
                      </button>
                      <button
                        className={"btn-secondary"}
                        style={{ marginLeft: 8 }}
                        onClick={() => onCancel()}
                      >
                        Cancel
                      </button>
                    </React.Fragment>
                  ) : (
                    <button
                      className={"btn-primary"}
                      onClick={() => onEdit(week)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                {/* <td className="px-6 py-4">
                  <IconWrapper>
                    <Logo
                      className="text-gray-600 h-5 w-auto"
                      alt="Site Title"
                    />
                  </IconWrapper>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
