import React from "react";
import { LogOut } from "lucide-react";
import { ICON_SIZE } from "../../shared/ui-constants";

interface SidebarSignOutProps {
    onSignOut: () => void;
}

export const SidebarSignOut = ({ onSignOut }: SidebarSignOutProps) => {
    return (
        <button
            onClick={onSignOut}
            className="flex items-center gap-2 text-xs font-bold text-text-faint hover:text-danger transition-colors w-full px-4 py-2 mt-2 rounded-lg hover:bg-fill-muted"
        >
            <LogOut size={ICON_SIZE.xs} />
            退出登录
        </button>
    );
};
