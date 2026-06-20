import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Filter,
  PackageRemoveIcon,
  Search01Icon,
  PencilEdit01Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import AddModal from "./modals/AddModal";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";
import FilterModal from "./modals/FilterModal";

const STATUS_STYLES = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

// Chip --> Status on the table
const StatusChip = ({ value }) => {
  const style =
    STATUS_STYLES[String(value).toLowerCase()] ||
    "bg-gray-50 text-gray-600 border-gray-200";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${style}`}
    >
      {value}
    </span>
  );
};

const Table = ({ title, subtitle, fields, filter, endpoint, dataKey }) => {
  // Modal Actions ------------------------------------------------------------ /
  const [addModal, setAddModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [search, setSearch] = useState("");

  // Edit / Delete target row -------------------------------------------------- /
  const [editRecord, setEditRecord] = useState(null);
  const [deleteRecord, setDeleteRecord] = useState(null);

  // API Fetching ---------------------------------------------------------- /
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(endpoint);

      setRows(
        Array.isArray(response.data)
          ? response.data
          : response.data[dataKey] || [],
      );
    } catch (error) {
      console.error(`Error fetching ${dataKey || "data"}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (endpoint) fetchData();
  }, [endpoint]);

  // ------------------------------------------------------------------------ /

  // It will get the data keys to use it as a table head
  const tableHead = rows.length > 0 ? Object.keys(rows[0]) : [];

  // Filter Button of Status
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  // Search Filter ---------------------------------------------------------- /
  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesSearch = !query
        ? true
        : tableHead.some((key) =>
            String(row[key] ?? "")
              .toLowerCase()
              .includes(query),
          );

      const matchesStatusFilter =
        selectedFilter.length === 0
          ? true
          : selectedFilter
              .map((s) => s.toLowerCase())
              .includes(String(row.status ?? "").toLowerCase());

      return matchesSearch && matchesStatusFilter;
    });
  }, [rows, search, tableHead, selectedFilter]);

  return (
    <>
      <div className="h-full w-full max-w-full flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-5 py-5 bg-gray-50 border-b border-gray-100 space-y-4">
          <div>
            <h2 className="font-semibold text-base text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>

          <div className="flex h-fit gap-3">
            {/* Search */}
            <div className="relative w-full">
              <div className="absolute top-1/2 -translate-y-1/2 left-2.5">
                <HugeiconsIcon icon={Search01Icon} size={17} color="#9ca3af" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-md pl-9 pr-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition"
              />
            </div>

            {/* Filter */}
            <div className="relative w-fit">
              <button
                type="button"
                onClick={() => setFilterModal((p) => !p)}
                className="w-fit py-2 px-4 flex items-center gap-1.5 font-medium text-gray-600 text-sm bg-white hover:bg-gray-50 rounded-md border border-gray-200 transition"
              >
                Filter
                <HugeiconsIcon icon={Filter} size={16} strokeWidth={2} />
              </button>
              {filterModal && filter && (
                <FilterModal
                  filter={filter}
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
                  onClose={() => setFilterModal(false)}
                />
              )}
            </div>

            {/* Add */}
            <button
              onClick={() => setAddModal(true)}
              className="w-fit py-2 px-4 text-nowrap bg-teal-700 hover:bg-teal-800 flex items-center gap-1 font-medium text-white text-sm rounded-md transition"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 min-h-0 overflow-auto scrollbar-thin">
          <table className="w-full text-sm text-nowrap">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className="border-b border-gray-100 text-left">
                {tableHead.map((head) => (
                  <th
                    key={head}
                    className="p-3 font-medium text-gray-500 text-xs uppercase tracking-wide"
                  >
                    {head
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </th>
                ))}
                {tableHead.length > 0 && (
                  <th className="p-3 font-medium text-gray-500 text-xs uppercase tracking-wide text-right">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td
                    colSpan={tableHead.length + 1 || 1}
                    className="p-8 text-center text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : (
                filteredRows.map((row, index) => (
                  <tr
                    key={row._id || index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {tableHead.map((key) => (
                      <td key={key} className="p-3 text-gray-700">
                        {key.toLowerCase() === "status" ? (
                          <StatusChip value={row[key]} />
                        ) : typeof row[key] === "object" ? (
                          JSON.stringify(row[key])
                        ) : (
                          String(row[key] ?? "-")
                        )}
                      </td>
                    ))}

                    {/* Actions */}
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditRecord(row)}
                          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-teal-50 transition"
                          title="Edit"
                        >
                          <HugeiconsIcon
                            icon={PencilEdit01Icon}
                            size={16}
                            color="#0f766e"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteRecord(row)}
                          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <HugeiconsIcon
                            icon={Delete02Icon}
                            size={16}
                            color="#dc2626"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Empty list alert */}
        {!loading && filteredRows.length === 0 && (
          <div className="flex flex-col items-center gap-2 p-8 text-sm text-center text-gray-500">
            <HugeiconsIcon
              icon={PackageRemoveIcon}
              size={32}
              strokeWidth={1.2}
              color="#9ca3af"
            />
            {search
              ? "No matching results"
              : `No ${dataKey || "records"} found`}
          </div>
        )}
      </div>

      {/* Modals */}
      <AddModal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        fields={fields}
        endpoint={endpoint}
        onAdded={fetchData}
      />

      <EditModal
        isOpen={!!editRecord}
        onClose={() => setEditRecord(null)}
        fields={fields}
        endpoint={endpoint}
        record={editRecord}
        onUpdated={fetchData}
      />

      <DeleteModal
        isOpen={!!deleteRecord}
        onClose={() => setDeleteRecord(null)}
        endpoint={endpoint}
        record={deleteRecord}
        onDeleted={fetchData}
      />
    </>
  );
};

export default Table;
