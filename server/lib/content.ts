import { Incident } from "@/models/Incident";
import { HelpService } from "@/models/HelpService";
import { Emergency } from "@/models/Emergency";
import { Guide } from "@/models/Guide";
import { incidents } from "@/data/incidents";
import { helpServices } from "@/data/services";
import { emergencyNumbers } from "@/data/emergencies";
import { guides } from "@/data/guides";

export function publicDoc(doc: { toObject: () => Record<string, unknown> }) {
  const raw = doc.toObject();
  const id = String(raw._id);
  const { _id, __v, ...rest } = raw;
  void _id;
  void __v;
  return { id, ...rest };
}

export async function seedContentIfEmpty() {
  if ((await Incident.countDocuments()) === 0) {
    await Incident.insertMany(
      incidents.map((item, index) => ({
        title: item.title,
        summary: item.summary,
        featured: Boolean(item.featured),
        steps: item.steps,
        sortOrder: index,
      }))
    );
  }

  if ((await HelpService.countDocuments()) === 0) {
    await HelpService.insertMany(
      helpServices.map((item, index) => ({
        name: item.name,
        category: item.category,
        description: item.description,
        area: item.area,
        hours: item.hours,
        phone: item.phone,
        verified: item.verified,
        sortOrder: index,
      }))
    );
  }

  if ((await Emergency.countDocuments()) === 0) {
    await Emergency.insertMany(
      emergencyNumbers.map((item, index) => ({
        name: item.name,
        description: item.description,
        number: item.number,
        sortOrder: index,
      }))
    );
  }

  if ((await Guide.countDocuments()) === 0) {
    await Guide.insertMany(
      guides.map((item, index) => ({
        category: item.category,
        title: item.title,
        summary: item.summary,
        intro: item.intro,
        heading: item.heading ?? "",
        bullets: item.bullets,
        footer: item.footer,
        sortOrder: index,
      }))
    );
  }
}

export async function loadAllContent() {
  await seedContentIfEmpty();
  const [incidentDocs, serviceDocs, emergencyDocs, guideDocs] = await Promise.all([
    Incident.find().sort({ sortOrder: 1, createdAt: 1 }),
    HelpService.find().sort({ sortOrder: 1, createdAt: 1 }),
    Emergency.find().sort({ sortOrder: 1, createdAt: 1 }),
    Guide.find().sort({ sortOrder: 1, createdAt: 1 }),
  ]);

  return {
    incidents: incidentDocs.map(publicDoc),
    services: serviceDocs.map(publicDoc),
    emergencies: emergencyDocs.map(publicDoc),
    guides: guideDocs.map(publicDoc),
  };
}
