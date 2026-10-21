"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  GitBranch, 
  Search, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  Clock, 
  Plus,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import { HYPOTHESES, Hypothesis } from "@/data/nexusData";

export default function HypothesesPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [hypothesesList, setHypothesesList] = useState<Hypothesis[]>(HYPOTHESES);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [discoverySuccessNotice, setDiscoverySuccessNotice] = useState<string | null>(null);

  const statuses = ["ALL", "UNDER INVESTIGATION", "VALIDATED", "UNDER REVIEW", "HYPOTHESIS"];

  const filteredHypotheses = hypothesesList.filter((h) => {
    const matchesStatus = selectedStatus === "ALL" || h.status === selectedStatus;
    const matchesQuery = 
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.sources.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      h.leadInvestigator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const handleSynthesizeNew = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      const newHyp: Hypothesis = {
        id: `hyp-${Math.floor(Math.random() * 900 + 100)}`,
        code: `#${Math.floor(Math.random() * 80 + 150)}`,
        title: "Micro-Gravity Seismic Resonances vs Atmospheric Radon Gas Flux",
        headline: "Deep borehole continuous radon emissions exhibit 72-hour phase-coupled anomalies preceding intraplate micro-seismic swarms.",
        status: "HYPOTHESIS",
        bayesFactor: 3.48,
        bayesRating: "MODERATE",
        correlation: "r = +0.46",
        correlationType: "Spearman",
        pValue: "p = 0.0021",
        sampleSize: "n = 14,800",
        sources: ["USGS Geophysics", "CERN Radon Monitors", "INGV Italy"],
        leadInvestigator: "Dr. Elena Rostova",
        institution: "Division of Atmospheric Epidemiology",
        verificationHash: `SHA256: ${Math.random().toString(36).substring(2, 8)}-${Math.random().toString(36).substring(2, 8)}`,
        updatedTime: "Just now",
        formula: "y = 2.14x + 16.3",
        rSquared: 0.54,
        ci95: "95% CI [0.38, 0.52]",
        residualStdErr: 0.18,
        methodologyNote: "Autonomous synthesis match detected across CERN subatomic trigger baselines and USGS National Seismic Network feeds.",
        causalChain: {
          exposure: {
            name: "USGS Borehole Radon Sensors",
            source: "USGS Geochemistry Array",
            desc: "Continuous alpha spectrometry scintillation measurements.",
            cadence: "10-Minute",
            coverage: "2020–2026",
            qa: "Calibrated Ionization",
          },
          lag: {
            duration: "+72h",
            tau: 0.388,
          },
          outcome: {
            name: "Micro-Seismic Energy Release Magnitude",
            icdCodes: "GEO-Mw-0.5 to Mw-2.5",
            desc: "Cumulative seismic moment release in 50km radius.",
            admissions: "1,200 Swarm Events",
            ageCut: "Crustal < 15km",
            resolution: "Fault Zone Coordinates",
          },
          socioeconomic: {
            name: "Tectonic Strain Rate",
            source: "Plate Boundary Observatory GPS",
            desc: "Annual horizontal strain velocity vectors.",
            threshold: "Strain Rate > 15 nanostrain/yr",
          },
        },
      };

      setHypothesesList([newHyp, ...hypothesesList]);
      setIsSynthesizing(false);
      setDiscoverySuccessNotice(`New Statistical Connection Detected: ${newHyp.code} — ${newHyp.title}`);
      setTimeout(() => setDiscoverySuccessNotice(null), 5000);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. TOP HEADER & FILTER BAR */}
      <section className="w-full bg-[var(--surface-lowest)] border-b border-[var(--outline-variant)]/60 px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono-data text-[var(--outline)]">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-[var(--primary)] uppercase font-semibold">
                NEXUS
              </Link>
              <span>/</span>
              <span className="text-[var(--foreground)] uppercase font-bold">
                DISCOVERY ENGINE & HYPOTHESIS PIPELINE
              </span>
            </div>
            <span>TOTAL INDEXED: <strong className="text-[var(--primary)]">{hypothesesList.length} FORMULATIONS</strong></span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[var(--foreground)] tracking-tight">
                Empirical Hypotheses & Cross-Vector Synthesis
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[var(--foreground)]/75 mt-1 max-w-3xl leading-relaxed">
                Autonomous screening scans multi-source public registries, flagging statistically improbable multi-variable correlations for empirical and causal verification.
              </p>
            </div>

            <button
              onClick={handleSynthesizeNew}
              disabled={isSynthesizing}
              className="px-5 py-2.5 bg-[var(--primary)] hover:opacity-90 text-[var(--on-primary)] font-mono-data text-xs uppercase font-semibold tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
            >
              {isSynthesizing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[var(--secondary)]" />
                  <span>SYNTHESIZING VECTORS...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>TRIGGER DISCOVERY SCAN</span>
                </>
              )}
            </button>
          </div>

          {/* Success Banner on New Synthesis */}
          {discoverySuccessNotice && (
            <div className="p-3 bg-[var(--secondary-container)] text-[var(--on-secondary-container)] border border-[var(--secondary)] font-mono-data text-xs flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{discoverySuccessNotice}</span>
              </div>
              <button
                onClick={() => setDiscoverySuccessNotice(null)}
                className="font-bold uppercase text-[10px]"
              >
                DISMISS
              </button>
            </div>
          )}

          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[var(--outline-variant)]/40">
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono-data">
              {statuses.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1 text-[11px] font-semibold uppercase transition-colors rounded ${
                    selectedStatus === st
                      ? "bg-[var(--primary)] text-[var(--on-primary)] shadow-sm"
                      : "bg-[var(--surface-low)] hover:bg-[var(--surface-container)] text-[var(--foreground)] border border-[var(--outline-variant)]/50"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="flex items-center gap-2 bg-[var(--surface-low)] border border-[var(--outline-variant)]/60 px-3 py-1.5 text-xs">
              <Search className="w-3.5 h-3.5 text-[var(--outline)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH VECTORS, SOURCES, INVESTIGATORS..."
                className="bg-transparent font-mono-data text-xs focus:outline-none w-64 uppercase text-[var(--foreground)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[var(--outline)] hover:text-[var(--foreground)] text-[10px] font-mono-data"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. HYPOTHESES MATRIX CARDS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHypotheses.length === 0 ? (
            <div className="col-span-2 text-center py-16 bg-[var(--surface-lowest)] border border-[var(--outline-variant)]/60">
              <div className="font-editorial text-xl font-bold text-[var(--foreground)]">
                No Hypotheses Match Current Criteria
              </div>
              <p className="text-xs font-mono-data text-[var(--outline)] mt-2">
                Try clearing your search query or selecting a different status category.
              </p>
            </div>
          ) : (
            filteredHypotheses.map((hyp) => (
              <div
                key={hyp.id}
                className="bg-[var(--surface-lowest)] p-6 border border-[var(--outline-variant)]/60 shadow-[var(--card-shadow)] flex flex-col justify-between gap-5 hover:border-[var(--primary)] transition-all group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono-data text-xs">
                    <span className="font-bold text-[var(--primary)] text-sm tracking-wider">
                      HYPOTHESIS {hyp.code}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                      hyp.status === "VALIDATED"
                        ? "bg-[var(--secondary-container)] text-[var(--on-secondary-container)]"
                        : hyp.status === "UNDER INVESTIGATION"
                        ? "bg-[var(--surface-high)] text-[var(--primary)]"
                        : "bg-[var(--surface-low)] text-[var(--foreground)]"
                    }`}>
                      {hyp.status}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-semibold text-[var(--foreground)] leading-snug group-hover:text-[var(--primary)] transition-colors">
                    {hyp.title}
                  </h3>

                  <p className="font-sans text-xs text-[var(--foreground)]/80 leading-relaxed">
                    {hyp.headline}
                  </p>

                  {/* Quantitative Metric Pill Strip */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-[var(--surface-low)] border border-[var(--outline-variant)]/40 font-mono-data text-xs mt-1">
                    <div>
                      <div className="text-[9px] text-[var(--outline)] uppercase">COVARIANCE</div>
                      <div className="font-bold text-[var(--primary)] text-sm">{hyp.correlation}</div>
                      <div className="text-[9px] text-[var(--outline)]">{hyp.correlationType}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-[var(--outline)] uppercase">BAYES FACTOR</div>
                      <div className="font-bold text-[var(--secondary)] text-sm">{hyp.bayesFactor}</div>
                      <div className="text-[9px] text-[var(--outline)]">{hyp.bayesRating}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-[var(--outline)] uppercase">SIGNIFICANCE</div>
                      <div className="font-bold text-[var(--foreground)] text-sm">{hyp.pValue}</div>
                      <div className="text-[9px] text-[var(--outline)]">{hyp.sampleSize}</div>
                    </div>
                  </div>

                  {/* Sources List */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-mono-data text-[var(--outline)] uppercase font-semibold">
                      SOURCES:
                    </span>
                    {hyp.sources.map((src, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono-data px-2 py-0.5 bg-[var(--surface-low)] text-[var(--foreground)] border border-[var(--outline-variant)]/40"
                      >
                        {src}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--outline-variant)]/40 flex items-center justify-between">
                  <div className="font-mono-data text-[11px] text-[var(--outline)]">
                    <div>{hyp.leadInvestigator}</div>
                    <div className="text-[9px]">{hyp.verificationHash}</div>
                  </div>

                  <Link
                    href="/investigations"
                    className="px-3.5 py-1.5 bg-[var(--surface-high)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)] text-[var(--foreground)] text-xs font-mono-data font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    <span>OPEN WORKSPACE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
