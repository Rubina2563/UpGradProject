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
      question: "What is your return policy?",
      answer:
        "If you're not satisfied with your purchase, we accept returns within 30 days of delivery. To initiate a return, please email us at support@myecommercestore.com with your order number and a brief explanation of why you're returning the item.",
      answerTranslated:
        "Si no estás satisfecho con tu compra, aceptamos devoluciones dentro de los 30 días posteriores a la entrega. Para iniciar una devolución, envíanos un correo electrónico a support@myecommercestore.com con tu número de pedido y una breve explicación de por qué estás devolviendo el artículo.",
    },
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by clicking the tracking link in your shipping confirmation email, or by logging into your account on our website and viewing the order details.",
      answerTranslated:
        "Puedes rastrear tu pedido haciendo clic en el enlace de seguimiento en tu correo electrónico de confirmación de envío, o iniciando sesión en tu cuenta en nuestro sitio web y viendo los detalles del pedido.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact our customer support team by emailing us at support@myecommercestore.com, or by calling us at (555) 123-4567 between the hours of 9am and 5pm EST, Monday through Friday.",
      answerTranslated:
        "Puedes contactar a nuestro equipo de atención al cliente enviándonos un correo electrónico a support@myecommercestore.com, o llamándonos al (555) 123-4567 entre las 9am y 5pm EST, de lunes a viernes.",
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "Unfortunately, once an order has been placed, we are not able to make changes or cancellations. If you no longer want the items you've ordered, you can return them for a refund within 30 days of delivery.",
      answerTranslated:
        "Desafortunadamente, una vez que se ha realizado un pedido, no podemos hacer cambios o cancelaciones. Si ya no deseas los artículos que has pedido, puedes devolverlos para obtener un reembolso dentro de los 30 días posteriores a la entrega.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Currently, we only offer shipping within the United States.",
      answerTranslated:
        "Actualmente, solo ofrecemos envíos dentro de los Estados Unidos.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Visa, Mastercard, PayPal, and we also have a cash on delivery system.",
      answerTranslated:
        "Aceptamos Visa, Mastercard, PayPal, y también tenemos un sistema de pago contra entrega.",
    },
  ];

  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
      <div className="mx-auto space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleTab(index + 1)}
            >
              <span className="text-lg font-medium text-gray-900">
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
                <p className="text-base text-gray-500">{faq.answerTranslated}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;