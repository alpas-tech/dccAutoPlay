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
          <div ref={printRef} className="bg-white text-black/70 p-4 rounded-md shadow-md print:p-8 print:m-0">
            <h1 className="text-xl font-bold mb-2">Sample Document</h1>
            <p>
              This is a sample document preview. You can add your formatted content here, such as invoices, reports, or
              letters.
            </p>
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
