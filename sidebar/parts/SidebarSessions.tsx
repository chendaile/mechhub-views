import React from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import type { ActiveView } from "../../shared/types";
import type { ChatSession } from "../../chat/types";
import type { SidebarClassGroup, SidebarClassThread } from "../types";
import styles from "../../shared/scrollbar.module.css";

interface SidebarSessionsProps {
    sessions: ChatSession[];
    classGroups: SidebarClassGroup[];
    activeView: ActiveView;
    currentSessionId: string | null;
    activeClassThreadId?: string;
    isLoading: boolean;
    onCreateClassThread?: (classId: string) => void;
    creatingClassThreadId?: string | null;
    onSelectClassThread?: (thread: SidebarClassThread) => void;
    renderSession: (session: ChatSession, active: boolean) => React.ReactNode;
}

export const SidebarSessions = ({
    sessions,
    classGroups,
    activeView,
    currentSessionId,
    activeClassThreadId,
    isLoading,
    onCreateClassThread,
    creatingClassThreadId,
    onSelectClassThread,
    renderSession,
}: SidebarSessionsProps) => {
    const [openGroupIds, setOpenGroupIds] = React.useState<Set<string>>(new Set());

    React.useEffect(() => {
        if (classGroups.length === 0) {
            setOpenGroupIds(new Set());
            return;
        }

        setOpenGroupIds((previous) => {
            const next = new Set<string>();
            classGroups.forEach((group) => {
                if (previous.has(group.classId)) {
                    next.add(group.classId);
                }
            });
            if (next.size === 0) {
                next.add(classGroups[0].classId);
            }
            return next;
        });
    }, [classGroups]);

    const toggleGroup = (classId: string) => {
        setOpenGroupIds((previous) => {
            const next = new Set(previous);
            if (next.has(classId)) {
                next.delete(classId);
            } else {
                next.add(classId);
            }
            return next;
        });
    };

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

            <h3 className="mt-6 mb-3 text-xs font-bold text-[#94a3b8] uppercase tracking-wider">
                班级会话
            </h3>
            <div className="space-y-2 pb-2">
                {classGroups.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 px-3 py-3 text-xs text-slate-500">
                        还没有班级会话，先去 Class Hub 加入班级。
                    </div>
                ) : (
                    classGroups.map((group) => {
                        const isOpen = openGroupIds.has(group.classId);
                        return (
                            <div
                                key={group.classId}
                                className="rounded-2xl border border-slate-200 bg-white/70 p-2"
                            >
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => toggleGroup(group.classId)}
                                        className="flex min-w-0 flex-1 items-center gap-2 rounded-xl px-2 py-1.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-100"
                                    >
                                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                        <span className="truncate">{group.className}</span>
                                    </button>
                                    {onCreateClassThread && (
                                        <button
                                            type="button"
                                            onClick={() => onCreateClassThread(group.classId)}
                                            disabled={creatingClassThreadId === group.classId}
                                            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                                            title="创建话题"
                                        >
                                            <Plus size={13} />
                                        </button>
                                    )}
                                </div>

                                {isOpen && (
                                    <div className="mt-1 grid gap-1">
                                        {group.threads.map((thread) => (
                                            <button
                                                key={thread.id}
                                                type="button"
                                                onClick={() => onSelectClassThread?.(thread)}
                                                className={`rounded-lg border px-2 py-2 text-left text-xs transition ${
                                                    activeView === "chat" &&
                                                    activeClassThreadId === thread.id
                                                        ? "border-slate-400 bg-slate-100 text-slate-800"
                                                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                                }`}
                                            >
                                                <p className="truncate font-medium">{thread.title}</p>
                                                <p className="text-[10px] text-slate-500">
                                                    {thread.threadType === "group"
                                                        ? "group"
                                                        : "shared chat"}
                                                </p>
                                            </button>
                                        ))}
                                        {group.threads.length === 0 && (
                                            <p className="px-2 py-1 text-[11px] text-slate-500">
                                                暂无会话，点击 + 创建话题。
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
