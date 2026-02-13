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
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-8">
                <header className="rounded-2xl border border-slate-200 bg-white p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                {assignmentTitle}
                            </h1>
                            <p className="mt-2 text-sm text-slate-600">
                                Submitted: {submittedDate}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            {onShareToClass && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={onShareToClass}
                                >
                                    Share to Class
                                </Button>
                            )}
                            {onDownloadPDF && (
                                <Button
                                    variant="soft"
                                    size="sm"
                                    onClick={onDownloadPDF}
                                >
                                    Download PDF
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-end justify-between">
                            <p className="text-sm font-medium text-slate-600">
                                Overall Score
                            </p>
                            <p className="text-2xl font-bold text-slate-900">
                                {overallScore}/{maxScore}
                            </p>
                        </div>
                        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200">
                            <div
                                className="h-full rounded-full bg-slate-700"
                                style={{ width: `${scorePercentage}%` }}
                            />
                        </div>
                    </div>
                </header>

                <section className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Instructor Summary
                    </h2>
                    <div className="mt-4 flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                            {teacherAvatar ? (
                                <img
                                    src={teacherAvatar}
                                    alt={teacherName}
                                    className="h-full w-full object-cover"
                                />
                            ) : null}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">
                                {teacherName}
                            </p>
                            <p className="text-sm text-slate-600">{teacherSummary}</p>
                        </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-700">{aiAnalysis}</p>
                </section>

                <section className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                            Grade Breakdown
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
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                            Key Insights
                        </h2>
                        <ul className="mt-4 space-y-3">
                            {keyInsights.map((insight) => (
                                <li
                                    key={insight.title}
                                    className={`rounded-xl border p-3 text-sm ${INSIGHT_COLOR_CLASS[insight.type]}`}
                                >
                                    <p className="font-semibold">{insight.title}</p>
                                    <p className="mt-1 leading-6">
                                        {insight.description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {(generalComments || privateNotes) && (
                    <section className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                            Additional Notes
                        </h2>
                        {generalComments && (
                            <p className="mt-4 text-sm leading-6 text-slate-700">
                                {generalComments}
                            </p>
                        )}
                        {privateNotes && (
                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Private note: {privateNotes}
                            </p>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
};
