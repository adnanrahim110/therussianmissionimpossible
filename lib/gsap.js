"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginsRegistered = false;

if (!pluginsRegistered) {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, Observer);
  pluginsRegistered = true;
}

export { gsap, Observer, ScrollToPlugin, ScrollTrigger, useGSAP };

