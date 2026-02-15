import { Button } from "../shared/ui/button";

interface SubmitAssignmentItem {
    id: string;
    title: string;
    className: string;
    dueAt: string | null;
    status: "pending" | "submitted" | "overdue";
    latestAttemptNo: number;
    latestSubmittedAt: string | null;
    latestGrade: string | null;
}

interface SubmitAssignmentViewProps {
    assignments: SubmitAssignmentItem[];
    hasCurrentSession: boolean;
    isSubmitting: boolean;
    onSubmitFromCurrentSession: (assignmentId: string) => void;
    onOpenChat: () => void;
}

const statusLabel: Record<SubmitAssignmentItem["status"], string> = {
    pending: "待提交",
    submitted: "已提交",
    overdue: "已逾期",
};

const statusClass: Record<SubmitAssignmentItem["status"], string> = {
    pending: "bg-amber-100 text-amber-700",
    submitted: "bg-emerald-100 text-emerald-700",
    overdue: "bg-rose-100 text-rose-700",
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

export const SubmitAssignmentView = ({
    assignments,
    hasCurrentSession,
    isSubmitting,
    onSubmitFromCurrentSession,
    onOpenChat,
}: SubmitAssignmentViewProps) => {
    const pending = assignments.filter((item) => item.status === "pending");
    const submitted = assignments.filter((item) => item.status === "submitted");
    const overdue = assignments.filter((item) => item.status === "overdue");

    return (
        <div className="flex-1 h-full overflow-y-auto bg-slate-50">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:px-10">
                <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="text-sm text-slate-500">作业中心 / 提交状态</div>
                    <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="font-serif-heading text-4xl font-bold text-slate-900">
                                提交 Dashboard
                            </h1>
                            <p className="mt-2 text-sm text-slate-600">
                                作业提交以聊天证据快照为准，支持多次提交，系统按最后一次计入。
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="pill_secondary"
                            onClick={onOpenChat}
                        >
                            打开私聊
                        </Button>
                    </div>
                </header>

                <section className="grid gap-4 md:grid-cols-3">
                    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            待提交
                        </p>
                        <p className="mt-2 text-3xl font-bold text-amber-600">
                            {pending.length}
                        </p>
                    </article>
                    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            已提交
                        </p>
                        <p className="mt-2 text-3xl font-bold text-emerald-600">
                            {submitted.length}
                        </p>
                    </article>
                    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            已逾期
                        </p>
                        <p className="mt-2 text-3xl font-bold text-rose-600">
                            {overdue.length}
                        </p>
                    </article>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900">作业列表</h2>

                    <div className="mt-4 space-y-3">
                        {assignments.map((item) => (
                            <article
                                key={item.id}
                                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">
                                            {item.title}
                                        </p>
                                        <p className="mt-0.5 text-xs text-slate-500">
                                            {item.className} · 截止:
                                            {" "}
                                            {formatDateTime(item.dueAt)}
                                        </p>
                                    </div>
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[item.status]}`}
                                    >
                                        {statusLabel[item.status]}
                                    </span>
                                </div>

                                <div className="mt-3 grid gap-2 text-xs text-slate-600 md:grid-cols-3">
                                    <p>最近提交: {formatDateTime(item.latestSubmittedAt)}</p>
                                    <p>尝试次数: {item.latestAttemptNo}</p>
                                    <p>已发布得分: {item.latestGrade ?? "未发布"}</p>
                                </div>

                                <div className="mt-3 flex justify-end">
                                    {hasCurrentSession ? (
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="soft"
                                            disabled={isSubmitting}
                                            onClick={() =>
                                                onSubmitFromCurrentSession(item.id)
                                            }
                                        >
                                            {isSubmitting
                                                ? "提交中..."
                                                : "用当前会话提交"}
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="soft"
                                            onClick={onOpenChat}
                                        >
                                            去聊天选择提交
                                        </Button>
                                    )}
                                </div>
                            </article>
                        ))}

                        {assignments.length === 0 && (
                            <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                                当前没有可提交作业。
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};
