import { SQSEvent } from "aws-lambda";
import { NotificationEvent } from "./types/notification-event.js";
import { handleEmailVerification } from "./handlers/email-verification.handler.js";
import { handleOrderStatus } from "./handlers/order-status.handler.js";

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const message = JSON.parse(record.body) as NotificationEvent;

    switch (message.eventType) {
      case "USER_EMAIL_VERIFICATION":
        await handleEmailVerification(
          message.email,
          message.data.verificationLink
        );
        break;

      case "ORDER_STATUS_CHANGED":
        await handleOrderStatus(
          message.email,
          message.data.orderId,
          message.data.status
        );
        break;

      default:
        console.warn("Unknown notification event", message);
    }
  }
};
