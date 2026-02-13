import type { ChangeEvent } from "react";
import { Button } from "../shared/ui/button";

interface SubmitAssignmentViewProps {
    title: string;
    description: string;
    fileName?: string;
    fileUrl?: string;
    comments: string;
    isLoading: boolean;
    onFileSelect: (file: File) => void;
    onCommentsChange: (comments: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

export const SubmitAssignmentView = ({
    title,
    description,
    fileName,
    fileUrl,
    comments,
    isLoading,
    onFileSelect,
    onCommentsChange,
    onSubmit,
    onCancel,
}: SubmitAssignmentViewProps) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            onFileSelect(selectedFile);
        }
        event.target.value = "";
    };

    return (
        <div className="flex-1 h-full overflow-y-auto bg-slate-50">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-8">
                <header>
                    <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
                    <p className="mt-2 text-sm text-slate-600">{description}</p>
                </header>

                <section className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Submission File
                    </h2>
                    <div className="mt-4 flex items-center gap-3">
                        <label className="cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                            Choose file
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                        <span className="text-sm text-slate-600">
                            {fileName ?? "No file selected"}
                        </span>
                    </div>
                    {fileUrl && (
                        <a
                            className="mt-3 inline-block text-sm font-medium text-slate-700 underline"
                            href={fileUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Preview selected file
                        </a>
                    )}
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Comments
                    </h2>
                    <textarea
                        className="mt-4 min-h-36 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                        placeholder="Add optional comments for your instructor."
                        value={comments}
                        onChange={(event) => onCommentsChange(event.target.value)}
                    />
                </section>

                <div className="flex items-center justify-end gap-3">
                    <Button variant="ghost" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        disabled={isLoading || !fileName}
                        className="min-w-32"
                    >
                        {isLoading ? "Submitting..." : "Submit Assignment"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
