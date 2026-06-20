import { Alert02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import axios from "axios";
import React, { useRef, useState } from "react";

const DeleteModal = ({ isOpen, onClose, endpoint, record, onDeleted }) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef();

  const handleDelete = async () => {
    setError("");
    setDeleting(true);
    try {
      await axios.delete(`${endpoint}/${record._id}`);
      onDeleted?.();
      onClose();
    } catch (err) {
      console.error("Error deleting record:", err);
      setError("Couldn't delete this record. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  if (!isOpen || !record) return null;

  return (
    <div
      ref={modalRef}
      onClick={(e) => {
        if (e.target === modalRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <HugeiconsIcon icon={Alert02Icon} size={24} color="#dc2626" />
          </div>
          <h4 className="text-base font-semibold text-gray-900">
            Delete this record?
          </h4>
          <p className="text-sm text-gray-500">
            This action can't be undone. The record will be permanently removed.
          </p>

          {error && (
            <div className="w-full rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="py-2.5 px-5 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
