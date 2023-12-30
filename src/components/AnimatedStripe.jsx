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

      const tl = gsap
        .timeline({
          yoyo: true,
          repeat: -1,
          defaults: {
            ease: "linear",
            duration: 2,
          },
        })
        // .to(".animatedStripeTop", {
        //   rotate: "45deg",
        // })
        // .to(
        //   ".animatedStripeBtm",
        //   {
        //     rotate: "-45deg",
        //   },
        //   "<"
        // )
        // .to(
        //   ".animatedStripeBtm",
        //   {
            
        //     rotate: "45deg",
        //   },
        //   "<"
        // )

        

        const leanForward = (durationMult,tweenProps) => {
          return tl
            .to(".animatedStripeTop", {
              rotate: "45deg",
              duration: tl.vars.defaults.duration *  (durationMult ?? 1 ),
              ...tweenProps
            })
            .to(
              ".animatedStripeBtm",
              {
                rotate: "45deg",
                duration: tl.vars.defaults.duration *  (durationMult ?? 1 ),
                ...tweenProps
              },
              "<"
            );
        }

        const leanBackward = (durationMult,tweenProps) => {
          return tl
            .to(".animatedStripeTop", {
              rotate: "-45deg",
              duration: tl.vars.defaults.duration * (durationMult ?? 1 ),
              ...tweenProps
            })
            .to(".animatedStripeBtm", {
                rotate: "-45deg",
                duration: tl.vars.defaults.duration *  (durationMult ?? 1 ),
                ...tweenProps
              }, "<"
            );
        }

        const pierceBackwards = (durationMult,tweenProps) => {
          return tl
            .to(".animatedStripeTop", {
              rotate: "45deg",
              duration: tl.vars.defaults.duration *  (durationMult ?? 1 ),
              ...tweenProps
            })
            .to(
              ".animatedStripeBtm",
              {
                rotate: "-45deg",
                duration: tl.vars.defaults.duration *  (durationMult ?? 1 ),
                ...tweenProps
              },
              "<"
            );
        }

        const pierceFowards = (durationMult,tweenProps) => {
          return tl
            .to(".animatedStripeTop", {
              rotate: "-45deg",
              duration: tl.vars.defaults.duration *  (durationMult ?? 1 ),
              ...tweenProps
            })
            .to(
              ".animatedStripeBtm",
              {
                rotate: "45deg",
                duration: tl.vars.defaults.duration *  (durationMult ?? 1 ),
                ...tweenProps
              },
              "<"
            );
        }

        leanForward()
        leanBackward()
        pierceFowards()
        pierceBackwards()
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
                  transformOrigin : `50% ${2 * config.height}px`,
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
              transformOrigin : `50% ${config.height}px`,
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