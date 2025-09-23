import express from "express";
import fs from "node:fs";
import { CSV_PATH, DEFAULT_HAS_HEADER } from "../config.js";
import { ensureLoaded, reloadCsv } from "../lib/csv.js";

const router = express.Router();

// Endpoint/access point /api/status
router.get("/status", (req, res) => {
  const hasHeader =
    String(req.query.hasHeader ?? "").toLowerCase() === "true"
      ? true
      : DEFAULT_HAS_HEADER;

  try {
    const data = ensureLoaded({ hasHeader });
    res.json({
      file: CSV_PATH,
      hasHeader,
      rows: data.count,
      cols: data.cols,
      header: data.header,
      sample: data.rows.slice(0, 5),
    });
  } catch (e) {
    res.status(500).json({ error: String(e.message || e) });
  }
});

// Endpoint/access point /api/download
router.get("/download", (req, res) => {
  try {
    if (!fs.existsSync(CSV_PATH)) return res.status(404).send("CSV not found");
    res.setHeader("Content-Disposition", "attachment; filename=\"sensor-data.csv\"");
    res.setHeader("Content-Type", "text/csv");
    fs.createReadStream(CSV_PATH).pipe(res);
  } catch (e) {
    console.error("Download failed:", e);
    res.status(500).send("Download failed");
  }
});

// Endpoint/access point /api/reload
router.post("/reload", (req, res) => {
  const hasHeader =
    String(req.query.hasHeader ?? req.body?.hasHeader ?? "").toLowerCase() === "true"
      ? true
      : DEFAULT_HAS_HEADER;
  try {
    const data = reloadCsv({ hasHeader });
    res.json({ ok: true, rows: data.count, cols: data.cols, header: data.header });
  } catch (e) {
    res.status(500).json({ error: String(e.message || e) });
  }
});

// ENdpoint /api/records
router.get("/records", (req, res) => {
  try {
    const data = ensureLoaded();
    const limit = Math.min(Number(req.query.limit ?? 200), 5000);
    const offset = Math.max(Number(req.query.offset ?? 0), 0);
    const slice = data.rows.slice(offset, offset + limit);
    res.json({ count: data.count, offset, limit, rows: slice });
  } catch (e) {
    res.status(500).json({ error: String(e.message || e) });
  }
});

// Endpoint/access point /api/series
router.get("/series", (req, res) => {
  try {
    const data = ensureLoaded();

    const limit = Math.min(Number(req.query.limit ?? 2000), 20000);
    const reqCols = String(req.query.cols ?? "").trim();

    let colIndices = [];
    if (reqCols) {
      const parts = reqCols.split(",").map((s) => s.trim()).filter(Boolean);
      for (const p of parts) {
        const idx = Number(p);
        if (Number.isInteger(idx) && idx >= 0 && idx < data.cols) colIndices.push(idx);
      }
    } else {
      colIndices = Array.from({ length: Math.min(5, data.cols) }, (_, i) => i);
    }

    if (colIndices.length === 0) {
      return res.status(400).json({ error: "No valid columns requested." });
    }

    const x = [];
    const series = colIndices.map((i) => ({
      key: data.header ? data.header[i] : `c${i}`,
      values: [],
    }));

    const n = Math.min(data.rows.length, limit);
    for (let r = 0; r < n; r++) {
      x.push(r);
      for (let s = 0; s < colIndices.length; s++) {
        const cIdx = colIndices[s];
        const v = data.rows[r][cIdx];
        series[s].values.push(typeof v === "number" ? v : (v == null ? null : Number(v) || null));
      }
    }

    res.json({ count: n, x, series });
  } catch (e) {
    res.status(500).json({ error: String(e.message || e) });
  }
});

export default router;