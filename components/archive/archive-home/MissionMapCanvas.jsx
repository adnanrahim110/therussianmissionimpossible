"use client";

import L from "leaflet";
import { useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";

function getMarkerStyle(isSelected) {
  return {
    color: isSelected ? "#fff8e4" : "#f2a6ab",
    weight: isSelected ? 2 : 1.5,
    fillColor: isSelected ? "#efca6e" : "#cb2f43",
    fillOpacity: isSelected ? 0.95 : 0.85,
    radius: isSelected ? 10 : 7,
  };
}

export function MissionMapCanvas({
  locations,
  selectedLocationId,
  onSelectLocation,
}) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef(new Map());
  const haloRef = useRef(null);
  const initializedRef = useRef(false);
  const selectedLocation = useMemo(
    () =>
      locations.find((location) => location.id === selectedLocationId) ??
      locations[0],
    [locations, selectedLocationId],
  );

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const container = containerRef.current;

    // Hot reload / strict mode can leave a stale leaflet id on the node.
    if (container._leaflet_id) {
      delete container._leaflet_id;
    }

    const map = L.map(container, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      preferCanvas: true,
    });

    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "topright" }).addTo(map);
    L.control.attribution({ position: "bottomleft", prefix: false }).addTo(map);

    const routePoints = locations.map((location) => [location.lat, location.lng]);

    L.polyline(routePoints, {
      color: "#aa771d",
      weight: 8,
      opacity: 0.16,
    }).addTo(map);

    L.polyline(routePoints, {
      color: "#efca6e",
      weight: 3,
      opacity: 0.88,
      dashArray: "10 12",
    }).addTo(map);

    locations.forEach((location) => {
      const marker = L.circleMarker([location.lat, location.lng], {
        ...getMarkerStyle(location.id === selectedLocationId),
      })
        .addTo(map)
        .bindTooltip(location.name, {
          direction: "top",
          offset: [0, -10],
          opacity: 1,
        });

      marker.on("click", () => onSelectLocation(location.id));
      markersRef.current.set(location.id, marker);
    });

    map.fitBounds(L.latLngBounds(routePoints), {
      padding: [36, 36],
      animate: !prefersReducedMotion,
    });

    const invalidate = () => map.invalidateSize();
    window.setTimeout(invalidate, 0);
    window.setTimeout(invalidate, 240);
    window.addEventListener("resize", invalidate);

    return () => {
      window.removeEventListener("resize", invalidate);
      markersRef.current.clear();
      haloRef.current = null;
      initializedRef.current = false;
      map.remove();
      mapRef.current = null;
      if (container._leaflet_id) {
        delete container._leaflet_id;
      }
    };
  }, [locations, onSelectLocation, prefersReducedMotion, selectedLocationId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedLocation) return;

    markersRef.current.forEach((marker, id) => {
      const isSelected = id === selectedLocation.id;
      marker.setStyle(getMarkerStyle(isSelected));
      if (isSelected) {
        marker.bringToFront();
        marker.openTooltip();
      }
    });

    haloRef.current?.remove();
    haloRef.current = L.circle([selectedLocation.lat, selectedLocation.lng], {
      radius: 1800,
      color: "#efca6e",
      weight: 1.5,
      opacity: 0.8,
      fillColor: "#efca6e",
      fillOpacity: 0.05,
    }).addTo(map);

    if (initializedRef.current) {
      map.flyTo([selectedLocation.lat, selectedLocation.lng], selectedLocation.zoom ?? 13, {
        animate: !prefersReducedMotion,
        duration: prefersReducedMotion ? 0 : 1.1,
      });
    } else {
      initializedRef.current = true;
    }
  }, [prefersReducedMotion, selectedLocation]);

  return <div ref={containerRef} className="h-full w-full" />;
}
