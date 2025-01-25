export async function sendWhatsAppMessage(from_date: string, clNumber: string) {
  console.log("from_date", from_date);
  console.log("clNumber", clNumber);

  const url = "https://019sms.co.il/whatsapp-api/create-campaign-wa";
  const payload = {
    destinations: {
      cl: [clNumber],
    },
    campaign_message: "65338_972553052053_2nivhe",
    future_campaign: "future",
    from_date: from_date, //"15/01/2025 21:40"
    campaign_name: "",
    header_link: "https://static.whatsapp.net/rsrc.php/v3/y7/r/DSxOAUB0raA.png",
    source: 972553052053,
    dynamicHeaders: {
      "1": "שדה דינמי 1",
      "2": "שדה דינמי 2",
      "3": "שדה דינמי 3",
      "4": "שדה דינמי 4",
      "5": "שדה דינמי 5",
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SMS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Message sent successfully:", data);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
