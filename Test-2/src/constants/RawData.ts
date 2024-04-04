export type RawDataProps = {
  team: string;
  days: {
    day: string;
    hall: string;
    startAt: string;
    endAt: string;
  }[];
};

export const RawData: RawDataProps[] = [
  {
    team: "U8 mix",
    days: [
      {
        day: "Friday",
        hall: "Deusterschule Kitzingen",
        startAt: "15:30",
        endAt: "16:45",
      },
    ],
  },
  {
    team: "U10 mix",
    days: [
      {
        day: "Friday",
        hall: "Deusterschule Kitzingen",
        startAt: "17:00",
        endAt: "18:30",
      },
      {
        day: "Friday",
        hall: "Deusterschule Kitzingen",
        startAt: "16:45",
        endAt: "18:15",
      },
    ],
  },
  {
    team: "U12 mix",
    days: [
      {
        day: "Thursday",
        hall: "Mainstockheim",
        startAt: "17:35",
        endAt: "18:45",
      },
      {
        day: "Thursday",
        hall: "Mainstockheim",
        startAt: "11:00",
        endAt: "12:30",
      },
    ],
  },
];
