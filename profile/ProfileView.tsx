import { motion } from "framer-motion";
import { ProfileAvatar } from "./parts/ProfileAvatar";
import { ProfileFields } from "./parts/ProfileFields";
import { ProfileHeader } from "./parts/ProfileHeader";
import { ProfileSkills } from "./parts/ProfileSkills";
import { ProfileTimeline } from "./parts/ProfileTimeline";
import styles from "../shared/scrollbar.module.css";

interface ProfileViewProps {
    name: string;
    setName: (value: string) => void;
    role: string;
    setRole: (value: string) => void;
    avatar: string;
    isEditing: boolean;
    setIsEditing: (editing: boolean) => void;
    handleSave: () => void;
    handleCancel: () => void;
    containerVariants: Record<string, any>;
    itemVariants: Record<string, any>;
}

export const ProfileView = ({
    name,
    setName,
    role,
    setRole,
    avatar,
    isEditing,
    setIsEditing,
    handleSave,
    handleCancel,
    containerVariants,
    itemVariants,
}: ProfileViewProps) => {
    return (
        <div
            className={`flex-1 h-full overflow-y-auto bg-slate-50/50 ${styles.scrollbar}`}
        >
            <motion.div
                className="max-w-5xl mx-auto p-8 md:p-12 pb-24"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-between mb-12"
                >
                    <ProfileHeader
                        isEditing={isEditing}
                        onStartEdit={() => setIsEditing(true)}
                        onCancel={handleCancel}
                        onSave={handleSave}
                    />
                </motion.div>

                <motion.div
                    className="flex flex-col items-center mb-16"
                    variants={itemVariants}
                >
                    <ProfileAvatar avatar={avatar} isEditing={isEditing} />
                    <ProfileFields
                        name={name}
                        role={role}
                        isEditing={isEditing}
                        onNameChange={setName}
                        onRoleChange={setRole}
                    />
                </motion.div>

                <motion.div className="mb-16" variants={itemVariants}>
                    <ProfileSkills />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <ProfileTimeline />
                </motion.div>
            </motion.div>
        </div>
    );
};
