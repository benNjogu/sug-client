import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from '@mui/material';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const user_id = window.localStorage.getItem('user_id');

let sections = [
  'Candidates',
  'Type',
  'Details',
  'Particulars',
  'Overseas',
  'Training Expenses',
  'Declaration',
];

const MainMenu = () => {
  return (
    <Stack direction="column" spacing={2} sx={{ height: '100Vh' }}>
      <Sidebar>
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <SubMenu label="TYPE">
            <MenuItem> Local </MenuItem>
            <MenuItem> Overseas </MenuItem>
            <MenuItem> Distance learning </MenuItem>
          </SubMenu>
          <SubMenu label="CANDIDATES">
            <MenuItem> Single </MenuItem>
            <MenuItem> Group </MenuItem>
          </SubMenu>
          <MenuItem> OVERSEAS </MenuItem>
          <MenuItem> TRAINING EXPENSES </MenuItem>
          <MenuItem> DECLARATION </MenuItem>
          <MenuItem> LOGOUT </MenuItem>
        </Menu>
      </Sidebar>
    </Stack>
  );
};

export default MainMenu;
