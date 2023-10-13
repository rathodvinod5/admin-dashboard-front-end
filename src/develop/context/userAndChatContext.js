import React from 'react';

export const userAndChatHistoryObject = {
  users: [
    {
        id: 1001, title: 'Felicia Rower', des: 'Town Planner', isActive: true,
        email: 'felecia_rower@email.com',
        contact: '+1(123) 456 - 7890',
        timeline: 'Mon - Fri 10AM - 8PM',
        subTitle: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
    },
    {
        id: 1002, title: 'Adelberto Granzin', des: 'Data Scientist', isActive: false,
        email: 'felecia_rower@email.com',
        contact: '+1(123) 456 - 7890',
        timeline: 'Mon - Fri 10AM - 8PM',
        subTitle: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
    }
  ],
  contacts: [
    { 
        id: 2001, 
        title: 'Joaquina Weisenborn', 
        subTitle: 'Soufflé soufflé caramels sweet roll. Jelly lollipop sesame snaps bear claw jelly beans sugar plum sugar plum.', 
        des: 'Town Planner',
        isActive: true,
        email: 'felecia_rower@email.com',
        contact: '+1(123) 456 - 7890',
        timeline: 'Mon - Fri 10AM - 8PM', 
    },
    { 
        id: 2002, 
        title: 'Verla Morgano', 
        subTitle: 'Chupa chups candy canes chocolate bar marshmallow liquorice muffin. Lemon drops oat cake tart liquorice tart cookie. Jelly-o cookie tootsie roll halvah.',
        des: 'Data Scientist',
        isActive: true,
        email: 'felecia_rower@email.com',
        contact: '+1(123) 456 - 7890',
        timeline: 'Mon - Fri 10AM - 8PM',
    },
    { 
        id: 2003, 
        title: 'Margot Henschke', 
        subTitle: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
        des: 'Dietitian',
        isActive: false,
        email: 'felecia_rower@email.com',
        contact: '+1(123) 456 - 7890',
        timeline: 'Mon - Fri 10AM - 8PM',
    },
    { 
        id: 2004, 
        title: 'Sal Piggee', 
        subTitle: 'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
        des: 'Marketing executive',
        isActive: true, 
        email: 'felecia_rower@email.com',
        contact: '+1(123) 456 - 7890',
        timeline: 'Mon - Fri 10AM - 8PM',
    },
    { 
        id: 2005, 
        title: 'Miguel Guelff', 
        subTitle: 'Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.',
        des: 'Special Education Teacher',
        isActive: false,
        email: 'felecia_rower@email.com',
        contact: '+1(123) 456 - 7890',
        timeline: 'Mon - Fri 10AM - 8PM',
    },
    { 
        id: 2006, 
        title: 'Sal Piggee', 
        subTitle: 'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
        des: 'Marketing executive',
        isActive: true,
        email: 'felecia_rower@email.com',
        contact: '+1(123) 456 - 7890',
        timeline: 'Mon - Fri 10AM - 8PM',
    },
    { 
        id: 2007, 
        title: 'Miguel Guelff', 
        subTitle: 'Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.',
        des: 'Special Education Teacher',
        isActive: true,
        email: 'felecia_rower@email.com',
        contact: '+1(123) 456 - 7890',
        timeline: 'Mon - Fri 10AM - 8PM',
    }
  ],
  chatHistory: {
    1001: [
        { 
            byMe: true, 
            message: ["How can we help? We're here for you!"], 
            time: new Date(), 
            status: 2 // 0 -> sent, 1 -> delivered, 2 -> seen
        },
        { 
            byMe: false, 
            message: ["Hey John, I am looking for the best admin template. Could you please help me to find it out?"], 
            time: new Date(), 
            status: -1
        },
        { 
            byMe: false, 
            message: ["It should be MUI v5 compatible.", 'how can I help You?'], 
            time: new Date(), 
            status: -1 
        },
        { 
            byMe: true, 
            message: ["Absolutely"], 
            time: new Date(), 
            status: 0
        },
        { 
            byMe: true, 
            message: ["This admin template is built with MUI!"], 
            time: new Date(), 
            status: 2
        },
        { 
            byMe: false, 
            message: ["Looks clean and fresh UI. 😍", 'How can I help You?'], 
            time: new Date(), 
            status: -1
        },
        { 
            byMe: false, 
            message: ["It's perfect for my next project.", 'How can I help You?'], 
            time: new Date(), 
            status: -1
        },
        { 
            byMe: true, 
            message: ["Thanks, From our official site 😇"], 
            time: new Date(), 
            status: 2
        },
        { 
            byMe: false, 
            message: ["I will purchase it for sure. 👍"], 
            time: new Date(), 
            status: -1
        },
    ],
    1002: [
        { 
            byMe: true, 
            message: ["Hi"], 
            time: new Date(), 
            status: 2
        },
        { 
            byMe: false, 
            message: ["Hello. How can I help You?", "Hello", "How can I help You?"], 
            time: new Date(), 
            status: -1 
        },
        { 
            byMe: true, 
            message: ["Can I get details of my last transaction I made last month? 🤔"], 
            time: new Date(), 
            status: 2
        },
        { 
            byMe: false, 
            message: ["We need to check if we can provide you such information.", 'How can I help You?'], 
            time: new Date(), 
            status: -1 
        },
        { 
            byMe: false, 
            message: ["I will inform you as I get update on this.", 'How can I help You?'], 
            time: new Date(), 
            status: -1 
        },
        { 
            byMe: true, 
            message: ["If it takes long you can mail me at my mail address."], 
            time: new Date(), 
            status: 1
        },
    ]
  }
}

const UserAndChatHistoryContext = React.createContext();
export default UserAndChatHistoryContext;