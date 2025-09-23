import fs from "node:fs";
import { parse } from "csv-parse/sync";
import { CSV_PATH, DEFAULT_HAS_HEADER } from "../config.js";

function loadCsv({ hasHeader = DEFAULT_HAS_HEADER } = {}) {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV file missing: ${CSV_PATH}`);
    throw new Error(`CSV file not found at: ${CSV_PATH}`);
  }

  let buf;
  try {
    buf = fs.readFileSync(CSV_PATH);
    console.log(`Successfully read CSV file (${buf.length} bytes) from: ${CSV_PATH}`);
  } catch (e) {
    console.error(`Failed to read CSV file: ${CSV_PATH}\n   → ${String(e)}`);
    throw e;
  }

  let records;
  try {
    records = parse(buf, {
      delimiter: ",",
      bom: true,
      skip_empty_lines: true,
      relax_column_count: true,
    });
  } catch (e) {
    console.error(`Failed to parse CSV file: ${CSV_PATH}\n   → ${String(e)}`);
    throw e;
  }

  let header = null;
  let start = 0;
  if (hasHeader && records.length) {
    header = records[0].map((h, i) => String(h || `col${i}`));
    start = 1;
  }

  const rows = [];
  let cols = 0;
  for (let i = start; i < records.length; i++) {
    const r = records[i].map((v) => {
      if (v === "" || v === null || v === undefined) return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : String(v);
    });
    cols = Math.max(cols, r.length);
    rows.push(r);
  }

  return { rows, cols, header, count: rows.length };
}

// in memory cache for file data
let CACHE = null;

export function ensureLoaded(opts = {}) {
  if (!CACHE) CACHE = loadCsv(opts);
  return CACHE;
}

export function reloadCsv(opts = {}) {
  CACHE = loadCsv(opts);
  return CACHE;
}