import { useState, type ReactNode } from "react";
import { Button } from "../shared/ui/button";

interface GradeAssignmentItem {
    id: string;
    title: string;
    submissionCount: number;
}

interface GradeDashboardStudent {
    id: string;
    name: string;
}

interface GradeDashboardAssignment {
    id: string;
    title: string;
    status: "draft" | "published" | "closed";
    dueAt: string | null;
    submittedCount: number;
    missingCount: number;
    aiCompletedCount: number;
    teacherNotManualCount: number;
    submittedStudents: GradeDashboardStudent[];
    missingStudents: GradeDashboardStudent[];
}

interface GradeSubmissionItem {
    id: string;
    studentName: string;
    submittedAt: string;
    status: "draft" | "released";
    attemptNo: number;
}

interface GradeSubmissionDetail {
    submissionId: string;
    studentName: string;
    submittedAt: string;
    reflectionText: string | null;
    score: number;
    maxScore: number;
    teacherFeedback: string;
    releaseStatus: "draft" | "released";
}

interface GradeAssignmentSummary {
    publishedCount: number;
    closedCount: number;
    submissionCount: number;
}

interface GradeAssignmentViewProps {
    mode: "dashboard" | "detail";
    summary: GradeAssignmentSummary;
    dashboardAssignments: GradeDashboardAssignment[];
    isDashboardLoading: boolean;
    onEnterDetail: (assignmentId: string) => void;
    onBackToDashboard: () => void;
    assignments: GradeAssignmentItem[];
    activeAssignmentId: string | null;
    onSelectAssignment: (assignmentId: string) => void;
    submissions: GradeSubmissionItem[];
    activeSubmissionId: string | null;
    onSelectSubmission: (submissionId: string) => void;
    detail: GradeSubmissionDetail | null;
    previewTitle: string;
    previewCapturedAt: string | null;
    previewContent: ReactNode;
    hasPreview: boolean;
    aiGradingEnabled: boolean;
    isLoading: boolean;
    isGeneratingDraft: boolean;
    isSavingReview: boolean;
    isReleasingGrade: boolean;
    onScoreChange: (score: number) => void;
    onMaxScoreChange: (score: number) => void;
    onTeacherFeedbackChange: (text: string) => void;
    onGenerateDraft: () => void;
    onReleaseGrade: () => void;
}

const statusLabel: Record<GradeDashboardAssignment["status"], string> = {
    draft: "草稿",
    published: "已发布",
    closed: "已关闭",
};

const statusClass: Record<GradeDashboardAssignment["status"], string> = {
    draft: "bg-amber-100 text-amber-700",
    published: "bg-emerald-100 text-emerald-700",
    closed: "bg-slate-200 text-slate-600",
};

const formatDateTime = (value?: string | null) => {
    if (!value) {
        return "未设置";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "未设置";
    }
    return date.toLocaleString();
};

export const GradeAssignmentView = ({
    mode,
    summary,
    dashboardAssignments,
    isDashboardLoading,
    onEnterDetail,
    onBackToDashboard,
    assignments,
    activeAssignmentId,
    onSelectAssignment,
    submissions,
    activeSubmissionId,
    onSelectSubmission,
    detail,
    previewTitle,
    previewCapturedAt,
    previewContent,
    hasPreview,
    aiGradingEnabled,
    isLoading,
    isGeneratingDraft,
    isSavingReview,
    isReleasingGrade,
    onScoreChange,
    onMaxScoreChange,
    onTeacherFeedbackChange,
    onGenerateDraft,
    onReleaseGrade,
}: GradeAssignmentViewProps) => {
    const [expandedSubmitted, setExpandedSubmitted] = useState<
        Record<string, boolean>
    >({});
    const [expandedMissing, setExpandedMissing] = useState<
        Record<string, boolean>
    >({});

    const toggleSubmitted = (assignmentId: string) => {
        setExpandedSubmitted((prev) => ({
            ...prev,
            [assignmentId]: !prev[assignmentId],
        }));
    };

    const toggleMissing = (assignmentId: string) => {
        setExpandedMissing((prev) => ({
            ...prev,
            [assignmentId]: !prev[assignmentId],
        }));
    };

    return (
        <div className="flex-1 h-full overflow-y-auto bg-slate-50">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:px-10">
                <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="text-sm text-slate-500">作业中心 / 教师批改</div>
                    <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="font-serif-heading text-4xl font-bold text-slate-900">
                                批改工作台
                            </h1>
                            <p className="mt-2 text-sm text-slate-600">
                                {mode === "detail"
                                    ? aiGradingEnabled
                                        ? "AI 草稿会自动生成，确认后直接发布给学生。"
                                        : "直接填写分数与理由并发布反馈给学生。"
                                    : "查看作业提交情况并进入详细批改。"}
                            </p>
                        </div>
                        {mode === "detail" && (
                            <Button
                                type="button"
                                size="sm"
                                variant="soft"
                                onClick={onBackToDashboard}
                            >
                                返回 Dashboard
                            </Button>
                        )}
                    </div>
                </header>

                {mode === "dashboard" ? (
                    <>
                        <section className="grid gap-4 md:grid-cols-3">
                            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <p className="text-xs uppercase tracking-wide text-slate-500">
                                    已发布作业
                                </p>
                                <p className="mt-2 text-3xl font-bold text-slate-900">
                                    {summary.publishedCount}
                                </p>
                            </article>
                            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <p className="text-xs uppercase tracking-wide text-slate-500">
                                    已关闭作业
                                </p>
                                <p className="mt-2 text-3xl font-bold text-slate-900">
                                    {summary.closedCount}
                                </p>
                            </article>
                            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <p className="text-xs uppercase tracking-wide text-slate-500">
                                    总提交数
                                </p>
                                <p className="mt-2 text-3xl font-bold text-slate-900">
                                    {summary.submissionCount}
                                </p>
                            </article>
                        </section>

                        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900">
                                作业概览
                            </h2>
                            <div className="mt-4 space-y-4">
                                {isDashboardLoading &&
                                dashboardAssignments.length === 0 ? (
                                    <p className="text-sm text-slate-500">
                                        加载中...
                                    </p>
                                ) : null}

                                {dashboardAssignments.map((assignment) => (
                                    <article
                                        key={assignment.id}
                                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                    >
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span
                                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[assignment.status]}`}
                                                    >
                                                        {statusLabel[assignment.status]}
                                                    </span>
                                                    <p className="text-sm font-semibold text-slate-900">
                                                        {assignment.title}
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    截止: {" "}
                                                    {formatDateTime(
                                                        assignment.dueAt,
                                                    )}
                                                </p>
                                            </div>
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="pill_primary"
                                                onClick={() =>
                                                    onEnterDetail(
                                                        assignment.id,
                                                    )
                                                }
                                            >
                                                进入批改
                                            </Button>
                                        </div>

                                        <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
                                            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                                                已交 {assignment.submittedCount}
                                            </div>
                                            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                                                未交 {assignment.missingCount}
                                            </div>
                                            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                                                AI 草稿完成 {" "}
                                                {assignment.aiCompletedCount}
                                            </div>
                                            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                                                未手动批改 {" "}
                                                {assignment.teacherNotManualCount}
                                            </div>
                                        </div>

                                        <div className="mt-4 grid gap-4 lg:grid-cols-2">
                                            <section className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-3">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                        已交名单
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleSubmitted(
                                                                assignment.id,
                                                            )
                                                        }
                                                        className="text-xs font-semibold text-slate-600 transition hover:text-slate-900"
                                                    >
                                                        {expandedSubmitted[
                                                            assignment.id
                                                        ]
                                                            ? "收起"
                                                            : "展开"}
                                                    </button>
                                                </div>
                                                {expandedSubmitted[
                                                    assignment.id
                                                ] ? (
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {assignment
                                                            .submittedStudents
                                                            .length > 0 ? (
                                                            assignment.submittedStudents.map(
                                                                (student) => (
                                                                    <span
                                                                        key={student.id}
                                                                        className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                                                                    >
                                                                        {
                                                                            student.name
                                                                        }
                                                                    </span>
                                                                ),
                                                            )
                                                        ) : (
                                                            <span className="text-xs text-slate-500">
                                                                暂无
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="mt-2 text-xs text-slate-500">
                                                        共 {assignment.submittedCount} 人
                                                    </p>
                                                )}
                                            </section>

                                            <section className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-3">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                        未交名单
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleMissing(
                                                                assignment.id,
                                                            )
                                                        }
                                                        className="text-xs font-semibold text-slate-600 transition hover:text-slate-900"
                                                    >
                                                        {expandedMissing[
                                                            assignment.id
                                                        ]
                                                            ? "收起"
                                                            : "展开"}
                                                    </button>
                                                </div>
                                                {expandedMissing[
                                                    assignment.id
                                                ] ? (
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {assignment
                                                            .missingStudents
                                                            .length > 0 ? (
                                                            assignment.missingStudents.map(
                                                                (student) => (
                                                                    <span
                                                                        key={student.id}
                                                                        className="rounded-full bg-rose-50 px-3 py-1 text-xs text-rose-700"
                                                                    >
                                                                        {
                                                                            student.name
                                                                        }
                                                                    </span>
                                                                ),
                                                            )
                                                        ) : (
                                                            <span className="text-xs text-slate-500">
                                                                暂无
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="mt-2 text-xs text-slate-500">
                                                        共 {assignment.missingCount} 人
                                                    </p>
                                                )}
                                            </section>
                                        </div>
                                    </article>
                                ))}

                                {!isDashboardLoading &&
                                    dashboardAssignments.length === 0 && (
                                        <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                                            当前没有可批改的作业。
                                        </p>
                                    )}
                            </div>
                        </section>
                    </>
                ) : (
                    <>
                        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900">
                                作业列表
                            </h2>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {assignments.map((assignment) => (
                                    <button
                                        key={assignment.id}
                                        type="button"
                                        onClick={() =>
                                            onSelectAssignment(assignment.id)
                                        }
                                        className={`rounded-full border px-3 py-1.5 text-sm transition ${
                                            assignment.id ===
                                            activeAssignmentId
                                                ? "border-slate-900 bg-slate-900 text-white"
                                                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                                        }`}
                                    >
                                        {assignment.title} · {" "}
                                        {assignment.submissionCount}
                                    </button>
                                ))}
                                {assignments.length === 0 && (
                                    <p className="text-sm text-slate-500">
                                        暂无作业。
                                    </p>
                                )}
                            </div>
                        </section>
                        <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                                <h2 className="text-lg font-bold text-slate-900">
                                    提交列表
                                </h2>
                                <div className="mt-4 space-y-2">
                                    {isLoading ? (
                                        <p className="text-sm text-slate-500">
                                            加载中...
                                        </p>
                                    ) : (
                                        submissions.map((submission) => (
                                            <button
                                                key={submission.id}
                                                type="button"
                                                onClick={() =>
                                                    onSelectSubmission(
                                                        submission.id,
                                                    )
                                                }
                                                className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                                                    submission.id ===
                                                    activeSubmissionId
                                                        ? "border-slate-900 bg-slate-900/5"
                                                        : "border-slate-200 hover:bg-slate-50"
                                                }`}
                                            >
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {submission.studentName}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    提交:{" "}
                                                    {formatDateTime(
                                                        submission.submittedAt,
                                                    )}
                                                    {" · "}
                                                    第 {submission.attemptNo} 次
                                                </p>
                                            </button>
                                        ))
                                    )}

                                    {!isLoading && submissions.length === 0 && (
                                        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-4 text-sm text-slate-500">
                                            当前作业暂无提交。
                                        </p>
                                    )}
                                </div>
                            </article>

                            <div className="flex flex-col gap-4">
                                <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900">
                                                对话预览
                                            </h2>
                                            <p className="mt-1 text-xs text-slate-500">
                                                {previewTitle}
                                                {previewCapturedAt
                                                    ? ` · 抓取时间 ${formatDateTime(previewCapturedAt)}`
                                                    : ""}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3 h-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                                        {hasPreview ? (
                                            previewContent
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-slate-500">
                                                暂无可预览对话。
                                            </div>
                                        )}
                                    </div>
                                </article>

                                <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                                    {detail ? (
                                        <>
                                            <h2 className="text-lg font-bold text-slate-900">
                                                {detail.studentName}
                                            </h2>
                                            <p className="mt-1 text-xs text-slate-500">
                                                提交时间:{" "}
                                                {formatDateTime(
                                                    detail.submittedAt,
                                                )}
                                            </p>

                                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                                                <label className="text-sm font-medium text-slate-700">
                                                    分数
                                                    <input
                                                        type="number"
                                                        value={detail.score}
                                                        onChange={(event) =>
                                                            onScoreChange(
                                                                Number(
                                                                    event.target
                                                                        .value,
                                                                ),
                                                            )
                                                        }
                                                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                                                    />
                                                </label>
                                                <label className="text-sm font-medium text-slate-700">
                                                    满分
                                                    <input
                                                        type="number"
                                                        value={detail.maxScore}
                                                        onChange={(event) =>
                                                            onMaxScoreChange(
                                                                Number(
                                                                    event.target
                                                                        .value,
                                                                ),
                                                            )
                                                        }
                                                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                                                    />
                                                </label>
                                            </div>

                                            <label className="mt-3 block text-sm font-medium text-slate-700">
                                                老师反馈
                                                <textarea
                                                    value={detail.teacherFeedback}
                                                    onChange={(event) =>
                                                        onTeacherFeedbackChange(
                                                            event.target.value,
                                                        )
                                                    }
                                                    className="mt-1 min-h-[8rem] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                                                />
                                            </label>

                                            {detail.reflectionText && (
                                                <section className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                                    <h3 className="text-sm font-semibold text-slate-800">
                                                        学生反思
                                                    </h3>
                                                    <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                                                        {detail.reflectionText}
                                                    </p>
                                                </section>
                                            )}

                                            <div className="mt-4 flex flex-wrap justify-end gap-2">
                                                {aiGradingEnabled && (
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="soft"
                                                        disabled={
                                                            isGeneratingDraft
                                                        }
                                                        onClick={
                                                            onGenerateDraft
                                                        }
                                                    >
                                                        {isGeneratingDraft
                                                            ? "生成中..."
                                                            : "重新生成 AI 草稿"}
                                                    </Button>
                                                )}
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="pill_primary"
                                                    disabled={
                                                        isSavingReview ||
                                                        isReleasingGrade ||
                                                        detail.releaseStatus ===
                                                            "released"
                                                    }
                                                    onClick={onReleaseGrade}
                                                >
                                                    {detail.releaseStatus ===
                                                    "released"
                                                        ? "已发布"
                                                        : isSavingReview
                                                          ? "保存中..."
                                                          : isReleasingGrade
                                                            ? "发布中..."
                                                            : "发布反馈"}
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-8 text-center text-sm text-slate-500">
                                            请选择一条提交进行批改。
                                        </p>
                                    )}
                                </article>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};
