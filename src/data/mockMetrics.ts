import { Metric, MetricFormValues } from "@/types/metric";

export const mockMetrics: Metric[] = [
  {
    id: "demographic-parity",
    status: "active",
    createdAt: "2026-03-02T08:10:00.000Z",
    updatedAt: "2026-04-03T09:00:00.000Z",
    latestReading: 0.9,
    basicDetails: {
      name: "Demographic Parity",
      category: "Fairness",
      description:
        "Measures whether positive prediction outcomes are balanced across protected demographic groups.",
      applicableSystemTypes: ["Classification", "Recommendation"]
    },
    measurementConfig: {
      dataSourceType: "Database query",
      measurementFrequency: "Daily",
      thresholdDirection: "higher",
      minimumValue: 0.85,
      targetValue: 0.92,
      unit: "score"
    },
    alertsOwnership: {
      owner: "Sarah Chen",
      alertRecipients: ["sarah.chen@company.com", "rai-ops@company.com"],
      alertConditions: ["Below minimum threshold", "Configuration change"],
      escalationPolicy: "Notify compliance team"
    }
  },
  {
    id: "model-explainability-score",
    status: "active",
    createdAt: "2026-02-21T10:30:00.000Z",
    updatedAt: "2026-04-02T11:45:00.000Z",
    latestReading: 0.76,
    basicDetails: {
      name: "Model Explainability Score",
      category: "Transparency",
      description:
        "Tracks coverage and quality of feature attribution outputs available to reviewers and impacted teams.",
      applicableSystemTypes: ["Classification", "NLP"]
    },
    measurementConfig: {
      dataSourceType: "API endpoint",
      measurementFrequency: "Weekly",
      thresholdDirection: "higher",
      minimumValue: 0.7,
      targetValue: 0.82,
      unit: "score"
    },
    alertsOwnership: {
      owner: "James Okafor",
      alertRecipients: ["james.okafor@company.com"],
      alertConditions: ["Below minimum threshold", "Data unavailable"],
      escalationPolicy: "Notify manager"
    }
  },
  {
    id: "adversarial-robustness-index",
    status: "draft",
    createdAt: "2026-03-11T07:15:00.000Z",
    updatedAt: "2026-04-04T06:50:00.000Z",
    latestReading: 0.84,
    basicDetails: {
      name: "Adversarial Robustness Index",
      category: "Robustness",
      description:
        "Quantifies resistance to adversarial perturbations across critical model decision pathways.",
      applicableSystemTypes: ["Computer Vision", "Classification"]
    },
    measurementConfig: {
      dataSourceType: "SDK integration",
      measurementFrequency: "On-demand",
      thresholdDirection: "higher",
      minimumValue: 0.9,
      targetValue: 0.96,
      unit: "score"
    },
    alertsOwnership: {
      owner: "Priya Sharma",
      alertRecipients: ["priya.sharma@company.com", "security-ai@company.com"],
      alertConditions: ["Below minimum threshold", "Configuration change"],
      escalationPolicy: "Block deployment"
    }
  },
  {
    id: "pii-exposure-rate",
    status: "active",
    createdAt: "2026-01-17T14:10:00.000Z",
    updatedAt: "2026-04-01T16:00:00.000Z",
    latestReading: 0.012,
    basicDetails: {
      name: "PII Exposure Rate",
      category: "Privacy",
      description:
        "Measures the rate at which model outputs contain personally identifiable information above approved limits.",
      applicableSystemTypes: ["Generative AI", "NLP"]
    },
    measurementConfig: {
      dataSourceType: "API endpoint",
      measurementFrequency: "Real-time",
      thresholdDirection: "lower",
      minimumValue: 0.01,
      targetValue: 0.005,
      unit: "rate"
    },
    alertsOwnership: {
      owner: "David Bates",
      alertRecipients: ["david.bates@company.com", "privacy-office@company.com"],
      alertConditions: ["Below minimum threshold", "Data unavailable"],
      escalationPolicy: "Notify compliance team"
    }
  },
  {
    id: "decision-audit-trail-coverage",
    status: "archived",
    createdAt: "2025-12-09T09:05:00.000Z",
    updatedAt: "2026-03-28T13:20:00.000Z",
    latestReading: 0.99,
    basicDetails: {
      name: "Decision Audit Trail Coverage",
      category: "Accountability",
      description:
        "Tracks the percentage of automated decisions that retain a complete evidence trail for internal audit.",
      applicableSystemTypes: ["Classification", "Recommendation"]
    },
    measurementConfig: {
      dataSourceType: "Database query",
      measurementFrequency: "Monthly",
      thresholdDirection: "higher",
      minimumValue: 0.95,
      targetValue: 0.98,
      unit: "coverage"
    },
    alertsOwnership: {
      owner: "Nishil Patel",
      alertRecipients: ["nishil.patel@company.com"],
      alertConditions: ["Approaching minimum threshold", "Configuration change"],
      escalationPolicy: "None"
    }
  },
  {
    id: "hallucination-rate",
    status: "active",
    createdAt: "2026-02-06T12:40:00.000Z",
    updatedAt: "2026-04-05T07:25:00.000Z",
    latestReading: 0.041,
    basicDetails: {
      name: "Hallucination Rate",
      category: "Safety",
      description:
        "Measures the proportion of generated responses that contain unsupported or fabricated claims.",
      applicableSystemTypes: ["Generative AI", "NLP"]
    },
    measurementConfig: {
      dataSourceType: "Manual upload",
      measurementFrequency: "Weekly",
      thresholdDirection: "lower",
      minimumValue: 0.05,
      targetValue: 0.03,
      unit: "rate"
    },
    alertsOwnership: {
      owner: "Gaurav Malhotra",
      alertRecipients: ["gaurav.malhotra@company.com", "safety-review@company.com"],
      alertConditions: ["Below minimum threshold", "Data unavailable"],
      escalationPolicy: "Notify manager"
    }
  }
];

export const createEmptyMetricFormValues = (): MetricFormValues => ({
  basicDetails: {
    name: "",
    category: "Fairness",
    description: "",
    applicableSystemTypes: []
  },
  measurementConfig: {
    dataSourceType: "API endpoint",
    measurementFrequency: "Daily",
    thresholdDirection: "higher",
    minimumValue: null,
    targetValue: null,
    unit: ""
  },
  alertsOwnership: {
    owner: "",
    alertRecipients: [],
    alertConditions: [],
    escalationPolicy: "None"
  }
});
