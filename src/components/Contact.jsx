import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Send, ShieldCheck } from 'lucide-react';
import useValidatedForm from '../hooks/useValidatedForm';
import {
  CONTACT,
  buildEmailEnquiry,
  buildWhatsAppEnquiryMessage,
  isEmailJsConfigured,
  openEmailClient,
  openWhatsApp,
  professionalServices,
  sendEnquiryEmail,
  validateEnquiryForm,
} from '../utils/contact';

const telHref = (value) => `tel:${String(value).replace(/[^\d+]/g, '')}`;

export function ConsultationCTA({ onRequestConsultation }) {
  return (
    <section className="consultation">
      <div className="container consultation-inner">
        <div>
          <p className="eyebrow">Professional Advisory Support</p>
          <h2>Discuss Your Requirements With The Firm</h2>
          <p>Request an initial consultation to outline the audit, taxation, compliance or advisory support you require.</p>
        </div>
        <button type="button" className="button button--gold" onClick={onRequestConsultation}>Request a Consultation <ArrowRight size={17} /></button>
      </div>
    </section>
  );
}

export default function Contact({ serviceRequest }) {
  const formRef = useRef(null);
  const successRef = useRef(null);
  const submissionLock = useRef(false);
  const [selectedService, setSelectedService] = useState('');
  const [submissionState, setSubmissionState] = useState({ status: 'idle', message: '' });
  const [submittedData, setSubmittedData] = useState(null);
  const { getValidData, clearFieldError, errorFor, a11yFor, resetErrors } = useValidatedForm(validateEnquiryForm);

  useEffect(() => {
    if (!serviceRequest?.service) return undefined;
    setSelectedService(serviceRequest.service);
    setSubmissionState({ status: 'idle', message: '' });
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const focusTimer = window.setTimeout(() => formRef.current?.elements.name?.focus(), 500);
    return () => window.clearTimeout(focusTimer);
  }, [serviceRequest]);

  const handleEmail = async (event) => {
    event.preventDefault();
    if (submissionLock.current) return;
    const form = event.currentTarget;
    const data = getValidData(form);
    if (!data) return;
    submissionLock.current = true;
    setSubmissionState({ status: isEmailJsConfigured ? 'loading' : 'idle', message: '' });
    try {
      const result = await sendEnquiryEmail(data);
      if (result.fallback) {
        openEmailClient(buildEmailEnquiry(data));
        setSubmissionState({ status: 'info', message: 'Your preferred email application has been opened with the enquiry details completed. Please review and send the email to submit your enquiry.' });
        return;
      }
      setSubmittedData(data);
      setSubmissionState({ status: 'success', message: '' });
      form.reset();
      setSelectedService('');
      resetErrors();
    } catch (error) {
  console.error('Enquiry submission failed:', error);

  setSubmissionState({
    status: 'error',
    message:
      'We were unable to submit your enquiry. Please try again or continue via WhatsApp.',
    });
} finally {
  submissionLock.current = false;
}
};

  const handleWhatsApp = (event) => {
  if (submissionLock.current) return;

  const data = getValidData(event.currentTarget.form);

  if (!data) return;

  openWhatsApp(buildWhatsAppEnquiryMessage(data));

  setSubmissionState({
    status: 'info',
    message:
      'Your enquiry is ready to send via WhatsApp. Please review the prepared message and press Send.',
  });
};
  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy visible">
          <p className="eyebrow">Professional Enquiries</p>
          <h2>Contact IJAZ AHMAD &amp; Co.</h2>
          <p>Contact our Islamabad or Haripur office for audit, taxation, regulatory compliance, financial advisory or business consulting matters.</p>
          <div className="office-grid">
            {CONTACT.offices.map((office) => (
              <article className="office-card" key={office.label}>
                <p className="panel-label">{office.label}</p>
                <address>
                  {office.lines.map((line) => <span key={line}>{line}</span>)}
                </address>
              </article>
            ))}
          </div>
          <div className="contact-cards">
            <a href={telHref(CONTACT.primaryPhone)}>
              <span><MessageCircle /></span>
              <div><small>Primary Phone</small><b>{CONTACT.primaryPhone}</b></div>
              <ArrowRight />
            </a>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
              <span><MessageCircle /></span>
              <div><small>WhatsApp</small><b>{CONTACT.whatsappNumber}</b></div>
              <ArrowRight />
            </a>
            <a href={`mailto:${CONTACT.email}`}>
              <span><Mail /></span>
              <div><small>Email</small><b>{CONTACT.email}</b></div>
              <ArrowRight />
            </a>
          </div>
        </div>
        <form ref={formRef} className="contact-form visible" onSubmit={handleEmail} onInput={clearFieldError} onChange={clearFieldError} noValidate>
          {submissionState.status === 'success' && <div ref={successRef} className="enquiry-success enquiry-success--inline" role="status" aria-live="polite" tabIndex="-1"><span><CheckCircle2 /></span><div><h3>Thank You for Your Enquiry</h3><p>Your enquiry has been received successfully. The firm will review the information provided and contact you regarding the appropriate next steps.</p><div className="enquiry-success-actions"><button className="button button--whatsapp" type="button" onClick={() => openWhatsApp(buildWhatsAppEnquiryMessage(submittedData))}><MessageCircle size={17} />Continue via WhatsApp</button><button className="success-reset" type="button" onClick={() => setSubmissionState({ status: 'idle', message: '' })}>Dismiss</button></div></div></div>}
          <div className="form-heading"><h3>Submit an Enquiry</h3><p>Provide a brief description of your requirement and the firm will contact you to discuss the appropriate professional support.</p></div>
          <div className="form-row">
            <label htmlFor="enquiry-name">Full Name<input id="enquiry-name" name="name" type="text" autoComplete="name" maxLength="100" placeholder="Your full name" required {...a11yFor('name')} />{errorFor('name')}</label>
            <label htmlFor="enquiry-email">Email Address<input id="enquiry-email" name="email" type="email" autoComplete="email" maxLength="254" placeholder="name@business.com" required {...a11yFor('email')} />{errorFor('email')}</label>
          </div>
          <div className="form-row">
            <label htmlFor="enquiry-phone">Contact Number<input id="enquiry-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength="30" placeholder="+92 300 0000000" required {...a11yFor('phone')} />{errorFor('phone')}</label>
            <label htmlFor="enquiry-service">Service Required<select id="enquiry-service" name="service" value={selectedService} onChange={(event) => setSelectedService(event.target.value)} required {...a11yFor('service')}><option value="" disabled>Select the service relevant to your requirement</option>{professionalServices.map((service) => <option key={service} value={service}>{service}</option>)}</select>{errorFor('service')}</label>
          </div>
          <label htmlFor="enquiry-message">Brief Description of Requirement<textarea id="enquiry-message" name="message" rows="5" maxLength="3000" placeholder="Please provide a brief overview of the matter and the professional assistance you require." required {...a11yFor('message')} />{errorFor('message')}</label>
          <div className="enquiry-actions">
            <button className="button button--navy" type="submit" disabled={submissionState.status === 'loading'}><Send size={17} />{submissionState.status === 'loading' ? 'Submitting Enquiry...' : 'Submit Enquiry'}</button>
            <button className="button button--whatsapp" type="button" onClick={handleWhatsApp} disabled={submissionState.status === 'loading'}><MessageCircle size={18} />Continue via WhatsApp</button>
          </div>
          {submissionState.message && <p className={`form-notice form-notice--${submissionState.status}`} role={submissionState.status === 'error' ? 'alert' : 'status'}>{submissionState.message}</p>}
          <div className="enquiry-assurance"><p><ShieldCheck size={14} />Every enquiry is reviewed based on the nature of the professional assistance required.</p><p><ShieldCheck size={14} />Information submitted through this website will be used for the purpose of reviewing and responding to your enquiry.</p><p><ShieldCheck size={14} />Professional services and scope of engagement will be discussed and agreed separately.</p></div>
        </form>
      </div>
    </section>
  );
}
