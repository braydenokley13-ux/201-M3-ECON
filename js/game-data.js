/*************************************************************
 * BOW SPORTS EMPIRE — GAME DATA
 * All narratives, strategies, outcomes, and adaptive questions
 *************************************************************/

const GAME_DATA = {

  // ─── SEASON METADATA ───────────────────────────────────
  seasons: {
    1: {
      title: "First Recruit",
      subtitle: "Hiring & Information",
      icon: "👤",
      narrative: `Your startup is gaining traction faster than expected. You're juggling product development, customer communication, and analytics — and you can't keep pace.\n\nYou MUST expand capacity, but uncertainty is high. Your next move will shape how effectively the business can scale.`,
      strategies: {
        A: {
          title: "The Flashy Recruit",
          desc: "Hire a polished candidate with an impressive resume — but you can't verify their actual skills.",
          outcome: "The polished candidate impresses in meetings but struggles with real work. Performance is wildly inconsistent. You're facing the classic problem: you didn't know what you were really getting.",
          insight: "This choice reveals information asymmetry — when one side knows more than the other. The candidate knew their weaknesses; you didn't."
        },
        B: {
          title: "The Proven Worker",
          desc: "Choose a transparent candidate with clear, verifiable past work and honest references.",
          outcome: "The transparent worker delivers steady, predictable results. No surprises. Efficiency improves because you knew exactly what you were getting.",
          insight: "By choosing transparency, you reduced information asymmetry. Predictable inputs lead to predictable outputs — the foundation of reliable expected value."
        },
        C: {
          title: "Go Automated",
          desc: "Skip hiring entirely. Invest in automation tools to handle the growing workload.",
          outcome: "Automation crushes the simple tasks but fumbles anything requiring judgment. Output is high on average, but some days are disaster-level bad.",
          insight: "Automation increased efficiency AND variance. The expected value looks good on paper, but the wild swings make planning difficult."
        }
      }
    },

    2: {
      title: "Scaling Up",
      subtitle: "Automation vs. Freelancers",
      icon: "📈",
      narrative: `Business is booming. Orders are piling up. Customers are calling faster than you can answer.\n\nYou're drowning in work. Something has to change — NOW. How do you scale operations without breaking everything?`,
      strategies: {
        A: {
          title: "Full Automation",
          desc: "Go all-in on automation. Let machines handle everything at maximum speed.",
          outcome: "The automation suite demolishes high-volume tasks. But edge cases? Total disasters. Productivity spikes high then crashes — a rollercoaster of results.",
          insight: "Full automation maximizes efficiency for routine work but introduces volatility. Diminishing returns hit fast once you move beyond simple tasks."
        },
        B: {
          title: "Hybrid System",
          desc: "Use automation for routine tasks, but keep humans in the loop for judgment calls.",
          outcome: "The hybrid approach is smooth. Machines handle volume, humans handle nuance. No dramatic spikes, no dramatic crashes. Steady growth.",
          insight: "Combining automation with human oversight is optimization under uncertainty — you get efficiency without the dangerous variance."
        },
        C: {
          title: "Freelancer Army",
          desc: "Rapidly scale by hiring a fleet of freelancers to handle the overflow.",
          outcome: "The first few freelancers are amazing. But as you add more, coordination becomes a nightmare. Everyone's doing things differently and quality drops.",
          insight: "This is diminishing returns in action. Each additional freelancer adds less value while coordination costs keep climbing."
        }
      }
    },

    3: {
      title: "Building the Machine",
      subtitle: "Optimization & Structure",
      icon: "⚙️",
      narrative: `Your empire is growing, but cracks are showing. Mistakes slip through. Your team is confused about who does what.\n\nThe workflow is a mess. You need deeper structural fixes or everything could unravel.`,
      strategies: {
        A: {
          title: "Train Your Team",
          desc: "Invest heavily in employee training programs to level up everyone's skills.",
          outcome: "Training works — at first. Early sessions produce huge improvements. But by the fifth round of training, people are barely getting better. The bottleneck isn't skill anymore — it's the system itself.",
          insight: "Classic diminishing returns on human capital investment. Training has real value, but the gains shrink as you invest more."
        },
        B: {
          title: "Outsource Specialists",
          desc: "Bring in external experts to handle the specialized tasks your team can't do.",
          outcome: "The specialists remove bottlenecks fast. But coordinating with outsiders is expensive and you can't fully see their processes. Quality varies wildly between contractors.",
          insight: "Outsourcing trades internal bottlenecks for information asymmetry and coordination costs. You solved one problem but created new ones."
        },
        C: {
          title: "Build Internal Systems",
          desc: "Create a structured workflow system — slow to set up, but designed to last.",
          outcome: "The first month is rough. Adoption is slow, and people resist the new process. But by month three, everything clicks. Errors drop. Consistency rises. The system starts paying for itself.",
          insight: "This illustrates upfront cost vs. long-term optimization. The investment hurts now but creates repeatable, scalable processes."
        }
      }
    },

    4: {
      title: "Storm Season",
      subtitle: "Crisis & Risk",
      icon: "⚡",
      narrative: `A major client pulls out. Your top performer quits. A competitor launches a copycat product.\n\nEverything is going wrong at once. The organization needs a decision-making structure that can handle chaos. Who calls the shots?`,
      strategies: {
        A: {
          title: "Centralize Command",
          desc: "Put all decisions through one leader. Fast, decisive, no confusion.",
          outcome: "Decisions happen FAST. The crisis stabilizes quickly because there's zero confusion about who's in charge. But weeks later, that leader is drowning — every tiny decision flows through them and nothing moves without approval.",
          insight: "Centralization trades long-term scalability for short-term speed. It works in a crisis but creates structural bottlenecks as complexity grows."
        },
        B: {
          title: "Decentralize Teams",
          desc: "Give each team autonomy to make their own decisions and react fast.",
          outcome: "Teams react incredibly fast to local problems. But each team solves things differently. Some decisions are brilliant; others are terrible. Coordination across teams becomes a headache.",
          insight: "Decentralization enables speed and innovation but increases coordination costs and decision variance across the organization."
        },
        C: {
          title: "Data-Driven Decisions",
          desc: "Implement a data model — let the numbers guide every major decision.",
          outcome: "It takes time to build the dashboards and train people on data literacy. Short-term, it's slower. But once running, decisions become consistent, bias drops, and patterns emerge that gut feelings would never catch.",
          insight: "Data-driven models reduce subjective error and improve long-term expected value, but require upfront investment in systems and training."
        }
      }
    },

    5: {
      title: "Championship Run",
      subtitle: "Endgame Strategy",
      icon: "🏆",
      narrative: `Your empire stands. Competitors respect you. But the world is changing — new technology, shifting markets, rising uncertainty.\n\nThis isn't about surviving anymore. It's about building something that LASTS. What's your endgame?`,
      strategies: {
        A: {
          title: "Lock It Down",
          desc: "Standardize everything. Maximize efficiency. Run a tight, predictable operation.",
          outcome: "Operations run like clockwork. Costs are low, output is consistent. But when a surprise market shift hits, you can't pivot. The rigid system that made you efficient now makes you fragile.",
          insight: "Stability-first planning optimizes for low volatility but sacrifices flexibility. It's the opportunity cost of rigidity — you gave up adaptability for efficiency."
        },
        B: {
          title: "Plan for Everything",
          desc: "Build contingency plans for multiple scenarios. Be ready for anything.",
          outcome: "You've got a plan for every scenario. When problems hit, you're ready. But maintaining all these backup plans is expensive, and most of them never get used. Your team is stretched thin preparing for futures that may never arrive.",
          insight: "Contingency planning improves adaptability but comes at a real resource cost. You're paying for flexibility — some of which you'll never use."
        },
        C: {
          title: "Build to Last",
          desc: "Invest in resilience — cross-trained teams, flexible workflows, shock absorbers.",
          outcome: "Short-term output dips as resources go toward strengthening the system. But when a crisis hits, your empire absorbs it without breaking. Over time, your expected performance becomes the smoothest in the industry.",
          insight: "Resilience-building sacrifices short-term performance for long-term stability. It reduces downside risk and smooths expected value over time."
        }
      }
    }
  },

  // ─── ADAPTIVE QUESTION POOLS (per season, 3 difficulty tiers) ─────
  // Each season has easy/medium/hard pools. The adaptive engine picks based on performance.
  questions: {
    1: {
      easy: [
        {
          q: "When you hire someone without knowing their true skills, this is called:",
          o: ["Information asymmetry", "Diminishing returns", "Opportunity cost", "Automation bias"],
          c: 0
        },
        {
          q: "A worker who shows you verified past results helps reduce:",
          o: ["Uncertainty about their performance", "The company's revenue", "Automation needs", "Training costs"],
          c: 0
        },
        {
          q: "'Expected value' in business means:",
          o: ["The average outcome you'd predict over time", "The highest possible profit", "The lowest possible cost", "The exact result every time"],
          c: 0
        }
      ],
      medium: [
        {
          q: "Why does limited information increase hiring risk?",
          o: ["You can't accurately predict true ability", "Training always removes uncertainty", "Automation is always better than hiring", "Output is guaranteed regardless"],
          c: 0
        },
        {
          q: "When a candidate oversells their ability, expected value becomes:",
          o: ["Harder to predict accurately", "Automatically higher", "Guaranteed to be zero", "Completely unaffected"],
          c: 0
        },
        {
          q: "Choosing a transparent worker primarily reflects:",
          o: ["Reducing information asymmetry", "Maximizing short-term returns", "Eliminating all risk", "Increasing output volatility"],
          c: 0
        }
      ],
      hard: [
        {
          q: "A polished candidate delivers inconsistent results. The BEST economic explanation is:",
          o: ["Hidden skill gaps create high variance in outcomes", "Training always causes risk", "Automation would solve everything", "Efficiency can never improve through hiring"],
          c: 0
        },
        {
          q: "An automation tool is efficient on average but has terrible days. This illustrates:",
          o: ["High expected value paired with high variance", "Zero risk in automation", "Perfect information about outcomes", "Diminishing returns from technology"],
          c: 0
        },
        {
          q: "Why might automation be valuable DESPITE inconsistent results?",
          o: ["It frees humans for complex tasks where they add more value", "It guarantees perfect accuracy", "It requires no oversight", "It eliminates all bottlenecks immediately"],
          c: 0
        }
      ]
    },

    2: {
      easy: [
        {
          q: "When adding more workers stops helping as much, this is called:",
          o: ["Diminishing returns", "Information asymmetry", "Perfect competition", "Constant growth"],
          c: 0
        },
        {
          q: "A hybrid system combines:",
          o: ["Automation with human judgment", "Only machines", "Only freelancers", "No technology at all"],
          c: 0
        },
        {
          q: "Coordination costs are:",
          o: ["The overhead of managing people and systems working together", "The price of a computer", "The salary of one employee", "Always zero in small teams"],
          c: 0
        }
      ],
      medium: [
        {
          q: "Why does full automation sometimes produce a rollercoaster of results?",
          o: ["It handles simple tasks well but fails on complex edge cases", "It eliminates all uncertainty", "Humans are always more efficient", "Automation never varies in performance"],
          c: 0
        },
        {
          q: "Which concept describes strong early gains from automation that taper off?",
          o: ["Diminishing returns", "Information asymmetry", "Opportunity cost", "Constant marginal value"],
          c: 0
        },
        {
          q: "Why do additional freelancers become less effective at scale?",
          o: ["Coordination costs rise, creating diminishing returns", "Each freelancer adds equal output", "Risk drops as team size grows", "Automation fills every gap"],
          c: 0
        }
      ],
      hard: [
        {
          q: "A productivity spike one day followed by errors the next reflects:",
          o: ["High variance around expected value in automated systems", "Low risk and perfect efficiency", "The elimination of all bottlenecks", "Guaranteed consistent output"],
          c: 0
        },
        {
          q: "Why does relying heavily on freelancers increase information asymmetry?",
          o: ["You can't fully observe their reliability or internal processes", "They always reveal their full workflow", "Output quality is always guaranteed", "Coordination becomes effortless"],
          c: 0
        },
        {
          q: "The hybrid system outperforms pure automation in uncertain conditions because:",
          o: ["Human oversight catches edge cases that automation misses, reducing variance", "It eliminates the need for any automation", "Humans are always faster than machines", "Risk completely disappears"],
          c: 0
        }
      ]
    },

    3: {
      easy: [
        {
          q: "Investing in employee skills is investing in:",
          o: ["Human capital", "Physical capital", "Automation", "Information systems"],
          c: 0
        },
        {
          q: "When training produces big results at first but smaller results later, that's:",
          o: ["Diminishing returns", "Information asymmetry", "Constant growth", "Opportunity cost"],
          c: 0
        },
        {
          q: "Outsourcing means:",
          o: ["Hiring external experts to do specialized work", "Firing all employees", "Building internal systems", "Reducing all costs to zero"],
          c: 0
        }
      ],
      medium: [
        {
          q: "Why do training programs show diminishing returns over time?",
          o: ["Employees master basics early, so later gains are smaller", "Training always increases output equally", "Human capital cannot improve", "Training eliminates all risk"],
          c: 0
        },
        {
          q: "Why does outsourcing increase information asymmetry?",
          o: ["You can't fully observe contractor reliability or workflow", "Contractors reveal full information always", "Internal employees hide more info", "Automation fills knowledge gaps"],
          c: 0
        },
        {
          q: "A new workflow system is slow at first but gets better over time. This shows:",
          o: ["Upfront cost before long-term optimization", "Permanent inefficiency", "Zero coordination cost", "Instant productivity gains"],
          c: 0
        }
      ],
      hard: [
        {
          q: "Training fails to remove all bottlenecks because:",
          o: ["Some bottlenecks are structural, not skill-based", "Training guarantees perfect efficiency", "More employees always remove bottlenecks", "Quality improvements eliminate all constraints"],
          c: 0
        },
        {
          q: "Outsourcing may SHIFT bottlenecks instead of removing them because:",
          o: ["Internal teams must coordinate outputs with external contributors", "Outsourcing removes all dependencies", "Specialists control all decisions automatically", "Specialized work never needs oversight"],
          c: 0
        },
        {
          q: "A workflow system improves over time because:",
          o: ["Variance decreases as teams master repeatable processes", "Expected value is fixed and never changes", "Workers avoid using the system eventually", "Systems produce infinite efficiency immediately"],
          c: 0
        }
      ]
    },

    4: {
      easy: [
        {
          q: "Centralized decision-making means:",
          o: ["One leader makes all the big calls", "Everyone votes on every decision", "Decisions happen randomly", "No one is in charge"],
          c: 0
        },
        {
          q: "When teams make their own decisions independently, this is:",
          o: ["Decentralization", "Centralization", "Automation", "Outsourcing"],
          c: 0
        },
        {
          q: "Using data to make business decisions helps because:",
          o: ["It reduces bias and shows patterns humans might miss", "It eliminates all uncertainty forever", "It replaces the need for any human thinking", "Data is always 100% accurate"],
          c: 0
        }
      ],
      medium: [
        {
          q: "Why does centralizing authority initially improve decision speed?",
          o: ["Fewer people making decisions reduces friction", "More meetings automatically increase throughput", "Information systems become unnecessary", "Decentralization always slows teams down"],
          c: 0
        },
        {
          q: "Which risk increases under decentralization?",
          o: ["Inconsistent decision quality across teams", "Infinite marginal returns", "Zero coordination overhead", "Perfectly aligned priorities"],
          c: 0
        },
        {
          q: "Expected value improves under a data-driven model because:",
          o: ["Decisions become more consistent and predictable", "Human judgment is eliminated entirely", "Short-term randomness increases", "Systems remove all risk forever"],
          c: 0
        }
      ],
      hard: [
        {
          q: "Centralized structures create long-term bottlenecks because:",
          o: ["One decision-maker becomes overloaded as complexity grows", "Workload always shrinks over time", "Employees gain perfect information automatically", "Centralization eliminates all communication costs"],
          c: 0
        },
        {
          q: "Decentralization can improve LONG-TERM performance because:",
          o: ["Innovation increases as teams experiment independently", "Variance in processes disappears completely", "Coordination cost drops to zero", "Central bottlenecks get stronger"],
          c: 0
        },
        {
          q: "The key tradeoff of a data-driven transformation is:",
          o: ["Upfront cost and slow adoption vs. long-term consistency", "Immediate productivity vs. permanent slowdown", "Zero training needs vs. high expertise requirements", "Perfect information from day one vs. no information ever"],
          c: 0
        }
      ]
    },

    5: {
      easy: [
        {
          q: "Opportunity cost means:",
          o: ["What you give up when you choose one option over another", "The price of the most expensive choice", "A cost that never matters", "The total budget of a project"],
          c: 0
        },
        {
          q: "A resilient organization is one that:",
          o: ["Can absorb shocks without breaking", "Never faces any challenges", "Ignores all risks", "Only plans for one scenario"],
          c: 0
        },
        {
          q: "Contingency planning means:",
          o: ["Preparing backup plans for different scenarios", "Only having one plan", "Ignoring potential problems", "Never spending money on preparation"],
          c: 0
        }
      ],
      medium: [
        {
          q: "Why does stability-first planning reduce short-term risk?",
          o: ["Standardized processes are predictable and efficient", "Variance increases intentionally", "It removes all decision-making entirely", "Flexibility is maximized"],
          c: 0
        },
        {
          q: "What tradeoff defines contingency planning?",
          o: ["Higher flexibility vs. lower efficiency from maintaining extra plans", "Zero cost vs. maximum output", "Perfect information vs. zero coordination", "Eliminating uncertainty vs. increasing workload"],
          c: 0
        },
        {
          q: "Why might a resilience-focused organization experience lower short-term performance?",
          o: ["Resources are redirected toward strengthening the system", "It introduces large-scale permanent inefficiency", "It eliminates all workflow optimization", "It requires no upfront investment"],
          c: 0
        }
      ],
      hard: [
        {
          q: "Stability planning may lower LONG-TERM expected value because:",
          o: ["Rigid systems cannot adjust to new opportunities or threats", "Predictable routines always increase returns forever", "Stability eliminates all external shocks permanently", "Decision-making becomes fully decentralized"],
          c: 0
        },
        {
          q: "A resilience-focused organization has higher long-term expected value because:",
          o: ["It absorbs negative shocks and reduces downside risk over time", "It eliminates uncertainty entirely", "It maximizes immediate efficiency above all", "It relies on perfect forecasting of the future"],
          c: 0
        },
        {
          q: "Across all business decisions, the most fundamental tradeoff is:",
          o: ["Efficiency versus flexibility under uncertainty", "Cost versus revenue in a single quarter", "Automation versus employment numbers", "Speed versus legal compliance"],
          c: 0
        }
      ]
    }
  },

  // ─── CHAMPIONSHIP ROUND (cross-season adaptive questions) ──────
  championship: {
    easy: [
      {
        q: "When a company hires without understanding a worker's true ability, the risk comes from:",
        o: ["Information asymmetry — one side knows more than the other", "Opportunity cost from limited resources", "Diminishing returns from overinvestment", "Optimization through efficiency gains"],
        c: 0
      },
      {
        q: "As organizations grow, efficiency gains often slow because:",
        o: ["Early improvements are easier, while later gains face diminishing returns", "Efficiency always increases at the same rate", "Variance in outcomes disappears at scale", "Costs eventually reach zero"],
        c: 0
      },
      {
        q: "What most directly increases unpredictability in business outcomes?",
        o: ["Uncertainty from inconsistent information and processes", "Clearly defined roles and incentives", "Standardized workflows", "Predictable inputs and outputs"],
        c: 0
      }
    ],
    medium: [
      {
        q: "Why can automation simultaneously improve efficiency while increasing volatility?",
        o: ["It excels at routine tasks but struggles with edge cases and nuance", "It eliminates the need for any oversight", "It guarantees perfectly consistent output", "It removes all decision-making from humans"],
        c: 0
      },
      {
        q: "A company chooses a stable but rigid strategy. The main economic cost is:",
        o: ["Opportunity cost from limiting future options and flexibility", "Higher variance in all outcomes", "Increased information asymmetry", "Automation becoming less efficient"],
        c: 0
      },
      {
        q: "Decentralized decision-making can improve speed but introduces risk because:",
        o: ["Different teams may make inconsistent decisions with uneven quality", "Central authority automatically gets stronger", "Processes automatically standardize themselves", "Automation removes all coordination needs"],
        c: 0
      },
      {
        q: "High variance makes expected value harder to rely on because:",
        o: ["Actual outcomes fluctuate widely around the average result", "Expected value stops existing entirely", "Risk is completely eliminated", "Information becomes perfect"],
        c: 0
      }
    ],
    hard: [
      {
        q: "A company upgrades optimization software but total output stays the same. The BEST explanation:",
        o: ["The optimization targeted an area that wasn't limiting overall production", "The organization had already eliminated all inefficiencies", "Expected value became unpredictable due to automation", "Variance outweighed all gains from optimization"],
        c: 0
      },
      {
        q: "A resilience-focused organization has lower short-term performance but higher long-term expected value because:",
        o: ["It absorbs negative shocks and reduces downside risk over time", "It eliminates all uncertainty from the business", "It maximizes immediate efficiency above everything", "It relies on perfect forecasting of future events"],
        c: 0
      },
      {
        q: "Across all chapters of building an empire, the CORE tradeoff of scaling organizations is:",
        o: ["Efficiency versus flexibility under uncertainty", "Cost versus revenue in a single period", "Automation versus total employment", "Speed versus regulatory compliance"],
        c: 0
      }
    ]
  },

  // ─── LEVEL SYSTEM ─────────────────────────────────────
  levels: [
    { title: "Intern",             minXP: 0,    icon: "📋" },
    { title: "Assistant Coach",    minXP: 80,   icon: "📎" },
    { title: "Scout",              minXP: 180,  icon: "🔍" },
    { title: "Manager",           minXP: 300,  icon: "💼" },
    { title: "Director",          minXP: 450,  icon: "📊" },
    { title: "VP of Operations",  minXP: 620,  icon: "🎯" },
    { title: "General Manager",   minXP: 800,  icon: "⭐" },
    { title: "Owner",             minXP: 1000, icon: "👑" },
    { title: "Tycoon",            minXP: 1200, icon: "💎" },
    { title: "Legend",             minXP: 1500, icon: "🏆" }
  ],

  // ─── ACHIEVEMENTS ──────────────────────────────────────
  achievements: [
    { id: "first_steps",    name: "First Steps",    desc: "Complete Season 1",                      icon: "👣" },
    { id: "sharp_mind",     name: "Sharp Mind",      desc: "Answer a Hard question correctly",       icon: "🧠" },
    { id: "economist",      name: "Economist",       desc: "Complete 3 seasons",                     icon: "📈" },
    { id: "streak_3",       name: "Streak Master",   desc: "Get 3 correct in a row",                icon: "🔥" },
    { id: "streak_5",       name: "On Fire",         desc: "Get 5 correct in a row",                icon: "🔥🔥" },
    { id: "empire_builder", name: "Empire Builder",  desc: "Complete all 5 seasons",                 icon: "🏗️" },
    { id: "champion",       name: "Champion",        desc: "Complete the Championship Round",        icon: "🏆" },
    { id: "perfectionist",  name: "Perfectionist",   desc: "Get every question right in a season",  icon: "💎" },
    { id: "strategist",     name: "Strategist",      desc: "Score A or S tier overall",              icon: "♟️" },
    { id: "legend",         name: "Legend",           desc: "Reach Legend level",                     icon: "⭐" }
  ],

  // ─── EMPIRE RATINGS ────────────────────────────────────
  ratings: [
    { tier: "S", label: "LEGEND",    minPct: 90, color: "#fbbf24" },
    { tier: "A", label: "TYCOON",    minPct: 80, color: "#22c55e" },
    { tier: "B", label: "EXECUTIVE", minPct: 70, color: "#3b82f6" },
    { tier: "C", label: "MANAGER",   minPct: 55, color: "#f97316" },
    { tier: "D", label: "INTERN",    minPct: 0,  color: "#94a3b8" }
  ],

  // ─── CLAIM CODES ───────────────────────────────────────
  claimCodes: [
    "BSC-M3F-2K9X", "BSC-M3F-5Q7L", "BSC-M3F-8R3D",
    "BSC-M3F-1V6P", "BSC-M3F-4Z2H"
  ],

  // ─── SCORING CONFIG ────────────────────────────────────
  scoring: {
    pointsPerDifficulty: { easy: 10, medium: 20, hard: 30 },
    xpPerDifficulty:     { easy: 10, medium: 20, hard: 35 },
    seasonBonusXP: 50,
    championshipBonusXP: 100,
    streakBonusThreshold: 3,
    streakBonusMultiplier: 1.5
  }
};
