import type { ReactNode } from "react";
import type { ActiveView, UserProfile } from "../shared/types";
import type { ChatSession, DeleteChatResult } from "../chat/types";

export interface SidebarClassThread {
    id: string;
    classId: string;
    title: string;
    threadType: "group" | "shared_chat";
}

export interface SidebarClassGroup {
    classId: string;
    className: string;
    role: "teacher" | "student";
    threads: SidebarClassThread[];
}

export interface SidebarViewProps {
    activeView: ActiveView;
    canAccessChat: boolean;
    sidebarWidth: number;
    user: UserProfile;
    sessions: ChatSession[];
    classGroups: SidebarClassGroup[];
    activeClassThreadId?: string;
    currentSessionId: string | null;
    isLoading: boolean;
    onResizeMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
    onLogoClick: () => void;
    onLogoIconClick: (event: React.MouseEvent) => void;
    onNewQuest?: () => void;
    onCreateClassThread?: (classId: string) => void;
    creatingClassThreadId?: string | null;
    onSelectClassThread?: (thread: SidebarClassThread) => void;
    renderSession: (session: ChatSession, active: boolean) => ReactNode;
    onOpenProfile?: () => void;
    onOpenClassHub?: () => void;
    onSubmitAssignment?: () => void;
    onViewFeedback?: () => void;
    onPublishAssignment?: () => void;
    onGradeAssignment?: () => void;
    onSignOut?: () => void;
}

export interface SidebarHandlers {
    handleSelectSession?: (id: string) => boolean;
    handleStartNewQuest?: () => void;
    deleteChatSession?: (id: string) => Promise<DeleteChatResult>;
    onRenameSession?: (id: string, newTitle: string) => Promise<boolean>;
    handleSignOut?: () => void;
}
