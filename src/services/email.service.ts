import { confirmationMail } from '../mail/templates/confirmation.mail';
import { transporter } from '../mail/client';

async function handleEmailNotification(event: Record<string, unknown>) {
  try {
    console.log('Handling notification event:', event);

    const {
      recipentEmail,
      orderId,
      restaurantData,
      deliveryAddress,
      menuItems,
    } = event;

    if (
      !recipentEmail ||
      !orderId ||
      !restaurantData ||
      !deliveryAddress ||
      !menuItems
    ) {
      throw new Error('Missing required event data');
    }

    // Example menu items format validation
    if (!Array.isArray(menuItems)) {
      throw new Error('Menu items must be an array');
    }

    // Add your email service or notification logic here
    await transporter.sendMail(
      confirmationMail(
        recipentEmail as string,
        orderId as string,
        restaurantData as {
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
        deliveryAddress as {
          recipentName: string;
          street: string;
          city: string;
          zip: string;
          floor?: string;
        },
        menuItems as Array<{ title: string; quantity: number; price: number }>,
      ),
    );

    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Error handling email notification:', error);
  }
}

export { handleEmailNotification };
