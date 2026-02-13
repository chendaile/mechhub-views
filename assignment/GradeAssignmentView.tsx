import { CheckCircle2, Clock3, ListChecks, UserRound } from "lucide-react";
import { Button } from "../shared/ui/button";
import type { StudentSubmission } from "./types";

interface GradeAssignmentViewProps {
    assignmentTitle: string;
    currentStudentIndex: number;
    totalStudents: number;
    currentStudent?: StudentSubmission;
    score: number;
    maxScore: number;
    feedback: string;
    onFeedbackChange: (feedback: string) => void;
    onScoreChange: (score: number) => void;
    onPrevStudent: () => void;
    onNextStudent: () => void;
    onSaveGrade: () => void;
    onCancel: () => void;
    students: StudentSubmission[];
    isLoading: boolean;
}

const STATUS_LABEL: Record<StudentSubmission["status"], string> = {
    pending: "待批改",
    graded: "已批改",
};

export const GradeAssignmentView = ({
    assignmentTitle,
    currentStudentIndex,
    totalStudents,
    currentStudent,
    score,
    maxScore,
    feedback,
    onFeedbackChange,
    onScoreChange,
    onPrevStudent,
    onNextStudent,
    onSaveGrade,
    onCancel,
    students,
    isLoading,
}: GradeAssignmentViewProps) => {
    const hasStudents = totalStudents > 0;
    const onFirstStudent = currentStudentIndex === 0;
    const onLastStudent = currentStudentIndex >= totalStudents - 1;

    const gradedCount = students.filter((student) => student.status === "graded").length;
    const pendingCount = students.filter((student) => student.status === "pending").length;

    return (
        <div className="flex-1 h-full overflow-y-auto bg-slate-50">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:px-10">
                <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="text-sm text-slate-500">班级管理 / 作业批改</div>
                    <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="font-serif-heading text-4xl font-bold text-slate-900">
                                作业批改面板
                            </h1>
                            <p className="mt-2 text-sm text-slate-600">{assignmentTitle}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="pill_secondary"
                                onClick={onCancel}
                                disabled={isLoading}
                            >
                                返回
                            </Button>
                        </div>
                    </div>
                </header>

                <section className="grid gap-4 md:grid-cols-3">
                    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                            <ListChecks size={14} />
                            总提交数
                        </div>
                        <p className="mt-2 text-3xl font-bold text-slate-900">{totalStudents}</p>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                            <Clock3 size={14} className="text-amber-500" />
                            待批改
                        </div>
                        <p className="mt-2 text-3xl font-bold text-amber-600">{pendingCount}</p>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                            <CheckCircle2 size={14} className="text-emerald-500" />
                            已批改
                        </div>
                        <p className="mt-2 text-3xl font-bold text-emerald-600">{gradedCount}</p>
                    </article>
                </section>

                <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                    <article className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-5">
                            <h2 className="text-xl font-bold text-slate-900">学生提交列表</h2>
                            <p className="text-sm text-slate-500">共 {totalStudents} 份提交</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[680px] border-collapse text-left">
                                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-6 py-3">学生</th>
                                        <th className="px-6 py-3">提交时间</th>
                                        <th className="px-6 py-3">状态</th>
                                        <th className="px-6 py-3">进度</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.length > 0 ? (
                                        students.map((student, index) => {
                                            const isActive = index === currentStudentIndex;
                                            return (
                                                <tr
                                                    key={student.id}
                                                    className={`border-t border-slate-200 ${
                                                        isActive
                                                            ? "bg-blue-50/60"
                                                            : "hover:bg-slate-50"
                                                    } transition-colors`}
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <span
                                                                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                                                                    isActive
                                                                        ? "bg-blue-100 text-blue-700"
                                                                        : "bg-slate-100 text-slate-600"
                                                                }`}
                                                            >
                                                                <UserRound size={14} />
                                                            </span>
                                                            <div>
                                                                <p className="text-sm font-semibold text-slate-800">
                                                                    {student.studentName}
                                                                </p>
                                                                <p className="text-xs text-slate-500">ID: {student.id}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-600">
                                                        {student.submittedDate}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                                student.status === "graded"
                                                                    ? "bg-emerald-100 text-emerald-700"
                                                                    : "bg-amber-100 text-amber-700"
                                                            }`}
                                                        >
                                                            {STATUS_LABEL[student.status]}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="w-36 rounded-full bg-slate-200">
                                                            <div
                                                                className={`h-1.5 rounded-full ${
                                                                    student.status === "graded"
                                                                        ? "bg-emerald-500"
                                                                        : "bg-blue-500"
                                                                }`}
                                                                style={{
                                                                    width:
                                                                        student.status === "graded"
                                                                            ? "100%"
                                                                            : "45%",
                                                                }}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-6 py-10 text-center text-sm text-slate-500"
                                            >
                                                暂无可批改提交。
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </article>

                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900">当前评分</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            {hasStudents
                                ? `第 ${currentStudentIndex + 1} / ${totalStudents} 位学生`
                                : "暂无评分对象"}
                        </p>

                        {currentStudent ? (
                            <>
                                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-800">
                                        {currentStudent.studentName}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        提交时间：{currentStudent.submittedDate}
                                    </p>
                                    <a
                                        href={currentStudent.submission}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-3 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                                    >
                                        打开原始提交
                                    </a>
                                </div>

                                <label className="mt-4 block text-sm font-medium text-slate-700">
                                    分数（0-{maxScore}）
                                    <input
                                        type="number"
                                        min={0}
                                        max={maxScore}
                                        value={score}
                                        onChange={(event) =>
                                            onScoreChange(Number(event.target.value))
                                        }
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                                    />
                                </label>

                                <label className="mt-4 block text-sm font-medium text-slate-700">
                                    反馈意见
                                    <textarea
                                        className="mt-2 min-h-[12rem] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                                        value={feedback}
                                        onChange={(event) =>
                                            onFeedbackChange(event.target.value)
                                        }
                                        placeholder="请填写针对本次作业的反馈建议。"
                                    />
                                </label>
                            </>
                        ) : (
                            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                                当前没有可评分学生。
                            </div>
                        )}

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="pill_secondary"
                                    onClick={onPrevStudent}
                                    disabled={isLoading || !hasStudents || onFirstStudent}
                                >
                                    上一位
                                </Button>
                                <Button
                                    type="button"
                                    variant="pill_secondary"
                                    onClick={onNextStudent}
                                    disabled={isLoading || !hasStudents || onLastStudent}
                                >
                                    下一位
                                </Button>
                            </div>

                            <Button
                                type="button"
                                variant="pill_primary"
                                onClick={onSaveGrade}
                                disabled={isLoading || !currentStudent}
                            >
                                {isLoading ? "保存中..." : "保存评分"}
                            </Button>
                        </div>
                    </article>
                </section>
            </div>
        </div>
    );
};
