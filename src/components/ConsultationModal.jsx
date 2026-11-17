import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Mail, MessageCircle, Send, ShieldCheck, X } from 'lucide-react';
import useValidatedForm from '../hooks/useValidatedForm';
import {
  buildEmailConsultationRequest,
  buildWhatsAppConsultationMessage,
  isEmailJsConfigured,
  openEmailClient,
  openWhatsApp,
  professionalServices,
  sendEnquiryEmail,
  validateConsultationForm,
} from '../utils/contact';

const focusableSelector = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]';

export default function ConsultationModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  const formRef = useRef(null);
  const submissionLock = useRef(false);
  const previousFocus = useRef(null);
  const [submissionState, setSubmissionState] = useState({ status: 'idle', message: '' });
  const [submittedData, setSubmittedData] = useState(null);
  const { getValidData, clearFieldError, errorFor, a11yFor, resetErrors } = useValidatedForm(validateConsultationForm);

  useEffect(() => {
    if (!isOpen) return undefined;
    previousFocus.current = document.activeElement;
    setSubmissionState({ status: 'idle', message: '' });
    resetErrors();
    document.body.classList.add('modal-open');
    const focusTimer = window.setTimeout(() => dialogRef.current?.querySelector(focusableSelector)?.focus(), 50);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll(focusableSelector)];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
      previousFocus.current?.focus();
    };
  }, [isOpen, onClose, resetErrors]);

  if (!isOpen) return null;

  const handleEmail = async (event) => {
    event.preventDefault();
    if (submissionLock.current) return;
    const data = getValidData(event.currentTarget);
    if (!data) return;
    submissionLock.current = true;
    setSubmissionState({ status: isEmailJsConfigured ? 'loading' : 'idle', message: '' });
    try {
      const result = await sendEnquiryEmail(data);
      if (result.fallback) {
        openEmailClient(buildEmailConsultationRequest(data));
        setSubmissionState({ status: 'info', message: 'Your preferred email application has been opened with the enquiry details completed. Please review and send the email to submit your enquiry.' });
        return;
      }
      setSubmittedData(data);
      setSubmissionState({ status: 'success', message: '' });
    } catch {
      setSubmissionState({ status: 'error', message: 'The enquiry could not be submitted at this time. Please continue via WhatsApp or try again later.' });
    } finally {
      submissionLock.current = false;
    }
  };

  const handleWhatsApp = (event) => {
  if (submissionLock.current) return;

  const data = getValidData(event.currentTarget.form);

  if (!data) return;

  openWhatsApp(buildWhatsAppConsultationMessage(data));

  setSubmissionState({
    status: 'info',
    message:
      'Your enquiry has been prepared for WhatsApp. Please review the message and press Send to complete your request.',
  });
};
  const closeFromBackdrop = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onMouseDown={closeFromBackdrop}>
      <section className="consultation-modal consultation-modal--form" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="consultation-title" aria-describedby="consultation-description">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close consultation dialog"><X /></button>
        {submissionState.status === 'success' ? (
          <div className="modal-success" role="status">
            <span><CheckCircle2 /></span>
            <p className="eyebrow">Enquiry Received</p>
            <h2 id="consultation-title">Thank You for Your Enquiry</h2>
            <p id="consultation-description">Your enquiry has been received successfully. The firm will review the information provided and contact you regarding the appropriate next steps.</p>
            <button className="button button--whatsapp" type="button" onClick={() => openWhatsApp(buildWhatsAppConsultationMessage(submittedData))}><MessageCircle size={18} />Continue via WhatsApp</button>
          </div>
        ) : (
          <>
            <div className="modal-form-header">
              <p className="eyebrow">Initial Consultation Enquiry</p>
              <h2 id="consultation-title">Request a Professional Consultation</h2>
              <p id="consultation-description">Please provide a brief overview of the assistance you require. Your enquiry will be reviewed and the firm will contact you to discuss the matter and appropriate next steps.</p>
            </div>
            <form ref={formRef} className="consultation-form" onSubmit={handleEmail} onInput={clearFieldError} onChange={clearFieldError} noValidate>
              <div className="modal-form-grid">
                <label htmlFor="consult-name">Full Name<input id="consult-name" name="name" autoComplete="name" maxLength="100" required {...a11yFor('name')} />{errorFor('name')}</label>
                <label htmlFor="consult-email">Email Address<input id="consult-email" name="email" type="email" autoComplete="email" maxLength="254" required {...a11yFor('email')} />{errorFor('email')}</label>
                <label htmlFor="consult-phone">Contact Number<input id="consult-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength="30" placeholder="+92 300 0000000" required {...a11yFor('phone')} />{errorFor('phone')}</label>
                <label htmlFor="consult-service">Service Required<select id="consult-service" name="service" defaultValue="" required {...a11yFor('service')}><option value="" disabled>Select the service relevant to your requirement</option>{professionalServices.map((service) => <option key={service} value={service}>{service}</option>)}</select>{errorFor('service')}</label>
                <label className="modal-field-wide" htmlFor="consult-message">Brief Description of Requirement<textarea id="consult-message" name="message" rows="4" maxLength="3000" placeholder="Please provide a brief overview of the matter and the professional assistance you require." required {...a11yFor('message')} />{errorFor('message')}</label>
              </div>
              <p className="request-disclaimer"><ShieldCheck size={15} />Consultation arrangements will be confirmed separately following review of your requirements.</p>
              <div className="modal-actions"><button className="button button--navy" type="submit" disabled={submissionState.status === 'loading'}><Send size={16} />{submissionState.status === 'loading' ? 'Submitting Enquiry...' : 'Submit Enquiry'}</button><button className="button button--whatsapp" type="button" onClick={handleWhatsApp} disabled={submissionState.status === 'loading'}><MessageCircle size={17} />Continue via WhatsApp</button></div>
              {submissionState.message && <p className={`form-notice form-notice--${submissionState.status}`} role={submissionState.status === 'error' ? 'alert' : 'status'}>{submissionState.message}</p>}
              <p className="modal-privacy"><Mail size={14} />Information submitted will be used to review and respond to your enquiry. The scope of professional services will be discussed and agreed separately.</p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
