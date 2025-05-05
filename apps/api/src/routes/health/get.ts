import express from "express";

const router = express.Router();

router.get("/", function (_request, response) {
  response.json({ status: "ok" });
});

export default router;
