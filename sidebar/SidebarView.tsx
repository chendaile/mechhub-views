import React from "react";
import { SidebarFooter } from "./parts/SidebarFooter";
import { SidebarHeader } from "./parts/SidebarHeader";
import { SidebarResizeHandle } from "./parts/SidebarResizeHandle";
import { SidebarSessions } from "./parts/SidebarSessions";
import type { SidebarViewProps } from "./types";

export const SidebarView: React.FC<SidebarViewProps> = ({
    activeView,
    sidebarWidth,
    user,
    sessions,
    currentSessionId,
    isLoading,
    onResizeMouseDown,
    onLogoClick,
    onLogoIconClick,
    onNewQuest,
    onSelectSession,
    onDeleteSession,
    onRenameSession,
    onOpenProfile,
    onSignOut,
}) => {
    return (
        <div
            className="relative flex flex-col border-r border-canvas-alt bg-canvas-alt"
            style={{ width: `${sidebarWidth}px` }}
        >
            <SidebarResizeHandle onMouseDown={onResizeMouseDown} />

            <SidebarHeader
                onLogoClick={onLogoClick}
                onLogoIconClick={onLogoIconClick}
                onNewQuest={onNewQuest}
            />

            <SidebarSessions
                sessions={sessions}
                activeView={activeView}
                currentSessionId={currentSessionId}
                isLoading={isLoading}
                onSelectSession={onSelectSession}
                onDeleteSession={onDeleteSession}
                onRenameSession={onRenameSession}
            />

            <SidebarFooter
                user={user}
                activeView={activeView}
                onOpenProfile={onOpenProfile}
                onSignOut={onSignOut}
            />
        </div>
    );
};
