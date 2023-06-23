const chatBody = document.querySelector(".chat-body");
const txtInput = document.querySelector("#txtInput");
const send = document.querySelector(".send");

send.addEventListener("click", () => renderUserMessage());

txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    renderUserMessage();
  }
});

const renderUserMessage = () => {
  const userInput = txtInput.value;
  renderMessageEle(userInput, "user");
  txtInput.value = "";
  setTimeout(() => {
    renderChatbotResponse(userInput);
    setScrollPosition();
  }, 600);
};

const renderChatbotResponse = (userInput) => {
  const res = getChatbotResponse(userInput);
  renderMessageEle(res);
};

const renderMessageEle = (txt, type) => {
  let className = "user-message";
  if (type !== "user") {
    className = "chatbot-message";
  }
  const messageEle = document.createElement("div");
  const txtNode = document.createTextNode(txt);
  messageEle.classList.add(className);
  messageEle.append(txtNode);
  chatBody.append(messageEle);
};

const getChatbotResponse = (userInput) => {
  const keyword = userInput.toLowerCase();
  
  const responses = {
    hello: "Hey! How are you doing?",
    how: "I am good! How can I help you?",
    home: "Our homepage can be found <a href='https://example.com'>here</a>.",
    trial: "Our trial balance can be found <a href='https://example.com'>here</a>.",
    balance: "You can access our balance sheet <a href='https://example.com'>here</a>.",
    stock: "To view stock graphs, please visit our <a href='https://example.com'>Stock Graphs</a> page.",
    open: "Information about opening a new account can be found <a href='https://example.com'>here</a>.",
    loan: "To apply for a loan, please visit our <a href='https://example.com'>Loan Application</a> page.",
    fees: "You can find detailed information about our account fees <a href='https://example.com'>here</a>.",
    customer: "For customer service assistance, you can reach us at <a href='tel:+1234567890'>+1234567890</a>.",
    online: "To set up online banking, please follow the instructions <a href='https://example.com'>here</a>.",
    investment: "Explore our investment options <a href='https://example.com'>here</a>.",
    mortgage: "Learn about our mortgage process <a href='https://example.com'>here</a>.",
    worth: "To calculate your net worth, you can use our <a href='https://example.com'>Net Worth Calculator</a>.",
    retirement: "Information about different types of retirement accounts can be found <a href='https://example.com'>here</a>.",
    tax: "To understand the tax implications of investing, please consult with a tax professional.",
    thank: "My pleasure, please ask me anything!",
    contact: "You can contact our support team <a href='https://example.com/contact'>here</a>.",
    forgot: "If you forgot your password, you can reset it <a href='https://example.com/password-reset'>here</a>.",
    security: "We prioritize the security of your account. Learn more <a href='https://example.com/security'>here</a>.",
    privacy: "Your privacy is important to us. Read our privacy policy <a href='https://example.com/privacy'>here</a>.",
    transaction: "If you have questions about a specific transaction, please provide the transaction details.",
    statement: "You can access your account statements online or request physical copies by contacting our support team.",
    credit: "To apply for a credit card, please visit our <a href='https://example.com/credit-card'>credit card page</a>.",
    debit: "Our debit cards offer convenient and secure payment options. Learn more <a href='https://example.com/debit-card'>here</a>.",
    insurance: "Explore our insurance products and coverage options <a href='https://example.com/insurance'>here</a>.",
    fraud: "If you suspect any fraudulent activity on your account, please contact our support team immediately.",
    greetings: "Welcome to our customer support! How can I assist you today?",
    account: "For account-related inquiries, please provide your account number and a brief description of your issue.",
    payment: "If you need assistance with payments, please provide the payment details and any relevant transaction IDs.",
    onlineBanking: "Our online banking platform offers convenient access to your accounts 24/7. Learn more <a href='https://example.com/online-banking'>here</a>.",
    transfer: "To transfer funds between accounts, please log in to your online banking account or visit our nearest branch.",
    card: "If you have questions about your debit or credit card, such as activation or replacement, please let us know.",
    interestRates: "Our current interest rates for savings and loans can be found on our website's rates page.",
    foreignExchange: "For foreign exchange services, please visit our nearest branch or contact our support team.",
    mobileApp: "Download our mobile app for quick and secure access to your accounts on the go. Available for iOS and Android.",
    statement: "To access your account statements online, please log in to your online banking account and navigate to the statements section.",
    passwordReset: "If you forgot your password, you can reset it by following the instructions on the password reset page <a href='https://example.com/password-reset'>here</a>.",
    transactionDispute: "If you have any concerns or disputes regarding a specific transaction, please provide the transaction details so we can assist you.",
    loanPayment: "To make a loan payment, you can use our online banking platform or set up automatic payments. Contact us for more information.",
    branchLocator: "To find the nearest branch or ATM, please use our branch locator tool on our website.",
    creditScore: "To check your credit score, we recommend using reputable credit monitoring services or contacting credit bureaus directly.",
    insuranceClaim: "If you need assistance with an insurance claim, please provide your policy number and a brief description of the claim.",
    onlineSecurity: "We take online security seriously. Learn more about our security measures <a href='https://example.com/online-security'>here</a>.",
    retirementPlanning: "For retirement planning advice and options, we have dedicated financial advisors available. Let us know if you'd like to schedule a consultation.",
    taxDocuments: "To access tax-related documents, such as 1099 forms, log in to your online banking account and check the tax documents section.",
    privacyPolicy: "Protecting your privacy is important to us. You can review our privacy policy <a href='https://example.com/privacy-policy'>here</a>.",
    accountClosure: "If you wish to close your account, please contact our support team or visit our nearest branch.",
    mobileDeposit: "Our mobile app allows you to deposit checks conveniently. Simply use the mobile deposit feature in the app.",
    studentAccounts: "We offer specialized accounts and services for students. Learn more about our student accounts <a href='https://example.com/student-accounts'>here</a>.",
    investmentAdvice: "For investment advice and guidance, we recommend consulting with a financial advisor to discuss your goals and risk tolerance.",
    financialEducation: "We provide financial education resources on our website, including articles and tools to help you improve your financial literacy.",
  };
  

  for (const [key, value] of Object.entries(responses)) {
    if (keyword.includes(key)) {
      return value;
    }
  }
  
  return "Please try something else.";
};

const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};
