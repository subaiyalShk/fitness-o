import React, {useEffect, useRef, useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ShowRecipie({url, setUrl}) {
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={url.length>0}
        onClick={()=>setUrl('')}
        >
            <Box sx={{ width:'100%', height:'80%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <iframe frameBorder="0"  height="100%" width="80%" src={url}></iframe>
            </Box>
    </Backdrop>
  );
}