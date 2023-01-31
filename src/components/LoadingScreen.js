import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@mui/material';

export default function LoadingScreen() {
  return (
    <div className="loadingPage" >
        <CircularProgress color="inherit" />
    </div>
  );
}