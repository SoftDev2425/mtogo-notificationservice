import { customerConfirmationMail } from '../mail/templates/customerConfirmation.mail';
import { deliveryAgentAssignmentMail } from '../mail/templates/deliveryAgentAssignment.mail';
import { transporter } from '../mail/client';
import { customerOrderStatusUpdateMail } from '../mail/templates/customerOrderStatusUpdate.mail';
import { restaurantPayout } from '../mail/templates/restaurantPayout.mail';
import { deliveryAgentPayout } from '../mail/templates/deliveryAgentPayout.mail';

async function handleEmailCustomerConfirmation(event: Record<string, unknown>) {
  try {
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
      customerConfirmationMail(
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

async function handleEmailDeliveryAssignment(event: Record<string, unknown>) {
  try {
    console.log('Handling delivery agent asssingment email event:', event);

    const {
      recipentEmail,
      orderId,
      deliveryAgentName,
      restaurantData,
      deliveryAddress,
      menuItems,
    } = event;

    if (!recipentEmail || !orderId || !deliveryAgentName || !restaurantData) {
      throw new Error('Missing required event data');
    }

    // Add your email service or notification logic here
    await transporter.sendMail(
      deliveryAgentAssignmentMail(
        recipentEmail as string,
        deliveryAgentName as string,
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

async function handleEmailOrderStatusUpdate(event: Record<string, unknown>) {
  try {
    const { order, status } = event as {
      order: { customerId: string; restaurantId: string };
      status: 'YOUR_FOOD_IS_ON_THE_WAY' | 'YOUR_FOOD_HAS_BEEN_DELIVERED';
    };

    if (!order || !status) {
      throw new Error('Missing required event data');
    }

    const getCustomerAndRestaurantData = await fetch(
      `${process.env.AUTH_SERVICE_URL}/api/customer-and-restaurant?customerId=${order.customerId}&restaurantId=${order.restaurantId}`,
    );

    const { customerData, restaurantData } =
      (await getCustomerAndRestaurantData.json()) as {
        customerData: { email: string; firstName: string; lastName: string };
        restaurantData: {
          name: string;
          address: {
            street: string;
            city: string;
            zip: string;
          };
          logoUrl?: string;
          email?: string;
        };
      };

    // Add your email service or notification logic here
    await transporter.sendMail(
      customerOrderStatusUpdateMail(
        customerData.email,
        customerData,
        restaurantData,
        status,
      ),
    );

    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Error handling email notification:', error);
  }
}

async function handleEmailRestaurantPayout(event: Record<string, unknown>) {
  try {
    const { recipent, payouts, order } = event as {
      recipent: {
        restaurant: {
          id: string;
          name: string;
          email: string;
          regNo: string;
          accountNo: string;
        };
      };
      payouts: {
        restaurantPayout: number;
        deliveryAgentPayout: number;
      };
      order: {
        id: string;
        customerId: string;
        restaurantId: string;
      };
    };

    console.log('Handling restaurant payout email event');

    await transporter.sendMail(
      restaurantPayout(recipent.restaurant, payouts, order),
    );
  } catch (error) {
    console.error('Error handling email notification:', error);
  }
}

async function handleEmailDeliveryAgentPayout(event: Record<string, unknown>) {
  try {
    const { recipent, payouts, order } = event as {
      recipent: {
        id: string;
        name: string;
        email: string;
        regNo: string;
        accountNo: string;
      };
      payouts: {
        restaurantPayout: number;
        deliveryAgentPayout: number;
      };
      order: {
        id: string;
        customerId: string;
        restaurantId: string;
      };
    };

    console.log('Handling delivery agent payout email event');

    await transporter.sendMail(deliveryAgentPayout(recipent, payouts, order));
  } catch (error) {
    console.error('Error handling email notification:', error);
  }
}

export {
  handleEmailCustomerConfirmation,
  handleEmailDeliveryAssignment,
  handleEmailOrderStatusUpdate,
  handleEmailRestaurantPayout,
  handleEmailDeliveryAgentPayout,
};
