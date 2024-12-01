export const restaurantPayout = (
  recipent: {
    id: string;
    name: string;
    email: string;
    regNo: string;
    accountNo: string;
  },
  payouts: {
    restaurantPayout: number;
    deliveryAgentPayout: number;
  },
  order: {
    id: string;
    customerId: string;
    restaurantId: string;
  },
) => {
  return {
    from: process.env.EMAIL_USER,
    to: recipent.email,
    subject: `Payment Confirmation - MTOGO (Order #${order.id})`,
    text: `Dear ${recipent.name},\n\nWe are pleased to inform you that MTOGO has processed your payout for order #${order.id}. The payment details are outlined below.\n\nThank you for being an essential part of the MTOGO family!\n\nBest regards,\nThe MTOGO Team`,
    html: `<!DOCTYPE html>
              <html>
              <head>
                  <title>Payment Confirmation</title>
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
                      h1 {
                          font-size: 28px;
                          color: #2c3e50;
                          margin-bottom: 20px;
                          font-weight: bold;
                      }
                      p {
                          font-size: 16px;
                          color: #34495e;
                          line-height: 1.7;
                      }
                      .payment-details {
                          margin-top: 20px;
                          padding: 15px;
                          background-color: #ecf0f1;
                          border-radius: 5px;
                          border: 1px solid #ddd;
                      }
                      .footer {
                          margin-top: 30px;
                          font-size: 14px;
                          color: #95a5a6;
                          text-align: center;
                      }
                      .cta-button {
                          display: inline-block;
                          padding: 12px 25px;
                          background-color: #27ae60;
                          color: #ffffff;
                          text-decoration: none;
                          font-size: 16px;
                          border-radius: 5px;
                          margin-top: 20px;
                          text-align: center;
                      }
                      .cta-button:hover {
                          background-color: #2ecc71;
                      }
                  </style>
              </head>
              <body>
                  <div class="container">
                      <h1>Payment Confirmation - MTOGO</h1>
                      <p>Dear ${recipent.name},</p>
                      <p>We are pleased to inform you that MTOGO has processed your payout for order <strong>#${order.id}</strong>. Below are the details of your payment:</p>
                      
                      <div class="payment-details">
                          <p><strong>Restaurant Payout:</strong> ${payouts.restaurantPayout.toFixed(2)} DKK</p>
                          <p><strong>Delivery Agent Payout:</strong> ${payouts.deliveryAgentPayout.toFixed(2)} DKK</p>
                      </div>
  
                    <div>
                        <p>
                            Please see attached document for more details on the payment.</p>
                    </div>

                      <p>Thank you for being an essential part of the MTOGO family. We value your partnership and look forward to serving you in the future!</p>
                      
                      <div class="footer">
                          <p>If you have any questions regarding this payment, please contact us at <a href="mailto:support@mtogo.com">support@mtogo.com</a>.</p>
                          <p><i>- The MTOGO Team</i></p>
                          <p style="margin-top: 20px;">This is an automated email. Please do not reply to this message.</p>
                      </div>
                  </div>
              </body>
              </html>`,
  };
};
