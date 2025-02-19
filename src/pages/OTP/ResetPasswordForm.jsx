import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/api/userApi";
import toast from "react-hot-toast";

export function ResetPasswordForm({ email, generatedOtp, onClose, onRegenerateOTP }) {
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otpError, setOtpError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const handleVerifyOTP = () => {
        if (otp !== generatedOtp) {
            setOtpError(true);
            toast.error("Invalid OTP");
            return;
        }
        setOtpError(false);
        setOtpVerified(true);
        toast.success("OTP Verified!");
    };

    const handleResetPassword = async () => {
        if (!otpVerified) {
            toast.error("Please verify OTP first.");
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        if (newPassword !== confirmPassword) {
            setConfirmPasswordError(true);
            return;
        } else {
            setConfirmPasswordError(false);
        }

        try {
            await resetPassword(email, newPassword);
            toast.success("Password reset successfully!");
            onClose(); // Close the dialog after successful password reset
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="grid gap-2">
            {!otpVerified ? (
                <>
                    <Label htmlFor="otp">OTP</Label>
                    <Input
                        id="otp"
                        type="text"
                        placeholder="123456"
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    {otpError && (
                        <div className="text-red-500 text-sm">Please enter correct OTP</div>
                    )}
                    <Button onClick={handleVerifyOTP}>Verify OTP</Button>
                    <Button variant="secondary" onClick={onRegenerateOTP}>
                        Regenerate OTP
                    </Button>
                </>
            ) : (
                <>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                        id="newPassword"
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {passwordError && (
                        <div className="text-red-500 text-sm">
                            Password must be at least 6 characters
                        </div>
                    )}
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPasswordError && (
                        <div className="text-red-500 text-sm">Passwords must match</div>
                    )}
                    <Button onClick={handleResetPassword}>Reset Password</Button>
                </>
            )}
        </div>
    );
}
