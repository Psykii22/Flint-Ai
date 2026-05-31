import React, { useState } from 'react';
import { ShieldAlert, AlertOctagon, ThumbsUp, Radio, RefreshCw, Zap, Server, Globe } from 'lucide-react';

export default function ShieldWorkspace() {
  const [isScanning, setIsScanning] = useState(false);
  const [systemFeedback, setSystemFeedback] = useState<string | null>(null);
  const [logs, setLogs] = useState([
    { timestamp: "14:24:02Z", source: "192.168.1.104", target: "us-east-1a", protocol: "TLSv1.3", action: "ALLOW", event: "Internal API heartbeat" },
    { timestamp: "14:21:44Z", source: "185.220.101.44", target: "us-east-1c", protocol: "TCP/443", action: "BLOCK", event: "Threat DB: Malicious Tor Exit Node" },
    { timestamp: "14:15:00Z", source: "203.0.113.88", target: "us-east-1b", protocol: "SSH/22", action: "BLOCK", event: "Admin brute-force threshold flag" },
    { timestamp: "14:10:12Z", source: "8.8.8.8", target: "us-east-1a", protocol: "UDP/53", action: "ALLOW", event: "Google Cloud DNS resolution" },
    { timestamp: "13:58:11Z", source: "198.51.100.12", target: "us-east-1c", protocol: "HTTP/80", action: "BLOCK", event: "Restricted workspace endpoint traverse query" }
  ]);

  const handleScanNow = async () => {
    setIsScanning(true);
    setSystemFeedback(null);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsScanning(false);
    setLogs((prev) => [
      {
        timestamp: new Date().toISOString().slice(11, 19) + 'Z',
        source: "192.168.1.1",
        target: "us-east-1a",
        protocol: "HTTP/3",
        action: "ALLOW",
        event: "Local administrative health-check query probe"
      },
      ...prev
    ]);
    setSystemFeedback("Security scan complete. Zero unrecognized leaks detected across cloud run configurations.");
  };

  return (
    <div className="ml-64 mt-12 mb-6 p-8 flex flex-col gap-6 h-[calc(100vh-72px)] overflow-y-auto font-sans text-white scrollbar-thin">
      
      {/* Title */}
      <div className="flex justify-between items-end border-b border-white/10 pb-5 shrink-0">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-serif italic text-white leading-tight">Coral Shield Firewall</h2>
          <p className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-white/40 mt-1.5">Active packet filtering, threat mitigation database, and administrative auditing.</p>
        </div>
        <button
          onClick={handleScanNow}
          disabled={isScanning}
          className="h-9 px-5 bg-[#c5a27a] text-black font-mono text-[10px] uppercase tracking-widest font-bold rounded hover:bg-[#b08e67] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 duration-150 shadow-lg"
        >
          <RefreshCw size={11} className={`${isScanning ? 'animate-spin' : ''}`} />
          <span>Scan Audit</span>
        </button>
      </div>

      {/* Temporary feedback banner */}
      {systemFeedback && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-[#c5a27a] text-xs font-mono rounded flex justify-between items-center animate-fade-in shrink-0">
          <span>{systemFeedback}</span>
          <button onClick={() => setSystemFeedback(null)} className="text-[10px] hover:text-white font-bold uppercase tracking-widest">[Close]</button>
        </div>
      )}

      {/* Grid of system threats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 shrink-0 font-mono text-xs">
        
        {/* Card 1 */}
        <div className="bg-[#111112] border border-white/10 rounded p-5 border-l-[3px] border-l-rose-500 shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/40 uppercase tracking-widest text-[9px] font-bold">Threat Mitigation</span>
            <AlertOctagon size={13} className="text-rose-400 animate-pulse" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight mb-1">3 Alerts Active</div>
          <p className="text-white/50 text-[10px] font-sans leading-relaxed">Malicious intrusion retries detected from listed endpoints.</p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#111112] border border-white/10 rounded p-5 border-l-[3px] border-l-[#c5a27a] shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/40 uppercase tracking-widest text-[9px] font-bold">Port Scanner Blocks</span>
            <Zap size={13} className="text-[#c5a27a]" />
          </div>
          <div className="text-2xl font-bold text-[#c5a27a] tracking-tight mb-1">209 blocked traces</div>
          <p className="text-white/50 text-[10px] font-sans leading-relaxed">SSH brute-force and vulnerability scans automatically filtered.</p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#111112] border border-white/10 rounded p-5 border-l-[3px] border-l-emerald-500 shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/40 uppercase tracking-widest text-[9px] font-bold">TLS Encryption</span>
            <ThumbsUp size={13} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight mb-1">TLS v1.3 Enforced</div>
          <p className="text-white/50 text-[10px] font-sans leading-relaxed">All connections encrypted through automated LetsEncrypt key boundaries.</p>
        </div>

      </div>

      {/* Firewall Audit Trail terminal table */}
      <div className="bg-black/15 border border-white/10 rounded flex-1 flex flex-col overflow-hidden">
        <div className="bg-[#161617] px-5 py-3 border-b border-white/10 font-mono text-[10px] text-[#c5a27a] uppercase tracking-widest font-bold shrink-0">
          Active Packet Mitigation Logs
        </div>

        <div className="flex-grow overflow-auto font-mono text-xs scrollbar-thin">
          <table className="w-full text-left border-collapse select-text">
            <thead className="sticky top-0 bg-[#161617] text-white/40 border-b border-white/10 select-none z-10">
              <tr>
                <th className="py-2.5 px-5 font-normal text-[9px] uppercase tracking-wider">Timestamp</th>
                <th className="py-2.5 px-4 font-normal text-[9px] uppercase tracking-wider">Source IP</th>
                <th className="py-2.5 px-4 font-normal text-[9px] uppercase tracking-wider">Target Node</th>
                <th className="py-2.5 px-4 font-normal text-[9px] uppercase tracking-wider">Protocol</th>
                <th className="py-2.5 px-4 font-normal text-[9px] uppercase tracking-wider">Action</th>
                <th className="py-2.5 px-5 font-normal text-[9px] uppercase tracking-wider">Event Description</th>
              </tr>
            </thead>
            <tbody className="bg-transparent">
              {logs.map((log, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.015] transition-colors duration-150">
                  <td className="py-3 px-5 text-white/30 text-[10px]">{log.timestamp}</td>
                  <td className="py-3 px-4 text-[#c5a27a] font-semibold">{log.source}</td>
                  <td className="py-3 px-4 text-white/60">{log.target}</td>
                  <td className="py-3 px-4 text-[#c5a27a]/85 font-semibold text-[11px]">{log.protocol}</td>
                  <td className="py-3 px-4 font-bold">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase ${log.action === 'BLOCK' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-white/70 text-ellipsis truncate max-w-sm font-sans">{log.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
