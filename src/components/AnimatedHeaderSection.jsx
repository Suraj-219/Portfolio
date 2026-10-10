import React from "react";
import { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const AnimatedHeaderSection = ({
  subTitle,
  title,
  titleParts,
  text,
  textColor = "text-white",
  subtitleColor,
  titleColor,
  delay = 0,
  withScrollTrigger = false,
  animate = true,
}) => {
  const effectiveSubtitleColor = subtitleColor || textColor;
  const effectiveTitleColor = titleColor || textColor;
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const computedTitleParts =
    titleParts || (title.includes(" ") ? title.split(" ") : [title]);
  useGSAP(() => {
    if (!animate) return;

    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
          }
        : undefined,
    });
    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
      delay,
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: "200",
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2",
    );
  }, [animate]);
  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
        >
          <p
            className={`text-sm font-light tracking-[0.5rem] uppercase px-10 ${effectiveSubtitleColor}`}
          >
            {subTitle}
          </p>
          <div className="px-10">
            <h1
              className={`flex flex-col gap-12 uppercase banner-text-responsive sm:gap-16 md:block ${effectiveTitleColor}`}
            >
              {computedTitleParts.map((part, index) => {
                if (typeof part === "object") {
                  return (
                    <span
                      key={index}
                      className={part.className || effectiveTitleColor}
                    >
                      {part.text}
                    </span>
                  );
                }
                return <span key={index}>{part} </span>;
              })}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-10 ${textColor}`}>
        <div className="py-12 sm:py-16 text-end">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive ${textColor}`}
            animate={animate}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
