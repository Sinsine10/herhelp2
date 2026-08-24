export type ActionStep = {
  title: string;
  body: string;
};

export type Incident = {
  id: string;
  title: string;
  summary: string;
  featured?: boolean;
  steps: ActionStep[];
};

export const incidents: Incident[] = [
  {
    id: "physical-assault",
    title: "Physical assault",
    summary: "Someone hurt you physically — hitting, kicking, burning, or using a weapon.",
    featured: true,
    steps: [
      {
        title: "Get to a safe place",
        body: "Move away from the person who hurt you. Go to a neighbour, relative, public place, or police station.",
      },
      {
        title: "Get medical care",
        body: "Visit the nearest hospital or health centre even if injuries look small. Ask for a medical certificate — it is free and can be used as evidence later.",
      },
      {
        title: "Keep evidence",
        body: "Photograph injuries and damaged clothing. Keep torn clothes unwashed in a bag.",
      },
      {
        title: "Report if you choose",
        body: "You can report to the police (991) at any time. You are allowed to bring a trusted person with you.",
      },
      {
        title: "Ask for support",
        body: "Use Find Help to reach a women's organisation, counsellor, or free legal aid.",
      },
    ],
  },
  {
    id: "sexual-assault",
    title: "Sexual assault",
    summary: "Any sexual act done to you without your consent, including rape and attempted rape.",
    featured: true,
    steps: [
      {
        title: "Go somewhere safe",
        body: "Leave the person and place if you can. Ask a trusted person to stay with you.",
      },
      {
        title: "Seek medical care quickly",
        body: "Go to a hospital or clinic as soon as you can, ideally within 72 hours. You can ask for emergency contraception, HIV prevention, and treatment for injuries.",
      },
      {
        title: "Do not wash if you can wait",
        body: "If you are going for a medical exam, try not to bathe or wash clothes first. Bring a change of clothes.",
      },
      {
        title: "You choose whether to report",
        body: "Reporting is your decision. Police 991 can take a statement. You may bring someone you trust.",
      },
      {
        title: "Get counselling and legal help",
        body: "Use Find Help for counselling, shelters, and free legal aid through organisations such as EWLA.",
      },
    ],
  },
  {
    id: "domestic-violence",
    title: "Domestic violence",
    summary: "Abuse by a husband, partner, or family member — physical, sexual, emotional, or economic.",
    featured: true,
    steps: [
      {
        title: "Protect yourself and children",
        body: "If you are in danger now, leave with children if you can and call 991. Go to a neighbour, relative, or shelter.",
      },
      {
        title: "Plan a safe exit",
        body: "Keep important documents, a small amount of money, and a packed bag with someone you trust if it is safe to do so.",
      },
      {
        title: "Record what is happening",
        body: "Note dates, injuries, and threats when you can do so safely. Photos and medical certificates help later.",
      },
      {
        title: "Know your options",
        body: "You can ask police for protection and you can seek a court order. You do not need your partner's permission.",
      },
      {
        title: "Reach support",
        body: "Find Help lists shelters, counselling, and free legal aid. You are not required to stay in an abusive home.",
      },
    ],
  },
  {
    id: "harassment",
    title: "Harassment",
    summary: "Unwanted sexual comments, touching, or pressure — at work, school, or in public.",
    featured: true,
    steps: [
      {
        title: "Get out of the situation",
        body: "Move to a public place or toward people you trust. You do not have to be polite if you feel unsafe.",
      },
      {
        title: "Tell someone",
        body: "Report it to a supervisor, school office, or a trusted colleague. Ask that it be written down.",
      },
      {
        title: "Keep records",
        body: "Save messages, note dates, and write what was said or done. Screenshots help.",
      },
      {
        title: "It is unlawful",
        body: "Sexual harassment at work or school is against Ethiopian law. Employers and schools must respond.",
      },
      {
        title: "Get advice",
        body: "Use Learn for your rights and Find Help for legal aid if the organisation does not act.",
      },
    ],
  },
  {
    id: "stalking",
    title: "Stalking",
    summary: "Someone repeatedly follows, watches, waits for, or contacts you and it frightens you.",
    steps: [
      {
        title: "Do not engage if it feels unsafe",
        body: "You do not have to answer calls, messages, or confront the person alone.",
      },
      {
        title: "Change routines when you can",
        body: "Use different routes, travel with someone, and tell a trusted person where you are going.",
      },
      {
        title: "Save evidence",
        body: "Keep messages, call logs, photos, and notes of times they appeared.",
      },
      {
        title: "Tell police if you are afraid",
        body: "Call 991. Repeated following and threats can be reported even if they have not hit you yet.",
      },
      {
        title: "Ask for support",
        body: "Find Help can connect you to police women's units and legal aid.",
      },
    ],
  },
  {
    id: "threats",
    title: "Threats",
    summary: "Someone threatened to hurt you, your children, or your family.",
    steps: [
      {
        title: "Take threats seriously",
        body: "Move to a safe place and tell someone you trust what was said.",
      },
      {
        title: "Call for help if you are in danger",
        body: "Call Police 991. Keep the line open if you cannot speak.",
      },
      {
        title: "Write it down",
        body: "Record the words, time, place, and any witnesses as soon as you are safe.",
      },
      {
        title: "Protect children",
        body: "If children were threatened, child protection helpline 952 can also be used.",
      },
      {
        title: "Get legal advice",
        body: "Threats can be reported. Find Help lists free legal aid.",
      },
    ],
  },
  {
    id: "online-abuse",
    title: "Online abuse",
    summary: "Threats, blackmail, sharing of your private images, or harassment on the internet.",
    steps: [
      {
        title: "Do not pay or send more images",
        body: "Blackmailers often ask for money or more photos. Stop contact and tell someone you trust.",
      },
      {
        title: "Keep the messages",
        body: "Screenshot accounts, numbers, and threats before blocking. Do not delete everything.",
      },
      {
        title: "Lock down accounts",
        body: "Change passwords, turn on two-factor authentication, and review who can see your posts.",
      },
      {
        title: "Report it",
        body: "Report the account on the platform and, if you are threatened, call 991 or use Find Help.",
      },
      {
        title: "You are not at fault",
        body: "Sharing private images without consent is abuse. Learn has a guide on staying safe online.",
      },
    ],
  },
  {
    id: "child-abuse",
    title: "Child abuse",
    summary: "A child is being harmed physically, sexually, emotionally, or through neglect.",
    steps: [
      {
        title: "If the child is in danger now",
        body: "Call Police 991 or Child Protection Helpline 952. Get the child to a safe adult or hospital.",
      },
      {
        title: "Believe the child",
        body: "Listen calmly. Do not blame them or force them to retell everything many times.",
      },
      {
        title: "Get medical care",
        body: "Take the child to a hospital or clinic. Ask for documentation of injuries.",
      },
      {
        title: "Report to protection services",
        body: "Women and Children Affairs and the police women's and children unit can act.",
      },
      {
        title: "Find specialised help",
        body: "Use Find Help and filter Child protection for verified services.",
      },
    ],
  },
  {
    id: "other",
    title: "Other unsafe situation",
    summary: "Something else happened and you are not sure what to do.",
    steps: [
      {
        title: "If you are in danger now",
        body: "Call Police 991. If you cannot speak, keep the line open and move toward other people.",
      },
      {
        title: "Get to safety first",
        body: "Leave the place if you can. Ask a neighbour, relative, or public worker for help.",
      },
      {
        title: "You do not need the perfect words",
        body: "Tell someone what happened in your own language. You will not be turned away for being unsure.",
      },
      {
        title: "Look at the closest incident type",
        body: "If any list item is close, open it for steps. You can also browse Find Help.",
      },
      {
        title: "Ask a verified service",
        body: "Counselling and legal aid organisations can help you decide next steps without forcing you to report.",
      },
    ],
  },
];

export function getIncident(id: string) {
  return incidents.find((item) => item.id === id);
}

export const featuredIncidents = incidents.filter((item) => item.featured);
