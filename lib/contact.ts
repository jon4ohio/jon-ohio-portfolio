export type ContactEmailTemplateOptions = {
  subject?: string;
  body?: string;
};

export function getContactMailtoHref(opts?: ContactEmailTemplateOptions) {
  const subject = encodeURIComponent(opts?.subject ?? "Inquiry — Product Systems / Design Systems");

  const body = encodeURIComponent(
    opts?.body ??
      `Hi John,

I came across your work and would like to connect regarding:

[ ] Hiring opportunity  
[ ] Product / design systems collaboration  
[ ] Advisory / consulting  
[ ] Something else: _______

Context:
- Company / Team:
- Role or Project:
- Timeline:
- Location (if relevant):

Additional notes:
[Optional — links, details, or context]

Best,  
[Your name]
`
  );

  return `mailto:jon4ohio@gmail.com?subject=${subject}&body=${body}`;
}

