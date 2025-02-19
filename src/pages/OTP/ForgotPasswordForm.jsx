import { useState, useRef, useEffect } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { getUserByEmail } from "@/api/userApi";

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export function ForgotPasswordForm({ onClose }) {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpGenerated, setOtpGenerated] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailNotFound, setEmailNotFound] = useState(false); // New state

    const handleGenerateOTP = async () => {
        if (!email) {
            setEmailError(true);
            return;
        }
        setEmailError(false);

        try {
            // Check if the email exists in the database
            const user = await getUserByEmail(email);
            console.log("u",user);
            if (!user) {
                setEmailNotFound(true); // Set emailNotFound state to true
                return;
            }
            setEmailNotFound(false); // Reset emailNotFound state if email is found

            const newOtp = generateOTP();
            setOtp(newOtp);
            setOtpGenerated(true);
            toast.success(`OTP generated: ${newOtp}. Please check the console.`, {
                duration: 10000,
            });
            console.log("Generated OTP:", newOtp); // Display in console (for development)
        } catch (error) {
            console.error("Error checking email:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleRegenerateOTP = () => {
        handleGenerateOTP();
    };

    return (
        <>
            {!otpGenerated ? (
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="example@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                        <div className="text-red-500 text-sm">Please enter your email</div>
                    )}
                    {emailNotFound && (
                        <div className="text-red-500 text-sm">
                            Email not found. Please check your email address.
                        </div>
                    )}
                    <Button onClick={handleGenerateOTP}>Generate OTP</Button>
                </div>
            ) : (
                <ResetPasswordForm
                    email={email}
                    generatedOtp={otp}
                    onClose={onClose}
                    onRegenerateOTP={handleRegenerateOTP}
                />
            )}
        </>
    );
}
