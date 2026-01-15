import { useSelector } from "react-redux";
import AppNavbar from "./Navbar";
import AdminNavbar from "../../admin/components/AdminNavbar";

export default function AppLayout({ children }) {
  const adminToken = useSelector((state) => state.adminAuth.token);

  return (
    <>
      {adminToken ? <AdminNavbar /> : <AppNavbar />}
      <main>{children}</main>
    </>
  );
}
