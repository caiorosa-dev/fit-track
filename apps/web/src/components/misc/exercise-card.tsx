/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils';
import { Exercise, ExerciseType } from '@/types/Exercise';
import { FaDumbbell, FaShieldAlt, FaRunning } from 'react-icons/fa';
import { GiMuscleUp, GiLeg, GiAbdominalArmor } from 'react-icons/gi';
import { MdFitnessCenter } from 'react-icons/md';

export type ExerciseTypeVariant = {
  icon: React.FC<{ className?: string }>;
  iconColor: string;
  iconBackgroundColor: string;
};

export const EXERCISE_TYPE_VARIANTS: Record<ExerciseType, ExerciseTypeVariant> = {
  CHEST: {
    icon: FaDumbbell,
    iconColor: 'text-red-500 dark:text-red-300',
    iconBackgroundColor: 'bg-red-100 dark:bg-red-900',
  },
  BACK: {
    icon: FaShieldAlt,
    iconColor: 'text-blue-500 dark:text-blue-300',
    iconBackgroundColor: 'bg-blue-100 dark:bg-blue-900',
  },
  SHOULDERS: {
    icon: MdFitnessCenter,
    iconColor: 'text-yellow-500 dark:text-yellow-300',
    iconBackgroundColor: 'bg-yellow-100 dark:bg-yellow-900',
  },
  BICEPS: {
    icon: GiMuscleUp,
    iconColor: 'text-green-500 dark:text-green-300',
    iconBackgroundColor: 'bg-green-100 dark:bg-green-900',
  },
  TRICEPS: {
    icon: GiMuscleUp,
    iconColor: 'text-purple-500 dark:text-purple-300',
    iconBackgroundColor: 'bg-purple-100 dark:bg-purple-900',
  },
  LEGS: {
    icon: GiLeg,
    iconColor: 'text-orange-500 dark:text-orange-300',
    iconBackgroundColor: 'bg-orange-100 dark:bg-orange-900',
  },
  ABS: {
    icon: GiAbdominalArmor,
    iconColor: 'text-pink-500 dark:text-pink-300',
    iconBackgroundColor: 'bg-pink-100 dark:bg-pink-900',
  },
  CARDIO: {
    icon: FaRunning,
    iconColor: 'text-red-500 dark:text-red-300',
    iconBackgroundColor: 'bg-red-100 dark:bg-red-900',
  },
  GLUTEOS: {
    icon: GiLeg,
    iconColor: 'text-purple-500 dark:text-purple-300',
    iconBackgroundColor: 'bg-purple-100 dark:bg-purple-900',
  },
};

export function ExerciseCard({ exercise, hoverable = true, onClick }: { exercise: Exercise, hoverable?: boolean, onClick?: () => void }) {
  const { icon: Icon, iconColor, iconBackgroundColor } = EXERCISE_TYPE_VARIANTS[exercise.type];

  return (
    <div className={cn('flex items-start gap-2 p-2 border border-accent rounded-lg transition-all', hoverable ? 'hover:cursor-pointer hover:border-primary' : '')} onClick={onClick}>
      <div className={cn('p-2 rounded-lg', iconBackgroundColor)}>
        <Icon className={cn('w-4 h-4', iconColor)} />
      </div>
      <div>
        <p className='text-sm font-medium text-left'>{exercise.name}</p>
        <p className='text-xs text-muted-foreground text-left'>{exercise.description}</p>
      </div>
    </div >
  );
}
