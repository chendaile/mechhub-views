interface ClassMembershipNoticeViewProps {
    title: string;
    description: string;
    actionLabel: string;
    onAction: () => void;
}

export const ClassMembershipNoticeView = ({
    title,
    description,
    actionLabel,
    onAction,
}: ClassMembershipNoticeViewProps) => {
    return (
        <div className="flex h-full items-center justify-center bg-slate-50 p-6">
            <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                <p className="mt-3 text-sm text-slate-600">{description}</p>
                <button
                    type="button"
                    onClick={onAction}
                    className="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                >
                    {actionLabel}
                </button>
            </div>
        </div>
    );
};
