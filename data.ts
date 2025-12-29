import { PrincipleItem, AnalysisData } from './types';

export const principles: PrincipleItem[] = [
  { 
    id: 1, 
    category: 'CORE',
    title: "人生基本盘",
    content: "人生最重要的三项决定是：和谁在一起，做什么事，以及在哪里生活。",
    points: ["这三者决定了你人生的基本盘。", "其余决策皆为次要。"]
  },
  { 
    id: 2, 
    category: 'MINDSET',
    title: "注意力资源",
    content: "你人生中最宝贵的资源不是金钱或时间，而是你的注意力。",
    points: ["谨慎地选择你关注的事物。", "你关注什么，你就成为了什么。"]
  },
  { 
    id: 3, 
    category: 'RELATION',
    title: "拒绝负能量",
    content: "不要与愤世嫉俗者和悲观主义者合作。",
    points: ["他们的信念会自我实现。", "最终拖垮整个项目。"]
  },
  { 
    id: 4, 
    category: 'STRATEGY',
    title: "欲望管理",
    content: "如果你想成功，必须精挑细选你的欲望。",
    points: ["欲望分散会导致精力分散。", "专注是成功的必要条件。"]
  },
  { 
    id: 5, 
    category: 'STRATEGY',
    title: "物质与自由",
    content: "先追求物质成功，再寻求精神自由，是更现实的路径。",
    points: ["赢得人生这场游戏的目的，是为了最终能从中解脱出来。", "自由需要物质基础。"]
  },
  { 
    id: 6, 
    category: 'MINDSET',
    title: "旅程即回报",
    content: "享受旅程本身，因为旅程即是回报。",
    points: ["不要推迟满足感。", "当下即是全部。"]
  },
  { 
    id: 7, 
    category: 'MINDSET',
    title: "非执着",
    content: "对一件事物越不执着，你就越能以一种自然、真实的方式去做它。",
    points: ["你会因为热爱而做，而不是为了结果。", "执着是焦虑的根源。"]
  },
  { 
    id: 8, 
    category: 'MINDSET',
    title: "幸福本质",
    content: "幸福的本质，是满足于现状，不感觉此刻有任何缺失。",
    points: ["它是一种内在的平和。", "不依赖外部条件的改变。"]
  },
  { 
    id: 9, 
    category: 'MINDSET',
    title: "自尊构建",
    content: "自尊是你与自己建立的声誉。",
    points: ["建立自尊的最好方式是严格遵守自己的道德准则。", "如果你都不喜欢自己，外部世界将是无法逾越的挑战。"]
  },
  { 
    id: 10, 
    category: 'STRATEGY',
    title: "学习即纠错",
    content: "所有学习的本质都是纠错。",
    points: ["如果你真的在学习，那你大部分时间都将是“错误”的。", "需要不断更新认知。"]
  },
  { 
    id: 11, 
    category: 'STRATEGY',
    title: "快速迭代",
    content: "成功的关键不是避免失败，而是增加尝试的次数。",
    points: ["现代社会对失败的容忍度极高。", "从每次失败中学习并快速迭代。"]
  },
  { 
    id: 12, 
    category: 'STRATEGY',
    title: "失败者优势",
    content: "从失败的身份开始，可能是一种优势。",
    points: ["你一无所有，所以没有包袱。", "拥有从零开始、不畏惧失败的勇气。"]
  },
  { 
    id: 13, 
    category: 'MINDSET',
    title: "直觉决策",
    content: "在重大、模糊的人生选择上，要相信经过经验磨砺的直觉。",
    points: ["理性只是事后的合理化工具。", "真正的理解是从第一性原理出发。"]
  },
  { 
    id: 14, 
    category: 'RELATION',
    title: "不改变他人",
    content: "你无法改变他人，但可以改变自己。",
    points: ["别指望改变你的伴侣或朋友。", "他们只会因为自己顿悟或创伤而改变。"]
  },
  { 
    id: 15, 
    category: 'CORE',
    title: "逃离竞争",
    content: "通过做独一无二的自己，来逃离竞争。",
    points: ["找到那件对你来说是玩乐，但对别人来说是工作的事情。", "将它“产品化”。"]
  },
  { 
    id: 16, 
    category: 'STRATEGY',
    title: "短期痛苦原则",
    content: "如果你在两个选项间犹豫不决，选那个在短期内更痛苦的。",
    points: ["大脑天生会夸大眼前的痛苦。", "这条路往往通向长期的更大利益。"]
  },
  { 
    id: 17, 
    category: 'STRATEGY',
    title: "绝对Yes原则",
    content: "如果你无法决定，那答案就是“不”。",
    points: ["只抓住那些让你毫不犹豫、内心大喊 “Yes!” 的机会。", "拒绝模棱两可。"]
  },
  { 
    id: 18, 
    category: 'CORE',
    title: "名声陷阱",
    content: "名声最好是作为创造价值的副产品而获得。",
    points: ["为了名声而追求名声，是一个空洞且危险的陷阱。"]
  },
  { 
    id: 19, 
    category: 'STRATEGY',
    title: "捕捉灵感",
    content: "灵感是易逝品，必须立即行动。",
    points: ["不受日程束缚的自由生活，能最大限度地抓住灵感。", "实现最高效率。"]
  },
  { 
    id: 20, 
    category: 'STRATEGY',
    title: "有效迭代",
    content: "掌握任何技能的关键是迭代次数，而不是小时数。",
    points: ["不是重复一万小时。", "是进行一万次带有学习和纠错的迭代。"]
  },
  { 
    id: 21, 
    category: 'STRATEGY',
    title: "延迟满足",
    content: "你人生的高度，取决于你愿意承受多大的短期痛苦。",
    points: ["几乎所有重大的回报，都来自于对眼前诱惑的延迟满足。"]
  },
  { 
    id: 22, 
    category: 'RELATION',
    title: "有限尊重",
    content: "你只需要得到你所尊重的那极少数人的尊重。",
    points: ["试图从大众那里获得认可，是徒劳无功的。"]
  },
  { 
    id: 23, 
    category: 'RELATION',
    title: "真正的阿尔法",
    content: "真正的领导者不是先吃的人，而是确保每个人都吃饱后最后一个吃的人。",
    points: ["健康社会的标志，是奖励那些为群体做出贡献的人。"]
  },
  { 
    id: 24, 
    category: 'MINDSET',
    title: "死亡均衡器",
    content: "认识到一切终将归零，会让你放下许多不必要的焦虑和执着。",
    points: ["生命短暂，死亡是最终的均衡器。", "专注于活在当下。"]
  },
  { 
    id: 25, 
    category: 'RELATION',
    title: "育儿核心",
    content: "育儿的核心是提供无条件的爱，并保护孩子的能动性。",
    points: ["目标不是培养“训练有素的狗”。", "而是养育“能自我生存的狼”。"]
  },
  { 
    id: 26, 
    category: 'SYSTEM',
    title: "科技变量",
    content: "关注那些可能颠覆底层逻辑的科技进步（如 GLP-1）。",
    points: ["它们将深刻改变社会健康、成瘾治疗和医疗成本。", "影响远超表面。"]
  },
  {
    id: 27,
    category: 'STRATEGY',
    title: "非线性路径",
    content: "避免线性人生路径（读书→工作→晋升），因为其失败不可逆且风险集中。",
    points: ["并行尝试。", "低成本试错。", "快速放弃。"]
  },
  {
    id: 28,
    category: 'STRATEGY',
    title: "下限设计",
    content: "永远为“最坏情况”设计一个可接受的下限。",
    points: ["问自己：如果彻底失败，是否仍能体面生存？", "如果答案是Yes，即可下注。"]
  },
  {
    id: 29,
    category: 'STRATEGY',
    title: "不确定性成长",
    content: "把“确定性痛苦”换成“不确定性成长”。",
    points: ["舒适区是可预测的缓慢衰退。", "追求短期痛苦确定、长期收益无限的分布。"]
  },
  {
    id: 30,
    category: 'SYSTEM',
    title: "长期优化",
    content: "不要优化你不打算长期做的事。",
    points: ["如果不愿意做10年，就不必追求效率。", "只需尽快验证是否值得留下。"]
  },
  {
    id: 31,
    category: 'SYSTEM',
    title: "系统选择",
    content: "判断一个系统是否值得参与，看它如何对待失败者。",
    points: ["如果失败者被羞辱且无法再次入场，系统迟早崩溃。", "不值得投入人生筹码。"]
  },
  {
    id: 32,
    category: 'STRATEGY',
    title: "解释性陷阱",
    content: "不要让“可被解释性”成为决策前提。",
    points: ["重要选择早期往往不可解释。", "逻辑不完整，只能被事后证明。"]
  },
  {
    id: 33,
    category: 'MINDSET',
    title: "随时退出权",
    content: "真正的长期主义不是熬，而是随时可退。",
    points: ["每天都自愿留下，而非被沉没成本绑架。", "不能随时退出的是困境。"]
  },
  {
    id: 34,
    category: 'SYSTEM',
    title: "不可修正风险",
    content: "真正的风险不是失败，而是“不可修正”。",
    points: ["极力规避声誉不可修复、身体不可逆损伤、心智僵化。", "其他失败皆可接受。"]
  },
  {
    id: 35,
    category: 'MINDSET',
    title: "原则性自尊",
    content: "把“自我认同”建立在原则上，而不是结果上。",
    points: ["建立在结果上会恐惧失败。", "建立在原则上可以重来，可以清零。"]
  }
];

export const analysisData: AnalysisData = {
  intro: "SYSTEM DIAGNOSTIC: 本次分析针对 35 条核心原则进行结构化解构。该协议不仅是一组建议，更是一套完整的「反脆弱操作系统」。它强调在极端不确定性中建立秩序，通过主动的风险管理和注意力分配，实现个体生存质量的最大化。",
  metaLogic: {
    title: "KERNEL LEVEL // 底层元逻辑",
    description: "检测到 4 条隐含的系统级规则，这些规则支配着上层应用层的行为。",
    rules: [
      {
        title: "RULE_01: 非对称博弈 (Asymmetry)",
        description: "纳西姆·塔勒布式架构",
        points: [
          "限制下行风险 (Cap Downside): 确保任何失败都不会导致系统崩溃 (Ref: #28, #34)。",
          "无限上行空间 (Uncapped Upside): 暴露在正面黑天鹅事件中 (Ref: #15, #20)。",
          "操作策略: 快速迭代，低成本试错。"
        ]
      },
      {
        title: "RULE_02: 资源稀缺性 (Scarcity)",
        description: "注意力 > 时间 > 金钱",
        points: [
          "CPU 限制: 你的认知带宽是极其有限的。",
          "过滤机制: “如果不是绝对Yes，就是No” 是最高效的防火墙 (Ref: #17)。",
          "聚焦策略: 拒绝平庸的机会，只为头部机会分配算力。"
        ]
      },
      {
        title: "RULE_03: 流动性身份 (Fluid Identity)",
        description: "避免硬编码",
        points: [
          "身份固化是成长的死锁 (Deadlock)。",
          "保持“从零开始”的兼容性 (Ref: #12)。",
          "不依赖外部结果来定义系统完整性 (Ref: #09, #35)。"
        ]
      },
      {
        title: "RULE_04: 退出权 (Exit Rights)",
        description: "自由的定义",
        points: [
          "真正的控制权在于“随时切断连接”的能力 (Ref: #33)。",
          "不被沉没成本绑架，不被名声锁定 (Ref: #18)。",
          "最终的退出是死亡，认知它能优化运行时的性能 (Ref: #24)。"
        ]
      }
    ]
  },
  coreFramework: {
    title: "SYSTEM ARCHITECTURE // 核心架构",
    description: "整个系统的运行依赖于三个主要模块的协同。",
    points: [
      {
        label: "MODULE_A: RELATION (连接)",
        ids: [1, 3, 14, 22, 23, 25],
        description: "网络拓扑结构。决定了信息输入的质量和系统的抗干扰能力。核心算法：筛选强节点，屏蔽噪声节点。"
      },
      {
        label: "MODULE_B: MISSION (计算)",
        ids: [1, 2, 4, 15, 19, 20, 30],
        description: "核心处理进程。定义了系统的吞吐量和产出。核心算法：寻找独特性（垄断性）任务，进行高频迭代。"
      },
      {
        label: "MODULE_C: ENVIRONMENT (环境)",
        ids: [1, 5, 26, 31],
        description: "运行沙箱。物理和数字环境决定了系统的底层参数。核心算法：选择对失败者友好的生态系统。"
      }
    ]
  },
  keyInsight: {
    title: "DECODED MESSAGE // 核心洞察",
    description: "对系统日志的深度分析揭示了一个隐藏的真理。",
    points: [
      "大多数协议教你如何 Overclock (超频) —— 更快、更强、更赢。",
      "本协议教你如何防止 Overheat (过热) 和 System Failure (系统崩溃)。",
      "目标不是短暂的峰值性能，而是长周期的稳定运行 (Uptime)。"
    ],
    highlight: "这不是一套成功学，这是一套「防自毁」的系统工程学。"
  },
  sections: [
    {
      title: "PROTOCOL: 迭代与容错",
      content: [
        "系统稳定性建立在大量的微小失败之上，而非完美的预测。",
        "将错误视为数据输入，而非系统故障 (#10, #11)。",
        "在安全沙箱中进行高频测试，避免在生产环境中进行不可逆操作 (#34)。"
      ]
    },
    {
      title: "PROTOCOL: 能量守恒",
      content: [
        "能量（意志力/注意力）是不可再生资源，需极度节约。",
        "切断与耗能组件（悲观者、无意义社交）的连接 (#3)。",
        "将能量集中在长半衰期的事务上 (#30)。"
      ]
    }
  ],
  summary: "ZENITH PROTOCOL 是一套为高熵环境设计的生存算法。它建议用户放弃线性的路径规划，转而构建一个模块化、可插拔、高冗余的人生系统。通过底层原则的约束，确保在面对黑天鹅事件时，系统不仅能存活，还能从中获益。"
};