import React from "react";

export default function Footer() {
  return (
    <footer className="container-fluid bg-dark text-white p-3">
      <div className="row">

        {/* About Us Section */}
        <div className="col-md-4 mb-2">
          <h5 className="fw-bold">About Us</h5>
          <p>
            We are a team of dedicated admins. Connect with us to learn more!
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="col-4 mb-2">
          <h5 className="fw-bold">Quick Links</h5>
          <ul className="list-unstyled">
            <li>
              <a href="/home" className="text-white text-decoration-none">
                Home
              </a>
            </li>
            <li>
              <a href="/home" className="text-white text-decoration-none">
                About
              </a>
            </li>
            <li>
              <a href="/home" className="text-white text-decoration-none">
                Services
              </a>
            </li>
            <li>
              <a href="/home" className="text-white text-decoration-none">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="col-4 mb-2">
          <h5 className="fw-bold">Contact Us</h5>
          <ul className="list-unstyled">
            <li className="mb-2">
              +91 234567890
            </li>
            <li className="mb-2">
              support@example.com
            </li>
            <li>
              123 Street, City, Country
            </li>
          </ul>
        </div>
      </div>

      <hr className="bg-white" />

      {/* Footer Bottom Text */}
      <div className="text-center">
        <p className="mb-0">
          © {new Date().getFullYear()} Admin Panel. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
