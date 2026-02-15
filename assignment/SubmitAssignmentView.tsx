import { useState, type ReactNode } from "react";

interface SubmitAssignmentAttachment {
    name: string;
    url: string;
    size?: number;
    contentType?: string;
}

interface SubmitAssignmentItem {
    id: string;
    title: string;
    className: string;
    dueAt: string | null;
    instructions: string | null;
    attachments: SubmitAssignmentAttachment[];
    previewContent?: ReactNode;
    hasPreview?: boolean;
    status: "pending" | "submitted" | "overdue";
    latestAttemptNo: number;
    latestSubmittedAt: string | null;
    latestGrade: string | null;
}

interface SubmitAssignmentViewProps {
    assignments: SubmitAssignmentItem[];
    isSubmitting: boolean;
}

type SubmitFilter = "all" | SubmitAssignmentItem["status"];

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

const formatFileSize = (bytes?: number) => {
    if (bytes === undefined || Number.isNaN(bytes)) {
        return "未知大小";
    }
    if (bytes < 1024) {
        return `${bytes} B`;
    }
    const kb = bytes / 1024;
    if (kb < 1024) {
        return `${kb.toFixed(1)} KB`;
    }
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
};

export const SubmitAssignmentView = ({
    assignments,
    isSubmitting,
}: SubmitAssignmentViewProps) => {
    const [activeFilter, setActiveFilter] = useState<SubmitFilter>("all");
    const [expandedPreview, setExpandedPreview] = useState<
        Record<string, boolean>
    >({});
    const pending = assignments.filter((item) => item.status === "pending");
    const submitted = assignments.filter((item) => item.status === "submitted");
    const overdue = assignments.filter((item) => item.status === "overdue");
    const filteredAssignments =
        activeFilter === "all"
            ? assignments
            : assignments.filter((item) => item.status === activeFilter);

    const togglePreview = (assignmentId: string) => {
        setExpandedPreview((prev) => ({
            ...prev,
            [assignmentId]: !prev[assignmentId],
        }));
    };

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
                                作业提交以聊天证据快照为准，最新提交会覆盖旧提交。
                            </p>
                        </div>
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
                    <div className="mt-3 flex flex-wrap gap-2">
                        {(
                            [
                                { key: "all", label: "全部" },
                                { key: "pending", label: "待提交" },
                                { key: "submitted", label: "已提交" },
                                { key: "overdue", label: "已逾期" },
                            ] as const
                        ).map((filter) => {
                            const active = activeFilter === filter.key;
                            return (
                                <button
                                    key={filter.key}
                                    type="button"
                                    onClick={() => setActiveFilter(filter.key)}
                                    disabled={isSubmitting}
                                    className={`rounded-full border px-3 py-1.5 text-sm transition ${
                                        active
                                            ? "border-slate-900 bg-slate-900 text-white"
                                            : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                                    } disabled:cursor-not-allowed disabled:opacity-70`}
                                >
                                    {filter.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-4 space-y-3">
                        {filteredAssignments.map((item) => {
                            const previewExpanded = !!expandedPreview[item.id];
                            return (
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

                                <div className="mt-3 rounded-xl border border-slate-200 bg-white/80 px-3 py-3">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        作业说明
                                    </p>
                                    <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                                        {item.instructions?.trim() || "暂无作业说明。"}
                                    </p>
                                </div>

                                <div className="mt-3 rounded-xl border border-slate-200 bg-white/80 px-3 py-3">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        附件
                                    </p>
                                    {item.attachments.length > 0 ? (
                                        <div className="mt-2 space-y-2">
                                            {item.attachments.map((attachment, index) => (
                                                <a
                                                    key={`${attachment.name}-${index}`}
                                                    href={attachment.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                                                >
                                                    <span className="font-medium">
                                                        {attachment.name}
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        {formatFileSize(attachment.size)}
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="mt-2 text-sm text-slate-500">
                                            暂无附件。
                                        </p>
                                    )}
                                </div>

                                {item.hasPreview ? (
                                    <div className="mt-3 rounded-xl border border-slate-200 bg-white/80 px-3 py-3">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                提交预览
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    togglePreview(item.id)
                                                }
                                                disabled={isSubmitting}
                                                className="text-xs font-semibold text-slate-600 transition hover:text-slate-900"
                                            >
                                                {previewExpanded ? "收起" : "展开"}
                                            </button>
                                        </div>
                                        {previewExpanded ? (
                                            <div className="mt-2 h-[280px] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                                                {item.previewContent}
                                            </div>
                                        ) : (
                                            <p className="mt-2 text-sm text-slate-500">
                                                点击展开查看预览。
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="mt-3 rounded-xl border border-slate-200 bg-white/80 px-3 py-3 text-sm text-slate-500">
                                        暂无提交预览。
                                    </div>
                                )}
                            </article>
                        );
                        })}

                        {assignments.length === 0 && (
                            <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                                当前没有可提交作业。
                            </p>
                        )}

                        {assignments.length > 0 &&
                            filteredAssignments.length === 0 && (
                                <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                                    当前筛选下没有作业。
                                </p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};
