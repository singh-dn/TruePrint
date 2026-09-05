export const TURNSTILE_ACTIONS = {
  projectIntake: "project_intake",
  contactEnquiry: "contact_enquiry",
  sourceRequest: "source_request",
  catalogueDownload: "catalogue_download",
} as const;

export type TurnstileAction = (typeof TURNSTILE_ACTIONS)[keyof typeof TURNSTILE_ACTIONS];
