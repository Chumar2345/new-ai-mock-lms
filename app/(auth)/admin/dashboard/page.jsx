'use client';
import React, { useState, useEffect } from "react";
import Header from '@/components/admin/Header.jsx';
import Sidebar from '@/components/admin/Sidebar.jsx';
import Listing from '@/components/admin/Listing.jsx';
import { useRouter } from "next/navigation";
import { Users } from "@/utils/schema";
import { db } from "@/utils/db";
import { desc, eq } from 'drizzle-orm';

export default function Dashboard() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    } else {
      try {
        router.push('/admin/dashboard');
      } catch (err) {
        localStorage.removeItem('token');
        router.push('/admin/login');
      }
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await db.select().from(Users);
      if (users && users.length !== 0) {
        setUsers(users);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again later.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: '#1a1a1a',
          minHeight: '100vh'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '1100px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}>
            <Listing users={users} />
          </div>
        </main>
      </div>
    </div>
  );
}
