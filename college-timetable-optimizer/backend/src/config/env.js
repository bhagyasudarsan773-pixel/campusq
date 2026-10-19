import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../../');
const PROJECT_ENV_PATH = path.join(PROJECT_ROOT, '.env');

/**
 * Lightweight zero-dependency .env parser that safely reads environment variables
 * from ~/.env and project .env without exposing secrets in logs.
 */
function parseEnvFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) return {};
    const content = fs.readFileSync(filePath, 'utf-8');
    const result = {};
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eqIdx = line.indexOf('=');
      if (eqIdx === -1) continue;
      const key = line.slice(0, eqIdx).trim();
      let val = line.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      result[key] = val;
    }
    return result;
  } catch {
    return {};
  }
}

const homeEnv = parseEnvFile(path.join(os.homedir(), '.env'));
const projectEnv = parseEnvFile(PROJECT_ENV_PATH);

const mergedEnv = {
  ...homeEnv,
  ...projectEnv,
  ...process.env,
};

function normalizeEndpoint(url) {
  const trimmed = (url || '').trim();
  if (!trimmed || trimmed.includes('api.qualcomm.ai')) {
    return 'https://app.aihub.qualcomm.com';
  }
  return trimmed;
}

// Runtime configuration state (persisted to .env when updated via UI)
const runtimeConfig = {
  port: Number(mergedEnv.PORT || 4000),
  host: mergedEnv.HOST || 'localhost',
  qualcommApiKey:
    mergedEnv.QUALCOMM_API_KEY ||
    mergedEnv.QAI_HUB_API_TOKEN ||
    mergedEnv.IMAGINE_API_KEY ||
    mergedEnv.QAIHUB_API_TOKEN ||
    '',
  qualcommEndpoint: normalizeEndpoint(
    mergedEnv.QUALCOMM_AI_ENDPOINT || mergedEnv.IMAGINE_ENDPOINT
  ),
  qualcommModel: mergedEnv.QUALCOMM_AI_MODEL || 'Llama-3.1-8B-Instruct',
  qualcommTimeoutMs: Number(mergedEnv.QUALCOMM_TIMEOUT_MS || 15000),
};

function persistToProjectEnv() {
  try {
    const existing = parseEnvFile(PROJECT_ENV_PATH);
    const updated = {
      ...existing,
      PORT: String(runtimeConfig.port),
      HOST: runtimeConfig.host,
      QUALCOMM_API_KEY: runtimeConfig.qualcommApiKey,
      QUALCOMM_AI_ENDPOINT: runtimeConfig.qualcommEndpoint,
      QUALCOMM_AI_MODEL: runtimeConfig.qualcommModel,
    };
    const lines = Object.entries(updated).map(([k, v]) => `${k}=${v ?? ''}`);
    fs.writeFileSync(PROJECT_ENV_PATH, lines.join('\n') + '\n', { mode: 0o600 });
  } catch {
    // Ignore write errors in read-only environments
  }
}

export function getConfig() {
  const key = runtimeConfig.qualcommApiKey || '';
  const maskedKey =
    key.length > 8
      ? `${key.slice(0, 4)}${'*'.repeat(Math.min(12, key.length - 8))}${key.slice(-4)}`
      : key.length > 0
      ? '****'
      : '';

  return {
    port: runtimeConfig.port,
    host: runtimeConfig.host,
    qualcommEndpoint: runtimeConfig.qualcommEndpoint,
    qualcommModel: runtimeConfig.qualcommModel,
    qualcommTimeoutMs: runtimeConfig.qualcommTimeoutMs,
    hasQualcommKey: Boolean(key && key.trim().length > 0),
    maskedKey,
    rawKey: key,
  };
}

export function updateQualcommConfig({ apiKey, endpoint, model }) {
  if (typeof apiKey === 'string' && apiKey.trim().length > 0) {
    runtimeConfig.qualcommApiKey = apiKey.trim();
  }
  if (typeof endpoint === 'string' && endpoint.trim()) {
    runtimeConfig.qualcommEndpoint = normalizeEndpoint(endpoint);
  }
  if (typeof model === 'string' && model.trim()) {
    runtimeConfig.qualcommModel = model.trim();
  }
  persistToProjectEnv();
  return getConfig();
}
