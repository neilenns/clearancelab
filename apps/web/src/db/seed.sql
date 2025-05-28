-- cspell:disable
DELETE FROM airports;
DELETE FROM plans;
DELETE FROM scenarios;
DELETE FROM explanations;
DELETE FROM craft;
DELETE FROM airlines;

INSERT INTO airlines (airlineCode, telephony) VALUES
  ("GTI", "Giant"),
  ("DAL", "Delta");

INSERT INTO airports (airportCode, name) VALUES 
  ('RCKH', 'Kaohsiung International'), 
  ('KLAS', 'Harry Reid International'), 
  ('PHNL', 'Daniel K Inouye International'), 
  ('KLAX', 'Los Angeles International'), 
  ('KPHX', 'Phoenix Sky Harbor International'), 
  ('CYEG', 'Edmonton International'), 
  ('KPDX', 'Portland International');

INSERT INTO scenarios (id, canClear, isValid, views) VALUES
  (1, 1, 1, 0);

INSERT INTO plans (id, scenarioId, aid, alt, bcn, cid, dep, dest, eq, homeAirport, pilotName, rte, spd, typ, vatsimId) VALUES 
  (1, 1, 'ASA17', 350, 6600, 925, "KPDX", "KLAS", "L", "KPDX", "Quinn", "CASCD4 PAWLI RUFUS RALEY OAL BASIC COKTL1", 225, "B739", 1531877);


INSERT INTO explanations (id, scenarioId, description, headline, level) VALUES
  (1, 1, "Change the suffix to '/L' in the flight plan then clear the pilot as usual.", "The equipment suffix '/X' is not valid for this aircraft type.", "warning"),
  (2, 1, "Issue a full route clearance on the preferred route: CASCD4 CHISM JUDAH JUNEJ Q7 JAGWA BURGL IRNMN2.", "The route is nonsense.", "error");

  INSERT INTO craft (id, scenarioId, altitude, clearanceLimit, controllerName, frequency, route, telephony) VALUES
  (1, 1, "Climb via SID except maintain 7000", null, "Portland Ground", 124.35, "CASCD4 departure, then as filed", "Alaska seventeen" );