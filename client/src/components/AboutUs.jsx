import { ABOUT_1 } from '../constants';
const AboutUs = () => {
    return (
    <div className='border-b border-black pb-[60px] '> 
        <div className="border-l-8 border-red-500 mx-12 pl-4 my-4 p-4">
        <h1 className="text-4xl font-bold ">ABOUT US</h1>
        </div>
        
        {/* main section */}
        <div className='flex justify-around'>
            {/* left column */}
            <div className='flex flex-col lg-flex-row lg:space-x-8 items-center'>
            <div className='flex flex-wrap text-center mx-[30px] '>  
                <p className="my-4 max-w-[500px] py-6 font-light tracking-tighter text-justify"> {ABOUT_1} </p>
            </div>
        
                <img src="src/assets/cornrows.jpg" alt="about me" 
                className="w-[500px] h-[400px] object-cover object-top rounded-lg shadow-lg"/>

            </div>

            {/* right column */}

        <div className='flex flex-col lg-flex-row lg:space-x-8 items-center'>
        <img src="src/assets/cornrows.jpg" alt="about me" 
                className="w-[500px] h-[400px] object-cover object-top rounded-lg shadow-lg"/>

            <div className='flex flex-wrap text-center -mx-[30px] '>  
                <p className=" max-w-[500px] py-6 font-light tracking-tighter text-justify"> {ABOUT_1} </p>
            </div>

        </div>







        </div>
    </div>
    )  
}

export default AboutUs