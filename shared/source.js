/* 站点运行时源数据：window.ALP_SOURCE。 */
window.ALP_SOURCE = {
  "meta": {
    "generated": "2026-11-18",
    "timezone": "Asia/Singapore",
    "note": "收录 167 条经核验的 AI 学习资源（其中 51 个 GitHub 仓库、8 个跨线换乘站）。在 A、M 线各设一个线路级终点站「面试」（挂在 trunk.interview，不挂在各支线）；P、E 线不设面试终点。github.last_commit 为 Asia/Singapore 日历日，last_commit_at 为 UTC。部分较旧资源带有可选字段 era，供卡片显示年代标签。",
    "counts": {
      "resources": 167,
      "repos": 51,
      "transfer_stations": 8,
      "flagged": 3,
      "urls_checked": 167,
      "dropped_404": 0,
      "replaced": 23,
      "deleted_in_review": 3,
      "backfill": 15,
      "review_2_added": 4,
      "interview_added": 8
    }
  },
  "stages": [
    {
      "id": "intro",
      "name": "入门",
      "en": "Basics"
    },
    {
      "id": "adv",
      "name": "进阶",
      "en": "Deeper"
    },
    {
      "id": "build",
      "name": "实战",
      "en": "Build"
    },
    {
      "id": "interview",
      "name": "面试",
      "en": "Interview"
    }
  ],
  "typeLabels": {
    "site": "网站",
    "article": "文章",
    "roadmap": "路线图",
    "doc": "文档",
    "repo": "仓库",
    "book": "书",
    "course": "课程"
  },
  "lines": [
    {
      "id": "eng",
      "code": "A",
      "name": "AI 应用与工程开发",
      "en": "AI Engineering",
      "audience": "用基础模型 API 和开源权重做软件的工程师",
      "trunk": {
        "intro": [
          "ai-engineer-roadmap",
          "latent-space-ai-engineer",
          "dlai-ai-eng-skills",
          "openai-cookbook",
          "claude-platform-docs"
        ],
        "interview": [
          "alexey-ai-eng-field-guide",
          "aiml-interviews",
          "datawhale-llm-interview"
        ]
      },
      "branches": [
        {
          "id": "context",
          "code": "A1",
          "name": "大模型应用与上下文工程",
          "from": "openai-cookbook",
          "stops": {
            "intro": [
              "prompt-eng-roadmap",
              "openai-prompt-guide",
              "claude-prompt-overview",
              "dlai-chatgpt-prompt",
              "instructor"
            ],
            "adv": [
              "anthropic-context-eng",
              "lilian-weng-prompt",
              "prompt-eng-guide-zh",
              "huyenchip-llm-eng",
              "claude-prompt-best-practices"
            ],
            "build": [
              "litellm",
              "aie-book-repo",
              "eugene-yan-llm-patterns",
              "vercel-ai-sdk"
            ]
          }
        },
        {
          "id": "rag",
          "code": "A2",
          "name": "RAG 与知识检索",
          "from": "openai-cookbook",
          "stops": {
            "intro": [
              "datawhale-llm-universe",
              "chroma-docs",
              "ms-learn-rag"
            ],
            "adv": [
              "anthropic-contextual-retrieval",
              "llamaindex",
              "qdrant-docs",
              "ragas",
              "ms-ontology-playground",
              "datawhale-all-in-rag",
              "graphrag",
              "bge-flagembedding",
              "dlai-rag"
            ],
            "build": [
              "ragflow",
              "dify",
              "haystack"
            ]
          }
        },
        {
          "id": "agent",
          "code": "A3",
          "name": "Agent 编排与工具协议（MCP）",
          "from": "claude-platform-docs",
          "stops": {
            "intro": [
              "ai-agents-roadmap",
              "effective-agents",
              "datawhale-hello-agents",
              "lilian-weng-agents",
              "datawhale-agent-hub"
            ],
            "adv": [
              "mcp-docs",
              "hf-mcp-course",
              "hf-agents-course",
              "mcp-servers"
            ],
            "build": [
              "openai-agents-sdk",
              "smolagents",
              "langgraph"
            ]
          }
        },
        {
          "id": "evals",
          "code": "A4",
          "name": "应用评测与 LLMOps 基础设施",
          "from": "dlai-ai-eng-skills",
          "stops": {
            "intro": [
              "langfuse",
              "phoenix-arize",
              "openllmetry"
            ],
            "adv": [
              "hamel-evals",
              "promptfoo",
              "deepeval",
              "eugene-yan-llm-evaluators",
              "openai-evals-guide",
              "claude-evals-guide",
              "eugene-yan-evals",
              "ai-red-teaming-roadmap",
              "evidently-llm-eval"
            ],
            "build": [
              "inspect-ai",
              "owasp-llm-top10",
              "garak",
              "nemo-guardrails"
            ]
          }
        }
      ]
    },
    {
      "id": "model",
      "code": "M",
      "name": "模型与算法研发",
      "en": "Model & Algorithm R&D",
      "audience": "微调模型、做数据科学、读论文或搭建训练与推理基建的研发人员",
      "trunk": {
        "intro": [
          "ml-roadmap",
          "google-mlcc",
          "fastai-pdl",
          "huggingface-learn",
          "deeplearning-ai-courses"
        ],
        "interview": [
          "chiphuyen-ml-interviews",
          "chiphuyen-dmls-book",
          "bojie-llm-interview-200",
          "aiml-interviews",
          "datawhale-llm-interview",
          "stanford-cs336",
          "jax-scaling-book"
        ]
      },
      "branches": [
        {
          "id": "post-train",
          "code": "M1",
          "name": "深度学习与大模型微调 / 后训练",
          "from": "huggingface-learn",
          "stops": {
            "intro": [
              "pytorch-tutorials",
              "karpathy-zero-to-hero",
              "3b1b-nn",
              "zh-d2l"
            ],
            "adv": [
              "datawhale-happy-llm",
              "karpathy-nanochat",
              "hf-peft",
              "hf-llm-course",
              "illustrated-transformer",
              "cs224n",
              "transformer-explainer"
            ],
            "build": [
              "llama-factory",
              "unsloth",
              "datawhale-self-llm",
              "hf-smol-course",
              "hf-trl"
            ]
          }
        },
        {
          "id": "classic-ml",
          "code": "M2",
          "name": "经典机器学习与数据科学",
          "from": "google-mlcc",
          "stops": {
            "intro": [
              "ai-data-scientist-roadmap",
              "kaggle-learn",
              "scikit-learn-guide"
            ],
            "adv": [
              "islp-book",
              "cs229",
              "datawhale-pumpkin-book",
              "handson-ml3"
            ],
            "build": [
              "xgboost-docs",
              "lightgbm-docs",
              "shap"
            ]
          }
        },
        {
          "id": "research",
          "code": "M3",
          "name": "前沿研究与对齐理论",
          "from": "deeplearning-ai-courses",
          "stops": {
            "intro": [
              "mml-book",
              "3b1b-linear-algebra",
              "mit-ocw-1806sc"
            ],
            "adv": [
              "attention-paper",
              "cs324",
              "bluedot-impact",
              "claude-constitution",
              "awesome-llm",
              "dair-ai-papers",
              "anthropic-constitutional-ai",
              "pair-explorables",
              "aisafety-book"
            ],
            "build": [
              "transformer-circuits",
              "anthropic-tracing-thoughts",
              "transformer-lens"
            ]
          }
        },
        {
          "id": "infra",
          "code": "M4",
          "name": "训练与推理基础设施（MLOps / Infra）",
          "from": "fastai-pdl",
          "stops": {
            "intro": [
              "mlops-org",
              "google-cloud-ml",
              "mlflow",
              "wandb"
            ],
            "adv": [
              "ray",
              "deepspeed",
              "llama-cpp"
            ],
            "build": [
              "mlops-roadmap",
              "fsdl",
              "vllm",
              "sglang",
              "bentoml"
            ]
          }
        }
      ]
    },
    {
      "id": "product",
      "code": "P",
      "name": "AI 产品与设计",
      "en": "AI Product & Design",
      "audience": "定义 AI 产品边界、设计人机交互与验收质量的产品经理和设计师",
      "trunk": {
        "intro": [
          "pair-guidebook",
          "ai-for-everyone",
          "google-managing-ml-projects"
        ]
      },
      "branches": [
        {
          "id": "ai-pm",
          "code": "P1",
          "name": "AI 产品管理",
          "from": "ai-for-everyone",
          "stops": {
            "intro": [
              "gen-ai-for-everyone",
              "claude-academy",
              "openai-academy"
            ],
            "adv": [
              "svpg-ai-role",
              "applied-llms",
              "a16z-ai",
              "hamel-evals",
              "eugene-yan-evals"
            ],
            "build": [
              "eu-ai-act",
              "nist-ai-rmf",
              "nist-ai-rmf-playbook"
            ]
          }
        },
        {
          "id": "ai-ux",
          "code": "P2",
          "name": "AI 交互与体验设计",
          "from": "pair-guidebook",
          "stops": {
            "intro": [
              "pair-patterns",
              "microsoft-hax",
              "nng-ai-paradigm"
            ],
            "adv": [
              "shape-of-ai",
              "apple-hig-ml",
              "ibm-carbon-ai",
              "boba-ai"
            ],
            "build": [
              "ant-design-x-spec",
              "fluent-copilot-kits",
              "nng-ai-prototyping"
            ]
          }
        }
      ]
    },
    {
      "id": "everyone",
      "code": "E",
      "name": "普通用户",
      "en": "Everyone",
      "audience": "希望建立 AI 基础认知、守住隐私安全并用 AI 提升日常效率的非技术用户",
      "trunk": {
        "intro": [
          "elements-of-ai",
          "claude-academy",
          "openai-academy"
        ]
      },
      "branches": [
        {
          "id": "literacy",
          "code": "E1",
          "name": "AI 基础认知与安全素养",
          "from": "elements-of-ai",
          "stops": {
            "intro": [
              "ai-for-everyone",
              "gen-ai-for-everyone",
              "google-skills"
            ],
            "adv": [
              "one-useful-thing",
              "stanford-ai-index-2026",
              "oecd-ai-principles"
            ],
            "build": [
              "privacy-guides",
              "eff-ai",
              "gemini-privacy-hub"
            ]
          }
        },
        {
          "id": "workflow",
          "code": "E2",
          "name": "日常提示词与个人效率工作流",
          "from": "openai-academy",
          "stops": {
            "intro": [
              "waytoagi",
              "google-gemini-prompt-tips",
              "dlai-prompting-everyone"
            ],
            "adv": [
              "notebooklm",
              "notion-ai-help",
              "ms-copilot-prompt-gallery"
            ],
            "build": [
              "ms-copilot-help",
              "n8n-docs",
              "zapier-ai"
            ]
          }
        }
      ]
    }
  ],
  "transfers": [
    {
      "id": "dev-switch",
      "code": "T1",
      "name": "软件开发者转型速通",
      "en": "Developer Switch",
      "summary": "面向前后端与全栈工程师，直接切入路径 1 应用工程与 API/Agent 集成，无需先学数学推导和模型预训练。",
      "stops": [
        "ai-engineer-roadmap",
        "latent-space-ai-engineer",
        "dlai-ai-eng-skills",
        "openai-cookbook",
        "claude-platform-docs",
        "datawhale-llm-universe",
        "effective-agents",
        "hamel-evals"
      ]
    },
    {
      "id": "prompt-context",
      "code": "T2",
      "name": "提示词与上下文工程分层索引",
      "en": "Prompt & Context",
      "summary": "按普通用户日常表达、产品/通用平台方法、工程师系统级 Context Engineering 三层递进。",
      "stops": [
        "google-gemini-prompt-tips",
        "claude-prompt-best-practices",
        "claude-academy",
        "openai-academy",
        "dlai-prompting-everyone",
        "prompt-eng-roadmap",
        "openai-prompt-guide",
        "claude-prompt-overview",
        "prompt-eng-guide-zh",
        "anthropic-context-eng"
      ]
    },
    {
      "id": "safety",
      "code": "T3",
      "name": "AI 安全、红队与合规",
      "en": "AI Safety & Compliance",
      "summary": "串联个人隐私素养、产品治理合规、应用防注入红队与前沿模型对齐研究。",
      "stops": [
        "privacy-guides",
        "eff-ai",
        "anthropic-constitutional-ai",
        "claude-constitution",
        "nist-ai-rmf",
        "eu-ai-act",
        "ai-red-teaming-roadmap",
        "owasp-llm-top10",
        "promptfoo",
        "garak",
        "nemo-guardrails",
        "inspect-ai",
        "bluedot-impact"
      ]
    }
  ],
  "transfer_stations": [
    {
      "id": "hamel-evals",
      "short": "AI产品评测实战",
      "title": "Your AI Product Needs Evals",
      "url": "https://hamel.dev/blog/posts/evals/",
      "stage": "adv",
      "lines": [
        "eng",
        "product"
      ],
      "branches": [
        "evals",
        "ai-pm"
      ]
    },
    {
      "id": "eugene-yan-evals",
      "short": "任务评测指南",
      "title": "Task-Specific LLM Evals that Do & Don't Work",
      "url": "https://eugeneyan.com/writing/evals",
      "stage": "adv",
      "lines": [
        "eng",
        "product"
      ],
      "branches": [
        "evals",
        "ai-pm"
      ]
    },
    {
      "id": "ai-for-everyone",
      "short": "AI通识课",
      "title": "AI for Everyone - DeepLearning.AI",
      "url": "https://www.deeplearning.ai/courses/ai-for-everyone",
      "stage": "intro",
      "lines": [
        "product",
        "everyone"
      ],
      "branches": [
        "trunk",
        "literacy"
      ]
    },
    {
      "id": "gen-ai-for-everyone",
      "short": "生成式AI通识",
      "title": "Generative AI for Everyone",
      "url": "https://www.deeplearning.ai/courses/generative-ai-for-everyone",
      "stage": "intro",
      "lines": [
        "product",
        "everyone"
      ],
      "branches": [
        "ai-pm",
        "literacy"
      ]
    },
    {
      "id": "claude-academy",
      "short": "Claude学院",
      "title": "Claude Academy · Learn to work and build with Claude",
      "url": "https://academy.claude.com/",
      "stage": "intro",
      "lines": [
        "product",
        "everyone"
      ],
      "branches": [
        "ai-pm",
        "trunk"
      ]
    },
    {
      "id": "openai-academy",
      "short": "OpenAI学院",
      "title": "OpenAI Academy",
      "url": "https://academy.openai.com/",
      "stage": "intro",
      "lines": [
        "product",
        "everyone"
      ],
      "branches": [
        "ai-pm",
        "trunk"
      ]
    },
    {
      "id": "aiml-interviews",
      "short": "AIML面试指南",
      "title": "alirezadir/AIMLInterviews",
      "url": "https://github.com/alirezadir/AIMLInterviews",
      "stage": "interview",
      "lines": [
        "eng",
        "model"
      ],
      "branches": [
        "trunk"
      ]
    },
    {
      "id": "datawhale-llm-interview",
      "short": "大模型面试整理",
      "title": "LLM & VLM & Agent 面试问题总结（hello-agents Extra01）",
      "url": "https://github.com/datawhalechina/hello-agents/blob/main/Extra-Chapter/Extra01-面试问题总结.md",
      "stage": "interview",
      "lines": [
        "eng",
        "model"
      ],
      "branches": [
        "trunk"
      ]
    }
  ],
  "resources": {
    "ai-engineer-roadmap": {
      "short": "AI工程师路线图",
      "type": "roadmap",
      "title": "AI Engineer Roadmap",
      "url": "https://roadmap.sh/ai-engineer",
      "reason": "系统梳理使用预训练模型与现成工具开发产品的完整技能树，并明确区分于研究员与 ML 工程师。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [
        "dev-switch"
      ],
      "check": {
        "status": "200",
        "final_url": "https://roadmap.sh/ai-engineer",
        "checked_at": "2026-11-18"
      }
    },
    "latent-space-ai-engineer": {
      "short": "AI工程师定义",
      "type": "article",
      "title": "The Rise of the AI Engineer",
      "url": "https://latent.space/p/ai-engineer/",
      "reason": "提出应用 AI 向工程侧迁移（shift right）的行业趋势，清晰界定 AI Engineer 与 ML Engineer 的分工。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [
        "dev-switch"
      ],
      "check": {
        "status": "200",
        "final_url": "https://latent.space/p/ai-engineer/",
        "checked_at": "2026-11-18"
      }
    },
    "dlai-ai-eng-skills": {
      "short": "AI工程技能图",
      "type": "site",
      "title": "AI Engineering Skills Map",
      "url": "https://www.deeplearning.ai/resources/ai-engineering-skills",
      "reason": "基于一线岗位与工程师访谈整理的 AI 工程能力图谱，覆盖应用构建、RAG/Agent、评测与安全。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [
        "dev-switch"
      ],
      "check": {
        "status": "200",
        "final_url": "https://www.deeplearning.ai/resources/ai-engineering-skills",
        "checked_at": "2026-11-18"
      }
    },
    "openai-cookbook": {
      "short": "OpenAI实践库",
      "type": "doc",
      "title": "OpenAI Cookbook",
      "url": "https://developers.openai.com/cookbook",
      "reason": "OpenAI 官方开发者示例库，涵盖 API 调用、结构化输出、RAG、评测与 Agent 模式。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [
        "dev-switch"
      ],
      "check": {
        "status": "200",
        "final_url": "https://developers.openai.com/cookbook",
        "checked_at": "2026-11-18"
      }
    },
    "claude-platform-docs": {
      "short": "Claude开发文档",
      "type": "doc",
      "title": "Documentation - Claude Platform Docs",
      "url": "https://platform.claude.com/docs/en/home",
      "reason": "Anthropic 官方开发者文档入口，可由此进入模型 API、工具调用、上下文管理与工程最佳实践等专题。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [
        "dev-switch"
      ],
      "check": {
        "status": "200",
        "final_url": "https://platform.claude.com/docs/en/home",
        "checked_at": "2026-11-18"
      }
    },
    "prompt-eng-roadmap": {
      "short": "提示工程图",
      "type": "roadmap",
      "title": "Prompt Engineering Roadmap",
      "url": "https://roadmap.sh/prompt-engineering",
      "reason": "从基础提示、思维链与结构化输出延伸到系统级链式调用、工具与上下文工程的学习路线图。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "context"
      ],
      "transfers": [
        "prompt-context"
      ],
      "check": {
        "status": "200",
        "final_url": "https://roadmap.sh/prompt-engineering",
        "checked_at": "2026-11-18"
      }
    },
    "openai-prompt-guide": {
      "short": "OpenAI提示指南",
      "type": "doc",
      "title": "Prompt engineering | OpenAI API",
      "url": "https://developers.openai.com/api/docs/guides/prompt-engineering",
      "reason": "OpenAI 官方 API 提示工程指南，系统总结编写清晰指令、提供示例与拆解复杂任务的策略。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "context"
      ],
      "transfers": [
        "prompt-context"
      ],
      "check": {
        "status": "200",
        "final_url": "https://developers.openai.com/api/docs/guides/prompt-engineering",
        "checked_at": "2026-11-18"
      }
    },
    "claude-prompt-overview": {
      "short": "Claude提示概览",
      "type": "doc",
      "title": "Prompt engineering overview - Claude Platform Docs",
      "url": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
      "reason": "Anthropic 官方提示工程总览，说明何时该用提示工程以及如何用系统化方法迭代提示词。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "context"
      ],
      "transfers": [
        "prompt-context"
      ],
      "check": {
        "status": "200",
        "final_url": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        "checked_at": "2026-11-18"
      }
    },
    "dlai-chatgpt-prompt": {
      "short": "开发者提示工程",
      "type": "course",
      "title": "ChatGPT Prompt Engineering for Developers",
      "url": "https://www.deeplearning.ai/courses/chatgpt-prompt-eng",
      "reason": "吴恩达与 Isa Fulford 合讲的开发者提示工程入门短课，适合快速建立 API 提示编写直觉。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "context"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.deeplearning.ai/courses/chatgpt-prompt-eng",
        "checked_at": "2026-11-18"
      }
    },
    "anthropic-context-eng": {
      "short": "上下文工程指南",
      "type": "article",
      "title": "Effective context engineering for AI agents",
      "url": "https://www.anthropic.com/research/effective-context-engineering-for-ai-agents",
      "reason": "Anthropic 工程团队阐述如何把有限注意力预算当作稀缺资源，系统化策划与压缩上下文。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "context"
      ],
      "transfers": [
        "prompt-context"
      ],
      "check": {
        "status": "200",
        "final_url": "https://www.anthropic.com/research/effective-context-engineering-for-ai-agents",
        "checked_at": "2026-11-18"
      }
    },
    "lilian-weng-prompt": {
      "short": "提示工程综述",
      "type": "article",
      "title": "Prompt Engineering | Lil'Log",
      "url": "https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/",
      "reason": "Lilian Weng 于 2023 年撰写的经典综述，系统梳理 CoT、Self-Consistency 与自动提示等核心方法。",
      "era": "2023 年经典综述",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "context"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/",
        "checked_at": "2026-11-18"
      }
    },
    "prompt-eng-guide-zh": {
      "short": "提示工程中文版",
      "type": "site",
      "title": "提示工程指南 | Prompt Engineering Guide",
      "url": "https://www.promptingguide.ai/zh",
      "reason": "DAIR.AI 维护的开源提示工程指南官方中文版，覆盖基础技巧、进阶推理与常见应用模式。",
      "stage": "adv",
      "lang": "zh",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "context"
      ],
      "transfers": [
        "prompt-context"
      ],
      "check": {
        "status": "200",
        "final_url": "https://www.promptingguide.ai/zh",
        "checked_at": "2026-11-18"
      }
    },
    "instructor": {
      "short": "Instructor结构化",
      "type": "repo",
      "title": "instructor: structured outputs for llms",
      "url": "https://github.com/567-labs/instructor",
      "reason": "基于 Pydantic 的主流结构化输出开源库，提供类型校验、自动重试与多模型兼容能力。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "context"
      ],
      "transfers": [],
      "github": {
        "stars": 14120,
        "last_commit": "2026-11-15",
        "last_commit_at": "2026-11-15T02:21:50Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/567-labs/instructor",
        "checked_at": "2026-11-18"
      }
    },
    "litellm": {
      "short": "LiteLLM网关",
      "type": "repo",
      "title": "litellm: Call 100+ LLM APIs in OpenAI format",
      "url": "https://github.com/BerriAI/litellm",
      "reason": "支持统一格式调用百余种大模型 API 的开源网关与 SDK，内置路由、降级、限流与成本追踪。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "context"
      ],
      "transfers": [],
      "github": {
        "stars": 63445,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-18T01:16:41Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/BerriAI/litellm",
        "checked_at": "2026-11-18"
      }
    },
    "vercel-ai-sdk": {
      "short": "Vercel AI SDK",
      "type": "repo",
      "title": "vercel/ai: The AI Toolkit for TypeScript",
      "url": "https://github.com/vercel/ai",
      "reason": "TypeScript 全栈 AI 应用开发工具包，涵盖多模型统一接口、流式生成式 UI 与结构化输出。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "context"
      ],
      "transfers": [],
      "github": {
        "stars": 28051,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-17T23:25:08Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/vercel/ai",
        "checked_at": "2026-11-18"
      }
    },
    "aie-book-repo": {
      "short": "AI工程书配套库",
      "type": "repo",
      "title": "aie-book: Resources for AI engineering",
      "url": "https://github.com/chiphuyen/aie-book",
      "reason": "Chip Huyen《AI Engineering》一书的官方开源配套仓库，整理了各章延伸阅读与工程实践笔记。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "context"
      ],
      "transfers": [],
      "github": {
        "stars": 18328,
        "last_commit": "2026-07-03",
        "last_commit_at": "2026-07-03T07:04:59Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/chiphuyen/aie-book",
        "checked_at": "2026-11-18"
      }
    },
    "eugene-yan-llm-patterns": {
      "short": "LLM工程模式",
      "type": "article",
      "title": "Patterns for Building LLM-based Systems & Products",
      "url": "https://eugeneyan.com/writing/llm-patterns",
      "reason": "Eugene Yan 总结生产级 LLM 系统的七大模式：评测、RAG、微调、缓存、护栏、防御性体验与收集用户反馈。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "context"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://eugeneyan.com/writing/llm-patterns",
        "checked_at": "2026-11-18"
      }
    },
    "datawhale-all-in-rag": {
      "short": "Datawhale RAG",
      "type": "repo",
      "title": "all-in-rag: 大模型应用开发实战—RAG 技术全栈指南",
      "url": "https://github.com/datawhalechina/all-in-rag",
      "reason": "Datawhale 开源中文 RAG 全栈教程，覆盖文档解析、切分、向量检索到高级图谱与评估实践。",
      "stage": "adv",
      "lang": "zh",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "rag"
      ],
      "transfers": [],
      "github": {
        "stars": 13197,
        "last_commit": "2026-11-16",
        "last_commit_at": "2026-11-16T11:47:34Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/datawhalechina/all-in-rag",
        "checked_at": "2026-11-18"
      }
    },
    "datawhale-llm-universe": {
      "short": "动手学大模型应用",
      "type": "doc",
      "title": "动手学大模型应用开发 (LLM Universe)",
      "url": "https://datawhalechina.github.io/llm-universe/",
      "reason": "Datawhale 面向初学者的中文应用开发教程，手把手实现个人知识库助手与基础 RAG 流程。",
      "stage": "intro",
      "lang": "zh",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "rag"
      ],
      "transfers": [
        "dev-switch"
      ],
      "check": {
        "status": "200",
        "final_url": "https://datawhalechina.github.io/llm-universe/",
        "checked_at": "2026-11-18"
      }
    },
    "chroma-docs": {
      "short": "Chroma向量库",
      "type": "doc",
      "title": "Introduction - Chroma Docs",
      "url": "https://docs.trychroma.com/docs/overview/introduction",
      "reason": "轻量级开源向量数据库 Chroma 官方文档，适合快速上手 Embedding 存储与本地语义检索。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "rag"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://docs.trychroma.com/docs/overview/introduction",
        "checked_at": "2026-11-18"
      }
    },
    "anthropic-contextual-retrieval": {
      "short": "上下文检索",
      "type": "article",
      "title": "Contextual retrieval in AI systems",
      "url": "https://www.anthropic.com/research/contextual-retrieval",
      "reason": "Anthropic 提出 Contextual Embeddings 与 BM25 混合检索及重排方案，显著降低检索失败率。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "rag"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.anthropic.com/research/contextual-retrieval",
        "checked_at": "2026-11-18"
      }
    },
    "llamaindex": {
      "short": "LlamaIndex框架",
      "type": "repo",
      "title": "run-llama/llama_index",
      "url": "https://github.com/run-llama/llama_index",
      "reason": "主流开源数据与知识检索编排框架，提供丰富的文档连接器、索引策略与混合检索原语。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "rag"
      ],
      "transfers": [],
      "github": {
        "stars": 52930,
        "last_commit": "2026-11-14",
        "last_commit_at": "2026-11-14T02:10:23Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/run-llama/llama_index",
        "checked_at": "2026-11-18"
      }
    },
    "qdrant-docs": {
      "short": "Qdrant向量检索",
      "type": "doc",
      "title": "Documentation - Qdrant",
      "url": "https://qdrant.tech/documentation/",
      "reason": "高性能开源向量数据库 Qdrant 官方文档，详述过滤检索、混合向量与生产级索引调优。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "rag"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://qdrant.tech/documentation/",
        "checked_at": "2026-11-18"
      }
    },
    "ragas": {
      "short": "Ragas检索评测",
      "type": "repo",
      "title": "ragas: Supercharge Your LLM Application Evaluations",
      "url": "https://github.com/vibrantlabsai/ragas",
      "reason": "专注 RAG 与 LLM 应用的开源评测框架，提供上下文召回率、忠实度与答案相关性指标。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "rag"
      ],
      "transfers": [],
      "github": {
        "stars": 16358,
        "last_commit": "2026-11-14",
        "last_commit_at": "2026-11-14T02:30:59Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/vibrantlabsai/ragas",
        "checked_at": "2026-11-18"
      }
    },
    "ragflow": {
      "short": "RAGFlow引擎",
      "type": "repo",
      "title": "ragflow: Agent-native RAG engine",
      "url": "https://github.com/infiniflow/ragflow",
      "reason": "开源企业级 RAG 引擎，强调深度文档版面理解、精确引用溯源与多租户知识库隔离。",
      "stage": "build",
      "lang": "zh-en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "rag"
      ],
      "transfers": [],
      "github": {
        "stars": 94332,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-17T16:22:59Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/infiniflow/ragflow",
        "checked_at": "2026-11-18"
      }
    },
    "dify": {
      "short": "Dify应用平台",
      "type": "repo",
      "title": "dify: Build Agentic workflows, RAG pipelines",
      "url": "https://github.com/langgenius/dify",
      "reason": "高星开源 LLM 应用开发平台，支持可视化编排知识库检索管道、权限管理与生产 API 发布。",
      "stage": "build",
      "lang": "zh-en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "rag"
      ],
      "transfers": [],
      "github": {
        "stars": 161379,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-17T16:49:43Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/langgenius/dify",
        "checked_at": "2026-11-18"
      }
    },
    "graphrag": {
      "short": "GraphRAG",
      "type": "repo",
      "title": "microsoft/graphrag: Modular graph-based RAG",
      "url": "https://github.com/microsoft/graphrag",
      "reason": "微软开源的图谱增强检索系统，通过实体关系抽取与社区摘要解决全局跨文档推理难题。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "rag"
      ],
      "transfers": [],
      "github": {
        "stars": 36678,
        "last_commit": "2026-11-02",
        "last_commit_at": "2026-11-02T05:40:54Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/microsoft/graphrag",
        "checked_at": "2026-11-18"
      }
    },
    "bge-flagembedding": {
      "short": "智源BGE检索",
      "type": "repo",
      "title": "FlagEmbedding: Retrieval and Retrieval-augmented LLMs",
      "url": "https://github.com/FlagOpen/FlagEmbedding",
      "reason": "智源研究院开源的 BGE 系列中英双语向量模型与重排模型（Reranker）官方仓库。",
      "stage": "adv",
      "lang": "zh-en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "rag"
      ],
      "transfers": [],
      "github": {
        "stars": 12338,
        "last_commit": "2026-10-27",
        "last_commit_at": "2026-10-27T09:47:45Z",
        "default_branch": "master"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/FlagOpen/FlagEmbedding",
        "checked_at": "2026-11-18"
      }
    },
    "ai-agents-roadmap": {
      "short": "AI Agent路线图",
      "type": "roadmap",
      "title": "AI Agents Roadmap",
      "url": "https://roadmap.sh/ai-agents",
      "reason": "系统拆解 Agent Loop（感知、推理、工具调用、观察）、记忆与多智能体协作的路线图。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "agent"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://roadmap.sh/ai-agents",
        "checked_at": "2026-11-18"
      }
    },
    "effective-agents": {
      "short": "构建高效Agent",
      "type": "article",
      "title": "Building effective AI agents",
      "url": "https://www.anthropic.com/research/building-effective-agents",
      "reason": "Anthropic 工程指南，清晰区分可组合工作流与自主 Agent，主张优先采用最简可靠方案。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "agent"
      ],
      "transfers": [
        "dev-switch"
      ],
      "check": {
        "status": "200",
        "final_url": "https://www.anthropic.com/research/building-effective-agents",
        "checked_at": "2026-11-18"
      }
    },
    "datawhale-hello-agents": {
      "short": "Hello-Agents",
      "type": "repo",
      "title": "hello-agents: 《从零开始构建智能体》",
      "url": "https://github.com/datawhalechina/hello-agents",
      "reason": "Datawhale 开源中文智能体原理与实践教程，从零实现工具调用、记忆机制与典型 Agent 模式。",
      "stage": "intro",
      "lang": "zh",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "agent"
      ],
      "transfers": [],
      "github": {
        "stars": 87242,
        "last_commit": "2026-11-13",
        "last_commit_at": "2026-11-13T12:20:01Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/datawhalechina/hello-agents",
        "checked_at": "2026-11-18"
      }
    },
    "lilian-weng-agents": {
      "short": "自主Agent综述",
      "type": "article",
      "title": "LLM Powered Autonomous Agents | Lil'Log",
      "url": "https://lilianweng.github.io/posts/2023-06-23-agent/",
      "reason": "Lilian Weng 2023 年经典长文，将 Agent 架构凝练为规划、记忆与工具使用三大核心模块。",
      "era": "2023 年经典长文",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "agent"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://lilianweng.github.io/posts/2023-06-23-agent/",
        "checked_at": "2026-11-18"
      }
    },
    "mcp-docs": {
      "short": "MCP官方文档",
      "type": "doc",
      "title": "What is the Model Context Protocol (MCP)?",
      "url": "https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro",
      "reason": "Model Context Protocol 官方规范与入门文档，定义模型连接外部工具与数据源的标准协议。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "agent"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro",
        "checked_at": "2026-11-18",
        "flag": "first_curl_tls_error_retry_200"
      }
    },
    "hf-mcp-course": {
      "short": "HF MCP课程",
      "type": "course",
      "title": "Hugging Face MCP Course",
      "url": "https://huggingface.co/learn/mcp-course/en/unit0/introduction",
      "reason": "Hugging Face 与 Anthropic 合作推出的免费 MCP 课程，手把手构建 MCP Server 与 Client。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "agent"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://huggingface.co/learn/mcp-course/en/unit0/introduction",
        "checked_at": "2026-11-18"
      }
    },
    "hf-agents-course": {
      "short": "HF Agents课程",
      "type": "course",
      "title": "Welcome to the AI Agents Course",
      "url": "https://huggingface.co/learn/agents-course/unit0/introduction",
      "reason": "Hugging Face 官方免费 AI Agents 课程，涵盖工具调用、框架实战与 Agent 评测。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "agent"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://huggingface.co/learn/agents-course/unit0/introduction",
        "checked_at": "2026-11-18"
      }
    },
    "langgraph": {
      "short": "LangGraph编排",
      "type": "repo",
      "title": "langgraph: Build resilient language agents as graphs",
      "url": "https://github.com/langchain-ai/langgraph",
      "reason": "基于有向循环图的状态化 Agent 编排框架，原生支持持久化记忆、人机审批断点与流式控制。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "agent"
      ],
      "transfers": [],
      "github": {
        "stars": 45081,
        "last_commit": "2026-11-16",
        "last_commit_at": "2026-11-16T08:59:08Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/langchain-ai/langgraph",
        "checked_at": "2026-11-18"
      }
    },
    "datawhale-agent-hub": {
      "short": "Agent学习路线",
      "type": "repo",
      "title": "Agent-Learning-Hub: AI Agent 学习路线与资料库",
      "url": "https://github.com/datawhalechina/Agent-Learning-Hub",
      "reason": "Datawhale 维护的中文 Agent 学习枢纽，系统覆盖循环、记忆、Harness、MCP、评测与安全。",
      "stage": "intro",
      "lang": "zh",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "agent"
      ],
      "transfers": [],
      "github": {
        "stars": 9449,
        "last_commit": "2026-07-19",
        "last_commit_at": "2026-07-19T12:59:49Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/datawhalechina/Agent-Learning-Hub",
        "checked_at": "2026-11-18"
      }
    },
    "openai-agents-sdk": {
      "short": "OpenAI Agent SDK",
      "type": "repo",
      "title": "openai-agents-python",
      "url": "https://github.com/openai/openai-agents-python",
      "reason": "OpenAI 官方轻量级多智能体编排 SDK，提供 Handoffs 交接、护栏与全链路 Tracing。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "agent"
      ],
      "transfers": [],
      "github": {
        "stars": 30742,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-18T00:49:23Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/openai/openai-agents-python",
        "checked_at": "2026-11-18"
      }
    },
    "mcp-servers": {
      "short": "MCP参考服务库",
      "type": "repo",
      "title": "modelcontextprotocol/servers",
      "url": "https://github.com/modelcontextprotocol/servers",
      "reason": "MCP 官方参考服务器仓库，目前仍在维护的实现包括 Everything、Fetch、Filesystem、Git、Memory、Sequential Thinking 与 Time；数据库等部分实现已归档到 servers-archived。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "agent"
      ],
      "transfers": [],
      "github": {
        "stars": 92074,
        "last_commit": "2026-11-11",
        "last_commit_at": "2026-11-11T06:50:30Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/modelcontextprotocol/servers",
        "checked_at": "2026-11-18"
      }
    },
    "smolagents": {
      "short": "smolagents",
      "type": "repo",
      "title": "huggingface/smolagents",
      "url": "https://github.com/huggingface/smolagents",
      "reason": "Hugging Face 极简代码 Agent 框架，以安全沙箱执行 Python 代码动作替代复杂 JSON 调度。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "agent"
      ],
      "transfers": [],
      "github": {
        "stars": 30417,
        "last_commit": "2026-11-17",
        "last_commit_at": "2026-11-17T09:55:03Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/huggingface/smolagents",
        "checked_at": "2026-11-18"
      }
    },
    "openai-evals-guide": {
      "short": "OpenAI Datasets入门",
      "type": "doc",
      "title": "Getting started with datasets | OpenAI API",
      "url": "https://developers.openai.com/api/docs/guides/evaluation-getting-started",
      "reason": "OpenAI 官方评测入门，介绍如何用 Datasets 建立评测集、配置评分器并做回归迭代。原托管 Evals 平台已进入关停窗口，本页是现行入口。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "evals"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://developers.openai.com/api/docs/guides/evaluation-getting-started",
        "checked_at": "2026-11-18"
      }
    },
    "claude-evals-guide": {
      "short": "Claude评测指南",
      "type": "doc",
      "title": "Define success criteria and build evaluations",
      "url": "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests",
      "reason": "Anthropic 官方评测文档，介绍如何定义可量化成功标准并设计自动化测试用例。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "evals"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests",
        "checked_at": "2026-11-18"
      }
    },
    "langfuse": {
      "short": "Langfuse可观测",
      "type": "repo",
      "title": "langfuse: Open source AI engineering platform",
      "url": "https://github.com/langfuse/langfuse",
      "reason": "基于 OpenTelemetry 的开源 LLM 可观测性与评测平台，提供链路追踪、延迟成本分析与 Prompt 管理。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "evals"
      ],
      "transfers": [],
      "github": {
        "stars": 37562,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-17T20:44:30Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/langfuse/langfuse",
        "checked_at": "2026-11-18"
      }
    },
    "phoenix-arize": {
      "short": "Arize Phoenix",
      "type": "repo",
      "title": "Arize-ai/phoenix: AI Observability & Evaluation",
      "url": "https://github.com/Arize-ai/phoenix",
      "reason": "开源 AI 可观测性与评测工具，支持本地与生产环境的 Trace 调试、Embedding 漂移与评测。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "evals"
      ],
      "transfers": [],
      "github": {
        "stars": 12333,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-17T22:51:11Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/Arize-ai/phoenix",
        "checked_at": "2026-11-18"
      }
    },
    "hamel-evals": {
      "short": "AI产品评测实战",
      "type": "article",
      "title": "Your AI Product Needs Evals",
      "url": "https://hamel.dev/blog/posts/evals/",
      "reason": "Hamel Husain 结合真实案例阐述为何应用团队必须自建领域评测集与错误分析闭环。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng",
        "product"
      ],
      "branches": [
        "evals",
        "ai-pm"
      ],
      "transfers": [
        "dev-switch"
      ],
      "check": {
        "status": "200",
        "final_url": "https://hamel.dev/blog/posts/evals/",
        "checked_at": "2026-11-18"
      }
    },
    "promptfoo": {
      "short": "Promptfoo评测",
      "type": "repo",
      "title": "promptfoo: Test your prompts, agents, and RAGs",
      "url": "https://github.com/promptfoo/promptfoo",
      "reason": "主流开源声明式 LLM 测试与红队扫描工具，可集成 CI/CD 对比多模型与防注入测试。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "evals"
      ],
      "transfers": [
        "safety"
      ],
      "github": {
        "stars": 27393,
        "last_commit": "2026-11-17",
        "last_commit_at": "2026-11-17T00:21:31Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/promptfoo/promptfoo",
        "checked_at": "2026-11-18"
      }
    },
    "deepeval": {
      "short": "DeepEval框架",
      "type": "repo",
      "title": "deepeval: The LLM Evaluation Framework",
      "url": "https://github.com/confident-ai/deepeval",
      "reason": "类似 Pytest 的开源 LLM 单元测试框架，内置幻觉、忠实度与 LLM-as-a-Judge 评测指标。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "evals"
      ],
      "transfers": [],
      "github": {
        "stars": 19532,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-17T23:12:25Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/confident-ai/deepeval",
        "checked_at": "2026-11-18"
      }
    },
    "eugene-yan-llm-evaluators": {
      "short": "LLM裁判综述",
      "type": "article",
      "title": "Evaluating the Effectiveness of LLM-Evaluators",
      "url": "https://eugeneyan.com/writing/llm-evaluators",
      "reason": "Eugene Yan 深入剖析 LLM-as-a-Judge 的对齐方法、偏差来源、微调裁判与工程反模式。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "evals"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://eugeneyan.com/writing/llm-evaluators",
        "checked_at": "2026-11-18"
      }
    },
    "eugene-yan-evals": {
      "short": "任务评测指南",
      "type": "article",
      "title": "Task-Specific LLM Evals that Do & Don't Work",
      "url": "https://eugeneyan.com/writing/evals",
      "reason": "Eugene Yan 总结业务导向的任务级 Evals 验收标准，帮助工程与产品团队对齐质量基线。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng",
        "product"
      ],
      "branches": [
        "evals",
        "ai-pm"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://eugeneyan.com/writing/evals",
        "checked_at": "2026-11-18"
      }
    },
    "inspect-ai": {
      "short": "Inspect评测框架",
      "type": "repo",
      "title": "UKGovernmentBEIS/inspect_ai",
      "url": "https://github.com/UKGovernmentBEIS/inspect_ai",
      "reason": "英国 AI 安全研究所（AISI）开源的大模型评测框架，广泛用于安全、Agent 与能力基准测试。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "evals"
      ],
      "transfers": [
        "safety"
      ],
      "github": {
        "stars": 3281,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-17T22:03:51Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/UKGovernmentBEIS/inspect_ai",
        "checked_at": "2026-11-18"
      }
    },
    "ai-red-teaming-roadmap": {
      "short": "AI红队路线图",
      "type": "roadmap",
      "title": "AI Red Teaming Roadmap",
      "url": "https://roadmap.sh/ai-red-teaming",
      "reason": "系统梳理 AI 威胁建模、Prompt Injection、越狱攻击、模型漏洞与防御策略的路线图。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "evals"
      ],
      "transfers": [
        "safety"
      ],
      "check": {
        "status": "200",
        "final_url": "https://roadmap.sh/ai-red-teaming",
        "checked_at": "2026-11-18"
      }
    },
    "owasp-llm-top10": {
      "short": "OWASP LLM风险2026",
      "type": "doc",
      "title": "OWASP GenAI LLM Top 10 2026",
      "url": "https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/",
      "reason": "OWASP 2026 年版生成式 AI 与大模型应用十大安全风险，涵盖提示注入、越权与数据泄露。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "evals"
      ],
      "transfers": [
        "safety"
      ],
      "check": {
        "status": "200",
        "final_url": "https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/",
        "checked_at": "2026-11-18"
      }
    },
    "garak": {
      "short": "Garak漏洞扫描",
      "type": "repo",
      "title": "NVIDIA/garak: the LLM vulnerability scanner",
      "url": "https://github.com/NVIDIA/garak",
      "reason": "NVIDIA 开源的大模型安全漏洞扫描器，自动化检测提示注入、越狱与有害输出风险。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "evals"
      ],
      "transfers": [
        "safety"
      ],
      "github": {
        "stars": 10066,
        "last_commit": "2026-11-07",
        "last_commit_at": "2026-11-06T23:26:28Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/NVIDIA/garak",
        "checked_at": "2026-11-18"
      }
    },
    "nemo-guardrails": {
      "short": "NeMo Guardrails",
      "type": "repo",
      "title": "NVIDIA-NeMo/Guardrails",
      "url": "https://github.com/NVIDIA-NeMo/Guardrails",
      "reason": "NVIDIA 开源的可编程对话护栏工具包，为生产级 LLM 应用提供输入输出合规与防越界约束。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "evals"
      ],
      "transfers": [
        "safety"
      ],
      "github": {
        "stars": 7521,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-17T22:55:57Z",
        "default_branch": "develop"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/NVIDIA-NeMo/Guardrails",
        "checked_at": "2026-11-18"
      }
    },
    "ml-roadmap": {
      "short": "机器学习路线图",
      "type": "roadmap",
      "title": "Machine Learning Roadmap",
      "url": "https://roadmap.sh/machine-learning",
      "reason": "面向机器学习工程师的完整路线图，涵盖数学基础、数据处理、经典算法与深度学习。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://roadmap.sh/machine-learning",
        "checked_at": "2026-11-18"
      }
    },
    "google-mlcc": {
      "short": "Google ML速成",
      "type": "course",
      "title": "Machine Learning Crash Course | Google",
      "url": "https://developers.google.com/machine-learning/crash-course",
      "reason": "Google 面向工程人员与学生的免费机器学习速成课，直觉与交互可视化并重。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://developers.google.com/machine-learning/crash-course",
        "checked_at": "2026-11-18"
      }
    },
    "fastai-pdl": {
      "short": "fast.ai实战",
      "type": "course",
      "title": "Practical Deep Learning for Coders",
      "url": "https://course.fast.ai/",
      "reason": "面向有编程基础学习者的经典课程，采用自上而下教学法：先跑通模型，再下钻原理。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://course.fast.ai/",
        "checked_at": "2026-11-18"
      }
    },
    "huggingface-learn": {
      "short": "HF学习中心",
      "type": "site",
      "title": "Hugging Face Learn",
      "url": "https://huggingface.co/learn",
      "reason": "Hugging Face 官方免费课程体系入口，涵盖 LLM、后训练、强化学习与计算机视觉等专题。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://huggingface.co/learn",
        "checked_at": "2026-11-18"
      }
    },
    "deeplearning-ai-courses": {
      "short": "DL.AI课程库",
      "type": "site",
      "title": "DeepLearning.AI Courses",
      "url": "https://www.deeplearning.ai/courses",
      "reason": "吴恩达创办的权威 AI 课程目录，提供从微调、深度学习专项到工程实践的系统课程。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.deeplearning.ai/courses",
        "checked_at": "2026-11-18"
      }
    },
    "pytorch-tutorials": {
      "short": "PyTorch官方教程",
      "type": "doc",
      "title": "Welcome to PyTorch Tutorials",
      "url": "https://docs.pytorch.org/tutorials/",
      "reason": "PyTorch 官方教程中心，从张量基础与自动微分到神经网络训练与模型微调的标准起点。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://docs.pytorch.org/tutorials/",
        "checked_at": "2026-11-18"
      }
    },
    "karpathy-zero-to-hero": {
      "short": "Zero To Hero",
      "type": "course",
      "title": "Neural Networks: Zero To Hero",
      "url": "https://karpathy.ai/zero-to-hero.html",
      "reason": "Andrej Karpathy 亲授系列课程，从零手写反向传播、分词器直到完整 GPT 训练实现。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://karpathy.ai/zero-to-hero.html",
        "checked_at": "2026-11-18"
      }
    },
    "hf-llm-course": {
      "short": "HF大模型课程",
      "type": "course",
      "title": "Hugging Face LLM Course",
      "url": "https://huggingface.co/learn/llm-course/chapter1/1",
      "reason": "Hugging Face 官方开源大模型课程，系统讲解 Transformer、Transformers 库使用与微调。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://huggingface.co/learn/llm-course/chapter1/1",
        "checked_at": "2026-11-18"
      }
    },
    "datawhale-happy-llm": {
      "short": "Happy-LLM",
      "type": "repo",
      "title": "happy-llm: 📚 从零开始构建大模型",
      "url": "https://github.com/datawhalechina/happy-llm",
      "reason": "Datawhale 开源中文《从零开始构建大模型》教程，涵盖 Transformer 实现、预训练与微调。",
      "stage": "adv",
      "lang": "zh",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "github": {
        "stars": 34979,
        "last_commit": "2026-08-09",
        "last_commit_at": "2026-08-08T17:17:26Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/datawhalechina/happy-llm",
        "checked_at": "2026-11-18"
      }
    },
    "hf-peft": {
      "short": "PEFT参数微调",
      "type": "repo",
      "title": "huggingface/peft",
      "url": "https://github.com/huggingface/peft",
      "reason": "Hugging Face 官方高效参数微调库，支持 LoRA、QLoRA 等主流低成本大模型微调方法。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "github": {
        "stars": 21904,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-17T17:25:27Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/huggingface/peft",
        "checked_at": "2026-11-18"
      }
    },
    "hf-trl": {
      "short": "TRL后训练库",
      "type": "repo",
      "title": "huggingface/trl: Train transformer language models",
      "url": "https://github.com/huggingface/trl",
      "reason": "Hugging Face 官方后训练开源库，稳定 Trainer 支持 SFT、DPO、GRPO、KTO、RLOO 等方法；PPO 目前仅在实验模块中。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "github": {
        "stars": 19757,
        "last_commit": "2026-11-17",
        "last_commit_at": "2026-11-17T14:57:36Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/huggingface/trl",
        "checked_at": "2026-11-18"
      }
    },
    "llama-factory": {
      "short": "LLaMA-Factory",
      "type": "repo",
      "title": "hiyouga/LlamaFactory",
      "url": "https://github.com/hiyouga/LlamaFactory",
      "reason": "高星开源大模型零代码/低代码微调框架，集成主流国产与开源基座模型的 SFT 与 DPO 流程。",
      "stage": "build",
      "lang": "zh-en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "github": {
        "stars": 76093,
        "last_commit": "2026-11-17",
        "last_commit_at": "2026-11-17T04:25:41Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/hiyouga/LlamaFactory",
        "checked_at": "2026-11-18"
      }
    },
    "unsloth": {
      "short": "Unsloth高效微调",
      "type": "repo",
      "title": "unslothai/unsloth",
      "url": "https://github.com/unslothai/unsloth",
      "reason": "针对消费级与单卡 GPU 优化的高速微调框架，大幅降低显存占用并加速 LoRA 与强化学习微调。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "github": {
        "stars": 79708,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-18T01:25:31Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/unslothai/unsloth",
        "checked_at": "2026-11-18"
      }
    },
    "datawhale-self-llm": {
      "short": "开源大模型指南",
      "type": "repo",
      "title": "self-llm: 《开源大模型食用指南》",
      "url": "https://github.com/datawhalechina/self-llm",
      "reason": "Datawhale 面向中文环境的开源大模型部署与 LoRA 微调实战教程，覆盖 Qwen 等主流模型。",
      "stage": "build",
      "lang": "zh",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "github": {
        "stars": 32813,
        "last_commit": "2026-11-17",
        "last_commit_at": "2026-11-17T10:52:53Z",
        "default_branch": "master"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/datawhalechina/self-llm",
        "checked_at": "2026-11-18"
      }
    },
    "hf-smol-course": {
      "short": "HF后训练实践",
      "type": "repo",
      "title": "huggingface/smol-course",
      "url": "https://github.com/huggingface/smol-course",
      "reason": "Hugging Face 的小模型实践课程（v2），覆盖指令微调、评测、偏好对齐、视觉语言模型、强化学习和合成数据。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "github": {
        "stars": 6794,
        "last_commit": "2026-10-06",
        "last_commit_at": "2026-10-06T09:38:49Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/huggingface/smol-course",
        "checked_at": "2026-11-18"
      }
    },
    "ai-data-scientist-roadmap": {
      "short": "数据科学路线图",
      "type": "roadmap",
      "title": "AI and Data Scientist Roadmap",
      "url": "https://roadmap.sh/ai-data-scientist",
      "reason": "覆盖统计、数据处理、经典机器学习与数据分析部署的完整数据科学学习路线图。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "classic-ml"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://roadmap.sh/ai-data-scientist",
        "checked_at": "2026-11-18"
      }
    },
    "kaggle-learn": {
      "short": "Kaggle免费课",
      "type": "course",
      "title": "Kaggle Learn",
      "url": "https://www.kaggle.com/learn",
      "reason": "Kaggle 官方免费互动微课程，涵盖 Pandas、数据可视化、特征工程与机器学习快速入门。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "classic-ml"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.kaggle.com/learn",
        "checked_at": "2026-11-18"
      }
    },
    "scikit-learn-guide": {
      "short": "scikit-learn文档",
      "type": "doc",
      "title": "User Guide — scikit-learn",
      "url": "https://scikit-learn.org/stable/user_guide.html",
      "reason": "经典机器学习权威库 scikit-learn 官方用户指南，涵盖回归、分类、聚类与交叉验证。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "classic-ml"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://scikit-learn.org/stable/user_guide.html",
        "checked_at": "2026-11-18"
      }
    },
    "islp-book": {
      "short": "统计学习导论",
      "type": "book",
      "title": "An Introduction to Statistical Learning",
      "url": "https://www.statlearning.com/",
      "reason": "统计学习经典教材（Python 版官方免费下载），深入浅出讲解回归、重采样、树模型与正则化。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "classic-ml"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.statlearning.com/",
        "checked_at": "2026-11-18"
      }
    },
    "cs229": {
      "short": "Stanford CS229",
      "type": "doc",
      "title": "CS229 Machine Learning Lecture Notes",
      "url": "https://cs229.stanford.edu/main_notes.pdf",
      "reason": "斯坦福 CS229 经典讲义 PDF，公开可下载，偏重数学推导与统计理论，适合打牢监督与无监督学习基础。当前课程门户需校内账号，故改链讲义本身。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "classic-ml"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://cs229.stanford.edu/main_notes.pdf",
        "checked_at": "2026-11-18"
      }
    },
    "datawhale-pumpkin-book": {
      "short": "西瓜书南瓜书",
      "type": "repo",
      "title": "datawhalechina/pumpkin-book",
      "url": "https://github.com/datawhalechina/pumpkin-book",
      "reason": "周志华《机器学习》（西瓜书）公式推导与细节解析开源中文指南，扫除数学推导障碍。",
      "stage": "adv",
      "lang": "zh",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "classic-ml"
      ],
      "transfers": [],
      "github": {
        "stars": 26170,
        "last_commit": "2026-01-21",
        "last_commit_at": "2026-01-21T12:59:15Z",
        "default_branch": "master"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/datawhalechina/pumpkin-book",
        "checked_at": "2026-11-18"
      }
    },
    "handson-ml3": {
      "short": "机器学习实战代码",
      "type": "repo",
      "title": "ageron/handson-ml3",
      "url": "https://github.com/ageron/handson-ml3",
      "reason": "Aurélien Géron《Hands-On Machine Learning》第 3 版的官方配套仓库（仓库免费，书籍本身需购买），含全书示例代码。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "classic-ml"
      ],
      "transfers": [],
      "github": {
        "stars": 14502,
        "last_commit": "2026-10-06",
        "last_commit_at": "2026-10-06T05:26:20Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/ageron/handson-ml3",
        "checked_at": "2026-11-18"
      }
    },
    "xgboost-docs": {
      "short": "XGBoost文档",
      "type": "doc",
      "title": "XGBoost Documentation",
      "url": "https://xgboost.readthedocs.io/en/stable/",
      "reason": "表格预测竞赛与工业界首选梯度提升树框架 XGBoost 官方文档，含调参指南与分布式训练。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "classic-ml"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://xgboost.readthedocs.io/en/stable/",
        "checked_at": "2026-11-18"
      }
    },
    "lightgbm-docs": {
      "short": "LightGBM文档",
      "type": "doc",
      "title": "Welcome to LightGBM's documentation",
      "url": "https://lightgbm.readthedocs.io/en/stable/",
      "reason": "微软开源的高效梯度提升框架 LightGBM 官方文档，适合大规模高维表格特征建模。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "classic-ml"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://lightgbm.readthedocs.io/en/stable/",
        "checked_at": "2026-11-18"
      }
    },
    "shap": {
      "short": "SHAP可解释性",
      "type": "repo",
      "title": "shap/shap: Explain the output of any ML model",
      "url": "https://github.com/shap/shap",
      "reason": "基于博弈论 Shapley 值的模型可解释性主流开源库，用于业务指标归因与特征重要性分析。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "classic-ml"
      ],
      "transfers": [],
      "github": {
        "stars": 25866,
        "last_commit": "2026-11-14",
        "last_commit_at": "2026-11-14T09:09:25Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/shap/shap",
        "checked_at": "2026-11-18"
      }
    },
    "mml-book": {
      "short": "ML数学基础书",
      "type": "book",
      "title": "Mathematics for Machine Learning",
      "url": "https://mml-book.github.io/",
      "reason": "剑桥大学出版社 2020 年出版的机器学习数学教材，官方提供免费 PDF，系统补齐线性代数、矩阵微积分与概率优化基础。版权仍归作者与出版社，并非开源许可。",
      "era": "2020 年出版",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "research"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://mml-book.github.io/",
        "checked_at": "2026-11-18"
      }
    },
    "3b1b-nn": {
      "short": "3B1B神经网络",
      "type": "course",
      "title": "But what is a Neural Network? | 3Blue1Brown",
      "url": "https://www.3blue1brown.com/lessons/neural-networks/",
      "reason": "Grant Sanderson 官方神经网络系列入口（第 1 课）。以几何与动画讲解网络、反向传播，后续课时覆盖 Transformer 与注意力机制。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.3blue1brown.com/lessons/neural-networks/",
        "checked_at": "2026-11-18"
      }
    },
    "zh-d2l": {
      "short": "动手学深度学习",
      "type": "book",
      "title": "《动手学深度学习》",
      "url": "https://zh.d2l.ai/",
      "reason": "李沐等人的开源教材中文版，公式、讲解和可运行代码并排。英文版在 d2l.ai。",
      "stage": "intro",
      "lang": "zh",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://zh.d2l.ai/",
        "checked_at": "2026-11-18"
      }
    },
    "awesome-llm": {
      "short": "Awesome-LLM索引",
      "type": "repo",
      "title": "Hannibal046/Awesome-LLM",
      "url": "https://github.com/Hannibal046/Awesome-LLM",
      "reason": "截至 2025 年的 LLM 论文与开源资料历史里程碑索引。仓库最近提交在 2025 年 7 月，追踪最新论文请用清单里的每周精选。",
      "era": "截至 2025 年的历史索引",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "research"
      ],
      "transfers": [],
      "github": {
        "stars": 27504,
        "last_commit": "2025-07-31",
        "last_commit_at": "2025-07-31T02:38:24Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/Hannibal046/Awesome-LLM",
        "checked_at": "2026-11-18",
        "flag": "last_commit_2025_07"
      }
    },
    "attention-paper": {
      "short": "Attention原论文",
      "type": "article",
      "title": "Attention Is All You Need (arXiv:1706.03762)",
      "url": "https://arxiv.org/abs/1706.03762",
      "reason": "2017 年提出 Transformer 架构的奠基论文，至今仍是精读自注意力机制与位置编码的必看原典。",
      "era": "2017 年奠基论文",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "research"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://arxiv.org/abs/1706.03762",
        "checked_at": "2026-11-18"
      }
    },
    "illustrated-transformer": {
      "short": "图解Transformer",
      "type": "article",
      "title": "The Illustrated Transformer",
      "url": "https://jalammar.github.io/illustrated-transformer/",
      "reason": "Jay Alammar 2018 年经典图解长文，至今仍是最清晰直观理解编码器、解码器与多头注意力的入门读物。",
      "era": "2018 年经典图解长文",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://jalammar.github.io/illustrated-transformer/",
        "checked_at": "2026-11-18"
      }
    },
    "cs224n": {
      "short": "Stanford CS224N",
      "type": "course",
      "title": "Stanford CS 224N | NLP with Deep Learning",
      "url": "https://web.stanford.edu/class/cs224n/",
      "reason": "斯坦福 NLP 与深度学习权威公开课，涵盖预训练语言模型、指令微调与前沿研究课题。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://web.stanford.edu/class/cs224n/",
        "checked_at": "2026-11-18"
      }
    },
    "cs324": {
      "short": "Stanford CS324",
      "type": "course",
      "title": "CS324 - Large Language Models (Winter 2022)",
      "url": "https://stanford-cs324.github.io/winter2022/",
      "reason": "斯坦福 2022 年冬季 LLM 专题公开课存档站点，其关于模型能力、Scaling Laws 与对齐的讲义仍具参考价值。",
      "era": "2022 年冬季存档",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "research"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://stanford-cs324.github.io/winter2022/",
        "checked_at": "2026-11-18"
      }
    },
    "transformer-circuits": {
      "short": "机制可解释性",
      "type": "site",
      "title": "Transformer Circuits Thread",
      "url": "https://transformer-circuits.pub/",
      "reason": "Anthropic 可解释性研究团队论文专栏，深入探索语言模型内部电路、叠加态与稀疏自编码器。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "research"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://transformer-circuits.pub/",
        "checked_at": "2026-11-18"
      }
    },
    "anthropic-tracing-thoughts": {
      "short": "追踪模型思维",
      "type": "article",
      "title": "Tracing the thoughts of a large language model",
      "url": "https://www.anthropic.com/research/tracing-thoughts-language-model",
      "reason": "Anthropic 2025 年机制可解释性前沿研究，展示如何通过归因图追踪大语言模型内部推理路径。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "research"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.anthropic.com/research/tracing-thoughts-language-model",
        "checked_at": "2026-11-18"
      }
    },
    "dair-ai-papers": {
      "short": "每周AI论文精选",
      "type": "repo",
      "title": "dair-ai/AI-Papers-of-the-Week",
      "url": "https://github.com/dair-ai/AI-Papers-of-the-Week",
      "reason": "DAIR.AI 持续维护的每周精选 AI 与大模型前沿论文清单，适合保持科研阅读节奏。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "research"
      ],
      "transfers": [],
      "github": {
        "stars": 13346,
        "last_commit": "2026-11-16",
        "last_commit_at": "2026-11-16T06:00:48Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/dair-ai/AI-Papers-of-the-Week",
        "checked_at": "2026-11-18"
      }
    },
    "bluedot-impact": {
      "short": "BlueDot技术对齐课",
      "type": "course",
      "title": "Technical AI Safety Course | BlueDot Impact",
      "url": "https://bluedot.org/courses/technical-ai-safety",
      "reason": "BlueDot Impact 的免费 Technical AI Safety 队列课（约 30 小时），系统介绍对齐问题地图与技术安全路径。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "research"
      ],
      "transfers": [
        "safety"
      ],
      "check": {
        "status": "200",
        "final_url": "https://bluedot.org/courses/technical-ai-safety",
        "checked_at": "2026-11-18"
      }
    },
    "mlops-org": {
      "short": "MLOps原则指南",
      "type": "site",
      "title": "ML Ops: Machine Learning Operations",
      "url": "https://ml-ops.org/",
      "reason": "系统阐述 MLOps 核心原则、流水线架构与模型生命周期管理的开放参考站点。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "infra"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://ml-ops.org/",
        "checked_at": "2026-11-18"
      }
    },
    "google-cloud-ml": {
      "short": "Google云MLOps指南",
      "type": "doc",
      "title": "MLOps: Continuous delivery and automation pipelines in machine learning",
      "url": "https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning",
      "reason": "Google Cloud 官方 MLOps 架构指南，讲解机器学习系统的持续交付与自动化训练、验证和部署流水线。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "infra"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning",
        "checked_at": "2026-11-18"
      }
    },
    "mlflow": {
      "short": "MLflow实验追踪",
      "type": "repo",
      "title": "mlflow/mlflow: Open source AI engineering platform",
      "url": "https://github.com/mlflow/mlflow",
      "reason": "主流开源机器学习实验追踪、模型注册表与版本管理平台，现已全面支持 LLM 评估与追踪。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "infra"
      ],
      "transfers": [],
      "github": {
        "stars": 28862,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-18T01:11:02Z",
        "default_branch": "master"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/mlflow/mlflow",
        "checked_at": "2026-11-18"
      }
    },
    "wandb": {
      "short": "W&B训练追踪",
      "type": "repo",
      "title": "wandb/wandb: AI developer platform",
      "url": "https://github.com/wandb/wandb",
      "reason": "模型训练过程可视化、超参扫描与实验管理主流工具 SDK，广泛用于微调与分布式训练监控。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "infra"
      ],
      "transfers": [],
      "github": {
        "stars": 11325,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-17T21:41:18Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/wandb/wandb",
        "checked_at": "2026-11-18"
      }
    },
    "ray": {
      "short": "Ray分布式计算",
      "type": "repo",
      "title": "ray-project/ray: AI compute engine",
      "url": "https://github.com/ray-project/ray",
      "reason": "开源分布式 AI 计算引擎，统一支撑大规模数据处理、分布式训练（Ray Train）与在线推理服务。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "infra"
      ],
      "transfers": [],
      "github": {
        "stars": 44312,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-18T01:25:10Z",
        "default_branch": "master"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/ray-project/ray",
        "checked_at": "2026-11-18"
      }
    },
    "deepspeed": {
      "short": "DeepSpeed训练",
      "type": "repo",
      "title": "deepspeedai/DeepSpeed",
      "url": "https://github.com/deepspeedai/DeepSpeed",
      "reason": "微软开源的深度学习分布式训练优化库，提供 ZeRO 显存优化与张量并行能力。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "infra"
      ],
      "transfers": [],
      "github": {
        "stars": 43336,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-18T00:06:28Z",
        "default_branch": "master"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/deepspeedai/DeepSpeed",
        "checked_at": "2026-11-18"
      }
    },
    "llama-cpp": {
      "short": "llama.cpp推理",
      "type": "repo",
      "title": "ggml-org/llama.cpp: LLM inference in C/C++",
      "url": "https://github.com/ggml-org/llama.cpp",
      "reason": "纯 C/C++ 实现的高性能本地与边缘端大模型量化推理引擎，GGUF 生态基石。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "infra"
      ],
      "transfers": [],
      "github": {
        "stars": 135686,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-17T23:12:20Z",
        "default_branch": "master"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/ggml-org/llama.cpp",
        "checked_at": "2026-11-18"
      }
    },
    "mlops-roadmap": {
      "short": "MLOps路线图",
      "type": "roadmap",
      "title": "MLOps Roadmap",
      "url": "https://roadmap.sh/mlops",
      "reason": "涵盖模型版本管理、CI/CD、容器化、编排调度与线上监控的 MLOps 完整技能路线图。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "infra"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://roadmap.sh/mlops",
        "checked_at": "2026-11-18"
      }
    },
    "fsdl": {
      "short": "全栈深度学习",
      "type": "course",
      "title": "Full Stack Deep Learning (2022)",
      "url": "https://fullstackdeeplearning.com/course/2022/",
      "reason": "Full Stack Deep Learning 2022 课程，专注从实验走向生产，系统讲解数据管理、测试、部署与生产监控。",
      "era": "2022 课程",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "infra"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://fullstackdeeplearning.com/course/2022/",
        "checked_at": "2026-11-18"
      }
    },
    "vllm": {
      "short": "vLLM推理引擎",
      "type": "repo",
      "title": "vllm-project/vllm",
      "url": "https://github.com/vllm-project/vllm",
      "reason": "主流开源高吞吐推理引擎之一，以 PagedAttention 提升显存利用率，常用于私有化部署与高并发推理。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "infra"
      ],
      "transfers": [],
      "github": {
        "stars": 97116,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-18T00:46:18Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/vllm-project/vllm",
        "checked_at": "2026-11-18"
      }
    },
    "sglang": {
      "short": "SGLang推理引擎",
      "type": "repo",
      "title": "sgl-project/sglang",
      "url": "https://github.com/sgl-project/sglang",
      "reason": "高性能开源推理框架，用 RadixAttention 做跨请求前缀 KV 缓存，并另有压缩有限状态机等机制支持结构化输出。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "infra"
      ],
      "transfers": [],
      "github": {
        "stars": 38990,
        "last_commit": "2026-11-18",
        "last_commit_at": "2026-11-18T01:14:57Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/sgl-project/sglang",
        "checked_at": "2026-11-18"
      }
    },
    "bentoml": {
      "short": "BentoML服务部署",
      "type": "repo",
      "title": "bentoml/BentoML",
      "url": "https://github.com/bentoml/BentoML",
      "reason": "开源模型服务框架，用于把模型打包成可部署的镜像与服务 API。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "infra"
      ],
      "transfers": [],
      "github": {
        "stars": 8942,
        "last_commit": "2026-11-17",
        "last_commit_at": "2026-11-17T01:44:00Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/bentoml/BentoML",
        "checked_at": "2026-11-18"
      }
    },
    "pair-guidebook": {
      "short": "PAIR设计指南",
      "type": "doc",
      "title": "People + AI Guidebook",
      "url": "https://pair.withgoogle.com/guidebook/",
      "reason": "Google 面向产品经理与设计师的权威人机协作指南，涵盖信任校准、错误兜底与可解释性。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://pair.withgoogle.com/guidebook/",
        "checked_at": "2026-11-18"
      }
    },
    "ai-for-everyone": {
      "short": "AI通识课",
      "type": "course",
      "title": "AI for Everyone - DeepLearning.AI",
      "url": "https://www.deeplearning.ai/courses/ai-for-everyone",
      "reason": "吴恩达经典的非技术通识课，帮助产品、业务与普通读者建立 AI 能力边界与项目评估直觉。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "product",
        "everyone"
      ],
      "branches": [
        "trunk",
        "literacy"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.deeplearning.ai/courses/ai-for-everyone",
        "checked_at": "2026-11-18"
      }
    },
    "gen-ai-for-everyone": {
      "short": "生成式AI通识",
      "type": "course",
      "title": "Generative AI for Everyone",
      "url": "https://www.deeplearning.ai/courses/generative-ai-for-everyone",
      "reason": "吴恩达针对生成式 AI 时代推出的通识课，讲解大模型工作原理、商业场景评估与组织落地。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "product",
        "everyone"
      ],
      "branches": [
        "ai-pm",
        "literacy"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.deeplearning.ai/courses/generative-ai-for-everyone",
        "checked_at": "2026-11-18"
      }
    },
    "claude-academy": {
      "short": "Claude学院",
      "type": "site",
      "title": "Claude Academy · Learn to work and build with Claude",
      "url": "https://academy.claude.com/",
      "reason": "Anthropic 官方免费学习平台，包含非技术 AI Fluency（4D 框架）与产品/开发者进阶课程。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "product",
        "everyone"
      ],
      "branches": [
        "ai-pm",
        "trunk"
      ],
      "transfers": [
        "prompt-context"
      ],
      "check": {
        "status": "200",
        "final_url": "https://academy.claude.com/",
        "checked_at": "2026-11-18"
      }
    },
    "openai-academy": {
      "short": "OpenAI学院",
      "type": "site",
      "title": "OpenAI Academy",
      "url": "https://academy.openai.com/",
      "reason": "OpenAI 官方免费学习平台，按职场应用、开发构建、领导力与教育四条角色路径组织内容。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "product",
        "everyone"
      ],
      "branches": [
        "ai-pm",
        "trunk"
      ],
      "transfers": [
        "prompt-context"
      ],
      "check": {
        "status": "200",
        "final_url": "https://academy.openai.com/",
        "checked_at": "2026-11-18"
      }
    },
    "huyenchip-llm-eng": {
      "short": "LLM生产应用",
      "type": "article",
      "title": "Building LLM applications for production",
      "url": "https://huyenchip.com/2023/04/11/llm-engineering.html",
      "reason": "Chip Huyen 讨论生产级 LLM 应用的工程权衡，重点包括输出一致性、成本与延迟、提示与微调的取舍，以及调用 API 与自建开源模型的选择。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "context"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://huyenchip.com/2023/04/11/llm-engineering.html",
        "checked_at": "2026-11-18"
      }
    },
    "a16z-ai": {
      "short": "a16z企业AI调研",
      "type": "article",
      "title": "Leaders, gainers and unexpected winners in the Enterprise AI arms race | Andreessen Horowitz",
      "url": "https://a16z.com/leaders-gainers-and-unexpected-winners-in-the-enterprise-ai-arms-race/",
      "reason": "Andreessen Horowitz 于 2026-01-30 发布的第三期企业 AI / CIO 调研，梳理企业落地中的领先者、追赶者与意外赢家。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "ai-pm"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://a16z.com/leaders-gainers-and-unexpected-winners-in-the-enterprise-ai-arms-race/",
        "checked_at": "2026-11-18"
      }
    },
    "nist-ai-rmf": {
      "short": "NIST AI风险框架",
      "type": "doc",
      "title": "AI Risk Management Framework | NIST",
      "url": "https://www.nist.gov/itl/ai-risk-management-framework",
      "reason": "美国 NIST 发布的权威 AI 风险管理框架（RMF），为产品治理、可信度评估与合规提供标准。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "ai-pm"
      ],
      "transfers": [
        "safety"
      ],
      "check": {
        "status": "200",
        "final_url": "https://www.nist.gov/itl/ai-risk-management-framework",
        "checked_at": "2026-11-18"
      }
    },
    "eu-ai-act": {
      "short": "欧盟AI法案",
      "type": "site",
      "title": "AI Act",
      "url": "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
      "reason": "欧盟委员会官方的《人工智能法案》政策页，说明风险分级、适用范围与合规要求。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "ai-pm"
      ],
      "transfers": [
        "safety"
      ],
      "check": {
        "status": "200",
        "final_url": "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
        "checked_at": "2026-11-18"
      }
    },
    "pair-patterns": {
      "short": "PAIR设计模式",
      "type": "doc",
      "title": "PAIR Guidebook - Design Patterns",
      "url": "https://pair.withgoogle.com/guidebook/patterns",
      "reason": "Google PAIR 提炼的 23 条人机交互设计模式，直接对应置信度展示、反馈收集与用户控制权。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "ai-ux"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://pair.withgoogle.com/guidebook/patterns",
        "checked_at": "2026-11-18"
      }
    },
    "microsoft-hax": {
      "short": "微软HAX指南",
      "type": "doc",
      "title": "Microsoft HAX Toolkit",
      "url": "https://www.microsoft.com/en-us/haxtoolkit/",
      "reason": "微软人机交互（Human-AI Experience）工具包，提供 18 条 AI 交互准则与设计评审工作簿。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "ai-ux"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.microsoft.com/en-us/haxtoolkit/",
        "checked_at": "2026-11-18"
      }
    },
    "nng-ai-paradigm": {
      "short": "NN/g新UI范式",
      "type": "article",
      "title": "AI: First New UI Paradigm in 60 Years",
      "url": "https://www.nngroup.com/articles/ai-paradigm/",
      "reason": "Nielsen Norman Group 提出生成式 AI 标志着“基于意图的成果规范”新交互范式。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "ai-ux"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.nngroup.com/articles/ai-paradigm/",
        "checked_at": "2026-11-18"
      }
    },
    "shape-of-ai": {
      "short": "Shape of AI",
      "type": "site",
      "title": "The Shape of AI | UX Patterns for AI",
      "url": "https://www.shapeof.ai/",
      "reason": "系统收集对话之外的 AI 交互模式（画布、内联助手、引文、参数控制与信任标识）的设计词典。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "ai-ux"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.shapeof.ai/",
        "checked_at": "2026-11-18"
      }
    },
    "apple-hig-ml": {
      "short": "苹果ML人机规范",
      "type": "doc",
      "title": "Machine learning | Apple Human Interface Guidelines",
      "url": "https://developer.apple.com/design/human-interface-guidelines/machine-learning",
      "reason": "苹果官方机器学习与智能系统人机界面规范，涵盖隐私边界、隐式反馈与错误容错设计。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "ai-ux"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://developer.apple.com/design/human-interface-guidelines/machine-learning",
        "checked_at": "2026-11-18"
      }
    },
    "ibm-carbon-ai": {
      "short": "Carbon for AI",
      "type": "doc",
      "title": "Carbon for AI | Carbon Design System",
      "url": "https://www.carbondesignsystem.com/building-blocks/foundations/carbon-for-ai",
      "reason": "IBM Carbon 开源设计系统中的 AI 组件规范（Apache-2.0），包括 AI label、可解释性弹出层，以及 AI presence 与还原到 AI 等状态样式。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "ai-ux"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.carbondesignsystem.com/building-blocks/foundations/carbon-for-ai",
        "checked_at": "2026-11-18"
      }
    },
    "transformer-explainer": {
      "short": "Transformer交互图",
      "type": "site",
      "title": "Transformer Explainer",
      "url": "https://poloclub.github.io/transformer-explainer/",
      "reason": "佐治亚理工学院打造的交互式可视化教学工具，直观展示概率采样与注意力机制。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://poloclub.github.io/transformer-explainer/",
        "checked_at": "2026-11-18"
      }
    },
    "boba-ai": {
      "short": "Boba AI原型案例",
      "type": "article",
      "title": "Building Boba AI",
      "url": "https://martinfowler.com/articles/building-boba.html",
      "reason": "Farooq Ali 发布在 Martin Fowler 站点的生成式 AI 产品案例，介绍任务面板、结构化卡片、Creative Matrix 与故事板等交互设计。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "ai-ux"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://martinfowler.com/articles/building-boba.html",
        "checked_at": "2026-11-18"
      }
    },
    "elements-of-ai": {
      "short": "AI通识导论",
      "type": "course",
      "title": "Elements of AI",
      "url": "https://www.elementsofai.com/",
      "reason": "赫尔辛基大学与 MinnaLearn 推出的免费零基础 AI 导论课，无需编程或高等数学即可完成。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.elementsofai.com/",
        "checked_at": "2026-11-18"
      }
    },
    "google-skills": {
      "short": "Google AI技能",
      "type": "site",
      "title": "Google Skills",
      "url": "https://www.skills.google/",
      "reason": "Google 官方技能学习平台入口，可按 AI 等主题筛选学习路径，适合作为素养课的目录，而不是单一课程。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "literacy"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.skills.google/",
        "checked_at": "2026-11-18",
        "flag": "catalog_homepage"
      }
    },
    "one-useful-thing": {
      "short": "One Useful Thing",
      "type": "site",
      "title": "One Useful Thing",
      "url": "https://www.oneusefulthing.org/",
      "reason": "沃顿商学院 Ethan Mollick 教授专栏，以通俗实证视角剖析 AI 能力边界、幻觉与人机协作。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "literacy"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.oneusefulthing.org/",
        "checked_at": "2026-11-18"
      }
    },
    "anthropic-constitutional-ai": {
      "short": "Constitutional AI",
      "type": "article",
      "title": "Constitutional AI: Harmlessness from AI feedback",
      "url": "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback",
      "reason": "Anthropic 2022 年 Constitutional AI 研究介绍，说明如何用 AI 反馈训练更无害的模型，并公开方法与政策备忘录。",
      "era": "2022 年研究介绍",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "research"
      ],
      "transfers": [
        "safety"
      ],
      "check": {
        "status": "200",
        "final_url": "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback",
        "checked_at": "2026-11-18"
      }
    },
    "claude-constitution": {
      "short": "Claude行为准则",
      "type": "article",
      "title": "Claude's Constitution",
      "url": "https://www.anthropic.com/constitution",
      "reason": "Anthropic 于 2026-01-22 发布的 Claude 行为准则全文，展示模型在诚实、无害与隐私上的价值权衡。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "research"
      ],
      "transfers": [
        "safety"
      ],
      "check": {
        "status": "200",
        "final_url": "https://www.anthropic.com/constitution",
        "checked_at": "2026-11-18"
      }
    },
    "privacy-guides": {
      "short": "AI聊天隐私指南",
      "type": "site",
      "title": "Recommended AI Chat: Private ChatGPT Alternatives - Privacy Guides",
      "url": "https://www.privacyguides.org/en/ai-chat/",
      "reason": "Privacy Guides 关于 AI 聊天工具的独立隐私指南，帮助普通用户评估聊天产品的数据与隐私风险。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "literacy"
      ],
      "transfers": [
        "safety"
      ],
      "check": {
        "status": "200",
        "final_url": "https://www.privacyguides.org/en/ai-chat/",
        "checked_at": "2026-11-18"
      }
    },
    "eff-ai": {
      "short": "EFF AI与安全聊天",
      "type": "article",
      "title": "When AI and Secure Chat Meet, Users Deserve Strong Controls Over How They Interact | Electronic Frontier Foundation",
      "url": "https://www.eff.org/deeplinks/2025/10/when-ai-and-secure-chat-meet-users-deserve-strong-controls-over-how-they-interact",
      "reason": "电子前哨基金会（EFF）讨论 AI 助手与加密聊天交汇时，用户应保留对交互方式的控制权，关注隐私与数字权利。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "literacy"
      ],
      "transfers": [
        "safety"
      ],
      "check": {
        "status": "200",
        "final_url": "https://www.eff.org/deeplinks/2025/10/when-ai-and-secure-chat-meet-users-deserve-strong-controls-over-how-they-interact",
        "checked_at": "2026-11-18"
      }
    },
    "waytoagi": {
      "short": "WaytoAGI知识库",
      "type": "site",
      "title": "WaytoAGI-通往AGI之路，最好的 AI 知识库和工具站",
      "url": "https://www.waytoagi.com/zh",
      "reason": "面向中文用户的公开 AI 知识库与工具导航，汇集日常办公提示词、场景案例与效率工具。主体是公开知识库，不是典型的 Git 开源教材库。",
      "stage": "intro",
      "lang": "zh",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "workflow"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.waytoagi.com/zh",
        "checked_at": "2026-11-18"
      }
    },
    "google-gemini-prompt-tips": {
      "short": "Gemini提问技巧",
      "type": "doc",
      "title": "Writing Effective AI Prompts for Business | Gemini for Workspace",
      "url": "https://workspace.google.com/intl/en/resources/ai/writing-effective-prompts/",
      "reason": "Google Workspace 官方提示词建议：用自然语言、表达清晰简洁、提供上下文、使用关键词，并把复杂任务拆开。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "workflow"
      ],
      "transfers": [
        "prompt-context"
      ],
      "check": {
        "status": "200",
        "final_url": "https://workspace.google.com/intl/en/resources/ai/writing-effective-prompts/",
        "checked_at": "2026-11-18"
      }
    },
    "claude-prompt-best-practices": {
      "short": "Claude提示最佳实践",
      "type": "doc",
      "title": "Prompting best practices - Claude Platform Docs",
      "url": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices",
      "reason": "Anthropic 官方整理的提示词最佳实践，清晰演示如何给示例、设约束并拆分长文档任务。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "context"
      ],
      "transfers": [
        "prompt-context"
      ],
      "check": {
        "status": "200",
        "final_url": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices",
        "checked_at": "2026-11-18"
      }
    },
    "notebooklm": {
      "short": "Gemini Notebook帮助",
      "type": "doc",
      "title": "Create a notebook in Gemini Notebook - Gemini Notebook Help",
      "url": "https://support.google.com/gemininotebook/answer/16206563",
      "reason": "Google 官方 Gemini Notebook（原 NotebookLM）帮助文档，介绍如何创建笔记本、整理长文档并开展资料问答。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "workflow"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://support.google.com/gemininotebook/answer/16206563",
        "checked_at": "2026-11-18"
      }
    },
    "notion-ai-help": {
      "short": "Notion AI指南",
      "type": "doc",
      "title": "Notion AI",
      "url": "https://www.notion.com/help/guides/category/ai",
      "reason": "Notion 官方 AI 功能使用指南，涵盖笔记总结、知识库 Q&A 与个人知识管理工作流。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "workflow"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.notion.com/help/guides/category/ai",
        "checked_at": "2026-11-18"
      }
    },
    "ms-copilot-help": {
      "short": "Copilot办公指南",
      "type": "doc",
      "title": "Create content using Microsoft Copilot Chat | Microsoft Support",
      "url": "https://support.microsoft.com/en-us/microsoft-365-copilot/create-content-using-microsoft-365-copilot-chat",
      "reason": "Microsoft 365 Copilot 官方帮助，介绍如何用 Copilot Chat 把想法做成文档等内容。该页不是系统化的模板库。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "workflow"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://support.microsoft.com/en-us/microsoft-365-copilot/create-content-using-microsoft-365-copilot-chat",
        "checked_at": "2026-11-18"
      }
    },
    "n8n-docs": {
      "short": "n8n无代码工作流",
      "type": "doc",
      "title": "n8n Docs",
      "url": "https://docs.n8n.io/",
      "reason": "可视化节点式自动化工具 n8n 官方文档，支持无代码/低代码串联大模型与日常办公应用。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "workflow"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://docs.n8n.io/",
        "checked_at": "2026-11-18"
      }
    },
    "zapier-ai": {
      "short": "Zapier AI自动化",
      "type": "doc",
      "title": "Use AI by Zapier to analyze and return data",
      "url": "https://help.zapier.com/hc/en-us/articles/8496342944013-Use-AI-by-Zapier-to-analyze-and-return-data",
      "reason": "Zapier 官方帮助文档，介绍如何用 AI by Zapier 分析数据并返回结果，适合非开发者搭建自动化工作流。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "workflow"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://help.zapier.com/hc/en-us/articles/8496342944013-Use-AI-by-Zapier-to-analyze-and-return-data",
        "checked_at": "2026-11-18"
      }
    },
    "svpg-ai-role": {
      "short": "AI与产品角色",
      "type": "article",
      "title": "AI and the Future of the Product Role",
      "url": "https://www.svpg.com/ai-and-the-future-of-the-product-role/",
      "reason": "Marty Cagan 2026 年 11 月的专题文章，讨论生成式 AI 如何改变产品角色的职责、工作方式与能力要求。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "ai-pm"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.svpg.com/ai-and-the-future-of-the-product-role/",
        "checked_at": "2026-11-18"
      }
    },
    "applied-llms": {
      "short": "LLM落地经验",
      "type": "article",
      "title": "What We've Learned From A Year of Building with LLMs",
      "url": "https://applied-llms.org/",
      "reason": "Eugene Yan、Hamel Husain、Shreya Shankar 等人 2024 年的一线经验总结，覆盖提示、RAG、评测、运营与产品设计。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "ai-pm"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://applied-llms.org/",
        "checked_at": "2026-11-18"
      }
    },
    "dlai-prompting-everyone": {
      "short": "人人提示课",
      "type": "course",
      "title": "AI Prompting for Everyone",
      "url": "https://www.deeplearning.ai/courses/ai-prompting-for-everyone",
      "reason": "吴恩达面向非开发者的提示词课程，从查资料到做日常任务，强调怎样把模型问出真正有用的结果。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "workflow"
      ],
      "transfers": [
        "prompt-context"
      ],
      "check": {
        "status": "200",
        "final_url": "https://www.deeplearning.ai/courses/ai-prompting-for-everyone",
        "checked_at": "2026-11-18"
      }
    },
    "dlai-rag": {
      "short": "RAG课程",
      "type": "course",
      "title": "Retrieval Augmented Generation (RAG)",
      "url": "https://www.deeplearning.ai/courses/retrieval-augmented-generation",
      "reason": "DeepLearning.AI 的中级 RAG 专项课，约 26 小时，覆盖混合检索、向量库、生产部署与评测。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "rag"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.deeplearning.ai/courses/retrieval-augmented-generation",
        "checked_at": "2026-11-18"
      }
    },
    "ms-ontology-playground": {
      "short": "本体论练习场",
      "type": "site",
      "title": "Microsoft Ontology Playground",
      "url": "https://microsoft.github.io/Ontology-Playground/#/learn",
      "reason": "微软开源的本体（Ontology）交互学习站，可视化设计实体与关系并导出 RDF，适合在做 GraphRAG 前理解知识建模。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "rag"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://microsoft.github.io/Ontology-Playground/",
        "checked_at": "2026-11-18"
      }
    },
    "karpathy-nanochat": {
      "short": "nanochat仓库",
      "type": "repo",
      "title": "karpathy/nanochat",
      "url": "https://github.com/karpathy/nanochat",
      "reason": "Karpathy 用来替代已弃用 nanoGPT 的从零训练与推理 ChatGPT 克隆项目，是理解现代训练循环的现行教材。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "post-train"
      ],
      "transfers": [],
      "github": {
        "stars": 60643,
        "last_commit": "2026-07-04",
        "last_commit_at": "2026-07-03T22:54:57Z",
        "default_branch": "master"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/karpathy/nanochat",
        "checked_at": "2026-11-18"
      }
    },
    "ant-design-x-spec": {
      "id": "ant-design-x-spec",
      "short": "Ant X设计规范",
      "type": "doc",
      "title": "RICH 设计范式简介 - Ant Design X",
      "url": "https://x.ant.design/docs/spec/introduce/",
      "reason": "蚂蚁集团 Ant Design X 官方 AI 界面设计规范，按 RICH 范式讲解角色、意图、会话与混合界面，覆盖唤醒、表达、确认与反馈。",
      "stage": "build",
      "lang": "zh-en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "ai-ux"
      ],
      "transfers": [],
      "github": {
        "stars": 4849,
        "last_commit": "2026-10-29",
        "last_commit_at": "2026-10-29T08:48:12Z",
        "default_branch": "main",
        "repo": "ant-design/x"
      },
      "check": {
        "status": "200",
        "final_url": "https://x.ant.design/docs/spec/introduce/",
        "checked_at": "2026-11-18"
      },
      "added_in": "backfill-2026-11-18"
    },
    "fluent-copilot-kits": {
      "id": "fluent-copilot-kits",
      "short": "Fluent负责任AI",
      "type": "doc",
      "title": "Responsible AI - Fluent 2 Design System",
      "url": "https://fluent2.microsoft.design/responsible-AI",
      "reason": "微软 Fluent 2 官方 Responsible AI 设计指引：错误文案要说明失败原因并给出后续出路，在输出后收集反馈，并让用户可以纠正和撤销，同时附有验收量表。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "ai-ux"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://fluent2.microsoft.design/responsible-AI",
        "checked_at": "2026-11-18"
      },
      "added_in": "backfill-2026-11-18"
    },
    "pair-explorables": {
      "id": "pair-explorables",
      "short": "PAIR交互实验",
      "type": "site",
      "title": "AI Explorables | PAIR",
      "url": "https://pair.withgoogle.com/explorables/",
      "reason": "Google PAIR 的交互式短文系列，用可视化实验解释模型公平性、记忆与泛化、稀疏自编码器与内部机制等概念。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "research"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://pair.withgoogle.com/explorables/",
        "checked_at": "2026-11-18"
      },
      "added_in": "backfill-2026-11-18"
    },
    "aisafety-book": {
      "id": "aisafety-book",
      "short": "AI安全教材",
      "type": "book",
      "title": "AI Safety, Ethics, and Society Textbook",
      "url": "https://www.aisafetybook.com/",
      "reason": "Center for AI Safety 主任 Dan Hendrycks 撰写的免费在线教材，系统介绍 AI 安全、伦理与社会影响，适合作为对齐研究的读本。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "research"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.aisafetybook.com/",
        "checked_at": "2026-11-18"
      },
      "added_in": "backfill-2026-11-18"
    },
    "stanford-ai-index-2026": {
      "id": "stanford-ai-index-2026",
      "short": "斯坦福AI指数2026",
      "type": "doc",
      "title": "The 2026 AI Index Report | Stanford HAI",
      "url": "https://hai.stanford.edu/ai-index/2026-ai-index-report",
      "reason": "斯坦福 HAI 发布的 2026 年人工智能指数报告，用数据和图表呈现技术进展、经济影响、治理与公众态度，便于理解当下能力边界。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "literacy"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://hai.stanford.edu/ai-index/2026-ai-index-report",
        "checked_at": "2026-11-18"
      },
      "added_in": "backfill-2026-11-18"
    },
    "oecd-ai-principles": {
      "id": "oecd-ai-principles",
      "short": "OECD AI原则",
      "type": "doc",
      "title": "AI Principles Overview - OECD.AI",
      "url": "https://oecd.ai/en/ai-principles",
      "reason": "经济合作与发展组织（OECD）的人工智能原则概述，用非技术语言说明透明、问责、隐私与以人为本等国际共识。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "literacy"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://oecd.ai/en/ai-principles",
        "checked_at": "2026-11-18"
      },
      "added_in": "backfill-2026-11-18"
    },
    "ms-learn-rag": {
      "id": "ms-learn-rag",
      "short": "微软RAG概览",
      "type": "doc",
      "title": "RAG and Generative AI - Foundry IQ (Azure AI Search) | Microsoft Learn",
      "url": "https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview",
      "reason": "微软官方文档，说明检索增强生成的典型数据流、检索方式与适用场景，并结合 Azure AI Search 的实现思路帮助建立系统概念。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "rag"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview",
        "checked_at": "2026-11-18"
      },
      "added_in": "backfill-2026-11-18"
    },
    "haystack": {
      "id": "haystack",
      "short": "Haystack框架",
      "type": "repo",
      "title": "deepset-ai/haystack",
      "url": "https://github.com/deepset-ai/haystack",
      "reason": "deepset 开源的模块化 AI 编排框架，适合用显式流水线搭建可上线的检索增强与智能体应用。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "rag"
      ],
      "transfers": [],
      "github": {
        "stars": 27037,
        "last_commit": "2026-11-17",
        "last_commit_at": "2026-11-17T15:56:18Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/deepset-ai/haystack",
        "checked_at": "2026-11-18"
      },
      "added_in": "backfill-2026-11-18"
    },
    "evidently-llm-eval": {
      "id": "evidently-llm-eval",
      "short": "LLM评测指南",
      "type": "article",
      "title": "LLM evaluation: a beginner's guide",
      "url": "https://www.evidentlyai.com/llm-guide/llm-evaluation",
      "reason": "Evidently AI 的大模型评测入门指南（页面标注更新于 2026-05-19），讲解评测基础概念、有参考与无参考指标，以及用模型当评委的思路。",
      "stage": "adv",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "evals"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://www.evidentlyai.com/llm-guide/llm-evaluation",
        "checked_at": "2026-11-18"
      },
      "added_in": "backfill-2026-11-18"
    },
    "transformer-lens": {
      "id": "transformer-lens",
      "short": "TransformerLens",
      "type": "repo",
      "title": "TransformerLensOrg/TransformerLens",
      "url": "https://github.com/TransformerLensOrg/TransformerLens",
      "reason": "用于 GPT 类模型机制可解释性研究的开源 Python 库，支持对内部激活做钩子追踪与因果干预。最初由 Neel Nanda 创建，现由 TransformerLensOrg 维护。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "research"
      ],
      "transfers": [],
      "github": {
        "stars": 4080,
        "last_commit": "2026-11-10",
        "last_commit_at": "2026-11-09T17:26:57Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/TransformerLensOrg/TransformerLens",
        "checked_at": "2026-11-18"
      },
      "added_in": "backfill-2026-11-18"
    },
    "google-managing-ml-projects": {
      "id": "google-managing-ml-projects",
      "short": "Google管理ML项目",
      "type": "course",
      "title": "Managing ML projects | Machine Learning | Google for Developers",
      "url": "https://developers.google.com/machine-learning/managing-ml-projects",
      "reason": "Google 官方免费短课（约 90 分钟），讲解机器学习项目从构思到上线的阶段、成功指标与负责任 AI 实践，并补充生成式 AI 项目管理的异同。",
      "stage": "intro",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://developers.google.com/machine-learning/managing-ml-projects",
        "checked_at": "2026-11-18"
      },
      "added_in": "backfill-2026-11-18"
    },
    "nist-ai-rmf-playbook": {
      "id": "nist-ai-rmf-playbook",
      "short": "NIST AI操作手册",
      "type": "doc",
      "title": "AI RMF Playbook - AIRC",
      "url": "https://airc.nist.gov/airmf-resources/playbook/",
      "reason": "美国 NIST 与 AI 风险管理框架配套的官方操作手册，按治理、映射、度量与管理四阶段列出可执行动作。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "product"
      ],
      "branches": [
        "ai-pm"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://airc.nist.gov/airmf-resources/playbook/",
        "checked_at": "2026-11-18"
      },
      "added_in": "backfill-2026-11-18"
    },
    "gemini-privacy-hub": {
      "id": "gemini-privacy-hub",
      "short": "Gemini隐私中心",
      "type": "doc",
      "title": "Gemini Apps Privacy Hub - Gemini Apps Help",
      "url": "https://support.google.com/gemini/answer/13594961",
      "reason": "Google 官方 Gemini 应用隐私说明（页面标注更新于 2026-11-17），介绍收集哪些数据、如何使用，以及用户可配置的设置与删除、导出方式。",
      "stage": "build",
      "lang": "en",
      "free": true,
      "lines": [
        "everyone"
      ],
      "branches": [
        "literacy"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://support.google.com/gemini/answer/13594961",
        "checked_at": "2026-11-18"
      },
      "added_in": "backfill-2026-11-18"
    },
    "ms-copilot-prompt-gallery": {
      "short": "Copilot提示库",
      "type": "site",
      "title": "Prompt Gallery – Microsoft Adoption",
      "url": "https://adoption.microsoft.com/en-us/copilot/prompt-gallery/",
      "reason": "微软官方 Copilot 日常办公提示词库，覆盖会议、简报、写作和数据分析，面向非开发者，2026-11-03 仍有更新。",
      "stage": "adv",
      "lang": "en",
      "lines": [
        "everyone"
      ],
      "branches": [
        "workflow"
      ],
      "free": true,
      "transfers": [],
      "added_in": "review-2-2026-11-18",
      "check": {
        "status": "200",
        "final_url": "https://adoption.microsoft.com/en-us/copilot/prompt-gallery/",
        "checked_at": "2026-11-18"
      }
    },
    "nng-ai-prototyping": {
      "short": "NN/g原型测试",
      "type": "article",
      "title": "Test Complex Interactions Earlier with AI Prototyping - NN/G",
      "url": "https://www.nngroup.com/articles/test-earlier-with-ai/",
      "reason": "Nielsen Norman Group 于 2026-09-11 发布，介绍如何用可交互原型更早测试对话式 AI、空态、错误态和不确定输出。",
      "stage": "build",
      "lang": "en",
      "lines": [
        "product"
      ],
      "branches": [
        "ai-ux"
      ],
      "free": true,
      "transfers": [],
      "added_in": "review-2-2026-11-18",
      "check": {
        "status": "200",
        "final_url": "https://www.nngroup.com/articles/test-earlier-with-ai/",
        "checked_at": "2026-11-18"
      }
    },
    "3b1b-linear-algebra": {
      "short": "3B1B线性代数",
      "type": "course",
      "title": "Essence of Linear Algebra | 3Blue1Brown",
      "url": "https://www.3blue1brown.com/lessons/vectors/",
      "reason": "Grant Sanderson 的线性代数本质系列入口（第 1 课），用几何与动画直观讲解向量、线性变换与矩阵等基础概念。",
      "stage": "intro",
      "lang": "en",
      "lines": [
        "model"
      ],
      "branches": [
        "research"
      ],
      "free": true,
      "transfers": [],
      "added_in": "review-2-2026-11-18",
      "check": {
        "status": "200",
        "final_url": "https://www.3blue1brown.com/lessons/vectors/",
        "checked_at": "2026-11-18"
      }
    },
    "mit-ocw-1806sc": {
      "short": "MIT线性代数课",
      "type": "course",
      "title": "Linear Algebra | Mathematics | MIT OpenCourseWare",
      "url": "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/",
      "reason": "MIT 公开课 18.06SC，Gilbert Strang 讲授的线性代数，2011 年秋季学期存档，采用 CC BY-NC-SA 许可。",
      "era": "2011 年秋季学期存档",
      "stage": "intro",
      "lang": "en",
      "lines": [
        "model"
      ],
      "branches": [
        "research"
      ],
      "free": true,
      "transfers": [],
      "added_in": "review-2-2026-11-18",
      "check": {
        "status": "200",
        "final_url": "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/",
        "checked_at": "2026-11-18"
      }
    },
    "openllmetry": {
      "short": "OpenLLMetry",
      "type": "repo",
      "title": "traceloop/openllmetry",
      "url": "https://github.com/traceloop/openllmetry",
      "reason": "基于 OpenTelemetry 的开源大模型可观测性项目，为模型调用生成带 token 数和耗时的链路数据，可导出到 Langfuse 或 Phoenix。",
      "stage": "intro",
      "lang": "en",
      "lines": [
        "eng"
      ],
      "branches": [
        "evals"
      ],
      "github": {
        "stars": 7541,
        "last_commit": "2026-11-17",
        "last_commit_at": "2026-11-16T19:09:37Z",
        "default_branch": "main"
      },
      "free": true,
      "transfers": [],
      "added_in": "review-2-2026-11-18",
      "check": {
        "status": "200",
        "final_url": "https://github.com/traceloop/openllmetry",
        "checked_at": "2026-11-18"
      }
    },
    "alexey-ai-eng-field-guide": {
      "short": "AI工程面试指南",
      "type": "repo",
      "title": "alexeygrigorev/ai-engineering-field-guide",
      "url": "https://github.com/alexeygrigorev/ai-engineering-field-guide",
      "reason": "Alexey Grigorev（《Machine Learning Bookcamp》作者、DataTalks.Club 创始人）维护的 2026 年 AI 工程面试实地指南。README 写明整理自约 9,760 份职位描述（作者自述，未逐条清点），覆盖理论（LLM、RAG、Agent）、编程、项目深挖、AI 系统设计和 take-home。",
      "stage": "interview",
      "lang": "en",
      "free": true,
      "lines": [
        "eng"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "github": {
        "stars": 6051,
        "last_commit": "2026-11-14",
        "last_commit_at": "2026-11-13T17:13:09Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/alexeygrigorev/ai-engineering-field-guide",
        "checked_at": "2026-11-18"
      },
      "added_in": "interview-2026-11-18"
    },
    "aiml-interviews": {
      "short": "AIML面试指南",
      "type": "repo",
      "title": "alirezadir/AIMLInterviews",
      "url": "https://github.com/alirezadir/AIMLInterviews",
      "reason": "2026 年仍在更新的综合面试指南（MIT 协议），覆盖算法与 ML 编程、经典 ML / GenAI / Agentic AI 广度题，以及经典机器学习系统设计。README 写明已按 2026 年扩写；其中 GenAI 系统设计只是章节末尾的简短清单，不是完整设计示例。只链 GitHub 仓库。README 顶部有作者的付费辅导推广。",
      "stage": "interview",
      "lang": "zh-en",
      "free": true,
      "lines": [
        "eng",
        "model"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "github": {
        "stars": 10007,
        "last_commit": "2026-10-09",
        "last_commit_at": "2026-10-08T21:58:27Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/alirezadir/AIMLInterviews",
        "checked_at": "2026-11-18"
      },
      "added_in": "interview-2026-11-18"
    },
    "datawhale-llm-interview": {
      "short": "大模型面试整理",
      "type": "doc",
      "title": "LLM & VLM & Agent 面试问题总结（hello-agents Extra01）",
      "url": "https://github.com/datawhalechina/hello-agents/blob/main/Extra-Chapter/Extra01-面试问题总结.md",
      "reason": "Datawhale hello-agents 仓库中的面试附录，整理自 2025 年秋招国内中大厂真实技术面，覆盖 Transformer / MoE、VLM、RLHF、Agent、RAG 与评测。配套参考答案只覆盖第 1–6 节，答案文件开头写明了这一点。附录本身最近提交于 2025-10-15；所属仓库仍在更新。这是已在学习路径中的 hello-agents 的附录，链到这份文档而不是仓库首页。",
      "stage": "interview",
      "lang": "zh",
      "free": true,
      "lines": [
        "eng",
        "model"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://github.com/datawhalechina/hello-agents/blob/main/Extra-Chapter/Extra01-面试问题总结.md",
        "checked_at": "2026-11-18"
      },
      "added_in": "interview-2026-11-18"
    },
    "chiphuyen-ml-interviews": {
      "short": "ML面试宝典",
      "type": "book",
      "title": "Introduction to Machine Learning Interviews Book",
      "url": "https://huyenchip.com/ml-interviews-book/",
      "reason": "Chip Huyen 的机器学习面试开源书，2021 年基础题库：含角色与流程说明，以及 200 多道带难度标记的知识题，覆盖数学、计算机与经典 ML。面试书开篇写「30 道」系统设计开放题，目标页（2019 年小册 Exercises，https://huyenchip.com/machine-learning-systems-design/exercises.html）按一级条目计为 27 道。作者在「About the answers」页写明初稿大约只有 10% 的题目有答案。NLP 部分仍以 RNN 和词向量为主，需与现行大模型材料搭配。",
      "era": "2021 年基础题库",
      "stage": "interview",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "github": {
        "stars": 4815,
        "last_commit": "2025-03-22",
        "last_commit_at": "2025-03-21T21:31:41Z",
        "default_branch": "master",
        "repo": "chiphuyen/ml-interviews-book"
      },
      "check": {
        "status": "200",
        "final_url": "https://huyenchip.com/ml-interviews-book/",
        "checked_at": "2026-11-18"
      },
      "added_in": "interview-2026-11-18"
    },
    "chiphuyen-dmls-book": {
      "short": "ML系统设计书",
      "type": "repo",
      "title": "chiphuyen/dmls-book",
      "url": "https://github.com/chiphuyen/dmls-book",
      "reason": "Chip Huyen《Designing Machine Learning Systems》（O'Reilly，2022 年，经典 ML 系统设计）的配套摘要与资源库，对应问题定义、数据、特征、训练、部署与监控。仓库是章节摘要和资源列表，不是全书；README 顶部有购书链接。这是面向生产机器学习系统的材料，不是大模型应用系统设计。",
      "era": "2022 年，经典 ML 系统设计",
      "stage": "interview",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "github": {
        "stars": 5471,
        "last_commit": "2026-06-09",
        "last_commit_at": "2026-06-09T13:28:26Z",
        "default_branch": "main"
      },
      "check": {
        "status": "200",
        "final_url": "https://github.com/chiphuyen/dmls-book",
        "checked_at": "2026-11-18"
      },
      "added_in": "interview-2026-11-18"
    },
    "bojie-llm-interview-200": {
      "short": "大模型面试200问",
      "type": "article",
      "title": "《图解大模型》配套阅读——大模型面试题 200 问",
      "url": "https://01.me/2025/04/llm-interview-questions/",
      "reason": "李博杰为《图解大模型》（Hands-On Large Language Models 中文版）整理的约 200 道面试题，2025-04-27 发布，之后没有修订。覆盖 Transformer、KV 缓存、GQA、RoPE、LoRA，以及 DeepSeek 的 MLA、MoE、GRPO 等训练与推理细节。页面只有题目，文中说明答案多数在书里。英文版同一组题：https://01.me/en/2025/04/llm-interview-questions/。",
      "stage": "interview",
      "lang": "zh",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://01.me/2025/04/llm-interview-questions/",
        "checked_at": "2026-11-18"
      },
      "added_in": "interview-2026-11-18"
    },
    "stanford-cs336": {
      "short": "Stanford CS336",
      "type": "course",
      "title": "CS336: Language Modeling from Scratch",
      "url": "https://cs336.stanford.edu/",
      "reason": "斯坦福 2026 年春季课程 Language Modeling from Scratch（授课教师 Tatsunori Hashimoto、Percy Liang），从分词、Transformer 实现、分布式训练、缩放定律、数据、推理到后训练对齐，把语言模型从头做一遍。这是训练与推理的学习材料，不是面试题库。",
      "stage": "interview",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "check": {
        "status": "200",
        "final_url": "https://cs336.stanford.edu/",
        "checked_at": "2026-11-18"
      },
      "added_in": "interview-2026-11-18"
    },
    "jax-scaling-book": {
      "short": "模型扩展指南",
      "type": "book",
      "title": "How to Scale Your Model",
      "url": "https://jax-ml.github.io/scaling-book/",
      "reason": "Google DeepMind 于 2025-02-04 发布的《How to Scale Your Model》，讲解在 TPU/GPU 上做大模型训练与推理的系统视角：屋顶线、并行策略、Transformer 计算量、KV 缓存与服务成本。这是训练与推理的学习材料，不是面试题库。配套仓库仍在更新。",
      "stage": "interview",
      "lang": "en",
      "free": true,
      "lines": [
        "model"
      ],
      "branches": [
        "trunk"
      ],
      "transfers": [],
      "github": {
        "stars": 1532,
        "last_commit": "2026-10-20",
        "last_commit_at": "2026-10-19T19:44:10Z",
        "default_branch": "main",
        "repo": "jax-ml/scaling-book"
      },
      "check": {
        "status": "200",
        "final_url": "https://jax-ml.github.io/scaling-book/",
        "checked_at": "2026-11-18"
      },
      "added_in": "interview-2026-11-18"
    }
  },
  "verification": {
    "checked": 167,
    "dropped_404": [],
    "replaced": [
      {
        "old": "https://www.svpg.com/",
        "old_id": "svpg",
        "new_id": "svpg-ai-role",
        "url": "https://www.svpg.com/ai-and-the-future-of-the-product-role/",
        "why": "原链接是 SVPG 总站，改为 2026-11-06 的 AI 与产品角色专题文章。"
      },
      {
        "old": "https://www.lennysnewsletter.com/",
        "old_id": "lennys-newsletter",
        "new_id": "applied-llms",
        "url": "https://applied-llms.org/",
        "why": "原链接是付费产品通讯总站，改为被广泛引用的 LLM 落地经验长文。"
      },
      {
        "old": "https://www.kimi.com/",
        "old_id": "kimi-ai",
        "new_id": "dlai-prompting-everyone",
        "url": "https://www.deeplearning.ai/courses/ai-prompting-for-everyone",
        "why": "原链接是产品官网，不是学习资料；改为吴恩达面向非开发者的提示词课程。"
      },
      {
        "old": "https://www.deeplearning.ai/courses/langchain-chat-with-your-data",
        "old_id": "dlai-langchain-data",
        "new_id": "dlai-rag",
        "url": "https://www.deeplearning.ai/courses/retrieval-augmented-generation",
        "why": "原课偏 LangChain 示例；改为仍在线、覆盖架构到评测的 RAG 专项课。"
      }
    ],
    "url_updated": [
      {
        "id": "eu-ai-act",
        "old": "https://artificialintelligenceact.eu/",
        "new": "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
        "why": "改为欧盟委员会官方政策页。原站是第三方追踪站，页面可打开，但不是官方来源。"
      }
    ],
    "flagged": [
      {
        "id": "mcp-docs",
        "flag": "first_curl_tls_error_retry_200",
        "url": "https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro"
      },
      {
        "id": "google-skills",
        "flag": "catalog_homepage",
        "url": "https://www.skills.google/"
      },
      {
        "id": "awesome-llm",
        "flag": "historical_index_last_commit_2025_07",
        "url": "https://github.com/Hannibal046/Awesome-LLM",
        "note": "作为截至 2025 年的历史里程碑索引保留，已挪到 M3 进阶。"
      }
    ],
    "review_2026_11_18": {
      "source": "resources-review.md + 编辑决策（应用修订；删除 joyful-pandas；保留 ms-ontology-playground；为不足 3 条的站点补入资源）",
      "deleted": [
        {
          "id": "dlai-learning-tracks",
          "why": "企业采购落地页，不是学习资源；建议替换会与 gen-ai-for-everyone 重复，故删除。"
        },
        {
          "id": "datawhale-joyful-pandas",
          "why": "编辑决定删除：教程基于 pandas 1.2，当前 pandas 已到 3.0，部分用法已过时。"
        }
      ],
      "replaced": [
        {
          "id": "openai-evals-guide",
          "old": "https://developers.openai.com/api/docs/guides/evals",
          "url": "https://developers.openai.com/api/docs/guides/evaluation-getting-started",
          "why": "托管 Evals 平台 2026-10-31 起只读、2026-11-30 关停；换成同站 Datasets 入门页，并挪到 A4 进阶。"
        },
        {
          "id": "3b1b-nn",
          "old": "https://www.3blue1brown.com/?topic=neural-networks",
          "url": "https://www.3blue1brown.com/lessons/neural-networks/",
          "why": "原链接是首页主题过滤器，无 JS 时看不到课时；改链系列第 1 课作为入口，并挪到 M1 入门。"
        },
        {
          "id": "bluedot-impact",
          "old": "https://bluedot.org/",
          "url": "https://bluedot.org/courses/technical-ai-safety",
          "why": "首页是招生门户；改链同站 Technical AI Safety 课页，并挪到 M3 进阶。"
        },
        {
          "id": "claude-constitution",
          "old": "https://www.anthropic.com/news/claudes-constitution",
          "url": "https://www.anthropic.com/constitution",
          "why": "换成 2026-01-22 发布的准则全文，并挪到 M3 进阶（原新闻帖和技术密度不适合普通用户路径）。"
        },
        {
          "id": "owasp-llm-top10",
          "old": "https://genai.owasp.org/llm-top-10/",
          "url": "https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/",
          "why": "原链接仍指向 2025 版；换成 2026 版。"
        },
        {
          "id": "karpathy-nanochat",
          "old_id": "karpathy-nanogpt",
          "old": "https://github.com/karpathy/nanoGPT",
          "url": "https://github.com/karpathy/nanochat",
          "why": "nanoGPT 的 README 已标明弃用，作者指引改用 nanochat。GitHub API stars=60643，默认分支最近提交 2026-07-03T22:54:57Z（新加坡时间 2026-07-04）。"
        },
        {
          "id": "cs229",
          "old": "https://cs229.stanford.edu/",
          "url": "https://cs229.stanford.edu/main_notes.pdf",
          "why": "当前首页是需斯坦福邮箱登录的在授课程门户；改链公开可下载的主讲义 PDF。"
        },
        {
          "id": "google-cloud-ml",
          "old": "https://cloud.google.com/learn/training/machinelearning-ai",
          "url": "https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning",
          "why": "原培训目录页不够具体；改链官方 MLOps 持续交付与自动化流水线架构文档。"
        },
        {
          "id": "fsdl",
          "old": "https://fullstackdeeplearning.com/",
          "url": "https://fullstackdeeplearning.com/course/2022/",
          "why": "原链接是站点首页；改链 2022 年课程页，这才是可学的教材入口。"
        },
        {
          "id": "a16z-ai",
          "old": "https://a16z.com/ai/",
          "url": "https://a16z.com/leaders-gainers-and-unexpected-winners-in-the-enterprise-ai-arms-race/",
          "why": "原链接是专栏入口；改链 2026-01-30 的第三期企业 AI / CIO 调研文章。"
        },
        {
          "id": "privacy-guides",
          "old": "https://www.privacyguides.org/en/",
          "url": "https://www.privacyguides.org/en/ai-chat/",
          "why": "原链接是站点总首页；改链 AI 聊天隐私专题页。"
        },
        {
          "id": "eff-ai",
          "old": "https://www.eff.org/issues/ai",
          "url": "https://www.eff.org/deeplinks/2025/10/when-ai-and-secure-chat-meet-users-deserve-strong-controls-over-how-they-interact",
          "why": "原链接是议题总页；改链 2025-10 关于 AI 与安全聊天的专题文章。"
        },
        {
          "id": "waytoagi",
          "old": "https://www.waytoagi.com/",
          "url": "https://www.waytoagi.com/zh",
          "why": "改链中文版入口，并去掉推荐语里不准确的「开源」表述。"
        },
        {
          "id": "google-gemini-prompt-tips",
          "old": "https://support.google.com/a/users/answer/14200040",
          "url": "https://workspace.google.com/intl/en/resources/ai/writing-effective-prompts/",
          "why": "改链现行 Workspace 提示词指南；原文并不使用「角色、任务、上下文与格式」四要素说法。"
        },
        {
          "id": "notebooklm",
          "old": "https://notebook.google/",
          "url": "https://support.google.com/gemininotebook/answer/16206563",
          "why": "产品已改名 Gemini Notebook；从产品主页改链官方帮助文档。"
        },
        {
          "id": "ms-copilot-help",
          "old": "https://support.microsoft.com/en-us/microsoft-365-copilot/",
          "url": "https://support.microsoft.com/en-us/microsoft-365-copilot/create-content-using-microsoft-365-copilot-chat",
          "why": "原链接是混合帮助门户；改链「用 Copilot Chat 创建内容」专题页，并修正「实用模板库」的过满表述。"
        },
        {
          "id": "zapier-ai",
          "old": "https://zapier.com/ai",
          "url": "https://help.zapier.com/hc/en-us/articles/8496342944013-Use-AI-by-Zapier-to-analyze-and-return-data",
          "why": "原链接是产品落地页；改链官方帮助文档。"
        }
      ],
      "moved": [
        "3b1b-nn",
        "ai-red-teaming-roadmap",
        "anthropic-constitutional-ai",
        "awesome-llm",
        "bge-flagembedding",
        "bluedot-impact",
        "boba-ai",
        "claude-constitution",
        "claude-evals-guide",
        "claude-prompt-best-practices",
        "cs224n",
        "dair-ai-papers",
        "datawhale-agent-hub",
        "datawhale-all-in-rag",
        "dlai-rag",
        "eugene-yan-evals",
        "graphrag",
        "hf-llm-course",
        "hf-trl",
        "huyenchip-llm-eng",
        "illustrated-transformer",
        "instructor",
        "langgraph",
        "mcp-servers",
        "nist-ai-rmf",
        "openai-evals-guide",
        "transformer-explainer",
        "vercel-ai-sdk",
        "wandb",
        "zh-d2l"
      ],
      "reason_edits": [
        "anthropic-constitutional-ai",
        "awesome-llm",
        "bentoml",
        "boba-ai",
        "claude-platform-docs",
        "dlai-rag",
        "eugene-yan-llm-patterns",
        "google-gemini-prompt-tips",
        "hf-smol-course",
        "hf-trl",
        "huyenchip-llm-eng",
        "ibm-carbon-ai",
        "mcp-servers",
        "mml-book",
        "ms-copilot-help",
        "sglang",
        "transformer-explainer",
        "vllm",
        "waytoagi"
      ],
      "renamed": [
        {
          "old": "karpathy-nanogpt",
          "new": "karpathy-nanochat"
        }
      ]
    },
    "backfill_2026_11_18": {
      "added": [
        {
          "id": "ant-design-x-spec",
          "title": "RICH 设计范式简介 - Ant Design X",
          "url": "https://x.ant.design/docs/spec/introduce/",
          "station": "product/ai-ux/build",
          "why": "P2 实战：官方中英双语 AI 界面规范，可直接用于设计交付。配套仓库 ant-design/x 最近提交 2026-10-29。"
        },
        {
          "id": "fluent-copilot-kits",
          "title": "Design - Fluent 2 Design System",
          "url": "https://fluent2.microsoft.design/get-started/design",
          "station": "product/ai-ux/build",
          "why": "P2 实战：不用 Fluent 2 总首页，改用写明 Copilot UI Kits 的官方设计入门页。"
        },
        {
          "id": "pair-explorables",
          "title": "AI Explorables | PAIR",
          "url": "https://pair.withgoogle.com/explorables/",
          "station": "product/ai-ux/build",
          "why": "P2 实战：与已有 PAIR Guidebook 不同，这是可动手的交互实验集。"
        },
        {
          "id": "aisafety-book",
          "title": "AI Safety, Ethics, and Society Textbook",
          "url": "https://www.aisafetybook.com/",
          "station": "model/research/intro",
          "why": "M3 入门：权威免费教材，补齐只剩 MML 书之后的安全/对齐入门。"
        },
        {
          "id": "neel-nanda-mi-glossary",
          "title": "A Comprehensive Mechanistic Interpretability Explainer & Glossary",
          "url": "https://www.neelnanda.io/mechanistic-interpretability/glossary",
          "station": "model/research/intro",
          "why": "M3 入门：一手术语与概念讲解，为后续 Transformer Circuits / TransformerLens 做铺垫。"
        },
        {
          "id": "stanford-ai-index-2026",
          "title": "The 2026 AI Index Report | Stanford HAI",
          "url": "https://hai.stanford.edu/ai-index/2026-ai-index-report",
          "station": "everyone/literacy/adv",
          "why": "E1 进阶：不用 JS 渲染不完整的总览页，改链 2026 年报告专页（PDF 亦已验证 200）。"
        },
        {
          "id": "oecd-ai-principles",
          "title": "AI Principles Overview - OECD.AI",
          "url": "https://oecd.ai/en/ai-principles",
          "station": "everyone/literacy/adv",
          "why": "E1 进阶：政府间官方原则页，2026-11-18 curl 返回 200（初稿曾因 TLS 问题未收入）。"
        },
        {
          "id": "ms-learn-rag",
          "title": "RAG and Generative AI - Foundry IQ (Azure AI Search) | Microsoft Learn",
          "url": "https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview",
          "station": "eng/rag/intro",
          "why": "A2 入门：官方概念与流程说明，比厂商博客更稳；文中会结合 Azure AI Search，推荐语已如实写出。"
        },
        {
          "id": "haystack",
          "title": "deepset-ai/haystack",
          "url": "https://github.com/deepset-ai/haystack",
          "station": "eng/rag/build",
          "why": "A2 实战：与 Dify / RAGFlow 这类应用平台互补的生产级编排框架。GitHub API stars=27037，最近提交 2026-11-17T15:56:18Z。"
        },
        {
          "id": "evidently-llm-eval",
          "title": "LLM evaluation: a beginner's guide",
          "url": "https://www.evidentlyai.com/llm-guide/llm-evaluation",
          "station": "eng/evals/intro",
          "why": "A4 入门：可打开的入门指南，页面显示 2026-05-19 更新。未采用 Hugging Face evaluation-guidebook 仓库，因其 README 已声明停止维护。"
        },
        {
          "id": "transformer-lens",
          "title": "TransformerLensOrg/TransformerLens",
          "url": "https://github.com/TransformerLensOrg/TransformerLens",
          "station": "model/research/build",
          "why": "M3 实战：可动手的机制可解释性工具库。GitHub API stars=4080，默认分支最近提交 2026-11-09T17:26:57Z（新加坡时间 2026-11-10）。"
        },
        {
          "id": "google-managing-ml-projects",
          "title": "Managing ML projects | Machine Learning | Google for Developers",
          "url": "https://developers.google.com/machine-learning/managing-ml-projects",
          "station": "product/trunk/intro",
          "why": "P 主干：官方项目管理课，补在 PAIR 指南与 AI for Everyone 之外。未采用内容无法用 curl 核实的 Reforge 页面，也未采用已停更（2022）的 IBM Design for AI 门户。"
        },
        {
          "id": "nist-ai-rmf-playbook",
          "title": "AI RMF Playbook - AIRC",
          "url": "https://airc.nist.gov/airmf-resources/playbook/",
          "station": "product/ai-pm/build",
          "why": "P1 实战：与已有 NIST AI RMF 配套的可执行手册。"
        },
        {
          "id": "gemini-privacy-hub",
          "title": "Gemini Apps Privacy Hub - Gemini Apps Help",
          "url": "https://support.google.com/gemini/answer/13594961",
          "station": "everyone/literacy/build",
          "why": "E1 实战：面向普通用户的官方隐私说明，2026-11-17 更新。未采用 2024-02 后未见复审、且主要写给机构管理者的 NCSC 指南。"
        },
        {
          "id": "mollick-prompt-library",
          "title": "Prompt Library — More Useful Things: AI Resources",
          "url": "https://www.moreusefulthings.com/prompts",
          "station": "everyone/workflow/adv",
          "why": "E2 进阶：公认的非开发者提示词库。页面可核实授权与分类；站点页脚仍写 copyright 2024，推荐语不宣称未核实的 2026 更新。"
        }
      ],
      "method": "agy（gemini-4-hydrogen-medium）给出候选，执行器逐条 curl -L 核实 HTTP 200，GitHub 仓库用 API 或 commits.atom 记录 star 与最近提交。不编造资源或数字。落选说明见各条 why。",
      "count": 15
    },
    "review_2_2026_11_18": {
      "source": "resources-review-2.md；已批准全部 6 项修复，并将 pair-explorables 移至 M3 进阶而非删除。",
      "changes": [
        "1. 用 Microsoft Copilot Prompt Gallery 替换已停更的 mollick-prompt-library（E2 进阶）。 旧链 https://www.moreusefulthings.com/prompts ；新链 https://adoption.microsoft.com/en-us/copilot/prompt-gallery/ （curl 200）。 新 id：ms-copilot-prompt-gallery，短名 Copilot提示库。",
        "2. 将 pair-explorables 从 P2 实战挪到 M3 进阶（不删除），并修正推荐语，去掉「方便设计团队建立直觉」。",
        "2b. 在 P2 实战补入 NN/g《Test Complex Interactions Earlier with AI Prototyping》 https://www.nngroup.com/articles/test-earlier-with-ai/ （curl 200）。短名 NN/g原型测试。",
        "3. 将 fluent-copilot-kits 的链接从 Figma 套件启用说明改为同站 Responsible AI 页 https://fluent2.microsoft.design/responsible-AI（curl 200）。标题与推荐语已更新，短名改为 Fluent负责任AI。id 保持不变。",
        "4. 删除已停更、且不属于数学基础的 neel-nanda-mi-glossary。",
        "4b. 将 aisafety-book 挪到 M3 进阶，推荐语把「主编」改为「撰写」（作者为 Dan Hendrycks）。",
        "4c. 在 M3 入门补入 3Blue1Brown《Essence of Linear Algebra》 https://www.3blue1brown.com/lessons/vectors/ （curl 200）。短名 3B1B线性代数。",
        "4d. 在 M3 入门补入 MIT OCW 18.06SC Linear Algebra（Gilbert Strang） https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/ （curl 200）。短名 MIT线性代数课。",
        "5. 将 evidently-llm-eval 从 A4 入门挪到 A4 进阶；短名改为 LLM评测指南，避免继续叫「入门」。",
        "5b. 在 A4 入门补入 traceloop/openllmetry https://github.com/traceloop/openllmetry （curl 200）。 GitHub API：7541★，默认分支最近提交 2026-11-16T19:09:37Z（新加坡时间 2026-11-17）。"
      ],
      "expected_total": 159
    },
    "interview_2026_11_18": {
      "source": "interview-review.md + 终审批准（A/M 线设面试终点站；不收录 amit 与 landed；增补 Stanford CS336 与 How To Scale Your Model）",
      "stage_structure": "A single line-level terminal station per line, stored as lines[].trunk.interview (A 面试, M 面试). Not added to branches[].stops, and not added on P or E. Trunk already held the shared intro; interview is the shared terminus after all branches' 实战.",
      "added": [
        "alexey-ai-eng-field-guide",
        "aiml-interviews",
        "datawhale-llm-interview",
        "chiphuyen-ml-interviews",
        "chiphuyen-dmls-book",
        "bojie-llm-interview-200",
        "stanford-cs336",
        "jax-scaling-book"
      ],
      "dropped_candidates": [
        {
          "id": "amit-ai-eng-interview-qs",
          "why": "几乎只有题干，答案外链大量指向 Outcome School，作为引流目录删除。"
        },
        {
          "id": "landed-ai-eng-interview",
          "why": "推广重，星数低，权威不足，删除。"
        }
      ],
      "counts": {
        "added": 8,
        "expected_total": 167
      },
      "chip_book_numbers": {
        "system_design_questions": 27,
        "answers_about_10_percent": true,
        "confirmed_on_page": true,
        "notes": "面试书开篇仍写「30 open-ended questions」。目标页 https://huyenchip.com/machine-learning-systems-design/exercises.html 按一级条目计为 27 道（Duolingo 条下另有 2 道子问题）。约 10% 有答案，摘自 https://huyenchip.com/ml-interviews-book/contents/0-about-the-answers.html 原句：The first draft of the book has the answers for about 10% of all the questions."
      }
    },
    "era_2026_11_18": {
      "added": {
        "chiphuyen-ml-interviews": "2021 年基础题库",
        "chiphuyen-dmls-book": "2022 年，经典 ML 系统设计",
        "mit-ocw-1806sc": "2011 年秋季学期存档",
        "attention-paper": "2017 年奠基论文",
        "illustrated-transformer": "2018 年经典图解长文",
        "mml-book": "2020 年出版",
        "cs324": "2022 年冬季存档",
        "fsdl": "2022 课程",
        "anthropic-constitutional-ai": "2022 年研究介绍",
        "lilian-weng-prompt": "2023 年经典综述",
        "lilian-weng-agents": "2023 年经典长文",
        "awesome-llm": "截至 2025 年的历史索引"
      },
      "note": "可选字段。只给推荐语里已标明年代、且年代标签仍然有意义的较旧资源；2025–2026 年的现行材料不加。"
    }
  }
};
window.ALP_FEATURED = {"byBranch": {"A1": ["openai-prompt-guide", "anthropic-context-eng", "litellm"], "A2": ["ms-learn-rag", "llamaindex", "ragflow"], "A3": ["effective-agents", "mcp-docs", "langgraph"], "A4": ["langfuse", "hamel-evals", "inspect-ai"], "M1": ["karpathy-zero-to-hero", "hf-llm-course", "llama-factory"], "M2": ["scikit-learn-guide", "islp-book", "xgboost-docs"], "M3": ["mml-book", "attention-paper", "transformer-circuits"], "M4": ["mlflow", "deepspeed", "vllm"], "P1": ["gen-ai-for-everyone", "applied-llms", "nist-ai-rmf"], "P2": ["pair-patterns", "shape-of-ai", "ant-design-x-spec"], "E1": ["ai-for-everyone", "stanford-ai-index-2026", "privacy-guides"], "E2": ["google-gemini-prompt-tips", "notebooklm", "zapier-ai"]}, "errors": []};
