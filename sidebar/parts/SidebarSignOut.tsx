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
            className="flex items-center gap-2 text-xs font-bold text-[#94a3b8] hover:text-[#ef4444] transition-colors w-full px-4 py-2 mt-2 rounded-[1rem] hover:bg-[#f8fafc]"
        >
            <LogOut size={ICON_SIZE.xs} />
            退出登录
        </button>
    );
};
