"use client"

import { useEffect, useState } from "react"
import { Copy, Check } from "lucide-react"

export default function TerminalIDE() {
  const [currentCommand, setCurrentCommand] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [matrixChars, setMatrixChars] = useState<string[]>([])
  const [animatedBoxes, setAnimatedBoxes] = useState<boolean[]>([])
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [currentTyping, setCurrentTyping] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionStep, setExecutionStep] = useState(0)
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({})

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates((prev) => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const commands = [
    "wordsail init",
    "wordsail server provision",
    "wordsail site create",
    "wordsail domain ssl",
  ]

  const terminalSequences = [
    {
      command: "wordsail init",
      outputs: [
        "Initializing WordSail...",
        "Setting up configuration...",
        "✅ WordSail ready!",
      ],
    },
    {
      command: "wordsail server provision",
      outputs: [
        "Connecting to server...",
        "Installing Nginx, PHP 8.3, MariaDB...",
        "Configuring UFW & Fail2ban...",
        "✅ Server provisioned successfully!",
      ],
    },
    {
      command: "wordsail site create",
      outputs: [
        "Creating WordPress site...",
        "Setting up database...",
        "Creating admin user...",
        "✅ WordPress site ready!",
      ],
    },
    {
      command: "wordsail domain ssl",
      outputs: [
        "Adding domain...",
        "Provisioning SSL certificate...",
        "Configuring DNS records...",
        "✅ Domain live with HTTPS!",
      ],
    },
  ]


  useEffect(() => {
    const chars = "WORDSAIL0101NGINX PHP8.3█▓▒░▄▀■□▪▫".split("")
    const newMatrixChars = Array.from({ length: 100 }, () => chars[Math.floor(Math.random() * chars.length)])
    setMatrixChars(newMatrixChars)

    const interval = setInterval(() => {
      setMatrixChars((prev) => prev.map(() => chars[Math.floor(Math.random() * chars.length)]))
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const boxes = Array.from({ length: 6 }, () => Math.random() > 0.5)
    setAnimatedBoxes(boxes)

    const interval = setInterval(() => {
      setAnimatedBoxes((prev) => prev.map(() => Math.random() > 0.3))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const sequence = terminalSequences[currentCommand]
    const timeouts: NodeJS.Timeout[] = []

    const runSequence = async () => {
      setTerminalLines([])
      setCurrentTyping("")
      setIsExecuting(false)
      setExecutionStep(0)

      const command = sequence.command
      for (let i = 0; i <= command.length; i++) {
        timeouts.push(
          setTimeout(() => {
            setCurrentTyping(command.slice(0, i))
          }, i * 50),
        )
      }

      timeouts.push(
        setTimeout(
          () => {
            setIsExecuting(true)
            setCurrentTyping("")
            setTerminalLines((prev) => [...prev, `user@dev:~/project$ ${command}`])
          },
          command.length * 50 + 500,
        ),
      )

      sequence.outputs.forEach((output, index) => {
        timeouts.push(
          setTimeout(
            () => {
              setExecutionStep(index + 1)
              setTerminalLines((prev) => [...prev, output])
            },
            command.length * 50 + 1000 + index * 800,
          ),
        )
      })

      timeouts.push(
        setTimeout(
          () => {
            setCurrentCommand((prev) => (prev + 1) % commands.length)
          },
          command.length * 50 + 1000 + sequence.outputs.length * 800 + 2000,
        ),
      )
    }

    runSequence()

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [currentCommand])

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden relative">
      {/* ... existing nav code ... */}
      <nav className="border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm p-4 relative z-10 sticky top-0">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg">WordSail</span>
              <span className="text-gray-400 text-sm">for WordPress</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/shariffff/wordsail"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              title="WordSail on GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <div className="hidden sm:flex items-center gap-2 text-gray-500 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>v0.0.2</span>
            </div>


            <button className="md:hidden text-gray-400 hover:text-white transition-colors">
              <div className="w-6 h-6 flex flex-col justify-center gap-1">
                <div className="w-full h-0.5 bg-current transition-all duration-300"></div>
                <div className="w-full h-0.5 bg-current transition-all duration-300"></div>
                <div className="w-full h-0.5 bg-current transition-all duration-300"></div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ... existing matrix background ... */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-25 gap-1 h-full">
          {matrixChars.map((char, i) => (
            <div key={i} className="text-gray-500 text-xs animate-pulse">
              {char}
            </div>
          ))}
        </div>
      </div>

      {/* ... existing hero section ... */}
      <section className="relative px-6 py-20 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-8">
             <img src="data:image/png;base64,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" alt="WordSail" className="mx-auto" />
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
              Self-host WordPress with <span className="text-green-400 animate-pulse">WordSail</span>.
              <br />
              Control from your{" "}
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">terminal</span>.
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8 font-light">
              Automated server provisioning, WordPress site management, domain configuration, and SSL certificates.
              Built for developers and agencies who want full control over their hosting infrastructure.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <div
                className="group relative cursor-pointer w-full sm:w-auto"
                onClick={() => copyToClipboard("curl -fsSL https://raw.githubusercontent.com/shariffff/wordsail/main/install.sh | bash", "hero-install")}
              >
                <div className="absolute inset-0 border border-gray-600 bg-gray-900/20 transition-all duration-300 group-hover:border-white group-hover:shadow-lg group-hover:shadow-white/20"></div>
                <div className="relative border border-white bg-white text-black font-semibold px-6 sm:px-10 py-4 text-base sm:text-lg transition-all duration-300 group-hover:bg-gray-100 group-hover:text-black transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 text-center">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {copiedStates["hero-install"] ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    )}
                    <span className="text-gray-600 text-sm ">$</span>
                    <span className="text-sm ">curl -fsSL https://raw.githubusercontent.com/shariffff/wordsail/main/install.sh | bash</span>
                  </div>
                </div>
              </div>

              <a href="https://github.com/shariffff/wordsail/tree/main/docs" className="group relative cursor-pointer w-full sm:w-auto">

                <div className="relative border-2 border border-gray-400 bg-transparent text-white font-semibold px-4 py-4 text-sm transition-all duration-300 group-hover:border-white group-hover:bg-gray-900/30 transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-normal">→</span>
                    <span className="tracking-tight">View Docs</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* ... existing terminal section ... */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-950 border border-gray-700 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">


                    <div className="w-3 h-3 bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
                  </div>
                  <span className="text-gray-400 text-sm">wordsail@terminal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-500 text-xs">LIVE</span>
                </div>
              </div>

              <div className="p-6 min-h-[300px] bg-black">
                <div className="space-y-2 text-sm">
                  {terminalLines.map((line, index) => (
                    <div
                      key={index}
                      className={`${line.startsWith("user@dev") ? "text-white" : "text-gray-300"} ${line.includes("✅") || line.includes("✨") || line.includes("🎉") ? "text-green-400" : ""}`}
                    >
                      {line}
                    </div>
                  ))}

                  {!isExecuting && (
                    <div className="text-white">
                      <span className="text-green-400">user@dev</span>
                      <span className="text-gray-500">:</span>
                      <span className="text-blue-400">~/project</span>
                      <span className="text-white">$ </span>
                      <span className="text-white">{currentTyping}</span>
                      <span className={`text-white ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>
                        █
                      </span>
                    </div>
                  )}

                  {isExecuting && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-xs">Processing...</span>
                    </div>
                  )}
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ... existing integrations section ... */}
      <section className="px-6 py-16 lg:px-12 border-t border-gray-800" id="commands">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">Key Commands</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              Complete WordPress infrastructure management from the command line.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-950 border border-gray-800 shadow-xl">
              <div className="flex items-center justify-between px-6 py-3 bg-gray-900 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">


                    <div className="w-3 h-3 bg-green-500"></div>
                  </div>
                  <span className="text-gray-400 text-sm">wordsail --help</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-500 text-xs">READY</span>
                </div>
              </div>

              <div className="p-6 bg-black">
                <div className="text-sm text-gray-400 mb-6">$ wordsail --help</div>

                <div className="space-y-3 mb-6">
                  {[
                    { name: "server provision", status: "✓", desc: "Setup Ubuntu 24.04" },
                    { name: "site create", status: "✓", desc: "Create WordPress site" },
                    { name: "domain add", status: "✓", desc: "Add domain & SSL" },
                    { name: "domain ssl", status: "✓", desc: "Issue SSL cert" },
                    { name: "server add", status: "✓", desc: "Manage servers" },
                    { name: "site delete", status: "✓", desc: "Remove site" },
                  ].map((cmd) => (
                    <div
                      key={cmd.name}
                      className="flex items-center justify-between py-3 px-4 hover:bg-gray-900 cursor-pointer group transition-all duration-200 border border-transparent hover:border-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-green-400 group-hover:text-white transition-colors w-4">
                          {cmd.status}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-white group-hover:text-gray-200 transition-colors font-medium tracking-tight">{cmd.name}</span>
                          <span className="text-gray-500 text-sm font-light leading-relaxed">{cmd.desc}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="text-sm text-gray-400">
                      <div className="text-xs text-gray-500 space-y-1">
                        <div className="font-mono">$ wordsail server provision</div>
                        <div className="font-mono">$ wordsail site create</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>6 Commands</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Zero config</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
                <span className="text-green-400">●</span>
                <span>Universal compatibility • Instant setup • Works everywhere</span>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="px-6 py-20 lg:px-12 border-t border-gray-800 bg-gray-950/30" id="quickstart">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight">Ready to get started?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Set up a complete LEMP stack for WordPress hosting in four simple steps. No cloud vendor lock-in, full control over your infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-black border border-gray-700 p-8 flex flex-col items-center text-center hover:border-white transition-all duration-300 group-hover:shadow-xl group-hover:shadow-white/10">
                <div className="w-14 h-14 mx-auto mb-4 bg-gray-900 border border-gray-600 flex items-center justify-center group-hover:border-white transition-colors group-hover:bg-gray-800 text-lg font-bold text-white">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-gray-100 tracking-tight">Install WordSail</h3>
                <p className="text-gray-400 group-hover:text-gray-300 text-base leading-relaxed mb-4">
                  Download and install the WordSail CLI tool
                </p>
                <button
                  className="text-sm bg-gray-900 border border-gray-700 p-3 hover:border-white transition-colors group-hover:bg-gray-800 w-full text-left cursor-pointer"
                  onClick={() => copyToClipboard("curl -fsSL https://raw.githubusercontent.com/shariffff/wordsail/main/install.sh | bash", "step1-cmd")}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">$ curl ... | bash</span>
                    {copiedStates["step1-cmd"] ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-black border border-gray-700 p-8 flex flex-col items-center text-center hover:border-white transition-all duration-300 group-hover:shadow-xl group-hover:shadow-white/10">
                <div className="w-14 h-14 mx-auto mb-4 bg-gray-900 border border-gray-600 flex items-center justify-center group-hover:border-white transition-colors group-hover:bg-gray-800 text-lg font-bold text-white">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-gray-100 tracking-tight">Initialize Project</h3>
                <p className="text-gray-400 group-hover:text-gray-300 text-base leading-relaxed mb-4">
                  Set up WordSail configuration for your project
                </p>
                <button
                  className="text-sm bg-gray-900 border border-gray-700 p-3 hover:border-white transition-colors group-hover:bg-gray-800 w-full text-left cursor-pointer"
                  onClick={() => copyToClipboard("wordsail init", "step2-cmd")}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">$ wordsail init</span>
                    {copiedStates["step2-cmd"] ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-black border border-gray-700 p-8 flex flex-col items-center text-center hover:border-white transition-all duration-300 group-hover:shadow-xl group-hover:shadow-white/10">
                <div className="w-14 h-14 mx-auto mb-4 bg-gray-900 border border-gray-600 flex items-center justify-center group-hover:border-white transition-colors group-hover:bg-gray-800 text-lg font-bold text-white">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-gray-100 tracking-tight">Provision Server</h3>
                <p className="text-gray-400 group-hover:text-gray-300 text-base leading-relaxed mb-4">
                  Set up Ubuntu 24.04 with Nginx, PHP 8.3, and MariaDB
                </p>
                <button
                  className="text-sm bg-gray-900 border border-gray-700 p-3 hover:border-white transition-colors group-hover:bg-gray-800 w-full text-left cursor-pointer"
                  onClick={() => copyToClipboard("wordsail server provision", "step3-cmd")}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">$ wordsail server provision</span>
                    {copiedStates["step3-cmd"] ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-black border border-gray-700 p-8 flex flex-col items-center text-center hover:border-white transition-all duration-300 group-hover:shadow-xl group-hover:shadow-white/10">
                <div className="w-14 h-14 mx-auto mb-4 bg-gray-900 border border-gray-600 flex items-center justify-center group-hover:border-white transition-colors group-hover:bg-gray-800 text-lg font-bold text-white">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-gray-100 tracking-tight">Create Site</h3>
                <p className="text-gray-400 group-hover:text-gray-300 text-base leading-relaxed mb-4">
                  Deploy a new WordPress site
                </p>
                <button
                  className="text-sm bg-gray-900 border border-gray-700 p-3 hover:border-white transition-colors group-hover:bg-gray-800 w-full text-left cursor-pointer"
                  onClick={() => copyToClipboard("wordsail site create", "step4-cmd")}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">$ wordsail site create</span>
                    {copiedStates["step4-cmd"] ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a href="https://github.com/shariffff/wordsail/tree/main/docs" className="group relative cursor-pointer inline-block">
              <div className="absolute inset-0 border-2 border-gray-600 bg-gray-900/20 transition-all duration-300 group-hover:border-white group-hover:shadow-lg group-hover:shadow-white/20"></div>
              <div className="relative border-2 border-white bg-white text-black font-semibold px-12 py-4 text-lg transition-all duration-300 group-hover:bg-gray-100 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-gray-600 font-normal">▶</span>
                  <span className="tracking-tight">View Full Documentation</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ... existing footer ... */}
      <footer className="border-t border-gray-800 px-6 py-12 lg:px-12 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-gray-600 text-lg mb-4"></div>

          </div>
        </div>
      </footer>
    </div>
  )
}
