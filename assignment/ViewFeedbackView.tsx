import { Bot, ChartNoAxesColumn, Download, FileText, Share2, UserRound } from "lucide-react";
import { Button } from "../shared/ui/button";
import type { GradeBreakdown, KeyInsight } from "./types";

interface ViewFeedbackViewProps {
    assignmentTitle: string;
    overallScore: number;
    maxScore: number;
    scorePercentage: number;
    submittedDate: string;
    teacherName: string;
    teacherAvatar?: string;
    teacherSummary: string;
    aiAnalysis: string;
    gradeBreakdown: GradeBreakdown[];
    keyInsights: KeyInsight[];
    generalComments?: string;
    privateNotes?: string;
    onDownloadPDF?: () => void;
    onShareToClass?: () => void;
}

const BREAKDOWN_COLOR_CLASS: Record<GradeBreakdown["color"], string> = {
    green: "bg-emerald-500",
    yellow: "bg-amber-500",
    red: "bg-rose-500",
};

const INSIGHT_COLOR_CLASS: Record<KeyInsight["type"], string> = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    warning: "border-amber-200 bg-amber-50 text-amber-800",
    error: "border-rose-200 bg-rose-50 text-rose-800",
};

export const ViewFeedbackView = ({
    assignmentTitle,
    overallScore,
    maxScore,
    scorePercentage,
    submittedDate,
    teacherName,
    teacherAvatar,
    teacherSummary,
    aiAnalysis,
    gradeBreakdown,
    keyInsights,
    generalComments,
    privateNotes,
    onDownloadPDF,
    onShareToClass,
}: ViewFeedbackViewProps) => {
    return (
        <div className="flex-1 h-full overflow-y-auto bg-slate-50">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:px-10">
                <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="text-sm text-slate-500">作业中心 / 成绩反馈</div>

                    <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="font-serif-heading text-4xl font-bold text-slate-900">
                                作业反馈详情
                            </h1>
                            <p className="mt-2 text-sm text-slate-600">{assignmentTitle}</p>
                            <p className="mt-1 text-xs text-slate-500">提交时间：{submittedDate}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {onShareToClass && (
                                <Button
                                    type="button"
                                    variant="pill_secondary"
                                    onClick={onShareToClass}
                                >
                                    <Share2 size={15} />
                                    分享到班级
                                </Button>
                            )}
                            {onDownloadPDF && (
                                <Button
                                    type="button"
                                    variant="pill_primary"
                                    onClick={onDownloadPDF}
                                >
                                    <Download size={15} />
                                    导出 PDF
                                </Button>
                            )}
                        </div>
                    </div>
                </header>

                <section className="grid gap-4 md:grid-cols-3">
                    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-slate-500">总分</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            {overallScore}/{maxScore}
                        </p>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-slate-500">得分率</p>
                        <p className="mt-2 text-3xl font-bold text-blue-600">{scorePercentage}%</p>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-slate-500">教师评价</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">反馈已生成</p>
                    </article>
                </section>

                <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                            <UserRound size={18} className="text-blue-500" />
                            教师总结
                        </h2>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="h-11 w-11 overflow-hidden rounded-full bg-slate-200">
                                {teacherAvatar ? (
                                    <img
                                        src={teacherAvatar}
                                        alt={teacherName}
                                        className="h-full w-full object-cover"
                                    />
                                ) : null}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">{teacherName}</p>
                                <p className="text-xs text-slate-500">授课教师</p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-slate-700">{teacherSummary}</p>

                        <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                            <p className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                                <Bot size={16} />
                                AI 分析
                            </p>
                            <p className="mt-2 text-sm leading-7 text-slate-700">{aiAnalysis}</p>
                        </div>
                    </article>

                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                            <ChartNoAxesColumn size={18} className="text-emerald-500" />
                            成绩拆解
                        </h2>

                        <ul className="mt-4 space-y-3">
                            {gradeBreakdown.map((item) => (
                                <li key={item.category}>
                                    <div className="flex items-center justify-between text-sm text-slate-700">
                                        <span>{item.category}</span>
                                        <span className="font-semibold">
                                            {item.score}/{item.maxScore}
                                        </span>
                                    </div>
                                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className={`h-full rounded-full ${BREAKDOWN_COLOR_CLASS[item.color]}`}
                                            style={{
                                                width: `${
                                                    item.maxScore > 0
                                                        ? Math.max(
                                                              0,
                                                              Math.min(
                                                                  100,
                                                                  Math.round(
                                                                      (item.score /
                                                                          item.maxScore) *
                                                                          100,
                                                                  ),
                                                              ),
                                                          )
                                                        : 0
                                                }%`,
                                            }}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </article>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                        <FileText size={18} className="text-indigo-500" />
                        关键洞察
                    </h2>

                    <ul className="mt-4 grid gap-3 lg:grid-cols-2">
                        {keyInsights.map((insight) => (
                            <li
                                key={insight.title}
                                className={`rounded-2xl border p-4 text-sm ${INSIGHT_COLOR_CLASS[insight.type]}`}
                            >
                                <p className="font-semibold">{insight.title}</p>
                                <p className="mt-1 leading-6">{insight.description}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                {(generalComments || privateNotes) && (
                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900">补充说明</h2>
                        {generalComments && (
                            <p className="mt-3 text-sm leading-7 text-slate-700">
                                {generalComments}
                            </p>
                        )}
                        {privateNotes && (
                            <p className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
                                备注：{privateNotes}
                            </p>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
};
