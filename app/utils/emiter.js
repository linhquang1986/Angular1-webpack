import EventEmitter from "events";
import { setGlobal, getGlobal } from "utils/global";

class MyEmitter extends EventEmitter {}

//create emiter instance
const myEmitter = new MyEmitter();

//create list of EVENT, must be UPPERCASE
if (!getGlobal("EVENTS")) {
  const EVENTS = {
    TEST: Symbol("TEST"),
    FILTER_COMPARISON_PAGE: Symbol("FILTER_COMPARISON_PAGE"),
    COMPARISON_PAGE: Symbol("COMPARISON_PAGE"),
    LANDING_PAGE: Symbol("LANDING_PAGE")
  };

  setGlobal("EVENTS", EVENTS);
}

function mEmit(event, data) {
  //check type of event
  if (typeof event !== "symbol") {
    throw new Error("Event type must be Symbol, is defined in emiter utils");
  }
  if (data) myEmitter.emit(event, data);
  else myEmitter.emit(event);
}

function mOn(event, cb) {
  //check type of event
  if (typeof event !== "symbol") {
    throw new Error("Event type must be Symbol, is defined in emiter utils");
  }

  myEmitter.on(event, data => {
    cb(data);
  });
}

// Use case
// mOn(EVENTS.TEST, data => console.log(data));   //'This is data'
// mEmit(EVENTS.TEST, 'This is data');

export { mEmit, mOn };
