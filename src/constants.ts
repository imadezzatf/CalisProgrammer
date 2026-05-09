import { WorkoutRoutine } from './types';

export const WORKOUT_ROUTINES: Record<number, WorkoutRoutine> = {
  1: {
    title: "Quick System Pulse",
    subtitle: "A rapid mobility check for stiff joints.",
    duration: 1,
    totalSets: 1,
    exercises: [
      { name: "Scapular Shrugs", duration: "30s", description: "Wake up those shoulders." },
      { name: "Band Pull-Aparts", duration: "30s", description: "Fix that posture deficit." }
    ]
  },
  5: {
    title: "Arch Body & Core Debug",
    subtitle: "Strengthening your posterior chain and stabilizers.",
    duration: 5,
    totalSets: 2,
    exercises: [
      { name: "Arch Body Holds", duration: "45s", description: "Isometric back strength." },
      { name: "Hollow Body Rock", duration: "45s", description: "Core compression drill." },
      { name: "Rest", duration: "30s", description: "Let the buffer clear." }
    ]
  },
  10: {
    title: "Ring Mastery & Push-ups",
    subtitle: "Developing horizontal pushing power.",
    duration: 10,
    totalSets: 3,
    exercises: [
      { name: "Ring Chest Flys", duration: "8-10 reps", description: "Controlled chest expansion." },
      { name: "Explosive Push-ups", duration: "12 reps", description: "Generate power from the floor." },
      { name: "Rest", duration: "60s", description: "Synthesizing strength..." }
    ]
  },
  15: {
    title: "Pull-up & Dip Circuit",
    subtitle: "Classic vertical push/pull logic.",
    duration: 15,
    totalSets: 4,
    exercises: [
      { name: "Pull-ups (Weighted if possible)", duration: "8 reps", description: "Vertical pulling strength." },
      { name: "Parallel Bar Dips", duration: "12 reps", description: "Vertical pushing power." },
      { name: "Passive Hang", duration: "30s", description: "Decompress the spine." },
      { name: "Rest", duration: "60s", description: "Cooldown in progress..." }
    ]
  },
  20: {
    title: "Handstand & Front Lever",
    subtitle: "High-level skill and isometric work.",
    duration: 20,
    totalSets: 5,
    exercises: [
      { name: "Handstand (Wall/Free)", duration: "45s", description: "Balance and shoulder stability." },
      { name: "Tuck Front Lever Holds", duration: "20s", description: "Lat and core engagement." },
      { name: "L-Sit Drill", duration: "30s", description: "Compression and tricep support." },
      { name: "Rest", duration: "90s", description: "Reallocating resources." }
    ]
  },
  30: {
    title: "Full Muscle-Up Progressions",
    subtitle: "The ultimate upper body integration routine.",
    duration: 30,
    totalSets: 6,
    exercises: [
      { name: "High Pull-ups", duration: "5 reps", description: "Pull to the waist for transition." },
      { name: "Straight Bar Dips", duration: "8 reps", description: "The top-half of the muscle-up." },
      { name: "Slow Negatives", duration: "3 reps", description: "5-second lowering phase." },
      { name: "Face Pulls", duration: "15 reps", description: "Shoulder health maintenance." },
      { name: "Rest", duration: "120s", description: "Full system reboot." }
    ]
  }
};
