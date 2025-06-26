export function splitAircraftType(
  rawAircraftType?: string,
): [string?, string?] {
  let equipmentCode: string | undefined = undefined;
  let equipmentSuffix: string | undefined = undefined;

  if (!rawAircraftType) {
    return [undefined, undefined];
  }

  if (rawAircraftType.startsWith("H/")) {
    rawAircraftType = rawAircraftType.slice(2); // Strip off the leading "H/"
  }

  if (rawAircraftType.startsWith("S/")) {
    rawAircraftType = rawAircraftType.slice(2); // Strip off the leading "S/"
  }

  const codeMatch = /^([A-Z0-9]+)(\/([A-Z]))?$/.exec(rawAircraftType);

  if (codeMatch != undefined && codeMatch.length > 0) {
    equipmentCode = codeMatch[1];

    if (codeMatch.length > 2 && codeMatch[3].length > 0) {
      equipmentSuffix = codeMatch[3];
    }
  } else {
    equipmentCode = rawAircraftType;
  }

  return [equipmentCode, equipmentSuffix];
}
