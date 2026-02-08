import React from "react";

interface ChatViewProps {
    messageList: React.ReactNode;
    chatInput: React.ReactNode;
}

export const ChatView: React.FC<ChatViewProps> = ({
    messageList,
    chatInput,
}) => {
    return (
        <div className="absolute inset-0 z-0 flex flex-col bg-white">
            {messageList}
            {chatInput}
        </div>
    );
};
