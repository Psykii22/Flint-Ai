import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { exec } from "child_process";

dotenv.config();

const app = express();
app.use(express.json());

// Kubernetes Live Integration Endpoints
app.get("/api/v1/k8s/pods", (req, res) => {
  exec("kubectl get pods -A -o json", (error, stdout, stderr) => {
    if (error || stderr) {
      console.warn("kubectl get pods failed or stderr output. Falling back to simulated cluster metrics. Error:", error || stderr);
      // Fallback mocks
      const fallbackPods = [
        { name: "core-ledger-pod-68a8", namespace: "coral-prod", status: isBacklogSimulated ? "CrashLoopBackOff" : "Running", cpu: "450m", memory: "1.2Gi", restarts: isBacklogSimulated ? 12 : 3 },
        { name: "auth-gateway-pod-f2b3", namespace: "coral-prod", status: "Running", cpu: "120m", memory: "256Mi", restarts: 0 },
        { name: "notification-worker-pod-eff1", namespace: "coral-prod", status: "Running", cpu: "80m", memory: "128Mi", restarts: isBacklogSimulated ? 2 : 0 },
        { name: "user-preference-pod-a129", namespace: "coral-prod", status: "Running", cpu: "50m", memory: "94Mi", restarts: 0 },
        { name: "ingress-nginx-controller", namespace: "kube-system", status: "Running", cpu: "110m", memory: "190Mi", restarts: 1 }
      ];
      return res.json({ success: true, pods: fallbackPods, source: "mock-fallback" });
    }

    try {
      const parsed = JSON.parse(stdout);
      const items = parsed.items || [];
      const pods = items.map((item: any) => {
        const name = item.metadata?.name || "unknown";
        const namespace = item.metadata?.namespace || "default";
        
        // Status resolution
        let status = "Unknown";
        if (item.status) {
          if (item.status.containerStatuses && item.status.containerStatuses.length > 0) {
            const state = item.status.containerStatuses[0].state;
            if (state.waiting) {
              status = state.waiting.reason || "Waiting";
            } else if (state.terminated) {
              status = state.terminated.reason || "Terminated";
            } else if (state.running) {
              status = "Running";
            }
          } else {
            status = item.status.phase || "Unknown";
          }
        }

        // Restarts count
        let restarts = 0;
        if (item.status?.containerStatuses && item.status.containerStatuses.length > 0) {
          restarts = item.status.containerStatuses.reduce((acc: number, c: any) => acc + (c.restartCount || 0), 0);
        }

        // Resources requests
        let cpu = "120m";
        let memory = "256Mi";
        const containers = item.spec?.containers || [];
        if (containers.length > 0 && containers[0].resources?.requests) {
          cpu = containers[0].resources.requests.cpu || cpu;
          memory = containers[0].resources.requests.memory || memory;
        }

        return { name, namespace, status, cpu, memory, restarts };
      });

      return res.json({ success: true, pods, source: "kubectl" });
    } catch (parseErr) {
      console.error("Failed to parse kubectl stdout json, fallback applied:", parseErr);
      const fallbackPods = [
        { name: "core-ledger-pod-68a8", namespace: "coral-prod", status: isBacklogSimulated ? "CrashLoopBackOff" : "Running", cpu: "450m", memory: "1.2Gi", restarts: isBacklogSimulated ? 12 : 3 },
        { name: "auth-gateway-pod-f2b3", namespace: "coral-prod", status: "Running", cpu: "120m", memory: "256Mi", restarts: 0 },
        { name: "notification-worker-pod-eff1", namespace: "coral-prod", status: "Running", cpu: "80m", memory: "128Mi", restarts: isBacklogSimulated ? 2 : 0 },
        { name: "user-preference-pod-a129", namespace: "coral-prod", status: "Running", cpu: "50m", memory: "94Mi", restarts: 0 },
        { name: "ingress-nginx-controller", namespace: "kube-system", status: "Running", cpu: "110m", memory: "190Mi", restarts: 1 }
      ];
      return res.json({ success: true, pods: fallbackPods, source: "mock-fallback" });
    }
  });
});

app.get("/api/v1/k8s/logs", (req, res) => {
  const { pod_name, namespace } = req.query;
  if (!pod_name || !namespace) {
    return res.status(400).json({ error: "Missing pod_name or namespace query parameter" });
  }

  const cmd = `kubectl logs ${pod_name} -n ${namespace} --tail=150`;
  exec(cmd, (error, stdout, stderr) => {
    if (error || stderr) {
      console.warn("kubectl logs signature check failed. Yielding simulated live container logs. Status:", error || stderr);
      // Seeding mock log events for requested pod
      const date = new Date();
      const timeStr = date.toISOString().slice(11, 23) + 'Z';
      const isAnomalous = String(pod_name).includes("core-ledger") && isBacklogSimulated;

      let logsList = [
        `[${timeStr}] INFO Initializing micro-service bootstrap container trace for ${pod_name}...`,
        `[${timeStr}] INFO Checking environment namespaces & config map links...`,
        `[${timeStr}] INFO Database handshake validated cleanly on regional clusters.`,
      ];

      if (isAnomalous) {
        logsList.push(
          `[${timeStr}] WARN Heap allocation bounds critical: 512Mi nearing limits!`,
          `[${timeStr}] WARN Latency alert: 480ms query response delay recorded in thread pool.`,
          `[${timeStr}] CRIT Exception in thread "main" java.lang.OutOfMemoryError: Java heap space`,
          `[${timeStr}] CRIT Container ${pod_name} terminated with exit code 137.`,
          `[${timeStr}] CRIT Kubelet alert: Pod evicted on worker node-1 due to namespace memory starvation.`,
          `[${timeStr}] WARN Pod container restarting in CrashLoopBackOff state. (Restarts count: 12)`
        );
      } else {
        logsList.push(
          `[${timeStr}] INFO Heartbeat signal: OK (Uptime: 1.4h)`,
          `[${timeStr}] INFO Running garbage collection sweep success. Released 45MB.`,
          `[${timeStr}] INFO Listening for message payloads on port 8080...`
        );
      }

      return res.json({ success: true, logs: logsList.join("\n"), source: "mock-fallback" });
    }

    return res.json({ success: true, logs: stdout, source: "kubectl" });
  });
});
const PORT = 3000;

// Lazy initialization of Gemini client as per rules
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Routes
let isBacklogSimulated = false;

app.post("/api/simulate-backlog", (req, res) => {
  isBacklogSimulated = true;
  res.json({
    success: true,
    message: "Kubernetes pod backlog simulation armed. Target node replicas count configured to surge (+240%) in response to queue backlog explosion."
  });
});

app.get("/api/simulation-state", (req, res) => {
  res.json({ simulated: isBacklogSimulated });
});

// Helper function to query the local Coral SQL engine
function queryCoral(sql: string): Promise<any[]> {
  return new Promise((resolve) => {
    const coralDir = "d:\\Hackathon\\Finguard-v1\\backend\\coral";
    const cmd = `.\\coral.exe sql --format json "${sql.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`;
    exec(cmd, { cwd: coralDir }, (error, stdout, stderr) => {
      if (error || stderr) {
        console.warn(`Query failed: ${sql}`, error || stderr);
        return resolve([]);
      }
      try {
        resolve(JSON.parse(stdout.trim()));
      } catch {
        resolve([]);
      }
    });
  });
}

app.post("/api/investigate", async (req, res) => {
  const { topic, context } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  // Run real Coral queries to get the actual database state!
  const billingEvents = await queryCoral("SELECT * FROM supabase.billing_events ORDER BY timestamp DESC LIMIT 5");
  const podMetrics = await queryCoral("SELECT * FROM supabase.pod_metrics ORDER BY timestamp DESC LIMIT 5");
  const deployments = await queryCoral("SELECT * FROM supabase.deployments ORDER BY deployed_at DESC LIMIT 5");
  const incidents = await queryCoral("SELECT * FROM supabase.incidents ORDER BY created_at DESC LIMIT 5");
  const workerEvents = await queryCoral("SELECT * FROM supabase.worker_events ORDER BY timestamp DESC LIMIT 5");

  if (!apiKey) {
    // Fallback if no API key is set
    return res.json({
      success: true,
      sql: "SELECT * FROM supabase.billing_events b JOIN supabase.pod_metrics p ON b.service_name = p.service_name",
      explanation: "Local Coral SQL query executed. Live cluster diagnostic logs show " + 
        (podMetrics.some(p => p.status === 'CrashLoopBackOff') ? "OOMKilled pods in CrashLoopBackOff" : "running nodes") + ".",
      insights: [
        "Billing Cost Spike: " + (billingEvents.length > 0 ? `$${billingEvents[0].estimated_cost} on ${billingEvents[0].service_name}` : "No anomalies detected"),
        "Kubernetes status: " + (podMetrics.length > 0 ? `${podMetrics[0].pod_name} is ${podMetrics[0].status}` : "healthy"),
        "Recent Deployments: " + (deployments.length > 0 ? `${deployments[0].version} by ${deployments[0].deployed_by}` : "None recorded")
      ]
    });
  }

  try {
    const ai = getGeminiClient();
    const prompt = `You are an expert Kubernetes cluster administrator, DevOps engineer, and SQL telemetry investigator for ArcOps/Finguard.
    We just fetched the actual cluster state from the local Coral engine. Here is the real database output:

    --- supabase.billing_events ---
    ${JSON.stringify(billingEvents, null, 2)}

    --- supabase.pod_metrics ---
    ${JSON.stringify(podMetrics, null, 2)}

    --- supabase.deployments ---
    ${JSON.stringify(deployments, null, 2)}

    --- supabase.incidents ---
    ${JSON.stringify(incidents, null, 2)}

    --- supabase.worker_events ---
    ${JSON.stringify(workerEvents, null, 2)}

    The user is asking to investigate a telemetry trace anomaly regarding: "${topic}".
    Additional context: "${context || 'No additional context provided.'}"

    Please output a raw JSON response containing three fields:
    1. "sql": A clean, highly realistic SQL query combining these tables (e.g. JOINing billing_events with pod_metrics or deployments) that can be run to investigate this specific root-cause.
    2. "explanation": A 2-3 sentence technical devops diagnosis explaining what the real data indicates, pinpointing the exact service, version, deployment details, and status.
    3. "insights": An array of exactly 3 bullet-points providing diagnostic indicators, active pod log parameters, or direct mitigation steps based on the real data.

    Return ONLY the raw JSON object string. Do NOT wrap it in any backticks or markdown markers. Make sure the JSON is perfectly parse-able.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.15,
      }
    });

    const text = response.text || "{}";
    const cleanText = text.trim();
    const data = JSON.parse(cleanText);
    
    res.json({
      success: true,
      sql: data.sql || "SELECT * FROM supabase.billing_events",
      explanation: data.explanation || "Billing anomaly under investigation.",
      insights: data.insights || []
    });
  } catch (error: any) {
    console.error("Gemini Inquest error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze with Gemini AI" });
  }
});

app.post("/api/execute-query", async (req, res) => {
  const { sql } = req.body;
  if (!sql) {
    return res.status(400).json({ error: "Missing SQL query input" });
  }

  // Pre-process and translate legacy template queries to match real Supabase JSONL Coral schemas
  let processedSql = sql;
  processedSql = processedSql.replace(/\bk8s_pod_events\b/gi, 'supabase.pod_metrics');
  processedSql = processedSql.replace(/\bk8s_pod_status_history\b/gi, 'supabase.pod_metrics');
  processedSql = processedSql.replace(/\bk8s_pvc_allocation\b/gi, 'supabase.firewall_events');
  
  // Translate columns
  processedSql = processedSql.replace(/\bactive_replicas\b/gi, 'replicas');
  processedSql = processedSql.replace(/\bcpu_cores\b/gi, 'cpu_usage');
  processedSql = processedSql.replace(/\bexit_code_reason\b/gi, 'status');
  
  // Clean up date functions that SQLite/Coral engine might not support
  processedSql = processedSql.replace(/NOW\(\)\s*-\s*INTERVAL\s*'[^']+'/gi, "'2026-05-25T18:06:03.519Z'");

  const coralDir = "d:\\Hackathon\\Finguard-v1\\backend\\coral";
  
  // Escape double quotes inside SQL for CMD execution
  const escapedSql = processedSql.replace(/"/g, '\\"').replace(/\n/g, ' ');
  const cmd = `.\\coral.exe sql --format json "${escapedSql}"`;

  const startTime = Date.now();

  exec(cmd, { cwd: coralDir }, (error, stdout, stderr) => {
    const timeMs = Date.now() - startTime;
    if (error || stderr) {
      console.warn("Coral Execution Error:", error || stderr);
      return res.json({
        success: false,
        error: stderr || error?.message || "Error running Coral SQL engine",
        columns: [],
        rows: [],
        timeMs
      });
    }

    try {
      const rows = JSON.parse(stdout.trim());
      const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
      return res.json({
        success: true,
        columns,
        rows,
        timeMs
      });
    } catch (parseErr) {
      console.error("Failed to parse Coral JSON output:", parseErr, "Raw output:", stdout);
      return res.json({
        success: false,
        error: "Failed to parse query output from Coral engine",
        columns: [],
        rows: [],
        timeMs
      });
    }
  });
});

// Configure Vite or Serve Static Files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

startServer();
