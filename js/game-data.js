/*************************************************************
 * BOW SPORTS EMPIRE — GAME DATA
 * Narratives, strategies, stat impacts, events, shop, questions
 *************************************************************/

const GAME_DATA = {

  // ─── STARTING EMPIRE STATS ─────────────────────────────
  startingStats: { revenue: 20, morale: 50, efficiency: 30, risk: 20 },

  // ─── SEASON METADATA ───────────────────────────────────
  seasons: {
    1: {
      title: "First Recruit",
      subtitle: "Hiring & Information",
      icon: "👤",
      narrative: `Your startup is gaining traction fast. You're juggling product development, customer calls, and analytics all by yourself.\n\nYou MUST expand capacity now. But hiring is a gamble — you never truly know what you're getting until it's too late.`,
      strategies: {
        A: {
          title: "The Flashy Recruit",
          desc: "Hire a polished candidate with an impressive resume — but you can't verify their actual skills.",
          outcome: "The polished candidate impresses in meetings but struggles with real work. Performance is wildly inconsistent — some weeks are great, others are disasters.",
          insight: "This reveals information asymmetry — the candidate knew their weaknesses, you didn't. Unverified talent creates high variance.",
          stats: { revenue: 5, morale: 10, efficiency: -5, risk: 15 }
        },
        B: {
          title: "The Proven Worker",
          desc: "Choose a transparent candidate with verifiable past work and honest references.",
          outcome: "Steady, predictable results. No surprises. Efficiency improves because you knew exactly what you were getting.",
          insight: "By choosing transparency, you reduced information asymmetry. Predictable inputs lead to predictable outputs — reliable expected value.",
          stats: { revenue: 10, morale: 5, efficiency: 10, risk: -5 }
        },
        C: {
          title: "Go Automated",
          desc: "Skip hiring. Invest in automation tools to handle the growing workload.",
          outcome: "Automation crushes simple tasks but fumbles anything requiring judgment. Output is high on average, but some days are disaster-level bad.",
          insight: "Automation increased efficiency AND variance. The expected value looks good on paper, but wild swings make planning difficult.",
          stats: { revenue: 15, morale: -5, efficiency: 15, risk: 10 }
        }
      }
    },

    2: {
      title: "Scaling Up",
      subtitle: "Automation vs. Freelancers",
      icon: "📈",
      narrative: `Business is booming. Orders are piling up. Customers are calling faster than you can answer.\n\nYou're drowning in work and need to scale — NOW. How do you grow without breaking everything?`,
      strategies: {
        A: {
          title: "Full Automation",
          desc: "Go all-in on automation. Let machines handle everything at maximum speed.",
          outcome: "The automation suite demolishes high-volume tasks. But edge cases? Total disasters. A rollercoaster of results.",
          insight: "Full automation maximizes efficiency for routine work but introduces volatility. Diminishing returns hit fast beyond simple tasks.",
          stats: { revenue: 20, morale: -10, efficiency: 20, risk: 20 }
        },
        B: {
          title: "Hybrid System",
          desc: "Automation for routine tasks, humans in the loop for judgment calls.",
          outcome: "Smooth operation. Machines handle volume, humans handle nuance. Steady growth with no dramatic crashes.",
          insight: "Combining automation with human oversight is optimization under uncertainty — efficiency without dangerous variance.",
          stats: { revenue: 10, morale: 10, efficiency: 15, risk: -5 }
        },
        C: {
          title: "Freelancer Army",
          desc: "Rapidly scale by hiring a fleet of freelancers to handle the overflow.",
          outcome: "First few freelancers are amazing. But more people means more coordination. Quality drops as the team balloons.",
          insight: "Diminishing returns in action. Each additional freelancer adds less value while coordination costs keep climbing.",
          stats: { revenue: 15, morale: 5, efficiency: 5, risk: 10 }
        }
      }
    },

    3: {
      title: "Building the Machine",
      subtitle: "Optimization & Structure",
      icon: "⚙️",
      narrative: `Your empire is growing, but cracks are showing. Mistakes slip through. Your team is confused about who does what.\n\nThe workflow is a mess. You need structural fixes or everything could unravel.`,
      strategies: {
        A: {
          title: "Train Your Team",
          desc: "Invest heavily in employee training programs to level up everyone's skills.",
          outcome: "Training works at first — huge improvements early. But by round five, people barely improve. The bottleneck isn't skill anymore — it's the system.",
          insight: "Classic diminishing returns on human capital. Training has real value, but gains shrink as you invest more.",
          stats: { revenue: 5, morale: 15, efficiency: 10, risk: -5 }
        },
        B: {
          title: "Outsource Specialists",
          desc: "Bring in external experts for the specialized tasks your team can't handle.",
          outcome: "Specialists remove bottlenecks fast. But coordination is expensive and you can't fully see their processes. Quality varies wildly.",
          insight: "Outsourcing trades internal bottlenecks for information asymmetry and coordination costs. You solved one problem but created new ones.",
          stats: { revenue: 15, morale: -5, efficiency: 10, risk: 15 }
        },
        C: {
          title: "Build Internal Systems",
          desc: "Create a structured workflow system — slow to set up, but designed to last.",
          outcome: "First month is rough. People resist. But by month three, everything clicks. Errors drop, consistency rises.",
          insight: "Upfront cost vs. long-term optimization. The investment hurts now but creates repeatable, scalable processes.",
          stats: { revenue: -5, morale: 0, efficiency: 20, risk: -10 }
        }
      }
    },

    4: {
      title: "Storm Season",
      subtitle: "Crisis & Risk",
      icon: "⚡",
      narrative: `A major client pulls out. Your top performer quits. A competitor launches a copycat.\n\nEverything is going wrong at once. Who calls the shots?`,
      strategies: {
        A: {
          title: "Centralize Command",
          desc: "All decisions through one leader. Fast, decisive, no confusion.",
          outcome: "Decisions happen FAST. Crisis stabilizes quickly. But weeks later, that leader is drowning — every tiny decision needs their approval.",
          insight: "Centralization trades long-term scalability for short-term speed. Works in a crisis but creates bottlenecks.",
          stats: { revenue: 10, morale: -10, efficiency: 5, risk: -15 }
        },
        B: {
          title: "Decentralize Teams",
          desc: "Give each team autonomy to make their own decisions and react fast.",
          outcome: "Teams react incredibly fast. But each team does things differently. Some decisions are brilliant, others terrible.",
          insight: "Decentralization enables speed and innovation but increases coordination costs and decision variance.",
          stats: { revenue: 5, morale: 15, efficiency: -5, risk: 10 }
        },
        C: {
          title: "Data-Driven Decisions",
          desc: "Build a data model — let the numbers guide every major decision.",
          outcome: "Slow to build. But once running, decisions become consistent, bias drops, and hidden patterns emerge.",
          insight: "Data-driven models reduce subjective error and improve long-term expected value, but require upfront investment.",
          stats: { revenue: 0, morale: 0, efficiency: 15, risk: -10 }
        }
      }
    },

    5: {
      title: "Championship Run",
      subtitle: "Endgame Strategy",
      icon: "🏆",
      narrative: `Your empire stands. Competitors respect you. But the world is changing — new tech, shifting markets, rising uncertainty.\n\nThis isn't about surviving. It's about building something that LASTS.`,
      strategies: {
        A: {
          title: "Lock It Down",
          desc: "Standardize everything. Maximum efficiency. Run a tight, predictable operation.",
          outcome: "Operations run like clockwork. But when a surprise shift hits, you can't pivot. Rigidity made you efficient — and fragile.",
          insight: "Stability-first planning optimizes for low volatility but sacrifices flexibility. The opportunity cost of rigidity.",
          stats: { revenue: 10, morale: -5, efficiency: 15, risk: -10 }
        },
        B: {
          title: "Plan for Everything",
          desc: "Build contingency plans for every possible scenario.",
          outcome: "A plan for everything. When problems hit, you're ready. But maintaining backup plans is expensive and most never get used.",
          insight: "Contingency planning improves adaptability but comes at real resource cost. Paying for flexibility you may never use.",
          stats: { revenue: -5, morale: 5, efficiency: 5, risk: -15 }
        },
        C: {
          title: "Build to Last",
          desc: "Invest in resilience — cross-trained teams, flexible workflows, shock absorbers.",
          outcome: "Short-term output dips. But when crisis hits, your empire absorbs it. Over time, you become the smoothest operation in the industry.",
          insight: "Resilience-building sacrifices short-term performance for long-term stability. Reduces downside risk over time.",
          stats: { revenue: -5, morale: 10, efficiency: 5, risk: -20 }
        }
      }
    }
  },

  // ─── RANDOM EVENTS (shown between seasons) ─────────────
  events: [
    {
      headline: "KEY EMPLOYEE THREATENS TO QUIT",
      desc: "Your best performer wants a raise and more responsibility — or they walk.",
      optionA: { label: "Give them what they want", effect: { revenue: -10, morale: 15, efficiency: 5, risk: -5 }, result: "They stay and morale soars. Expensive, but worth it." },
      optionB: { label: "Let them go", effect: { revenue: 5, morale: -15, efficiency: -5, risk: 5 }, result: "You saved money but the team is shaken. Others wonder if they're next." }
    },
    {
      headline: "VIRAL SOCIAL MEDIA MOMENT",
      desc: "A customer post about your brand is blowing up online. The spotlight is on you.",
      optionA: { label: "Capitalize aggressively", effect: { revenue: 20, morale: 5, efficiency: 0, risk: 10 }, result: "Revenue spikes! But the attention brings scrutiny too." },
      optionB: { label: "Stay low-key and humble", effect: { revenue: 5, morale: 10, efficiency: 0, risk: -5 }, result: "Modest growth but your team feels good about the brand. Solid foundation." }
    },
    {
      headline: "COMPETITOR SLASHES PRICES",
      desc: "Your biggest rival just cut prices by 30%. Customers are asking questions.",
      optionA: { label: "Match their prices", effect: { revenue: -15, morale: -5, efficiency: 0, risk: -5 }, result: "You kept customers but margins are razor thin. Can you sustain this?" },
      optionB: { label: "Double down on quality", effect: { revenue: 5, morale: 10, efficiency: 10, risk: 5 }, result: "Some customers leave, but loyal ones stick. Your brand means premium now." }
    },
    {
      headline: "MAJOR SPONSOR OFFERS A DEAL",
      desc: "A Fortune 500 company wants to sponsor your empire. Big money, but they want creative control.",
      optionA: { label: "Take the deal", effect: { revenue: 25, morale: -10, efficiency: 0, risk: 10 }, result: "Cash flow is amazing but your team feels like sellouts. The sponsor's demands are exhausting." },
      optionB: { label: "Negotiate harder terms", effect: { revenue: 10, morale: 5, efficiency: 0, risk: 0 }, result: "Less money but your independence is intact. Team respects the move." }
    },
    {
      headline: "EQUIPMENT BREAKDOWN",
      desc: "Critical equipment just failed. Everything grinds to a halt until you fix it.",
      optionA: { label: "Rush-order replacements", effect: { revenue: -10, morale: 5, efficiency: 10, risk: -10 }, result: "Expensive but you're back online fast. The team is relieved." },
      optionB: { label: "Patch it temporarily", effect: { revenue: 0, morale: -10, efficiency: -5, risk: 15 }, result: "Saved money now, but the patch is shaky. Everyone's nervous it'll break again." }
    },
    {
      headline: "TALENTED INTERN APPLIES",
      desc: "A brilliant young intern wants to join for free. They're raw but have incredible potential.",
      optionA: { label: "Bring them on board", effect: { revenue: 0, morale: 10, efficiency: 5, risk: 5 }, result: "They're green but eager. The team loves mentoring them." },
      optionB: { label: "Too risky right now", effect: { revenue: 0, morale: -5, efficiency: 0, risk: -5 }, result: "Playing it safe. Your team wonders if you missed an opportunity." }
    },
    {
      headline: "LOCAL NEWS FEATURE",
      desc: "A reporter wants to do a feature story on your empire. Great exposure — or potential scrutiny.",
      optionA: { label: "Open the doors wide", effect: { revenue: 15, morale: 10, efficiency: 0, risk: 10 }, result: "Amazing publicity! But now everyone's watching your every move." },
      optionB: { label: "Politely decline", effect: { revenue: 0, morale: 0, efficiency: 5, risk: -5 }, result: "You stay under the radar. Focus stays on the work, not the spotlight." }
    },
    {
      headline: "TEAM CONFLICT ERUPTS",
      desc: "Two of your key people are clashing hard. It's affecting everyone.",
      optionA: { label: "Mediate personally", effect: { revenue: 0, morale: 10, efficiency: 5, risk: -5 }, result: "You spent half a day on it, but they shook hands. Team respects your leadership." },
      optionB: { label: "Let them work it out", effect: { revenue: 0, morale: -10, efficiency: -5, risk: 10 }, result: "The tension festers. Side conversations are replacing real work." }
    }
  ],

  // ─── SHOP ITEMS (available between seasons) ────────────
  shop: [
    { id: "pizza",     name: "Team Pizza Party",    cost: 75,  icon: "🍕", desc: "Boost team spirit",           effect: { morale: 12 } },
    { id: "equipment", name: "Equipment Upgrade",    cost: 150, icon: "🔧", desc: "Better tools, better work",   effect: { efficiency: 10 } },
    { id: "marketing", name: "Marketing Campaign",   cost: 120, icon: "📢", desc: "Get the word out",            effect: { revenue: 12 } },
    { id: "insurance", name: "Insurance Policy",      cost: 200, icon: "🛡️", desc: "Protect against disaster",    effect: { risk: -15 } },
    { id: "training",  name: "Workshop Day",          cost: 100, icon: "📚", desc: "Sharpen your team's skills",  effect: { efficiency: 8, morale: 5 } },
    { id: "bonus",     name: "Performance Bonuses",   cost: 175, icon: "💰", desc: "Reward your top people",      effect: { morale: 10, revenue: 5 } },
    { id: "security",  name: "Cybersecurity Audit",   cost: 125, icon: "🔒", desc: "Find vulnerabilities early",  effect: { risk: -10, efficiency: 5 } },
    { id: "retreat",   name: "Team Retreat",           cost: 250, icon: "🏕️", desc: "Major morale investment",     effect: { morale: 20, risk: -5 } }
  ],

  // ─── RIVAL NAMES (randomly selected) ──────────────────
  rivals: [
    { name: "Apex Athletics", style: "aggressive" },
    { name: "Titan Sports Co.", style: "balanced" },
    { name: "Vortex Ventures", style: "risky" },
    { name: "Summit Sports", style: "conservative" }
  ],

  // Rival strategy tendencies by style
  rivalChoices: {
    aggressive:   ["A", "A", "B", "A", "A"],
    balanced:     ["B", "B", "A", "C", "B"],
    risky:        ["C", "A", "B", "B", "C"],
    conservative: ["B", "C", "C", "C", "B"]
  },

  // ─── EMPIRE BUILDING STAGES ────────────────────────────
  buildingStages: [
    { name: "Empty Lot",         desc: "Just dirt and dreams" },
    { name: "Batting Cage",      desc: "It's not much, but it's yours" },
    { name: "Small Gym",         desc: "Starting to look real" },
    { name: "Training Center",   desc: "People are taking notice" },
    { name: "Sports Complex",    desc: "A serious operation" },
    { name: "Championship Arena", desc: "Welcome to the big leagues" }
  ],

  // ─── ADAPTIVE QUESTION POOLS ──────────────────────────
  questions: {
    1: {
      easy: [
        { q: "When you hire someone without knowing their true skills, this is called:", o: ["Information asymmetry", "Diminishing returns", "Opportunity cost", "Automation bias"], c: 0 },
        { q: "A worker who shows verified past results helps reduce:", o: ["Uncertainty about their performance", "The company's revenue", "Automation needs", "Training costs"], c: 0 },
        { q: "'Expected value' in business means:", o: ["The average outcome you'd predict over time", "The highest possible profit", "The lowest possible cost", "The exact result every time"], c: 0 }
      ],
      medium: [
        { q: "Why does limited information increase hiring risk?", o: ["You can't accurately predict true ability", "Training always removes uncertainty", "Automation is always better", "Output is guaranteed regardless"], c: 0 },
        { q: "When a candidate oversells their ability, expected value becomes:", o: ["Harder to predict accurately", "Automatically higher", "Guaranteed to be zero", "Completely unaffected"], c: 0 },
        { q: "Choosing a transparent worker primarily reflects:", o: ["Reducing information asymmetry", "Maximizing short-term returns", "Eliminating all risk", "Increasing output volatility"], c: 0 }
      ],
      hard: [
        { q: "A polished candidate delivers inconsistent results. The BEST explanation:", o: ["Hidden skill gaps create high variance in outcomes", "Training always causes risk", "Automation would solve everything", "Efficiency can never improve through hiring"], c: 0 },
        { q: "An automation tool is efficient on average but has terrible days. This illustrates:", o: ["High expected value paired with high variance", "Zero risk in automation", "Perfect information about outcomes", "Diminishing returns from technology"], c: 0 },
        { q: "Why might automation be valuable DESPITE inconsistent results?", o: ["It frees humans for complex tasks where they add more value", "It guarantees perfect accuracy", "It requires no oversight", "It eliminates all bottlenecks immediately"], c: 0 }
      ]
    },
    2: {
      easy: [
        { q: "When adding more workers stops helping as much, this is called:", o: ["Diminishing returns", "Information asymmetry", "Perfect competition", "Constant growth"], c: 0 },
        { q: "A hybrid system combines:", o: ["Automation with human judgment", "Only machines", "Only freelancers", "No technology at all"], c: 0 },
        { q: "Coordination costs are:", o: ["The overhead of managing people and systems together", "The price of a computer", "The salary of one employee", "Always zero in small teams"], c: 0 }
      ],
      medium: [
        { q: "Why does full automation sometimes produce a rollercoaster of results?", o: ["It handles simple tasks well but fails on complex edge cases", "It eliminates all uncertainty", "Humans are always more efficient", "Automation never varies"], c: 0 },
        { q: "Which concept describes strong early gains that taper off?", o: ["Diminishing returns", "Information asymmetry", "Opportunity cost", "Constant marginal value"], c: 0 },
        { q: "Why do additional freelancers become less effective at scale?", o: ["Coordination costs rise, creating diminishing returns", "Each freelancer adds equal output", "Risk drops as team grows", "Automation fills every gap"], c: 0 }
      ],
      hard: [
        { q: "A productivity spike one day followed by errors the next reflects:", o: ["High variance around expected value in automated systems", "Low risk and perfect efficiency", "Elimination of all bottlenecks", "Guaranteed consistent output"], c: 0 },
        { q: "Why does relying on freelancers increase information asymmetry?", o: ["You can't fully observe their reliability or processes", "They always reveal their full workflow", "Output quality is always guaranteed", "Coordination becomes effortless"], c: 0 },
        { q: "The hybrid system outperforms pure automation because:", o: ["Human oversight catches edge cases, reducing variance", "It eliminates need for any automation", "Humans are always faster than machines", "Risk completely disappears"], c: 0 }
      ]
    },
    3: {
      easy: [
        { q: "Investing in employee skills is investing in:", o: ["Human capital", "Physical capital", "Automation", "Information systems"], c: 0 },
        { q: "When training produces big results at first but smaller results later:", o: ["Diminishing returns", "Information asymmetry", "Constant growth", "Opportunity cost"], c: 0 },
        { q: "Outsourcing means:", o: ["Hiring external experts for specialized work", "Firing all employees", "Building internal systems", "Reducing all costs to zero"], c: 0 }
      ],
      medium: [
        { q: "Why do training programs show diminishing returns?", o: ["Employees master basics early, later gains are smaller", "Training always increases output equally", "Human capital cannot improve", "Training eliminates all risk"], c: 0 },
        { q: "Why does outsourcing increase information asymmetry?", o: ["You can't fully observe contractor reliability", "Contractors reveal full information always", "Internal employees hide more info", "Automation fills knowledge gaps"], c: 0 },
        { q: "A new workflow system is slow at first but improves. This shows:", o: ["Upfront cost before long-term optimization", "Permanent inefficiency", "Zero coordination cost", "Instant productivity gains"], c: 0 }
      ],
      hard: [
        { q: "Training fails to remove all bottlenecks because:", o: ["Some bottlenecks are structural, not skill-based", "Training guarantees perfect efficiency", "More employees always remove bottlenecks", "Quality fixes eliminate all constraints"], c: 0 },
        { q: "Outsourcing may SHIFT bottlenecks instead of removing them because:", o: ["Internal teams must coordinate with external contributors", "Outsourcing removes all dependencies", "Specialists control all decisions automatically", "Specialized work never needs oversight"], c: 0 },
        { q: "A workflow system improves over time because:", o: ["Variance decreases as teams master repeatable processes", "Expected value is fixed and never changes", "Workers avoid using the system", "Systems produce infinite efficiency immediately"], c: 0 }
      ]
    },
    4: {
      easy: [
        { q: "Centralized decision-making means:", o: ["One leader makes all the big calls", "Everyone votes on every decision", "Decisions happen randomly", "No one is in charge"], c: 0 },
        { q: "When teams make decisions independently, this is:", o: ["Decentralization", "Centralization", "Automation", "Outsourcing"], c: 0 },
        { q: "Using data for business decisions helps because:", o: ["It reduces bias and shows hidden patterns", "It eliminates all uncertainty", "It replaces human thinking entirely", "Data is always 100% accurate"], c: 0 }
      ],
      medium: [
        { q: "Why does centralizing authority initially improve speed?", o: ["Fewer people making decisions reduces friction", "More meetings increase throughput", "Information systems become unnecessary", "Decentralization always slows teams"], c: 0 },
        { q: "Which risk increases under decentralization?", o: ["Inconsistent decision quality across teams", "Infinite marginal returns", "Zero coordination overhead", "Perfectly aligned priorities"], c: 0 },
        { q: "Expected value improves under data-driven models because:", o: ["Decisions become more consistent and predictable", "Human judgment is eliminated entirely", "Short-term randomness increases", "Systems remove all risk forever"], c: 0 }
      ],
      hard: [
        { q: "Centralized structures create long-term bottlenecks because:", o: ["One decision-maker becomes overloaded as complexity grows", "Workload always shrinks over time", "Employees gain perfect information automatically", "Centralization eliminates all communication costs"], c: 0 },
        { q: "Decentralization can improve LONG-TERM performance because:", o: ["Innovation increases as teams experiment independently", "Variance disappears completely", "Coordination cost drops to zero", "Central bottlenecks get stronger"], c: 0 },
        { q: "The key tradeoff of data-driven transformation is:", o: ["Upfront cost and slow adoption vs. long-term consistency", "Immediate productivity vs. permanent slowdown", "Zero training needs vs. high expertise requirements", "Perfect information from day one vs. no information ever"], c: 0 }
      ]
    },
    5: {
      easy: [
        { q: "Opportunity cost means:", o: ["What you give up by choosing one option over another", "The price of the most expensive choice", "A cost that never matters", "The total budget of a project"], c: 0 },
        { q: "A resilient organization is one that:", o: ["Can absorb shocks without breaking", "Never faces challenges", "Ignores all risks", "Only plans for one scenario"], c: 0 },
        { q: "Contingency planning means:", o: ["Preparing backup plans for different scenarios", "Only having one plan", "Ignoring potential problems", "Never spending on preparation"], c: 0 }
      ],
      medium: [
        { q: "Why does stability-first planning reduce short-term risk?", o: ["Standardized processes are predictable and efficient", "Variance increases intentionally", "It removes all decision-making", "Flexibility is maximized"], c: 0 },
        { q: "What tradeoff defines contingency planning?", o: ["Higher flexibility vs. lower efficiency from extra plans", "Zero cost vs. maximum output", "Perfect information vs. zero coordination", "Eliminating uncertainty vs. increasing workload"], c: 0 },
        { q: "Why might resilience lower short-term performance?", o: ["Resources are redirected toward strengthening the system", "It introduces permanent inefficiency", "It eliminates all optimization", "It requires no upfront investment"], c: 0 }
      ],
      hard: [
        { q: "Stability planning may lower LONG-TERM expected value because:", o: ["Rigid systems cannot adjust to new opportunities or threats", "Predictable routines always increase returns", "Stability eliminates all external shocks", "Decision-making becomes fully decentralized"], c: 0 },
        { q: "A resilience-focused org has higher long-term expected value because:", o: ["It absorbs negative shocks and reduces downside risk over time", "It eliminates uncertainty entirely", "It maximizes immediate efficiency", "It relies on perfect forecasting"], c: 0 },
        { q: "Across all business decisions, the most fundamental tradeoff is:", o: ["Efficiency versus flexibility under uncertainty", "Cost versus revenue in a single quarter", "Automation versus employment numbers", "Speed versus legal compliance"], c: 0 }
      ]
    }
  },

  // ─── CHAMPIONSHIP ROUND ────────────────────────────────
  championship: {
    easy: [
      { q: "When a company hires without understanding true ability, the risk comes from:", o: ["Information asymmetry — one side knows more", "Opportunity cost from limited resources", "Diminishing returns from overinvestment", "Optimization through efficiency gains"], c: 0 },
      { q: "As organizations grow, efficiency gains slow because:", o: ["Early improvements are easier, later gains face diminishing returns", "Efficiency always increases at the same rate", "Variance disappears at scale", "Costs eventually reach zero"], c: 0 },
      { q: "What most directly increases unpredictability?", o: ["Uncertainty from inconsistent information and processes", "Clearly defined roles", "Standardized workflows", "Predictable inputs and outputs"], c: 0 }
    ],
    medium: [
      { q: "Why can automation improve efficiency while increasing volatility?", o: ["It excels at routine tasks but struggles with nuance", "It eliminates the need for oversight", "It guarantees consistent output", "It removes all human decisions"], c: 0 },
      { q: "A stable but rigid strategy's main economic cost is:", o: ["Opportunity cost from limiting future flexibility", "Higher variance in all outcomes", "Increased information asymmetry", "Automation becoming less efficient"], c: 0 },
      { q: "Decentralized decisions improve speed but introduce risk because:", o: ["Different teams may make inconsistent decisions", "Central authority automatically gets stronger", "Processes standardize themselves", "Automation removes all coordination needs"], c: 0 },
      { q: "High variance makes expected value harder to rely on because:", o: ["Actual outcomes fluctuate widely around the average", "Expected value stops existing", "Risk is completely eliminated", "Information becomes perfect"], c: 0 }
    ],
    hard: [
      { q: "A company upgrades software but output stays the same. Best explanation:", o: ["The optimization targeted a non-limiting area", "All inefficiencies were already eliminated", "Expected value became unpredictable", "Variance outweighed all gains"], c: 0 },
      { q: "Resilience lowers short-term performance but raises long-term expected value because:", o: ["It absorbs negative shocks and reduces downside risk", "It eliminates all uncertainty", "It maximizes immediate efficiency", "It relies on perfect forecasting"], c: 0 },
      { q: "The CORE tradeoff of scaling organizations is:", o: ["Efficiency versus flexibility under uncertainty", "Cost versus revenue in one period", "Automation versus total employment", "Speed versus regulatory compliance"], c: 0 }
    ]
  },

  // ─── LEVEL SYSTEM ─────────────────────────────────────
  levels: [
    { title: "Intern",           minXP: 0,    icon: "📋" },
    { title: "Assistant Coach",  minXP: 80,   icon: "📎" },
    { title: "Scout",            minXP: 180,  icon: "🔍" },
    { title: "Manager",          minXP: 300,  icon: "💼" },
    { title: "Director",         minXP: 450,  icon: "📊" },
    { title: "VP of Operations", minXP: 620,  icon: "🎯" },
    { title: "General Manager",  minXP: 800,  icon: "⭐" },
    { title: "Owner",            minXP: 1000, icon: "👑" },
    { title: "Tycoon",           minXP: 1200, icon: "💎" },
    { title: "Legend",            minXP: 1500, icon: "🏆" }
  ],

  achievements: [
    { id: "first_steps",    name: "First Steps",    desc: "Complete Season 1",                 icon: "👣" },
    { id: "sharp_mind",     name: "Sharp Mind",      desc: "Answer a Hard question correctly",  icon: "🧠" },
    { id: "economist",      name: "Economist",       desc: "Complete 3 seasons",                icon: "📈" },
    { id: "streak_3",       name: "Streak Master",   desc: "Get 3 correct in a row",           icon: "🔥" },
    { id: "streak_5",       name: "On Fire",         desc: "Get 5 correct in a row",           icon: "🔥🔥" },
    { id: "empire_builder", name: "Empire Builder",  desc: "Complete all 5 seasons",            icon: "🏗️" },
    { id: "champion",       name: "Champion",        desc: "Complete the Championship",         icon: "🏆" },
    { id: "perfectionist",  name: "Perfectionist",   desc: "Perfect score in a season",         icon: "💎" },
    { id: "strategist",     name: "Strategist",      desc: "Score A or S tier overall",         icon: "♟️" },
    { id: "legend",         name: "Legend",           desc: "Reach Legend level",                icon: "⭐" },
    { id: "shopper",        name: "Big Spender",     desc: "Buy 3 shop items",                  icon: "🛒" },
    { id: "low_risk",       name: "Safe Hands",      desc: "Finish with Risk below 25",         icon: "🛡️" }
  ],

  ratings: [
    { tier: "S", label: "LEGEND",    minPct: 90, color: "#fbbf24" },
    { tier: "A", label: "TYCOON",    minPct: 80, color: "#22c55e" },
    { tier: "B", label: "EXECUTIVE", minPct: 70, color: "#3b82f6" },
    { tier: "C", label: "MANAGER",   minPct: 55, color: "#f97316" },
    { tier: "D", label: "INTERN",    minPct: 0,  color: "#94a3b8" }
  ],

  claimCodes: ["BSC-M3F-2K9X", "BSC-M3F-5Q7L", "BSC-M3F-8R3D", "BSC-M3F-1V6P", "BSC-M3F-4Z2H"],

  scoring: {
    pointsPerDifficulty: { easy: 10, medium: 20, hard: 30 },
    xpPerDifficulty: { easy: 10, medium: 20, hard: 35 },
    seasonBonusXP: 50,
    championshipBonusXP: 100,
    streakBonusThreshold: 3,
    streakBonusMultiplier: 1.5
  }
};
