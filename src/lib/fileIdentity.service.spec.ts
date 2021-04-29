import { FileIdentityService } from "@/lib/fileIdentity.service";
function asFile(obj: Partial<File>): File {
  return obj as File;
}

let fileIdentity: FileIdentityService;
beforeEach(() => (fileIdentity = new FileIdentityService()));

describe("#everyNthChunk", () => {
  test("returns 1 for very small files (< 4 chunks)", () => {
    expect(
      fileIdentity["everyNthChunk"](
        asFile({ size: fileIdentity["CHUNK_SIZE"] })
      )
    ).toEqual(1);

    expect(
      fileIdentity["everyNthChunk"](
        asFile({ size: fileIdentity["CHUNK_SIZE"] * 3 })
      )
    ).toEqual(1);
  });

  test("returns 2 for medium files (<= 8 chunks)", () => {
    expect(
      fileIdentity["everyNthChunk"](
        asFile({ size: fileIdentity["CHUNK_SIZE"] * 4 })
      )
    ).toEqual(2);

    expect(
      fileIdentity["everyNthChunk"](
        asFile({ size: fileIdentity["CHUNK_SIZE"] * 8 })
      )
    ).toEqual(2);
  });

  test("returns correct values for larger files (> 12 chunks)", () => {
    expect(
      fileIdentity["everyNthChunk"](
        asFile({ size: fileIdentity["CHUNK_SIZE"] * 20 })
      )
    ).toEqual(4);

    expect(
      fileIdentity["everyNthChunk"](
        asFile({ size: fileIdentity["CHUNK_SIZE"] * 60 })
      )
    ).toEqual(7);

    expect(
      fileIdentity["everyNthChunk"](
        asFile({ size: fileIdentity["CHUNK_SIZE"] * 80 })
      )
    ).toEqual(8);
  });
});
