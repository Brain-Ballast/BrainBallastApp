import React from "react";
import LinkButton from "../components/LinkButton";
import Graph from "../components/Graph";
import { Analytics } from "@vercel/analytics/next";
const Dashboard: React.FC = () => {
  return (
    <>
      <div>
        <h1>Brain Ballast Dashboard</h1>
        <Graph />
      </div>
      <div className="flex justify-center">
        <LinkButton page="/history" buttonText="History" />
        <Analytics />
      </div>
    </>
  );
};

export default Dashboard;
