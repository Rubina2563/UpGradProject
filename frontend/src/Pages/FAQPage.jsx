import React, { useState } from "react";
import Footer from "../Components/Layout/Footer";
import Header from "../Components/Layout/Header";

const FAQPage = () => {
  return (
    <div>
      <Header heading={5} />
      <Faq />
      <Footer />
    </div>
  );
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };

  const faqData = [
    {
      question: "Do you offer international shipping?",
      answer:
        "Currently, we only offer shipping within the India.",
      
    },
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by clicking the tracking link of into your account on our website and viewing the order details.",
      
      },
      {
      question: "What payment methods do you accept?",
      answer:
        "We accept Razorpay and we also have a cash on delivery system.",
     
    },
    {
      question: "How do I contact customer support?",
      answer:
        "We are currently working on customer supports link",
      
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "Unfortunately, once an order has been placed, we are not able to make changes or cancellations. If you no longer want the items you've ordered, you can return them for a refund within 30 days of delivery.",
      
      },
     {
      question: "What is your return policy?",
      answer:
        "If you're not satisfied with your purchase, we accept returns within 30 days of delivery. To initiate a return, please email us at support@myecommercestore.com with your order number and a brief explanation of why you're returning the item.",
      
    },
   
  
  ];

  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-3xl font-bold text-yellow-900  mb-8">FAQ</h2>
      <div className="mx-auto space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleTab(index + 1)}
            >
              <span className="text-lg font-bold text-yellow-900 ">
                {faq.question}
              </span>
              {activeTab === index + 1 ? (
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
            {activeTab === index + 1 && (
              <div className="mt-4">
                <p className="text-base font-semibold text-yellow-900 ">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;