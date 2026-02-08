import React from "react";
import { MessageSquare } from "lucide-react";
import type { ActiveView } from "../../shared/types";
import type { ChatSession } from "../../chat/types";
import { SessionItem } from "./SessionItem";
import styles from "../../shared/scrollbar.module.css";

interface SidebarSessionsProps {
    sessions: ChatSession[];
    activeView: ActiveView;
    currentSessionId: string | null;
    isLoading: boolean;
    onSelectSession: (id: string) => void;
    onDeleteSession: (id: string) => void;
    onRenameSession?: (id: string, newTitle: string) => Promise<boolean>;
}

export const SidebarSessions = ({
    sessions,
    activeView,
    currentSessionId,
    isLoading,
    onSelectSession,
    onDeleteSession,
    onRenameSession,
}: SidebarSessionsProps) => {
    return (
        <div className={`flex-1 overflow-y-auto px-6 py-2 ${styles.scrollbar}`}>
            <h3 className="text-xs font-bold text-text-faint uppercase tracking-wider mb-4">
                最近对话
            </h3>
            <div className="space-y-1">
                {isLoading ? (
                    <div className="animate-pulse space-y-3">
                        <div className="h-10 bg-fill-soft rounded-lg w-full"></div>
                        <div className="h-10 bg-fill-soft rounded-lg w-full"></div>
                        <div className="h-10 bg-fill-soft rounded-lg w-full"></div>
                    </div>
                ) : sessions.length === 0 ? (
                    <div className="text-sm text-text-faint text-center py-4">
                        暂无历史记录
                    </div>
                ) : (
                    sessions.map((session) => (
                        <SessionItem
                            key={session.id}
                            label={session.title}
                            icon={MessageSquare}
                            active={
                                currentSessionId === session.id &&
                                activeView === "chat"
                            }
                            onClick={() => onSelectSession(session.id)}
                            onDelete={(e) => {
                                e.stopPropagation();
                                onDeleteSession(session.id);
                            }}
                            onRename={
                                onRenameSession
                                    ? (newTitle) =>
                                          onRenameSession(session.id, newTitle)
                                    : undefined
                            }
                            isGeneratingTitle={session.isGeneratingTitle}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
