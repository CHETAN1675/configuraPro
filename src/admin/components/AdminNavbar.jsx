import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../features/adminAuth/adminAuthSlice";
import logo from "../../assets/logo.png"; 

export default function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/", { replace: true });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="position-relative">
      <Container fluid className="d-flex align-items-center">
        {/* Left: Logo */}
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="ConfiguraPro"
            width="40"
            height="40"
            className="me-2"
          />
          ConfiguraPro
        </Navbar.Brand>

        {/* Center: Admin Panel title */}
        <span
          className="position-absolute start-50 translate-middle-x text-white fw-bold"
          style={{ fontSize: "1.2rem" }}
        >
          Admin Panel
        </span>

        {/* Right: Navbar links */}
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={NavLink} to="/admin/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/products">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/orders">
              Orders
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
