import { PiHairDryer } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
const Services = () => {
    const navigate = useNavigate();
  return (
    <div className='border-b  border-black pb-2'>
        <header className='relative h-1/4 bg-black text-white overflow-x-hidden'>
        <div className="flex items-start lg:w-1/2 p-8 ">
                <h1 className="text-6xl font-bold justify-center ml-20">
                <span className="block">SHAY'S</span>
                <span className="block text-red-500">SERVICE</span>
                </h1>
            </div>
        </header>
        <div className="flex flex-col">
            {/* first line */}
            <div className="flex flex-col">
            <div className='flex flex-wrap items-center justify-around gap-4 py-8'>
                <div>
                    <div className='rounded-full border-4 bg-grey-400 p-4 '>
                    <PiHairDryer className="text-[180px] text-black"/>
                    </div>
                <p className="text-center py-4 font-medium">BOHO BRAIDS</p>
                </div>
                
                <div>
                    <div className='rounded-full border-4 bg-grey-400 p-4 '>
                    <PiHairDryer className="text-[180px] text-black"/>
                    </div>
                <p className="text-center py-4 font-medium">6 STICHES</p>
                </div>

                <div>
                    <div className='rounded-full border-4 bg-grey-400 p-4 '>
                    <PiHairDryer className="text-[180px] text-black"/>
                    </div>
                <p className="text-center py-4 font-medium">ROPE TWIST</p>
                </div>
            
            </div>
            <button
            className="bg-red-600 text-white w-[120px] h-[50px]"
            onClick={() => navigate("/login")} // Navigate to the login page
        >
            BOOK NOW
        </button>
            </div>
                    {/* second line */}
            <div className='flex flex-wrap items-center justify-around gap-4 py-12'>
            <div>
                    <div className='rounded-full border-4 bg-grey-400 p-4 '>
                    <PiHairDryer className="text-[180px] text-black"/>
                    </div>
                <p className="text-center py-4 font-medium">PASSION TWISTS</p>
                </div>

                <div>
                    <div className='rounded-full border-4 bg-grey-400 p-4 '>
                    <PiHairDryer className="text-[180px] text-black"/>
                    </div>
                <p className="text-center py-4 font-medium">WIG INSTALL</p>
                </div>

                <div>
                    <div className='rounded-full border-4 bg-grey-400 p-4 '>
                    <PiHairDryer className="text-[180px] text-black"/>
                    </div>
                <p className="text-center py-4 font-medium">SOFT LOCKS</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Services