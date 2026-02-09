import React from "react";
import type { ActiveView } from "../../shared/types";
import type { ChatSession } from "../../chat/types";
import styles from "../../shared/scrollbar.module.css";

interface SidebarSessionsProps {
    sessions: ChatSession[];
    activeView: ActiveView;
    currentSessionId: string | null;
    isLoading: boolean;
    renderSession: (session: ChatSession, active: boolean) => React.ReactNode;
}

export const SidebarSessions = ({
    sessions,
    activeView,
    currentSessionId,
    isLoading,
    renderSession,
}: SidebarSessionsProps) => {
    return (
        <div className={`flex-1 overflow-y-auto px-6 py-2 ${styles.scrollbar}`}>
            <h3 className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-4">
                最近对话
            </h3>
            <div className="space-y-1">
                {isLoading ? (
                    <div className="animate-pulse space-y-3">
                        <div className="h-10 bg-[#f1f5f9] rounded-[1rem] w-full"></div>
                        <div className="h-10 bg-[#f1f5f9] rounded-[1rem] w-full"></div>
                        <div className="h-10 bg-[#f1f5f9] rounded-[1rem] w-full"></div>
                    </div>
                ) : sessions.length === 0 ? (
                    <div className="text-sm text-[#94a3b8] text-center py-4">
                        暂无历史记录
                    </div>
                ) : (
                    sessions.map((session) => {
                        const isActive =
                            currentSessionId === session.id &&
                            activeView === "chat";
                        return (
                            <React.Fragment key={session.id}>
                                {renderSession(session, isActive)}
                            </React.Fragment>
                        );
                    })
                )}
            </div>
        </div>
    );
};
