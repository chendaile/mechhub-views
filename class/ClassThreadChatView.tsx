import { GroupTextMessageView } from "@views/chat/message";
import styles from "@views/shared/scrollbar.module.css";
import type { ClassThreadChatViewProps } from "./types";

const formatSharedSummary = (content: Record<string, unknown>) => {
    const sourceTitle =
        typeof content.sourceTitle === "string" ? content.sourceTitle : "未命名会话";
    const messageCount = Array.isArray(content.sharedMessages)
        ? content.sharedMessages.length
        : 0;

    return `分享会话：${sourceTitle} · ${messageCount} 条消息`;
};

const SharedChatMessageCard = ({
    content,
    onCopy,
}: {
    content: Record<string, unknown>;
    onCopy?: (content: Record<string, unknown>) => void;
}) => (
    <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">会话分享</p>
        <p className="mt-1 text-xs text-slate-600">{formatSharedSummary(content)}</p>
        {onCopy && (
            <button
                type="button"
                onClick={() => onCopy(content)}
                className="mt-3 inline-flex items-center rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
                复制到我的新会话
            </button>
        )}
    </div>
);

export const ClassThreadChatView = ({
    className,
    threadTitle,
    messages,
    currentUserId,
    renderMessageContent,
    inputBar,
    onCopySharedChatToNewSession,
    scrollAnchorRef,
}: ClassThreadChatViewProps) => {
    return (
        <div className="absolute inset-0 z-0 flex flex-col">
            <header className="px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    班级群聊
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
                        <div className="rounded-2xl px-4 py-6 text-center text-sm text-slate-500">
                            暂时还没有消息，开始班级讨论吧。
                        </div>
                    ) : (
                        messages.map((message) => {
                            const isSharedChatMessage =
                                message.role === "system" &&
                                message.content.kind === "shared_chat";

                            if (isSharedChatMessage) {
                                return (
                                    <GroupTextMessageView
                                        key={message.id}
                                        content={
                                            <SharedChatMessageCard
                                                content={message.content}
                                                onCopy={
                                                    onCopySharedChatToNewSession
                                                }
                                            />
                                        }
                                        senderName={
                                            message.senderName ?? "班级成员"
                                        }
                                        senderAvatar={message.senderAvatar}
                                        createdAt={message.createdAt}
                                        isOwnMessage={
                                            message.senderUserId ===
                                            currentUserId
                                        }
                                        role={message.role}
                                    />
                                );
                            }

                            return (
                                <GroupTextMessageView
                                    key={message.id}
                                    content={renderMessageContent(
                                        message.content,
                                    )}
                                    senderName={message.senderName ?? "班级成员"}
                                    senderAvatar={message.senderAvatar}
                                    createdAt={message.createdAt}
                                    isOwnMessage={
                                        message.senderUserId === currentUserId
                                    }
                                    role={message.role}
                                />
                            );
                        })
                    )}
                    <div ref={scrollAnchorRef} />
                </div>
            </div>

            <div className="z-20 w-full bg-[#f8fafc] p-4">
                {inputBar}
                <div className="mt-3 text-center font-['courier_new'] text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    AI can make mistakes.
                </div>
            </div>
        </div>
    );
};
