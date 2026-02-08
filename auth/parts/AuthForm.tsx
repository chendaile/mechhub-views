import type { FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Button } from "../../shared/ui/button";
import { Input } from "../../shared/ui/input";
import { ICON_SIZE } from "../../shared/ui-constants";
import { cn } from "../../shared/utils";
import type { AuthMode } from "../types";
import { AuthSocialButtons } from "./AuthSocialButtons";
import { AuthToggle } from "./AuthToggle";

interface AuthFormProps {
    mode: AuthMode;
    setMode: (mode: AuthMode) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    isLoading: boolean;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    onSubmit: (e: FormEvent) => void;
    onSocialLogin: (provider: "google" | "github") => void;
}

export const AuthForm = ({
    mode,
    setMode,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    showPassword,
    setShowPassword,
    onSubmit,
    onSocialLogin,
}: AuthFormProps) => {
    return (
        <>
            <AuthToggle mode={mode} setMode={setMode} />

            <form onSubmit={onSubmit}>
                <div>
                    <label className="block text-xs font-bold text-text-subtle uppercase tracking-wider mb-2 ml-1">
                        邮箱地址
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint">
                            <Mail size={ICON_SIZE.lg} />
                        </div>
                        <Input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="student@university.edu"
                            className="pl-11 pr-4"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2 ml-1 min-h-6">
                        <label className="block text-xs font-bold text-text-subtle uppercase tracking-wider">
                            密码
                        </label>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            tabIndex={mode === "signin" ? 0 : -1}
                            aria-hidden={mode !== "signin"}
                            className={cn(
                                "text-xs font-semibold text-text-primary hover:underline",
                                mode === "signin"
                                    ? "visible"
                                    : "invisible pointer-events-none",
                            )}
                        >
                            忘记密码？
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint">
                            <Lock size={ICON_SIZE.lg} />
                        </div>
                        <Input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="pl-11 pr-10"
                        />
                        <Button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            variant="ghost"
                            size="sm"
                            className="absolute right-4 top-1/2 -translate-y-1/2 px-0 py-0 text-text-faint hover:text-text-muted"
                        >
                            {showPassword ? (
                                <Eye size={ICON_SIZE.md} />
                            ) : (
                                <EyeOff size={ICON_SIZE.md} />
                            )}
                        </Button>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    size="md"
                    className="w-full mt-8"
                >
                    {isLoading ? (
                        <Loader2 size={ICON_SIZE.xl} className="animate-spin" />
                    ) : (
                        <>
                            {mode === "signin" ? "登录" : "创建账户"}
                            <ArrowRight size={ICON_SIZE.lg} />
                        </>
                    )}
                </Button>
            </form>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border-subtle"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-surface px-2 text-text-subtle">
                        或通过以下方式继续
                    </span>
                </div>
            </div>

            <AuthSocialButtons onSocialLogin={onSocialLogin} />
        </>
    );
};
