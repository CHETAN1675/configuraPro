import { Container } from "react-bootstrap";
import AppNavbar from "./Navbar";

export default function AppLayout({ children }) {
  return (
    <>
      <AppNavbar />
      <Container fluid="md" className="mt-3">
        {children}
      </Container>
    </>
  );
}
