import React from "react";
import LinkButton from "../components/LinkButton";
const HistoryPage: React.FC = () => {
  const historicalData = [
    { id: 1, name: "Test 1", date: "2025-09-01", link: "/details/1" },
    { id: 2, name: "Test 2", date: "2025-09-10", link: "/details/2" },
    { id: 3, name: "Test 3", date: "2025-09-15", link: "/details/3" },
    { id: 4, name: "Test 4", date: "2025-09-20", link: "/details/4" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-3xl font-bold mb-4">History View</h2>
      <p className="text-lg">Look at all your previous tests!</p>
      <div className="mt-6">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {historicalData.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">
                  <LinkButton page={item.link} buttonText="View" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-8">
        <LinkButton page="/Dashboard" buttonText="Dashboard" />
      </div>
    </div>
  );
};

export default HistoryPage;
