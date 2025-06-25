'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Item } from '@/app/types/item';
import ItemGrid from '../item/itemGrid';
import { Container } from '@mui/material';
import { useCallback, useState } from 'react';
import BasicModal from './addItemModal';
import BasicModalAdd from './addItemModal';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [items, setItems] = React.useState<Item[]>([]);
          React.useEffect(() => {
              fetch('api/item/', {
                  method:"GET"
              })
              .then(res => res.json())
              .then((data: Item[]) => setItems(data))
          }, []);

  const uniqueTypes = Array.from(new Set(items.map(item => item.type.toUpperCase())));

  return (
    <div>
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', width:'100%' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        // aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: 200 }}
      >
        
        {uniqueTypes.map((type) => (
            <Tab 
            // key={item.type} label={item.type}
            key={type}
            label={
              <Box sx={{ whiteSpace: 'normal', textAlign: 'center' }}>
                {type}
              </Box>
            }
            ></Tab>
        ))}
        <Tab 
            label={
              <Box sx={{ whiteSpace: 'normal', textAlign: 'center' }}>
                Procedures
              </Box>
            }
            ></Tab>
      </Tabs>

      {uniqueTypes.map((type, index) => (
        <TabPanel key = {type} value={value} index={index} >
          <Box sx={{width:1100}}>
            <ItemGrid 
              items={items.filter(item => item.type.toUpperCase() === type.toUpperCase())} 
            />
            </Box>
        </TabPanel>
        ))}
        <TabPanel value={value} index={uniqueTypes.length} >
          <Box sx={{width: 1100}}>
          Procedure tab
          </Box>
        </TabPanel>
    </Box>
    <Box>
      <BasicModalAdd />
    </Box>
    </div>
  );
}
