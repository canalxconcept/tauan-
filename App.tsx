import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { AssessmentData } from './types';
import { WHATSAPP_NUMBER, EMAIL_ADDRESS, REVIEW_DAYS, FOCUS_OPTIONS } from './constants';
import { ProgressBar } from './components/ui/Common';
import { 
  StepWelcome, 
  StepBasicInfo, 
  StepPhotos, 
  StepMeasurements, 
  StepFrequency, 
  StepAerobics, 
  StepFocus, 
  StepInjuries, 
  StepGoal, 
  StepFinish 
} from './components/AssessmentSteps';

const TOTAL_STEPS = 10;

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const initialData: AssessmentData = {
  name: '',
  age: '',
  height: '',
  weight: '',
  basicNotes: '',
  photoFront: null,
  photoSide: null,
  photoBack: null,
  photoNotes: '',
  waist: '',
  hip: '',
  chest: '',
  arm: '',
  thigh: '',
  measurementNotes: '',
  frequency: '',
  aerobics: [],
  aerobicsNotes: '',
  focusBodyPart: '',
  focusNotes: '',
  hasInjuries: null,
  injuryLocation: '',
  injuryRestriction: '',
  injuryAvoid: '',
  injuryNotes: '',
  startDate: new Date(),
  reviewDate: addDays(new Date(), REVIEW_DAYS),
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AssessmentData>(initialData);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // Update Review Date if Start Date changes (though start date is fixed in this logic)
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      reviewDate: addDays(prev.startDate, REVIEW_DAYS)
    }));
  }, []);

  const updateData = (fields: Partial<AssessmentData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const handleNext = () => {
    setDirection('forward');
    setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentStep === 1) return;
    setDirection('backward');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getFocusLabel = (id: string) => FOCUS_OPTIONS.find(f => f.id === id)?.label || id;

  const generateSummaryText = () => {
    const d = formData;
    return `
*AVALIAÇÃO XCONCEPT*
------------------
*Aluno:* ${d.name}
*Idade:* ${d.age} | *Alt:* ${d.height}cm | *Peso:* ${d.weight}kg

*Medidas:*
Cintura: ${d.waist} | Quadril: ${d.hip}
Peito: ${d.chest} | Braço: ${d.arm} | Coxa: ${d.thigh}

*Treino:*
Frequência: ${d.frequency}
Aeróbico: ${d.aerobics.join(', ')}
Foco: ${getFocusLabel(d.focusBodyPart)}

*Lesões:* ${d.hasInjuries ? 'SIM' : 'NÃO'}
${d.hasInjuries ? `Local: ${d.injuryLocation}\nRestrição: ${d.injuryRestriction}` : ''}

*Meta:* 45 Dias
Início: ${d.startDate.toLocaleDateString()}
Reavaliação: ${d.reviewDate.toLocaleDateString()}
------------------
Obs: ${d.basicNotes || '-'}
`.trim();
  };

  const handleSendWhatsapp = () => {
    const text = `Olá, finalizei minha avaliação física no app XCONCEPT. Aguardo retorno.\n\n${generateSummaryText()}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleSendEmail = () => {
    const subject = "Avaliação Física – XCONCEPT";
    const body = generateSummaryText();
    const url = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  };

  const commonProps = {
    data: formData,
    updateData,
    onNext: handleNext,
    onBack: handleBack
  };

  return (
    <div className="min-h-screen bg-dark-900 text-zinc-100 font-sans selection:bg-brand-500 selection:text-white pb-10">
      {/* Progress Bar (Skipped on Welcome and Success) */}
      {currentStep > 1 && currentStep < 10 && (
        <ProgressBar current={currentStep - 1} total={TOTAL_STEPS - 2} />
      )}

      {/* Main Container */}
      <div className="max-w-xl mx-auto px-6 pt-12 md:pt-20">
        
        {/* Back Button */}
        {currentStep > 1 && currentStep < 10 && (
          <button 
            onClick={handleBack}
            className="mb-8 text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft size={18} /> Voltar
          </button>
        )}

        {/* Dynamic Step Content */}
        <div className={`transition-all duration-300 ${direction === 'forward' ? 'fade-enter-active' : ''}`}>
          {currentStep === 1 && <StepWelcome onNext={handleNext} />}
          {currentStep === 2 && <StepBasicInfo {...commonProps} />}
          {currentStep === 3 && <StepPhotos {...commonProps} />}
          {currentStep === 4 && <StepMeasurements {...commonProps} />}
          {currentStep === 5 && <StepFrequency {...commonProps} />}
          {currentStep === 6 && <StepAerobics {...commonProps} />}
          {currentStep === 7 && <StepFocus {...commonProps} />}
          {currentStep === 8 && <StepInjuries {...commonProps} />}
          {currentStep === 9 && <StepGoal {...commonProps} />}
          {currentStep === 10 && (
            <StepFinish 
              onSendWhatsapp={handleSendWhatsapp}
              onSendEmail={handleSendEmail}
              onReset={() => {
                alert("Redirecionando para o plano de treino...");
                // Here you would redirect
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}