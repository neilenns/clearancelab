-- cspell:disable
DELETE FROM airports;
DELETE FROM plans;
DELETE FROM scenarios;
DELETE FROM explanations;

INSERT INTO airports (airportCode, name) VALUES 
  ('RCKH', 'Kaohsiung International'), 
  ('KLAS', 'Harry Reid International'), 
  ('PHNL', 'Daniel K Inouye International'), 
  ('KLAX', 'Los Angeles International'), 
  ('KPHX', 'Phoenix Sky Harbor International'), 
  ('CYEG', 'Edmonton International'), 
  ('KPDX', 'Portland International');

INSERT INTO plans (id, aid, alt, bcn, cid, dep, dest, eq, homeAirport, pilotName, rte, spd, typ, vatsimId) VALUES 
  (1, 'ASA17', 350, 6600, 925, "KPDX", "KLAS", "L", "KPDX", "Quinn", "CASCD4 PAWLI RUFUS RALEY OAL BASIC COKTL1", 225, "B739", 1531877);

INSERT INTO scenarios (canClear, isValid, planId, views) VALUES
  (1, 1, 1, 0);

INSERT INTO explanations (id, scenarioId, description, headline, level) VALUES
  (1, 1, "Change the suffix to '/L' in the flight plan then clear the pilot as usual.", "The equipment suffix '/X' is not valid for this aircraft type.", "warning"),
  (2, 1, "Issue a full route clearance on the preferred route: CASCD4 CHISM JUDAH JUNEJ Q7 JAGWA BURGL IRNMN2.", "The route is nonsense.", "error");