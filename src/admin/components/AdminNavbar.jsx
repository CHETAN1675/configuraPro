import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../features/adminAuth/adminAuthSlice";

export default function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/", { replace: true });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container fluid>
        <Navbar.Brand>Admin Panel</Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/admin/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/products">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/orders">
              Orders
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
