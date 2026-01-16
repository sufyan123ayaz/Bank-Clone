import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BankCard } from "@/components/ui/BankCard";
import { StatCard } from "@/components/ui/StatCard";
import { TransactionItem, Transaction } from "@/components/ui/TransactionItem";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, TrendingUp, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

// Demo data
const demoTransactions: Transaction[] = [
  {
    id: "1",
    description: "Salary Deposit",
    amount: 5000,
    type: "credit",
    status: "success",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "2",
    description: "Electric Bill",
    amount: 125.50,
    type: "debit",
    status: "success",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "3",
    description: "Online Shopping",
    amount: 89.99,
    type: "debit",
    status: "success",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "4",
    description: "Transfer from John",
    amount: 250,
    type: "credit",
    status: "pending",
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [accountNumber] = useState("4532789012345678");
  const [balance] = useState(12459.32);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name);
      } else if (user?.email) {
        setUserName(user.email.split('@')[0]);
      }
    };
    getUserData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {userName}!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your account today.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <ArrowDownLeft className="h-4 w-4" />
              Request
            </Button>
            <Button className="gap-2" onClick={() => navigate("/transfer")}>
              <ArrowUpRight className="h-4 w-4" />
              Transfer
            </Button>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Bank card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <BankCard
              accountNumber={accountNumber}
              balance={balance}
              holderName={userName}
              className="w-full max-w-none"
            />
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <StatCard
              title="Monthly Income"
              value={formatCurrency(5250)}
              icon={TrendingUp}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Monthly Expenses"
              value={formatCurrency(2340.50)}
              icon={DollarSign}
              trend={{ value: 3, isPositive: false }}
            />
          </motion.div>
        </div>

        {/* Recent transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/history")}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {demoTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </motion.div>

        {/* Security notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-lg border border-warning/30 bg-warning/10 p-4"
        >
          <p className="text-sm text-warning-foreground">
            ⚠️ <strong>Educational Demo:</strong> This is a simulated banking interface for 
            educational and cybersecurity demonstration purposes only. No real transactions 
            or banking operations occur.
          </p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
