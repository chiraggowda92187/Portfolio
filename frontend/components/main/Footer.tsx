import { FaYoutube } from "react-icons/fa"
import { RxDiscordLogo, RxGithubLogo, RxInstagramLogo, RxLinkedinLogo, RxTwitterLogo } from "react-icons/rx"







 const Footer = ()=>{
    return (
      <div className="h-full w-full bg-transparent text-gray-200 shadow-lg p-[15px]">
        <div className="w-full flex flex-col items-center justify-center m-auto">
          <div className="w-full h-full flex flex-row items-center justify-around flex-wrap ">
            <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
              <div className="font-bold text-[16px]">Social Media</div>
              <p className="flex flex-row items-center my-[15px] cursor-pointer z-[25] ">
                <div className ="text-[15px] font-semibold">X</div>
                <span className="text-[15px] ml-[6px]">
                  <a href="https://x.com/ChiragG11071954 ">X.com</a>
                </span>
              </p>
              <p className="flex flex-row items-center my-[15px] cursor-pointer z-[25] ">
                <RxLinkedinLogo />
                <span className="text-[15px] ml-[6px]">
                  <a href="https://www.linkedin.com/in/chirag-t-c-718096269/ ">
                    Linkedin
                  </a>
                </span>
              </p>
            </div>

            <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
              <div className="font-bold text-[16px]">About </div>
              {/* <p className="flex flex-row items-center my-[15px] cursor-pointer ">
                <span className="text-[15px] ml-[6px]">Buy me Coffee</span>
              </p> */}
              <p className="flex flex-row items-center my-[15px] cursor-pointer ">
                <span className="text-[15px] ml-[6px]">
{/*                  Learn about me */}
                </span>
              </p>
              <p className="flex flex-row items-center my-[15px] cursor-pointer z-[25]">
                <span className="text-[15px] ml-[6px]">
                  chirag1ga20ec042@gmail.com
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mb-[15px] text-[15px] text-center">
          Thanks for coming this far!
        </div>
      </div>
    );
}
export default Footer;
