export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export type NotificationEvent =
  | {
      eventType: "USER_EMAIL_VERIFICATION";
      email: string;
      data: { verificationLink: string };
    }
  | {
      eventType: "ORDER_STATUS_CHANGED";
      email: string;
      data: { orderId: string; status: OrderStatus };
    }
  |{
    eventType: "FORGOT_PASSWORD";
    email: string;
    data: { resetPasswordLink: string };
  };
