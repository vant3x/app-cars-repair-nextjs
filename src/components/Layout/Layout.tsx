import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
//mui
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Toolbar from '@mui/material/Toolbar';
import authContext from "./../../context/auth/authContext";
import { Props } from "../../interfaces/Props.interface";
import HeaderAppBar from './../Header/HeaderAppBar';
import Footer from "./Footer";
import { Paper } from "@mui/material";
import { CarDetail } from "../../interfaces/CarDetail.interface";
import { AuthContextType } from "../../interfaces/AuthContextType";

interface PropsType extends Props {
  CarDetail?: CarDetail;
}

const Layout = ({ children }: PropsType) => {
  const AuthContext = useContext<AuthContextType>(authContext);
  const { message, auth,  user, login, userAuthtenticate, errorSession } = AuthContext;

  const router = useRouter();

  
  useEffect(() => {
    userAuthtenticate();
    if (auth || localStorage.getItem('token')) {
    } else {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (auth) {
    }
  }, [auth]);

  return (
    <>
    <Head>
        <title>QCode Cars - Reparación de autos</title>
    </Head>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
      <HeaderAppBar />
      </Box>
      <br />
      <Grid container spacing={3} sx={{
        display: 'flex', justifyContent: 'center',
        alignContent: 'center',
        mt:8
      }} >
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',

            }}
          >
            {children}                
            </Paper>
        </Grid>
      </Grid>
      <Footer />

    </>
  );
};

export default Layout;
