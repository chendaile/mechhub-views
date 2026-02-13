interface ClassPickerOption {
    id: string;
    name: string;
    role: "teacher" | "student";
}

interface ClassPickerPopoverProps {
    open: boolean;
    title: string;
    description?: string;
    classOptions: ClassPickerOption[];
    isSubmitting?: boolean;
    onSelectClass: (classId: string) => void;
    onClose: () => void;
}

export const ClassPickerPopover = ({
    open,
    title,
    description,
    classOptions,
    isSubmitting = false,
    onSelectClass,
    onClose,
}: ClassPickerPopoverProps) => {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/35 p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
                <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}

                <div className="mt-4 max-h-72 space-y-2 overflow-y-auto">
                    {classOptions.map((classItem) => (
                        <button
                            key={classItem.id}
                            type="button"
                            onClick={() => onSelectClass(classItem.id)}
                            disabled={isSubmitting}
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left transition hover:bg-slate-50 disabled:opacity-50"
                        >
                            <p className="text-sm font-semibold text-slate-900">{classItem.name}</p>
                            <p className="mt-0.5 text-xs text-slate-500">
                                {classItem.role === "teacher" ? "教师角色" : "学生角色"}
                            </p>
                        </button>
                    ))}
                    {classOptions.length === 0 && (
                        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-500">
                            还没有可分享的班级。
                        </p>
                    )}
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                        取消
                    </button>
                </div>
            </div>
        </div>
    );
};
