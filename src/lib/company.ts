export const company = {
  name: "Bakersfield Dirt",
  phone: "(661) 384-7565",
  phoneHref: "tel:+16613847565",
  email: "austin@bakersfielddirt.com",
  area: "Bakersfield & Kern County, CA",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export const services = {
  "dirt-delivery": "Dirt delivery",
  "dirt-haul-away": "Dirt haul-away",
  materials: "Material supply",
  trucking: "Trucking & hauling",
} as const;

type ServiceEntry = { id: keyof typeof services; label: string; title: string; summary: string; image: string };

/** Entry points for each Services section, used by the index rows and footer. */
export const serviceIndex: ServiceEntry[] = [
  { id: "dirt-delivery", label: "Import", title: "Dirt delivery", summary: "Bring clean, compactable fill onto your site.", image: "/images/loader-truck.webp" },
  { id: "dirt-haul-away", label: "Export", title: "Dirt haul-away", summary: "Move surplus dirt to a receiving site or a job that needs fill.", image: "/images/earthworks.webp" },
  { id: "materials", label: "Supply", title: "Materials for sale", summary: "Fill dirt, base rock, rock & gravel, sand, asphalt and landscaping.", image: "/images/aggregate-yard.webp" },
  { id: "trucking", label: "Haul only", title: "Trucking & hauling", summary: "Bulk loads for material you’ve already sourced.", image: "/images/haul-road.webp" },
];

export const materials = [
  { id: "fill-dirt", name: "Fill dirt", uses: ["Raising grades", "Low spots", "Building up pads"], detail: "For raising grades and building up low spots. Share the fill requirements on your plans and roughly how many yards you need." },
  { id: "base-rock", name: "Base rock", uses: ["Roads", "Driveways", "Pads"], detail: "For the compacted layer under roads, driveways and pads. Include the base specification if your plans call for one." },
  { id: "rock-gravel", name: "Rock & gravel", uses: ["Access roads", "Drainage", "Surface cover"], detail: "For access roads, drainage and surface cover. Tell us the stone size, intended use and quantity." },
  { id: "sand", name: "Sand", uses: ["Bedding", "Leveling", "Landscape work"], detail: "For bedding, leveling and landscape work. Let us know the application and any required gradation." },
  { id: "asphalt", name: "Asphalt", uses: ["Paving projects", "Form or mix to spec"], detail: "For paving projects. Share the form or mix your job calls for so we can check sourcing and haul options." },
  { id: "landscaping", name: "Landscaping materials", uses: ["Beds", "Paths", "Outdoor spaces"], detail: "For finishing beds, paths and outdoor spaces. Describe the color, size and finish you’re looking for." },
];

export type TruckType = "transfer" | "super-10" | "bottom-dump" | "end-dump";

/** Truck types named on the existing site, with how each one unloads. */
export const trucks: { id: TruckType; name: string; unloads: string }[] = [
  { id: "transfer", name: "Transfers", unloads: "A dump truck pulling a second box that rolls forward into the truck bed to unload." },
  { id: "super-10", name: "Super-10s", unloads: "A ten-wheel dump truck with a trailing axle for a larger legal load." },
  { id: "bottom-dump", name: "Bottom dumps", unloads: "Opens gates under the trailer to lay material out in a row." },
  { id: "end-dump", name: "End dumps", unloads: "Raises the trailer bed and unloads out the back." },
];

/** How a job comes together, from the About page and the cut-to-fill story. */
export const jobSteps = [
  { title: "The material", body: "Tell us what you need brought in or what’s in the pile, roughly how much, and any specification on your plans." },
  { title: "The other end", body: "We look for a material source, or for a receiving site or nearby job that needs the fill." },
  { title: "The truck", body: "Site access and loading conditions decide whether a transfer, Super-10, bottom dump or end dump fits." },
  { title: "The quote", body: "With distance and timing worked out, we confirm availability, suitability and pricing with you." },
];

export const pad = (index: number) => String(index + 1).padStart(2, "0");

export function quoteHref(service?: keyof typeof services, material?: string) {
  const params = new URLSearchParams();
  if (service) params.set("service", service);
  if (material) params.set("material", material);
  return `/contact${params.size ? `?${params}` : ""}#quote`;
}
