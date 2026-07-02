export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface FinancingContract {
  id: string;
  contractNumber: string;
  vehicleModel: string;
  vehiclePlate: string;
  purchaseValue: number;
  totalInstallments: number;
  paidInstallments: number;
  remainingInstallments: number;
  nextInstallmentValue: number;
  nextDueDate: string;
  interestRate: number;
  outstandingBalance: number;
}

export interface Boleto {
  id: string;
  invoiceNumber: string;
  dueDate: string;
  value: number;
  barcode: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE';
  vehicleModel: string;
  referenceMonth: string;
}

export interface NegotiationOption {
  installments: number;
  discountPercentage: number;
  installmentValue: number;
  totalAmount: number;
  entryValue: number;
}

export interface SimulationResult {
  vehicleModel: string;
  price: number;
  downPayment: number;
  installments: number;
  monthlyPayment: number;
  interestRate: number;
}
