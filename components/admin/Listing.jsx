'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'alertifyjs/build/css/alertify.min.css';
import { Users } from "@/utils/schema";
import { db } from "@/utils/db";
import { desc, eq } from 'drizzle-orm';

// Dynamically load components to prevent SSR issues
const DataTable = dynamic(() => import('react-data-table-component'), { ssr: false });

export default function Listing({ users }) {
  const [items, setItems] = useState(users || []);
  const [filteredItems, setFilteredItems] = useState(items);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setItems(users);
    setFilteredItems(users);
  }, [users]);

  useEffect(() => {
    const result = items.filter((item) =>
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.plan.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItems(result);
  }, [search, items]);

  const handleDelete = async (id) => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const alertify = await import('alertifyjs');

      alertify.confirm(
        'Delete User',
        'Are you sure you want to delete this user?',
        async () => {
          try {
            await db.delete(Users).where(eq(Users.id, id));
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
            setFilteredItems((prevItems) => prevItems.filter((item) => item.id !== id));
            alertify.success('User deleted successfully');
          } catch (error) {
            alertify.error('Failed to delete the user. Please try again.');
          }
        },
        () => {
          alertify.error('Delete operation cancelled');
        }
      );
    }
  };

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Plan',
      selector: (row) => row.plan,
      sortable: true,
    },
    {
      name: 'Created At',
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: 'Payment Status',
      selector: (row) => row.paymentStatus,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <button
          style={{
            backgroundColor: '#9b59b6',
            color: '#ffffff',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <h2 style={{ marginBottom: '20px', color: '#9b59b6' }}>User Listing</h2>
      <input
        type="text"
        placeholder="Search by Email or Plan"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#2c2c2c',
          color: '#ffffff',
          border: '1px solid #9b59b6',
          borderRadius: '5px',
        }}
      />
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        highlightOnHover
        responsive
        defaultSortFieldId={1}
        paginationPerPage={5}
        customStyles={{
          header: {
            style: {
              backgroundColor: '#1a1a1a',
              color: '#9b59b6',
            },
          },
          rows: {
            style: {
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#9b59b6',
              },
            },
          },
          pagination: {
            style: {
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
}

