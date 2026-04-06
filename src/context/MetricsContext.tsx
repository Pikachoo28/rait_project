"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from "react";

import { mockMetrics } from "@/data/mockMetrics";
import { buildMetricFromFormValues } from "@/lib/metrics";
import { Metric, MetricFormValues, MetricStatus } from "@/types/metric";

interface MetricsState {
  metrics: Metric[];
}

type MetricsAction =
  | {
      type: "SAVE_METRIC";
      values: MetricFormValues;
      status: MetricStatus;
      existingMetricId?: string;
    }
  | {
      type: "REHYDRATE_METRICS";
      metrics: Metric[];
    }
  | {
      type: "UPDATE_STATUS";
      metricId: string;
      status: MetricStatus;
    };

interface MetricsContextValue {
  metrics: Metric[];
  getMetricById: (metricId: string) => Metric | undefined;
  saveMetric: (
    values: MetricFormValues,
    status: MetricStatus,
    existingMetricId?: string
  ) => Metric;
  updateMetricStatus: (metricId: string, status: MetricStatus) => void;
}

const MetricsContext = createContext<MetricsContextValue | null>(null);
const METRICS_STORAGE_KEY = "rait-metrics-store";

const metricsReducer = (state: MetricsState, action: MetricsAction): MetricsState => {
  switch (action.type) {
    case "REHYDRATE_METRICS":
      return {
        metrics: action.metrics
      };
    case "SAVE_METRIC": {
      const existingMetric = state.metrics.find((metric) => metric.id === action.existingMetricId);
      const nextMetric = buildMetricFromFormValues(action.values, action.status, existingMetric);
      const existingIndex = state.metrics.findIndex((metric) => metric.id === nextMetric.id);

      if (existingIndex === -1) {
        return {
          metrics: [nextMetric, ...state.metrics]
        };
      }

      const nextMetrics = [...state.metrics];
      nextMetrics[existingIndex] = nextMetric;

      return {
        metrics: nextMetrics
      };
    }
    case "UPDATE_STATUS":
      return {
        metrics: state.metrics.map((metric) =>
          metric.id === action.metricId
            ? {
                ...metric,
                status: action.status,
                updatedAt: new Date().toISOString()
              }
            : metric
        )
      };
    default:
      return state;
  }
};

interface MetricsProviderProps {
  children: ReactNode;
}

export const MetricsProvider = ({ children }: MetricsProviderProps) => {
  const [state, dispatch] = useReducer(metricsReducer, {
    metrics: mockMetrics
  });
  const [hasHydratedFromStorage, setHasHydratedFromStorage] = useState(false);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(METRICS_STORAGE_KEY);

      if (!storedValue) {
        setHasHydratedFromStorage(true);
        return;
      }

      const parsedValue = JSON.parse(storedValue) as MetricsState;

      if (Array.isArray(parsedValue.metrics)) {
        dispatch({
          type: "REHYDRATE_METRICS",
          metrics: parsedValue.metrics
        });
      }
    } catch {
      // Ignore malformed local state and recover from the bundled seed data.
    } finally {
      setHasHydratedFromStorage(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydratedFromStorage) {
      return;
    }

    try {
      window.localStorage.setItem(
        METRICS_STORAGE_KEY,
        JSON.stringify({
          metrics: state.metrics
        })
      );
    } catch {
      // Ignore write failures and keep the in-memory store available.
    }
  }, [hasHydratedFromStorage, state.metrics]);

  const value = useMemo<MetricsContextValue>(
    () => ({
      metrics: state.metrics,
      getMetricById: (metricId: string) => state.metrics.find((metric) => metric.id === metricId),
      saveMetric: (values, status, existingMetricId) => {
        const existingMetric = state.metrics.find((metric) => metric.id === existingMetricId);
        const nextMetric = buildMetricFromFormValues(values, status, existingMetric);

        dispatch({
          type: "SAVE_METRIC",
          values,
          status,
          existingMetricId
        });

        return nextMetric;
      },
      updateMetricStatus: (metricId, status) => {
        dispatch({
          type: "UPDATE_STATUS",
          metricId,
          status
        });
      }
    }),
    [state.metrics]
  );

  return <MetricsContext.Provider value={value}>{children}</MetricsContext.Provider>;
};

export const useMetrics = (): MetricsContextValue => {
  const context = useContext(MetricsContext);

  if (!context) {
    throw new Error("useMetrics must be used within MetricsProvider.");
  }

  return context;
};
