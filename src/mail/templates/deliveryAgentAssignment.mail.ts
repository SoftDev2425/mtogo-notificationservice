export const deliveryAgentAssignmentMail = (
  to: string,
  deliveryAgentName: string,
  orderId: string,
  restaurantData: {
    name: string;
    phone: string;
    address: {
      street: string;
      city: string;
      zip: string;
      x: number;
      y: number;
    };
    logoUrl?: string;
  },
  deliveryAddress: {
    recipentName: string;
    street: string;
    city: string;
    zip: string;
    floor?: string;
  },
  menuItems: Array<{ title: string; quantity: number; price: number }>,
) => {
  const formattedDeliveryAddress =
    `${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.zip}` +
    (deliveryAddress.floor ? `, Floor: ${deliveryAddress.floor}` : '');

  const totalCost = menuItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const itemsHtml = menuItems
    .map(
      item =>
        `<tr>
                  <td style="padding: 12px; border: 1px solid #e0e0e0; text-align: left;">${item.title}</td>
                  <td style="padding: 12px; border: 1px solid #e0e0e0; text-align: center;">${item.quantity}</td>
                  <td style="padding: 12px; border: 1px solid #e0e0e0; text-align: right;">${item.price.toFixed(2)} DKK</td>
                </tr>`,
    )
    .join('');

  return {
    from: process.env.EMAIL_USER,
    to,
    subject: `Delivery Assignment - Order #${orderId}`,
    text: `Hello ${deliveryAgentName}, you have been assigned a new delivery. Please pick up the order from ${restaurantData.name} and deliver it to ${formattedDeliveryAddress}.`,
    html: `<!DOCTYPE html>
              <html>
              <head>
                  <title>Delivery Assignment</title>
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
                          font-size: 30px;
                          color: #2c3e50;
                          margin-bottom: 15px;
                          font-weight: bold;
                      }
                      h3 {
                          font-size: 22px;
                          color: #34495e;
                          margin-bottom: 10px;
                          font-weight: normal;
                      }
                      p {
                          font-size: 16px;
                          color: #34495e;
                          line-height: 1.7;
                      }
                      table {
                          width: 100%;
                          border-collapse: collapse;
                          margin-top: 30px;
                      }
                      th, td {
                          padding: 12px;
                          border: 1px solid #e0e0e0;
                          text-align: left;
                      }
                      th {
                          background-color: #ecf0f1;
                          color: #34495e;
                          font-weight: bold;
                      }
                      td {
                          color: #7f8c8d;
                      }
                      .footer {
                          margin-top: 40px;
                          font-size: 14px;
                          color: #95a5a6;
                          text-align: center;
                      }
                  </style>
              </head>
              <body>
                  <div class="container">
                      <div class="logo">
                          ${restaurantData.logoUrl ? `<img src="${restaurantData.logoUrl}" alt="${restaurantData.name} Logo" />` : ''}
                      </div>
                      <h1>New Delivery Assignment</h1>
                      <p>Hello <strong>${deliveryAgentName}</strong>,</p>
                      <p>You have been assigned a new delivery. Please review the details below:</p>
                      
                      <h3>Pickup Location:</h3>
                      <p>${restaurantData.name}<br>
                      ${restaurantData.address.street}, ${restaurantData.address.city}, ${restaurantData.address.zip}<br>
                      <strong>Contact:</strong> ${restaurantData.phone}</p>
                      
                      <h3>Delivery Address:</h3>
                      <p>${formattedDeliveryAddress}<br>
                      <strong>Recipient:</strong> ${deliveryAddress.recipentName}<br>
                      
                      <h3>Order Details:</h3>
                      <table>
                          <thead>
                              <tr>
                                  <th>Item</th>
                                  <th>Quantity</th>
                                  <th>Price</th>
                              </tr>
                          </thead>
                          <tbody>
                              ${itemsHtml}
                          </tbody>
                      </table>
                      
                      <p><strong>Total Cost:</strong> ${totalCost.toFixed(2)} DKK</p>
                      
                      <p>Please ensure timely pickup and delivery.</p>
                      <div class="footer">
                          <p>Thank you for your dedication!</p>
                          <p><i>- The MTOGO Team</i></p>
                      </div>
                  </div>
              </body>
              </html>`,
  };
};
