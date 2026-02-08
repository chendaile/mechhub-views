import type { ActiveView, UserProfile } from "../shared/types";
import type { ChatSession, DeleteChatResult } from "../chat/types";

export interface SidebarViewProps {
    activeView: ActiveView;
    sidebarWidth: number;
    user: UserProfile;
    sessions: ChatSession[];
    currentSessionId: string | null;
    isLoading: boolean;
    onResizeMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
    onLogoClick: () => void;
    onLogoIconClick: (event: React.MouseEvent) => void;
    onNewQuest: () => void;
    onSelectSession: (id: string) => void;
    onDeleteSession: (id: string) => void;
    onRenameSession?: (id: string, newTitle: string) => Promise<boolean>;
    onOpenProfile: () => void;
    onSignOut?: () => void;
}

export interface SidebarHandlers {
    handleSelectSession?: (id: string) => boolean;
    handleStartNewQuest?: () => void;
    deleteChatSession?: (id: string) => Promise<DeleteChatResult>;
    onRenameSession?: (id: string, newTitle: string) => Promise<boolean>;
    handleSignOut?: () => void;
}
