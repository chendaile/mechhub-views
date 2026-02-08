import React from "react";
import { motion } from "motion/react";
import { ProfileAvatar } from "./parts/ProfileAvatar";
import { ProfileFields } from "./parts/ProfileFields";
import { ProfileHeader } from "./parts/ProfileHeader";
import { ProfileSkills } from "./parts/ProfileSkills";
import { ProfileTimeline } from "./parts/ProfileTimeline";

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

export const ProfileView: React.FC<ProfileViewProps> = ({
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
}) => {
    return (
        <div className="flex-1 h-full overflow-y-auto bg-slate-50/50">
            <motion.div
                className="max-w-5xl mx-auto p-8 md:p-12 pb-24"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
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

                <motion.div variants={itemVariants}>
                    <ProfileSkills />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <ProfileTimeline />
                </motion.div>
            </motion.div>
        </div>
    );
};
