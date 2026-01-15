import AppNavbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <AppNavbar />
      <main>{children}</main>
    </>
  );
}
