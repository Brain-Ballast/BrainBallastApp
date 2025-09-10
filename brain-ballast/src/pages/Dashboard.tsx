import React from "react";
import LinkButton from "../components/LinkButton";
import Graph from "../components/Graph";

const Dashboard: React.FC = () => {
  return (
    <>
      <div>
        <h1>Brain Ballast Dashboard</h1>
        <Graph />
      </div>
      <div className="flex justify-center">
        <LinkButton page="/history" buttonText="History" />
      </div>
    </>
  );
};

export default Dashboard;
