import { writeJSON } from './storage';

const LAST_ORDER_KEY = 'cuppacart_last_order';

const makeOrderId = () => {
  const day = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RR-${day}-${suffix}`;
};

export const submitOrder = ({ items, amount, method }) =>
  new Promise(resolve => {
    window.setTimeout(() => {
      const order = {
        id: makeOrderId(),
        items: items.map(item => ({ ...item })),
        amount,
        method,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      };
      writeJSON(LAST_ORDER_KEY, order);
      resolve(order);
    }, 650);
  });
