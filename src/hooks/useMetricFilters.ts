"use client";

import { useState } from "react";

import { Metric, MetricFilterState } from "@/types/metric";

const initialFilters: MetricFilterState = {
  search: "",
  category: "all",
  status: "all"
};

export const useMetricFilters = (metrics: Metric[]) => {
  const [filters, setFilters] = useState<MetricFilterState>(initialFilters);

  const filteredMetrics = metrics.filter((metric) => {
    const matchesSearch = metric.basicDetails.name
      .toLowerCase()
      .includes(filters.search.trim().toLowerCase());
    const matchesCategory =
      filters.category === "all" || metric.basicDetails.category === filters.category;
    const matchesStatus = filters.status === "all" || metric.status === filters.status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return {
    filters,
    filteredMetrics,
    setSearch: (search: string) =>
      setFilters((current) => ({
        ...current,
        search
      })),
    setCategory: (category: MetricFilterState["category"]) =>
      setFilters((current) => ({
        ...current,
        category
      })),
    setStatus: (status: MetricFilterState["status"]) =>
      setFilters((current) => ({
        ...current,
        status
      }))
  };
};
