import { pipe } from "@screenpipe/js";

async function queryScreenpipe() {
  console.log("starting query screenpipe...");
  console.log("------------------------------");
  console.log("querying last 5 minutes of activity...");
  console.log("------------------------------");

  // get content from last 5 minutes
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

  const results = await pipe.queryScreenpipe({
    startTime: fiveMinutesAgo,
    limit: 10,
    contentType: "all", // can be "ocr", "audio", "ui", or "all"
    appName: "WhatsApp",
  });

  if (!results) {
    console.log("no results found or error occurred");
    return;
  }

  console.log(`found ${results.pagination.total} items`);

  // process each result
  for (const item of results.data) {
    console.log("\n--- new item ---");
    console.log(`type: ${item.type}`);
    console.log(`timestamp: ${item.content.timestamp}`);

    if (item.type === "OCR") {
      console.log(`OCR: ${JSON.stringify(item.content)}`);
    } else if (item.type === "Audio") {
      console.log(`transcript: ${JSON.stringify(item.content)}`);
    } else if (item.type === "UI") {
      console.log(`UI: ${JSON.stringify(item.content)}`);
    }

    // here you could send to openai or other ai service
    // example pseudo-code:
    // const aiResponse = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: item.content }],
    //   model: "gpt-4"
    // });
    const aiResponse = await queryOllama(
      `What is the content of  ${JSON.stringify(item.content)}`
    );

    console.log("AI response. :\n", aiResponse);
    // console.log(
    //   "\n\nnow you could send to openai or other ai service with this code:\n"
    // );
    // console.log(
    //   "const aiResponse = await openai.chat.completions.create({ messages: [{ role: 'user', content: item.content }], model: 'gpt-4' });"
    // );
  }
}

async function queryOllama(prompt: any) {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt: prompt,
      stream: false,
    }),
  });

  const data = await response.json();
  return data.response;
}

queryScreenpipe().catch(console.error);
