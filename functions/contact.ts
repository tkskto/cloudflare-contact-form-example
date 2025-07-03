export const onRequestPost: PagesFunction = async (context) => {
    return context.env.SEND_EMAIL.fetch(context.request);
};
