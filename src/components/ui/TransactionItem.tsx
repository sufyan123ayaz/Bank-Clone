import { cn } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  status: "success" | "pending" | "failed";
  date: string;
  recipient?: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  className?: string;
}

export function TransactionItem({ transaction, className }: TransactionItemProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusColors = {
    success: "bg-success/10 text-success",
    pending: "bg-warning/10 text-warning",
    failed: "bg-destructive/10 text-destructive",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border bg-card p-4",
        "transition-colors hover:bg-accent/50",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            transaction.type === "credit" ? "bg-success/10" : "bg-accent"
          )}
        >
          {transaction.type === "credit" ? (
            <ArrowDownLeft className="h-5 w-5 text-success" />
          ) : (
            <ArrowUpRight className="h-5 w-5 text-primary" />
          )}
        </div>
        <div>
          <p className="font-medium text-card-foreground">{transaction.description}</p>
          <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={cn(
            "font-semibold",
            transaction.type === "credit" ? "text-success" : "text-card-foreground"
          )}
        >
          {transaction.type === "credit" ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </p>
        <span
          className={cn(
            "inline-block rounded-full px-2 py-0.5 text-xs font-medium",
            statusColors[transaction.status]
          )}
        >
          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
        </span>
      </div>
    </div>
  );
}
