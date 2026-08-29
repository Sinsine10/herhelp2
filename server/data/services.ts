export type ServiceCategory =
  | "All"
  | "Child protection"
  | "Clinic"
  | "Counselling"
  | "Hospital"
  | "Legal aid"
  | "Police"
  | "Shelter";

export type HelpService = {
  id: string;
  name: string;
  category: Exclude<ServiceCategory, "All">;
  description: string;
  area: string;
  hours: string;
  phone: string;
  verified: boolean;
};

export const serviceCategories: ServiceCategory[] = [
  "All",
  "Child protection",
  "Clinic",
  "Counselling",
  "Hospital",
  "Legal aid",
  "Police",
  "Shelter",
];

export const helpServices: HelpService[] = [
  {
    id: "aawca",
    name: "Addis Ababa Police Women and Children Affairs Unit",
    category: "Police",
    description: "Special unit handling cases of violence against women and children",
    area: "Kirkos Sub-city, Addis Ababa",
    hours: "24 hours",
    phone: "991",
    verified: true,
  },
  {
    id: "awsad",
    name: "Association for Women's Sanctuary and Development (AWSAD)",
    category: "Shelter",
    description: "Safe shelter and recovery support for women and girls escaping violence",
    area: "Addis Ababa",
    hours: "24 hours",
    phone: "+251114701102",
    verified: true,
  },
  {
    id: "ewla",
    name: "Ethiopian Women Lawyers Association (EWLA)",
    category: "Legal aid",
    description: "Free legal advice and representation for women and girls",
    area: "Addis Ababa",
    hours: "Mon-Fri, 8:30-17:00",
    phone: "+251115504162",
    verified: true,
  },
  {
    id: "gandhi",
    name: "Gandhi Memorial Hospital",
    category: "Clinic",
    description: "Maternity and emergency medical care, including after sexual violence",
    area: "Addis Ababa",
    hours: "24 hours",
    phone: "+25111560396",
    verified: true,
  },
  {
    id: "childline",
    name: "Child Protection Helpline",
    category: "Child protection",
    description: "Report abuse or danger to a child and get guidance on next steps",
    area: "Nationwide",
    hours: "24 hours",
    phone: "952",
    verified: true,
  },
  {
    id: "wca",
    name: "Women and Children Affairs Hotline",
    category: "Counselling",
    description: "Support for women and children facing violence",
    area: "Nationwide",
    hours: "24 hours",
    phone: "6511",
    verified: true,
  },
];
