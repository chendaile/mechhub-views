import React from "react";
import { ImagePreviewModal } from "../message/ImagePreviewModal";
import styles from "../../shared/scrollbar.module.css";

interface MessageListViewProps {
    items: React.ReactNode[];
    contentRef: React.RefObject<HTMLDivElement>;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
    onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
    previewImage: string | null;
    onClosePreview: () => void;
}

export const MessageListView = ({
    items,
    contentRef,
    messagesEndRef,
    onScroll,
    previewImage,
    onClosePreview,
}: MessageListViewProps) => {
    return (
        <div
            className={`flex-1 overflow-y-auto px-20 py-8 overflow-x-hidden bg-[#f8fafc] ${styles.scrollbar}`}
            style={{ overflowAnchor: "none" }}
            onScroll={onScroll}
        >
            <div ref={contentRef} className="space-y-6">
                {items}
            </div>

            <div ref={messagesEndRef} className="h-4" />

            <ImagePreviewModal
                previewImage={previewImage}
                onClose={onClosePreview}
            />
        </div>
    );
};
