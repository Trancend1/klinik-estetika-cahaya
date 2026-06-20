import { TableHTMLAttributes } from "react";

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
}

function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  className = "",
  ...props
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full text-crm-body ${className}`} {...props}>
        <thead>
          <tr className="border-b border-gray-300 text-left text-gray-500 text-crm-label">
            {columns.map((col) => (
              <th key={col.key} className={`py-3 px-2 font-medium ${col.className || ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className={`border-b border-gray-100 ${onRowClick ? "hover:bg-gray-50 cursor-pointer" : ""}`}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((col) => (
                <td key={col.key} className={`py-3 px-2 ${col.className || ""}`}>
                  {col.render ? col.render(item) : (item as Record<string, unknown>)[col.key] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Table };
export type { Column, TableProps };
