import { ReactNode } from 'react';

export const Table = <Key extends string>(props: {
  columns: { key: Key; label: ReactNode }[];
  rows: (Record<Key, ReactNode> & { id: string | number })[];
}) => {
  return (
    <table className="w-full bg-white border border-gray-300">
      <thead>
        <tr>
          {props.columns.map(({ key, label }) => (
            <th className="py-2 px-4 border-b" key={key}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row) => (
          <tr key={row.id}>
            {props.columns.map(({ key }) => (
              <td className="py-2 px-4 border-b" key={key}>
                {row[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
