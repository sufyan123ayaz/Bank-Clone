import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowRight, AlertCircle, CheckCircle2, Shield } from "lucide-react";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const transferSchema = z.object({
  recipientAccount: z.string().min(10, "Account number must be at least 10 digits").max(20),
  recipientName: z.string().min(2, "Recipient name is required").max(100),
  amount: z.number().min(0.01, "Amount must be greater than 0").max(10000, "Maximum transfer amount is $10,000"),
  description: z.string().max(200).optional(),
});

export default function Transfer() {
  const [formData, setFormData] = useState({
    recipientAccount: "",
    recipientName: "",
    amount: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transferComplete, setTransferComplete] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState("");

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = transferSchema.safeParse({
      ...formData,
      amount: parseFloat(formData.amount) || 0,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Generate and show OTP
    const newOTP = generateOTP();
    setGeneratedOTP(newOTP);
    setShowOTP(true);
    toast.info(`Demo OTP: ${newOTP}`, { duration: 10000 });
  };

  const handleVerifyOTP = async () => {
    if (otp !== generatedOTP) {
      toast.error("Invalid OTP. Please try again.");
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setShowOTP(false);
    setTransferComplete(true);
    toast.success("Transfer completed successfully!");
  };

  const handleNewTransfer = () => {
    setTransferComplete(false);
    setFormData({
      recipientAccount: "",
      recipientName: "",
      amount: "",
      description: "",
    });
    setOtp("");
  };

  const formatCurrency = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "$0.00";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(num);
  };

  if (transferComplete) {
    return (
      <DashboardLayout>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-lg"
        >
          <Card className="text-center">
            <CardContent className="pt-10 pb-8">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-card-foreground">Transfer Successful!</h2>
              <p className="mb-6 text-muted-foreground">
                Your transfer of {formatCurrency(formData.amount)} to {formData.recipientName} has been processed.
              </p>
              <div className="space-y-2 rounded-lg bg-accent p-4 text-left text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">{formatCurrency(formData.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">To:</span>
                  <span className="font-medium">{formData.recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account:</span>
                  <span className="font-mono">{formData.recipientAccount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium text-success">Completed</span>
                </div>
              </div>
              <Button onClick={handleNewTransfer} className="mt-6 w-full">
                Make Another Transfer
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground">Transfer Money</h1>
          <p className="text-muted-foreground">
            Send money securely to other accounts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Secure Transfer
              </CardTitle>
              <CardDescription>
                All transfers are protected with OTP verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      placeholder="John Doe"
                      value={formData.recipientName}
                      onChange={(e) =>
                        setFormData({ ...formData, recipientName: e.target.value })
                      }
                    />
                    {errors.recipientName && (
                      <p className="flex items-center gap-1 text-sm text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        {errors.recipientName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipientAccount">Account Number</Label>
                    <Input
                      id="recipientAccount"
                      placeholder="Enter account number"
                      value={formData.recipientAccount}
                      onChange={(e) =>
                        setFormData({ ...formData, recipientAccount: e.target.value.replace(/\D/g, '') })
                      }
                    />
                    {errors.recipientAccount && (
                      <p className="flex items-center gap-1 text-sm text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        {errors.recipientAccount}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      className="pl-8"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                    />
                  </div>
                  {errors.amount && (
                    <p className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {errors.amount}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    placeholder="What's this transfer for?"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                {formData.amount && parseFloat(formData.amount) > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="rounded-lg bg-accent p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">You're sending</span>
                      <span className="text-xl font-bold text-foreground">
                        {formatCurrency(formData.amount)}
                      </span>
                    </div>
                  </motion.div>
                )}

                <Button type="submit" className="w-full gap-2" size="lg">
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* OTP Dialog */}
        <Dialog open={showOTP} onOpenChange={setShowOTP}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Verify Transfer</DialogTitle>
              <DialogDescription>
                Enter the 6-digit OTP to confirm your transfer of {formatCurrency(formData.amount)}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-6 py-4">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-center text-sm text-muted-foreground">
                Demo: Check the toast notification for your OTP
              </p>
              <Button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6 || isProcessing}
                className="w-full"
              >
                {isProcessing ? "Processing..." : "Verify & Transfer"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
