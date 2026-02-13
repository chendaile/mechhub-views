import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { UserProfile, ActiveView } from "../../shared/types";
import { SidebarSignOut } from "./SidebarSignOut";
import { SidebarUserButton } from "./SidebarUserButton";

interface SidebarFooterProps {
    user: UserProfile;
    activeView: ActiveView;
    onOpenProfile?: () => void;
    onOpenClassHub?: () => void;
    onSubmitAssignment?: () => void;
    onViewFeedback?: () => void;
    onPublishAssignment?: () => void;
    onGradeAssignment?: () => void;
    onSignOut?: () => void;
}

export const SidebarFooter = ({
    user,
    activeView,
    onOpenProfile,
    onOpenClassHub,
    onSubmitAssignment,
    onViewFeedback,
    onPublishAssignment,
    onGradeAssignment,
    onSignOut,
}: SidebarFooterProps) => {
    const [isAssignmentsOpen, setIsAssignmentsOpen] = useState(false);

    const quickActions = [
        {
            key: "submitAssignment" as const,
            label: "Submit",
            onClick: onSubmitAssignment,
            audience: "student" as const,
        },
        {
            key: "viewFeedback" as const,
            label: "Feedback",
            onClick: onViewFeedback,
            audience: "student" as const,
        },
        {
            key: "publishAssignment" as const,
            label: "Publish",
            onClick: onPublishAssignment,
            audience: "teacher" as const,
        },
        {
            key: "gradeAssignment" as const,
            label: "Grade",
            onClick: onGradeAssignment,
            audience: "teacher" as const,
        },
    ].filter((action) => action.onClick);

    const assignmentsTitle = useMemo(() => {
        const hasStudentActions = quickActions.some(
            (action) => action.audience === "student",
        );
        const hasTeacherActions = quickActions.some(
            (action) => action.audience === "teacher",
        );

        if (hasStudentActions && !hasTeacherActions) {
            return "Assignments (Student)";
        }

        if (!hasStudentActions && hasTeacherActions) {
            return "Assignments (Teacher)";
        }

        return "Assignments";
    }, [quickActions]);

    return (
        <div className="p-4">
            {onOpenClassHub && (
                <button
                    type="button"
                    onClick={onOpenClassHub}
                    className={`mb-3 w-full rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${
                        activeView === "classHub"
                            ? "bg-slate-900 text-white"
                            : "bg-white/70 text-slate-700 hover:bg-white"
                    }`}
                >
                    Class Hub
                </button>
            )}

            {quickActions.length > 0 && (
                <div className="mb-3 rounded-2xl border border-white bg-white/70 p-2">
                    <button
                        type="button"
                        onClick={() => setIsAssignmentsOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500 hover:bg-slate-100"
                    >
                        <span>{assignmentsTitle}</span>
                        {isAssignmentsOpen ? (
                            <ChevronDown size={14} />
                        ) : (
                            <ChevronRight size={14} />
                        )}
                    </button>

                    {isAssignmentsOpen && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {quickActions.map((action) => (
                                <button
                                    key={action.key}
                                    type="button"
                                    onClick={action.onClick}
                                    className={`rounded-xl px-2 py-2 text-xs font-semibold transition ${
                                        activeView === action.key
                                            ? "bg-slate-900 text-white"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                    }`}
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {onOpenProfile && (
                <SidebarUserButton
                    user={user}
                    activeView={activeView}
                    onClick={onOpenProfile}
                />
            )}

            {onSignOut && <SidebarSignOut onSignOut={onSignOut} />}
        </div>
    );
};
