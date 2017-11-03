const appName = "THX_GLOBAL";
let THX_GLOBAL = {};

function initGlobal() {
  if (!window) throw new Error(`Failed to set up global app data`);
  window[appName] = window[appName] || THX_GLOBAL;
}

function setGlobal(key, data) {
  if (!checkGlobal()) initGlobal();
  THX_GLOBAL[key] = data;
}

function getGlobal(key) {
  if (!key) return THX_GLOBAL;
  return THX_GLOBAL[key];
}

function checkGlobal() {
  return !!window[appName];
}

// Use case
// import { getGlobal } from "utils/global";
// const EVENTS = getGlobal("EVENTS");

// Avoid use like this
// window.THX_GLOBAL.EVENTS or THX_GLOBAL.EVENTS

export { initGlobal, setGlobal, getGlobal };
