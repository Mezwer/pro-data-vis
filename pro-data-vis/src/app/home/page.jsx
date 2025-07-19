"use client";
import React from "react";
import { BarChart3, LineChart, PieChart, Globe } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground/ParticleBackground.jsx";

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-gray-950/90 text-gray-100">
      <ParticleBackground />

      <header className="relative">
        <nav className="sticky top-0 border-b border-gray-800/50 bg-gray-900/40 backdrop-blur-lg supports-[backdrop-filter]:bg-gray-900/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between"></div>
          </div>
        </nav>

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              See the data of the
              <span className="text-blue-400"> pros </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
              Visual representation of professional League of Legends statistics
              across the four major regions: LCK, LPL, LEC, LCS.
            </p>
          </div>
        </div>
      </header>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-400/20 bg-gray-800/40 p-6 backdrop-blur-sm">
              <LineChart className="h-12 w-12 text-blue-400" />
              <h3 className="mt-4 text-xl font-semibold">
                Real-time Analytics
              </h3>
              <p className="mt-2 text-gray-300">
                Watch your data come to life with real-time updates and
                interactive dashboards.
              </p>
            </div>
            <div className="rounded-lg border border-gray-400/20 bg-gray-800/40 p-6 backdrop-blur-sm">
              <PieChart className="h-12 w-12 text-blue-400" />
              <h3 className="mt-4 text-xl font-semibold">Custom Charts</h3>
              <p className="mt-2 text-gray-300">
                Choose from dozens of chart types and customize every aspect of
                your visualizations.
              </p>
            </div>
            <div className="rounded-lg border border-gray-400/20 bg-gray-800/40 p-6 backdrop-blur-sm">
              <Globe className="h-12 w-12 text-blue-400" />
              <h3 className="mt-4 text-xl font-semibold">Global Insights</h3>
              <p className="mt-2 text-gray-300">
                Visualize geographical data with interactive maps and
                location-based analytics.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
