import BottomNav2 from "../pages/bottomnav2";
import BottomNav from "../pages/stickyNav";

const LoanPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-2xl font-bold mb-6">Current Loans</h1>

        {/* <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="material-icons text-red-500">percent</span>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-red-500">100,000.00 USD</p>
            </div>
          </div>
          <button className="text-green-500 font-medium hover:underline">
            Paid
          </button>
        </div>

       
        <div className="mt-4">
          <div className="flex justify-between text-gray-600">
            <span>Rate</span>
            <span>13%</span>
          </div>
          <div className="flex justify-between text-gray-600 mt-2">
            <span>Period</span>
            <span>10 months</span>
          </div>
          <div className="flex justify-between text-gray-600 mt-2">
            <span>Monthly payment</span>
            <span>10,000 USD</span>
          </div>
          <div className="flex justify-between text-gray-600 mt-2">
            <span>Total paid</span>
            <span>101,500.00 USD</span>
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="material-icons text-red-500">percent</span>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-red-500">100,000.00 USD</p>
            </div>
          </div>
          <button className="text-green-500 font-medium hover:underline">
            Paid
          </button>
        </div>

       
        <div className="mt-4">
          <div className="flex justify-between text-gray-600">
            <span>Rate</span>
            <span>13%</span>
          </div>
          <div className="flex justify-between text-gray-600 mt-2">
            <span>Period</span>
            <span>10 months</span>
          </div>
          <div className="flex justify-between text-gray-600 mt-2">
            <span>Monthly payment</span>
            <span>10,000 USD</span>
          </div>
          <div className="flex justify-between text-gray-600 mt-2">
            <span>Total paid</span>
            <span>101,500.00 USD</span>
          </div>
        </div>
      </div>*/}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="material-icons text-red-500">percent</span>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-red-500">
                  €100,000.00
                </p>
              </div>
            </div>
            <button className="text-green-500 font-medium hover:underline">
              Eligible
            </button>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-gray-600">
              <span>Rate</span>
              <span>13%</span>
            </div>
            <div className="flex justify-between text-gray-600 mt-2">
              <span>Period</span>
              <span>10 months</span>
            </div>
            <div className="flex justify-between text-gray-600 mt-2">
              <span>Monthly payment</span>
              <span>€10,000</span>
            </div>
            <div className="flex justify-between text-gray-600 mt-2">
              <span>Total </span>
              <span>€101,500.00</span>
            </div>
            <button className="bg-black text-white px-9 py-1 mt-4 ">
              Apply
            </button>
          </div>
        </div>

        {/* New Loan Button */}
        <button className="w-full py-3 bg-orange-200 text-orange-700 font-semibold rounded-lg hover:bg-orange-300">
          + New Loan
        </button>
      </div>
      <BottomNav />
      <BottomNav2 />
    </>
  );
};

export default LoanPage;
