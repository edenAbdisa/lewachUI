import React, { useMemo,useState } from 'react'
import { useTable,useSortBy, useRowSelect,usePagination,useFilters, useGlobalFilter  } from 'react-table'
import './table.css'
import { Checkbox } from './Checkbox' 
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
const   RowSelection = (props) => {
  const columns = useMemo(() => props.column, [props.column])
  const data = useMemo(()=>props.data,[props.data]);
  const [selectedRow,setSelectedRow]= useState([]);
  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,  
    prepareRow,
    rows,
    allColumns,
    selectedFlatRows,
    getToggleHideAllColumnsProps,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 },
      defaultColumn
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
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
  const {globalFilter, pageIndex, pageSize } = state
  const handleEdit = e => {    
      if (props.edit) {
        if(-1 !== Object.values(selectedFlatRows).findIndex( v => v == null || v === "")){
          
        
        props.edit(selectedFlatRows[0].values); 
      }
      }
  }
  const handleDelete = e => {    
    if (props.delete) { 
      if(-1 !== Object.values(selectedFlatRows).findIndex( v => v == null || v === "")){
      
        
      props.delete(selectedFlatRows[0].values);
      }
    }
} 
  return (
    <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
     
    <div style={{display:'flex'}}>
        <div style={{marginRight:5}} >
          <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
        </div>
        {allColumns.map(column => (
          <div key={column.id} style={{marginRight:5}} >
            <label>
              <input type='checkbox' {...column.getToggleHiddenProps()} />{' '}
              {column.Header}
            </label>
          </div>
        ))}
        <br />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <TiArrowSortedDown/>
                        : <TiArrowSortedUp/>
                      : ''}
                  </span>
                </th>
              ))}
              <th  onClick={handleEdit}><AiOutlineEdit/></th> 
              <th onClick={handleDelete}><AiOutlineDelete/></th> 
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
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
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}>
          {[5, 25, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
};
export default RowSelection