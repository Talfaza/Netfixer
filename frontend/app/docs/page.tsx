import Link from "next/link"
import { ArrowLeft, FileText, Server, Shield, HardDrive, Cpu, MemoryStick } from "lucide-react"

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-blue-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                <line x1="12" y1="22" x2="12" y2="12"></line>
              </svg>
            </div>
            <h1 className="text-lg font-bold">Netfixer</h1>
          </div>
          <Link href="/" className="flex items-center gap-1 text-sm text-slate-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  Documentation
                </h3>
                <nav className="space-y-1">
                  <a href="#getting-started" className="block py-2 px-3 rounded-md bg-slate-800 text-white">
                    Getting Started
                  </a>
                  <a
                    href="#installation"
                    className="block py-2 px-3 rounded-md hover:bg-slate-800/50 text-slate-400 hover:text-white"
                  >
                    Installation
                  </a>
                  <a
                    href="#configuration"
                    className="block py-2 px-3 rounded-md hover:bg-slate-800/50 text-slate-400 hover:text-white"
                  >
                    Configuration
                  </a>
                  <a
                    href="#monitoring"
                    className="block py-2 px-3 rounded-md hover:bg-slate-800/50 text-slate-400 hover:text-white"
                  >
                    Monitoring
                  </a>
                  <a
                    href="#troubleshooting"
                    className="block py-2 px-3 rounded-md hover:bg-slate-800/50 text-slate-400 hover:text-white"
                  >
                    Troubleshooting
                  </a>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <article className="prose prose-invert max-w-none prose-headings:scroll-mt-24">
              <section id="getting-started">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-6 w-6 text-blue-400" />
                  <h1 className="text-3xl font-bold m-0">Getting Started with Netfixer</h1>
                </div>

                <p className="text-lg text-slate-300 mb-8">
                  Welcome to the Netfixer documentation! This guide will help you get up and running with Netfixer, the
                  advanced system monitoring and management tool for your infrastructure.
                </p>

                <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">What is Netfixer?</h2>
                  <p className="text-slate-300 mb-4">
                    Netfixer is a comprehensive monitoring solution that provides real-time insights into your servers,
                    applications, and infrastructure.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Cpu className="h-5 w-5 text-blue-400 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">System Metrics</h3>
                        <p className="text-sm text-slate-400">Monitor CPU, memory, disk, and network usage</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Server className="h-5 w-5 text-purple-400 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">Process Tracking</h3>
                        <p className="text-sm text-slate-400">Track running processes and resource usage</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-green-400 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">Alert System</h3>
                        <p className="text-sm text-slate-400">Set up alerts for critical events</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <HardDrive className="h-5 w-5 text-amber-400 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">ML Models</h3>
                        <p className="text-sm text-slate-400">Anomaly detection and predictive analytics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="installation" className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Installation</h2>

                <h3 className="text-xl font-semibold mb-3">System Requirements</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-800">
                        <th className="border border-slate-700 px-4 py-2 text-left">Component</th>
                        <th className="border border-slate-700 px-4 py-2 text-left">Minimum</th>
                        <th className="border border-slate-700 px-4 py-2 text-left">Recommended</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-700 px-4 py-2">CPU</td>
                        <td className="border border-slate-700 px-4 py-2">2 cores</td>
                        <td className="border border-slate-700 px-4 py-2">4+ cores</td>
                      </tr>
                      <tr className="bg-slate-800/30">
                        <td className="border border-slate-700 px-4 py-2">Memory</td>
                        <td className="border border-slate-700 px-4 py-2">4GB RAM</td>
                        <td className="border border-slate-700 px-4 py-2">8GB+ RAM</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-700 px-4 py-2">Disk</td>
                        <td className="border border-slate-700 px-4 py-2">20GB</td>
                        <td className="border border-slate-700 px-4 py-2">50GB+ SSD</td>
                      </tr>
                      <tr className="bg-slate-800/30">
                        <td className="border border-slate-700 px-4 py-2">OS</td>
                        <td className="border border-slate-700 px-4 py-2">Ubuntu 20.04, CentOS 8</td>
                        <td className="border border-slate-700 px-4 py-2">Ubuntu 22.04, RHEL 9</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-semibold mb-3">Quick Install</h3>
                <p className="text-slate-300 mb-3">The fastest way to get started is using our installation script:</p>
                <div className="bg-slate-800 rounded-md p-3 mb-6 font-mono text-sm overflow-x-auto">
                  curl -sSL https://install.netfixer.com | sudo bash
                </div>

                <h3 className="text-xl font-semibold mb-3">Docker Installation</h3>
                <p className="text-slate-300 mb-3">We also provide Docker images for containerized deployments:</p>
                <div className="bg-slate-800 rounded-md p-3 mb-6 font-mono text-sm overflow-x-auto">
                  docker pull netfixer/server:latest
                  <br />
                  docker run -d --name netfixer-server -p 3000:3000 -p 9100:9100 netfixer/server:latest
                </div>

                <div className="rounded-lg border border-amber-800/30 bg-amber-900/10 p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <svg
                      className="h-5 w-5 text-amber-400 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium text-amber-400">Important</h4>
                      <p className="text-sm text-slate-300">
                        Make sure to secure your installation by changing the default admin password immediately after
                        setup.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="configuration" className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Configuration</h2>

                <p className="text-slate-300 mb-4">
                  After installation, you'll need to configure Netfixer to connect to your servers. Edit the{" "}
                  <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sm">config.yml</code> file:
                </p>

                <div className="bg-slate-800 rounded-md p-3 mb-6 font-mono text-sm overflow-x-auto">
                  <pre className="text-slate-300">
                    {`# Server configuration
server:
  port: 3000
  host: 0.0.0.0
  ssl:
    enabled: false
    cert: /path/to/cert.pem
    key: /path/to/key.pem

# Authentication
auth:
  enabled: true
  provider: local  # Options: local, ldap, oauth
  
# Monitoring settings
monitoring:
  interval: 60  # Seconds between data collection
  retention: 30  # Days to keep historical data`}
                  </pre>
                </div>

                <div className="rounded-lg border border-blue-800/30 bg-blue-900/10 p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium text-blue-400">Tip</h4>
                      <p className="text-sm text-slate-300">
                        For production environments, we recommend enabling SSL and setting up a proper authentication
                        provider.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="monitoring" className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Monitoring</h2>

                <h3 className="text-xl font-semibold mb-3">Available Packages</h3>
                <p className="text-slate-300 mb-4">
                  Netfixer uses monitoring packages to collect data from your servers. Here are the available packages:
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-800">
                        <th className="border border-slate-700 px-4 py-2 text-left">Package</th>
                        <th className="border border-slate-700 px-4 py-2 text-left">Description</th>
                        <th className="border border-slate-700 px-4 py-2 text-left">Default</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-700 px-4 py-2">node-exporter</td>
                        <td className="border border-slate-700 px-4 py-2">Collects hardware and OS metrics</td>
                        <td className="border border-slate-700 px-4 py-2 text-green-400">✓</td>
                      </tr>
                      <tr className="bg-slate-800/30">
                        <td className="border border-slate-700 px-4 py-2">process-monitor</td>
                        <td className="border border-slate-700 px-4 py-2">
                          Tracks running processes and resource usage
                        </td>
                        <td className="border border-slate-700 px-4 py-2 text-green-400">✓</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-700 px-4 py-2">network-monitor</td>
                        <td className="border border-slate-700 px-4 py-2">Monitors network traffic and connections</td>
                        <td className="border border-slate-700 px-4 py-2 text-slate-500">-</td>
                      </tr>
                      <tr className="bg-slate-800/30">
                        <td className="border border-slate-700 px-4 py-2">disk-analyzer</td>
                        <td className="border border-slate-700 px-4 py-2">Analyzes disk usage and I/O operations</td>
                        <td className="border border-slate-700 px-4 py-2 text-slate-500">-</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-700 px-4 py-2">security-scanner</td>
                        <td className="border border-slate-700 px-4 py-2">Basic security vulnerability scanning</td>
                        <td className="border border-slate-700 px-4 py-2 text-slate-500">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-semibold mb-3">Dashboard Overview</h3>
                <p className="text-slate-300 mb-4">
                  The main dashboard provides a high-level view of your infrastructure:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                    <div className="flex items-start gap-2">
                      <Cpu className="h-5 w-5 text-blue-400 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Metrics Cards</h4>
                        <p className="text-sm text-slate-400">
                          Quick view of key metrics like CPU, memory, and disk usage
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                    <div className="flex items-start gap-2">
                      <Server className="h-5 w-5 text-purple-400 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Process Table</h4>
                        <p className="text-sm text-slate-400">List of running processes with resource usage</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                    <div className="flex items-start gap-2">
                      <MemoryStick className="h-5 w-5 text-green-400 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">ML Model Status</h4>
                        <p className="text-sm text-slate-400">Status of predictive models and anomaly detection</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                    <div className="flex items-start gap-2">
                      <HardDrive className="h-5 w-5 text-amber-400 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Activity Log</h4>
                        <p className="text-sm text-slate-400">Recent events and alerts from your infrastructure</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="troubleshooting" className="pt-8">
                <h2 className="text-2xl font-bold mb-4">Troubleshooting</h2>

                <h3 className="text-xl font-semibold mb-3">Common Issues</h3>

                <div className="space-y-6 mb-6">
                  <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                    <h4 className="text-lg font-medium mb-2">Agent Not Connecting</h4>
                    <p className="text-slate-300 mb-3">If a server agent isn't connecting:</p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-300">
                      <li>Check that the server is reachable via SSH</li>
                      <li>
                        Verify that the agent is running:{" "}
                        <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sm">
                          systemctl status netfixer-agent
                        </code>
                      </li>
                      <li>Check firewall settings to ensure ports 9100-9105 are open</li>
                    </ol>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                    <h4 className="text-lg font-medium mb-2">High CPU Usage</h4>
                    <p className="text-slate-300 mb-3">If Netfixer is using too much CPU:</p>
                    <div className="bg-slate-800 rounded-md p-3 font-mono text-sm overflow-x-auto">
                      <pre className="text-slate-300">
                        {`# Adjust collection interval in config.yml
monitoring:
  interval: 120  # Increase to reduce CPU usage`}
                      </pre>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                    <h4 className="text-lg font-medium mb-2">Data Not Showing</h4>
                    <p className="text-slate-300 mb-3">If metrics aren't appearing in the dashboard:</p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-300">
                      <li>Check that the appropriate packages are installed</li>
                      <li>Verify that the agent is running and collecting data</li>
                      <li>
                        Check the logs for errors:{" "}
                        <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sm">journalctl -u netfixer-agent</code>
                      </li>
                    </ol>
                  </div>
                </div>
              </section>

              <section className="pt-8 border-t border-slate-800">
                <h2 className="text-2xl font-bold mb-4">Getting Help</h2>
                <p className="text-slate-300 mb-4">If you need assistance, you can:</p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Check our FAQ
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Join our Community Forum
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Open an issue on GitHub
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Contact support@netfixer.com
                  </li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
