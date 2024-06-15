import React from 'react';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m0 0a9 9 0 110-12 9 9 0 010 12z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Payment Successful</h2>
        <p className="text-gray-600 mb-6">Thank you for your payment. Your transaction has been completed.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => window.location.href = '/'}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
