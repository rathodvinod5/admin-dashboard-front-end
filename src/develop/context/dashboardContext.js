import React from 'react';

export const dataObject = {
  user: 'admin',
  date: new Date(),
  greetingsCard: {
    totalSales: '$42.8k',
    salesMonth: 'July',
  },
  statistics: {
    stats: [
      { title: 'Sales', amount: '245k' },
      { title: 'Customers', amount: '12.5k' },
      { title: 'Products', amount: '1.54k' },
      { title: 'Revenue', amount: '$88k' }
    ]
  },
  ui: {
    selectedColor: 'green',
  }
}

const GlobalDataContext = React.createContext();
export default GlobalDataContext;