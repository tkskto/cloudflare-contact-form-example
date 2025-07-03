async function submitHandler(request, env) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
    });
  }

  return env.SEND_EMAIL.fetch(request, env);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const clone = await request.clone();

    if (url.pathname === "/api/contact") {
      await submitHandler(clone, env);
    }

    return fetch(clone);
  },
};
