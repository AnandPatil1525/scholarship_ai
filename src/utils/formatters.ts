/**
 * Formats a number to Indian currency format (e.g. ₹2,50,000 or ₹2.5 Lakhs)
 */
export function formatIndianCurrency(amount: number | null, compact = false): string {
  if (amount === null || amount === undefined) {
    return 'No limit / As per norms';
  }

  if (compact) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1).replace(/\.0$/, '')} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1).replace(/\.0$/, '')} L`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}k`;
    }
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Formats date into readable Indian format: "28 Nov 2026"
 */
export function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Rolling / Check Portal';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

/**
 * Computes remaining calendar days until deadline
 */
export function getDaysRemaining(dateStr: string | null): number | null {
  if (!dateStr) return null;
  try {
    const deadline = new Date(dateStr);
    const today = new Date();
    // normalize to midnight
    deadline.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = deadline.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch {
    return null;
  }
}
