'use client'; // Add this at the top to mark this as a Client Component

import React, { useState } from 'react';
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const router = useRouter();
  router.push('/admin/login');
  return (
    <div style={{
      backgroundColor: "#000",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
    }} >

    </div>
  );
};

export default AdminLogin;
