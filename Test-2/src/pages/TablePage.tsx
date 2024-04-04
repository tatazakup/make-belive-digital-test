import { RawData } from "@constants/RawData";
import { ColumnProps, GroupTable } from "@components/Table/GroupTable";
import { useEffect, useState } from "react";

type DataSourceProps = {
  team: string;
  day: string;
  startAt: string;
  endAt: string;
  hall: string;
};

const Columns: ColumnProps<DataSourceProps>[] = [
  {
    title: "Team",
    dataIndex: "team",
    key: "team",
    isGroup: true,
  },
  {
    title: "Day",
    dataIndex: "day",
    key: "day",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "day",
    renderItem: (d) => (
      <div className="flex gap-1 items-center desktop:justify-center">
        <div className="bg-gray-500 text-white w-fit px-2 rounded-xl">
          {d.startAt}
        </div>
        -
        <div className="bg-gray-500 text-white w-fit px-2 rounded-xl">
          {d.endAt}
        </div>
      </div>
    ),
  },
  {
    title: "Hall",
    dataIndex: "hall",
    key: "hall",
  },
];

export const TablePage = () => {
  const [dataSource, setDataSource] = useState<DataSourceProps[]>([]);

  useEffect(() => {
    let data: DataSourceProps[] = [];
    RawData.forEach((row) => {
      row.days.forEach((day) => {
        return data.push({
          team: row.team,
          day: day.day,
          startAt: day.startAt,
          endAt: day.endAt,
          hall: day.hall,
        });
      });
    });

    setDataSource(data);
  }, []);

  return (
    <div className="w-dvw">
      <GroupTable columns={Columns} data={dataSource} keyGroup="team" />
    </div>
  );
};
