import { Navbar, Nav, Container,Badge} from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import logo from "../../assets/logo.png";
import AdminAuthModal from "../../admin/AdminAuthModal";
import { useState } from "react";


export default function AppNavbar() {
const [showAdminAuth, setShowAdminAuth] = useState(false);
const authToken = useSelector((state) => state.auth.authToken)
const totalQuantity = useSelector((state)=>state.cart.totalQuantity)
const navigate = useNavigate();
const dispatch = useDispatch();

  const handleLogout = () =>{
    dispatch(logout());
    navigate("/auth",{replace:true})
  }

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container fluid>
       <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
       <img
       src={logo}
       alt="ConfiguraPro"
       width="40"
       height="40"
       className="d-inline-block align-top"
       />
       <span className="fw-bold">ConfiguraPro</span>
      </Navbar.Brand>


        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
              <Nav.Link as={Link} to="/cart" className="position-relative">
              <Cart size={20} />
              {totalQuantity > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-5 start-100 translate-middle"
                 
                >
                  {totalQuantity}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to="/orders">
              Orders
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
          </Nav>
          
          <Nav>
            <Nav.Link
            onClick={() => setShowAdminAuth(true)}
            style={{ cursor: "pointer" }}
            >
            Admin
           </Nav.Link>

            {!authToken?
            <Nav.Link as={Link} to="/auth">
              Login
            </Nav.Link>:
            <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
       <AdminAuthModal
        show={showAdminAuth}
        onHide={() => setShowAdminAuth(false)}
        />
    </Navbar>
  );
}
