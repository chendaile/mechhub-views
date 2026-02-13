import type { ChangeEvent } from "react";
import { Button } from "../shared/ui/button";
import { Input } from "../shared/ui/input";

interface PublishAssignmentViewProps {
    assignmentName: string;
    setAssignmentName: (value: string) => void;
    selectedModule: string;
    setSelectedModule: (value: string) => void;
    modules: string[];
    dueDate: string;
    setDueDate: (value: string) => void;
    dueTime: string;
    setDueTime: (value: string) => void;
    instructions: string;
    setInstructions: (value: string) => void;
    attachedFiles: File[];
    onFileUpload: (file: File) => void;
    onRemoveFile: (index: number) => void;
    aiGradingEnabled: boolean;
    setAiGradingEnabled: (value: boolean) => void;
    onPublish: () => void;
    onCancel: () => void;
    isLoading: boolean;
}

export const PublishAssignmentView = ({
    assignmentName,
    setAssignmentName,
    selectedModule,
    setSelectedModule,
    modules,
    dueDate,
    setDueDate,
    dueTime,
    setDueTime,
    instructions,
    setInstructions,
    attachedFiles,
    onFileUpload,
    onRemoveFile,
    aiGradingEnabled,
    setAiGradingEnabled,
    onPublish,
    onCancel,
    isLoading,
}: PublishAssignmentViewProps) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextFile = event.target.files?.[0];
        if (nextFile) {
            onFileUpload(nextFile);
        }
        event.target.value = "";
    };

    const canPublish = !!assignmentName.trim() && !!selectedModule && !isLoading;

    return (
        <div className="flex-1 h-full overflow-y-auto bg-slate-50">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-8">
                <header>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Publish Assignment
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Fill in assignment details and publish to students.
                    </p>
                </header>

                <section className="rounded-2xl border border-slate-200 bg-white p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="block text-sm font-medium text-slate-700">
                            Assignment Name
                            <Input
                                className="mt-2"
                                value={assignmentName}
                                onChange={(event) =>
                                    setAssignmentName(event.target.value)
                                }
                                placeholder="Statics Worksheet 3"
                            />
                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                            Module
                            <select
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                                value={selectedModule}
                                onChange={(event) =>
                                    setSelectedModule(event.target.value)
                                }
                            >
                                <option value="">Select module</option>
                                {modules.map((module) => (
                                    <option key={module} value={module}>
                                        {module}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                            Due Date
                            <Input
                                className="mt-2"
                                type="date"
                                value={dueDate}
                                onChange={(event) => setDueDate(event.target.value)}
                            />
                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                            Due Time
                            <Input
                                className="mt-2"
                                type="time"
                                value={dueTime}
                                onChange={(event) => setDueTime(event.target.value)}
                            />
                        </label>
                    </div>

                    <label className="mt-4 block text-sm font-medium text-slate-700">
                        Instructions
                        <textarea
                            className="mt-2 min-h-36 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                            value={instructions}
                            onChange={(event) =>
                                setInstructions(event.target.value)
                            }
                            placeholder="Include required steps and grading expectations."
                        />
                    </label>

                    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-medium text-slate-700">
                                Attach reference files
                            </p>
                            <label className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100">
                                Add file
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>

                        {attachedFiles.length > 0 ? (
                            <ul className="mt-3 space-y-2">
                                {attachedFiles.map((file, index) => (
                                    <li
                                        key={`${file.name}-${index}`}
                                        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm text-slate-700"
                                    >
                                        <span className="truncate">{file.name}</span>
                                        <button
                                            type="button"
                                            className="ml-2 rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                            onClick={() => onRemoveFile(index)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-3 text-xs text-slate-500">
                                No files attached yet.
                            </p>
                        )}
                    </div>

                    <label className="mt-6 flex items-center gap-3 text-sm font-medium text-slate-700">
                        <input
                            type="checkbox"
                            checked={aiGradingEnabled}
                            onChange={(event) =>
                                setAiGradingEnabled(event.target.checked)
                            }
                        />
                        Enable AI-assisted grading
                    </label>
                </section>

                <div className="flex items-center justify-end gap-3">
                    <Button variant="ghost" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={onPublish}
                        disabled={!canPublish}
                        className="min-w-32"
                    >
                        {isLoading ? "Publishing..." : "Publish"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
