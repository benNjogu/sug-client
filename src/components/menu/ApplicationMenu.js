import { Stack } from '@mui/material';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const user_id = window.localStorage.getItem('user_id');

const MenuSection = () => {
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
          <MenuItem> APPLICATIONS </MenuItem>
          <MenuItem> APPROVED </MenuItem>
          <MenuItem> PENDING </MenuItem>
          <MenuItem> REJECTED </MenuItem>
          <MenuItem> NOMINEES </MenuItem>
          <MenuItem> LOGOUT </MenuItem>
        </Menu>
      </Sidebar>
    </Stack>
  );
};

export default MenuSection;
