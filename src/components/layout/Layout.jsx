import { Container } from "react-bootstrap";
import AppNavbar from "./Navbar";
import Footer from "./Footer";

export default function AppLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />

      <Container fluid="md" className="mt-3 flex-grow-1">
        {children}
      </Container>

      <Footer />
    </div>
  );
}
