import { Grid, Skeleton, TableBody } from '@mui/material';
import React from 'react';
import { StyledCheckBox, StyledTableCell, StyledTableRow } from '../../../assets/theme/theme';

const AppSkeleton = (props) => {
  const columns = [];
  if (props.stickyFirst) {
    columns.push(
      <StyledTableCell align="center">
        <StyledCheckBox size="small" />
      </StyledTableCell>
    );
  }
  for (let i = 0; i < props.numOfColumns; i++) {
    columns.push(
      <StyledTableCell key={i} align="center">
        <Skeleton variant="text" width={props.columnWidth} height={props.height || 30} />
      </StyledTableCell>
    );
  }

  const rows = [];
  for (let i = 0; i < props.numOfRows; i++) {
    rows.push(
      <StyledTableRow>
        {columns}
      </StyledTableRow>
    );
  }

  const stepper = [];
  for (let i = 0; i < props.numOfColumns * props.numOfRows; i++) {
    stepper.push(
      <Grid item xs={12} md={6}>
        <Skeleton variant="text" height={props.height || 30} />
      </Grid>
    );
  }

  return (
    <>
      {props.tag === 'table' &&
        <TableBody>
          {rows}
        </TableBody>
      }
      {props.tag === 'formField' &&
        <div style={{ width: '100%' }}>
          <Skeleton variant="text" height={props.height || 30} />
        </div>
      }
      {props.tag === 'stepper' &&
        <Grid container spacing={4}>
          {stepper}
        </Grid>
      }
    </>
  );
};

export default AppSkeleton;
