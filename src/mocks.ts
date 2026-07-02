import { FinancingContract, Boleto } from './types';

export const VEHICLE_DATABASE = [
  { model: 'Toyota Corolla Sedan XEi', price: 158590, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994d3fb?auto=format&fit=crop&q=80&w=600' },
  { model: 'Toyota Hilux CD SRV 4x4', price: 272190, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600' },
  { model: 'Toyota SW4 SRX Platinum', price: 379990, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600' },
  { model: 'Toyota Yaris Hatchback XS', price: 110290, image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=600' },
  { model: 'Toyota Corolla Cross XRE', price: 177390, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600' },
];

export const MOCK_CONTRACTS: Record<string, FinancingContract> = {
  '12345678900': {
    id: 'CTR-10948',
    contractNumber: '202488102',
    vehicleModel: 'Toyota Corolla Sedan XEi 2.0',
    vehiclePlate: 'TOY-2024',
    purchaseValue: 158590,
    totalInstallments: 48,
    paidInstallments: 20,
    remainingInstallments: 28,
    nextInstallmentValue: 3450.80,
    nextDueDate: '2026-07-15',
    interestRate: 1.45,
    outstandingBalance: 96622.40,
  },
  '98765432100': {
    id: 'CTR-20911',
    contractNumber: '202377491',
    vehicleModel: 'Toyota Hilux Double Cab SRX',
    vehiclePlate: 'HLX-4X4R',
    purchaseValue: 272190,
    totalInstallments: 60,
    paidInstallments: 45,
    remainingInstallments: 15,
    nextInstallmentValue: 5620.40,
    nextDueDate: '2026-07-10',
    interestRate: 1.39,
    outstandingBalance: 84306.00,
  },
};

export function getContractByCpf(cpfOrCnpj: string): FinancingContract {
  const sanitized = cpfOrCnpj.replace(/\D/g, '');
  if (MOCK_CONTRACTS[sanitized]) {
    return MOCK_CONTRACTS[sanitized];
  }
  
  // Dynamic generation for any typed CPF/CNPJ so the app never shows a blank/error, maintaining rich interactiveness
  const seed = sanitized.length > 0 ? parseInt(sanitized.substring(0, 4)) || 42 : 42;
  const isHilux = seed % 2 === 0;
  
  return {
    id: `CTR-${10000 + (seed % 9000)}`,
    contractNumber: `2024${seed % 100000}`,
    vehicleModel: isHilux ? 'Toyota Hilux CD SRV 4x4' : 'Toyota Corolla Sedan XEi',
    vehiclePlate: isHilux ? `HLX-${2000 + (seed % 8000)}` : `COR-${1000 + (seed % 9000)}`,
    purchaseValue: isHilux ? 272190 : 158590,
    totalInstallments: 48,
    paidInstallments: 12 + (seed % 24),
    remainingInstallments: 48 - (12 + (seed % 24)),
    nextInstallmentValue: isHilux ? 5890.00 : 3450.80,
    nextDueDate: '2026-07-20',
    interestRate: 1.42,
    outstandingBalance: isHilux ? 125000.00 + (seed % 50000) : 75000.00 + (seed % 30000),
  };
}

export function generateMockBoletos(contract: FinancingContract): Boleto[] {
  const boletos: Boleto[] = [];
  const statusList: ('PENDING' | 'PAID' | 'OVERDUE')[] = ['PAID', 'PENDING', 'PENDING'];
  
  // Overdue instalment
  boletos.push({
    id: 'BOL-9811',
    invoiceNumber: `${contract.contractNumber}-021`,
    dueDate: '2026-06-15', // Past date
    value: contract.nextInstallmentValue + 120.45, // Added fine/interest
    barcode: '03399.07104 35400.000006 10248.801014 9 93890000357125',
    status: 'OVERDUE',
    vehicleModel: contract.vehicleModel,
    referenceMonth: 'Junho/2026',
  });

  // Current upcoming instalment
  boletos.push({
    id: 'BOL-9812',
    invoiceNumber: `${contract.contractNumber}-022`,
    dueDate: contract.nextDueDate,
    value: contract.nextInstallmentValue,
    barcode: '03399.07104 35400.000006 10248.801014 9 93890000345080',
    status: 'PENDING',
    vehicleModel: contract.vehicleModel,
    referenceMonth: 'Julho/2026',
  });

  // Next month's instalment
  const [year, month, day] = contract.nextDueDate.split('-');
  const nextMonthNum = parseInt(month) === 12 ? 1 : parseInt(month) + 1;
  const nextYearNum = parseInt(month) === 12 ? parseInt(year) + 1 : parseInt(year);
  const nextDueDateStr = `${nextYearNum}-${nextMonthNum.toString().padStart(2, '0')}-${day}`;
  
  boletos.push({
    id: 'BOL-9813',
    invoiceNumber: `${contract.contractNumber}-023`,
    dueDate: nextDueDateStr,
    value: contract.nextInstallmentValue,
    barcode: '03399.07104 35400.000006 10248.801014 9 93890000345080',
    status: 'PENDING',
    vehicleModel: contract.vehicleModel,
    referenceMonth: 'Agosto/2026',
  });

  return boletos;
}
