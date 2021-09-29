import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useRowSelect,
  usePagination,
  useFilters,
  useGlobalFilter,
} from "react-table";
import "./table.css"; 
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { AiOutlineFolderView } from "react-icons/ai";

import { FcApprove } from "react-icons/fc";  
const RowSelection = (props) => {
  const columns = useMemo(() => props.column, [props.column]);
  const data = useMemo(() => props.data, [props.data]);
  //const [selectedRow,setSelectedRow]= useState([]);
  
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows, 
    selectedFlatRows, 
    state, 
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 15 } 
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect

    
  ); 
  const handleEdit = (e) => {
    if (props.edit) {  
      if (selectedFlatRows.length===0){}else{props.edit(selectedFlatRows[0].values);}
    }
  };
  const handleDelete = (e) => {
    if (props.delete) {
      if (selectedFlatRows.length===0) {
        
      }else{
        props.delete(selectedFlatRows[0].values);
      }
    }
  };
  const handleApprove = (e) => {
    if (props.approve) {
      if (selectedFlatRows.length===0) {
       
      }else{
        props.approve(selectedFlatRows[0].values);
      }
    }
  };
  const handleView = (e) => {
    if (props.view) {
      if (selectedFlatRows.length===0) {
       
      }else{
        props.view(selectedFlatRows[0].values);
      }
    }
  };
  return (
    <> 
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              { props.showButton? (<>
              <th onClick={handleEdit} data-cy="editSelectedItem">
                <AiOutlineEdit />
              </th>
              <th onClick={handleDelete} data-cy="deleteSelectedItem">
                <AiOutlineDelete />
              </th></>):null
              }
              { props.showApprove? (<>
              <th onClick={handleApprove} data-cy="approveSelectedItem">
                <FcApprove />
              </th>
              </>):null
              }
              { props.showRemove? (<>
                <th onClick={handleView} data-cy="viewSelectedItem">
                <AiOutlineFolderView/>
              </th> 
              </>):null
              }

              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}                  
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TiArrowSortedDown />
                      ) : (
                        <TiArrowSortedUp />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                 
                </th>
              ))}
              
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                <>
                {props.showButton? (<>
                      <td onClick={()=>props.edit(row.values)} data-cy="editSelectedItem">
                        <AiOutlineEdit />
                      </td>
                      <td onClick={()=>props.delete(row.values)} data-cy="deleteSelectedItem">
                        <AiOutlineDelete />
                      </td></>):null
                      }
                      { props.showApprove? (<>
                      <td onClick={()=>props.approve(row.values)} data-cy="approveSelectedItem">
                        <FcApprove />
                      </td>
                      </>):null
                      }
                      { props.showRemove? (<>
                        <td onClick={()=>props.view(row.values)} data-cy="viewSelectedItem">
                        <AiOutlineFolderView/>
                      </td> 
                      </>):null
                      }
                      </>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>                    
                  );
                })}

              </tr>
            );
          })}
        </tbody>
      </table>
      
    </>
  );
};
export default RowSelection;
