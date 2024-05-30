import React from 'react'
import "./TableTablesAdmin.scss"
import {Table,Button,Icon} from "semantic-ui-react"
import {map} from "lodash"
export  function TableTablesAdmin(props) {
    const {tables,updateTable,onDeleteTable} =props
  return (
    <Table className='table-tables-admin'>
    <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Number</Table.HeaderCell>
        
        <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
    </Table.Header>
    <Table.Body>
            {map(tables, (table,index) => (
                <Table.Row key={index}>
                    <Table.Cell>
                       {table.number} 
                    </Table.Cell>
                    <Actions table={table} updateTable={updateTable} onDeleteTable={onDeleteTable}  />
                </Table.Row>

            ))}
        </Table.Body>
    </Table> 
  )
}
function Actions(props){
    const {table,updateTable,onDeleteTable}= props;
    return(
        <Table.Cell textAlign='right'>
            <Button icon onClick={() =>  updateTable(table) }>
                <Icon name='pencil'/>
            </Button>
            <Button icon negative onClick={() =>  onDeleteTable(table)}>
                <Icon name='close'/>
            </Button>
        </Table.Cell>
    )
}
