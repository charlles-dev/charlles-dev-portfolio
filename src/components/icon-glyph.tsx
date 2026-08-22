"use client";

import { Icon } from "@iconify/react";
import apiIcon from "@iconify-icons/tabler/api";
import arrowRightIcon from "@iconify-icons/tabler/arrow-right";
import boltIcon from "@iconify-icons/tabler/bolt";
import booksIcon from "@iconify-icons/tabler/books";
import brainIcon from "@iconify-icons/tabler/brain";
import certificateIcon from "@iconify-icons/tabler/certificate";
import clockIcon from "@iconify-icons/tabler/clock";
import codeIcon from "@iconify-icons/tabler/code";
import copyIcon from "@iconify-icons/tabler/copy";
import databaseIcon from "@iconify-icons/tabler/database";
import deviceLaptopIcon from "@iconify-icons/tabler/device-laptop";
import externalLinkIcon from "@iconify-icons/tabler/external-link";
import brandGithubIcon from "@iconify-icons/tabler/brand-github";
import brandLinkedinIcon from "@iconify-icons/tabler/brand-linkedin";
import mailIcon from "@iconify-icons/tabler/mail";
import mapPinIcon from "@iconify-icons/tabler/map-pin";
import networkIcon from "@iconify-icons/tabler/network";
import robotIcon from "@iconify-icons/tabler/robot";
import routeIcon from "@iconify-icons/tabler/route";
import schoolIcon from "@iconify-icons/tabler/school";
import shieldCheckIcon from "@iconify-icons/tabler/shield-check";
import sparklesIcon from "@iconify-icons/tabler/sparkles";
import stackIcon from "@iconify-icons/tabler/stack-2";
import targetArrowIcon from "@iconify-icons/tabler/target-arrow";
import terminalIcon from "@iconify-icons/tabler/terminal-2";
import worldIcon from "@iconify-icons/tabler/world";
import boltCircleSolarIcon from "@iconify-icons/solar/bolt-circle-linear";
import checkReadSolarIcon from "@iconify-icons/solar/check-read-linear";
import codeSquareSolarIcon from "@iconify-icons/solar/code-square-linear";
import cpuBoltSolarIcon from "@iconify-icons/solar/cpu-bolt-linear";
import documentTextSolarIcon from "@iconify-icons/solar/document-text-linear";
import fileCheckSolarIcon from "@iconify-icons/solar/file-check-linear";
import graphUpSolarIcon from "@iconify-icons/solar/graph-up-linear";
import layersSolarIcon from "@iconify-icons/solar/layers-minimalistic-linear";
import mapPointSolarIcon from "@iconify-icons/solar/map-point-linear";
import pulseSolarIcon from "@iconify-icons/solar/pulse-2-linear";
import radioMinimalisticSolarIcon from "@iconify-icons/solar/radio-minimalistic-linear";
import radarSolarIcon from "@iconify-icons/solar/radar-linear";
import rocketSolarIcon from "@iconify-icons/solar/rocket-2-linear";
import routeSolarIcon from "@iconify-icons/solar/route-linear";
import serverSolarIcon from "@iconify-icons/solar/server-square-linear";
import shieldStarSolarIcon from "@iconify-icons/solar/shield-star-linear";
import starFallSolarIcon from "@iconify-icons/solar/star-fall-linear";
import transmissionSolarIcon from "@iconify-icons/solar/transmission-linear";

const icons = {
  api: apiIcon,
  "arrow-right": arrowRightIcon,
  bolt: boltIcon,
  books: booksIcon,
  brain: brainIcon,
  certificate: certificateIcon,
  clock: clockIcon,
  code: codeIcon,
  copy: copyIcon,
  database: databaseIcon,
  "device-laptop": deviceLaptopIcon,
  "external-link": externalLinkIcon,
  github: brandGithubIcon,
  linkedin: brandLinkedinIcon,
  mail: mailIcon,
  "map-pin": mapPinIcon,
  network: networkIcon,
  robot: robotIcon,
  route: routeIcon,
  school: schoolIcon,
  shield: shieldCheckIcon,
  sparkles: sparklesIcon,
  stack: stackIcon,
  target: targetArrowIcon,
  terminal: terminalIcon,
  world: worldIcon,
  "solar-bolt": boltCircleSolarIcon,
  "solar-check": checkReadSolarIcon,
  "solar-code": codeSquareSolarIcon,
  "solar-cpu": cpuBoltSolarIcon,
  "solar-document": documentTextSolarIcon,
  "solar-file-check": fileCheckSolarIcon,
  "solar-graph": graphUpSolarIcon,
  "solar-layers": layersSolarIcon,
  "solar-map": mapPointSolarIcon,
  "solar-pulse": pulseSolarIcon,
  "solar-radio": radioMinimalisticSolarIcon,
  "solar-radar": radarSolarIcon,
  "solar-rocket": rocketSolarIcon,
  "solar-route": routeSolarIcon,
  "solar-server": serverSolarIcon,
  "solar-shield": shieldStarSolarIcon,
  "solar-star": starFallSolarIcon,
  "solar-transmission": transmissionSolarIcon
} as const;

export type IconName = keyof typeof icons;

export function IconGlyph({
  name,
  className = "size-5",
  title
}: {
  name: IconName;
  className?: string;
  title?: string;
}) {
  return <Icon aria-hidden={title ? undefined : true} aria-label={title} className={className} icon={icons[name]} />;
}
