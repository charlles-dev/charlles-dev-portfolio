import { fallbackProjectsPayload } from "@/lib/projects/fallback";

describe("fallback projects payload", () => {
  it("converts current curated projects into the new safe payload shape", () => {
    expect(fallbackProjectsPayload.owner).toBe("charlles-dev");
    expect(fallbackProjectsPayload.featured.map((project) => project.name)).toEqual([
      "Astrolink",
      "Laudos Proxxima",
      "3035 Teach"
    ]);
    expect(fallbackProjectsPayload.projects.every((project) => project.source === "github")).toBe(true);
    expect(JSON.stringify(fallbackProjectsPayload)).not.toContain("GROQ_API_KEY");
  });
});
