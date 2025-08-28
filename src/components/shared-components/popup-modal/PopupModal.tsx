export const PopUpModel = ({ children, onClick = () => {} }: { children: React.ReactNode; onClick: any }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative flex items-center justify-center h-full w-full p-4">
        <div className="relative bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-md p-4 shadow-lg">
          <button
            onClick={onClick}
            className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          {children}
        </div>
      </div>
    </div>
  );
};
