export async function requestAcces({ from }: { from: string }) {
  const webhookUrl =
    "https://hook.eu2.make.com/ro6feveiq95o5prn7sromen20z9n179u";

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
