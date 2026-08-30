import { getProjectOverride, projectOverrides } from "@/lib/projects/overrides";
import { projectCategories, projectMaturities } from "@/lib/projects/types";

describe("project overrides", () => {
  it("defines stable public project enums", () => {
    expect(projectCategories).toEqual([
      "web",
      "automation",
      "infra",
      "technical-base",
      "experiment",
    ]);
    expect(projectMaturities).toEqual([
      "production-minded",
      "prototype",
      "study",
      "experiment",
      "archived",
    ]);
  });

  it("curates the known strongest repositories", () => {
    expect(getProjectOverride("Astrolink")).toMatchObject({
      featured: true,
      order: 1,
      category: "infra",
    });
    expect(getProjectOverride("3035-TEACH")).toMatchObject({
      featured: true,
      order: 2,
      category: "technical-base",
    });
    expect(Object.keys(projectOverrides).length).toBeGreaterThanOrEqual(2);
  });

  it("normalizes repo names when looking up overrides", () => {
    expect(getProjectOverride("3035-TEACH")).toMatchObject({
      featured: true,
      category: "technical-base",
    });
    expect(getProjectOverride("unknown-repo")).toBeUndefined();
  });
});
