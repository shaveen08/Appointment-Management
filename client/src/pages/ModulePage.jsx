import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import useNotification from "../utils/useNotification";

const ModulePage = ({ title, subtitle, fields, filter, endpoint, dataKey }) => {
  const { triggerNotification, NotificationComponent } =
    useNotification("top-right");
  return (
    <div className="flex h-screen w-full bg-gray-50">
      {NotificationComponent}
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
            triggerNotification={triggerNotification}
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
};

export default ModulePage;
