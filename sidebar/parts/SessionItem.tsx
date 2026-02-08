import React, { useState, useRef, useEffect } from "react";
import {
    Trash2,
    LucideIcon,
    Edit2,
    Check,
    X,
    MoreVertical,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "../../shared/ui/input";
import { ICON_SIZE } from "../../shared/ui-constants";
import { cn } from "../../shared/utils";

interface SessionItemProps {
    label: string;
    icon: LucideIcon;
    active: boolean;
    onClick: () => void;
    onDelete?: (e: React.MouseEvent) => void;
    onRename?: (newTitle: string) => Promise<boolean>;
    isGeneratingTitle?: boolean;
}

export const SessionItem: React.FC<SessionItemProps> = ({
    label,
    icon: Icon,
    active,
    onClick,
    onDelete,
    onRename,
    isGeneratingTitle = false,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(label);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isMenuOpen]);

    const handleSaveRename = async () => {
        if (!onRename || editTitle.trim() === "" || editTitle === label) {
            setIsEditing(false);
            setEditTitle(label);
            return;
        }

        const success = await onRename(editTitle.trim());
        if (success) {
            setIsEditing(false);
            toast.success("重命名成功");
        } else {
            setEditTitle(label);
            setIsEditing(false);
        }
    };

    const handleCancelRename = () => {
        setIsEditing(false);
        setEditTitle(label);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSaveRename();
        } else if (e.key === "Escape") {
            handleCancelRename();
        }
    };

    return (
        <div
            onClick={onClick}
            className={cn(
                "w-full group flex items-center gap-3 px-3 py-3 rounded-[1.5rem] text-sm font-medium transition-colors relative cursor-pointer",
                active
                    ? "bg-[#ffffff] text-[#334155]"
                    : "text-[#64748b] hover:bg-[#ffffff] hover:text-[#334155]",
            )}
        >
            {isEditing ? (
                <div
                    className="flex-1 flex items-center gap-1.5 pr-1 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Input
                        ref={inputRef}
                        type="text"
                        inputSize="sm"
                        variant="ghost"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleSaveRename}
                        className="flex-1 min-w-0"
                    />
                    <div className="flex shrink-0 items-center gap-0.5">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSaveRename();
                            }}
                            className="p-1 hover:bg-[#dcfce7] rounded-[0.25rem] transition-all text-[#64748b] hover:text-[#16a34a]"
                            title="保存 (Enter)"
                        >
                            <Check size={ICON_SIZE.xs} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCancelRename();
                            }}
                            className="p-1 hover:bg-[#fef2f2] rounded-[0.25rem] transition-all text-[#64748b] hover:text-[#dc2626]"
                            title="取消 (Esc)"
                        >
                            <X size={ICON_SIZE.xs} />
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {isGeneratingTitle ? (
                        <div className="flex-1 flex items-center gap-2">
                            <div className="h-3 bg-[#e2e8f0] rounded-[0.25rem] animate-pulse flex-1 max-w-[7.5rem]"></div>
                            <div className="text-meta animate-pulse">
                                生成中...
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Title - takes most space */}
                            <span className="block truncate flex-1 text-left">
                                {label}
                            </span>

                            {/* Three-dot menu button */}
                            <div className="relative shrink-0" ref={menuRef}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsMenuOpen(!isMenuOpen);
                                    }}
                                    className="rounded-[0.75rem] p-1.5 text-[#94a3b8] opacity-0 transition-all group-hover:opacity-100 hover:bg-[#e2e8f0] hover:text-[#334155]"
                                    title="更多操作"
                                >
                                    <MoreVertical size={ICON_SIZE.md} />
                                </button>

                                {/* Dropdown menu */}
                                {isMenuOpen && (
                                    <div className="absolute right-0 top-full mt-1 bg-[#ffffff] rounded-[1rem] shadow-xl border border-[#f1f5f9] py-1.5 w-32 z-50 overflow-hidden">
                                        {onRename && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsMenuOpen(false);
                                                    setIsEditing(true);
                                                }}
                                                className="w-full px-3 py-2 text-left text-sm hover:bg-[#f8fafc] flex items-center gap-2.5 text-[#334155] transition-colors whitespace-nowrap leading-none"
                                            >
                                                <Edit2
                                                    size={ICON_SIZE.sm}
                                                    className="text-[#3b82f6] stroke-[1.5]"
                                                />
                                                <span className="font-medium">
                                                    重命名
                                                </span>
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsMenuOpen(false);
                                                    onDelete(e);
                                                }}
                                                className="w-full px-3 py-2 text-left text-sm hover:bg-[#fef2f2] flex items-center gap-2.5 text-[#334155] hover:text-[#dc2626] transition-colors whitespace-nowrap leading-none"
                                            >
                                                <Trash2
                                                    size={ICON_SIZE.sm}
                                                    className="text-[#ef4444] stroke-[1.5]"
                                                />
                                                <span className="font-medium">
                                                    删除
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
