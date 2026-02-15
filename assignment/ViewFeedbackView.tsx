import { Button } from "../shared/ui/button";

interface FeedbackListItem {
    submissionId: string;
    assignmentTitle: string;
    score: string;
    status: "pending" | "released";
    releasedAt: string | null;
    submittedAt: string;
}

interface FeedbackDetail {
    assignmentTitle: string;
    dueAt: string | null;
    submittedAt: string;
    reflectionText: string | null;
    teacherFeedback: string;
    aiFeedbackDraft: string | null;
    score: string;
    rubric: unknown;
}

interface ViewFeedbackViewProps {
    items: FeedbackListItem[];
    activeSubmissionId: string | null;
    onSelectSubmission: (submissionId: string) => void;
    detail: FeedbackDetail | null;
    onOpenChat: () => void;
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

export const ViewFeedbackView = ({
    items,
    activeSubmissionId,
    onSelectSubmission,
    detail,
    onOpenChat,
}: ViewFeedbackViewProps) => {
    return (
        <div className="flex-1 h-full overflow-y-auto bg-slate-50">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:px-10">
                <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="text-sm text-slate-500">作业中心 / 反馈状态</div>
                    <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="font-serif-heading text-4xl font-bold text-slate-900">
                                反馈 Dashboard
                            </h1>
                            <p className="mt-2 text-sm text-slate-600">
                                这里只展示你自己的作业反馈。AI 草稿仅用于老师内部审阅，发布后你看到的是最终结果。
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="pill_secondary"
                            onClick={onOpenChat}
                        >
                            打开私聊继续学习
                        </Button>
                    </div>
                </header>

                <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900">反馈列表</h2>
                        <div className="mt-4 space-y-2">
                            {items.map((item) => {
                                const active =
                                    item.submissionId === activeSubmissionId;
                                return (
                                    <button
                                        key={item.submissionId}
                                        type="button"
                                        onClick={() =>
                                            onSelectSubmission(item.submissionId)
                                        }
                                        className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                                            active
                                                ? "border-slate-900 bg-slate-900/5"
                                                : "border-slate-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <p className="text-sm font-semibold text-slate-900">
                                            {item.assignmentTitle}
                                        </p>
                                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                            <span>得分: {item.score}</span>
                                            <span>提交: {formatDateTime(item.submittedAt)}</span>
                                            <span>
                                                发布: {formatDateTime(item.releasedAt)}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}

                            {items.length === 0 && (
                                <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-4 text-sm text-slate-500">
                                    暂无反馈记录。
                                </p>
                            )}
                        </div>
                    </article>

                    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        {detail ? (
                            <>
                                <h2 className="text-lg font-bold text-slate-900">
                                    {detail.assignmentTitle}
                                </h2>
                                <div className="mt-2 grid gap-2 text-xs text-slate-500 md:grid-cols-2">
                                    <p>截止: {formatDateTime(detail.dueAt)}</p>
                                    <p>提交: {formatDateTime(detail.submittedAt)}</p>
                                    <p>最终得分: {detail.score}</p>
                                </div>

                                <section className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <h3 className="text-sm font-semibold text-slate-800">
                                        老师反馈
                                    </h3>
                                    <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                                        {detail.teacherFeedback || "老师尚未发布反馈。"}
                                    </p>
                                </section>

                                {detail.aiFeedbackDraft && (
                                    <section className="mt-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
                                        <h3 className="text-sm font-semibold text-blue-700">
                                            AI 草稿（仅作参考）
                                        </h3>
                                        <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                                            {detail.aiFeedbackDraft}
                                        </p>
                                    </section>
                                )}

                                {detail.reflectionText && (
                                    <section className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <h3 className="text-sm font-semibold text-slate-800">
                                            你的反思
                                        </h3>
                                        <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                                            {detail.reflectionText}
                                        </p>
                                    </section>
                                )}
                            </>
                        ) : (
                            <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-8 text-center text-sm text-slate-500">
                                请选择一条反馈记录查看详情。
                            </p>
                        )}
                    </article>
                </section>
            </div>
        </div>
    );
};
