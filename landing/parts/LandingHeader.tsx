import { MechHubLogo } from "../../shared/MechHubLogo";
import { LandingActions } from "./LandingActions";

interface LandingHeaderProps {
    onLogin: () => void;
}

export const LandingHeader = ({ onLogin }: LandingHeaderProps) => {
    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="flex w-full items-center justify-between px-6 py-5 md:px-12 lg:px-20">
                <MechHubLogo className="origin-left scale-[0.78] md:scale-[0.9]" />
                <LandingActions onLogin={onLogin} />
            </div>
        </header>
    );
};
