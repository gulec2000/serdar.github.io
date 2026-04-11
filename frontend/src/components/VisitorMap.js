import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebaseConfig.ts";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import * as d3 from "d3";
import * as topojson from "topojson-client";

export default function VisitorMap() {
  const mapRef = useRef(null);
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "visitors"), orderBy("timestamp", "desc"), limit(100));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setVisitors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const svg = d3.select(mapRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 300;
    const projection = d3.geoNaturalEarth1().scale(100).translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((data) => {
      const countries = topojson.feature(data, data.objects.countries);

      // Draw countries
      svg.append("g")
        .selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#18181b") // zinc-900
        .attr("stroke", "#27272a") // zinc-800
        .attr("stroke-width", 0.5);

      // Draw visitor points
      svg.append("g")
        .selectAll("circle")
        .data(visitors)
        .enter()
        .append("circle")
        .attr("cx", d => projection([d.lng, d.lat])?.[0] || 0)
        .attr("cy", d => projection([d.lng, d.lat])?.[1] || 0)
        .attr("r", 3)
        .attr("fill", "#f59e0b") // amber-500
        .attr("opacity", 0.6)
        .append("title")
        .text(d => `${d.city}, ${d.country}`);
      
      // Pulse effect for the latest visitor
      if (visitors.length > 0) {
        const latest = visitors[0];
        const pos = projection([latest.lng, latest.lat]);
        if (pos) {
          svg.append("circle")
            .attr("cx", pos[0]).attr("cy", pos[1]).attr("r", 3)
            .attr("fill", "none").attr("stroke", "#f59e0b").attr("stroke-width", 1.5)
            .transition().duration(2000).attr("r", 15).attr("opacity", 0).remove();
        }
      }
    });
  }, [visitors]);

  return (
    <div className="w-full bg-zinc-950/50 border border-zinc-800 rounded-sm p-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">Global Traffic Map</h4>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-mono text-[9px] text-zinc-600 uppercase">Live</span>
        </div>
      </div>
      <div className="relative aspect-[2/1] overflow-hidden">
        <svg ref={mapRef} viewBox="0 0 600 300" className="w-full h-full" />
      </div>
    </div>
  );
}