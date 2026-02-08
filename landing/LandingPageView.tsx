import React from "react";
import { motion } from "motion/react";
import { MechHubLogo } from "../shared/MechHubLogo";
import { cardVariants } from "../shared/ui/card";
import { cn } from "../shared/utils";
import { LandingActions } from "./parts/LandingActions";
import { LandingBackground } from "./parts/LandingBackground";
import { LandingHero } from "./parts/LandingHero";
import { LandingImage } from "./parts/LandingImage";

interface LandingPageViewProps {
    onStart: () => void;
    onLogin: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
    onStart,
    onLogin,
}) => {
    return (
        <div className="min-h-screen bg-[#f0f4f9] flex items-center justify-center p-4 md:p-8 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn(
                    cardVariants({ radius: "hero", shadow: "sm" }),
                    "w-full max-w-7xl relative min-h-[37.5rem] flex flex-col md:flex-row overflow-hidden",
                )}
            >
                <LandingBackground />

                <div className="relative z-10 w-full h-full flex flex-col md:flex-row p-8 md:p-12 lg:p-16">
                    <div className="flex-1 flex flex-col justify-between">
                        <MechHubLogo />
                        <LandingHero onStart={onStart} />
                    </div>

                    <div className="flex-1 flex flex-col items-center md:items-end justify-between relative">
                        <LandingActions onLogin={onLogin} />
                        <LandingImage />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
