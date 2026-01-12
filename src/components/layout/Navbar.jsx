import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

export default function AppNavbar() {
const authToken = useSelector((state => state.auth.authToken))
const navigate = useNavigate();
const dispatch = useDispatch();

  const handleLogout = () =>{
    dispatch(logout());
    navigate("/auth",{replace:true})
  }

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          ConfiguraPro
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/configurator">
              Configurator
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/orders">
              Orders
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
          </Nav>

          <Nav>
            {!authToken?
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>:
            <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
