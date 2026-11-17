export const CONTACT = {
  email: 'ijazahmedca@gmail.com',
  whatsappNumber: '+92 311 5191403',
  whatsappUrl: 'https://wa.me/923115191403',
  primaryPhone: '+92 311 5191403',
  phones: ['+92 311 5191403', '+92 333 9801780', '+92 302 8545024'],
  offices: [
    {
      label: 'Islamabad Office',
      lines: [
        'Office # 5, 5th Floor',
        'Corporate Centre',
        'Business Park Gulberg Greens',
        'Islamabad, Pakistan',
      ],
    },
    {
      label: 'Haripur Office',
      lines: [
        'Office # 308, 3rd Floor',
        'Ameer Khan Plaza',
        'Main G.T Road',
        'Haripur, KPK, Pakistan',
      ],
    },
  ],
};

export const professionalServices = [
  'Audit & Assurance',
  'Tax & Regulatory Compliance',
  'Advisory & Consulting',
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value) => String(value ?? '').trim();

export function validateEnquiryForm(data) {
  const errors = {};
  const name = clean(data.name);
  const email = clean(data.email);
  const phone = clean(data.phone);
  const message = clean(data.message);
  if (!name || name.length > 100) errors.name = 'Please enter your full name.';
  if (!emailPattern.test(email) || email.length > 254) errors.email = 'Please enter a valid email address.';
  if (!phone || phone.length > 30) errors.phone = 'Please provide a contact number.';
  if (!professionalServices.includes(clean(data.service))) errors.service = 'Please select the professional service required.';
  if (!message || message.length > 3000) errors.message = 'Please provide a brief description of your requirement.';
  return errors;
}

export function validateConsultationForm(data) {
  return validateEnquiryForm(data);
}

export function buildWhatsAppEnquiryMessage(data) {
  return `Dear IJAZ AHMAD & Co.,

I would like to enquire about your professional services in relation to the following requirement.

Name: ${clean(data.name)}
Email: ${clean(data.email)}
Contact Number: ${clean(data.phone)}

Service Required:
${clean(data.service)}

Brief Description:
${clean(data.message)}

I would appreciate your guidance regarding the appropriate professional assistance and next steps.

Regards,
${clean(data.name)}`;
}

export function buildEmailEnquiry(data) {
  const submissionDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date());
  return {
    subject: `New Client Enquiry | ${clean(data.service)} | ${clean(data.name)}`,
    body: `Dear IJAZ AHMAD & Co.,

A new prospective client enquiry has been submitted through your professional website.

CLIENT DETAILS

Name:
${clean(data.name)}

Email Address:
${clean(data.email)}

Contact Number:
${clean(data.phone)}

SERVICE REQUIRED

${clean(data.service)}

CLIENT REQUIREMENT

${clean(data.message)}

Please review the above information and contact the prospective client to discuss the requirement, scope of assistance, and appropriate next steps.

Submission Date:
${submissionDate}`,
    submissionDate,
  };
}

export const buildWhatsAppConsultationMessage = buildWhatsAppEnquiryMessage;
export const buildEmailConsultationRequest = buildEmailEnquiry;

export function openWhatsApp(message) {
  window.open(`${CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

export function openEmailClient({ subject, body }) {
  window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const env = import.meta.env ?? {};
export const isEmailJsConfigured = Boolean(
  env.VITE_EMAILJS_SERVICE_ID && env.VITE_EMAILJS_TEMPLATE_ID && env.VITE_EMAILJS_PUBLIC_KEY,
);

export async function sendEnquiryEmail(data) {
  if (!isEmailJsConfigured) return { delivered: false, fallback: true };
  const email = buildEmailEnquiry(data);
  const controller = new AbortController();
  const timeoutId = globalThis.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        service_id: env.VITE_EMAILJS_SERVICE_ID,
        template_id: env.VITE_EMAILJS_TEMPLATE_ID,
        user_id: env.VITE_EMAILJS_PUBLIC_KEY,
        template_params: {
          to_email: CONTACT.email,
          email_subject: email.subject,
          email_body: email.body,
          client_name: clean(data.name),
          client_email: clean(data.email),
          client_phone: clean(data.phone),
          service_required: clean(data.service),
          client_message: clean(data.message),
          submission_date: email.submissionDate,
        },
      }),
    });
    if (!response.ok) throw new Error('The enquiry could not be submitted at this time.');
    return { delivered: true, fallback: false };
  } finally {
    globalThis.clearTimeout(timeoutId);
  }
}
