import { Button } from "../shared/ui/button";

interface GradeAssignmentItem {
    id: string;
    title: string;
    submissionCount: number;
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
    evidenceSnapshot: Record<string, unknown>;
    score: number;
    maxScore: number;
    teacherFeedback: string;
    releaseStatus: "draft" | "released";
}

interface GradeAssignmentViewProps {
    assignments: GradeAssignmentItem[];
    activeAssignmentId: string | null;
    onSelectAssignment: (assignmentId: string) => void;
    submissions: GradeSubmissionItem[];
    activeSubmissionId: string | null;
    onSelectSubmission: (submissionId: string) => void;
    detail: GradeSubmissionDetail | null;
    isLoading: boolean;
    isGeneratingDraft: boolean;
    isSavingReview: boolean;
    isReleasingGrade: boolean;
    onScoreChange: (score: number) => void;
    onMaxScoreChange: (score: number) => void;
    onTeacherFeedbackChange: (text: string) => void;
    onGenerateDraft: () => void;
    onSaveReview: () => void;
    onReleaseGrade: () => void;
}

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
    assignments,
    activeAssignmentId,
    onSelectAssignment,
    submissions,
    activeSubmissionId,
    onSelectSubmission,
    detail,
    isLoading,
    isGeneratingDraft,
    isSavingReview,
    isReleasingGrade,
    onScoreChange,
    onMaxScoreChange,
    onTeacherFeedbackChange,
    onGenerateDraft,
    onSaveReview,
    onReleaseGrade,
}: GradeAssignmentViewProps) => {
    return (
        <div className="flex-1 h-full overflow-y-auto bg-slate-50">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:px-10">
                <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="text-sm text-slate-500">作业中心 / 教师批改</div>
                    <h1 className="mt-3 font-serif-heading text-4xl font-bold text-slate-900">
                        批改工作台
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        流程: 先生成 AI 草稿，再人工编辑并发布反馈给学生。
                    </p>
                </header>

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900">作业列表</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {assignments.map((assignment) => (
                            <button
                                key={assignment.id}
                                type="button"
                                onClick={() => onSelectAssignment(assignment.id)}
                                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                                    assignment.id === activeAssignmentId
                                        ? "border-slate-900 bg-slate-900 text-white"
                                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                {assignment.title} · {assignment.submissionCount}
                            </button>
                        ))}
                        {assignments.length === 0 && (
                            <p className="text-sm text-slate-500">暂无作业。</p>
                        )}
                    </div>
                </section>

                <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900">提交列表</h2>
                        <div className="mt-4 space-y-2">
                            {isLoading ? (
                                <p className="text-sm text-slate-500">加载中...</p>
                            ) : (
                                submissions.map((submission) => (
                                    <button
                                        key={submission.id}
                                        type="button"
                                        onClick={() =>
                                            onSelectSubmission(submission.id)
                                        }
                                        className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                                            submission.id === activeSubmissionId
                                                ? "border-slate-900 bg-slate-900/5"
                                                : "border-slate-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <p className="text-sm font-semibold text-slate-900">
                                            {submission.studentName}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            提交: {formatDateTime(submission.submittedAt)}
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

                    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        {detail ? (
                            <>
                                <h2 className="text-lg font-bold text-slate-900">
                                    {detail.studentName}
                                </h2>
                                <p className="mt-1 text-xs text-slate-500">
                                    提交时间: {formatDateTime(detail.submittedAt)}
                                </p>

                                <section className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <h3 className="text-sm font-semibold text-slate-800">
                                        提交证据快照
                                    </h3>
                                    <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg bg-white p-2 text-xs text-slate-700">
                                        {JSON.stringify(
                                            detail.evidenceSnapshot,
                                            null,
                                            2,
                                        )}
                                    </pre>
                                </section>

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

                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        分数
                                        <input
                                            type="number"
                                            value={detail.score}
                                            onChange={(event) =>
                                                onScoreChange(
                                                    Number(event.target.value),
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
                                                    Number(event.target.value),
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

                                <div className="mt-4 flex flex-wrap justify-end gap-2">
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="soft"
                                        disabled={isGeneratingDraft}
                                        onClick={onGenerateDraft}
                                    >
                                        {isGeneratingDraft
                                            ? "生成中..."
                                            : "生成 AI 草稿"}
                                    </Button>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="soft"
                                        disabled={isSavingReview}
                                        onClick={onSaveReview}
                                    >
                                        {isSavingReview ? "保存中..." : "保存草稿"}
                                    </Button>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="pill_primary"
                                        disabled={
                                            isReleasingGrade ||
                                            detail.releaseStatus === "released"
                                        }
                                        onClick={onReleaseGrade}
                                    >
                                        {detail.releaseStatus === "released"
                                            ? "已发布"
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
                </section>
            </div>
        </div>
    );
};
