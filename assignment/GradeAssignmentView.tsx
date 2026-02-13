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
    pending: "Pending",
    graded: "Graded",
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

    return (
        <div className="flex-1 h-full overflow-y-auto bg-slate-50">
            <div className="mx-auto grid w-full max-w-6xl gap-6 p-8 lg:grid-cols-[320px_1fr]">
                <aside className="rounded-2xl border border-slate-200 bg-white p-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Student Queue
                    </h2>
                    <ul className="mt-4 space-y-2">
                        {students.length > 0 ? (
                            students.map((student, index) => {
                                const isActive = index === currentStudentIndex;
                                return (
                                    <li
                                        key={student.id}
                                        className={`rounded-xl border px-3 py-2 ${
                                            isActive
                                                ? "border-slate-400 bg-slate-100"
                                                : "border-slate-200 bg-white"
                                        }`}
                                    >
                                        <p className="text-sm font-semibold text-slate-800">
                                            {student.studentName}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {student.submittedDate}
                                        </p>
                                        <p className="mt-1 text-xs font-medium text-slate-600">
                                            {STATUS_LABEL[student.status]}
                                        </p>
                                    </li>
                                );
                            })
                        ) : (
                            <li className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                                No submissions available.
                            </li>
                        )}
                    </ul>
                </aside>

                <section className="rounded-2xl border border-slate-200 bg-white p-6">
                    <header className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                {assignmentTitle}
                            </h1>
                            <p className="mt-1 text-sm text-slate-600">
                                {hasStudents
                                    ? `Student ${currentStudentIndex + 1} of ${totalStudents}`
                                    : "No active student"}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="soft"
                                onClick={onPrevStudent}
                                disabled={isLoading || !hasStudents || onFirstStudent}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="soft"
                                onClick={onNextStudent}
                                disabled={isLoading || !hasStudents || onLastStudent}
                            >
                                Next
                            </Button>
                        </div>
                    </header>

                    {currentStudent ? (
                        <>
                            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-sm font-semibold text-slate-700">
                                    Current Submission
                                </p>
                                <p className="mt-2 text-sm text-slate-600">
                                    Student: {currentStudent.studentName}
                                </p>
                                <p className="mt-1 text-sm text-slate-600">
                                    Uploaded: {currentStudent.submittedDate}
                                </p>
                                <a
                                    href={currentStudent.submission}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-3 inline-block text-sm font-medium text-slate-700 underline"
                                >
                                    Open submission
                                </a>
                            </div>

                            <div className="mt-6 grid gap-4">
                                <label className="text-sm font-medium text-slate-700">
                                    Score (0-{maxScore})
                                    <input
                                        type="number"
                                        min={0}
                                        max={maxScore}
                                        value={score}
                                        onChange={(event) =>
                                            onScoreChange(Number(event.target.value))
                                        }
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                                    />
                                </label>

                                <label className="text-sm font-medium text-slate-700">
                                    Feedback
                                    <textarea
                                        className="mt-2 min-h-40 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                                        value={feedback}
                                        onChange={(event) =>
                                            onFeedbackChange(event.target.value)
                                        }
                                        placeholder="Write clear feedback for the student."
                                    />
                                </label>
                            </div>
                        </>
                    ) : (
                        <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
                            There is no submission to grade yet.
                        </div>
                    )}

                    <div className="mt-6 flex items-center justify-end gap-3">
                        <Button
                            variant="ghost"
                            onClick={onCancel}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onSaveGrade}
                            disabled={isLoading || !currentStudent}
                            className="min-w-32"
                        >
                            {isLoading ? "Saving..." : "Save Grade"}
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
};
