import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import styles from './../../styles/Footer.module.css';

function Copyright(props: any) {
    return (
      <footer className={"styles.curve_bg"}>
         <Typography sx={{my:2}} variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}  
        <Link color="inherit" href="https://qcode.co">
          QCode Cars
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      </footer>
    );
  }

export default Copyright;