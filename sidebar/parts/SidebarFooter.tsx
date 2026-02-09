import type { UserProfile, ActiveView } from "../../shared/types";
import { SidebarSignOut } from "./SidebarSignOut";
import { SidebarUserButton } from "./SidebarUserButton";

interface SidebarFooterProps {
    user: UserProfile;
    activeView: ActiveView;
    onOpenProfile: () => void;
    onSignOut?: () => void;
}

export const SidebarFooter = ({
    user,
    activeView,
    onOpenProfile,
    onSignOut,
}: SidebarFooterProps) => {
    return (
        <div className="p-4">
            <SidebarUserButton
                user={user}
                activeView={activeView}
                onClick={onOpenProfile}
            />

            {onSignOut && <SidebarSignOut onSignOut={onSignOut} />}
        </div>
    );
};
