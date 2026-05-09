export enum ExerciseType {
  STRENGTH = 'Strength',
  SKILL = 'Skill',
  MOBILITY = 'Mobility',
  CORE = 'Core',
}

export interface Exercise {
  name: string;
  duration: string;
  reps?: string;
  description: string;
}

export interface WorkoutRoutine {
  title: string;
  subtitle: string;
  duration: number;
  exercises: Exercise[];
  totalSets: number;
}
