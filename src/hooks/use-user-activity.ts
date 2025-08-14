"use client";

import { useState, useEffect, useCallback } from "react";

const BROWSING_HISTORY_KEY = "aqm_browsing_history";
const SEARCH_QUERIES_KEY = "aqm_search_queries";
const MAX_HISTORY_LENGTH = 20;

const getStorageValue = (key: string, defaultValue: string[]): string[] => {
  if (typeof window === "undefined") {
    return defaultValue;
  }
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

const setStorageValue = (key: string, value: string[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export function useUserActivity() {
  const [browsingHistory, setBrowsingHistory] = useState<string[]>([]);
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setBrowsingHistory(getStorageValue(BROWSING_HISTORY_KEY, []));
    setSearchQueries(getStorageValue(SEARCH_QUERIES_KEY, []));
  }, []);

  const addBrowsingHistory = useCallback((productName: string) => {
    if (!isMounted) return;
    setBrowsingHistory((prev) => {
      const newHistory = [productName, ...prev.filter(p => p !== productName)].slice(0, MAX_HISTORY_LENGTH);
      setStorageValue(BROWSING_HISTORY_KEY, newHistory);
      return newHistory;
    });
  }, [isMounted]);

  const addSearchQuery = useCallback((query: string) => {
    if (!isMounted) return;
    setSearchQueries((prev) => {
      const newQueries = [query, ...prev.filter(q => q.toLowerCase() !== query.toLowerCase())].slice(0, MAX_HISTORY_LENGTH);
      setStorageValue(SEARCH_QUERIES_KEY, newQueries);
      return newQueries;
    });
  }, [isMounted]);
  
  const historyAsString = isMounted ? browsingHistory.join(', ') : '';
  const queriesAsString = isMounted ? searchQueries.join(', ') : '';

  return { 
      browsingHistory: historyAsString, 
      searchQueries: queriesAsString,
      addBrowsingHistory, 
      addSearchQuery 
  };
}
