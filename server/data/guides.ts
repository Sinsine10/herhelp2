export type GuideCategory =
  | "All"
  | "Women's rights"
  | "Abuse awareness"
  | "Domestic violence"
  | "Sexual violence"
  | "Online safety"
  | "Personal safety";

export type Guide = {
  id: string;
  category: Exclude<GuideCategory, "All">;
  title: string;
  summary: string;
  intro: string;
  heading?: string;
  bullets: string[];
  footer: string;
};

export const guideCategories: GuideCategory[] = [
  "All",
  "Women's rights",
  "Abuse awareness",
  "Domestic violence",
  "Sexual violence",
  "Online safety",
  "Personal safety",
];

export const guides: Guide[] = [
  {
    id: "ethiopian-law",
    category: "Women's rights",
    title: "Your rights under Ethiopian law",
    summary: "A plain-language summary of the protections that apply to women and girls in Ethiopia.",
    intro:
      "The Constitution guarantees women equal rights with men in marriage, property, employment, and access to justice.",
    heading: "Key protections:",
    bullets: [
      "Marriage requires the free and full consent of both people. Forced marriage is a crime.",
      "Rape, abduction, and female genital mutilation are criminal offences.",
      "Sexual harassment at work or school is unlawful and employers must respond to complaints.",
      "Married women have equal rights to family property and to custody decisions based on the child's best interest.",
      "You have the right to report a crime, to be accompanied by a person you trust, and to a free medical certificate documenting injuries.",
    ],
    footer: "You do not need money or a lawyer to start a case. Free legal aid organisations can act for you.",
  },
  {
    id: "recognising-abuse",
    category: "Abuse awareness",
    title: "Recognising abuse",
    summary: "Abuse is not only physical. Learning the patterns makes it easier to name and act on.",
    intro:
      "Abuse can be physical, sexual, emotional, economic, or digital. If someone uses fear, control, or humiliation to limit your freedom, that is abuse.",
    heading: "Warning signs can include:",
    bullets: [
      "Hitting, slapping, choking, or threatening to hurt you or people you love.",
      "Forced sex, unwanted touching, or pressure to send private images.",
      "Insults, isolation from family, checking your phone, or deciding who you may see.",
      "Taking your salary, forbidding work or school, or withholding food and medicine.",
      "You do not have to wait for a severe injury before asking for help.",
    ],
    footer: "Naming what is happening is a first step. Use Something happened for next actions, or Find Help to talk to a verified service.",
  },
  {
    id: "understanding-dv",
    category: "Domestic violence",
    title: "Understanding domestic violence",
    summary: "Why it escalates, and what options exist.",
    intro:
      "Domestic violence is abuse by a husband, partner, or family member. It often gets worse over time, not better, especially after pregnancy, leaving, or asking for help.",
    heading: "What you can do:",
    bullets: [
      "Your safety comes first. Leaving in a crisis and calling 991 is allowed.",
      "Shelters and women's organisations can hide your location from an abuser.",
      "You can seek medical care and a medical certificate without the abuser present.",
      "Police women's and children units are trained to take these cases.",
      "Legal aid can help with protection, divorce, custody, and property without requiring you to face the person alone.",
    ],
    footer: "Staying is not a failure, and leaving is not a crime. You choose the pace.",
  },
  {
    id: "sexual-violence-care",
    category: "Sexual violence",
    title: "Sexual violence and your care options",
    summary: "What medical care is available and why the first 72 hours matter.",
    intro:
      "Sexual violence is any sexual act without your consent. You have a right to medical care whether or not you report to the police.",
    heading: "In the first 72 hours:",
    bullets: [
      "Hospitals and clinics can treat injuries and offer emergency contraception.",
      "HIV prevention medicine may be available if you arrive quickly. Ask the clinician.",
      "A medical certificate documenting injuries can be issued free of charge.",
      "Try not to bathe before an exam if you can wait, but your health still comes first if you already washed.",
      "You may bring a person you trust. You can refuse parts of an exam you do not want.",
    ],
    footer: "Care after 72 hours is still important. Go as soon as you can.",
  },
  {
    id: "online-safety",
    category: "Online safety",
    title: "Staying safe online",
    summary: "Practical steps to protect your accounts, images, and location.",
    intro:
      "Online abuse includes threats, stalking, impersonation, and sharing private images without consent. You can reduce risk without disappearing from the internet.",
    heading: "Practical steps:",
    bullets: [
      "Use a strong password and two-factor authentication on email and social apps.",
      "Turn off location sharing on photos and stories.",
      "Do not send intimate images to someone who pressures you. If images were shared, save evidence and stop contact.",
      "Block and report accounts. Tell a trusted person what is happening.",
      "If you are blackmailed or threatened, call 991 and use Find Help for legal advice.",
    ],
    footer: "The person who shared or threatened you is responsible — not you.",
  },
  {
    id: "personal-safety",
    category: "Personal safety",
    title: "Everyday personal safety",
    summary: "Small habits that lower risk in public, transport, and at work.",
    intro:
      "Safety habits cannot prevent every harm, but they can give you more time and more options.",
    heading: "Habits that help:",
    bullets: [
      "Tell someone your route when travelling, especially at night.",
      "Sit near other passengers on public transport when you can.",
      "Keep emergency numbers 991, 907, and 952 in your phone and on paper.",
      "At work or school, note well-lit exits and people you would ask for help.",
      "Trust discomfort. You can leave a conversation, taxi, or room without explaining.",
    ],
    footer: "If something already happened, go to Something happened or Emergency. These habits are not a test you failed.",
  },
];

export function getGuide(id: string) {
  return guides.find((item) => item.id === id);
}
