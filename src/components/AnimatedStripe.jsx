import { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const AnimatedStripe = ({ opts }) => {
  const [config, setConfig] = useState({
    direction: "forward",
    ...opts,
  });
  const parentRef = useRef(null);

  useEffect(() => {
    let width = config.length
      ? parentRef.current.clientWidth / config.length
      : 60;
    let gap = config.gap ? config.gap : 50;
    let length = Math.floor(parentRef.current.clientWidth / (gap + width)) + 8;

    setConfig((prev) => ({
      ...prev,
      height: parentRef.current.clientHeight / 2,
      width,
      length,
      gap,
    }));
  }, []);

  useLayoutEffect(() => {
    if (config.length) {
      const swiftForward = gsap.to(
        [".animatedStripeTop", ".animatedStripeBtm"],
        {
          // x : -(config.width + config.gap) * (config.length - 1),
          x:
            (config.width + config.gap) *
            (config.direction === "forward" ? 1 : -1),
          ease: "none",
          duration: 3,
          repeat: -1,
        }
      );

      const t1 = gsap
        .timeline({
          yoyo: true,
          repeat: -1,
          defaults: {
            ease: "linear",
            duration: 1,
          },
        })
        // .to({}, { duration: 2 })
        .to(".animatedStripeTop", {
          // transformOrigin: `0px ${config.height}px`,
          rotate: "45deg",
        })
        .to(
          ".animatedStripeBtm",
          {
            // transformOrigin: `0px ${2 * config.height}`,
            rotate: "-45deg",
          },
          "<"
        )
        .to({}, { duration: 2 })
        .set("animatedStripeBtm" , {transformOrigin : '0px 0px'})
        .to(
          ".animatedStripeBtm",
          {
            
            rotate: "45deg",
          },
          "<"
        )
        .to({} , {duration : 2 })
    }
  }, [config]);
  return (
    <div
      className={`w-full h-full overflow-hidden`}
      style={config.parentStyle}
      ref={parentRef}
    >
      <div className="animatedStripeParent top absolute h-1/2 w-full overflow-hidden ">
        {config.length &&
          Array.from({ length: config.length }).map((_, i) => {
            return (
              <div
                className={`animatedStripeTop bg-ctp-blue absolute`}
                style={{
                  transformOrigin : `0px ${2 * config.height}px`,
                  width: config.width,
                  height: config.height * 3,
                  left: (i - 4) * (config.width + config.gap),
                  top: -config.height, // this would leave config.height over the top and config.height visible on screen and another config.height over the bottom
                }}
              ></div>
            );
          })}
      </div>

      <div
        className="absolute h-1/2 w-full overflow-hidden animatedStripeParent btm"
        style={{ top: config.height }}
      >
        {Array.from({ length: config.length }).map((_, i) => (
          <div
            className={`animatedStripeBtm bg-ctp-maroon absolute`}
            key={i}
            style={{
              transformOrigin : `0px ${config.height}px`,
              width: config.width,
              height: config.height * 3,
              left: (i - 4) * (config.width + config.gap),
              bottom: -config.height,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedStripe;
