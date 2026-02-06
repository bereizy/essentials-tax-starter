interface Env {
  RESEND_API_KEY?: string;
  CONTACT_EMAIL?: string;
  BUSINESS_NAME?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const formData: ContactFormData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get config from environment
    const resendApiKey = env.RESEND_API_KEY;
    const contactEmail = env.CONTACT_EMAIL;
    const businessName = env.BUSINESS_NAME || "Your Business";

    if (!resendApiKey || !contactEmail) {
      console.error("Missing RESEND_API_KEY or CONTACT_EMAIL environment variables");
      return new Response(
        JSON.stringify({ success: false, error: "Contact form not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send email via Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${businessName} Website <noreply@resend.dev>`,
        to: [contactEmail],
        reply_to: formData.email,
        subject: `New Contact Form Submission from ${formData.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${escapeHtml(formData.name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(formData.email)}">${escapeHtml(formData.email)}</a></p>
          ${formData.phone ? `<p><strong>Phone:</strong> <a href="tel:${escapeHtml(formData.phone)}">${escapeHtml(formData.phone)}</a></p>` : ""}
          <hr />
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(formData.message).replace(/\n/g, "<br />")}</p>
          <hr />
          <p style="color: #666; font-size: 12px;">This message was sent from your website contact form.</p>
        `,
        text: `
New Contact Form Submission

From: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ""}

Message:
${formData.message}

---
This message was sent from your website contact form.
        `.trim(),
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to send message" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "An unexpected error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

// Helper to escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}
