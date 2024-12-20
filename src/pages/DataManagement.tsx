import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataSection } from '../components/data-management/DataSection';
import { DeleteConfirmationModal } from '../components/data-management/DeleteConfirmationModal';
import { SupplierForm } from '../components/data-management/forms/SupplierForm';
import { LocationForm } from '../components/data-management/forms/LocationForm';
import { BasketTypeForm } from '../components/data-management/forms/BasketTypeForm';
import { GradeForm } from '../components/data-management/forms/GradeForm';
import { SizeForm } from '../components/data-management/forms/SizeForm';
import { useDeleteConfirmation } from '../hooks/useDeleteConfirmation';
import { useDataStore } from '../store/dataStore';
import type { Supplier, Location, BasketType, Grade, Size } from '../types/data-management';

type FormType = 'supplier' | 'location' | 'basket' | 'grade' | 'size';

export const DataManagement: React.FC = () => {
  const {
    suppliers,
    locations,
    basketTypes,
    grades,
    sizes,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    addLocation,
    updateLocation,
    deleteLocation,
    addBasketType,
    updateBasketType,
    deleteBasketType,
    addGrade,
    updateGrade,
    deleteGrade,
    addSize,
    updateSize,
    deleteSize,
  } = useDataStore();

  const {
    isDeleteModalOpen,
    itemToDelete,
    openDeleteModal,
    closeDeleteModal,
    isDeleting,
    setIsDeleting,
  } = useDeleteConfirmation<any>();

  const [currentForm, setCurrentForm] = useState<{
    type: FormType;
    isOpen: boolean;
    data?: any;
  }>({
    type: 'supplier',
    isOpen: false,
  });

  const handleAdd = (type: FormType) => {
    setCurrentForm({ type, isOpen: true });
  };

  const handleEdit = (type: FormType, item: any) => {
    setCurrentForm({ type, isOpen: true, data: item });
  };

  const handleDelete = async (type: FormType, item: any) => {
    openDeleteModal({ ...item, type });
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);
    try {
      switch (itemToDelete.type) {
        case 'supplier':
          deleteSupplier(itemToDelete.id);
          break;
        case 'location':
          deleteLocation(itemToDelete.id);
          break;
        case 'basket':
          deleteBasketType(itemToDelete.id);
          break;
        case 'grade':
          deleteGrade(itemToDelete.id);
          break;
        case 'size':
          deleteSize(itemToDelete.id);
          break;
      }
      closeDeleteModal();
    } catch (error) {
      console.error('Failed to delete item:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormClose = () => {
    setCurrentForm({ ...currentForm, isOpen: false });
  };

  const handleSupplierSubmit = async (data: Partial<Supplier>) => {
    if (data.id) {
      updateSupplier(data as Supplier);
    } else {
      addSupplier({ ...data, id: String(Date.now()) } as Supplier);
    }
    handleFormClose();
  };

  const handleLocationSubmit = async (data: Partial<Location>) => {
    if (data.id) {
      updateLocation(data as Location);
    } else {
      addLocation({ ...data, id: String(Date.now()) } as Location);
    }
    handleFormClose();
  };

  const handleBasketTypeSubmit = async (data: Partial<BasketType>) => {
    if (data.id) {
      updateBasketType(data as BasketType);
    } else {
      addBasketType({ ...data, id: String(Date.now()) } as BasketType);
    }
    handleFormClose();
  };

  const handleGradeSubmit = async (data: Partial<Grade>) => {
    if (data.id) {
      updateGrade(data as Grade);
    } else {
      addGrade({ ...data, id: String(Date.now()) } as Grade);
    }
    handleFormClose();
  };

  const handleSizeSubmit = async (data: Partial<Size>) => {
    if (data.id) {
      updateSize(data as Size);
    } else {
      addSize({ ...data, id: String(Date.now()) } as Size);
    }
    handleFormClose();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Management</h1>
          <p className="text-gray-600">
            Manage suppliers, locations, basket types, grades, and sizes
          </p>
        </div>

        <DataSection<Supplier>
          title="Suppliers"
          description="Manage your mangosteen suppliers"
          data={suppliers}
          columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Contact', accessor: 'contact' },
            { header: 'Email', accessor: 'email' },
            { header: 'Address', accessor: 'address' },
            {
              header: 'Status',
              accessor: (item) => (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {item.active ? 'Active' : 'Inactive'}
                </span>
              ),
            },
          ]}
          onAdd={() => handleAdd('supplier')}
          onEdit={(item) => handleEdit('supplier', item)}
          onDelete={(item) => handleDelete('supplier', item)}
        />

        <DataSection<Location>
          title="Locations"
          description="Manage departure and destination locations"
          data={locations}
          columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Type', accessor: 'type' },
            { header: 'Address', accessor: 'address' },
            {
              header: 'Status',
              accessor: (item) => (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {item.active ? 'Active' : 'Inactive'}
                </span>
              ),
            },
          ]}
          onAdd={() => handleAdd('location')}
          onEdit={(item) => handleEdit('location', item)}
          onDelete={(item) => handleDelete('location', item)}
        />

        <DataSection<BasketType>
          title="Basket Types"
          description="Manage basket types and weights"
          data={basketTypes}
          columns={[
            { header: 'Weight (kg)', accessor: 'weight' },
            { header: 'Description', accessor: 'description' },
            {
              header: 'Status',
              accessor: (item) => (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {item.active ? 'Active' : 'Inactive'}
                </span>
              ),
            },
          ]}
          onAdd={() => handleAdd('basket')}
          onEdit={(item) => handleEdit('basket', item)}
          onDelete={(item) => handleDelete('basket', item)}
        />

        <DataSection<Grade>
          title="Grades"
          description="Manage product grades"
          data={grades}
          columns={[
            { header: 'Code', accessor: 'code' },
            { header: 'Description', accessor: 'description' },
            {
              header: 'Status',
              accessor: (item) => (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {item.active ? 'Active' : 'Inactive'}
                </span>
              ),
            },
          ]}
          onAdd={() => handleAdd('grade')}
          onEdit={(item) => handleEdit('grade', item)}
          onDelete={(item) => handleDelete('grade', item)}
        />

        <DataSection<Size>
          title="Sizes"
          description="Manage product sizes"
          data={sizes}
          columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Description', accessor: 'description' },
            {
              header: 'Status',
              accessor: (item) => (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {item.active ? 'Active' : 'Inactive'}
                </span>
              ),
            },
          ]}
          onAdd={() => handleAdd('size')}
          onEdit={(item) => handleEdit('size', item)}
          onDelete={(item) => handleDelete('size', item)}
        />

        {/* Forms */}
        <SupplierForm
          isOpen={currentForm.type === 'supplier' && currentForm.isOpen}
          onClose={handleFormClose}
          onSubmit={handleSupplierSubmit}
          initialData={currentForm.data}
        />
        <LocationForm
          isOpen={currentForm.type === 'location' && currentForm.isOpen}
          onClose={handleFormClose}
          onSubmit={handleLocationSubmit}
          initialData={currentForm.data}
        />
        <BasketTypeForm
          isOpen={currentForm.type === 'basket' && currentForm.isOpen}
          onClose={handleFormClose}
          onSubmit={handleBasketTypeSubmit}
          initialData={currentForm.data}
        />
        <GradeForm
          isOpen={currentForm.type === 'grade' && currentForm.isOpen}
          onClose={handleFormClose}
          onSubmit={handleGradeSubmit}
          initialData={currentForm.data}
        />
        <SizeForm
          isOpen={currentForm.type === 'size' && currentForm.isOpen}
          onClose={handleFormClose}
          onSubmit={handleSizeSubmit}
          initialData={currentForm.data}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDelete}
          title={`Delete ${itemToDelete?.type?.charAt(0).toUpperCase()}${itemToDelete?.type?.slice(1)}`}
          message={`Are you sure you want to delete ${itemToDelete?.name || itemToDelete?.code}? This action cannot be undone.`}
          isLoading={isDeleting}
        />
      </div>
    </DashboardLayout>
  );
};