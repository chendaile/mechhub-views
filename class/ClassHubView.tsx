interface ClassOption {
    id: string;
    name: string;
    role: "teacher" | "student";
    teacherCount: number;
    studentCount: number;
}

interface InviteCodeItem {
    id: string;
    codeLast4: string;
    expiresAt: string;
    maxUses: number | null;
    usedCount: number;
    isRevoked: boolean;
}

interface MemberItem {
    userId: string;
    name: string;
    email: string;
    role: "teacher" | "student";
    status?: "active" | "removed";
}

interface ThreadItem {
    id: string;
    title: string;
    threadType: "group" | "shared_chat" | "shared_grade";
}

interface ThreadMessageItem {
    id: string;
    role: "user" | "assistant" | "system";
    senderName?: string | null;
    createdAt: string;
    content: Record<string, unknown>;
}

type HubTab = "overview" | "members" | "invites" | "chat";

interface ClassHubViewProps {
    requesterEmail?: string;
    isAdmin: boolean;
    classOptions: ClassOption[];
    selectedClassId?: string;
    onSelectClass: (classId: string) => void;
    canCreateClass: boolean;
    canJoinClass: boolean;
    createClassName: string;
    onCreateClassNameChange: (value: string) => void;
    createClassDescription: string;
    onCreateClassDescriptionChange: (value: string) => void;
    createTeacherUserId: string;
    onCreateTeacherUserIdChange: (value: string) => void;
    onCreateClass: () => void;
    isCreatingClass: boolean;
    inviteCodeInput: string;
    onInviteCodeInputChange: (value: string) => void;
    onJoinByInviteCode: () => void;
    isJoiningClass: boolean;
    inviteExpiresHours: number;
    onInviteExpiresHoursChange: (value: number) => void;
    inviteMaxUsesInput: string;
    onInviteMaxUsesInputChange: (value: string) => void;
    onCreateInviteCode: () => void;
    isCreatingInviteCode: boolean;
    latestCreatedInviteCode?: string;
    inviteCodes: InviteCodeItem[];
    onRevokeInviteCode: (inviteCodeId: string) => void;
    isRevokingInviteCode: boolean;
    teachers: MemberItem[];
    students: MemberItem[];
    onRemoveStudent: (studentUserId: string) => void;
    isRemovingStudent: boolean;
    canManageMembers: boolean;
    threads: ThreadItem[];
    selectedThreadId?: string;
    onSelectThread: (threadId: string) => void;
    onCreateGroupThread: () => void;
    isCreatingThread: boolean;
    threadMessages: ThreadMessageItem[];
    threadInput: string;
    onThreadInputChange: (value: string) => void;
    onPostThreadMessage: () => void;
    isPostingThreadMessage: boolean;
    message?: string;
    activeTab: HubTab;
    onTabChange: (tab: HubTab) => void;
    memberSearch: string;
    onMemberSearchChange: (value: string) => void;
    threadSearch: string;
    onThreadSearchChange: (value: string) => void;
}

const formatDateTime = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
};

const renderMessageContent = (content: Record<string, unknown>) => {
    if (typeof content.text === "string" && content.text) return content.text;
    if (content.kind === "shared_chat") return "分享了私聊记录";
    if (content.kind === "shared_grade") return "分享了成绩结果";
    try {
        return JSON.stringify(content);
    } catch {
        return "[不支持的消息内容]";
    }
};

export const ClassHubView = ({
    requesterEmail,
    isAdmin,
    classOptions,
    selectedClassId,
    onSelectClass,
    canCreateClass,
    canJoinClass,
    createClassName,
    onCreateClassNameChange,
    createClassDescription,
    onCreateClassDescriptionChange,
    createTeacherUserId,
    onCreateTeacherUserIdChange,
    onCreateClass,
    isCreatingClass,
    inviteCodeInput,
    onInviteCodeInputChange,
    onJoinByInviteCode,
    isJoiningClass,
    inviteExpiresHours,
    onInviteExpiresHoursChange,
    inviteMaxUsesInput,
    onInviteMaxUsesInputChange,
    onCreateInviteCode,
    isCreatingInviteCode,
    latestCreatedInviteCode,
    inviteCodes,
    onRevokeInviteCode,
    isRevokingInviteCode,
    teachers,
    students,
    onRemoveStudent,
    isRemovingStudent,
    canManageMembers,
    threads,
    selectedThreadId,
    onSelectThread,
    onCreateGroupThread,
    isCreatingThread,
    threadMessages,
    threadInput,
    onThreadInputChange,
    onPostThreadMessage,
    isPostingThreadMessage,
    message,
    activeTab,
    onTabChange,
    memberSearch,
    onMemberSearchChange,
    threadSearch,
    onThreadSearchChange,
}: ClassHubViewProps) => {
    const selectedClass = classOptions.find((item) => item.id === selectedClassId);
    const selectedThread = threads.find((item) => item.id === selectedThreadId);
    const totalMembers = selectedClass
        ? selectedClass.teacherCount + selectedClass.studentCount
        : 0;

    return (
        <div className="min-h-full bg-slate-50 p-6">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
                <header className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h1 className="font-serif-heading text-3xl font-bold text-slate-900">
                        班级协作中心
                    </h1>
                    <p className="mt-1 text-sm text-slate-600">
                        管理班级、邀请码与班级讨论频道。
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                        {requesterEmail ? `账号：${requesterEmail}` : ""}
                        {isAdmin ? " · 管理员" : ""}
                    </p>
                </header>

                <section className="grid gap-4 lg:grid-cols-2">
                    {canJoinClass && (
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <h2 className="text-base font-bold text-slate-900">邀请码加入班级</h2>
                            <div className="mt-2 flex gap-2">
                                <input
                                    value={inviteCodeInput}
                                    onChange={(event) => onInviteCodeInputChange(event.target.value)}
                                    placeholder="输入邀请码"
                                    className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={onJoinByInviteCode}
                                    disabled={isJoiningClass}
                                    className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
                                >
                                    {isJoiningClass ? "加入中..." : "加入"}
                                </button>
                            </div>
                        </div>
                    )}

                    {canCreateClass && (
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <h2 className="text-base font-bold text-slate-900">创建班级</h2>
                            <div className="mt-2 grid gap-2">
                                <input
                                    value={createClassName}
                                    onChange={(event) => onCreateClassNameChange(event.target.value)}
                                    placeholder="班级名称"
                                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                                />
                                <textarea
                                    value={createClassDescription}
                                    onChange={(event) => onCreateClassDescriptionChange(event.target.value)}
                                    rows={2}
                                    placeholder="班级简介（可选）"
                                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                                />
                                <input
                                    value={createTeacherUserId}
                                    onChange={(event) => onCreateTeacherUserIdChange(event.target.value)}
                                    placeholder="教师用户ID（管理员填写）"
                                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={onCreateClass}
                                    disabled={isCreatingClass}
                                    className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
                                >
                                    {isCreatingClass ? "创建中..." : "创建班级"}
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                <section className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <aside className="rounded-2xl border border-slate-200 bg-white p-4">
                        <h2 className="text-base font-bold text-slate-900">我的班级</h2>
                        <div className="mt-2 grid gap-2">
                            {classOptions.map((classItem) => (
                                <button
                                    key={classItem.id}
                                    type="button"
                                    onClick={() => onSelectClass(classItem.id)}
                                    className={`rounded-lg border px-3 py-2 text-left text-xs ${
                                        selectedClassId === classItem.id
                                            ? "border-slate-400 bg-slate-100"
                                            : "border-slate-200 bg-white"
                                    }`}
                                >
                                    <div className="font-semibold text-slate-800">{classItem.name}</div>
                                    <div className="text-slate-500">
                                        {classItem.role === "teacher" ? "教师" : "学生"} · 教师
                                        {classItem.teacherCount} · 学生{classItem.studentCount}
                                    </div>
                                </button>
                            ))}
                            {classOptions.length === 0 && (
                                <p className="text-xs text-slate-500">暂无班级</p>
                            )}
                        </div>
                    </aside>

                    <div className="grid gap-4">
                        <section className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="mb-3 flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => onTabChange("overview")}
                                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                                        activeTab === "overview"
                                            ? "border-slate-900 bg-slate-900 text-white"
                                            : "border-slate-200 bg-white text-slate-600"
                                    }`}
                                >
                                    概览
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onTabChange("members")}
                                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                                        activeTab === "members"
                                            ? "border-slate-900 bg-slate-900 text-white"
                                            : "border-slate-200 bg-white text-slate-600"
                                    }`}
                                >
                                    成员
                                </button>
                                {canManageMembers && (
                                    <button
                                        type="button"
                                        onClick={() => onTabChange("invites")}
                                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                                            activeTab === "invites"
                                                ? "border-slate-900 bg-slate-900 text-white"
                                                : "border-slate-200 bg-white text-slate-600"
                                        }`}
                                    >
                                        邀请码
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => onTabChange("chat")}
                                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                                        activeTab === "chat"
                                            ? "border-slate-900 bg-slate-900 text-white"
                                            : "border-slate-200 bg-white text-slate-600"
                                    }`}
                                >
                                    班级聊天
                                </button>
                            </div>
                            <h2 className="text-lg font-bold text-slate-900">
                                {selectedClass ? selectedClass.name : "请选择班级"}
                            </h2>

                            {selectedClass && activeTab === "overview" && (
                                <div className="mt-3 grid gap-3 md:grid-cols-3">
                                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                                        <p className="text-slate-500">班级成员</p>
                                        <p className="mt-1 text-xl font-bold text-slate-900">{totalMembers}</p>
                                    </div>
                                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                                        <p className="text-slate-500">可用邀请码</p>
                                        <p className="mt-1 text-xl font-bold text-slate-900">
                                            {inviteCodes.filter((x) => !x.isRevoked).length}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                                        <p className="text-slate-500">讨论频道</p>
                                        <p className="mt-1 text-xl font-bold text-slate-900">{threads.length}</p>
                                    </div>
                                </div>
                            )}

                            {selectedClass && activeTab === "invites" && canManageMembers && (
                                <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                                    <div className="flex flex-wrap items-end gap-2">
                                        <input
                                            type="number"
                                            min={1}
                                            value={inviteExpiresHours}
                                            onChange={(event) => onInviteExpiresHoursChange(Number(event.target.value))}
                                            className="w-24 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
                                        />
                                        <input
                                            value={inviteMaxUsesInput}
                                            onChange={(event) => onInviteMaxUsesInputChange(event.target.value)}
                                            placeholder="最大使用次数"
                                            className="w-24 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
                                        />
                                        <button
                                            type="button"
                                            onClick={onCreateInviteCode}
                                            disabled={isCreatingInviteCode}
                                            className="rounded-md bg-slate-900 px-2 py-1 text-xs font-semibold text-white"
                                        >
                                            {isCreatingInviteCode ? "生成中..." : "生成邀请码"}
                                        </button>
                                    </div>
                                    {latestCreatedInviteCode && (
                                        <p className="mt-2 text-xs font-semibold text-emerald-700">
                                            新邀请码: {latestCreatedInviteCode}
                                        </p>
                                    )}
                                    <div className="mt-2 grid gap-1">
                                        {inviteCodes.map((code) => (
                                            <div key={code.id} className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-2 py-1 text-xs">
                                                <span>
                                                    ****-{code.codeLast4} · {formatDateTime(code.expiresAt)} · {code.usedCount}
                                                    {code.maxUses !== null ? `/${code.maxUses}` : ""}
                                                </span>
                                                {!code.isRevoked && (
                                                    <button
                                                        type="button"
                                                        onClick={() => onRevokeInviteCode(code.id)}
                                                        disabled={isRevokingInviteCode}
                                                        className="rounded bg-rose-100 px-2 py-0.5 font-semibold text-rose-700"
                                                    >
                                                        撤销
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedClass && activeTab === "members" && (
                                <div className="mt-3 grid gap-2 md:grid-cols-2">
                                    <div className="md:col-span-2">
                                        <input
                                            value={memberSearch}
                                            onChange={(event) => onMemberSearchChange(event.target.value)}
                                            placeholder="搜索成员姓名或邮箱"
                                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                                        <h3 className="text-xs font-bold uppercase text-slate-500">教师</h3>
                                        <div className="mt-2 grid gap-1">
                                            {teachers.map((teacher) => (
                                                <div key={teacher.userId} className="rounded border border-slate-200 bg-white px-2 py-1 text-xs">
                                                    {teacher.name} · {teacher.email}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                                        <h3 className="text-xs font-bold uppercase text-slate-500">学生</h3>
                                        <div className="mt-2 grid gap-1">
                                            {students.map((student) => (
                                                <div key={student.userId} className="flex items-center justify-between rounded border border-slate-200 bg-white px-2 py-1 text-xs">
                                                    <span>{student.name} · {student.email} · {student.status ?? "active"}</span>
                                                    {canManageMembers && student.status === "active" && (
                                                        <button
                                                            type="button"
                                                            onClick={() => onRemoveStudent(student.userId)}
                                                            disabled={isRemovingStudent}
                                                            className="rounded bg-rose-100 px-2 py-0.5 font-semibold text-rose-700"
                                                        >
                                                            移出
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>

                        {selectedClass && activeTab === "chat" && (
                            <section className="rounded-2xl border border-slate-200 bg-white p-4">
                                <div className="flex items-center justify-between gap-2">
                                    <h2 className="text-lg font-bold text-slate-900">班级聊天</h2>
                                    <button
                                        type="button"
                                        onClick={onCreateGroupThread}
                                        disabled={isCreatingThread}
                                        className="rounded-md bg-slate-900 px-2 py-1 text-xs font-semibold text-white"
                                    >
                                        {isCreatingThread ? "创建中..." : "新建频道"}
                                    </button>
                                </div>
                                <div className="mt-3 grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)]">
                                    <div className="grid gap-1 rounded-lg border border-slate-200 bg-slate-50 p-2">
                                        <input
                                            value={threadSearch}
                                            onChange={(event) => onThreadSearchChange(event.target.value)}
                                            placeholder="搜索频道"
                                            className="mb-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
                                        />
                                        {threads.map((thread) => (
                                            <button
                                                key={thread.id}
                                                type="button"
                                                onClick={() => onSelectThread(thread.id)}
                                                className={`rounded border px-2 py-1 text-left text-xs ${
                                                    selectedThreadId === thread.id
                                                        ? "border-slate-400 bg-white"
                                                        : "border-slate-200 bg-white/80"
                                                }`}
                                            >
                                                {thread.title}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                                        <p className="mb-2 text-xs font-semibold text-slate-500">
                                            {selectedThread ? selectedThread.title : "请选择频道"}
                                        </p>
                                        <div className="max-h-72 overflow-y-auto rounded border border-slate-200 bg-white p-2">
                                            <div className="grid gap-2">
                                                {threadMessages.map((threadMessage) => (
                                                    <div key={threadMessage.id} className="rounded border border-slate-200 px-2 py-1 text-xs">
                                                        <div className="text-[10px] text-slate-500">
                                                            {threadMessage.role} · {threadMessage.senderName ?? "匿名成员"} · {formatDateTime(threadMessage.createdAt)}
                                                        </div>
                                                        <div className="mt-1 text-slate-700">
                                                            {renderMessageContent(threadMessage.content)}
                                                        </div>
                                                    </div>
                                                ))}
                                                {threadMessages.length === 0 && (
                                                    <p className="text-xs text-slate-500">还没有消息。</p>
                                                )}
                                            </div>
                                        </div>
                                        {selectedThreadId && (
                                            <div className="mt-2 flex gap-2">
                                                <input
                                                    value={threadInput}
                                                    onChange={(event) => onThreadInputChange(event.target.value)}
                                                    placeholder="输入消息，包含 @ai 可触发 AI 回复"
                                                    className="flex-1 rounded border border-slate-200 bg-white px-2 py-1 text-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={onPostThreadMessage}
                                                    disabled={isPostingThreadMessage}
                                                    className="rounded bg-slate-900 px-3 py-1 text-sm font-semibold text-white"
                                                >
                                                    {isPostingThreadMessage ? "发送中..." : "发送"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                        )}

                        {message && <p className="text-sm text-slate-600">{message}</p>}
                    </div>
                </section>
            </div>
        </div>
    );
};
