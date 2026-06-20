import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const EditModal = ({
  isOpen,
  onClose,
  fields,
  endpoint,
  record,
  onUpdated,
}) => {
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill form whenever a new record is opened for editing
  useEffect(() => {
    if (record) setFormData(record);
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await axios.put(`${endpoint}/${record._id}`, formData);
      onUpdated?.(); // tell parent table to refresh
      handleClose();
    } catch (err) {
      console.error("Error updating record:", err);
      setError("Couldn't update this record. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const modalRef = useRef();
  if (!isOpen || !record) return null;

  return (
    <div
      ref={modalRef}
      onClick={(e) => {
        if (e.target === modalRef.current) handleClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4">
          <div>
            <h4 className="text-base font-semibold text-gray-900">
              Edit Record
            </h4>
            <p className="text-sm text-gray-500">
              Update the information below
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white hover:bg-gray-100 border border-gray-200 transition"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} color="#6b7280" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={field.type === "textarea" ? "sm:col-span-2" : ""}
                >
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-medium text-gray-600 mb-1.5"
                  >
                    {field.label}
                  </label>

                  {field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      required
                      className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-gray-700 bg-white transition"
                    >
                      <option value="" disabled>
                        Select {field.label}
                      </option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      placeholder={field.label}
                      rows={3}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 resize-none transition"
                    />
                  ) : (
                    <input
                      id={field.name}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      placeholder={field.label}
                      required
                      className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              className="py-2.5 px-4 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="py-2.5 px-5 bg-teal-700 hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition"
            >
              {submitting ? "Saving..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
