'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

type ButtonProps = {
    itemCount: number
}

export default function IconButtonWithBadge({itemCount}: ButtonProps) {
    const [count, setCount] = useState(itemCount ? itemCount : 0);
  return (
    <IconButton>
      <AddShoppingCartIcon fontSize="large" />
      <CartBadge badgeContent={count} color="primary" overlap="rectangular" />
    </IconButton>
  );
}
