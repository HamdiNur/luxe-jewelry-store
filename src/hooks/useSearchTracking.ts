import { useEffect, useRef } from "react";
import { track } from "@/services/analytics";

export function useSearchTracking(query: string, resultsCount: number, source: "home" | "explore") {
  const countRef = useRef(resultsCount);
  countRef.current = resultsCount;
  const lastSent = useRef("");

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      lastSent.current = "";
      return;
    }
    if (q === lastSent.current) return;

    const timer = setTimeout(() => {
      lastSent.current = q;
      track("search_performed", { query: q.slice(0, 50), results_count: countRef.current, source });
    }, 800);

    return () => clearTimeout(timer);
  }, [query, source]);
}