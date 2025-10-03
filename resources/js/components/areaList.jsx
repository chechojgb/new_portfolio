// UsersList.jsx
// import { log } from "console";
import { TableCell, TableRow } from "flowbite-react";
import { Link, usePage  } from '@inertiajs/react'
import { useLoadStatus } from "./context/loadContext";
import { themeByProject } from "./utils/theme";
export default function AreaList({ areas, openModal }) {
  const { props } = usePage();
  const proyecto = props?.auth?.user?.proyecto || 'AZZU';
  const theme = themeByProject[proyecto];
  
  console.log(areas);
  // console.log(totalAreas)
  return (
    <>
      {areas.map(area => (
        <TableRow key={area.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {area.name}
          </TableCell>
          <TableCell>{area.created_at}</TableCell>
          <TableCell>{area.updated_at || 'Sin rol'}</TableCell>
          <TableCell>
            <button className={`${theme.text} font-medium hover:underline cursor-pointer `}  onClick={()=> openModal(area.id)}>
                Editar
            </button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
