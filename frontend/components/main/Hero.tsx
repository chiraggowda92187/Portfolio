import { HeroContent } from "../sub/HeroContent"

export const Hero = ()=>{
    return (
      <div className="relative flex flex-col w-full h-full " id="about-me">
        {/* <video
          autoPlay
          muted
          loop
          className="roatet-180 absolute top-[-340px] left-0 z-[1] w-full h-full object-cover"
        >
          <source src="/blackhole.webm" type="video/webm" />
        </video> */}
        <HeroContent />
      </div>
    );
}