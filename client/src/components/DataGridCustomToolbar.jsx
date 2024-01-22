import React from 'react';
import { Search, RefreshOutlined } from '@mui/icons-material';
import { IconButton, TextField, InputAdornment } from '@mui/material';
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';
import FlexBetween from './FlexBetween';

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width='100%'>
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>

        <TextField
          label='Search...'
          sx={{ mb: '.5rem', width: '15rem' }}
          onChange={(event) => setSearchInput(event.target.value)}
          value={searchInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput('');
                  }}
                >
                  <Search />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setSearch('');
                    setSearchInput('');
                  }}
                >
                  <RefreshOutlined />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
