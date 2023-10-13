const onClickDeleteButton = () => {
    processMailData('delete', '');
  }

  const operationMove = (emailsToBeMovedArray, moveTo) => {
    if (allMailData[emailCategory] !== undefined && allMailData[emailCategory].length > 0) {
      let data = allMailData[emailCategory];
      let moveDataArray = [];
      let remDataFromCategory = [];
      for (let i = 0; i < emailsToBeMovedArray.length; i++) {
        const emailToRemove = emailsToBeMovedArray[i];
        moveDataArray = moveDataArray.concat(data.filter((ele) => { return ele.email === emailToRemove }));
        remDataFromCategory = remDataFromCategory.concat(data.filter((ele) => { return ele.email !== emailToRemove }));
      }
      const tempObject = { ...allMailData };
      tempObject[moveTo] = tempObject[moveTo].concat(moveDataArray);
      tempObject[emailCategory] = remDataFromCategory;
      setShowOptions(false);
      setCheckObject({});
      setAllMailData(tempObject);
    }
  }

  const operationChangeTag = (emailsToBeMovedArray, moveTo) => {
    if (allMailData[emailCategory] !== undefined && allMailData[emailCategory].length > 0) {
      let data = allMailData[emailCategory];
      const emailTagToBeChangedSet = new Set(emailsToBeMovedArray);
      data.forEach((ele) => { 
        const existingTagSet = new Set(ele.mail.type);
        if (emailTagToBeChangedSet.has(ele.email) && !existingTagSet.has(moveTo)) {
          ele.mail.type.push(moveTo.toLowerCase());
        }
      });
      const tempObject = { ...allMailData };
      tempObject[emailCategory] = data;
      setShowOptions(false);
      setCheckObject({});
      setAllMailData(tempObject);
    }
  }

  const operationDelete = (emailsToBeRemovedArray) => {
    if (allMailData[emailCategory] !== undefined && allMailData[emailCategory].length > 0) {
      let data = allMailData[emailCategory];
      let currentItemToDisplay = -1;
      for (let i = 0; i < emailsToBeRemovedArray.length; i++){
        const emailToRemove = emailsToBeRemovedArray[i];
        for (let j = 0; j < data.length; j++){
          if (data[j].email === emailToRemove) {
            currentItemToDisplay = j;
            data.splice(j, 1);
          }
        }
      }
      const tempObject = { ...allMailData };
      tempObject[emailCategory] = data;
      setShowOptions(false);
      setCheckObject({});
      setAllMailData(tempObject);
      if (currentItemToDisplay !== -1) {
        const categoryLen = allMailData[emailCategory].length;
        if (currentItemToDisplay >= categoryLen) {
          currentItemToDisplay -= 1;
        }
      }
      getNextAndPrevMessageContents(currentItemToDisplay);
    }

  }

  const processMailData = (operationType, moveTo, checkObjectParam = null) => {
    const emailCategoryArray = ['inbox', 'sent', 'draft', 'starred', 'spam', 'trash'];
    if (emailCategoryArray.includes(emailCategory)) {
      let trueCount = 0;
      const emailsToBeRemovedArray = [];
      if (checkObjectParam !== null) {
        for (let [key, value] of Object.entries(checkObjectParam)) {
          if (value === true) {
            trueCount++;
            emailsToBeRemovedArray.push(key);
          }
        }
      } else {
        for (let [key, value] of Object.entries(checkObject)) {
          if (value === true) {
            trueCount++;
            emailsToBeRemovedArray.push(key);
          }
        }
      }
      
      if (trueCount > 0) {
        if (operationType === 'move') {
          operationMove(emailsToBeRemovedArray, moveTo);
        } else if (operationType === 'changetag') {
          operationChangeTag(emailsToBeRemovedArray, moveTo);
        } else {
          operationDelete(emailsToBeRemovedArray);
        }
      }
    }
  }

  const getNextAndPrevMessageContents = (index, displayContents = false) => {
    const arrLen = allMailData[emailCategory].length;
    if (allMailData[emailCategory] !== undefined && arrLen > 0 && index >= 0 && index < arrLen) {
      const ele = allMailData[emailCategory][index];
      const hasNext = index + 1 < arrLen;
      const hasPrev = index - 1 >= 0;
      setSelectedItemData({ ...ele, index: index, hasNext, hasPrev });
      if(displayContents) setSlideValue(true);
    } else if (arrLen === 0 && slideValue) {
      setSlideValue(false);
    }
  }

  const processAndSetEmailContents = (props) => {
    const { index, ele } = props;
    const arrLen = allMailData[emailCategory].length;
    let hasNext = false;
    let hasPrev = false;
    if (allMailData[emailCategory] !== undefined && arrLen > 0) {
      hasNext = index + 1 < arrLen;
      hasPrev = index - 1 >= 0;
    }

    if (showOptions) {
      setCheckObject({}); 
      setShowOptions(false);
    }
    setSelectedItemData({ ...ele, index: index, hasNext, hasPrev });
    setSlideValue(true);
  }

  const processMailCategoryTag = (tag) => {
      setEMailCategory(tag);
      getCategoryEmails(tag);
    // if (!_.has(allMailData, tag)) {
    //   setEMailCategory(tag);
    //   getCategoryEmails(tag);
    // } else {
    //   setEMailCategory(tag);
    // }
  }


  export const dataObject = {
    inbox: [
      {
        title: 'Louetta Esses',
        email: 'louettae@mail.com',
        mail: {
          timeStamp: '1660817369000',
          type: ['important'],
          subject: 'Update Can Change Your Personal Life Important',
          message: `Hi John,\n \n
            5 Biggest Ways in Which the Latest iOS Update Can Change Your Personal Life \n
            1.Group FaceTime \n
            2. Memoji & Animoji \n
            3. Person to Person Payments \n
            4. Screen Time \n
            5. Shortcuts App on Macs \n
            Regrads, \n   \n
            Louetta Esses`
        },
      },
      {
        title: 'Waldemar Mannering',
        email: 'wmannering3@mozilla.org',
        mail: {
          timeStamp: '1660903769000',
          type: ['private'],
          subject: 'App Update',
          message: 'Hello John, \n We have released the update 8.6.1 for the app Update your application.\n' +
            'Don’t miss our new Feature \n Regards \n Eb Begg',
        },
      },
      {
        title: 'Eb Begg',
        email: 'ebegg9@wikia.com',
        mail: {
          timeStamp: '1660990169000',
          type: ['company'],
          subject: 'App Update',
          message: 'Hello John, \n We have released the update 8.6.1 for the app' +
            'Update your application. Don’t miss our new Feature \n Regards \n Eb Begg,',
        },
      },
      {
        title: 'Modestine Spat',
        email: 'mspata@sina.com.cn',
        mail: {
          timeStamp: '1661076569000',
          type: ['company'],
          subject: 'Password Reset',
          message: 'Hey John,\n' +
            'I just wanted to let you know that your password has been changed. You can safely ignore this email if you requested this change.\n' +
            'Otherwise, please do let us know and we will be here to help. \n Regards \n Modestine Spat,',
        },
      },
      {
        title: 'Ardis Balderson',
        email: 'abaldersong@utexas.edu',
        mail: {
          timeStamp: '1661162969000',
          type: ['company'],
          subject: 'Bank transfer initiated.',
          message: 'Hey John,\n' +
            'Bank transfers initiated before 7 PM ET on business days will typically be available in your bank account the next business day. Business days are Mon-Fri, excluding bank holidays.\n' +
            'Transfers are reviewed which may result in delays or funds being frozen or removed from your account. Learn more\n' +
            'Regards \n Ardis Balderson,',
        },
      },
      {
        title: 'Dalila Ouldcott',
        email: 'douldcottj@yellowpages.com',
        mail: {
          timeStamp: '1661249369000',
          type: ['personal'],
          subject: 'Order Feedback',
          message: 'Hey John,\n What did you think o your recent purchase?' +
            "We'd love to hear your feedback on your recent order. Please share your experience in a review to help other pet parents just like you.\n" +
            "Regards \n Dalila Ouldcott,",
        },
      },
      {
        title: 'Lockwood Kubicek',
        email: 'lkubicek0@cdbaby.com',
        mail: {
          timeStamp: '1661335769000',
          type: ['private'],
          subject: 'Finally Start Running',
          message: `Hey John, \n How TO Finally Start Running
            Order an individual training and nutrition program from our specialists! Only now there is a 20% discount! \n
            Regards \n Lockwood Kubicek`,
        },
      },
      {
        title: 'Milena Osgarby',
        email: 'mosgarby1@accuweather.com',
        mail: {
          timeStamp: '1661422169000',
          type: ['important'],
          subject: 'Eco Food',
          message: `Hey John, \n` +
            `Hey! We replenish our assortment with healthy eco food. On this occasion, we really want to play the same game with you! Can you guess what category of new products we are adding?🍯🍓🍵\n`+
            `Test your intuition, answer the letter!🔮 All members will receive a discount 20% on purchases in the next email!💌\n`+
            `Regards \n \nMilena Osgarby`,
        },
      },
      {
        title: 'Pheoebe Buffay',
        email: 'pBuffay@email.com',
        mail: {
          timeStamp: '1661508569000',
          type: ['personal'],
          subject: 'Personal Insurance',
          message: `Hey John,\n Your personal insurance agent` +
            `If you have any problems with questions about your insurance, you can contact your personal agent.\n` +
            `Regards \n Pheoebe Buffay`,
        },
      },
      {
        title: 'Gabriel Abramow',
        email: 'gabramow2@elegantthemes.com',
        mail: {
          timeStamp: '1661594969000',
          type: ['company'],
          subject: 'Forgot your password?',
          message: `Hey John,\n` +
            `There was a request to change your password! \n` +
            `If did not make this request, just ignore this email. Otherwise, please click the button below to change your password:\n`+
            `Regards \n Gabriel Abramow`,
        },
      },
      {
        title: 'Temple Olrenshaw',
        email: 'tolrenshaw3@twitpic.com',
        mail: {
          timeStamp: '1661681369000',
          type: ['company'],
          subject: 'April Fools Day Movies',
          message: `Hey John, \n The Best Movies on April Fool’s Day `+
           `Finding any genuine April Fool’s moments in movies is kind of like trying to peek through a wheat field to find individual stalks, but at the very least there are a few movies that seem to have the spirit of April Fool’s Day down when it comes to their sense of humor.\n` + 
           `So instead of finding individual scenes about the day in question it seems like more fun to go ahead and treat the reader to a few films that might be great to watch this coming Sunday when the day of fools is upon us. \n` +
            `Regards \n Temple Olrenshaw`,
        },
      }
    ],
    sent: [
      {
        title: 'Eugenie Finessy',
        email: 'efinessy7@sbwire.com',
        mail: {
          timeStamp: '1661681369000',
          type: ['personal'],
          subject: "BOOK LOVER'S DAY",
          message: `Hello John, \n` +
            `Whenever you read a good book, you are making efforts to open a new door to let more light come in. \n` +
            `May you are blessed with more and more books. Happy National Book Lover’s Day to you. \n` +
            `Regards \n Eugenie Finessy`,
        }
      },
      {
        title: 'Chase Prando',
        email: 'cprandob@rambler.ru',
        mail: {
          timeStamp: '1661681369000',
          type: ['company'],
          subject: "Course Update",
          message: `Hey John, \n You have completed more than 68% of the course \n` + 
            `We noticed that you have not attended or advanced the course for over a week. \n` +
            `It is very important for us that you finish your studies, as regular classes are a guarantee of knowledge and successful completion! \n` +
            `For help, we have allocated a free opportunity to contact the course teacher within 2 days \n` + 
            `Regards \n Chase Prando`,
        }
      }
    ],
    draft: [
      {
        title: 'Shawn Wilby',
        email: 'swilby2@yandex.ru',
        mail: {
          timeStamp: '1661681369000',
          type: ['company'],
          subject: "Delivery Note",
          message: `Hello John, \n Shipping Details: \n Order Number: 82080 \n Delivered-to: John Doe` + 
            `Email: johndoe@altervista.org \n Address: 99 El ABCD San Francisco, CA. United States \n` +
            `Thank You for being with Us! \n Regards \n Shawn Wilby`,
        }
      }
    ],
    starred: [],
    spam: [
      {
        title: 'Hettie Mcerlean',
        email: 'hettiem@mail.com',
        mail: {
          timeStamp: '1661681369000',
          type: ['company'],
          subject: "Your order has been delivered",
          message: `Hello John, \n Your order has just been delivered. Here is the delivery confirmation number: #569443 \n` +
            `Regrads \n If you have any questions, please feel free to reach out to our customer service team at customerService@email.com \n Hettie Mcerlean`,
        }
      }
    ],
    trash: [
      {
        title: 'Heath Frostdyke',
        email: 'hfrostdyke4@scientificamerican.com',
        mail: {
        timeStamp: '1661681369000',
        type: ['personal'],
        subject: "Good Hair Day!",
        message: `Hello John, \n` + 
          `Good Hair Day is all about recognizing the significance a good hair day can have on your confidence, self-esteem, and overall happiness. A good hair day is different for everyone and this year we want to help you achieve your best hair!\n`+
          `Book with our stylist today to get 10% discount. \n Regards \n Heath Frostdyke`,
        }
      }
    ]
  }