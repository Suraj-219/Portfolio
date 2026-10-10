import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const isPhone = useMediaQuery({ maxWidth: 639 });
  const text = `I help growing brands and startups gain an
unfair advantage through premium
results driven webs/apps`;
  return (
    <section
      id="home"
      className="relative isolate flex flex-col justify-end min-h-screen max-[639px]:justify-start max-[639px]:bg-black"
    >
      <AnimatedHeaderSection
        subTitle={"404 No Bugs Found"}
        titleParts={[
          { text: "SURAJ", className: isPhone ? "text-white" : "text-black" },
          { text: "PAL", className: "text-white" },
        ]}
        text={text}
        textColor={"text-white"}
        subtitleColor={"text-black"}
        delay={1.5}
        animate={!isPhone}
      />
      <figure
        className="absolute inset-0 -z-50 bg-cover bg-center bg-no-repeat"
        style={{
          height: "100vh",
          backgroundImage: "url('/images/suraj.jpg')",
          backgroundSize: isPhone ? "160% auto" : "cover",
          backgroundPosition: isPhone ? "right bottom" : "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {!isPhone && (
          <Canvas
            shadows
            camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
          >
            <ambientLight intensity={0.5} />
            <Float speed={0.5}>
              <Planet
                scale={isMobile ? 0.7 : 1}
                position={isMobile ? [0, 0, 0] : [2, 0, 0]}
              />
            </Float>
            <Environment resolution={256}>
              <group rotation={[-Math.PI / 3, 4, 1]}>
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[0, 5, -9]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[0, 3, 1]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[-5, -1, -1]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[10, 1, 0]}
                  scale={16}
                />
              </group>
            </Environment>
          </Canvas>
        )}
      </figure>
    </section>
  );
};

export default Hero;
