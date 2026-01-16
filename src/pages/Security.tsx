import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, Smartphone, Key, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export default function Security() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);

  const loginHistory = [
    {
      id: "1",
      device: "Chrome on Windows",
      location: "New York, US",
      time: "Just now",
      status: "current",
    },
    {
      id: "2",
      device: "Safari on iPhone",
      location: "New York, US",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: "3",
      device: "Firefox on MacOS",
      location: "Los Angeles, US",
      time: "1 day ago",
      status: "success",
    },
    {
      id: "4",
      device: "Unknown Device",
      location: "Unknown Location",
      time: "3 days ago",
      status: "blocked",
    },
  ];

  const handleToggle = (setting: string, value: boolean) => {
    toast.success(`${setting} ${value ? "enabled" : "disabled"}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground">Security Settings</h1>
          <p className="text-muted-foreground">
            Manage your account security and privacy settings
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Features
                </CardTitle>
                <CardDescription>
                  Enable additional security measures for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Smartphone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="2fa" className="text-base font-medium">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Require OTP for all transfers
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="2fa"
                    checked={twoFactorEnabled}
                    onCheckedChange={(checked) => {
                      setTwoFactorEnabled(checked);
                      handleToggle("Two-Factor Authentication", checked);
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Key className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="login-alerts" className="text-base font-medium">
                        Login Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified of new login attempts
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="login-alerts"
                    checked={loginAlerts}
                    onCheckedChange={(checked) => {
                      setLoginAlerts(checked);
                      handleToggle("Login Alerts", checked);
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="transaction-alerts" className="text-base font-medium">
                        Transaction Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified of large transactions
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="transaction-alerts"
                    checked={transactionAlerts}
                    onCheckedChange={(checked) => {
                      setTransactionAlerts(checked);
                      handleToggle("Transaction Alerts", checked);
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Password & Session */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  Password & Sessions
                </CardTitle>
                <CardDescription>
                  Manage your password and active sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border bg-accent/50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">
                        Last changed 30 days ago
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border bg-accent/50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">
                        4 devices currently logged in
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-destructive">Logout All Devices</p>
                      <p className="text-sm text-muted-foreground">
                        Sign out from all other devices
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Logout All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Login History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Login Activity
              </CardTitle>
              <CardDescription>
                Review your recent login attempts and active sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loginHistory.map((login) => (
                  <div
                    key={login.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          login.status === "blocked"
                            ? "bg-destructive/10"
                            : login.status === "current"
                            ? "bg-primary/10"
                            : "bg-success/10"
                        }`}
                      >
                        {login.status === "blocked" ? (
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                        ) : (
                          <CheckCircle2
                            className={`h-5 w-5 ${
                              login.status === "current" ? "text-primary" : "text-success"
                            }`}
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{login.device}</p>
                        <p className="text-sm text-muted-foreground">{login.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{login.time}</p>
                      <span
                        className={`text-xs font-medium ${
                          login.status === "blocked"
                            ? "text-destructive"
                            : login.status === "current"
                            ? "text-primary"
                            : "text-success"
                        }`}
                      >
                        {login.status === "current"
                          ? "Current Session"
                          : login.status === "blocked"
                          ? "Blocked"
                          : "Successful"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
