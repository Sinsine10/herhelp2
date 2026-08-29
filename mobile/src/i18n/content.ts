import type { EmergencyNumber, Guide, HelpService, Incident } from "../api";
import type { Locale } from "./ui";

type IncidentT = { title: string; summary: string; steps: { title: string; body: string }[] };
type ServiceT = { name?: string; category?: string; description?: string };
type EmergencyT = { name: string; description: string };
type GuideT = {
  category?: string;
  title: string;
  summary: string;
  intro: string;
  heading?: string;
  bullets: string[];
  footer: string;
};

const incidents: Record<string, Partial<Record<Locale, IncidentT>>> = {
  "Physical assault": {
    am: {
      title: "አካላዊ ጥቃት",
      summary: "አካልዎን በመምታት፣ በመርገጥ፣ በማቃጠል ወይም በጦር መሣሪያ ጎድተውዎታል።",
      steps: [
        { title: "ወደ ደህና ቦታ ይሂዱ", body: "ከጎዳዎት ሰው ይራቁ። ወደ ጎረቤት፣ ዘመድ፣ የህዝብ ቦታ ወይም የፖሊስ ጣቢያ ይሂዱ።" },
        { title: "ሕክምና ያግኙ", body: "ቁስሉ ትንሽ ቢመስልም ወደ ቅርብ ሆስፒታል ይሂዱ። የሕክምና ማስረጃ ይጠይቁ — ነፃ ነውና በኋላ ማስረጃ ሊሆን ይችላል።" },
        { title: "ማስረጃ ይያዙ", body: "ቁስልና የተበላሸ ልብስ ፎቶ ያንሱ። የተቀደደ ልብስ ሳይታጠብ በከረጢት ያስቀምጡ።" },
        { title: "መዘገብ ከፈለጉ", body: "በማንኛውም ጊዜ ለፖሊስ (991) ሪፖርት ማድረግ ይችላሉ። የሚያምኑትን ሰው መውሰድ ይፈቀዳል።" },
        { title: "ድጋፍ ይጠይቁ", body: "የሴቶች ድርጅት፣ አማካሪ ወይም ነፃ የህግ እርዳታ ለማግኘት እርዳታ ፈልግን ይጠቀሙ።" },
      ],
    },
    om: {
      title: "Miidhaa qaamaa",
      summary: "Qaama keessan reebuun, dhiitun, gubuun ykn meeshaa waraanaatiin miidhanii jiru.",
      steps: [
        { title: "Bakka nagaatti deemi", body: "Nama si miidhe irraa fagaadhu. Ollaa, fira, bakka ummataa ykn poolisii dhaqi." },
        { title: "Yaala argadhu", body: "Madaa xiqqaa yoo fakkaateyyuu hospitaala dhihoo dhaqi. Waraqaa yaalaa gaafadhu — bilisummaadha, ragaa ta'uu danda'a." },
        { title: "Ragaa kuusi", body: "Madaa fi uffata caccabe suuraa kaasi. Uffata caccabe hin dhiqatin qabsiisi." },
        { title: "Yoo gabaasu filatte", body: "Yeroo kamiyyuu poolisii (991) gabaasuu dandeessa. Nama amantuun siin dhufuu ni danda'a." },
        { title: "Deeggarsa gaafadhu", body: "Dhaabbata dubartootaa, gorsaa ykn gargaarsa seeraa bilisaa argachuuf Gargaarsa barbaadi fayyadami." },
      ],
    },
    ti: {
      title: "ኣካላዊ መጥቃዕቲ",
      summary: "ብምህራም፣ ብምምላኽ፣ ብምንዳድ ወይ ብኣጽዋር ኣካልኩም ጎዲኦም።",
      steps: [
        { title: "ናብ ደሓን ቦታ ኺዱ", body: "ካብ ዝጎድኦም ሰብ ርሓቑ። ናብ ጎረቤት፣ ዘመድ፣ ህዝባዊ ቦታ ወይ ፖሊስ ኺዱ።" },
        { title: "ሕክምና ርኸቡ", body: "ቁስሊ ንእሽቶ እንተመሰለ እውን ናብ ቀረባ ሆስፒታል ኺዱ። ናይ ሕክምና መርትዖ ሕተቱ — ንጹህ እዩ።" },
        { title: "መርትዖ ሓዙ", body: "ቁስልን ዝተበላሸወ ክዳውንቲ ስእሊ ውሰዱ። ዝተቐድደ ክዳን ከይተሓጽበ ኣብ ቦርሳ ኣቐምጡ።" },
        { title: "ምዝገባ እንተደሊኹም", body: "ንፖሊስ (991) ክትሕብሩ ትኽእሉ። እትኣምንዎ ሰብ ምምጻእ ይፍቀድ።" },
        { title: "ደገፍ ሕተቱ", body: "ንማሕበር ደቂ ኣንስትዮ፣ ኣማኸርቲ ወይ ንጹህ ሕጋዊ ሓገዝ ሓገዝ ድለዩ ተጠቐሙ።" },
      ],
    },
  },
  "Sexual assault": {
    am: {
      title: "የወሲብ ጥቃት",
      summary: "ያለ ፈቃድዎ የተፈጸመ ማንኛውም የወሲብ ተግባር፣ አስገድዶ መድፈርን ጨምሮ።",
      steps: [
        { title: "ወደ ደህና ቦታ ይሂዱ", body: "ከሰውዬውና ከቦታው ይውጡ። የሚያምኑት ሰው ከእርስዎ ጋር ይቆይ።" },
        { title: "በፍጥነት ሕክምና ያግኙ", body: "በተለይ በ72 ሰዓት ውስጥ ሆስፒታል ይሂዱ። የድንገተኛ እርግዝና መከላከያና የኤችአይቪ መከላከያ መጠየቅ ይችላሉ።" },
        { title: "መታጠብ ከቻሉ ይጠብቁ", body: "ለምርመራ ከሄዱ በፊት ላለመታጠብ ይሞክሩ። የሚቀይሩት ልብስ ይዘው ይሂዱ።" },
        { title: "ሪፖርት የእርስዎ ውሳኔ ነው", body: "991 መግለጫ ሊቀበል ይችላል። የሚያምኑትን ሰው መውሰድ ይችላሉ።" },
        { title: "ምክርና የህግ እርዳታ", body: "ለምክር፣ መጠለያና ነፃ የህግ እርዳታ እርዳታ ፈልግን ይጠቀሙ።" },
      ],
    },
    om: {
      title: "Miidhaa saalaa",
      summary: "Hayyama keessan malee gocha saalaa kamiyyuu, gudeeduu dabalatee.",
      steps: [
        { title: "Bakka nagaatti deemi", body: "Namaa fi bakka sana irraa bahu. Nama amantan sii waliin haa turu." },
        { title: "Dafee yaala argadhu", body: "Yoo danda'ame sa'aatii 72 keessatti hospitaala dhaqi. Ittisa ulfaa fi HIV gaafachuu dandeessa." },
        { title: "Dhiqachuu yoo dandeesse eegi", body: "Qorannoo dura hin dhiqatin. Uffata jijjiirraa fudhadhu." },
        { title: "Gabaasuun filannoo keeti", body: "991 himannaa fudhachuu danda'a. Nama amantan fudhachuu ni dandeessa." },
        { title: "Gorsaa fi seera", body: "Gorsaa, mana dhokannaa fi gargaarsa seeraa bilisaaf Gargaarsa barbaadi fayyadami." },
      ],
    },
    ti: {
      title: "ጾታዊ መጥቃዕቲ",
      summary: "ብዘይ ፍቓድኩም ዝተፈጸመ ዝኾነ ጾታዊ ተግባር፣ መድፈርን ሓዊሱ።",
      steps: [
        { title: "ናብ ደሓን ቦታ ኺዱ", body: "ካብቲ ሰብን ቦታን ውጹ። እትኣምንዎ ሰብ ምሳኹም ይጽናሕ።" },
        { title: "ቀልጢፍኩም ሕክምና ርኸቡ", body: "ኣብ 72 ሰዓታት ናብ ሆስፒታል ኺዱ። መከላኸሊ ጥንስን ኤችኣይቪን ክትሕቱ ትኽእሉ።" },
        { title: "ምሕጻብ እንተከኣለ ተጸበዩ", body: "ቅድሚ መርመራ ከይትሕጸቡ ፈትኑ። ዝትቅይርዎ ክዳን ውሰዱ።" },
        { title: "ምሕባር ናትኩም ውሳነ እዩ", body: "991 መግለጺ ክወስድ ይኽእል። እትኣምንዎ ሰብ ከተምጽኡ ትኽእሉ።" },
        { title: "ምኽርን ሕጋዊ ሓገዝን", body: "ንምኽሪ፣ መዕቆብን ንጹህ ሕጋዊ ሓገዝን ሓገዝ ድለዩ ተጠቐሙ።" },
      ],
    },
  },
  "Domestic violence": {
    am: {
      title: "የቤት ውስጥ ግፍ",
      summary: "በባል፣ በአጋር ወይም በቤተሰብ የሚደርስ አካላዊ፣ የወሲብ፣ ስሜታዊ ወይም ኢኮኖሚያዊ ግፍ።",
      steps: [
        { title: "እርስዎንና ልጆችን ይጠብቁ", body: "አሁን አደጋ ላይ ከሆኑ ከልጆች ጋር ይውጡና 991 ይደውሉ።" },
        { title: "ደህንነቱ የተጠበቀ መውጫ ያቅዱ", body: "ሰነዶች፣ ትንሽ ገንዘብና ቦርሳ ከሚያምኑት ጋር ያስቀምጡ።" },
        { title: "የሚሆነውን ይመዝግቡ", body: "ቀን፣ ቁስልና ማስፈራሪያ በደህና ሲሆን ይጻፉ።" },
        { title: "አማራጮችዎን ይወቁ", body: "ከፖሊስ ጥበቃ መጠየቅ ይችላሉ። የባለቤት ፈቃድ አያስፈልግም።" },
        { title: "ድጋፍ ያግኙ", body: "መጠለያ፣ ምክርና ነፃ የህግ እርዳታ በእርዳታ ፈልግ አሉ።" },
      ],
    },
    om: {
      title: "Jibba mana keessaa",
      summary: "Abbaa manaa, hiriyyaa ykn maatii irraa miidhaa qaamaa, saalaa, miiraa ykn dinagdee.",
      steps: [
        { title: "Ofii fi daa'imman eegi", body: "Amma balaa keessa yoo jirtan daa'imman waliin bahuunii 991 bilbilaa." },
        { title: "Ba'iinsa nagaadhaan karoorfadhu", body: "Sanada, maallaqa xiqqaa fi boorsaa nama amantan biratti kuusi." },
        { title: "Waan ta'u galmeessi", body: "Guyyaa, madaa fi sodaachisaa yeroo nagaatti barreessi." },
        { title: "Filannoo kee beeki", body: "Poolisii irraa eegumsa gaafachuu dandeessa. Hayyama hiriyyaa hin barbaachisu." },
        { title: "Deeggarsa argadhu", body: "Mana dhokannaa, gorsaa fi gargaarsa seeraa Gargaarsa barbaadi keessa jiru." },
      ],
    },
    ti: {
      title: "ኣብ ቤት ዝፍጸም ግፍዒ",
      summary: "ካብ በዓል ቤት፣ መሓዛ ወይ ስድራ ቤት ዝመጽእ ኣካላዊ፣ ጾታዊ፣ ስምዒታዊ ወይ ቁጠባዊ ግፍዒ።",
      steps: [
        { title: "ንርእስኹምን ቆልዑን ሓልዩ", body: "ሕጂ ኣብ ሓደጋ እንተኾንኩም ምስ ቆልዑ ውጹ እሞ 991 ደውሉ።" },
        { title: "ደሓን መውጽኢ ኣዳልዩ", body: "ሰነዳት፣ ውሑድ ገንዘብን ቦርሳን ምስ እትኣምንዎ ኣቐምጡ።" },
        { title: "ዝኸውን ጽሓፉ", body: "ዕለት፣ ቁስልን ስግኣትን ብደሓን ምስ ኾነ ጽሓፉ።" },
        { title: "ኣማራጺታትኩም ፍለጡ", body: "ካብ ፖሊስ ሓለዋ ክትሕቱ ትኽእሉ። ፍቓድ በዓል ቤት ኣየድልን።" },
        { title: "ደገፍ ርኸቡ", body: "መዕቆብ፣ ምኽርን ንጹህ ሕጋዊ ሓገዝን ኣብ ሓገዝ ድለዩ ኣለዉ።" },
      ],
    },
  },
  Harassment: {
    am: {
      title: "ቶችት",
      summary: "ያልተፈለገ የወሲብ አስተያየት፣ መንካት ወይም ጫና — በስራ፣ ትምህርት ቤት ወይም በህዝብ።",
      steps: [
        { title: "ከሁኔታው ይውጡ", body: "ወደ ህዝብ ቦታ ወይም ወደሚያምኑት ሰዎች ይሂዱ።" },
        { title: "ለአንድ ሰው ይንገሩ", body: "ለኃላፊ፣ ለትምህርት ቤት ወይም ለስራ ባልደረባ ይንገሩ። እንዲጻፍ ይጠይቁ።" },
        { title: "መዝገብ ይያዙ", body: "መልዕክቶችን ያስቀምጡ፣ ቀን ይጻፉ።" },
        { title: "ህገወጥ ነው", body: "በስራ ወይም ትምህርት ቤት የወሲብ ቶችት በህግ የተከለከለ ነው።" },
        { title: "ምክር ያግኙ", body: "መብቶችዎን ለመማር ተማርን፣ የህግ እርዳታ ለማግኘት እርዳታ ፈልግን ይጠቀሙ።" },
      ],
    },
    om: {
      title: "Jeequmsa",
      summary: "Yaada saalaa hin barbaadamne, tuquu ykn dhiibbaa — hojii, mana barumsaa ykn ummata keessatti.",
      steps: [
        { title: "Haala sana irraa bahu", body: "Bakka ummataa ykn nama amantan bira deemi." },
        { title: "Namatti himi", body: "Hogganaa, mana barumsaa ykn hiriyyaa hojiitti himi. Akka galmaa'u gaafadhu." },
        { title: "Galmee kuusi", body: "Ergaa kuusi, guyyaa barreessi." },
        { title: "Seeraan dhorkaadha", body: "Jeequmsni saalaa hojii ykn mana barumsaa irratti seeraan dhorkaadha." },
        { title: "Gorsaa argadhu", body: "Mirga keetiif Baradhu, gargaarsa seeraaf Gargaarsa barbaadi fayyadami." },
      ],
    },
    ti: {
      title: "ምጽራፍ",
      summary: "ዘይተደለየ ጾታዊ ርእይቶ፣ ምትንካፍ ወይ ጸቕጢ — ኣብ ስራሕ፣ ቤት ትምህርቲ ወይ ኣብ ህዝቢ።",
      steps: [
        { title: "ካብቲ ኩነታት ውጹ", body: "ናብ ህዝባዊ ቦታ ወይ ናብ እትኣምንዎም ሰባት ኺዱ።" },
        { title: "ንሓደ ሰብ ነግሩ", body: "ንሓላፊ፣ ቤት ትምህርቲ ወይ መሳርሕቲ ነግሩ። ክጽሓፍ ሕተቱ።" },
        { title: "መዝገብ ሓዙ", body: "መልእኽቲ ኣቐምጡ፣ ዕለት ጽሓፉ።" },
        { title: "ሕጊ ይኽልክል", body: "ኣብ ስራሕ ወይ ቤት ትምህርቲ ጾታዊ ምጽራፍ ብሕጊ ክልኩል እዩ።" },
        { title: "ምኽሪ ርኸቡ", body: "ንመሰላት ተማሃር፣ ንሕጋዊ ሓገዝ ሓገዝ ድለዩ ተጠቐሙ።" },
      ],
    },
  },
  Stalking: {
    am: {
      title: "መከታተል",
      summary: "አንድ ሰው በተደጋጋሚ ይከተልዎታል፣ ይጠብቅዎታል ወይም ያናግርዎታልና ያስፈራዎታል።",
      steps: [
        { title: "ደህንነት ከሌለ አትገናኙ", body: "ብቻዎ መጋፈጥ አያስፈልግም።" },
        { title: "መንገድ ይቀይሩ", body: "ከሌላ ሰው ጋር ይጓዙ፣ ለሚያምኑት ይንገሩ።" },
        { title: "ማስረጃ ያስቀምጡ", body: "መልዕክት፣ ጥሪና ፎቶ ያስቀምጡ።" },
        { title: "ፈርተው ከሆነ ለፖሊስ ይንገሩ", body: "991 ይደውሉ። መምታት ባይኖርም መከታተል ሪፖርት ይደረጋል።" },
        { title: "ድጋፍ ይጠይቁ", body: "የሴቶች የፖሊስ ክፍልና የህግ እርዳታ በእርዳታ ፈልግ አሉ።" },
      ],
    },
    om: {
      title: "Hordoffii",
      summary: "Namni tokko irra mirraa si hordofa, si eeggata ykn si qunnama, si sodaachisa.",
      steps: [
        { title: "Nagaadha hin taane yoo ta'e hin qunnamiin", body: "Qofa kee dura dhaabbachuun hin barbaachisu." },
        { title: "Karaa jijjiiri", body: "Nama biraa waliin deemaa, nama amantanitti himi." },
        { title: "Ragaa kuusi", body: "Ergaa, bilbila fi suuraa kuusi." },
        { title: "Yoo sodaatte poolisii himi", body: "991 bilbilaa. Reebuu hin jiraatuyyuu hordoffiin gabaasama." },
        { title: "Deeggarsa gaafadhu", body: "Kutaa dubartootaa poolisii fi gargaarsa seeraa Gargaarsa barbaadi keessa jiru." },
      ],
    },
    ti: {
      title: "ስጉምቲ ምክትታል",
      summary: "ሓደ ሰብ ተደጋጋሚ ይኽተለኩም፣ ይጽበየኩም ወይ ይዛረበኩም እሞ የስግኣኩም።",
      steps: [
        { title: "ደሓን እንተዘይኮይኑ ኣይተራኸቡ", body: "በይንኹም ምቅላስ ኣየድልን።" },
        { title: "መንገዲ ቀይሩ", body: "ምስ ካልእ ሰብ ተጓዓዙ፣ ንእትኣምንዎ ነግሩ።" },
        { title: "መርትዖ ኣቐምጡ", body: "መልእኽቲ፣ ጻውዒትን ስእልን ኣቐምጡ።" },
        { title: "እንተፈሪሕኩም ንፖሊስ ነግሩ", body: "991 ደውሉ። ምህራም እንተዘይህልዉ እውን ምክትታል ይሕበር።" },
        { title: "ደገፍ ሕተቱ", body: "ናይ ደቂ ኣንስትዮ ክፍሊ ፖሊስን ሕጋዊ ሓገዝን ኣብ ሓገዝ ድለዩ ኣለዉ።" },
      ],
    },
  },
  Threats: {
    am: {
      title: "ማስፈራሪያ",
      summary: "እርስዎን፣ ልጆችዎን ወይም ቤተሰብዎን ለመጉዳት ተስፋርተዋል።",
      steps: [
        { title: "በቁም ነገር ይውሰዱት", body: "ወደ ደህና ቦታ ይሂዱና ለሚያምኑት ይንገሩ።" },
        { title: "አደጋ ላይ ከሆኑ ይደውሉ", body: "991 ይደውሉ። መናገር ካልቻሉ መስመሩን ክፈት ያድርጉ።" },
        { title: "ይጻፉ", body: "ቃላት፣ ሰዓት፣ ቦታና ምስክሮች ይመዝግቡ።" },
        { title: "ልጆችን ይጠብቁ", body: "ልጆች ከተስፋሩ 952 መጠቀም ይቻላል።" },
        { title: "የህግ ምክር", body: "ማስፈራሪያ ሪፖርት ይደረጋል። ነፃ የህግ እርዳታ በእርዳታ ፈልግ አለ።" },
      ],
    },
    om: {
      title: "Sodaachisaa",
      summary: "Si, daa'imman kee ykn maatii kee miidhuuf sodaachisaniiru.",
      steps: [
        { title: "Cimsee fudhadhu", body: "Bakka nagaatti deemii nama amantanitti himi." },
        { title: "Balaa keessa yoo jirtan bilbilaa", body: "991 bilbilaa. Dubbachuu yoo hin dandeenye sarara banaa taasisii." },
        { title: "Barreessi", body: "Jechoota, yeroo, bakka fi ragaalee galmeessi." },
        { title: "Daa'imman eegi", body: "Daa'imman yoo sodaachifaman 952 fayyadamuu dandeessa." },
        { title: "Gorsaa seeraa", body: "Sodaachisaan gabaasama. Gargaarsa seeraa Gargaarsa barbaadi keessa jira." },
      ],
    },
    ti: {
      title: "ስግኣት",
      summary: "ንዓኹም፣ ንቆልዑኹም ወይ ንስድራ ቤትኩም ንምጉዳእ ተሰጋጊሮም።",
      steps: [
        { title: "ብኽብደት ውሰድዎ", body: "ናብ ደሓን ቦታ ኺዱ እሞ ንእትኣምንዎ ነግሩ።" },
        { title: "ኣብ ሓደጋ እንተኾንኩም ደውሉ", body: "991 ደውሉ። ምዝራብ እንተዘይከኣለ መስመር ክፉት ግበሩ።" },
        { title: "ጽሓፉ", body: "ቃላት፣ ሰዓት፣ ቦታን ምስክራትን መዝግቡ።" },
        { title: "ቆልዑ ሓልዩ", body: "ቆልዑ እንተተሰጋጊሮም 952 ክትጥቀሙ ትኽእሉ።" },
        { title: "ሕጋዊ ምኽሪ", body: "ስግኣት ይሕበር። ንጹህ ሕጋዊ ሓገዝ ኣብ ሓገዝ ድለዩ ኣሎ።" },
      ],
    },
  },
  "Online abuse": {
    am: {
      title: "የመስመር ላይ ግፍ",
      summary: "ማስፈራሪያ፣ ግልበጣ፣ የግል ምስል ማጋራት ወይም በበይነመረብ ቶችት።",
      steps: [
        { title: "ገንዘብ ወይ ተጨማሪ ምስል አትላኩ", body: "ግንኙነቱን ያቁሙና ለሚያምኑት ይንገሩ።" },
        { title: "መልዕክቶችን ያስቀምጡ", body: "ከመዝጋትዎ በፊት ቅጽበታዊ ምስል ያንሱ።" },
        { title: "መለያዎን ይጠብቁ", body: "የይለፍ ቃል ይቀይሩ፣ ሁለት ደረጃ ማረጋገጫ ያብሩ።" },
        { title: "ሪፖርት ያድርጉ", body: "በመድረኩ ሪፖርት ያድርጉ። ከተስፋሩ 991 ይደውሉ።" },
        { title: "ጥፋተኛ አይደሉም", body: "ያለ ፈቃድ የግል ምስል ማጋራት ግፍ ነው።" },
      ],
    },
    om: {
      title: "Miidhaa interneetii",
      summary: "Sodaachisaa, blackmail, fakkii dhuunfaa qooduu ykn jeequmsa interneetii irratti.",
      steps: [
        { title: "Maallaqa ykn fakkii dabalataa hin ergin", body: "Qunnamtii dhaabi, nama amantanitti himi." },
        { title: "Ergaa kuusi", body: "Cufuu dura screenshot kaasi." },
        { title: "Akaawuntii eegi", body: "Jechaa icciitii jijjiiri, mirkaneessa sadarkaa lamaa bani." },
        { title: "Gabaasi", body: "Platform irratti gabaasi. Yoo sodaachifamtan 991 bilbilaa." },
        { title: "Yakkamummaa hin qabdu", body: "Hayyama malee fakkii dhuunfaa qooduun miidhaadha." },
      ],
    },
    ti: {
      title: "ኣብ መስመር ዝፍጸም ግፍዒ",
      summary: "ስግኣት፣ ግልበጣ፣ ውልቃዊ ስእሊ ምክፋል ወይ ኣብ ኢንተርነት ምጽራፍ።",
      steps: [
        { title: "ገንዘብ ወይ ተወሳኺ ስእሊ ኣይትልኣኹ", body: "ርክብ ኣቋርጹ እሞ ንእትኣምንዎ ነግሩ።" },
        { title: "መልእኽቲ ኣቐምጡ", body: "ቅድሚ ምዕጻው ስክሪንሾት ውሰዱ።" },
        { title: "ሕሳብኩም ሓልዩ", body: "መሕለፊ ቃል ቀይሩ፣ ክልተ ደረጃ ምርግጋጽ ክፈቱ።" },
        { title: "ሕብሩ", body: "ኣብቲ መድረኽ ሕብሩ። እንተተሰጋጊርኩም 991 ደውሉ።" },
        { title: "በደለኛ ኣይኮንኩምን", body: "ብዘይ ፍቓድ ውልቃዊ ስእሊ ምክፋል ግፍዒ እዩ።" },
      ],
    },
  },
  "Child abuse": {
    am: {
      title: "የልጅ ግፍ",
      summary: "ልጅ በአካል፣ በወሲብ፣ በስሜት ወይም በቸልተኝነት እየተጎዳ ነው።",
      steps: [
        { title: "ልጁ አሁን አደጋ ላይ ከሆነ", body: "991 ወይም 952 ይደውሉ። ወደ ደህና አዋቂ ወይም ሆስፒታል ይውሰዱ።" },
        { title: "ልጁን ያምኑ", body: "በረጋ መንፈስ ያዳምጡ። አይውቀሱ፣ ብዙ ጊዜ እንዲናገር አያስገድዱ።" },
        { title: "ሕክምና ያግኙ", body: "ወደ ሆስፒታል ይውሰዱ። የቁስል ማስረጃ ይጠይቁ።" },
        { title: "ለጥበቃ ያሳውቁ", body: "የሴቶችና ህጻናት ጉዳይ እና የፖሊስ የሴቶች ክፍል ሊሰሩ ይችላሉ።" },
        { title: "ልዩ እርዳታ", body: "እርዳታ ፈልግ ውስጥ የልጅ ጥበቃን ያጣሩ።" },
      ],
    },
    om: {
      title: "Miidhaa daa'imaa",
      summary: "Daa'imni qaamaan, saalaan, miiraan ykn tuffachuun miidhamaa jira.",
      steps: [
        { title: "Daa'imni amma balaa keessa yoo jiraate", body: "991 ykn 952 bilbilaa. Nama guddaa nagaadhaa ykn hospitaala geessi." },
        { title: "Daa'ima amani", body: "Tasgabbaa'uun dhaggeeffadhu. Hin balaaleffatin, irra mirraa akka himu hin dirqisiisin." },
        { title: "Yaala argadhu", body: "Hospitaala geessi. Ragaa madaa gaafadhu." },
        { title: "Eegumsaatti himi", body: "Dhimma dubartootaa fi daa'immanii fi kutaa poolisii hojjechuu danda'u." },
        { title: "Gargaarsa addaa", body: "Gargaarsa barbaadi keessatti eegumsa daa'imaa calteessi." },
      ],
    },
    ti: {
      title: "ግፍዒ ቆልዓ",
      summary: "ቆልዓ ብኣካል፣ ብጾታ፣ ብስምዒት ወይ ብዘይምክትታል ይጎድእ ኣሎ።",
      steps: [
        { title: "ቆልዓ ሕጂ ኣብ ሓደጋ እንተኾይኑ", body: "991 ወይ 952 ደውሉ። ናብ ደሓን ዓቢ ወይ ሆስፒታል ውሰዱ።" },
        { title: "ንቆልዓ እመኑ", body: "ብህድኣት ስምዑ። ኣይትውቅሱ፣ ብዙሕ ጊዜ ክዛረብ ኣይትገድዱ።" },
        { title: "ሕክምና ርኸቡ", body: "ናብ ሆስፒታል ውሰዱ። መርትዖ ቁስሊ ሕተቱ።" },
        { title: "ንሓለዋ ሕብሩ", body: "ጉዳይ ደቂ ኣንስትዮን ቆልዑን ከምኡውን ክፍሊ ፖሊስ ክሰርሑ ይኽእሉ።" },
        { title: "ፍሉይ ሓገዝ", body: "ኣብ ሓገዝ ድለዩ ሓለዋ ቆልዓ ኣጽርዩ።" },
      ],
    },
  },
  "Other unsafe situation": {
    am: {
      title: "ሌላ ያልተጠበቀ ሁኔታ",
      summary: "ሌላ ነገር ተፈጽሟልና ምን ማድረግ እንዳለብዎ እርግጠኛ አይደሉም።",
      steps: [
        { title: "አሁን አደጋ ላይ ከሆኑ", body: "991 ይደውሉ። መናገር ካልቻሉ መስመሩን ክፈት ያድርጉ።" },
        { title: "መጀመሪያ ደህንነት", body: "ከቻሉ ከቦታው ይውጡ። እርዳታ ይጠይቁ።" },
        { title: "ፍጹም ቃላት አያስፈልጉም", body: "በቋንቋዎ ይንገሩ። ስለማያውቁ አይባረሩም።" },
        { title: "የቀረበውን አይነት ይመልከቱ", body: "አንዱ ከሁኔታዎ ጋር ቅርብ ከሆነ ይክፈቱት። እርዳታ ፈልግንም ማየት ይችላሉ።" },
        { title: "የተረጋገጠ አገልግሎት ይጠይቁ", body: "ምክርና የህግ እርዳታ ሪፖርት ሳያስገድዱ ሊረዱዎት ይችላሉ።" },
      ],
    },
    om: {
      title: "Haala nageenya hin qabne kan biraa",
      summary: "Wanti biraa ta'e, maal gochuu akka qabdan hin beektan.",
      steps: [
        { title: "Amma balaa keessa yoo jirtan", body: "991 bilbilaa. Dubbachuu yoo hin dandeenye sarara banaa taasisii." },
        { title: "Dura nageenya", body: "Yoo dandeessan bakka sana irraa bahu. Gargaarsa gaafadhaa." },
        { title: "Jechoonni guutuu hin barbaachisan", body: "Afaan keessaniin himaa. Waan hin beekneef hin ari'amtan." },
        { title: "Gosa dhihoo ilaali", body: "Tokko haala keessanitti dhihaate yoo ta'e banaa. Gargaarsa barbaadiis ilaaluu dandeessu." },
        { title: "Tajaajila mirkanaa'e gaafadhu", body: "Gorsaa fi gargaarsa seeraan gabaasuu malee si gargaaruu danda'u." },
      ],
    },
    ti: {
      title: "ካልእ ዘይደሓን ኩነታት",
      summary: "ካልእ ነገር ተፈጺሙ እሞ እንታይ ከም እትገብሩ ኣይትርግጽኩምን።",
      steps: [
        { title: "ሕጂ ኣብ ሓደጋ እንተኾንኩም", body: "991 ደውሉ። ምዝራብ እንተዘይከኣለ መስመር ክፉት ግበሩ።" },
        { title: "መጀመርታ ድሕነት", body: "እንተከኣለ ካብቲ ቦታ ውጹ። ሓገዝ ሕተቱ።" },
        { title: "ፍጹም ቃላት ኣየድልዩን", body: "ብቋንቋኹም ነግሩ። ስለ ዘይትፈልጡ ኣይክትስወሩን።" },
        { title: "ዝቐረበ ዓይነት ርአ", body: "ሓደ ምስ ኩነታትኩም እንተቐረበ ክፈትዎ። ሓገዝ ድለዩ እውን ክትርእዩ ትኽእሉ።" },
        { title: "ዝተረጋገጸ ኣገልግሎት ሕተቱ", body: "ምኽርን ሕጋዊ ሓገዝን ብዘይ ምግዳድ ሪፖርት ክሕግዙኹም ይኽእሉ።" },
      ],
    },
  },
};

const services: Record<string, Partial<Record<Locale, ServiceT>>> = {
  Police: {
    am: { category: "ፖሊስ" },
    om: { category: "Poolisii" },
    ti: { category: "ፖሊስ" },
  },
  Shelter: {
    am: { category: "መጠለያ" },
    om: { category: "Mana dhokannaa" },
    ti: { category: "መዕቆቢ" },
  },
  "Legal aid": {
    am: { category: "የህግ እርዳታ" },
    om: { category: "Gargaarsa seeraa" },
    ti: { category: "ሕጋዊ ሓገዝ" },
  },
  Clinic: {
    am: { category: "ክሊኒክ" },
    om: { category: "Kilinika" },
    ti: { category: "ክሊኒክ" },
  },
  "Child protection": {
    am: { category: "የልጅ ጥበቃ" },
    om: { category: "Eegumsa daa'imaa" },
    ti: { category: "ሓለዋ ቆልዓ" },
  },
  Counselling: {
    am: { category: "ምክር" },
    om: { category: "Gorsaa" },
    ti: { category: "ምኽሪ" },
  },
  Hospital: {
    am: { category: "ሆስፒታል" },
    om: { category: "Hospitaala" },
    ti: { category: "ሆስፒታል" },
  },
};

const emergencies: Record<string, Partial<Record<Locale, EmergencyT>>> = {
  Police: {
    am: { name: "ፖሊስ", description: "የፌዴራል ፖሊስ የአደጋ ጊዜ መስመር" },
    om: { name: "Poolisii", description: "Sarara hatattamaa poolisii federaalaa" },
    ti: { name: "ፖሊስ", description: "ናይ ፌደራል ፖሊስ መስመር ህጹጽ" },
  },
  Ambulance: {
    am: { name: "አምቡላንስ", description: "የድንገተኛ ሕክምና ምላሽ" },
    om: { name: "Ambulaansii", description: "Deebii yaala hatattamaa" },
    ti: { name: "ኣምቡላንስ", description: "ምላሽ ናይ ህጹጽ ሕክምና" },
  },
  "Fire Brigade": {
    am: { name: "የእሳት አደጋ መከላከያ", description: "እሳትና የማዳን አገልግሎት" },
    om: { name: "Tartiiba ibiddaa", description: "Tajaajila ibiddaa fi baraarumsaa" },
    ti: { name: "ኣገልግሎት ሓዊ", description: "ሓዊን ምድሓንን" },
  },
  "Child Protection Helpline": {
    am: { name: "የልጅ ጥበቃ መስመር", description: "በልጅ ላይ ግፍ ወይም አደጋ ሪፖርት ያድርጉ" },
    om: { name: "Sarara eegumsa daa'imaa", description: "Miidhaa ykn balaa daa'imaa gabaasi" },
    ti: { name: "መስመር ሓለዋ ቆልዓ", description: "ግፍዒ ወይ ሓደጋ ኣብ ቆልዓ ሕብሩ" },
  },
  "Women and Children Affairs Hotline": {
    am: { name: "የሴቶችና ህጻናት ጉዳይ መስመር", description: "ለሴቶችና ህጻናት የግፍ ድጋፍ" },
    om: { name: "Sarara dhimma dubartootaa fi daa'immanii", description: "Deeggarsa dubartootaa fi daa'immanii jibba keessa jiran" },
    ti: { name: "መስመር ጉዳይ ደቂ ኣንስትዮን ቆልዑን", description: "ንኣንስትን ቆልዑን ደገፍ ግፍዒ" },
  },
};

const guides: Record<string, Partial<Record<Locale, GuideT>>> = {
  "Your rights under Ethiopian law": {
    am: {
      category: "የሴቶች መብት",
      title: "በኢትዮጵያ ህግ ያሉዎት መብቶች",
      summary: "ለሴቶችና ልጃገረዶች የሚተገበሩ ጥበቃዎች በቀላል ቋንቋ።",
      intro: "ህገ መንግስቱ ሴቶች በጋብቻ፣ ንብረት፣ ስራና ፍትህ ላይ ከወንዶች እኩል መብት እንዳላቸው ያረጋግጣል።",
      heading: "ዋና ጥበቃዎች፦",
      bullets: [
        "ጋብቻ የሁለቱም ሙሉና ነፃ ፈቃድ ይፈልጋል። ግዴታ ጋብቻ ወንጀል ነው።",
        "አስገድዶ መድፈር፣ ጠለፋና ግርዛት የሴት ልጅ ወንጀሎች ናቸው።",
        "በስራ ወይም ትምህርት ቤት የወሲብ ቶችት ህገወጥ ነው።",
        "ያገቡ ሴቶች በቤተሰብ ንብረትና በልጅ እንክብካቤ እኩል መብት አላቸው።",
        "ወንጀል ሪፖርት የማድረግ፣ የሚያምኑትን ሰው የመውሰድና ነፃ የሕክምና ማስረጃ የማግኘት መብት አለዎት።",
      ],
      footer: "ጉዳይ ለመጀመር ገንዘብ ወይም ጠበቃ አያስፈልግም። ነፃ የህግ እርዳታ ድርጅቶች ሊወክሉዎት ይችላሉ።",
    },
    om: {
      category: "Mirga dubartootaa",
      title: "Mirga keessan seera Itoophiyaa jalatti",
      summary: "Eegumsi dubartootaa fi intaloota Itoophiyaa irratti hojjatu, afaan salphaadhaan.",
      intro: "Heeraan dubartoonni gaa'ila, qabeenya, hojii fi haqa irratti dhiira waliin mirga walqixaa qabu.",
      heading: "Eegumsa ijoo:",
      bullets: [
        "Gaa'illi hayyama guutuu lamaanii gaafata. Gaa'illi dirqisiisaa yakkaadha.",
        "Gudeeduu, butuu fi dhagna muraan intalaa yakkaadha.",
        "Jeequmsni saalaa hojii ykn mana barumsaa irratti seeraan dhorkaadha.",
        "Dubartoonni heeruman qabeenya maatii fi eegumsa daa'imaa irratti mirga walqixaa qabu.",
        "Yakka gabaasuu, nama amantan fudhachuu fi waraqaa yaalaa bilisaa argachuu ni dandeessu.",
      ],
      footer: "Himannaa jalqabuuf maallaqa ykn abbaa seeraa hin barbaachisu. Dhaabbileen gargaarsa seeraa bilisaa si bakka bu'uu danda'u.",
    },
    ti: {
      category: "መሰል ደቂ ኣንስትዮ",
      title: "ኣብ ትሕቲ ሕጊ ኢትዮጵያ ዘለኩም መሰላት",
      summary: "ንኣንስትን ጓላትን ዝትግበር ሓለዋ ብቐሊል ቋንቋ።",
      intro: "ህገ መንግስቲ ኣንስቲ ኣብ ሓዳር፣ ንብረት፣ ስራሕን ፍትሕን ምስ ደቂ ተባዕትዮ ማዕረ መሰል ከም ዘለወን የረጋግጽ።",
      heading: "ቀንዲ ሓለዋታት፦",
      bullets: [
        "ሓዳር ናይ ክልቲኦም ምሉእን ንጹህን ፍቓድ የድሊ። ግዴታ ሓዳር ገበን እዩ።",
        "መድፈር፣ ምጥላፍን ግርዛን ጓል ኣንስተይቲ ገበናት እዮም።",
        "ኣብ ስራሕ ወይ ቤት ትምህርቲ ጾታዊ ምጽራፍ ብሕጊ ክልኩል እዩ።",
        "ዝተመርዓዋ ኣንስቲ ኣብ ንብረት ስድራን ኣብ ሓልዮት ቆልዓን ማዕረ መሰል ኣለወን።",
        "ገበን ምሕባር፣ እትኣምንዎ ሰብ ምምጻእን ንጹህ መርትዖ ሕክምና ምርካብን መሰል ኣለኩም።",
      ],
      footer: "ጉዳይ ንምጅማር ገንዘብ ወይ ጠበቓ ኣየድልን። ማሕበራት ንጹህ ሕጋዊ ሓገዝ ክውክሉኹም ይኽእሉ።",
    },
  },
  "Recognising abuse": {
    am: {
      category: "ግፍን መለየት",
      title: "ግፍን መለየት",
      summary: "ግፍ አካላዊ ብቻ አይደለም። ምልክቶቹን ማወቅ ለመስራት ይረዳል።",
      intro: "ግፍ አካላዊ፣ የወሲብ፣ ስሜታዊ፣ ኢኮኖሚያዊ ወይም ዲጂታል ሊሆን ይችላል።",
      heading: "ምልክቶች፦",
      bullets: [
        "መምታት፣ ማነቅ ወይም ማስፈራራት።",
        "ያልተፈለገ ወሲብ ወይም የግል ምስል ጫና።",
        "ስድብ፣ ከቤተሰብ ማግለል ወይም ስልክ መፈተሽ።",
        "ደመወዝ መውሰድ ወይም ስራ/ትምህርት መከልከል።",
        "ከባድ ቁስል ከመድረሱ በፊት እርዳታ መጠየቅ ይችላሉ።",
      ],
      footer: "የሆነውን መጥራት የመጀመሪያ እርምጃ ነው።",
    },
    om: {
      category: "Miidhaa beekuu",
      title: "Miidhaa beekuu",
      summary: "Miidhaan qaama qofa miti. Mallattoolee beekuun tarkaanfii salphisa.",
      intro: "Miidhaan qaamaa, saalaa, miiraa, dinagdee ykn dijitaalaa ta'uu danda'a.",
      heading: "Mallattoolee:",
      bullets: [
        "Reebuu, ukkaamsuu ykn sodaachisuu.",
        "Gocha saalaa hin barbaadamne ykn fakkii dhuunfaa dhiibuu.",
        "Arrabsoo, maatii irraa adda baasuu ykn bilbila sakatta'uu.",
        "Mindaa fudhachuu ykn hojii/barumsa dhorkuu.",
        "Madaa cimaa dura gargaarsa gaafachuu ni dandeessa.",
      ],
      footer: "Waan ta'e moggaasuun tarkaanfii jalqabaati.",
    },
    ti: {
      category: "ግፍዒ ምፍላጥ",
      title: "ግፍዒ ምፍላጥ",
      summary: "ግፍዒ ኣካላዊ ጥራይ ኣይኮነን። ምልክታት ምፍላጥ ንስጉምቲ ይሕግዝ።",
      intro: "ግፍዒ ኣካላዊ፣ ጾታዊ፣ ስምዒታዊ፣ ቁጠባዊ ወይ ዲጂታል ክኸውን ይኽእል።",
      heading: "ምልክታት፦",
      bullets: [
        "ምህራም፣ ምዕፋን ወይ ስግኣት።",
        "ዘይተደለየ ጾታዊ ተግባር ወይ ውልቃዊ ስእሊ ጸቕጢ።",
        "ጸርፊ፣ ካብ ስድራ ምግላል ወይ ተሌፎን ምፍታሽ።",
        "ደሞዝ ምውሳድ ወይ ስራሕ/ትምህርቲ ምኽልኻል።",
        "ቅድሚ ከቢድ ቁስሊ ሓገዝ ክትሕቱ ትኽእሉ።",
      ],
      footer: "ዝኾነ ምጽዋዕ ቀዳማይ ስጉምቲ እዩ።",
    },
  },
};

function pick<T>(map: Record<string, Partial<Record<Locale, T>>> | undefined, key: string, lang: Locale) {
  if (lang === "en" || !map) return undefined;
  return map[key]?.[lang];
}

export function localizeIncidents(items: Incident[], lang: Locale): Incident[] {
  if (lang === "en") return items;
  return items.map((item) => {
    const t = pick(incidents, item.title, lang);
    return t ? { ...item, ...t } : item;
  });
}

export function localizeServices(items: HelpService[], lang: Locale): HelpService[] {
  if (lang === "en") return items;
  return items.map((item) => {
    const byCat = pick(services, item.category, lang);
    const byName = pick(services, item.name, lang);
    return { ...item, ...byName, ...byCat, category: byCat?.category ?? item.category };
  });
}

export function localizeEmergencies(items: EmergencyNumber[], lang: Locale): EmergencyNumber[] {
  if (lang === "en") return items;
  return items.map((item) => {
    const t = pick(emergencies, item.name, lang);
    return t ? { ...item, ...t } : item;
  });
}

export function localizeGuides(items: Guide[], lang: Locale): Guide[] {
  if (lang === "en") return items;
  return items.map((item) => {
    const t = pick(guides, item.title, lang);
    return t ? { ...item, ...t } : item;
  });
}
