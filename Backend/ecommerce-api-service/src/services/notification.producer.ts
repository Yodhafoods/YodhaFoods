import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { NotificationEvent } from "../types/notification-event.js";

const sqs = new SQSClient({
  region: process.env.AWS_REGION,
});

export async function emitNotification(event: NotificationEvent) {
  await sqs.send(
    new SendMessageCommand({
      QueueUrl: process.env.NOTIFICATION_QUEUE_URL!,
      MessageBody: JSON.stringify(event),
    })
  );
}
