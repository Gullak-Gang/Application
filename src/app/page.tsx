"use client";

import LandingNavigation from "@/components/landing-navbar";
import { Circle, Icons } from "@/components/landing-navbar/icons";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import Particles from "@/components/ui/particles";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Ripple from "@/components/ui/ripple";
import Safari from "@/components/ui/safari";
import SparklesText from "@/components/ui/sparkles-text";
import { ChartBarStacked } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <>
      {/* Navbar */}
      <LandingNavigation />
      {/* Section 1 */}
      <section className="flex flex-col justify-center items-center h-[90vh] space-y-4">
        <SparklesText
          text="All your Insights in one Place"
          className="w-2/4 text-balance text-center text-4xl font-bold capitalize md:text-7xl leading-relaxed"
        />
        <p className="font-light text-xl text-card-foreground w-1/3 text-center text-balance ">
          Collect and generate insights from all your socials, so you can focus on what really matters{" "}
        </p>
        <div className="m-5">
          <RainbowButton className="dark:text-secondary-foreground text-primary-foreground">
            <Link href="/dashboard">Get Started</Link>
          </RainbowButton>
        </div>
      </section>

      {/* Section 2 */}
      <section className="flex flex-col justify-center items-center space-y-4 mb-40">
        <h2 className="font-semibold text-4xl text-card-foreground">Collect all your feedback in one place</h2>
        <p className="font-light text-lg text-card-foreground w-2/3 text-center text-balance">
          Gullak acts as a central hub for your work, seamlessly communicating between your socials and giving
          actionable insights
        </p>

        <div
          className={
            "relative flex items-center justify-center w-full sm:w-1/3 backdrop-blur rounded-3xl border bg-card/30 p-10 shadow-md"
          }
          ref={containerRef}
        >
          <div className="flex size-full flex-row items-stretch justify-between gap-10 max-w-lg">
            <div className="flex flex-col justify-center gap-2">
              <Circle ref={div1Ref}>
                <Icons.googleDrive />
              </Circle>
              <Circle ref={div3Ref}>
                <Icons.twitter />
              </Circle>
              <Circle ref={div4Ref}>
                <Icons.instagram />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle ref={div6Ref} className="size-16">
                <ChartBarStacked className="size-7" />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle ref={div7Ref}>
                <Icons.user />
              </Circle>
            </div>
          </div>

          <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div6Ref} />
          <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div6Ref} />
          <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div6Ref} />
          <AnimatedBeam containerRef={containerRef} fromRef={div4Ref} toRef={div6Ref} />
          <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div7Ref} />
        </div>
      </section>

      {/* Section 3 */}
      <section className="flex flex-col justify-center items-center space-y-4 mb-40">
        <h2 className="font-semibold text-4xl text-card-foreground">Complete feedback Anaylsis</h2>
        <p className="font-light text-lg text-card-foreground w-2/3 text-center text-balance">
          Get complete overview of the application, seamlessly communicating between your socials and giving actionable
          insights
        </p>
        <Safari
          height={731}
          width={1200}
          url="https://gullak.drishxd.dev"
          className="bg-contain w-full"
          src="/images/cover.png"
        />
      </section>

      {/* Section 4 */}
      <section className="flex flex-col justify-center items-center space-y-6 mt-4 mb-40">
        <h2 className="font-semibold text-4xl text-card-foreground">Remagine Analysis Together</h2>
        <RainbowButton className="dark:text-secondary-foreground text-primary-foreground">
          <Link href="/dashboard">Get Started</Link>
        </RainbowButton>
      </section>

      {/* Background */}
      <Ripple className="fixed inset-0 -z-10" />
      <Particles className="fixed inset-0" quantity={100} ease={80} color={color} refresh />

      <footer className="flex flex-col justify-center items-center min-h-20 space-y-4 p-4">
        <p className="font-light text-sm text-card-foreground">Made with ❤️ by Team Gullak</p>
        <p className="font-light text-sm text-card-foreground">Copyright © 2024</p>
      </footer>
    </>
  );
}
