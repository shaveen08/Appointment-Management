import React, { useEffect, useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  SaveMoneyDollarIcon,
  UserCheck01Icon,
  UserGroupIcon,
  UserTime01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";

const STATUS_STYLES = {
  pending: "text-amber-700 bg-amber-50 ring-amber-600/10",
  confirmed: "text-blue-700 bg-blue-50 ring-blue-600/10",
  completed: "text-emerald-700 bg-emerald-50 ring-emerald-600/10",
  cancelled: "text-red-700 bg-red-50 ring-red-600/10",
};

const StatusChip = ({ value }) => {
  const key = String(value ?? "").toLowerCase();
  const style =
    STATUS_STYLES[key] || "text-gray-600 bg-gray-50 ring-gray-500/10";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}
    >
      {value ?? "—"}
    </span>
  );
};

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/appointments`,
      );
      setUserData(response.data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const rows = userData ?? [];

  // --- KPI derived values --------------------------------------------------
  const totalAppointments = rows.length;

  const pendingAppointments = useMemo(
    () => rows.filter((a) => a.status === "Pending"),
    [rows],
  );

  const confirmedAppointments = useMemo(
    () => rows.filter((a) => a.status === "Confirmed"),
    [rows],
  );

  const completedAppointments = useMemo(
    () => rows.filter((a) => a.status === "Completed"),
    [rows],
  );

  const KPICards = [
    {
      title: "Total Appointments",
      value: totalAppointments,
      iconBg: "bg-violet-50 text-violet-700",
      icon: <HugeiconsIcon icon={UserGroupIcon} size={18} strokeWidth={1.8} />,
    },
    {
      title: "Pending Appointments",
      value: pendingAppointments.length,
      iconBg: "bg-amber-50 text-amber-700",
      icon: <HugeiconsIcon icon={UserTime01Icon} size={18} strokeWidth={1.8} />,
    },
    {
      title: "Confirmed Appointments",
      value: confirmedAppointments.length,
      iconBg: "bg-blue-50 text-blue-700",
      icon: (
        <HugeiconsIcon icon={UserCheck01Icon} size={18} strokeWidth={1.8} />
      ),
    },
    {
      title: "Completed Appointments",
      value: completedAppointments.length,
      iconBg: "bg-emerald-50 text-emerald-700",
      icon: (
        <HugeiconsIcon icon={SaveMoneyDollarIcon} size={18} strokeWidth={1.8} />
      ),
    },
  ];

  // --- Table -----------------------------------------------------------------
  const tableHead =
    rows.length > 0 ? Object.keys(rows[0]).filter((k) => k !== "_id") : [];

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

  const handleDelete = (id) => {
    setUserData((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex flex-col w-full ml-60 pt-16 overflow-y-auto">
        <Navbar />

        {/* Dashboard Container */}
        <div className="px-6 py-6 flex flex-col gap-6 max-w-350 w-full mx-auto">
          {/* Header */}
          <section className="bg-teal-800 p-4 space-y-6 rounded-md">
            <div>
              <h1 className="text-2xl font-semibold text-gray-50">
                Welcome back
              </h1>
              <p className="text-sm text-gray-200 mt-1">
                Here's an overview of your appointments today.
              </p>
            </div>

            {/* KPI Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {KPICards.map((card) => (
                <div
                  key={card.title}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-4 hover:shadow-sm transition-shadow"
                >
                  <div
                    className={`h-9 w-9 flex items-center justify-center rounded-lg ${card.iconBg}`}
                  >
                    {card.icon}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                    <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                      {card.value ?? "—"}
                    </h2>
                  </div>
                </div>
              ))}
            </section>
          </section>

          {/* Table */}
          <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Table toolbar */}
            <div className="flex bg-gray-50 items-center justify-between gap-3 p-4 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-900">
                Appointments
              </h3>

              <div className="relative w-64">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    size={16}
                    strokeWidth={1.8}
                  />
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search appointments..."
                  className="w-full pl-9 pr-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-900/10 focus:border-teal-300 transition"
                />
              </div>
            </div>

            <div className="overflow-auto scrollbar-thin max-h-130">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/80 sticky top-0 z-10">
                  <tr className="border-b border-gray-100">
                    {tableHead.map((head) => (
                      <th
                        key={head}
                        className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide whitespace-nowrap"
                      >
                        {head
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </th>
                    ))}
                    {tableHead.length > 0 && (
                      <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide text-right">
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
                        className="px-4 py-10 text-center text-gray-400 text-sm"
                      >
                        Loading appointments...
                      </td>
                    </tr>
                  ) : filteredRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={tableHead.length + 1 || 1}
                        className="px-4 py-10 text-center text-gray-400 text-sm"
                      >
                        No appointments found.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((row, index) => (
                      <tr
                        key={row._id || index}
                        className="hover:bg-gray-50/60 transition-colors"
                      >
                        {tableHead.map((key) => (
                          <td
                            key={key}
                            className="px-4 py-3 text-gray-700 whitespace-nowrap"
                          >
                            {key.toLowerCase() === "status" ? (
                              <StatusChip value={row[key]} />
                            ) : typeof row[key] === "object" &&
                              row[key] !== null ? (
                              JSON.stringify(row[key])
                            ) : (
                              String(row[key] ?? "-")
                            )}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleDelete(row._id)}
                            className="inline-flex items-center justify-center h-7 w-7 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            aria-label="Delete appointment"
                          >
                            <HugeiconsIcon
                              icon={Delete02Icon}
                              size={16}
                              strokeWidth={1.8}
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
