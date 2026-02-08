import React from "react";
import { Plus } from "lucide-react";
import { MechHubLogo } from "../../shared/MechHubLogo";
import { Button } from "../../shared/ui/button";
import { ICON_SIZE, ICON_STROKE_WIDTH } from "../../shared/ui-constants";

interface SidebarHeaderProps {
    onLogoClick: () => void;
    onLogoIconClick: (event: React.MouseEvent) => void;
    onNewQuest: () => void;
}

export const SidebarHeader = ({
    onLogoClick,
    onLogoIconClick,
    onNewQuest,
}: SidebarHeaderProps) => {
    return (
        <div className="px-4 py-6 flex flex-col items-center">
            <MechHubLogo
                className="mb-8 cursor-pointer flex-wrap"
                onClick={onLogoClick}
                onIconClick={onLogoIconClick}
            />

            <Button
                onClick={onNewQuest}
                size="sm"
                className="w-full rounded-xl text-on-ink text-[1.125rem]"
            >
                <Plus
                    size={ICON_SIZE.lg}
                    strokeWidth={ICON_STROKE_WIDTH.strong}
                />
                <span className="text-on-ink text-[1.1875rem]">新对话</span>
            </Button>
        </div>
    );
};
