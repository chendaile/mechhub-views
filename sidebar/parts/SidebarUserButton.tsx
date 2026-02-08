import React from "react";
import { Settings } from "lucide-react";
import { cn } from "../../shared/utils";
import { ICON_SIZE } from "../../shared/ui-constants";
import type { UserProfile, ActiveView } from "../../shared/types";

interface SidebarUserButtonProps {
    user: UserProfile;
    activeView: ActiveView;
    onClick: () => void;
}

export const SidebarUserButton = ({
    user,
    activeView,
    onClick,
}: SidebarUserButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex w-full items-center gap-3 rounded-xl p-2 text-left text-[1.25rem] transition-colors",
                activeView === "profile"
                    ? "bg-surface text-text-secondary"
                    : "text-text-secondary hover:bg-surface",
            )}
        >
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-surface bg-border-subtle shadow-sm">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-text-secondary truncate">
                    {user.name}
                </div>
            </div>
            <Settings size={ICON_SIZE.md} className="text-focus-ring" />
        </button>
    );
};
