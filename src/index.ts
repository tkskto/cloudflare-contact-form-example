async function submitHandler(request, env) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
    });
  }

  return env.SEND_EMAIL.fetch(request);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    console.log(env);

    if (url.pathname === "/api/contact") {
      await submitHandler(request, env);
    }
    return new Response("Not found", { status: 404 });
  },
};
