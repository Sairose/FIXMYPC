import { useNavigate } from "react-router-dom";
import Footer from "../../components/Landing-Page/Footer"
import NavBar from "../../components/Landing-Page/NavBar"
import CustomButton from "../../components/UI/CustomButton"
import About from "./About"
import { IoMdArrowUp } from "react-icons/io";



const Home = () => {
    const navigate = useNavigate();
    const handleSignLoginRoute = (data) =>{
        if(data == 'sign'){
            console.log(data);
            navigate('/signup');
        }
        else if(data == 'login'){
            navigate('/login');
        }  
    }
    return (
        <>
            <NavBar />
            <a href="#navbar" className="fixed bottom-16 right-[120px] w-fit p-3 border-none bg-[#05B878] rounded-full animate-bounce  hover:cursor-pointer">
                <IoMdArrowUp className="text-3xl text-white"/>
            </a>
            <div id="home"
                className="h-[calc(100vh-100px)] w-[100%] bg-[#2A3794] text-white flex flex-col  gap-20  items-center justify-center lg:flex-row lg:gap-5 lg:justify-between lg:items-center px-[60px] lg:px-[120px]">
                <div className="hero-left w-full flex flex-col gap-5 md:w-[400px] lg:w-[534px]">
                    <h2 className="font-Source-Serif font-semibold text-[30px]  lg:text-[48px] lg:leading-14">Welcome To Freelencing Website</h2>
                    <p className="font-Poppins text-[16px] md:text-[18px] lg:text-[20px] "
                    >Hi this  is  the best website for hiring freelencer , getting clients , chat in real time</p>
                    <div className="button-group ">
                        <button
                            className="w-[100px] h-[40px]  border rounded-[30px] bg-[#05B878] border-none text-white hover:cursor-pointer hover:translate-x-[-10px] hover:translate-y-[-10px] duration-300 ease-in lg:w-[150px] lg:h-[50px]"
                        onClick={()=> handleSignLoginRoute('sign')}>SignUp</button>
                        <button
                            className="w-[100px] h-[40px] border rounded-[30px] border-[#05B878] text-white hover:cursor-pointer hover:bg-[#05B878] hover:translate-x-[-10px] hover:translate-y-[-10px] duration-300 ease-in ml-5 lg:w-[150px] lg:h-[50px] lg:ml-10"
                        onClick={()=> handleSignLoginRoute('login')}>Login</button>
                    </div>
                </div>
                <div className="hero-right">
                    <img src="./images/hero-image.png" alt="Error"
                        className="w-[400px] h[400px] object-cover md:w-[450px] lg:w-[534px] lg:h-[357px] "
                    />
                </div>
            </div>
            <About />
            <Footer/>
        </>
    )
}

export default Home
