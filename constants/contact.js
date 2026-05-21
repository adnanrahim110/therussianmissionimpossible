export const contactDesk = {
  title: "Support and Press Desk",
  summary:
    "This is the classified route for inquiries beyond the mission record. Rights, interviews, purchase links, bulk orders, and archive access pass through this channel. The same desk handles press releases and media coordination.",
  channels: [
    {
      label: "Press requests",
      value: "Media interviews, journalist access, and press coordination.",
    },
    {
      label: "Purchase-link requests",
      value:
        "Route readers to the final purchase destination until the external storefront is supplied.",
    },
    {
      label: "Bulk and partner inquiries",
      value:
        "Handle outreach from bookstores, events, and distribution partners.",
    },
  ],
};

export const contactPage = {
  eyebrow: "Support 03",
  metadataTitle: "Support Desk",
  title: contactDesk.title,
  summary: contactDesk.summary,
  channels: contactDesk.channels,
};

export const contactPageContent = {
  breadcrumbs: [{ label: "Archive", href: "/" }, { label: "Contact" }],
  actions: {
    email: "Email the Desk",
  },
  directEmailPanel: {
    eyebrow: "Direct Email",
  },
  requestChannelEyebrow: "Request Channel",
  addressPanel: {
    eyebrow: "Mailing Address",
    title: "Archive support office",
  },
  form: {
    eyebrow: "Secure Inquiry",
    title: "Contact the Support Desk",
    summary:
      "Send a rights, press, distribution, or archive access note to the team coordinating Operation Stream 3.0 correspondence.",
    submitLabel: "Submit Inquiry",
    fields: {
      name: {
        label: "Name",
        placeholder: "Your full name",
        iconKey: "personnel",
        errors: {
          required: "Name is required.",
          min: "Enter at least 2 characters.",
        },
      },
      email: {
        label: "Email",
        placeholder: "name@example.com",
        iconKey: "contact",
        errors: {
          required: "Email is required.",
          invalid: "Enter a valid email address.",
        },
      },
      message: {
        label: "Message",
        placeholder: "Tell us how the support desk can help.",
        iconKey: "witness",
        errors: {
          required: "Message is required.",
          min: "Enter at least 20 characters.",
        },
      },
    },
    success: {
      eyebrow: "Inquiry Prepared",
      title: "Thank you for reaching out.",
      summary:
        "Your inquiry is ready for the support desk workflow. For time-sensitive press, rights, or distribution matters, continue through the direct email route below.",
      primaryAction: "Send Another Inquiry",
      secondaryAction: "Email the Desk",
    },
  },
};
