import { useEffect, useRef } from "react";
import { MarkdownRenderer } from "../../shared/MarkdownRenderer";
import { Button } from "../../shared/ui/button";
import styles from "../../shared/scrollbar.module.css";

interface DetailPanelProps {
    label?: string;
    hideButton?: string;
    buttonLabel?: string;
    emptyLabel?: string;
    content?: string;
    show?: boolean;
    open: boolean;
    onToggle: () => void;
    className?: string;
    autoScroll?: boolean;
}

export const DetailPanel = ({
    label = "思考过程",
    hideButton = "隐藏思考过程",
    buttonLabel = "查看思考过程",
    emptyLabel = "暂无思考过程",
    content,
    show = true,
    open,
    onToggle,
    className,
    autoScroll = false,
}: DetailPanelProps) => {
    const hasReasoning = !!content && content.trim().length > 0;
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open || !autoScroll) return;
        const el = contentRef.current;
        if (!el) return;
        const raf = requestAnimationFrame(() => {
            el.scrollTop = el.scrollHeight;
        });
        return () => cancelAnimationFrame(raf);
    }, [autoScroll, content, open]);

    if (!show) return;
    return (
        <div className={`flex w-full flex-col ${className}`}>
            <Button
                type="button"
                onClick={onToggle}
                variant="outline"
                size="sm"
                className="w-full mb-2"
            >
                {open ? hideButton : buttonLabel}
            </Button>

            {open && (
                <>
                    <div>
                        <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                            {label}
                        </div>
                        <div
                            ref={contentRef}
                            className={`max-h-60 overflow-y-auto pr-1 bg-slate-200 ${styles.scrollbar}`}
                        >
                            {hasReasoning ? (
                                <MarkdownRenderer content={content || ""} />
                            ) : (
                                <div>{emptyLabel}</div>
                            )}
                        </div>
                    </div>

                    <div className="w-full h-px bg-black" />
                </>
            )}
        </div>
    );
};
