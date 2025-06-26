import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center bg-light px-3">
        <section
          className="text-center bg-white rounded shadow-lg p-4 p-md-5 w-100"
          style={{ maxWidth: '600px' }}
        >
          <h1 className="fw-bold text-primary mb-3 fs-2 fs-md-1">
            Welcome to the Admin Panel
          </h1>
          <p className="lead fs-6 fs-md-5">
            Manage users, view reports, and control all aspects of your application with ease.
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
