// Cloudflare Pages Function for handling contact form submissions
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Basic validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "All fields are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // In a real implementation, you would:
    // 1. Send an email using a service like SendGrid, Resend, or EmailJS
    // 2. Store the message in a database
    // 3. Send a notification to the site owner

    // For now, we'll just log the message and return success
    console.log("Contact form submission:", { name, email, message });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Something went wrong. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
