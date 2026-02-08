import { Button } from "../../shared/ui/button";

interface LandingActionsProps {
    onLogin: () => void;
}

export const LandingActions = ({ onLogin }: LandingActionsProps) => {
    return (
        <div className="w-full flex justify-end mb-8 md:mb-0">
            <Button onClick={onLogin} variant="outline" size="md">
                Login
            </Button>
        </div>
    );
};
