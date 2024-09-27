"use server";

const webhookUrl = process.env.MAKE_EMAIL_WEBHOOK as string;

export async function requestAcces({ from }: { from: string }) {
  const to = "colin.demouge@gmail.com";
  const subject = `Records - Request access from ${from}`;
  const content = `New request access received from ${from}`;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to,
      subject,
      content,
    }),
  });

  if (response.status === 200) {
    return "Success";
  } else {
    return "Error";
  }
}
