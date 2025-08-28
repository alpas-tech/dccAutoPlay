'use client';

import { PopUpModel } from '@/components/shared-components/popup-modal/PopupModal';
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const DocumentBtn = () => {
  const [showPopupModel, setShowPopupModel] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // ✅ react-to-print setup
  const handlePrint = useReactToPrint({
    contentRef: printRef, // 👈 NEW API works better in v3
    documentTitle: 'Sample Document',
    onAfterPrint: () => console.log('✅ Printing finished!'),
  });

  return (
    <div>
      {showPopupModel && (
        <PopUpModel onClick={() => setShowPopupModel(false)}>
          {/* Content to print */}
          <div ref={printRef} className="bg-white text-black/70 p-6 rounded-md shadow-md print:p-8 print:m-0">
            <PrintContent />
          </div>

          {/* Print Button */}
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-crosshair"
            onClick={handlePrint}
          >
            Print
          </button>
        </PopUpModel>
      )}

      <div className="flex justify-end mx-6">
        <button
          onClick={() => setShowPopupModel(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 transition my-2 cursor-pointer"
        >
          Print view
        </button>
      </div>
    </div>
  );
};

export default DocumentBtn;

const PrintContent = () => {
  return (
    <>
      {/* Header */}
      <div className="text-center border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold text-black">Company Name</h1>
        <p className="text-sm text-gray-500">123 Business Street, Kathmandu, Nepal</p>
        <p className="text-sm text-gray-500">Phone: +977 1 444444 | Email: info@company.com</p>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-2">Sample Document / Invoice</h2>
      <p className="mb-4">
        This is a sample document preview. You can add your formatted content here, such as invoices, reports, or
        letters.
      </p>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 mb-6 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-3 py-2 text-left">Item</th>
            <th className="border border-gray-300 px-3 py-2 text-right">Quantity</th>
            <th className="border border-gray-300 px-3 py-2 text-right">Price</th>
            <th className="border border-gray-300 px-3 py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-3 py-2">Product A</td>
            <td className="border border-gray-300 px-3 py-2 text-right">2</td>
            <td className="border border-gray-300 px-3 py-2 text-right">Rs. 500</td>
            <td className="border border-gray-300 px-3 py-2 text-right">Rs. 1000</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-3 py-2">Product B</td>
            <td className="border border-gray-300 px-3 py-2 text-right">1</td>
            <td className="border border-gray-300 px-3 py-2 text-right">Rs. 750</td>
            <td className="border border-gray-300 px-3 py-2 text-right">Rs. 750</td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="font-bold">
            <td colSpan={3} className="border border-gray-300 px-3 py-2 text-right">
              Total
            </td>
            <td className="border border-gray-300 px-3 py-2 text-right">Rs. 1750</td>
          </tr>
        </tfoot>
      </table>

      {/* Notes */}
      <div className="mb-6">
        <h3 className="font-semibold">Notes</h3>
        <p className="text-sm text-gray-600">
          Thank you for your business. Payment is due within 7 days. Please contact us if you have any questions.
        </p>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 border-t pt-4">
        <p>Generated on {new Date().toLocaleDateString()}</p>
        <p>© {new Date().getFullYear()} Company Name. All rights reserved.</p>
      </div>
    </>
  );
};
