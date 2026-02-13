import React from "react";
import { SidebarFooter } from "./parts/SidebarFooter";
import { SidebarHeader } from "./parts/SidebarHeader";
import { SidebarResizeHandle } from "./parts/SidebarResizeHandle";
import { SidebarSessions } from "./parts/SidebarSessions";
import type { SidebarViewProps } from "./types";

export const SidebarView: React.FC<SidebarViewProps> = ({
    activeView,
    canAccessChat,
    sidebarWidth,
    user,
    sessions,
    currentSessionId,
    isLoading,
    onResizeMouseDown,
    onLogoClick,
    onLogoIconClick,
    onNewQuest,
    renderSession,
    onOpenProfile,
    onOpenClassHub,
    onSubmitAssignment,
    onViewFeedback,
    onPublishAssignment,
    onGradeAssignment,
    onSignOut,
}) => {
    return (
        <div
            className="relative flex flex-col border-r border-[#f0f4f9] bg-[#f0f4f9]"
            style={{ width: `${sidebarWidth}px` }}
        >
            <SidebarResizeHandle onMouseDown={onResizeMouseDown} />

            <SidebarHeader
                onLogoClick={onLogoClick}
                onLogoIconClick={onLogoIconClick}
                onNewQuest={canAccessChat ? onNewQuest : undefined}
            />

            {canAccessChat ? (
                <SidebarSessions
                    sessions={sessions}
                    activeView={activeView}
                    currentSessionId={currentSessionId}
                    isLoading={isLoading}
                    renderSession={renderSession}
                />
            ) : (
                <div className="flex-1 px-6 py-2">
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-4 text-xs text-slate-500">
                        Chat access is not enabled for this account.
                    </div>
                </div>
            )}

            <SidebarFooter
                user={user}
                activeView={activeView}
                onOpenProfile={onOpenProfile}
                onOpenClassHub={onOpenClassHub}
                onSubmitAssignment={onSubmitAssignment}
                onViewFeedback={onViewFeedback}
                onPublishAssignment={onPublishAssignment}
                onGradeAssignment={onGradeAssignment}
                onSignOut={onSignOut}
            />
        </div>
    );
};
