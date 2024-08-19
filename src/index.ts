import ExpoPaxModule from "./ExpoPaxModule";

// Define cut modes as constants
export const FULL_CUT = 0;
export const PARTIAL_CUT = 1;

export function printStr(text: string, cutMode: number = FULL_CUT): void {
  console.log("ExpoPax", "printStr called. Calling native module...");

  ExpoPaxModule.printStr(text, cutMode);
}
