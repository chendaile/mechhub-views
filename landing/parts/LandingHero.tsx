import { motion } from "framer-motion";
import { Button } from "../../shared/ui/button";

interface LandingHeroProps {
    onStart: () => void;
}

export const LandingHero = ({ onStart }: LandingHeroProps) => {
    return (
        <div className="my-12 md:my-0 flex-1 flex flex-col justify-center">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0f172a] leading-[1.1] tracking-tight font-['Abhaya_Libre'] mb-10"
            >
                Theoretical Mechanics,
                <br />
                Reimagined by AI.
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Button onClick={onStart} size="lg" className="hover:scale-105">
                    Start Now
                </Button>
            </motion.div>
        </div>
    );
};
