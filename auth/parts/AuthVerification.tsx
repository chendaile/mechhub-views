import { Mail } from "lucide-react";
import { Button } from "../../shared/ui/button";

interface AuthVerificationProps {
    email: string;
    onBackToSignIn: () => void;
    onResend: () => void;
}

export const AuthVerification = ({
    email,
    onBackToSignIn,
    onResend,
}: AuthVerificationProps) => {
    return (
        <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-16 h-16 bg-success-bg rounded-pill flex items-center justify-center mb-6">
                <Mail className="text-success w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">
                请验证您的邮箱
            </h3>
            <p className="text-text-muted mb-8">
                我们已向{" "}
                <span className="font-semibold text-text-primary">
                    {email}
                </span>{" "}
                发送了一封验证邮件。
                <br />
                请点击邮件中的链接以激活您的账户。
            </p>
            <Button
                onClick={onBackToSignIn}
                variant="ghost"
                size="sm"
                className="text-ink border-b-2 border-ink hover:border-transparent pb-0.5"
            >
                返回登录
            </Button>
            <Button
                onClick={onResend}
                variant="ghost"
                size="sm"
                className="mt-4 text-xs text-text-faint hover:text-text-muted"
            >
                重新发送 (开发中)
            </Button>
        </div>
    );
};
