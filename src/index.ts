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

    if (url.pathname === "/api/contact") {
      const clone = await request.clone();
      const formSubmitResponse = await submitHandler(clone, env);

      if (formSubmitResponse.ok) {
        return Response.redirect(`${url.origin}/form/complete.html`, 302);
      } else {
        return new Response(
            JSON.stringify({
              message: 'メールの送信に失敗しました。',
            }),
            {
              status: 500,
              statusText: 'メールの送信に失敗しました。',
            },
        );
      }
    }

    if (url.pathname === "/favicon.ico") {
      return new Response(null, { status: 204 });
    }

    return fetch(request);
  },
};
