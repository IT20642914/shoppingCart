import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody } from '@mui/material';
import { StyledTableCell } from '../../assets/theme/theme';
import { CustomHeaderCell } from '../Shared/index';
const ShippingAddressTable = ({ ShippingDetails }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <CustomHeaderCell>Index</CustomHeaderCell>
            <CustomHeaderCell>Full Name</CustomHeaderCell>
            <CustomHeaderCell>Address Line 1</CustomHeaderCell>
            <CustomHeaderCell>Address Line 2</CustomHeaderCell>
            <CustomHeaderCell>City</CustomHeaderCell>
            <CustomHeaderCell>Postal Code</CustomHeaderCell>
            <CustomHeaderCell>Country</CustomHeaderCell>
            <CustomHeaderCell>Phone Number</CustomHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ShippingDetails.map((data, index) => (
            <TableRow key={data._id}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell>{data.fullName}</StyledTableCell>
              <StyledTableCell>{data.addressLine1}</StyledTableCell>
              <StyledTableCell>{data.addressLine2}</StyledTableCell>
              <StyledTableCell>{data.city}</StyledTableCell>
              <StyledTableCell>{data.postalCode}</StyledTableCell>
              <StyledTableCell>{data.country}</StyledTableCell>
              <StyledTableCell>{data.phoneNumber}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShippingAddressTable;
