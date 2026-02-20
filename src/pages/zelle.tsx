// ZellePage.tsx
import zelle from '../assets/images_017.png'
import send from '../assets/send.png'
import receive from '../assets/rece.png'
import BottomNav from './stickyNav';
import BottomNav2 from './bottomnav2';
// import icon from '../assets/bank.png'

const ZellePage = () => {
  return (
    <>
    <div className="min-h-screen bg-white p-4 space-y-4 max-w-md mx-auto font-sans">
      {/* Header */}
      <div className="text-center text-lg font-semibold">Send or receive money with</div>
    <div className='w-[100px] m-auto'><img src={zelle} alt="" /></div> 
      <p className="text-center text-sm text-gray-500">or send to other Apex accounts you’ve added</p>

      {/* Alert */}
      <div className="bg-gray-100 p-3 rounded-md">
        <p className="text-sm font-semibold">Stay alert: online seller scams</p>
        <p className="text-xs text-gray-600">
          Treat Zelle<sup className="text-xs">®</sup> like cash – once you send it, you're unlikely to get it back.
        </p>
        <button className="text-blue-600 text-sm mt-2">SEE THE LATEST SCAMS</button>
      </div>

      {/* Pay / Request Buttons */}
      <div className="flex  justify-around items-center  p-4 rounded-md">
        <div className="text-center">
          <div className="w-16 h-16  rounded-full  flex  flex-col items-center justify-center mx-auto">
            <img src={send} alt="" width={50} />
            <div className="w-12 h-12  rounded-full flex items-center justify-center text-blue-700 font-semibold">Pay</div>
          </div>
        </div>
        <div className="text-center p-4">
            <img src={receive} alt="" width={50} />
          <div className="w-12 h-12  rounded-full flex items-center justify-center text-blue-700 font-semibold">Request</div>
        </div>
      </div>

      {/* Settings & Recipients */}
      <div className="flex justify-between text-blue-600 text-sm px-2">
        <button>SETTINGS</button>
        <button>RECIPIENTS</button>
      </div>

      
      
    </div>
    <BottomNav/>
    <BottomNav2/>
    </>
  );
};

export default ZellePage;
