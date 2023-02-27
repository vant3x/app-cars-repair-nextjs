import React from 'react';
import Layout from "./../components/Layout/Layout";

// pages/404.js
export default function Custom404() {
    return (
      <Layout>
        <div className="container text-center ">
           <h1 className="text-6xl font-bold  text-red-500">404</h1>
          <br/>
          <h2 className="text-4xl font-bold  mt-2 mb-12 text-red-500">Página no encontrada :(</h2>

        </div>
      </Layout>
    )
  }