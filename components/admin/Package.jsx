'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plan } from "@/utils/schema";
import { db } from "@/utils/db";
import { desc, eq } from 'drizzle-orm';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";

// Dynamically load alertifyjs and react-data-table-component to prevent SSR issues
const alertify = typeof window !== 'undefined' ? require('alertifyjs') : null;
const DataTable = dynamic(() => import('react-data-table-component'), { ssr: false });

import 'alertifyjs/build/css/alertify.min.css';

export default function PackageListing() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [newPackage, setNewPackage] = useState({
    name: '',
    price: '',
    features: '',
    limit: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    price: '',
    features: '',
  });

  useEffect(() => {
    GetPlan();
  }, []);

  const GetPlan = async () => {
    try {
      const getPlans = await db
        .select()
        .from(Plan)
        .orderBy(desc(Plan.id));
      setItems(getPlans);
      setFilteredItems(getPlans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      if (alertify) alertify.error('Failed to fetch plans.');
    }
  };

  useEffect(() => {
    const result = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.features.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItems(result);
  }, [search, items]);

  const validateFields = () => {
    const errors = {};
    if (!newPackage.name) errors.name = 'Plan name is required';
    if (!newPackage.price) errors.price = 'Price is required';
    if (!newPackage.features) errors.features = 'Features are required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddOrEditPackage = async () => {
    if (!validateFields()) return;

    try {
      setLoading(true);

      const payload = {
        name: newPackage.name,
        price: parseInt(newPackage.price, 10),
        features: newPackage.features,
      };

      if (newPackage.limit) {
        payload.limit = parseInt(newPackage.limit, 10);
      }

      if (isEditMode && selectedPlanId) {
        await db.update(Plan).set(payload).where(eq(Plan.id, selectedPlanId));
        if (alertify) alertify.success('Plan updated successfully');
      } else {
        await db.insert(Plan).values({ ...payload, createdAt: new Date().toISOString() });
        if (alertify) alertify.success('Plan added successfully');
      }

      await GetPlan();
      resetModal();
    } catch (error) {
      console.error('Error saving Plan:', error);
      if (alertify) alertify.error('Failed to save the Plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan) => {
    setIsEditMode(true);
    setSelectedPlanId(plan.id);
    setNewPackage({
      name: plan.name,
      price: plan.price.toString(),
      features: plan.features,
      limit: plan.limit ? plan.limit.toString() : '',
    });
    setIsModalOpen(true);
  };

  const resetModal = () => {
    setIsEditMode(false);
    setSelectedPlanId(null);
    setNewPackage({ name: '', price: '', features: '', limit: '' });
    setValidationErrors({});
    setIsModalOpen(false);
  };

  const handleCheckPlan = () => {
    GetPlan();
    if (items.length >= 2) {
      if (alertify) alertify.error(
        'Limit Reached. You have already added 2 plans. Please update or delete an existing plan.'
      );
    } else {
      resetModal();
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id) => {
    if (alertify) {
      alertify.confirm(
        'Delete Plan',
        'Are you sure you want to delete this plan?',
        async () => {
          try {
            await db.delete(Plan).where(eq(Plan.id, id));
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
            setFilteredItems((prevItems) => prevItems.filter((item) => item.id !== id));
            if (alertify) alertify.success('Plan deleted successfully');
          } catch (error) {
            console.error('Error deleting plan:', error);
            if (alertify) alertify.error('Failed to delete the plan. Please try again.');
          }
        },
        () => {
          if (alertify) alertify.error('Delete operation cancelled');
        }
      );
    }
  };

  const columns = [
    { name: 'Package Name', selector: (row) => row.name, sortable: true },
    { name: 'Price ($)', selector: (row) => row.price, sortable: true },
    { name: 'Features', selector: (row) => row.features },
    { name: 'Limit', selector: (row) => row.limit },
    { name: 'Created At', selector: (row) => new Date(row.createdAt).toLocaleString() },
    {
      name: 'Actions',
      width: '200px',
      cell: (row) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            style={{
              backgroundColor: '#7e22ce', // Purple Edit Button
              color: '#fff',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
          <button
            style={{
              backgroundColor: '#e74c3c', // Red Delete Button
              color: '#fff',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
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
      <h2 style={{ color: '#7e22ce', marginBottom: '20px' }}>Plan Listing</h2>


      <input
        type="text"
        placeholder="Search by Name or Features"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          maxWidth: '400px',
          border: '1px solid #7e22ce', // Purple Border
          borderRadius: '5px',
          backgroundColor: '#1a1a1a', // Input Background
          color: '#fff',
        }}
      />
        <button
          style={{
            backgroundColor: '#7e22ce', // Purple Button
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
            marginLeft: '551px',
          }}
          onClick={handleCheckPlan}
          disabled={items.length >= 2}
        >
          Add Plan
        </button>

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

      <Dialog open={isModalOpen} onOpenChange={resetModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl" style={{ color: '#7e22ce' }}>
              {isEditMode ? 'Edit Plan' : 'Add New Plan'}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={(e) => { e.preventDefault(); handleAddOrEditPackage(); }}>
              <div className="mt-7 my-3">
                <label style={{ color: '#7e22ce' }}>Plan Name</label>
                <Input
                  placeholder="Plan Name"
                  required
                  value={newPackage.name}
                  onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                  style={{
                    backgroundColor: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid #7e22ce',
                  }}
                />
                {validationErrors.name && <div style={{ color: 'red' }}>{validationErrors.name}</div>}
              </div>
              <div className="mt-7 my-3">
                <label style={{ color: '#7e22ce' }}>Plan Price</label>
                <Input
                  type="number"
                  placeholder="Price"
                  required
                  value={newPackage.price}
                  onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                  style={{
                    backgroundColor: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid #7e22ce',
                  }}
                />
                {validationErrors.price && <div style={{ color: 'red' }}>{validationErrors.price}</div>}
              </div>
              <div className="mt-7 my-3">
                <label style={{ color: '#7e22ce' }}>Features</label>
                <Textarea
                  placeholder="Plan Features"
                  required
                  value={newPackage.features}
                  onChange={(e) => setNewPackage({ ...newPackage, features: e.target.value })}
                  style={{
                    backgroundColor: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid #7e22ce',
                  }}
                />
                {validationErrors.features && <div style={{ color: 'red' }}>{validationErrors.features}</div>}
              </div>
              <div className="mt-7 my-3">
                <label style={{ color: '#7e22ce' }}>Limit (Optional)</label>
                <Input
                  type="number"
                  placeholder="Limit (Optional)"
                  value={newPackage.limit}
                  onChange={(e) => setNewPackage({ ...newPackage, limit: e.target.value })}
                  style={{
                    backgroundColor: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid #7e22ce',
                  }}
                />
              </div>
              <div className="mt-7 my-3">
                <Button type="submit" disabled={loading}>
                  {loading ? <LoaderCircle /> : 'Save Plan'}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
