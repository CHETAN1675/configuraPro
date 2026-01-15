import { Container } from "react-bootstrap";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar />
      <Container fluid className="mt-4">
        {children}
      </Container>
    </>
  );
}

