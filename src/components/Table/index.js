import React, { useMemo,useState } from 'react'
import { useTable, useRowSelect } from 'react-table'
import './table.css'
import { Checkbox } from './Checkbox' 
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const   RowSelection = (props) => {
  const columns = useMemo(() => props.column, [])
  const data = props.data;
  const [selectedRow,setSelectedRow]= useState([]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
        },
        ...columns
      ])
    }
  )
  const handleEdit = e => {    
      if (props.edit) {
        props.edit(selectedFlatRows[0].values);
      }
  }
  const handleDelete = e => {    
    if (props.delete) {
      props.delete(selectedFlatRows[0].values);
    }
}
  const firstPageRows = rows.slice(0, 10)

  return (
    <>
      <table {...getTableProps()}>
        <thead>

          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
              <th  onClick={handleEdit}><AiOutlineEdit/></th> 
              <th onClick={handleDelete}><AiOutlineDelete/></th> 
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })} 
              </tr>
            )
          })}
        </tbody>
      </table>
      <pre>
        <code>
          {  
                  
          //JSON.stringify(
            //{
              selectedFlatRows.map(
                row =>row.name
                )
                
               
           // },
            //null,
            //2
          //)
          }
        </code>
      </pre>
    </>
  )
};
export default RowSelection