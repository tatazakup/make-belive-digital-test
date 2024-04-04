import React, { useEffect, useMemo, useState } from "react";

export type ColumnProps<T> = {
  title: string;
  dataIndex: string;
  key: keyof T;
  isGroup?: boolean;
  minWidth?: string;
  width?: string;
  renderHeader?: (column: ColumnProps<T>) => React.ReactNode;
  renderItem?: (data: T) => React.ReactNode;
};

type HtmlColumnTag = "th" | "td" | "tr";
type HTMLTableElementType<T extends HtmlColumnTag> = T extends "th"
  ? HTMLTableHeaderCellElement
  : T extends "td"
  ? HTMLTableDataCellElement
  : HTMLTableRowElement;

export const RenderColumn = <T extends {}>(
  props: {
    tag?: HtmlColumnTag;
    column: ColumnProps<T>;
    render: React.ReactNode;
  } & React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement> &
      React.TdHTMLAttributes<HTMLTableDataCellElement> &
      React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableElementType<
      | Extract<HtmlColumnTag, "th">
      | Extract<HtmlColumnTag, "td">
      | Extract<HtmlColumnTag, "tr">
    >
  >
) => {
  const { tag: Tag = "td", column, render, ...rest } = props;
  return (
    <Tag
      key={column.key as string}
      style={{
        width: column.width,
        minWidth: column?.minWidth,
      }}
      {...rest}
    >
      {render}
    </Tag>
  );
};

type RenderHeader<T> = {
  columns: ColumnProps<T>[];
  isDesktop: boolean;
};

export const RenderHeader = <T extends {}>(props: RenderHeader<T>) => {
  const { columns, isDesktop } = props;

  return columns.map((column) => {
    if (column.isGroup && !isDesktop) return null;

    if (column?.renderHeader) return column.renderHeader(column);
    else return <RenderColumn tag="th" column={column} render={column.title} />;
  });
};

type RenderDataRowProps<T> = {
  columns: ColumnProps<T>[];
  dataSource: T[];
  isDesktop: boolean;
  keyGroup: keyof T;
};

export const RenderDataRow = <T extends {}>(props: RenderDataRowProps<T>) => {
  const { columns, dataSource, isDesktop, keyGroup } = props;

  const [keys, setKeys] = useState<string[]>([]);
  const [color, setColor] = useState<Record<string, string>>({});
  const [countKeys, setCountKeys] = useState<Record<string, number>>({});
  const [indexColumnGroup] = useState<number>(
    columns.findIndex((d) => d.isGroup)
  );

  useEffect(() => {
    const k = dataSource.map((d) => d[keyGroup]);
    setKeys(k as string[]);

    const counts = {};
    k.forEach((x, index) => {
      counts[x] = (counts[x] || 0) + 1;
    });
    setCountKeys(counts);

    const colors = {};
    const uniqueTeams = new Set<string>();
    k.forEach((x) => {
      uniqueTeams.add(x as string);
    });
    const uniqueKeys = Array.from(uniqueTeams);
    uniqueKeys.forEach((x, index) => {
      colors[x] = index % 2 === 0 ? "#E5E7EB" : "#D1D5DB";
    });
    setColor(colors);
  }, [dataSource]);

  return dataSource.map((data, indexData) => {
    const bg = color[data[columns[indexColumnGroup].key] as string];
    return (
      <>
        {!isDesktop && indexColumnGroup >= 0 ? (
          <tr
            style={{
              backgroundColor: bg,
            }}
          >
            <RenderColumn
              tag="td"
              column={columns[indexColumnGroup]}
              render={data[columns[indexColumnGroup].key] as string}
              colSpan={Object.keys(columns[0]).length}
            />
          </tr>
        ) : null}
        <tr
          style={{
            backgroundColor: bg,
          }}
        >
          {columns.map((column) => {
            const dataTarget = data[column.key];
            if (column.isGroup) {
              // Render
              if (!isDesktop) return null;
              else {
                if (countKeys[keys[indexData]] > 1) {
                  if (indexData - 1 <= dataSource.length) {
                    if (keys[indexData - 1] === dataTarget) return null;
                  }
                }
                return (
                  <RenderColumn
                    tag="td"
                    column={column}
                    render={dataTarget as string}
                    rowSpan={countKeys[keys[indexData]]}
                  />
                );
              }
            } else if (column?.renderItem) {
              return (
                <RenderColumn
                  tag="td"
                  column={column}
                  render={column.renderItem(data)}
                />
              );
            } else {
              if (typeof dataTarget === "object") return null;
              else
                return (
                  <RenderColumn
                    tag="td"
                    column={column}
                    render={dataTarget as string}
                  />
                );
            }
          })}
        </tr>
      </>
    );
  });
};

export type GroupTableProps<T> = {
  data: T[];
  columns: ColumnProps<T>[];
  keyGroup: keyof T;
};

export const GroupTable = <T extends {}>(props: GroupTableProps<T>) => {
  const { columns, data, keyGroup } = props;

  const [isDesktop] = useState<boolean>(screen.width > 1440);

  return (
    <table>
      <thead>
        <RenderHeader columns={columns} isDesktop={isDesktop} />
      </thead>

      <tbody>
        <RenderDataRow
          columns={columns}
          dataSource={data}
          isDesktop={isDesktop}
          keyGroup={keyGroup}
        />
      </tbody>
    </table>
  );
};
