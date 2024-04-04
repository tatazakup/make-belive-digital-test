import React from "react";
import ReactDOM from "react-dom/client";
import { TablePage } from "@pages/TablePage";
import "./styles/styles.css";

export const CoreProvider: React.FC = () => {
  return <TablePage />;
};

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<CoreProvider />);
} else {
  console.error("Element with ID 'root' not found in the DOM.");
}
