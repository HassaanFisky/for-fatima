/**
 * ✏️ THE PERSONAL TOUCH — edit this file only.
 *
 * Everything here is OPTIONAL. The website is complete with all of it empty.
 * Only add things that are REAL: photos you have permission to use, memories
 * that genuinely happened, and notes you wrote yourself.
 * Never add private chat screenshots or anything Fatima would not be happy to see.
 */

export type Memory = {
  /** Short title, e.g. "A quiet evening" */
  title: string;
  /** What genuinely happened / what you want to say. Keep it short and true. */
  text: string;
  /** Optional, only when appropriate, e.g. "March 2025" */
  date?: string;
  /** Optional photo path inside /public, e.g. "/photos/one.jpg" */
  photo?: string;
  /** Alt text for the photo (accessibility) */
  photoAlt?: string;
};

export const personal = {
  /** Add real, verified memories here. Leave empty to show the neutral illustration. */
  memories: [] as Memory[],

  /** Short notes you wrote yourself. */
  notes: [] as string[],

  /**
   * Optional background music, e.g. "/audio/song.mp3" (put the file in /public/audio).
   * Only use audio you own, have permission for, or that is properly licensed.
   * It never autoplays — it plays only if Fatima switches sound on.
   */
  musicSrc: "" as string,
};
