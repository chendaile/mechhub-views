import type { FormEvent, RefObject } from "react";
import { Send } from "lucide-react";
import { GroupTextMessageView } from "@views/chat/message";
import styles from "@views/shared/scrollbar.module.css";
import type { Message } from "@views/chat/types"; // Assuming Message type is compatible or I will use 'any' temporarily and fix types
// Actually, let's use the type from the presenter's usage context. The presenter uses hooks that return messages.
// Let's look at what 'messages' are in the presenter. It's from useClassThreadMessagesQuery.
// To avoid circular deps or complex type imports, I'll define an interface here or import if available.
// The presenter uses `renderClassMessageContent` which I should also move or export.

interface ClassThreadChatViewProps {
    className: string;
    threadTitle: string;
    messages: any[]; // refined below
    currentUserId: string;
    inputValue: string;
    onInputChange: (value: string) => void;
    onSendMessage: (e: FormEvent<HTMLFormElement>) => void;
    isSending: boolean;
    renderMessageContent: (content: any) => string;
    scrollAnchorRef?: RefObject<HTMLDivElement | null>;
}

export const ClassThreadChatView = ({
    className,
    threadTitle,
    messages,
    currentUserId,
    inputValue,
    onInputChange,
    onSendMessage,
    isSending,
    renderMessageContent,
    scrollAnchorRef,
}: ClassThreadChatViewProps) => {
    return (
        <div className="absolute inset-0 z-0 flex flex-col bg-white">
            <header className="border-b border-slate-200 bg-white px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Class Group Chat
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">
                    {className}
                </h2>
                <p className="text-sm text-slate-600">{threadTitle}</p>
            </header>

            <div
                className={`flex-1 overflow-y-auto bg-slate-50 px-6 py-5 ${styles.scrollbar}`}
            >
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
                    {messages.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm text-slate-500">
                            Begin with new group chat
                        </div>
                    ) : (
                        messages.map((message) => (
                            <GroupTextMessageView
                                key={message.id}
                                content={renderMessageContent(message.content)}
                                senderName={
                                    message.senderName ?? "Class Member"
                                }
                                senderAvatar={message.senderAvatar}
                                createdAt={message.createdAt}
                                isOwnMessage={
                                    message.senderUserId === currentUserId
                                }
                                role={message.role}
                            />
                        ))
                    )}
                    <div ref={scrollAnchorRef} />
                </div>
            </div>

            <form
                onSubmit={onSendMessage}
                className="border-t border-slate-200 bg-white px-6 py-4"
            >
                <div className="mx-auto flex w-full max-w-5xl items-center gap-2">
                    <input
                        value={inputValue}
                        onChange={(event) => onInputChange(event.target.value)}
                        placeholder="Type a message, use @ai to trigger AI reply"
                        className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                    />
                    <button
                        type="submit"
                        disabled={isSending}
                        className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
                    >
                        <Send size={14} />
                        {isSending ? "Sending..." : "Send"}
                    </button>
                </div>
            </form>
        </div>
    );
};
