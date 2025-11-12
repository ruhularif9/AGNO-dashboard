import React, { useState } from "react";
import type { ChangeEvent } from "react";

interface AddDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    activeUsers: number;
    revenue: number;
    newSignups: number;
    userGrowth: number;
    revenueGrowth: number;
  }) => void;
}

const AddDashboardModal: React.FC<AddDashboardModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    activeUsers: "",
    revenue: "",
    newSignups: "",
    userGrowth: "",
    revenueGrowth: "",
  });

  // Keep input as string while typing
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Convert strings to numbers only when submitting
    const numericData = {
      activeUsers: Number(formData.activeUsers),
      revenue: Number(formData.revenue),
      newSignups: Number(formData.newSignups),
      userGrowth: Number(formData.userGrowth),
      revenueGrowth: Number(formData.revenueGrowth),
    };
    onSubmit(numericData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg text-white">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">Add Dashboard Data</h2>

        <div className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="capitalize text-gray-300 mb-1">{key}</label>
              <input
                type="number"
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                className="p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-400 outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDashboardModal;
