import re
import json
import uuid

# Standardized filenames
input_file_path = "scripts/rawFlightPlans.txt"
output_file_path = "scripts/flightPlans.json"


def split_typ_eq(typ_eq):
    if '/' in typ_eq:
        parts = typ_eq.rsplit('/', 1)
        return parts[0], parts[1]
    else:
        return typ_eq, ""


def parse_flight_plan_line(line):
    tokens = re.split(r'\s+', line.strip())
    if len(tokens) < 8:
        return None  # skip too-short lines

    aid = tokens[0]
    typ_eq_raw = tokens[1]
    typ, eq = split_typ_eq(typ_eq_raw)

    try:
        bcn = int(tokens[3])
        alt = int(tokens[7])
    except ValueError:
        return None  # skip lines with malformed numbers

    dep = tokens[4]
    dest = tokens[6]
    rte = ' '.join(tokens[8:]) if len(tokens) > 8 else ""

    return {
        "id": str(uuid.uuid4()),
        "aid": aid,
        "typ": typ,
        "eq": eq,
        "bcn": bcn,
        "dep": dep,
        "dest": dest,
        "alt": alt,
        "rte": rte,
        "raw": line.strip()
    }


def main():
    with open(input_file_path, "r") as infile:
        lines = infile.readlines()

    entries = []
    for line in lines:
        if line.strip():
            parsed = parse_flight_plan_line(line)
            if parsed:
                entries.append(parsed)

    with open(output_file_path, "w") as outfile:
        json.dump(entries, outfile, indent=2)

    print(f"Converted {len(entries)} entries to {output_file_path}")


if __name__ == "__main__":
    main()
