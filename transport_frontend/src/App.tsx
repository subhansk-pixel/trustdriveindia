import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { BsArrowLeft, BsTelephone, BsWhatsapp } from "react-icons/bs";
import { ImInstagram } from "react-icons/im";
import "./App.css";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";
import { MdEmail } from "react-icons/md";


type RouteKey = "home" | "refund" | "terms";

type LegalSection = {
  heading: string;
  body: string;
};

type LegalDocument = {
  badge: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

type SeoMeta = {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
};

const services = [
  {
    id: "airport-pickup",
    title: "Airport pickup",
    description:
      "On-time driver support for airport arrivals, departures, and guest pickup.",
    points: ["24/7 availability", "Punctual arrival", "Smooth city transfer"],
    image: "/hero-slides/airport-header.jpg",
  },
  {
    id: "valet-parking",
    title: "Valet parking",
    description:
      "Professional valet support for weddings, private events, and corporate venues.",
    points: ["Event-ready team", "Polite handling", "Managed vehicle flow"],
    image: "/service-images/valet-parking.jpg",
  },
  {
    id: "temporary-driver",
    title: "Temporary driver",
    description:
      "Flexible driver booking for a few hours, a day, or short-term personal use.",
    points: ["Hourly booking", "Local travel help", "Quick availability"],
    image: "/hero-slides/event-header.jpg",
  },
  {
    id: "permanent-driver",
    title: "Permanent driver",
    description:
      "Reliable long-term driver support for daily office, home, or business travel.",
    points: ["Daily commute", "Trusted service", "Long-term support"],
    image: "/service-images/permanent-driver.jpg",
  },
  {
    id: "celebrity-pickup",
    title: "Celebrity pickup & drop",
    description:
      "Private and professional driver service for VIP guests and special movement.",
    points: ["Discreet handling", "Premium support", "Professional conduct"],
    image: "/service-images/celebrity-pickup.jpg",
  },
  {
    id: "family-vacation",
    title: "Family vacation drivers",
    description:
      "Comfortable driver service for family outings, tours, and weekend travel.",
    points: ["Safe family travel", "Outstation friendly", "Relaxed journey"],
    image: "/service-images/family-vacation.jpg",
  },
];

const highlights = [
  { value: "15+", label: "Years of experience" },
  { value: "400+", label: "Driver partners" },
  { value: "24/7", label: "Booking support" },
  { value: "4.8/5", label: "Customer rating" },
];

const heroSlides = [
  {
    eyebrow: "Airport, Event, and Family Drivers",
    title: "Airport rides and daily drivers in Hyderabad.",
    image: "/hero-slides/airport-header.jpg",
  },
  {
    eyebrow: "Valet and VIP Support",
    title: "Drivers for events, pickups, and premium travel.",
    image: "/service-images/permanent-driver.jpg",
  },
  {
    eyebrow: "15+ Years of Experience",
    title: "Temporary, permanent, and trip drivers on call.",
    image: "/hero-slides/family-header.jpg",
  },
];

const fallbackHeroImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 720'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23145c5d'/%3E%3Cstop offset='100%25' stop-color='%230f3d3e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='720' rx='36' fill='url(%23g)'/%3E%3Ccircle cx='930' cy='170' r='96' fill='rgba(255,255,255,0.12)'/%3E%3Ccircle cx='1030' cy='280' r='52' fill='rgba(255,255,255,0.08)'/%3E%3Cpath d='M165 475c62-126 178-193 320-193 120 0 222 42 302 121l75 72H165z' fill='rgba(255,255,255,0.1)'/%3E%3Crect x='120' y='138' width='264' height='40' rx='20' fill='rgba(255,255,255,0.12)'/%3E%3Crect x='120' y='208' width='464' height='72' rx='20' fill='rgba(255,255,255,0.16)'/%3E%3Crect x='120' y='304' width='356' height='28' rx='14' fill='rgba(255,255,255,0.12)'/%3E%3C/svg%3E";

const reviews = [
  {
    name: "Rahul Kumar",
    location: "Madhapur",
    service: "Airport pickup",
    rating: 5,
    image: "/reviewers/rahul-kumar.jpg",
    text: "Driver reached before time, helped with luggage, and the pickup from Rajiv Gandhi Airport was very smooth.",
  },
  {
    name: "Sneha Reddy",
    location: "Banjara Hills",
    service: "Family vacation driver",
    rating: 5,
    image: "/reviewers/sneha-reddy.jpg",
    text: "We booked for a two-day family trip and the driver was calm, careful, and very respectful with elders.",
  },
  {
    name: "Arjun Varma",
    location: "Gachibowli",
    service: "Valet parking",
    rating: 4,
    image: "/reviewers/arjun-varma.jpg",
    text: "Used their valet team for a private event. The coordination was clear and vehicle handling felt professional.",
  },
];

const serviceAreas = [
  "Banjara Hills",
  "Jubilee Hills",
  "Madhapur",
  "Gachibowli",
  "Hitech City",
  "Kukatpally",
  "Secunderabad",
  "Shamshabad Airport",
];

const faqItems = [
  {
    question: "Do you provide driver service in Hyderabad for airport pickup?",
    answer:
      "Yes, Trust Drive India provides airport pickup and drop driver support in Hyderabad, including early morning, late night, and guest travel bookings.",
  },
  {
    question: "Can I book a temporary or permanent driver?",
    answer:
      "Yes, you can book temporary drivers for a few hours or a day, and you can also enquire about permanent driver arrangements for daily travel needs.",
  },
  {
    question: "Do you support chauffeur, taxi, and family trip bookings?",
    answer:
      "Yes, we support chauffeur-style travel help, local taxi assistance, family trip planning, VIP pickups, and event driver bookings based on availability.",
  },
  {
    question: "How do I book quickly?",
    answer:
      "The fastest way is to call directly or send your trip details on WhatsApp so the team can confirm availability, timing, and pricing.",
  },
];

const fallbackProfileLogo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='32' fill='%23e8dfd2'/%3E%3Ccircle cx='32' cy='24' r='11' fill='%23145c5d' opacity='0.9'/%3E%3Cpath d='M16 52c2.8-9 10.1-14 16-14s13.2 5 16 14' fill='%23145c5d' opacity='0.9'/%3E%3C/svg%3E";

const legacyContactNumber = import.meta.env.VITE_CONTACT_NUMBER?.trim() || "";
const rawPhoneNumber =
  import.meta.env.VITE_PHONE_DIAL_NUMBER?.trim() ||
  legacyContactNumber ||
  "+919326857329";
const rawWhatsappNumber =
  import.meta.env.VITE_WHATSAPP_NUMBER?.trim() ||
  legacyContactNumber ||
  "+918433500669";
const dialNumber = rawPhoneNumber.replace(/[^\d+]/g, "");
const whatsappNumber = rawWhatsappNumber.replace(/\D/g, "");
const whatsappMessage = encodeURIComponent(
  "Hello Trust Drive India, I need driver service in Hyderabad. Please share details.",
);
const callHref = `tel:${dialNumber}`;
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
const emailAddress =
  import.meta.env.VITE_CONTACT_EMAIL?.trim() || "trustdriveindia5@gmail.com";
const emailHref = `mailto:${emailAddress}`;
const instagramUrl =
  import.meta.env.VITE_INSTAGRAM_URL?.trim() ||
  "https://www.instagram.com/trust.driveindia";
const facebookUrl = import.meta.env.VITE_FACEBOOK_URL?.trim() || "";
const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL?.trim() || "";
const createServiceWhatsappHref = (serviceTitle: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello Trust Drive India, I need ${serviceTitle} service in Hyderabad. Please share availability and pricing.`,
  )}`;

const seoMetaByRoute: Record<RouteKey, SeoMeta> = {
  home: {
    title:
      "Driver Service in Hyderabad | Chauffeur, Airport Pickup, Taxi Support | Trust Drive India",
    description:
      "Book driver service in Hyderabad for airport pickup, chauffeur hire, valet parking, family trips, and taxi support. Trusted local drivers with quick WhatsApp booking.",
    keywords:
      "driver service Hyderabad, chauffeur service Hyderabad, airport pickup Hyderabad, taxi service Hyderabad, car rental with driver Hyderabad, valet parking Hyderabad, temporary driver Hyderabad, permanent driver Hyderabad",
    canonicalPath: "/",
  },
  refund: {
    title: "Refund Policy | Trust Drive India",
    description:
      "Read the refund policy for Trust Drive India bookings, cancellations, advance payments, rescheduling, and service-related refund timelines.",
    keywords:
      "refund policy Trust Drive India, driver service refund, booking cancellation Hyderabad",
    canonicalPath: "/refund-policy",
  },
  terms: {
    title: "Terms and Conditions | Trust Drive India",
    description:
      "Read the terms and conditions for Trust Drive India chauffeur, taxi support, airport pickup, valet, and booking services.",
    keywords:
      "terms and conditions Trust Drive India, chauffeur service terms, driver service Hyderabad terms",
    canonicalPath: "/terms-and-conditions",
  },
};

const legalContent: Record<Exclude<RouteKey, "home">, LegalDocument> = {
  refund: {
    badge: "Refund Policy",
    title: "Refund and cancellation terms for bookings",
    intro:
      "This refund policy explains how booking advances, schedule changes, and cancellations are handled for driver services booked with Trust Drive India.",
    sections: [
      {
        heading: "1. Advance payment and confirmation",
        body: "Some bookings may require an advance payment to block the driver, vehicle slot, valet team, or event schedule. A booking is treated as confirmed only after the required details are shared and the advance, if applicable, is received.",
      },
      {
        heading: "2. Eligible refund situations",
        body: "Refunds may be considered when a cancellation request is shared with reasonable notice before dispatch, when Trust Drive India is unable to provide the confirmed service, or when a duplicate payment has been made by mistake.",
      },
      {
        heading: "3. Non-refundable situations",
        body: "Refunds may not apply for last-minute cancellations, no-show cases, completed trips, event allocations already staffed, or bookings where the driver has already been assigned and moved according to the confirmed schedule.",
      },
      {
        heading: "4. Change of plan and rescheduling",
        body: "When possible, we try to convert cancellations into reschedules. Revised timing, pickup changes, extra waiting, or service upgrades may lead to pricing changes depending on driver availability and distance already covered.",
      },
      {
        heading: "5. Refund review and timeline",
        body: "Approved refunds are reviewed after verifying payment, dispatch status, service logs, and customer communication. Once approved, processing time depends on the payment method used and banking timelines.",
      },
    ],
  },
  terms: {
    badge: "Terms & Conditions",
    title:
      "Terms and conditions for travel, valet, chauffeur, and booking support services",
    intro:
      "These Terms & Conditions govern all enquiries, bookings, chauffeur services, valet operations, event transportation, outstation trips, and related support services provided by Trust Drive India. By requesting, confirming, or using any service offered by Trust Drive India through phone call, WhatsApp, website, social media, referral, or any other communication channel, the customer agrees to comply with the terms mentioned below.",
    sections: [
      {
        heading: "1. Booking information and customer responsibility",
        body: "Customers are required to provide complete and accurate booking information including pickup address, drop location, reporting time, travel date, vehicle type, number of passengers, luggage details, event duration, and contact information. Any incorrect, incomplete, misleading, or last-minute changes in the information shared may affect operational planning, driver reporting time, route execution, pricing, or service quality. Trust Drive India shall not be held responsible for delays, failed pickups, or service interruptions caused due to incorrect information provided by the customer.",
      },
      {
        heading: "2. Booking confirmation and service acceptance",
        body: "All bookings are subject to operational feasibility, driver availability, service area coverage, safety considerations, and internal approval. Enquiries made through phone calls, WhatsApp, forms, advertisements, or social media shall only be considered booking requests and not confirmed reservations. A booking shall be treated as confirmed only after explicit confirmation is provided by Trust Drive India through message, call, invoice, receipt, or designated representative communication.",
      },
      {
        heading: "3. Driver allocation and replacement rights",
        body: "Trust Drive India reserves the right to assign, replace, reschedule, or substitute drivers, chauffeurs, valet staff, or support personnel based on operational requirements, emergency situations, driver availability, health conditions, traffic conditions, or customer location feasibility. While reasonable efforts will be made to maintain service continuity, the company does not guarantee assignment of a particular driver or staff member.",
      },
      {
        heading: "4. Reporting time, delays, and waiting charges",
        body: "Customers are expected to remain available at the agreed reporting location and time. Delays caused due to customer unavailability, phone inaccessibility, delayed event closure, parking issues, society permissions, security restrictions, or route modifications may attract additional waiting charges. Extended waiting, midnight waiting, overnight duty, event overruns, or additional reporting hours beyond the original booking scope may be billed separately based on prevailing operational rates.",
      },
      {
        heading: "5. Trip modifications and route changes",
        body: "Any changes to the original trip plan including pickup changes, destination changes, extra stops, extended travel duration, intercity additions, route diversions, outstation conversion, or additional passenger requests after dispatch may result in revised pricing. Trust Drive India reserves the right to accept or reject modifications depending on driver availability, operational feasibility, time constraints, and safety considerations.",
      },
      {
        heading: "6. Outstation and long-distance travel conditions",
        body: "For outstation or long-distance bookings, customers are responsible for providing safe accommodation arrangements where applicable, along with parking, tolls, state taxes, permits, driver meals, and any location-specific charges unless otherwise agreed in writing. Travel to remote, restricted, unsafe, or inaccessible areas may be declined or discontinued at the company’s discretion.",
      },
      {
        heading: "7. Valet parking service responsibilities",
        body: "Customers availing valet services are responsible for ensuring valid parking permissions, designated parking availability, and legal authorization at the venue. Trust Drive India shall not be held liable for losses arising from unauthorized parking instructions, improper venue arrangements, insufficient parking infrastructure, local authority actions, towing, or penalties imposed by property owners or government authorities.",
      },
      {
        heading: "8. Customer conduct and passenger behaviour",
        body: "Customers and passengers are expected to maintain respectful, lawful, and non-abusive behaviour with drivers, chauffeurs, valet staff, coordinators, and support personnel. Smoking, illegal substance usage, violent conduct, harassment, physical threats, discrimination, unlawful instructions, or any activity compromising staff safety may lead to immediate termination or cancellation of services without refund or compensation.",
      },
      {
        heading: "9. Alcohol consumption and unsafe conditions",
        body: "Customers consuming alcohol are expected to maintain safe and cooperative behaviour throughout the trip. Drivers reserve the right to refuse unsafe instructions, overcrowding requests, unlawful driving directions, or activities that may violate road safety laws. Trust Drive India shall not be responsible for accidents, disputes, injuries, or police/legal actions arising due to intoxicated passenger behaviour or unlawful activities by customers or passengers.",
      },
      {
        heading: "10. Vehicle condition and customer belongings",
        body: "Customers are responsible for ensuring that their vehicle is in roadworthy condition before chauffeur or valet handover. Trust Drive India shall not be liable for pre-existing mechanical issues, brake failures, tyre punctures, electrical faults, fuel shortages, battery failures, insurance deficiencies, or hidden vehicle defects. Customers are also responsible for safeguarding personal belongings, cash, jewellery, gadgets, confidential documents, or valuables left inside the vehicle.",
      },
      {
        heading: "11. Service limitations and operational interruptions",
        body: "Trust Drive India will make commercially reasonable efforts to provide timely and professional services. However, delays, interruptions, or inability to complete services may occur due to traffic congestion, weather conditions, road closures, strikes, protests, vehicle breakdowns, accidents, government restrictions, internet outages, law enforcement actions, natural disasters, public emergencies, or other circumstances beyond operational control. Such situations shall not automatically result in company liability or compensation obligations.",
      },
      {
        heading: "12. Pricing structure and additional charges",
        body: "Pricing is calculated based on the information available at the time of booking including duration, distance, service category, timing, location, and operational complexity. Additional charges may apply for waiting time, parking, tolls, permits, fuel fluctuations, interstate taxes, midnight reporting, extra hours, event extensions, remote locations, route deviations, cleaning charges, damage recovery, or emergency operational requirements.",
      },
      {
        heading: "13. Payment terms and dues",
        body: "Customers agree to complete all payments within the communicated payment timeline. Trust Drive India reserves the right to request advance payment, partial advance, security deposits, or full settlement before service execution depending on booking type. Delayed payments, dishonoured transactions, or unpaid dues may result in cancellation of future services, recovery proceedings, or legal action where necessary.",
      },
      {
        heading: "14. Cancellation and refund policy",
        body: "Cancellation requests must be communicated through approved contact channels. Refund eligibility, if any, shall depend on cancellation timing, operational allocation, driver dispatch status, event preparation, and incurred expenses. Last-minute cancellations, no-shows, peak-hour cancellations, or cancellations after driver dispatch may attract partial or full cancellation charges.",
      },
      {
        heading: "15. Damage, cleaning, and misuse liability",
        body: "Customers shall be financially responsible for any intentional or negligent damage caused to company resources, valet equipment, assigned vehicles, uniforms, communication devices, or operational property during the course of service usage. Excessive vehicle cleaning requirements caused by vomiting, spills, smoking residue, stains, or passenger misconduct may result in additional cleaning and restoration charges.",
      },
      {
        heading: "16. Limitation of liability",
        body: "To the maximum extent permitted under applicable law, Trust Drive India shall not be liable for indirect, incidental, consequential, special, emotional, reputational, business, or financial losses arising from service usage, delays, cancellations, route issues, customer disputes, missed appointments, event disruptions, or third-party actions. Company liability, where legally established, shall be limited only to the actual amount paid by the customer for the affected booking.",
      },
      {
        heading: "17. Third-party platforms and communication channels",
        body: "Trust Drive India may communicate through WhatsApp, phone calls, social media platforms, website forms, maps, payment gateways, or third-party service providers. The company shall not be responsible for technical failures, message delivery delays, hacked accounts, spam filtering, payment gateway interruptions, or third-party platform outages affecting communication or transactions.",
      },
      {
        heading: "18. Privacy and data usage",
        body: "Customer information shared during enquiry or booking may be used for operational coordination, support communication, billing, verification, service improvement, safety monitoring, and legal compliance. Trust Drive India will take reasonable measures to protect customer information but shall not be held responsible for unauthorized access caused by external cyber incidents, telecom failures, or third-party platform vulnerabilities.",
      },
      {
        heading: "19. Force majeure",
        body: "Trust Drive India shall not be considered in breach of service obligations where delays, interruptions, or inability to perform arise from circumstances beyond reasonable control including natural disasters, floods, heavy rainfall, pandemics, civil unrest, government actions, strikes, transport shutdowns, fuel shortages, war-like situations, internet failures, or public emergencies.",
      },
      {
        heading: "20. Legal jurisdiction and dispute resolution",
        body: "Any disputes, claims, or legal proceedings arising in connection with services provided by Trust Drive India shall be subject to the jurisdiction of courts located in Mumbai, Maharashtra, India. Customers agree to first attempt good-faith resolution through direct communication before initiating formal legal proceedings.",
      },
      {
        heading: "21. Modification of terms",
        body: "Trust Drive India reserves the right to update, revise, modify, or replace these Terms & Conditions at any time without prior notice. Continued use of services after such modifications shall constitute acceptance of the revised terms.",
      },
    ],
  },
};

const routePathMap: Record<RouteKey, string> = {
  home: "/",
  refund: "/refund-policy",
  terms: "/terms-and-conditions",
};

const getRouteFromPath = (pathname: string): RouteKey => {
  if (pathname === routePathMap.refund) {
    return "refund";
  }

  if (pathname === routePathMap.terms) {
    return "terms";
  }

  return "home";
};

const upsertMetaTag = (
  attribute: "name" | "property",
  key: string,
  content: string,
) => {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const upsertLinkTag = (rel: string, href: string) => {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
};

const updateStructuredData = (route: RouteKey) => {
  const scriptId = "trust-drive-india-structured-data";
  const canonicalUrl = `${window.location.origin}${seoMetaByRoute[route].canonicalPath}`;
  const sameAsLinks = [instagramUrl, facebookUrl, linkedinUrl].filter(Boolean);
  const graph: Array<Record<string, unknown>> = [
    {
      "@type": "LocalBusiness",
      "@id": `${window.location.origin}/#business`,
      name: "Trust Drive India",
      url: window.location.origin,
      telephone: rawPhoneNumber,
      email: emailAddress,
      areaServed: "Hyderabad",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
      sameAs: sameAsLinks,
      description:
        "Driver service in Hyderabad for airport pickup, chauffeur support, valet parking, family travel, and local taxi assistance.",
    },
    {
      "@type": "Service",
      "@id": `${window.location.origin}/#service`,
      serviceType: "Driver and chauffeur service",
      areaServed: "Hyderabad",
      provider: {
        "@id": `${window.location.origin}/#business`,
      },
      description:
        "Airport pickup, temporary driver, permanent driver, valet parking, family trip drivers, and event chauffeur support in Hyderabad.",
    },
    {
      "@type": "WebSite",
      "@id": `${window.location.origin}/#website`,
      url: window.location.origin,
      name: "Trust Drive India",
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: seoMetaByRoute[route].title,
      description: seoMetaByRoute[route].description,
      isPartOf: {
        "@id": `${window.location.origin}/#website`,
      },
    },
  ];

  if (route === "home") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${window.location.origin}/#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": graph,
  };
  const existingScript = document.getElementById(scriptId);
  const script = existingScript || document.createElement("script");

  script.id = scriptId;
  script.setAttribute("type", "application/ld+json");
  script.textContent = JSON.stringify(structuredData);

  if (!existingScript) {
    document.head.appendChild(script);
  }
};

function App() {
  const [openServiceId, setOpenServiceId] = useState<string | null>(
    services[0]?.id ?? null,
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const [route, setRoute] = useState<RouteKey>(() =>
    getRouteFromPath(window.location.pathname),
  );

  const navigateTo = (nextRoute: RouteKey) => {
    const nextPath = routePathMap[nextRoute];

    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }

    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromPath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const meta = seoMetaByRoute[route];
    const canonicalUrl = `${window.location.origin}${meta.canonicalPath}`;

    document.title = meta.title;
    upsertMetaTag("name", "description", meta.description);
    upsertMetaTag("name", "keywords", meta.keywords);
    upsertMetaTag("name", "robots", "index, follow");
    upsertMetaTag("name", "author", "Trust Drive India");
    upsertMetaTag("property", "og:title", meta.title);
    upsertMetaTag("property", "og:description", meta.description);
    upsertMetaTag(
      "property",
      "og:type",
      route === "home" ? "website" : "article",
    );
    upsertMetaTag("property", "og:url", canonicalUrl);
    upsertMetaTag("property", "og:site_name", "Trust Drive India");
    upsertMetaTag("name", "twitter:card", "summary_large_image");
    upsertMetaTag("name", "twitter:title", meta.title);
    upsertMetaTag("name", "twitter:description", meta.description);
    upsertLinkTag("canonical", canonicalUrl);
    updateStructuredData(route);
  }, [route]);

  return route === "home" ? (
    <HomePage
      activeSlide={activeSlide}
      callHref={callHref}
      createServiceWhatsappHref={createServiceWhatsappHref}
      navigateTo={navigateTo}
      nextSlide={() =>
        setActiveSlide((current) => (current + 1) % heroSlides.length)
      }
      openServiceId={openServiceId}
      previousSlide={() =>
        setActiveSlide(
          (current) => (current - 1 + heroSlides.length) % heroSlides.length,
        )
      }
      rawPhoneNumber={rawPhoneNumber}
      rawWhatsappNumber={rawWhatsappNumber}
      setActiveSlide={setActiveSlide}
      setOpenServiceId={setOpenServiceId}
      whatsappHref={whatsappHref}
    />
  ) : (
    <LegalPage
      callHref={callHref}
      content={legalContent[route]}
      navigateTo={navigateTo}
      rawPhoneNumber={rawPhoneNumber}
      rawWhatsappNumber={rawWhatsappNumber}
      route={route}
      whatsappHref={whatsappHref}
    />
  );
}

type HomePageProps = {
  activeSlide: number;
  callHref: string;
  createServiceWhatsappHref: (serviceTitle: string) => string;
  navigateTo: (route: RouteKey) => void;
  nextSlide: () => void;
  openServiceId: string | null;
  previousSlide: () => void;
  rawPhoneNumber: string;
  rawWhatsappNumber: string;
  setActiveSlide: Dispatch<SetStateAction<number>>;
  setOpenServiceId: Dispatch<SetStateAction<string | null>>;
  whatsappHref: string;
};

function HomePage({
  activeSlide,
  callHref,
  createServiceWhatsappHref,
  navigateTo,
  nextSlide,
  openServiceId,
  previousSlide,
  rawPhoneNumber,
  rawWhatsappNumber,
  setActiveSlide,
  setOpenServiceId,
  whatsappHref,
}: HomePageProps) {
  return (
    <div className="page-shell">
      <Header />

      <main className="landing-page">
        <section className="hero-modern">
          <div className="hero-media" aria-hidden="true">
            {heroSlides.map((slide, index) => (
              <img
                key={slide.title}
                className={`hero-media-image ${index === activeSlide ? "hero-media-image-active" : ""}`}
                src={slide.image}
                alt=""
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = fallbackHeroImage;
                }}
              />
            ))}
          </div>
          <div className="hero-gradient" />

          <div className="hero-modern-content">
            <div className="hero-content-card">
              <p className="hero-badge">Hyderabad driver service</p>
              <p className="hero-tag">{heroSlides[activeSlide].eyebrow}</p>
              <h1>{heroSlides[activeSlide].title}</h1>
              <p className="hero-trust-row">
                4.8 rated · 15+ years experience · 400+ driver partners
              </p>
              <p className="hero-text">
                Book trusted driver service in Hyderabad for airport pickup,
                chauffeur support, family travel, valet parking, and local taxi
                assistance with quick WhatsApp booking.
              </p>

              <div className="hero-bottom-row">
                <div className="hero-actions">
                  <a
                    className="primary-button"
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                  <a className="ghost-button" href={callHref}>
                    Call now
                  </a>
                </div>

                <div className="hero-controls">
                  <button
                    className="hero-nav-button"
                    type="button"
                    onClick={previousSlide}
                    aria-label="Previous slide"
                  >
                    ‹
                  </button>
                  <div className="hero-dots" aria-label="Hero slide navigation">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.title}
                        className={`hero-dot ${index === activeSlide ? "hero-dot-active" : ""}`}
                        type="button"
                        aria-label={`Show slide ${index + 1}`}
                        onClick={() => setActiveSlide(index)}
                      />
                    ))}
                  </div>
                  <button
                    className="hero-nav-button"
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-stats-grid">
            {highlights.map((item) => (
              <article className="hero-stat-card" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="services-section">
          <div className="section-heading">
            <p className="eyebrow">Our services</p>
            <h3>Driver support for every need</h3>
          </div>
          <div className="services-summary-grid">
            {services.map((service) => (
              <article
                className={`services-summary-card ${openServiceId === service.id ? "services-summary-card-open" : ""}`}
                key={service.id}
              >
                <button
                  className="services-summary-toggle"
                  type="button"
                  aria-expanded={openServiceId === service.id}
                  aria-controls={`${service.id}-panel`}
                  onClick={() =>
                    setOpenServiceId((current) =>
                      current === service.id ? null : service.id,
                    )
                  }
                >
                  <div>
                    <p className="service-kicker">Service</p>
                    <h4>{service.title}</h4>
                  </div>
                  <span
                    className={`services-summary-icon ${openServiceId === service.id ? "services-summary-icon-open" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {openServiceId === service.id ? (
                  <div
                    className="services-summary-panel"
                    id={`${service.id}-panel`}
                  >
                    <div
                      className="service-image"
                      style={{
                        backgroundImage: `linear-gradient(rgba(16, 43, 44, 0.2), rgba(16, 43, 44, 0.2)), url(${service.image})`,
                      }}
                      role="img"
                      aria-label={service.title}
                    />
                    <div className="service-content">
                      <p className="service-description">
                        {service.description}
                      </p>
                      <div className="service-points">
                        {service.points.map((point) => (
                          <span className="service-pill" key={point}>
                            {point}
                          </span>
                        ))}
                      </div>
                      <a
                        className="service-contact-button"
                        href={createServiceWhatsappHref(service.title)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Enquire on WhatsApp
                      </a>
                    </div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="trust-section">
          <div className="section-heading">
            <p className="eyebrow">Why choose us</p>
            <h3>Clean, safe, and dependable</h3>
          </div>
          <div className="trust-grid">
            <article className="trust-card">
              <h4>Fast response</h4>
              <p>Quick booking help for urgent travel and airport schedules.</p>
            </article>
            <article className="trust-card">
              <h4>Experienced drivers</h4>
              <p>Professional driver partners for personal and event travel.</p>
            </article>
            <article className="trust-card">
              <h4>Easy contact</h4>
              <p>Call or WhatsApp directly with one tap on mobile.</p>
            </article>
          </div>
        </section>

        <section className="seo-section">
          <div className="section-heading">
            <p className="eyebrow">Popular Searches</p>
            <h3>Driver, chauffeur, airport pickup, and taxi support</h3>
          </div>
          <div className="seo-grid">
            <article className="seo-card">
              <h4>Driver service in Hyderabad</h4>
              <p>
                Customers searching for a driver in Hyderabad can book airport
                travel, office commute help, event support, and family trip
                driving with quick response and local coverage.
              </p>
            </article>
            <article className="seo-card">
              <h4>Chauffeur, taxi, and car with driver</h4>
              <p>
                For searches around chauffeur service, taxi support, and car
                rental with driver, Trust Drive India helps with premium guest
                movement, daily bookings, and flexible trip planning.
              </p>
            </article>
            <article className="seo-card">
              <h4>Airport pickup and travel bookings</h4>
              <p>
                We support airport pickup, valet parking, temporary drivers,
                permanent drivers, family vacation drivers, and VIP pickup
                requirements across Hyderabad.
              </p>
            </article>
          </div>
        </section>

        <section className="areas-section">
          <div className="section-heading">
            <p className="eyebrow">Service Areas</p>
            <h3>Popular Hyderabad areas we support</h3>
          </div>
          <div className="areas-pill-grid">
            {serviceAreas.map((area) => (
              <span className="area-pill" key={area}>
                {area}
              </span>
            ))}
          </div>
          <p className="areas-copy">
            Book local driver service, airport pickup, chauffeur help, and
            family travel support across major Hyderabad residential, business,
            and airport zones.
          </p>
        </section>

        <section className="faq-section">
          <div className="section-heading">
            <p className="eyebrow">FAQs</p>
            <h3>Common questions about driver bookings</h3>
          </div>
          <div className="faq-grid">
            {faqItems.map((item) => (
              <article className="faq-card" key={item.question}>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="reviews-section">
          <div className="section-heading">
            <p className="eyebrow">Customer feedback</p>
            <h3>What clients say</h3>
          </div>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="review-header">
                  <div className="review-person">
                    <img
                      className="review-avatar"
                      src={review.image}
                      alt={review.name}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = fallbackProfileLogo;
                      }}
                    />
                    <div>
                      <p className="review-name">{review.name}</p>
                      <p className="review-meta">
                        {review.location} · {review.service}
                      </p>
                    </div>
                  </div>
                  <p
                    className="review-rating"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {"★".repeat(review.rating)}
                    <span>{"★".repeat(5 - review.rating)}</span>
                  </p>
                </div>
                <p className="review-text">“{review.text}”</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <div className="sticky-contact" aria-label="Quick contact actions">
        <a className="sticky-call" href={callHref}>
          Call Now
        </a>
        <a
          className="sticky-whatsapp"
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp Contact
        </a>
      </div>

      <SiteFooter
        navigateTo={navigateTo}
        rawPhoneNumber={rawPhoneNumber}
        rawWhatsappNumber={rawWhatsappNumber}
        whatsappHref={whatsappHref}
      />
    </div>
  );
}

type LegalPageProps = {
  callHref: string;
  content: LegalDocument;
  navigateTo: (route: RouteKey) => void;
  rawPhoneNumber: string;
  rawWhatsappNumber: string;
  route: Exclude<RouteKey, "home">;
  whatsappHref: string;
};

function LegalPage({
  callHref,
  content,
  navigateTo,
  rawPhoneNumber,
  rawWhatsappNumber,
  whatsappHref,
}: LegalPageProps) {
  return (
    <div className="page-shell page-shell-legal">
      <Header />

      <main className="legal-page">
        <section className="legal-hero">
          <button
            className="legal-back-link"
            type="button"
            onClick={() => navigateTo("home")}
          >
            <BsArrowLeft />
            <span>Back to home</span>
          </button>
          <p className="legal-page-badge">{content.badge}</p>
          <h1 className="legal-page-title">{content.title}</h1>
          <p className="legal-page-intro">{content.intro}</p>
        </section>

        <section className="legal-page-content">
          {content.sections.map((section) => (
            <article className="legal-page-card" key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </section>

        <section className="legal-contact-strip">
          <div>
            <p className="legal-contact-kicker">Need booking help?</p>
            <h3>Reach the team directly for quick support.</h3>
          </div>
          <div className="legal-contact-actions">
            <a className="footer-contact-link" href={callHref}>
              <BsTelephone />
              <span>{rawPhoneNumber}</span>
            </a>
            <a
              className="footer-contact-link"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              <BsWhatsapp />
              <span>{rawWhatsappNumber}</span>
            </a>
          </div>
        </section>
      </main>

      <SiteFooter
        navigateTo={navigateTo}
        rawPhoneNumber={rawPhoneNumber}
        rawWhatsappNumber={rawWhatsappNumber}
        whatsappHref={whatsappHref}
      />
    </div>
  );
}

function Header() {
  return (
    <header className="topbar">
      <div className="brand-block">
        <div className="brand-logo-shell">
          <img
            className="brand-logo"
            src="/favicon.svg"
            alt="Trust Drive India logo"
          />
        </div>
        <div className="brand-copy">
          <p className="brand-kicker">Hyderabad Driver Service</p>
          <p className="brand-name">Trust Drive India</p>
          <p className="brand-line">
            Airport pickups, valet, family trips, and on-demand drivers.
          </p>
        </div>
      </div>
    </header>
  );
}

type SiteFooterProps = {
  navigateTo: (route: RouteKey) => void;
  rawPhoneNumber: string;
  rawWhatsappNumber: string;
  whatsappHref: string;
};

function SiteFooter({
  navigateTo,
  rawPhoneNumber,
  rawWhatsappNumber,
  whatsappHref,
}: SiteFooterProps) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <p className="footer-kicker">Trust Drive India</p>
          <h3>Reliable driver support across Hyderabad.</h3>
          <p className="footer-copy">
            Reach us directly for airport pickups, event drivers, valet support,
            and day-to-day travel help in Hyderabad.
          </p>
        </div>

        <div className="footer-column">
          <p className="footer-section-title">Contact</p>
          <div className="footer-action-list">
            <a className="footer-contact-link" href={callHref}>
              <BsTelephone />
              <span>{rawPhoneNumber}</span>
            </a>
            <a
              className="footer-contact-link"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              <BsWhatsapp />
              <span>{rawWhatsappNumber}</span>
            </a>
            <a
              className="footer-contact-link"
              href={emailHref}
              target="_blank"
              rel="noreferrer"
            >
              <MdEmail />
              <span>{emailAddress}</span>
            </a>
          </div>
          <p className="footer-section-title">Follow us</p>

          <a
            className="footer-social-link"
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            <ImInstagram />
            <span>Instagram</span>
          </a>

          {facebookUrl ? (
            <a
              className="footer-social-link"
              href={facebookUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook />
              <span>Facebook</span>
            </a>
          ) : null}
          {linkedinUrl ? (
            <a
              className="footer-social-link"
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              <LiaLinkedin />
              <span>LinkedIn</span>
            </a>
          ) : null}
        </div>

        <div className="footer-column">
          <p className="footer-section-title">Policies</p>
          <div className="footer-legal-links">
            <a
              className="footer-legal-link"
              href={routePathMap.refund}
              onClick={(event) => {
                event.preventDefault();
                navigateTo("refund");
              }}
            >
              Refund Policy
            </a>
            <a
              className="footer-legal-link"
              href={routePathMap.terms}
              onClick={(event) => {
                event.preventDefault();
                navigateTo("terms");
              }}
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>

      <p className="footer-meta">
        © {new Date().getFullYear()} Trust Drive India. All rights reserved.
      </p>
    </footer>
  );
}

export default App;
