import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { SyncUser } from "@/backend/model/users";

async function handler(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();

  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the type of event
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, first_name, last_name, image_url, email_addresses } = evt.data;

    try {
      await SyncUser({
        external_id: id,
        name: `${first_name} ${last_name}`,
        email: email_addresses[0].email_address,
        avatar_url: image_url,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Error syncing user:", err);
      return new Response("Error occured", {
        status: 400,
      });
    }
  }

  return new Response("", { status: 200 });
}

export const POST = handler;
export const GET = handler;
export const PUT = handler;
