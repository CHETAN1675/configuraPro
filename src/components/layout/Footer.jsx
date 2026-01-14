import buyitlogo from "../../assets/buyitLogo.png"; 

export default function Footer() {
  return (
   <footer className="bg-dark text-light py-3 mt-auto d-flex justify-content-between align-items-center px-4">
     
      <div className="text-center flex-grow-1">
        © {new Date().getFullYear()} ConfiguraPro. All rights reserved.
      </div>

     
      <div>
        <a
          href="https://buyitshopee.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={buyitlogo}
            alt="Buy It Shopee"
            style={{ height: "40px", objectFit: "contain" }}
          />
        </a>
      </div>
    </footer>
  );
}
