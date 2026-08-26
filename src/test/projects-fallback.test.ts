import { fallbackProjectsPayload } from "@/lib/projects/fallback";

describe("fallback projects payload", () => {
  it("converts current curated projects into the new safe payload shape", () => {
    expect(fallbackProjectsPayload.owner).toBe("charlles-dev");
    expect(fallbackProjectsPayload.featured.map((project) => project.displayName)).toEqual([
      "charlles-dev-portfolio", "trakr", "3035-TEACH", "Astrolink",
    ]);
    expect(fallbackProjectsPayload.projects.map((project) => project.fullName)).toEqual([
      "charlles-dev/charlles-dev-portfolio", "charlles-dev/trakr", "charlles-dev/3035-TEACH",
      "charlles-dev/Astrolink", "charlles-dev/charlles-dev", "charlles-dev/bfd-labs", "charlles-dev/Streamly",
    ]);
    expect(
      fallbackProjectsPayload.projects.every((project) =>
        project.htmlUrl.startsWith("https://github.com/charlles-dev/"),
      ),
    ).toBe(true);
    expect(fallbackProjectsPayload.featured).not.toBe(fallbackProjectsPayload.projects);
    expect(fallbackProjectsPayload.featured[0]).not.toBe(fallbackProjectsPayload.projects[0]);
    expect(fallbackProjectsPayload.projects.every((project) => project.source === "github")).toBe(
      true,
    );
    expect(fallbackProjectsPayload.projects.every((project) => project.private === false)).toBe(true);
    expect(JSON.stringify(fallbackProjectsPayload)).not.toContain("Laudos-Proxxima");
    expect(JSON.stringify(fallbackProjectsPayload)).not.toContain("GROQ_API_KEY");
  });
});
