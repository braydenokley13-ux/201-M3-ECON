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

  // ─── ADAPTIVE QUESTION POOLS (keyed by choice) ───────
  // Each season → each choice (A/B/C) → easy/medium/hard
  // Questions directly reference what happened with YOUR strategy
  questions: {
    1: {
      A: {
        easy: [
          { q: "Your flashy recruit looked great on paper but performed inconsistently. The core problem was:", o: ["You couldn't verify their true skills before hiring", "Their salary was too high", "The interview was too short", "They didn't try hard enough"], c: 0 },
          { q: "When a candidate knows more about their own weaknesses than you do, this gap is called:", o: ["Information asymmetry", "Diminishing returns", "Opportunity cost", "Market failure"], c: 0 }
        ],
        medium: [
          { q: "Your recruit had great weeks and terrible weeks. In economics, this inconsistency is called:", o: ["High variance around the expected value", "Low opportunity cost", "Perfect information", "Guaranteed returns"], c: 0 },
          { q: "Why did hiring the flashy recruit increase your empire's risk stat?", o: ["Unverified talent creates unpredictable outcomes", "All hiring always increases risk equally", "Flashy recruits cost more money", "Risk has nothing to do with information"], c: 0 }
        ],
        hard: [
          { q: "If you could have tested the recruit's skills before hiring, your expected value would:", o: ["Stay similar but variance would drop significantly", "Double immediately", "Drop to zero", "Remain completely unchanged"], c: 0 },
          { q: "Your flashy recruit scenario is an example of 'adverse selection' because:", o: ["Candidates with hidden weaknesses are most likely to oversell themselves", "All candidates are equally qualified", "Employers always have more information than applicants", "Hiring is risk-free when you check resumes"], c: 0 }
        ]
      },
      B: {
        easy: [
          { q: "You chose the proven worker because they had verifiable results. This reduced:", o: ["Uncertainty about their true ability", "Their salary expectations", "The need for any management", "All business risk permanently"], c: 0 },
          { q: "When both sides of a deal have the same information, this is called:", o: ["Transparency (reduced information asymmetry)", "Diminishing returns", "Opportunity cost", "Market manipulation"], c: 0 }
        ],
        medium: [
          { q: "Your proven worker delivered steady, predictable results. In economics, this means:", o: ["Low variance — outcomes cluster around the expected value", "Zero expected value", "High risk with low reward", "Guaranteed maximum profit every time"], c: 0 },
          { q: "By choosing transparency over flash, you traded away:", o: ["Potentially higher upside for more predictable outcomes", "All future growth", "Your team's morale permanently", "Nothing — transparency has no tradeoffs"], c: 0 }
        ],
        hard: [
          { q: "Your decision reflects a preference for low variance over high expected value. This is rational when:", o: ["You can't afford a catastrophic bad outcome early on", "You want maximum possible upside", "Risk is irrelevant to startups", "Predictability never matters in business"], c: 0 },
          { q: "The opportunity cost of choosing the proven worker was:", o: ["The potential (but uncertain) higher output from a flashier hire", "Zero — there's never a cost to playing it safe", "Guaranteed lost revenue", "Permanent competitive disadvantage"], c: 0 }
        ]
      },
      C: {
        easy: [
          { q: "You chose automation instead of hiring. Automation handles routine tasks but struggles with:", o: ["Situations requiring human judgment", "Simple repetitive work", "Basic calculations", "Following clear instructions"], c: 0 },
          { q: "Your automated system had great days and terrible days. This inconsistency is called:", o: ["High variance", "Low efficiency", "Information asymmetry", "Constant returns"], c: 0 }
        ],
        medium: [
          { q: "Your automation boosted efficiency but raised risk. Why do these stats move together?", o: ["Speed without human oversight means errors go uncaught", "Automation always raises risk equally", "Efficiency and risk are the same thing", "Machines never make mistakes"], c: 0 },
          { q: "By skipping hiring entirely, you avoided information asymmetry but gained:", o: ["A different type of uncertainty — unpredictable machine failures", "Perfect outcomes with zero risk", "Complete control over all outputs", "Nothing negative at all"], c: 0 }
        ],
        hard: [
          { q: "Your automation has high expected value but high variance. A smart next move would be:", o: ["Add human oversight for edge cases to reduce variance", "Remove all automation immediately", "Increase automation speed to eliminate errors", "Ignore the bad days since the average is good"], c: 0 },
          { q: "The tradeoff you made — high efficiency with high risk — is rational when:", o: ["You have resources to absorb occasional failures", "You need guaranteed results every single day", "Your business can't handle any bad outcomes", "Variance doesn't matter in any context"], c: 0 }
        ]
      }
    },

    2: {
      A: {
        easy: [
          { q: "Your full automation crushed routine tasks but failed on edge cases. This pattern shows:", o: ["Automation works best on simple, repeatable work", "Machines are better than humans at everything", "Edge cases never happen in real business", "Automation eliminates all uncertainty"], c: 0 },
          { q: "When each additional unit of automation helps less than the last, this is:", o: ["Diminishing returns", "Information asymmetry", "Constant growth", "Perfect efficiency"], c: 0 }
        ],
        medium: [
          { q: "Your automation produced a 'rollercoaster of results.' This means:", o: ["High expected value but dangerously high variance", "Perfectly consistent output every time", "Zero risk to the business", "Guaranteed failure on all tasks"], c: 0 },
          { q: "Full automation hurt your morale stat because:", o: ["Workers feel replaced and disconnected from the process", "Machines are always bad for revenue", "Automation has no effect on people", "Morale only changes from salary increases"], c: 0 }
        ],
        hard: [
          { q: "Diminishing returns hit your automation because:", o: ["Simple tasks were solved first; remaining tasks are too complex for machines", "Adding more machines always helps equally", "Automation scales infinitely without limits", "Edge cases disappear with more computing power"], c: 0 },
          { q: "Your full automation strategy maximized short-term output but created fragility. This tradeoff is called:", o: ["Optimizing for efficiency at the expense of resilience", "A free lunch with no downsides", "Information asymmetry in machine learning", "Guaranteed long-term success"], c: 0 }
        ]
      },
      B: {
        easy: [
          { q: "Your hybrid system paired automation with human judgment. The humans mainly handled:", o: ["Complex situations machines couldn't figure out", "Simple repetitive data entry", "Nothing — they were just backup", "Tasks that required no thinking"], c: 0 },
          { q: "Your hybrid approach produced 'steady growth with no dramatic crashes.' This means:", o: ["Low variance — consistent, predictable results", "Zero growth over time", "Extremely high risk", "Random outcomes every day"], c: 0 }
        ],
        medium: [
          { q: "Why did the hybrid system outperform pure automation for your empire?", o: ["Human oversight catches edge cases that crash automated systems", "Humans are always faster than machines", "Automation provides zero value", "Adding humans always reduces efficiency"], c: 0 },
          { q: "Your hybrid strategy reflects 'optimization under uncertainty' because:", o: ["You balanced efficiency gains with safeguards against unpredictable failures", "You eliminated all uncertainty completely", "You chose the most expensive option possible", "Uncertainty doesn't exist in hybrid systems"], c: 0 }
        ],
        hard: [
          { q: "The hybrid model reduced risk while maintaining efficiency. The key economic insight is:", o: ["Diversifying approaches reduces variance without sacrificing expected value", "You should always choose the cheapest option", "Pure systems always outperform mixed ones", "Risk and efficiency are always inversely linked"], c: 0 },
          { q: "If you'd gone full automation instead, your expected value might be similar but:", o: ["Variance would be much higher, making bad outcomes more likely", "Everything would be strictly better", "Risk would drop to zero", "Morale would increase significantly"], c: 0 }
        ]
      },
      C: {
        easy: [
          { q: "Your first few freelancers were amazing, but quality dropped as you added more. This is:", o: ["Diminishing returns", "Information asymmetry", "Automation bias", "Constant marginal value"], c: 0 },
          { q: "Coordination costs are:", o: ["The overhead of managing more people working together", "The salary of one freelancer", "Always zero in remote teams", "The price of office supplies"], c: 0 }
        ],
        medium: [
          { q: "Each additional freelancer added less value to your empire because:", o: ["Coordination costs rose faster than new output", "Freelancers get lazier over time", "More people always means more output", "There's no limit to how many people help"], c: 0 },
          { q: "Your freelancer army also increased information asymmetry because:", o: ["You couldn't observe their work quality or processes directly", "Freelancers always share all their methods", "More workers means more transparency", "Information has nothing to do with team size"], c: 0 }
        ],
        hard: [
          { q: "At what point should you have stopped adding freelancers?", o: ["When the marginal cost of coordination exceeded the marginal value of output", "Never — more people always helps", "After the very first one", "Only when you run out of money"], c: 0 },
          { q: "Your freelancer strategy combined two economic problems:", o: ["Diminishing returns (from scale) AND information asymmetry (from outsiders)", "Zero risk and perfect efficiency", "Constant returns and full transparency", "Decreasing costs and increasing quality"], c: 0 }
        ]
      }
    },

    3: {
      A: {
        easy: [
          { q: "You invested in training your team. Training employees is investing in:", o: ["Human capital — their skills and knowledge", "Physical capital — equipment and tools", "Automation — replacing humans with machines", "Nothing — training doesn't count as investment"], c: 0 },
          { q: "Your training worked great at first but helped less over time. This is:", o: ["Diminishing returns on human capital", "Constant growth forever", "Information asymmetry in education", "Negative expected value"], c: 0 }
        ],
        medium: [
          { q: "Why did your training eventually stop removing bottlenecks?", o: ["The remaining problems were structural, not skill-based", "Training always removes all bottlenecks", "Employees stopped learning entirely", "Skills never improve business outcomes"], c: 0 },
          { q: "Your morale went up from training because:", o: ["Employees feel valued when you invest in their development", "Training is always fun regardless of content", "Morale always rises automatically over time", "Higher skills guarantee higher happiness"], c: 0 }
        ],
        hard: [
          { q: "The diminishing returns on your training investment suggest you should:", o: ["Combine training with structural changes for continued improvement", "Train even harder to push through the plateau", "Stop investing in employees entirely", "Replace all trained workers with new hires"], c: 0 },
          { q: "Your training raised efficiency but couldn't fix system-level problems. This shows:", o: ["Individual optimization can't solve organizational design failures", "Training is always a waste of money", "Systems fix themselves when workers are skilled enough", "Human capital has zero impact on outcomes"], c: 0 }
        ]
      },
      B: {
        easy: [
          { q: "You brought in outside specialists. Outsourcing means:", o: ["Hiring external experts for tasks your team can't handle", "Firing your entire staff", "Building everything internally", "Never using outside help"], c: 0 },
          { q: "Your specialists removed bottlenecks fast but quality varied. The quality variation comes from:", o: ["Information asymmetry — you can't see their full process", "Specialists are always unreliable", "External work is always perfect", "Quality never varies in outsourcing"], c: 0 }
        ],
        medium: [
          { q: "Why did outsourcing raise your risk stat significantly?", o: ["You depend on people whose work quality you can't directly observe", "External experts never do good work", "Risk always goes up regardless of strategy", "Outsourcing eliminates all uncertainty"], c: 0 },
          { q: "Your specialists solved old bottlenecks but created new coordination problems. This is an example of:", o: ["Shifting bottlenecks rather than eliminating them", "Perfect problem-solving with no tradeoffs", "Diminishing returns on hiring", "Constant marginal improvement"], c: 0 }
        ],
        hard: [
          { q: "The outsourcing created a tradeoff: speed of fix vs. long-term dependency. The opportunity cost was:", o: ["Building slower but more controllable internal capabilities", "Nothing — outsourcing has no downsides", "Guaranteed worse outcomes in all scenarios", "Immediate revenue loss with no future benefit"], c: 0 },
          { q: "To reduce the information asymmetry from your outsourcing, the best approach would be:", o: ["Establish verification processes and performance metrics for contractors", "Trust that all contractors self-monitor perfectly", "Remove all oversight to reduce costs", "Never outsource anything again"], c: 0 }
        ]
      },
      C: {
        easy: [
          { q: "Your new internal system was slow at first but improved over time. The early slowdown is called:", o: ["Upfront cost — investing now for future gains", "Permanent inefficiency", "A sign the system is broken", "Diminishing returns"], c: 0 },
          { q: "After a rough start, your errors dropped and consistency rose. This shows:", o: ["The system created repeatable, scalable processes", "Random luck improved your outcomes", "The system had no real effect", "Employees worked harder out of fear"], c: 0 }
        ],
        medium: [
          { q: "Your empire's risk dropped because the internal system:", o: ["Reduced variance by making processes consistent and predictable", "Eliminated all possible problems forever", "Had nothing to do with risk", "Made workers take more shortcuts"], c: 0 },
          { q: "The opportunity cost of building the system was:", o: ["Short-term revenue and efficiency lost during the setup period", "Nothing — building systems is always free", "Permanent damage to the business", "The salary of one extra employee"], c: 0 }
        ],
        hard: [
          { q: "Your system succeeded long-term because repeatable processes:", o: ["Reduce variance, making expected value more reliable and predictable", "Guarantee maximum output immediately", "Eliminate the need for any human workers", "Only work in perfect conditions"], c: 0 },
          { q: "Compared to training (Choice A), your systems approach works because:", o: ["It fixes structural bottlenecks that individual skills can't solve", "Individual training is always worthless", "Systems never have diminishing returns", "Workers hate learning new skills"], c: 0 }
        ]
      }
    },

    4: {
      A: {
        easy: [
          { q: "You centralized all decisions through one leader. This means:", o: ["One person makes all the major calls", "Every employee votes on every decision", "Decisions are made randomly", "No one is in charge"], c: 0 },
          { q: "Your centralized approach stabilized the crisis fast because:", o: ["Fewer decision-makers means less friction and faster action", "More meetings speed things up", "Employees don't need leadership in a crisis", "Centralization eliminates all problems permanently"], c: 0 }
        ],
        medium: [
          { q: "Weeks after the crisis, your leader was drowning in decisions. This is a:", o: ["Bottleneck — one person can't scale with growing complexity", "Sign that centralization always works perfectly", "Temporary issue that always resolves itself", "Proof that leaders should work harder"], c: 0 },
          { q: "Your morale dropped under centralization because:", o: ["People feel disempowered when they can't make any decisions", "Strong leadership always hurts morale", "Morale has nothing to do with decision-making structure", "Employees prefer having zero autonomy"], c: 0 }
        ],
        hard: [
          { q: "Centralization showed diminishing returns because:", o: ["One mind hits cognitive limits as decisions multiply", "More authority always means better decisions", "Leaders never get overwhelmed", "Decision quality improves linearly with power"], c: 0 },
          { q: "The fundamental tradeoff of your centralization strategy was:", o: ["Short-term decisiveness vs. long-term scalability and team growth", "Zero risk and maximum efficiency permanently", "No tradeoff — centralization is always optimal", "Immediate failure followed by eventual success"], c: 0 }
        ]
      },
      B: {
        easy: [
          { q: "You gave each team autonomy to make their own decisions. This is called:", o: ["Decentralization", "Centralization", "Automation", "Outsourcing"], c: 0 },
          { q: "Some of your teams made brilliant decisions while others made terrible ones. This inconsistency is:", o: ["High variance in decision quality across teams", "A sign decentralization always fails", "Proof that all teams are equally skilled", "Expected under perfect information"], c: 0 }
        ],
        medium: [
          { q: "Decentralization raised your risk stat because:", o: ["Without coordination, teams can make conflicting or poor decisions", "Autonomy always creates identical outcomes", "Teams with power never make mistakes", "Risk only changes from external events"], c: 0 },
          { q: "Your teams reacted incredibly fast to the crisis because:", o: ["Local decision-makers don't wait for approval from above", "Decentralization slows all responses", "Speed has nothing to do with organizational structure", "Teams ignore all problems under autonomy"], c: 0 }
        ],
        hard: [
          { q: "Decentralization can improve LONG-TERM performance because:", o: ["Independent teams experiment and innovate, finding solutions centralization would miss", "Variance always disappears over time", "Coordination costs drop to zero automatically", "Central bottlenecks become stronger with autonomy"], c: 0 },
          { q: "The key challenge of your decentralization strategy is:", o: ["Balancing team autonomy with enough coordination to maintain consistency", "Eliminating all team independence", "Ensuring no team ever fails", "Making every team identical in approach"], c: 0 }
        ]
      },
      C: {
        easy: [
          { q: "You built a data model to guide decisions. Data-driven decisions help because:", o: ["Numbers reveal patterns and reduce human bias", "Data is always 100% accurate", "Data replaces all human thinking", "Gut feelings are always wrong"], c: 0 },
          { q: "Your data system was slow to build but improved over time. The slow start was:", o: ["An upfront investment cost before long-term payoff", "A sign the approach was failing", "Proof that data doesn't work", "A permanent limitation"], c: 0 }
        ],
        medium: [
          { q: "Your data-driven approach reduced risk because:", o: ["Consistent decision rules remove subjective errors and bias", "Data eliminates all uncertainty forever", "Numbers are never wrong", "Risk can only be reduced by data"], c: 0 },
          { q: "Why didn't your data system boost revenue or morale immediately?", o: ["Building analytical infrastructure costs time and resources before it pays off", "Data always hurts revenue", "Morale and data are completely unrelated", "The system was designed to reduce everything"], c: 0 }
        ],
        hard: [
          { q: "Your data model improved expected value over time because:", o: ["Better information reduces variance in decisions, making outcomes more predictable", "Data always guarantees maximum profit", "Past data perfectly predicts every future event", "Removing humans from decisions is always optimal"], c: 0 },
          { q: "Compared to centralization (Choice A), your data approach is better long-term because:", o: ["A system scales infinitely while a single leader hits cognitive bottlenecks", "Data is always cheaper than leadership", "Centralization never helps in any scenario", "Leaders can never use data effectively"], c: 0 }
        ]
      }
    },

    5: {
      A: {
        easy: [
          { q: "You standardized everything for maximum efficiency. But when a surprise hit, you couldn't pivot. This rigidity is:", o: ["The opportunity cost of choosing pure stability", "A benefit of standardization", "Something that never happens in real business", "Proof that efficiency is bad"], c: 0 },
          { q: "Opportunity cost means:", o: ["What you give up by choosing one option over another", "The price of the most expensive option", "A cost that only matters in school", "The total budget of a project"], c: 0 }
        ],
        medium: [
          { q: "Your 'Lock It Down' strategy maximized short-term efficiency but:", o: ["Sacrificed flexibility, making you fragile to unexpected changes", "Created zero tradeoffs whatsoever", "Also maximized long-term adaptability", "Had no effect on risk or resilience"], c: 0 },
          { q: "Your operation 'ran like clockwork' — but clockwork systems fail when:", o: ["The environment changes in ways the system wasn't designed for", "Everything stays exactly the same forever", "Efficiency is too high", "Workers follow the rules too closely"], c: 0 }
        ],
        hard: [
          { q: "Your rigid system may lower LONG-TERM expected value because:", o: ["It can't capture new opportunities or adapt to threats, reducing average outcomes over time", "Stability always maximizes returns forever", "Rigid systems never face external shocks", "Short-term efficiency guarantees long-term success"], c: 0 },
          { q: "The economic lesson from your choice is that pure optimization:", o: ["Creates fragility — systems tuned for one environment break when conditions change", "Is always the correct strategy", "Eliminates all risk permanently", "Has no relationship to flexibility"], c: 0 }
        ]
      },
      B: {
        easy: [
          { q: "You built contingency plans for every scenario. Contingency planning means:", o: ["Preparing backup plans for different possible futures", "Only having one plan", "Ignoring potential problems", "Never spending on preparation"], c: 0 },
          { q: "Most of your backup plans were never used. The cost of unused plans is:", o: ["Real — you spent resources preparing for things that didn't happen", "Zero — unused plans cost nothing", "A sign you should never plan ahead", "Impossible to calculate"], c: 0 }
        ],
        medium: [
          { q: "Your contingency strategy reduced risk significantly because:", o: ["Having prepared responses means you react faster to any crisis", "Backup plans eliminate all possible problems", "Planning costs nothing", "Risk only decreases with higher revenue"], c: 0 },
          { q: "The tradeoff of your 'plan for everything' approach was:", o: ["Higher flexibility at the cost of lower efficiency from maintaining extra plans", "Zero tradeoff — contingency planning is free", "Lower flexibility and lower efficiency", "Maximum efficiency with maximum adaptability"], c: 0 }
        ],
        hard: [
          { q: "Your revenue dropped because contingency planning:", o: ["Diverts resources from productive activities into preparing for events that may never occur", "Always increases revenue", "Has no relationship to profitability", "Guarantees that every plan gets used"], c: 0 },
          { q: "Compared to 'Lock It Down' (Choice A), your approach trades:", o: ["Short-term efficiency for long-term adaptability — a flexibility premium", "Nothing — both strategies are identical", "Long-term value for short-term speed", "All adaptability for maximum efficiency"], c: 0 }
        ]
      },
      C: {
        easy: [
          { q: "You invested in resilience — cross-trained teams and flexible workflows. A resilient organization:", o: ["Can absorb shocks without breaking down", "Never faces any challenges", "Ignores all risks entirely", "Only plans for one scenario"], c: 0 },
          { q: "Your short-term output dipped because building resilience requires:", o: ["Redirecting resources from production into strengthening the system", "No effort or investment at all", "Reducing employee skills", "Eliminating all current processes"], c: 0 }
        ],
        medium: [
          { q: "Your empire became the 'smoothest operation' long-term because resilience:", o: ["Reduces the impact of negative shocks, keeping average performance higher over time", "Eliminates all problems instantly", "Only matters in the short term", "Has nothing to do with long-term stability"], c: 0 },
          { q: "Cross-training your team reduced risk because:", o: ["If one person leaves or fails, others can cover — reducing single points of failure", "Cross-training has no effect on risk", "More skills always means more risk", "Risk only changes from external events"], c: 0 }
        ],
        hard: [
          { q: "Your resilience strategy has the highest long-term expected value because:", o: ["Absorbing shocks prevents catastrophic losses that permanently lower your trajectory", "Short-term sacrifice always guarantees success", "Resilience eliminates uncertainty completely", "Expected value is not affected by downside protection"], c: 0 },
          { q: "The fundamental insight from your 'Build to Last' strategy across all 5 seasons is:", o: ["Efficiency vs. flexibility under uncertainty is the core tradeoff in every business decision", "One strategy is always correct regardless of context", "Risk doesn't matter if your revenue is high enough", "Short-term results are all that matter"], c: 0 }
        ]
      }
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
