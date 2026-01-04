import { Outlet } from "react-router-dom";

export default function Configurator() {
  return (
    <div>
      <h1>Product Configurator</h1>
      <Outlet />
    </div>
  );
}
