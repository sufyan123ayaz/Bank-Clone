import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TransactionItem, Transaction } from "@/components/ui/TransactionItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Download, Filter } from "lucide-react";
import { motion } from "framer-motion";

// Demo transaction data
const allTransactions: Transaction[] = [
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
    description: "Electric Bill Payment",
    amount: 125.50,
    type: "debit",
    status: "success",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "3",
    description: "Online Shopping - Amazon",
    amount: 89.99,
    type: "debit",
    status: "success",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "4",
    description: "Transfer from John Smith",
    amount: 250,
    type: "credit",
    status: "success",
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: "5",
    description: "Grocery Store",
    amount: 67.23,
    type: "debit",
    status: "success",
    date: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
  },
  {
    id: "6",
    description: "Netflix Subscription",
    amount: 15.99,
    type: "debit",
    status: "success",
    date: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
  },
  {
    id: "7",
    description: "Transfer to Jane Doe",
    amount: 500,
    type: "debit",
    status: "pending",
    date: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(),
  },
  {
    id: "8",
    description: "Interest Payment",
    amount: 12.50,
    type: "credit",
    status: "success",
    date: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(),
  },
  {
    id: "9",
    description: "Failed Transfer",
    amount: 1000,
    type: "debit",
    status: "failed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 192).toISOString(),
  },
  {
    id: "10",
    description: "Freelance Payment",
    amount: 850,
    type: "credit",
    status: "success",
    date: new Date(Date.now() - 1000 * 60 * 60 * 216).toISOString(),
  },
];

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalIncome = allTransactions
    .filter((t) => t.type === "credit" && t.status === "success")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = allTransactions
    .filter((t) => t.type === "debit" && t.status === "success")
    .reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">Transaction History</h1>
            <p className="text-muted-foreground">
              View and manage all your past transactions
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-success">{formatCurrency(totalIncome)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(totalExpenses)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Net Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(totalIncome - totalExpenses)}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Income</SelectItem>
                <SelectItem value="debit">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Transaction list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <TransactionItem transaction={transaction} />
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border bg-card py-12">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
