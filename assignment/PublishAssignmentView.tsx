import type { ChangeEvent } from "react";
import { CalendarClock, FileText, Settings2, Sparkles } from "lucide-react";
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
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:px-10">
                <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="text-sm text-slate-500">班级管理 / 作业发布</div>

                    <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="font-serif-heading text-4xl font-bold text-slate-900">
                                发布新作业
                            </h1>
                            <p className="mt-2 text-sm text-slate-600">
                                配置作业信息、截止时间与附件后，一键发布到班级。
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
                                onClick={onPublish}
                                disabled={!canPublish}
                            >
                                {isLoading ? "发布中..." : "发布作业"}
                            </Button>
                        </div>
                    </div>
                </header>

                <section className="grid gap-4 md:grid-cols-3">
                    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-slate-500">表单状态</p>
                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {canPublish ? "可发布" : "待完善"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            至少填写作业名称和模块
                        </p>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-slate-500">附件数量</p>
                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {attachedFiles.length}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">支持参考资料与模板</p>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-slate-500">AI 批改</p>
                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {aiGradingEnabled ? "已开启" : "已关闭"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">可在发布后继续调整</p>
                    </article>
                </section>

                <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                            <FileText size={18} className="text-blue-500" />
                            作业基础信息
                        </h2>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                                作业名称
                                <Input
                                    className="mt-2"
                                    value={assignmentName}
                                    onChange={(event) => setAssignmentName(event.target.value)}
                                    placeholder="例如：理论力学 第三次作业"
                                />
                            </label>

                            <label className="block text-sm font-medium text-slate-700">
                                所属模块
                                <select
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                                    value={selectedModule}
                                    onChange={(event) => setSelectedModule(event.target.value)}
                                >
                                    <option value="">请选择模块</option>
                                    {modules.map((module) => (
                                        <option key={module} value={module}>
                                            {module}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="block text-sm font-medium text-slate-700">
                                截止日期
                                <Input
                                    className="mt-2"
                                    type="date"
                                    value={dueDate}
                                    onChange={(event) => setDueDate(event.target.value)}
                                />
                            </label>

                            <label className="block text-sm font-medium text-slate-700">
                                截止时间
                                <Input
                                    className="mt-2"
                                    type="time"
                                    value={dueTime}
                                    onChange={(event) => setDueTime(event.target.value)}
                                />
                            </label>

                            <label className="block text-sm font-medium text-slate-700">
                                发布选项
                                <div className="mt-2 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Sparkles size={16} className="text-emerald-500" />
                                        启用 AI 辅助批改
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={aiGradingEnabled}
                                        onChange={(event) =>
                                            setAiGradingEnabled(event.target.checked)
                                        }
                                    />
                                </div>
                            </label>
                        </div>
                    </article>

                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                            <CalendarClock size={18} className="text-amber-500" />
                            作业说明
                        </h2>

                        <textarea
                            className="mt-5 min-h-[16rem] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                            value={instructions}
                            onChange={(event) => setInstructions(event.target.value)}
                            placeholder="填写作业要求、提交格式、评分标准等。"
                        />

                        <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
                            提示：建议明确“评分维度”和“常见扣分点”，便于学生理解。
                        </div>
                    </article>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                                <Settings2 size={18} className="text-slate-500" />
                                附件与参考资料
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                可上传题目 PDF、模板文件、示例数据等。
                            </p>
                        </div>

                        <label className="mh-pill-secondary cursor-pointer">
                            添加附件
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>

                    <div className="mt-4 grid gap-2">
                        {attachedFiles.length > 0 ? (
                            attachedFiles.map((file, index) => (
                                <div
                                    key={`${file.name}-${index}`}
                                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-slate-500">附件 #{index + 1}</p>
                                    </div>

                                    <button
                                        type="button"
                                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                                        onClick={() => onRemoveFile(index)}
                                    >
                                        移除
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                                暂无附件。可在发布前添加参考资料。
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};
