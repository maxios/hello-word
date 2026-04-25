import { mapFormToPayload, mapPayloadToItem } from "../mappers/composeMapper";
import type { ComposeFormValues } from "../schemas/compose.types";

describe("composeMapper", () => {
  const baseForm: ComposeFormValues = {
    name: "  Test item ",
    description: "  some body  ",
    contactEmail: "  PERSON@Example.COM ",
    category: "feedback",
    priority: "high",
    dueDate: new Date("2030-01-15T00:00:00.000Z"),
    isPublic: true,
    acceptTerms: true,
  };

  describe("mapFormToPayload", () => {
    it("trims and lowercases the email", () => {
      const payload = mapFormToPayload(baseForm);
      expect(payload.contactEmail).toBe("person@example.com");
    });

    it("trims leading/trailing whitespace from text fields", () => {
      const payload = mapFormToPayload(baseForm);
      expect(payload.name).toBe("Test item");
      expect(payload.description).toBe("some body");
    });

    it("serialises dates to ISO strings", () => {
      const payload = mapFormToPayload(baseForm);
      expect(payload.dueDate).toBe("2030-01-15T00:00:00.000Z");
    });

    it("passes null for missing dates", () => {
      const payload = mapFormToPayload({ ...baseForm, dueDate: null });
      expect(payload.dueDate).toBeNull();
    });
  });

  describe("mapPayloadToItem", () => {
    it("defaults unknown priorities to 'medium'", () => {
      const item = mapPayloadToItem({
        id: "1",
        name: "n",
        description: "d",
        contactEmail: "e@example.com",
        category: "general",
        priority: "",
        dueDate: null,
        isPublic: false,
        createdAt: "2026-04-22T00:00:00.000Z",
      });
      expect(item.priority).toBe("medium");
    });
  });
});
