// Editorial starter content. Review and approve before production publication.
export const insightCategories = [
  'Tax Updates', 'Audit & Assurance', 'Financial Reporting',
  'Corporate Governance', 'Regulatory Compliance', 'Financial Management',
];

export const insights = [
  {
    slug: 'tax-compliance-checklist', category: 'Tax Updates',
    title: 'A practical tax compliance checklist for businesses',
    summary: 'Build a reliable tax calendar and keep records ready for filing, reconciliation and review.',
    sections: [
      { title: 'Start with your obligations', paragraphs: ['Identify the taxes and filings relevant to the entity, its activities and the jurisdictions in which it operates. Maintain a compliance calendar with a responsible person and an internal review date for each obligation.'] },
      { title: 'Reconcile before filing', paragraphs: ['Compare tax records with the general ledger, bank statements, invoices and withholding records. Investigate differences instead of carrying unexplained balances forward.'], bullets: ['Retain supporting documents and filing acknowledgements.', 'Review withholding obligations and reconcile payments.', 'Track notices and outstanding matters in a central register.'] },
      { title: 'Monitor changes in requirements', paragraphs: ['Confirm applicable rates, deadlines, exemptions and reporting requirements against current official publications before acting. Avoid relying on outdated templates or prior-year assumptions.'] },
    ],
  },
  {
    slug: 'audit-readiness', category: 'Audit & Assurance',
    title: 'How to prepare your business for an external audit',
    summary: 'A structured approach to preparing reconciliations, documentation and management schedules.',
    sections: [
      { title: 'Prepare a reliable financial close', paragraphs: ['Complete the year-end close, reconcile control accounts, review outstanding items and document significant accounting estimates. Ensure that schedules agree to the trial balance.'] },
      { title: 'Organise audit evidence', paragraphs: ['Nominate a coordinator and assemble supporting records before the engagement begins. A clear document index helps the team respond to requests efficiently.'], bullets: ['Bank reconciliations and statements.', 'Receivables, payables and inventory schedules.', 'Fixed asset registers and significant contracts.', 'Minutes and relevant approvals.'] },
      { title: 'Address issues early', paragraphs: ['Discuss unusual transactions, material judgments and potential reporting issues with the appropriate professionals. Management remains responsible for the financial statements; the auditor independently determines the nature and extent of audit procedures.'] },
    ],
  },
  {
    slug: 'financial-reporting-quality', category: 'Financial Reporting',
    title: 'Improving the quality of financial reporting',
    summary: 'Strengthen accounting policies, reconciliations and management review to support better decisions.',
    sections: [
      { title: 'Identify the applicable framework', paragraphs: ['Determine the financial reporting framework applicable to the entity and maintain consistent accounting policies. Document judgments and review changes when circumstances or applicable requirements evolve.'] },
      { title: 'Create a disciplined monthly close', paragraphs: ['Assign responsibilities and deadlines for reconciliations, accruals, review of unusual entries and preparation of management reports. Retain evidence of review.'], bullets: ['Reconcile key asset and liability balances.', 'Review estimates, cut-off and supporting records.', 'Explain significant variances against budget and prior periods.'] },
      { title: 'Make reporting useful', paragraphs: ['Combine financial results with relevant operational indicators and cash flow information. Clear reporting should help decision-makers understand performance, risks and the actions required.'] },
    ],
  },
  {
    slug: 'internal-controls-governance', category: 'Corporate Governance',
    title: 'Practical foundations of effective internal controls',
    summary: 'Practical governance and control measures that support accountability and risk management.',
    sections: [
      { title: 'Assign clear accountability', paragraphs: ['Define approval authority, reporting responsibilities and escalation procedures. Establish appropriate segregation of duties, or compensating review controls where staffing is limited.'] },
      { title: 'Design controls around risk', paragraphs: ['Identify material risks in procurement, revenue, payroll, cash and information systems. Select controls that directly address those risks.'], bullets: ['Document authorisation and approval requirements.', 'Restrict access to systems and sensitive data.', 'Perform independent reconciliations and reviews.'] },
      { title: 'Monitor and improve', paragraphs: ['Track control failures and corrective actions with owners and target dates. Reassess control design when processes, systems or business risks change.'] },
    ],
  },
  {
    slug: 'regulatory-compliance-register', category: 'Regulatory Compliance',
    title: 'Building a practical regulatory compliance register',
    summary: 'Organise regulatory obligations, ownership, evidence and follow-up in one place.',
    sections: [
      { title: 'Map the requirements', paragraphs: ['List the regulators, licences, registrations and reporting obligations relevant to the organisation. Confirm applicability using current official requirements and appropriate professional advice.'] },
      { title: 'Make ownership visible', paragraphs: ['A useful register records the requirement, source, due date, responsible owner, reviewer, evidence and current status. Establish escalation procedures for missed or approaching deadlines.'], bullets: ['Record submission acknowledgements.', 'Monitor changes to licences and obligations.', 'Track correspondence and corrective actions.'] },
      { title: 'Review regularly', paragraphs: ['Review the register periodically and after significant changes in business activity. A register supports accountability but does not replace a detailed assessment of compliance.'] },
    ],
  },
  {
    slug: 'cash-flow-management', category: 'Financial Management',
    title: 'Cash flow management for growing businesses',
    summary: 'Use cash forecasts, working capital reviews and scenario planning to manage liquidity.',
    sections: [
      { title: 'Understand the timing of cash', paragraphs: ['Profit and cash are different measures. Prepare a rolling cash flow forecast that reflects expected receipts, supplier payments, payroll, tax payments and financing commitments.'] },
      { title: 'Manage working capital actively', paragraphs: ['Review customer collections, inventory levels and supplier terms to identify cash tied up in operations. Assign responsibility for overdue balances and investigate recurring delays.'], bullets: ['Monitor receivables ageing and collection performance.', 'Review inventory turnover and purchasing commitments.', 'Regularly compare forecast cash flows with actual results.'] },
      { title: 'Prepare for uncertainty', paragraphs: ['Model a reasonable base case and downside scenarios. Identify actions that can be taken if collections slow or expenses increase, and review funding needs before a cash shortfall occurs.'] },
    ],
  },
];
