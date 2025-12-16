export interface AssessmentData {
  // Basic Info
  name: string;
  age: string;
  height: string;
  weight: string;
  basicNotes: string;

  // Photos (Storing as boolean/string for UI logic as we don't have a real backend)
  photoFront: File | null;
  photoSide: File | null;
  photoBack: File | null;
  photoNotes: string;

  // Measurements
  waist: string;
  hip: string;
  chest: string;
  arm: string;
  thigh: string;
  measurementNotes: string;

  // Frequency
  frequency: '3x' | '5x' | '';

  // Aerobics
  aerobics: string[];
  aerobicsNotes: string;

  // Focus
  focusBodyPart: string;
  focusNotes: string;

  // Injuries
  hasInjuries: boolean | null;
  injuryLocation: string;
  injuryRestriction: string;
  injuryAvoid: string;
  injuryNotes: string;

  // Dates (Auto-calculated)
  startDate: Date;
  reviewDate: Date;
}

export type StepProps = {
  data: AssessmentData;
  updateData: (fields: Partial<AssessmentData>) => void;
  onNext: () => void;
  onBack?: () => void;
};