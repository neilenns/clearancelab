export function splitAircraftType(
  rawAircraftType?: string,
): [string?, string?] {
  let isHeavy = false;
  let isSuper = false;
  let equipmentCode: string | undefined = undefined;
  let equipmentSuffix: string | undefined = undefined;

  if (!rawAircraftType) {
    return [undefined, undefined];
  }

  if (rawAircraftType.startsWith("H/")) {
    isHeavy = true;
    rawAircraftType = rawAircraftType.slice(2); // Strip off the leading "H/"
  }

  if (rawAircraftType.startsWith("S/")) {
    isSuper = true;
    rawAircraftType = rawAircraftType.slice(2); // Strip off the leading "S/"
  }

  const codeMatch = /^([A-Z0-9]+)(\/([A-Z]))?$/.exec(rawAircraftType);

  if (codeMatch != undefined && codeMatch.length > 0) {
    // Add back the prefix if isHeavy or isSuper is true
    if (isHeavy) {
      equipmentCode = `H/${codeMatch[1]}`;
    } else if (isSuper) {
      equipmentCode = `S/${codeMatch[1]}`;
    } else {
      equipmentCode = codeMatch[1];
    }

    if (codeMatch.length > 2 && codeMatch[3].length > 0) {
      equipmentSuffix = codeMatch[3];
    }
  } else {
    equipmentCode = rawAircraftType;
  }

  return [equipmentCode, equipmentSuffix];
}
