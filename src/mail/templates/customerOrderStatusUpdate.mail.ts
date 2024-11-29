export const customerOrderStatusUpdateMail = (
  to: string,
  customerData: {
    firstName: string;
    lastName: string;
  },
  restaurantData: {
    name: string;
    address: {
      street: string;
      city: string;
      zip: string;
    };
    logoUrl?: string;
    email?: string;
  },
  status: 'YOUR_FOOD_IS_ON_THE_WAY' | 'YOUR_FOOD_HAS_BEEN_DELIVERED',
) => {
  // Message details based on status
  const messageDetails = {
    YOUR_FOOD_IS_ON_THE_WAY: {
      subject: `Your order from ${restaurantData.name} is on the way!`,
      text: `Your food from ${restaurantData.name} is on the way to your location. You can expect it shortly.`,
      html: `
          <p>Hello ${customerData.firstName} ${customerData.lastName},</p>
          <p>Your food from <strong>${restaurantData.name}</strong> is on its way!</p>
          <p><strong>Delivery Address:</strong> ${restaurantData.address.street}, ${restaurantData.address.city}, ${restaurantData.address.zip}</p>
          <p>We hope you enjoy your meal!</p>
        `,
    },
    YOUR_FOOD_HAS_BEEN_DELIVERED: {
      subject: `Your order from ${restaurantData.name} has been delivered!`,
      text: `Your food from ${restaurantData.name} has been successfully delivered. Enjoy your meal!`,
      html: `
          <p>Hello ${customerData.firstName} ${customerData.lastName},</p>
          <p>Your food from <strong>${restaurantData.name}</strong> has been successfully delivered!</p>
          <p>Thank you for ordering with us. We hope you enjoy your meal!</p>
          <a href="https://www.mtogo.com/feedback" class="cta-button">Leave Feedback</a>
        `,
    },
  };

  // Select message
  const selectedMessage = messageDetails[status];

  // Construct email payload
  return {
    from: process.env.EMAIL_USER,
    to,
    subject: selectedMessage.subject,
    text: selectedMessage.text,
    html: `<!DOCTYPE html>
        <html>
        <head>
          <title>${selectedMessage.subject}</title>
          <style>
            body {
              font-family: 'Arial', Helvetica, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 650px;
              margin: 40px auto;
              padding: 40px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
              border: 1px solid #ddd;
            }
            .logo {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo img {
              width: 100px;
              height: auto;
            }
            h1 {
              font-size: 24px;
              color: #2c3e50;
              margin-bottom: 15px;
              font-weight: bold;
            }
            p {
              font-size: 16px;
              color: #34495e;
              line-height: 1.7;
            }
            .cta-button {
              display: inline-block;
              padding: 12px 25px;
              background-color: #2ecc71;
              color: #ffffff;
              text-decoration: none;
              font-size: 16px;
              border-radius: 5px;
              margin-top: 30px;
              text-align: center;
            }
            .cta-button:hover {
              background-color: #27ae60;
            }
            .cta-button:active {
              background-color: #2ecc71;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            .footer {
              margin-top: 40px;
              font-size: 14px;
              color: #95a5a6;
              text-align: center;
            }
            .footer a {
              color: #2ecc71;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              ${
                restaurantData.logoUrl
                  ? `<img src="${restaurantData.logoUrl}" alt="${restaurantData.name} Logo" />`
                  : `<strong>${restaurantData.name}</strong>`
              }
            </div>
            <h1>${selectedMessage.subject}</h1>
            ${selectedMessage.html}
            <div class="footer">
              <p>Thanks for choosing <strong>MTOGO</strong>! We hope to serve you again soon.</p>
              <p>This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>`,
  };
};
