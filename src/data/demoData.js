import { generateId } from '../utils/validators.js';

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

// Helper to create date string
const createDate = (dayOffset = 0) => {
  const date = new Date(currentYear, currentMonth, today.getDate() + dayOffset);
  return date.toISOString().split('T')[0];
};

// Generate realistic demo transactions for current month
export const generateDemoTransactions = () => {
  const transactions = [];

  // Income transaction at the start of month
  transactions.push({
    id: generateId(),
    amount: 2500,
    category: 'income',
    description: 'Monthly Salary',
    date: new Date(currentYear, currentMonth, 1).toISOString().split('T')[0],
    type: 'income',
    needLevel: 'essential',
    cycle: 'fixed',
  });

  // Day 2-3: Groceries
  for (let i = 0; i < 2; i++) {
    transactions.push({
      id: generateId(),
      amount: 45 + Math.random() * 30,
      category: 'food',
      description: 'Supermarket',
      date: createDate(1 + i * 2),
      type: 'expense',
      needLevel: 'essential',
      cycle: 'variable',
    });
  }

  // Day 3: Coffee shop
  transactions.push({
    id: generateId(),
    amount: 5.5,
    category: 'food',
    description: 'Coffee Shop',
    date: createDate(2),
    type: 'expense',
    needLevel: 'optional',
    cycle: 'variable',
  });

  // Day 4: Fuel
  transactions.push({
    id: generateId(),
    amount: 60,
    category: 'transport',
    description: 'Gas Station',
    date: createDate(3),
    type: 'expense',
    needLevel: 'essential',
    cycle: 'variable',
  });

  // Day 5: Restaurant dinner
  transactions.push({
    id: generateId(),
    amount: 35,
    category: 'food',
    description: 'Restaurant Dinner',
    date: createDate(4),
    type: 'expense',
    needLevel: 'optional',
    cycle: 'variable',
  });

  // Day 6: Online shopping
  transactions.push({
    id: generateId(),
    amount: 89.99,
    category: 'shopping',
    description: 'T-shirt Online',
    date: createDate(5),
    type: 'expense',
    needLevel: 'optional',
    cycle: 'oneoff',
  });

  // Day 7: Gym membership
  transactions.push({
    id: generateId(),
    amount: 50,
    category: 'health',
    description: 'Gym Monthly',
    date: createDate(6),
    type: 'expense',
    needLevel: 'essential',
    cycle: 'fixed',
  });

  // Day 8: Movie tickets
  transactions.push({
    id: generateId(),
    amount: 28,
    category: 'entertainment',
    description: 'Cinema Tickets',
    date: createDate(7),
    type: 'expense',
    needLevel: 'optional',
    cycle: 'variable',
  });

  // Day 9: More groceries
  transactions.push({
    id: generateId(),
    amount: 52.30,
    category: 'food',
    description: 'Supermarket',
    date: createDate(8),
    type: 'expense',
    needLevel: 'essential',
    cycle: 'variable',
  });

  // Day 10: Book
  transactions.push({
    id: generateId(),
    amount: 15.99,
    category: 'education',
    description: 'Book Store',
    date: createDate(9),
    type: 'expense',
    needLevel: 'optional',
    cycle: 'oneoff',
  });

  // Day 11: Pharmacy
  transactions.push({
    id: generateId(),
    amount: 22,
    category: 'health',
    description: 'Pharmacy',
    date: createDate(10),
    type: 'expense',
    needLevel: 'essential',
    cycle: 'variable',
  });

  // Day 12: Coffee again
  transactions.push({
    id: generateId(),
    amount: 5.5,
    category: 'food',
    description: 'Coffee Shop',
    date: createDate(11),
    type: 'expense',
    needLevel: 'optional',
    cycle: 'variable',
  });

  // Day 13: Parking
  transactions.push({
    id: generateId(),
    amount: 8,
    category: 'transport',
    description: 'Parking Fee',
    date: createDate(12),
    type: 'expense',
    needLevel: 'essential',
    cycle: 'variable',
  });

  // Day 14: Streaming subscription
  transactions.push({
    id: generateId(),
    amount: 12.99,
    category: 'entertainment',
    description: 'Netflix Subscription',
    date: createDate(13),
    type: 'expense',
    needLevel: 'optional',
    cycle: 'fixed',
  });

  // Day 15: Lunch with friends
  transactions.push({
    id: generateId(),
    amount: 42,
    category: 'food',
    description: 'Lunch Restaurant',
    date: createDate(14),
    type: 'expense',
    needLevel: 'optional',
    cycle: 'variable',
  });

  // Day 16: More groceries
  transactions.push({
    id: generateId(),
    amount: 68.50,
    category: 'food',
    description: 'Supermarket',
    date: createDate(15),
    type: 'expense',
    needLevel: 'essential',
    cycle: 'variable',
  });

  // Day 17: Gas again
  transactions.push({
    id: generateId(),
    amount: 65,
    category: 'transport',
    description: 'Gas Station',
    date: createDate(16),
    type: 'expense',
    needLevel: 'essential',
    cycle: 'variable',
  });

  // Day 18: Coffee
  transactions.push({
    id: generateId(),
    amount: 6.0,
    category: 'food',
    description: 'Café Latte',
    date: createDate(17),
    type: 'expense',
    needLevel: 'optional',
    cycle: 'variable',
  });

  // Day 19: Electronics purchase
  transactions.push({
    id: generateId(),
    amount: 120,
    category: 'shopping',
    description: 'Phone Case & Cable',
    date: createDate(18),
    type: 'expense',
    needLevel: 'optional',
    cycle: 'oneoff',
  });

  // Day 20: Weekend dinner
  transactions.push({
    id: generateId(),
    amount: 55,
    category: 'food',
    description: 'Dinner Out',
    date: createDate(19),
    type: 'expense',
    needLevel: 'optional',
    cycle: 'variable',
  });

  // Day 21: More groceries
  transactions.push({
    id: generateId(),
    amount: 44.75,
    category: 'food',
    description: 'Supermarket',
    date: createDate(20),
    type: 'expense',
    needLevel: 'essential',
    cycle: 'variable',
  });

  // Day 22: Insurance payment
  transactions.push({
    id: generateId(),
    amount: 80,
    category: 'health',
    description: 'Health Insurance',
    date: createDate(21),
    type: 'expense',
    needLevel: 'essential',
    cycle: 'fixed',
  });

  // Day 23: Travel
  transactions.push({
    id: generateId(),
    amount: 150,
    category: 'travel',
    description: 'Train Ticket',
    date: createDate(22),
    type: 'expense',
    needLevel: 'optional',
    cycle: 'oneoff',
  });

  // Day 24: Emergency expense
  transactions.push({
    id: generateId(),
    amount: 200,
    category: 'transport',
    description: 'Car Repair',
    date: createDate(23),
    type: 'expense',
    needLevel: 'unexpected',
    cycle: 'oneoff',
  });

  // Day 25: Coffee
  transactions.push({
    id: generateId(),
    amount: 5.50,
    category: 'food',
    description: 'Coffee Shop',
    date: createDate(24),
    type: 'expense',
    needLevel: 'optional',
    cycle: 'variable',
  });

  // Day 26: Final groceries
  transactions.push({
    id: generateId(),
    amount: 71.20,
    category: 'food',
    description: 'Supermarket',
    date: createDate(25),
    type: 'expense',
    needLevel: 'essential',
    cycle: 'variable',
  });

  return transactions;
};

// Generate demo budget
export const generateDemoBudget = () => {
  return {
    total: 2000,
    byCategory: {
      food: 350,
      transport: 200,
      shopping: 150,
      housing: 1000,
      health: 150,
      entertainment: 100,
      travel: 50,
      education: 50,
      business: 0,
      other: 0,
    },
  };
};

// Generate demo settings
export const generateDemoSettings = () => {
  return {
    currency: 'EUR',
    theme: 'dark',
  };
};
