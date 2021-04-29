import { createVariationId } from "@/lib/variations/variationId";
import { range, uniq } from "lodash";

it("should create a non-empty string id", function() {
  const id = createVariationId();
  expect(id).toBeTruthy();
  expect(typeof id).toBe("string");
});

it("should create unique ids", function() {
  const ids = range(1, 10).map(() => createVariationId());
  expect(uniq(ids)).toEqual(ids);
});
