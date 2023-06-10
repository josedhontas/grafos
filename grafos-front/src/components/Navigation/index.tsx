import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
export default function Navigation() {
  const [value, setValue] = React.useState<number>(0);

  const handleNavigationChange = (event: React.SyntheticEvent, newValue: string | number) => {
    setValue(Number(newValue));
    console.log(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigationChange}
      >
        <BottomNavigationAction label="Vértice" icon={<AddCircleOutlineIcon />} />
        <BottomNavigationAction label="Aresta" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Editar" icon={<EditIcon />} />
        <BottomNavigationAction label="Apagar" icon={<ClearIcon />} />
      </BottomNavigation>
    </Box>
  );
}
