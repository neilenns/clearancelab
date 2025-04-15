import re
import json
import uuid
import random

names = [
    "Avery", "Riley", "Jordan", "Skyler", "Quinn", "Sage", "Taylor", "Phoenix", "Emery", "Dakota"
]

# Standardized filenames
input_file_path = "scripts/rawFlightPlans.txt"
output_file_path = "scripts/flightPlans.json"


def get_random_bcn():
    ranges = [
        (650, 677),
        (2236, 2277),
        (3430, 3477),
        (7412, 7477),
    ]
    selected_range = random.choice(ranges)
    return f"{random.randint(*selected_range):04}"


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
        bcn = int(tokens[3]) or get_random_bcn()
        alt = int(tokens[7])
    except ValueError:
        return None  # skip lines with malformed numbers

    dep = tokens[4]
    dest = tokens[6]
    rte = ' '.join(tokens[8:]) if len(tokens) > 8 else ""

    return {
        "id": str(uuid.uuid4()),
        "pilotName": random.choice(names),
        "vatsimId": random.randint(800000, 1950000),
        "cid": random.randint(100, 999),
        "aid": aid,
        "typ": typ,
        "eq": eq,
        "bcn": bcn,
        "dep": dep,
        "dest": dest,
        "spd": round(random.randint(80, 450) / 5) * 5,
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
