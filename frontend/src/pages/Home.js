import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center p-5 bg-white rounded shadow">
          <h2 className="display-4 fw-bold text-primary">Welcome to the Admin Panel</h2>
          <p className="mt-3 text-secondary">
            Manage your application efficiently and effectively from here.
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
