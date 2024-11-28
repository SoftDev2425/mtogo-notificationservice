export const customerConfirmationMail = (
  to: string,
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
    email?: string;
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
  const formattedAddress =
    `${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.zip}` +
    (deliveryAddress.floor ? `, Floor: ${deliveryAddress.floor}` : '');

  // Calculate total cost
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
    subject: `Order Confirmation - MTOGO (Order #${orderId})`,
    text: `Thank you for your order on MTOGO! Your food will be delivered to: ${formattedAddress}.`,
    html: `<!DOCTYPE html>
            <html>
            <head>
                <title>Order Confirmation</title>
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
                    .total-cost {
                        font-size: 18px;
                        font-weight: bold;
                        color: #ffffff;
                        background-color: #27ae60;
                        padding: 10px;
                        text-align: center;
                        margin-top: 30px;
                        border-radius: 8px;
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
                        .orderId {
                        font-size: 10px;
                        }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo">
                        ${restaurantData.logoUrl ? `<img src="${restaurantData.logoUrl}" alt="${restaurantData.name} Logo" />` : ''}
                    </div>
                    <h1>Thank You for Your Order! 😋</h1>
                    <div style="width: 100%; text-align: left; margin-bottom: 20px;">
                    <strong class="orderId">Order ID: #${orderId}</strong>
                    </div>
                    <p>Dear ${deliveryAddress.recipentName},</p>
                    <p>Your order from <strong>${restaurantData.name}</strong> has been successfully placed. Your delicious food is on its way to the following address:</p>
                    
                    <h3>Delivery Address:</h3>
                    <p>${formattedAddress}</p>
                    
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
                    
                    <p class="total-cost">Total Cost: ${totalCost.toFixed(2)} DKK</p>
    
                    <p><strong>Restaurant Contact:</strong> ${restaurantData.phone}</p>
                    ${restaurantData.email ? `<p><strong>Email:</strong> <a href="mailto:${restaurantData.email}">${restaurantData.email}</a></p>` : ''}
                    <p><strong>Location:</strong> ${restaurantData.address.street}, ${restaurantData.address.city}, ${restaurantData.address.zip}</p>
                    
                    <a href="https://www.mtogo.com/orders/${orderId}" class="cta-button">View Order Details</a>
                    
                    <div class="footer">
                        <p>Thanks for choosing MTOGO! We hope you enjoy your meal.</p>
                        <p><i>- The MTOGO Team</i></p>
  
                        <p style="margin-top: 20px;">This is an automated email. Please do not reply to this message.</p>
                    </div>
                </div>
            </body>
            </html>`,
  };
};
