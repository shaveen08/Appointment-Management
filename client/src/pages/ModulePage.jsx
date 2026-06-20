import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

const ModulePage = ({ title, subtitle, fields, filter, endpoint, dataKey }) => {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar />

      <div className="flex flex-col w-full ml-60 pt-16 mb-6 overflow-hidden">
        <Navbar />

        <div className="flex-1 p-5 flex flex-col gap-6 overflow-hidden">
          <Table
            title={title}
            subtitle={subtitle}
            endpoint={endpoint}
            dataKey={dataKey}
            fields={fields}
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
};

export default ModulePage;
