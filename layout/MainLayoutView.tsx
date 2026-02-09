import React from "react";
import type { ActiveView } from "../shared/types";

interface MainLayoutViewProps {
    activeView: ActiveView;
    sidebar: React.ReactNode;
    home: React.ReactNode;
    chat: React.ReactNode;
    profile: React.ReactNode;
}

export const MainLayoutView = ({
    activeView,
    sidebar,
    home,
    chat,
    profile,
}: MainLayoutViewProps) => {
    return (
        <div className="flex h-screen bg-white text-slate-800 overflow-hidden" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
            {sidebar}

            <main className="flex-1 flex flex-col h-full relative overflow-hidden min-w-0 min-h-0">
                {activeView === "home" && home}
                {activeView === "chat" && chat}
                {activeView === "profile" && profile}
            </main>
        </div>
    );
};
