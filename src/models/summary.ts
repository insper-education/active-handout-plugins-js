export interface IExerciseSummary {
  pk: number;
  user: number;
  exercise: number;
  exercise_slug: string;
  exercise_type: string;
  max_points: number;
  answer_count: number;
  latest: number;
}
