import React from "react";
import ModulePage from "./ModulePage";

const Appointment = () => {
  const appointmentFields = [
    { name: "patientName", label: "Patient Name", type: "text" },
    { name: "patientAge", label: "Patient Age", type: "number" },
    {
      name: "patientGender",
      label: "Patient Gender",
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    { name: "doctorName", label: "Doctor Name", type: "text" },
    {
      name: "specialization",
      label: "Specialization",
      type: "select",
      options: [
        "General Physician",
        "Dermatologist",
        "Orthopedist",
        "Obstetrician & Gynecologist",
        "Pediatrician",
        "Cardiologist",
      ],
    },
        {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled",
      ],
    },
    { name: "appointmentDate", label: "Appointment Date", type: "date" },
    { name: "appointmentTime", label: "Appointment Time", type: "time" },
    { name: "phone", label: "Phone", type: "number" },
    { name: "email", label: "Email", type: "email" },
    { name: "notes", label: "Notes", type: "textarea" },
  ];

  const endpoint = "http://localhost:3000/api/appointments";
  const STATUS_OPTIONS = ["Pending", "Confirmed", "Completed", "Cancelled"];

  return (
    <ModulePage
      title="Patients List"
      subtitle="Most recent patients"
      endpoint={endpoint}
      dataKey="appointments"
      fields={appointmentFields}
      filter={STATUS_OPTIONS}
    />
  );
};

export default Appointment;
