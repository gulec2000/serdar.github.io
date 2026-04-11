import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import * as d3 from "d3";
import * as topojson from "topojson-client";

export default function VisitorMap() {
  const mapRef = useRef(null);
  const tooltipRef = useRef(null);
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "visitors"),
      orderBy("timestamp", "desc"),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVisitors(docs);
      },
      (error) => {
        console.error("VisitorMap Listener Error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const width = 600;
    const height = 300;
    
    const svg = d3.select(mapRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    const projection = d3.geoNaturalEarth1()
      .scale(100)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Zoom functionality
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Load world map data
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((data) => {
      const countries = topojson.feature(data, data.objects.countries);

      // Draw countries
      g.append("g")
        .selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#18181b") // zinc-900
        .attr("stroke", "#27272a") // zinc-800
        .attr("stroke-width", 0.5);

      // Draw visitor points
      const points = g.append("g")
        .selectAll("circle")
        .data(visitors)
        .enter()
        .append("circle")
        .attr("cx", (d) => projection([d.lng, d.lat])?.[0] || 0)
        .attr("cy", (d) => projection([d.lng, d.lat])?.[1] || 0)
        .attr("r", 3)
        .attr("fill", "#f59e0b") // amber-500
        .attr("opacity", 0.6)
        .style("cursor", "pointer");

      // Tooltip logic
      const tooltip = d3.select(tooltipRef.current);

      points
        .on("mouseover", (event, d) => {
          tooltip
            .style("opacity", 1)
            .html(`
              <div class="bg-zinc-900 border border-zinc-700 p-2 rounded shadow-xl">
                <p class="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">Visitor Location</p>
                <p class="font-mono text-xs text-white font-bold">${d.city}, ${d.country}</p>
              </div>
            `);
          d3.select(event.currentTarget)
            .attr("opacity", 1)
            .attr("r", 5);
        })
        .on("mousemove", (event) => {
          tooltip
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
        })
        .on("mouseout", (event) => {
          tooltip.style("opacity", 0);
          d3.select(event.currentTarget)
            .attr("opacity", 0.6)
            .attr("r", 3);
        });
      
      // Add pulse effect for latest visitor
      if (visitors.length > 0) {
        const latest = visitors[0];
        const pos = projection([latest.lng, latest.lat]);
        if (pos) {
          g.append("circle")
            .attr("cx", pos[0])
            .attr("cy", pos[1])
            .attr("r", 3)
            .attr("fill", "none")
            .attr("stroke", "#f59e0b")
            .attr("stroke-width", 1.5)
            .transition()
            .duration(2000)
            .attr("r", 15)
            .attr("opacity", 0)
            .remove();
        }
      }
    });
  }, [visitors]);

  const getInsights = () => {
    if (visitors.length === 0) return null;

    // Top Countries
    const countryCounts = {};
    visitors.forEach(v => {
      countryCounts[v.country] = (countryCounts[v.country] || 0) + 1;
    });
    const topCountries = Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    // Peak Hour
    const hourCounts = new Array(24).fill(0);
    visitors.forEach(v => {
      if (v.timestamp) {
        const date = v.timestamp.toDate ? v.timestamp.toDate() : new Date(v.timestamp);
        const hour = date.getHours();
        hourCounts[hour]++;
      }
    });
    const peakHour = hourCounts.indexOf(Math.max(...hourCounts));
    const peakLabel = `${peakHour}:00 - ${peakHour + 1}:00`;

    return { topCountries, peakLabel };
  };

  const insights = getInsights();

  return (
    <div className="w-full bg-zinc-950/50 border border-zinc-800 rounded-sm p-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">
          Global Traffic Insights
        </h4>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-mono text-[9px] text-zinc-600 uppercase">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-3">
          <div className="relative aspect-[2/1] overflow-hidden cursor-move bg-zinc-900/20 rounded-sm border border-zinc-800/50">
            <svg 
              ref={mapRef} 
              viewBox="0 0 600 300" 
              className="w-full h-full"
            />
            <div 
              ref={tooltipRef}
              className="fixed pointer-events-none opacity-0 transition-opacity duration-200 z-[100]"
            />
          </div>
          <p className="font-mono text-[8px] text-zinc-600 uppercase mt-2 text-center">
            Scroll to zoom &middot; Drag to pan
          </p>
        </div>

        {/* Insights Section */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-zinc-900/40 border border-zinc-800 p-3 rounded-sm">
            <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-3 border-b border-zinc-800 pb-2">
              Top Countries
            </p>
            <div className="space-y-2">
              {insights?.topCountries.map(([country, count]) => (
                <div key={country} className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-300 truncate pr-2">{country}</span>
                  <span className="font-mono text-[10px] text-amber-500 font-bold">{count}</span>
                </div>
              ))}
              {!insights && <p className="font-mono text-[9px] text-zinc-600 italic">No data yet...</p>}
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-3 rounded-sm">
            <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-3 border-b border-zinc-800 pb-2">
              Peak Activity
            </p>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-zinc-300">{insights?.peakLabel || "N/A"}</span>
              <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-tighter">Local Time (24h)</span>
            </div>
          </div>

          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between bg-amber-500/5 border border-amber-500/10 p-2 rounded-sm">
              <span className="font-mono text-[9px] text-zinc-400 uppercase">Total Samples</span>
              <span className="font-mono text-[10px] text-amber-500 font-bold">{visitors.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
