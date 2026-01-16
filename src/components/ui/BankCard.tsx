import { cn } from "@/lib/utils";

interface BankCardProps {
  accountNumber: string;
  balance: number;
  holderName: string;
  className?: string;
}

export function BankCard({ accountNumber, balance, holderName, className }: BankCardProps) {
  const formatAccountNumber = (num: string) => {
    return num.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 bank-gradient text-primary-foreground",
        "min-h-[200px] w-full max-w-md",
        "bank-card-shadow-lg",
        className
      )}
    >
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-foreground/10" />
      <div className="absolute -right-4 top-16 h-24 w-24 rounded-full bg-primary-foreground/5" />
      
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm opacity-80">Current Balance</p>
            <p className="mt-1 text-3xl font-bold tracking-tight">
              {formatCurrency(balance)}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15v3a.75.75 0 01-.75.75h-4.5A.75.75 0 019 12V9H5.25z" />
            </svg>
          </div>
        </div>

        <div className="mt-8">
          <p className="font-mono text-lg tracking-widest">
            {formatAccountNumber(accountNumber)}
          </p>
          <p className="mt-2 text-sm font-medium uppercase tracking-wide opacity-80">
            {holderName}
          </p>
        </div>
      </div>
    </div>
  );
}
