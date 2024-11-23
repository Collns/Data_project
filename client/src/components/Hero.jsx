import {SHAYS_CONTENT} from "../constants";

const Hero = () => {
    return (
        <div className="border-b border-white pb-[50px] lg:mb-35">
        <section className="relative h-1/4 bg-black text-white overflow-x-hidden "
            style={{
            clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 100%)",
            }}
        >
            <div className="flex flex-row items-center justify-between flex-wrap lg:p-8">
            {/* Title Section */}
            <div className="flex flex-col items-start lg:w-1/2 p-2 ">
                <h1 className="text-8xl font-bold justify-center ml-20">
                <span className="block">SHAY'S</span>
                <span className="block text-red-500">PALACE</span>
                </h1>
            </div>
            {/* Image Section */}
            <div className=" lg:w-1/2 flex justify-center p-2">
            <img 
                src="src/assets/corn.jpg" 
                alt="main picture" 
                className="w-[350px] h-[250px] object-contain shadow-lg rounded-lg"
            />
            </div>
        </div>
        </section>

        <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 lg:p-8">
            <div className="flex justify-center">
                <img src="src/assets/cornrows.jpg" alt="about me" 
                className="w-[500px] h-[400px] object-cover object-top rounded-lg shadow-lg"/>
            </div>
            </div>

    <div className="w-full lg:w-1/2">
        <div className="flex items-start space-x-4">
    {/* Red Dash */}
    <div className="w-2 h-16 bg-red-500 mt-10"></div>

    {/* Text Section */}
    <div className="flex flex-col items-center lg:items-start">
    <h1 className="text-4xl font-thin tracking-tight lg:mt-8">
        <span className="block">SHAY'S</span>
        <span className="block">PALACE</span>
    </h1>

    <p className="my-2 max-w-xl py-6 font-light tracking-tighter">
        {SHAYS_CONTENT}
    </p>
    <button className="bg-red-600 rounded py-2 px-2 text-white">
        BOOK AN APPOINTMENT
    </button>
    </div>
</div>
</div>

        </div>

        </div>
    );
}

export default Hero;
