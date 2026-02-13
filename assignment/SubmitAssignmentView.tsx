import type { ChangeEvent } from "react";
import { CalendarDays, Clock3, FileText, UploadCloud } from "lucide-react";
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
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:px-10">
                <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="text-sm text-slate-500">
                        作业中心 / 课程作业 / 当前提交
                    </div>

                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="font-serif-heading text-4xl font-bold text-slate-900">
                                提交作业
                            </h1>
                            <p className="mt-2 text-sm text-slate-600">{title}</p>
                            <p className="mt-1 max-w-3xl text-sm text-slate-500">
                                {description}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                type="button"
                                variant="pill_secondary"
                                onClick={onCancel}
                                disabled={isLoading}
                            >
                                取消
                            </Button>
                            <Button
                                type="button"
                                variant="pill_primary"
                                onClick={onSubmit}
                                disabled={isLoading || !fileName}
                            >
                                {isLoading ? "提交中..." : "确认提交"}
                            </Button>
                        </div>
                    </div>
                </header>

                <section className="grid gap-4 md:grid-cols-2">
                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <FileText size={16} className="text-blue-500" />
                            作业摘要
                        </div>
                        <ul className="mt-4 space-y-2 text-sm text-slate-600">
                            <li className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
                                <span>作业标题</span>
                                <span className="font-medium text-slate-800">理论力学课后练习</span>
                            </li>
                            <li className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
                                <span>提交状态</span>
                                <span className="font-medium text-amber-600">
                                    {fileName ? "待提交" : "未上传文件"}
                                </span>
                            </li>
                        </ul>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <Clock3 size={16} className="text-amber-500" />
                            截止提醒
                        </div>
                        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
                            建议在截止前 24 小时完成最终提交，避免网络波动导致上传失败。
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                            <CalendarDays size={14} />
                            截止时间以课程公告为准
                        </div>
                    </article>
                </section>

                <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900">提交文件</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            支持 PDF、图片或文档。建议文件名包含姓名与学号。
                        </p>

                        <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-slate-400 hover:bg-white">
                            <UploadCloud className="text-slate-500" size={26} />
                            <span className="mt-3 text-sm font-semibold text-slate-700">
                                点击上传作业文件
                            </span>
                            <span className="mt-1 text-xs text-slate-500">
                                单文件上传，建议不超过 20MB
                            </span>
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>

                        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-slate-500">
                                        已选择文件
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-slate-800">
                                        {fileName ?? "暂无文件"}
                                    </p>
                                </div>

                                {fileUrl && (
                                    <a
                                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                                        href={fileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        预览文件
                                    </a>
                                )}
                            </div>
                        </div>
                    </article>

                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900">作业说明与备注</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            可补充你希望老师重点关注的步骤或问题。
                        </p>

                        <textarea
                            className="mt-5 min-h-[18rem] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                            placeholder="例如：第 3 步受力分析我不太确定，想请老师重点检查。"
                            value={comments}
                            onChange={(event) => onCommentsChange(event.target.value)}
                        />

                        <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
                            提交后你仍可在截止前重新上传文件，系统会以最后一次提交为准。
                        </div>
                    </article>
                </section>
            </div>
        </div>
    );
};
