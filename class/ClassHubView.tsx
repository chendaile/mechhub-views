interface ClassOption {
    id: string;
    name: string;
    role: "teacher" | "student";
    teacherCount: number;
    studentCount: number;
}

interface MemberItem {
    userId: string;
    name: string;
    email: string;
    avatar?: string | null;
    role: "teacher" | "student";
}

interface ThreadItem {
    id: string;
    title: string;
    threadType: "group" | "shared_chat";
}

type HubScreen = "collection" | "dashboard";

interface ClassHubViewProps {
    requesterEmail?: string;
    isAdmin: boolean;
    screen: HubScreen;
    classOptions: ClassOption[];
    selectedClassId?: string;
    onOpenClassDashboard: (classId: string) => void;
    onBackToCollection: () => void;
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
    teachers: MemberItem[];
    students: MemberItem[];
    threads: ThreadItem[];
    onCreateThread: () => void;
    isCreatingThread: boolean;
    onEnterGeneralChat: () => void;
    onEnterThreadChat: (threadId: string) => void;
    message?: string;
}

const buildInitial = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return "?";
    return trimmed.charAt(0).toUpperCase();
};

const MemberAvatar = ({
    name,
    avatar,
    role,
}: {
    name: string;
    avatar?: string | null;
    role: "teacher" | "student";
}) => {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                {avatar ? (
                    <img src={avatar} alt={name} className="h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-700">
                        {buildInitial(name)}
                    </div>
                )}
            </div>
            <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{name}</p>
                <p className="truncate text-xs text-slate-500">
                    {role === "teacher" ? "Teacher" : "Student"}
                </p>
            </div>
        </div>
    );
};

export const ClassHubView = ({
    requesterEmail,
    isAdmin,
    screen,
    classOptions,
    selectedClassId,
    onOpenClassDashboard,
    onBackToCollection,
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
    teachers,
    students,
    threads,
    onCreateThread,
    isCreatingThread,
    onEnterGeneralChat,
    onEnterThreadChat,
    message,
}: ClassHubViewProps) => {
    const selectedClass = classOptions.find((item) => item.id === selectedClassId);
    const totalMembers = selectedClass
        ? selectedClass.teacherCount + selectedClass.studentCount
        : teachers.length + students.length;

    return (
        <div className="min-h-full bg-slate-50 p-6">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
                <header className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h1 className="font-serif-heading text-3xl font-bold text-slate-900">
                        班级协作中心
                    </h1>
                    <p className="mt-1 text-sm text-slate-600">
                        班级是话题会话集合。先选班级，再进入班级 dashboard。
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                        {requesterEmail ? `账号：${requesterEmail}` : ""}
                        {isAdmin ? " · 管理员" : ""}
                    </p>
                </header>

                {screen === "collection" ? (
                    <section className="flex flex-col gap-4">
                        <section className="rounded-2xl border border-slate-200 bg-white p-4">
                            <h2 className="text-lg font-bold text-slate-900">我的班级</h2>
                            <div className="mt-3 grid gap-2">
                                {classOptions.map((classItem) => (
                                    <button
                                        key={classItem.id}
                                        type="button"
                                        onClick={() => onOpenClassDashboard(classItem.id)}
                                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:bg-slate-50"
                                    >
                                        <p className="text-sm font-semibold text-slate-900">
                                            {classItem.name}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {classItem.role === "teacher" ? "教师" : "学生"} · 教师
                                            {classItem.teacherCount} · 学生{classItem.studentCount}
                                        </p>
                                    </button>
                                ))}
                                {classOptions.length === 0 && (
                                    <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500">
                                        你还没有加入班级，请先加入或创建班级。
                                    </p>
                                )}
                            </div>
                        </section>

                        {canJoinClass && (
                            <section className="rounded-2xl border border-slate-200 bg-white p-4">
                                <h2 className="text-base font-bold text-slate-900">加入班级</h2>
                                <div className="mt-3 flex gap-2">
                                    <input
                                        value={inviteCodeInput}
                                        onChange={(event) =>
                                            onInviteCodeInputChange(event.target.value)
                                        }
                                        placeholder="输入邀请码"
                                        className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={onJoinByInviteCode}
                                        disabled={isJoiningClass}
                                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                                    >
                                        {isJoiningClass ? "加入中..." : "加入"}
                                    </button>
                                </div>
                            </section>
                        )}

                        {canCreateClass && (
                            <section className="rounded-2xl border border-slate-200 bg-white p-4">
                                <h2 className="text-base font-bold text-slate-900">创建班级</h2>
                                <div className="mt-3 grid gap-2">
                                    <input
                                        value={createClassName}
                                        onChange={(event) =>
                                            onCreateClassNameChange(event.target.value)
                                        }
                                        placeholder="班级名称"
                                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                                    />
                                    <textarea
                                        value={createClassDescription}
                                        onChange={(event) =>
                                            onCreateClassDescriptionChange(event.target.value)
                                        }
                                        rows={2}
                                        placeholder="班级简介（可选）"
                                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                                    />
                                    {isAdmin && (
                                        <input
                                            value={createTeacherUserId}
                                            onChange={(event) =>
                                                onCreateTeacherUserIdChange(event.target.value)
                                            }
                                            placeholder="教师用户 ID（管理员填写）"
                                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={onCreateClass}
                                        disabled={isCreatingClass}
                                        className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
                                    >
                                        {isCreatingClass ? "创建中..." : "创建班级"}
                                    </button>
                                </div>
                            </section>
                        )}
                    </section>
                ) : (
                    <section className="flex flex-col gap-4">
                        <section className="rounded-2xl border border-slate-200 bg-white p-4">
                            <button
                                type="button"
                                onClick={onBackToCollection}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                返回班级列表
                            </button>
                            <h2 className="mt-3 text-2xl font-bold text-slate-900">
                                {selectedClass?.name ?? "班级 dashboard"}
                            </h2>
                            <p className="mt-1 text-sm text-slate-600">
                                成员数 {totalMembers} · 话题数 {threads.length}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={onEnterGeneralChat}
                                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                                >
                                    进入总聊天
                                </button>
                                <button
                                    type="button"
                                    onClick={onCreateThread}
                                    disabled={isCreatingThread}
                                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    {isCreatingThread ? "创建中..." : "创建话题"}
                                </button>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-4">
                            <h3 className="text-base font-bold text-slate-900">老师头像</h3>
                            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                {teachers.map((teacher) => (
                                    <MemberAvatar
                                        key={teacher.userId}
                                        name={teacher.name}
                                        avatar={teacher.avatar}
                                        role="teacher"
                                    />
                                ))}
                                {teachers.length === 0 && (
                                    <p className="text-sm text-slate-500">暂无老师成员</p>
                                )}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-4">
                            <h3 className="text-base font-bold text-slate-900">班级成员头像</h3>
                            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                {students.map((student) => (
                                    <MemberAvatar
                                        key={student.userId}
                                        name={student.name}
                                        avatar={student.avatar}
                                        role="student"
                                    />
                                ))}
                                {students.length === 0 && (
                                    <p className="text-sm text-slate-500">暂无学生成员</p>
                                )}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-4">
                            <h3 className="text-base font-bold text-slate-900">班级话题</h3>
                            <div className="mt-3 grid gap-2">
                                {threads.map((thread) => (
                                    <div
                                        key={thread.id}
                                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                {thread.title}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {thread.threadType === "group"
                                                    ? "群聊话题"
                                                    : "分享话题"}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => onEnterThreadChat(thread.id)}
                                            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                        >
                                            进入话题
                                        </button>
                                    </div>
                                ))}
                                {threads.length === 0 && (
                                    <p className="text-sm text-slate-500">暂无可见话题。</p>
                                )}
                            </div>
                        </section>
                    </section>
                )}

                {message && <p className="text-sm text-slate-600">{message}</p>}
            </div>
        </div>
    );
};
