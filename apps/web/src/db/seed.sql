-- cspell:disable
DELETE FROM airports;
DELETE FROM scenarios;
DELETE FROM explanations;
DELETE FROM airlines;

INSERT INTO airlines (airlineCode, telephony) VALUES
  ("ASA", "Alaska"),
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

INSERT INTO scenarios (id, canClear, isValid, views, plan_aid, plan_alt, plan_bcn, plan_cid, plan_dep, plan_dest, plan_eq, plan_homeAirport, plan_pilotName, plan_rte, plan_spd, plan_typ, plan_vatsimId, craft_altitude, craft_clearanceLimit, craft_controllerName, craft_frequency, craft_route, craft_telephony, airportConditions_flow, airportConditions_altimeter, airportConditions_departureOnline) VALUES
  (1, 1, 1, 0, 'ASA17', 350, 6600, 925, "KPDX", "KLAS", "L", "KPDX", "Quinn", "CASCD4 PAWLI RUFUS RALEY OAL BASIC COKTL1", 225, "B739", 1531877,  "Climb via SID except maintain 7000", null, "Portland Ground", 124.35, "CASCD4 departure, then as filed", "Alaska seventeen", "east", 29.92, 1);

INSERT INTO explanations (id, scenarioId, description, headline, level) VALUES
  (1, 1, "Change the suffix to '/L' in the flight plan then clear the pilot as usual.", "The equipment suffix '/X' is not valid for this aircraft type.", "warning"),
  (2, 1, "Issue a full route clearance on the preferred route: CASCD4 CHISM JUDAH JUNEJ Q7 JAGWA BURGL IRNMN2.", "The route is nonsense.", "error");
