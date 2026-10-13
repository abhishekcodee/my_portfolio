import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Database, Cloud, Sparkles, Check, Play, Command } from 'lucide-react';

export const DeveloperDashboard = () => {
  const [activeTab, setActiveTab] = useState('php'); // 'php' | 'python' | 'terminal'
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([
    { type: 'output', text: 'Abhishek Upadhyay DevShell v3.6.0' },
    { type: 'output', text: 'Type "help" or "skills" or "projects" to explore.' }
  ]);

  const phpSnippet = `<?php
// PRAYAS Recruitment Exam Security Controller
class AptitudeExamController {
    private $pdo;
    
    public function evaluateCandidate($studentId, $answers) {
        $stmt = $this->pdo->prepare(
            "SELECT id, correct_option FROM question_bank WHERE test_id = :id"
        );
        $stmt->execute(['id' => 101]);
        $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $score = 0;
        foreach ($questions as $q) {
            if (isset($answers[$q['id']]) && $answers[$q['id']] === $q['correct_option']) {
                $score += 2;
            }
        }
        
        return $this->saveResultPDO($studentId, $score);
    }
}`;

  const pythonSnippet = `# Smart IoT Telemetry Collector Daemon
import time
import paho.mqtt.client as mqtt

def on_sensor_telemetry(client, userdata, msg):
    payload = json.loads(msg.payload.decode('utf-8'))
    temp = payload.get('temperature')
    relays = payload.get('relay_state')
    
    if temp > 75.0:
        trigger_overheat_alert(payload['device_id'])
        client.publish("industrial/relays/cutoff", json.dumps({"status": "OFF"}))
    
    save_to_mysql(payload)

client = mqtt.Client("IoT_Gateway_01")
client.on_message = on_sensor_telemetry
client.connect("broker.hivemq.com", 1883, 60)
client.loop_start()`;

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...terminalLogs, { type: 'input', text: `$ ${terminalInput}` }];

    if (cmd === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else if (cmd === 'help') {
      newLogs.push({
        type: 'output',
        text: 'Available commands: whoami, skills, projects, prayas, contact, clear'
      });
    } else if (cmd === 'whoami') {
      newLogs.push({
        type: 'output',
        text: 'Abhishek Upadhyay | Software Developer | Web, Backend & IoT Systems'
      });
    } else if (cmd === 'skills') {
      newLogs.push({
        type: 'output',
        text: 'Core Stacks: Python, Core PHP, MySQL, PDO, React, WordPress/Tutor LMS, IoT, AWS'
      });
    } else if (cmd === 'projects' || cmd === 'prayas' || cmd === 'hrms') {
      newLogs.push({
        type: 'output',
        text: 'Featured Projects: [1] HRMS – Human Resource Management System (PHP/MySQL) [2] PRAYAS Recruitment Portal (PHP/MySQL) [3] PRAYAS Automation Academy (LMS)'
      });
    } else if (cmd === 'contact') {
      newLogs.push({
        type: 'output',
        text: 'Email: amanupadhyay2030@gmail.com | LinkedIn: linkedin.com/in/abhishek-upadhyay-a20617376 | Location: India'
      });
    } else {
      newLogs.push({
        type: 'output',
        text: `Command not recognized: "${cmd}". Type "help" for a list of commands.`
      });
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Background Neon Backdrop Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-cyan-500 to-teal-400 rounded-3xl blur-xl opacity-30 animate-pulse-glow" />

      {/* Main Terminal & Code Editor Window */}
      <div className="relative bg-slate-900/90 light:bg-slate-900 rounded-2xl border border-slate-700/80 light:border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Window Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 light:bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Command className="w-3 h-3 text-cyan-400" />
              abhishek-dev-workstation
            </span>
          </div>

          {/* Editor Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('php')}
              className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                activeTab === 'php'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ExamController.php
            </button>

            <button
              onClick={() => setActiveTab('python')}
              className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                activeTab === 'python'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              iot_daemon.py
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1 transition-all ${
                activeTab === 'terminal'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3 h-3" /> Terminal
            </button>
          </div>
        </div>

        {/* Code Content Area */}
        <div className="p-5 font-mono text-xs sm:text-sm min-h-[300px] max-h-[360px] overflow-y-auto text-slate-300">
          {activeTab === 'php' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                <span className="text-indigo-400">// PRAYAS Student Recruitment Backend Logic</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Check className="w-3 h-3" /> PDO Secured
                </span>
              </div>
              <pre className="text-slate-200 leading-relaxed font-mono overflow-x-auto">
                {phpSnippet}
              </pre>
            </motion.div>
          )}

          {activeTab === 'python' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                <span className="text-cyan-400"># ESP32 MQTT Telemetry Daemon</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Play className="w-3 h-3 fill-current" /> Localhost Listener
                </span>
              </div>
              <pre className="text-slate-200 leading-relaxed font-mono overflow-x-auto">
                {pythonSnippet}
              </pre>
            </motion.div>
          )}

          {activeTab === 'terminal' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full"
            >
              <div className="flex-1 space-y-1.5 mb-4">
                {terminalLogs.map((log, index) => (
                  <div key={index} className={log.type === 'input' ? 'text-cyan-400 font-semibold' : 'text-slate-300'}>
                    {log.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <span className="text-emerald-400 font-bold">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type help, whoami, skills..."
                  className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-500 font-mono text-xs focus:ring-0"
                />
              </form>
            </motion.div>
          )}
        </div>

        {/* Dashboard Footer Bar */}
        <div className="px-4 py-2.5 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Engine Online
            </span>
            <span>MySQL: Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <span>UTF-8</span>
            <span>PHP 8.2</span>
            <span>Python 3.11</span>
          </div>
        </div>
      </div>

      {/* Floating Interactive Micro-Nodes */}
      {/* Node 1: MySQL Database */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-6 -left-6 bg-slate-900/90 light:bg-white border border-slate-700/80 light:border-slate-300 p-3 rounded-2xl shadow-xl flex items-center gap-2.5 backdrop-blur-md hidden sm:flex z-20"
      >
        <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
          <Database className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-100 light:text-slate-800">MySQL & PDO</div>
          <div className="text-[10px] text-slate-400">Security & Transactions</div>
        </div>
      </motion.div>

      {/* Node 2: IoT Hardware Chip */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-6 -left-4 bg-slate-900/90 light:bg-white border border-slate-700/80 light:border-slate-300 p-3 rounded-2xl shadow-xl flex items-center gap-2.5 backdrop-blur-md hidden sm:flex z-20"
      >
        <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-100 light:text-slate-800">IoT Telemetry</div>
          <div className="text-[10px] text-emerald-400 font-mono">ESP32 • MQTT Active</div>
        </div>
      </motion.div>

      {/* Node 3: Cloud / AWS Node */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -top-6 -right-6 bg-slate-900/90 light:bg-white border border-slate-700/80 light:border-slate-300 p-3 rounded-2xl shadow-xl flex items-center gap-2.5 backdrop-blur-md hidden sm:flex z-20"
      >
        <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
          <Cloud className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-100 light:text-slate-800">AWS & Cloud</div>
          <div className="text-[10px] text-slate-400">Linux & Deployment</div>
        </div>
      </motion.div>

      {/* Node 4: PRAYAS Flagship Badge */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -bottom-6 -right-4 bg-slate-900/90 light:bg-white border border-indigo-500/30 light:border-indigo-300 p-3 rounded-2xl shadow-xl flex items-center gap-2.5 backdrop-blur-md hidden sm:flex z-20"
      >
        <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-indigo-300 light:text-indigo-600">PRAYAS Platforms</div>
          <div className="text-[10px] text-slate-400">Recruitment & LMS</div>
        </div>
      </motion.div>
    </div>
  );
};
