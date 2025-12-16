import React from 'react';
import { Camera, Calendar, Play, CheckCircle, Upload, ChevronRight, AlertCircle, Check } from 'lucide-react';
import { StepProps } from '../types';
import { Button, Input, TextArea, SelectCard, StepHeader } from './ui/Common';
import { AEROBIC_OPTIONS, FOCUS_OPTIONS } from '../constants';

// --- Step 1: Welcome ---
export const StepWelcome: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in zoom-in duration-500">
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-blue-600 rounded-full opacity-20 blur-xl"></div>
      <div className="relative bg-dark-800 p-4 rounded-full border border-zinc-700">
        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-white">
          XC
        </span>
      </div>
    </div>
    
    <div className="space-y-4 max-w-md">
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        Bem-vindo ao<br/>
        <span className="text-brand-500">XCONCEPT</span>
      </h1>
      <h2 className="text-xl text-zinc-300 font-medium">Mais treino. Menos ansiedade.</h2>
      <p className="text-zinc-500 leading-relaxed">
        Aqui você não começa perfeito.<br/>
        Você começa possível.<br/>
        E evolui com método, acompanhamento e constância.
      </p>
    </div>

    <Button onClick={onNext} className="mt-8 px-8" icon={<ChevronRight size={20} />}>
      Iniciar Avaliação Física
    </Button>
  </div>
);

// --- Step 2: Basic Info ---
export const StepBasicInfo: React.FC<StepProps> = ({ data, updateData, onNext }) => {
  const isValid = data.name && data.age && data.height && data.weight;

  return (
    <div className="space-y-6">
      <StepHeader title="Dados Básicos" subtitle="Para começarmos a entender o seu perfil." />
      
      <Input 
        label="Nome completo" 
        value={data.name} 
        onChange={e => updateData({ name: e.target.value })} 
        placeholder="Seu nome"
      />
      
      <div className="grid grid-cols-3 gap-4">
        <Input 
          label="Idade" 
          type="number" 
          value={data.age} 
          onChange={e => updateData({ age: e.target.value })} 
          placeholder="00"
        />
        <Input 
          label="Altura (cm)" 
          type="number" 
          value={data.height} 
          onChange={e => updateData({ height: e.target.value })} 
          placeholder="170"
        />
        <Input 
          label="Peso (kg)" 
          type="number" 
          value={data.weight} 
          onChange={e => updateData({ weight: e.target.value })} 
          placeholder="70"
        />
      </div>

      <TextArea 
        label="Observações gerais (Opcional)"
        value={data.basicNotes}
        onChange={e => updateData({ basicNotes: e.target.value })}
        placeholder="Algo que devamos saber agora?"
      />

      <Button fullWidth onClick={onNext} disabled={!isValid}>Continuar</Button>
    </div>
  );
};

// --- Step 3: Photos ---
const PhotoInput: React.FC<{ label: string; file: File | null; onChange: (f: File | null) => void }> = ({ label, file, onChange }) => (
  <div className="w-full">
    <span className="block text-sm font-medium text-zinc-400 mb-2">{label}</span>
    <label className={`
      flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors
      ${file ? 'border-brand-500 bg-brand-500/10' : 'border-zinc-700 bg-dark-800 hover:border-zinc-500'}
    `}>
      {file ? (
        <div className="text-center">
          <CheckCircle className="mx-auto text-brand-500 mb-2" size={24} />
          <span className="text-xs text-brand-200 font-medium truncate max-w-[150px] block">{file.name}</span>
          <span className="text-xs text-brand-400 mt-1">Clique para alterar</span>
        </div>
      ) : (
        <div className="text-center text-zinc-500">
          <Camera className="mx-auto mb-2" size={24} />
          <span className="text-xs font-medium">Tirar foto / Galeria</span>
        </div>
      )}
      <input type="file" className="hidden" accept="image/*" onChange={(e) => {
        if (e.target.files && e.target.files[0]) onChange(e.target.files[0]);
      }} />
    </label>
  </div>
);

export const StepPhotos: React.FC<StepProps> = ({ data, updateData, onNext }) => (
  <div className="space-y-6">
    <StepHeader title="Avaliação por Fotos" subtitle="Use roupas confortáveis e boa iluminação." />
    
    <div className="grid grid-cols-3 gap-3">
      <PhotoInput label="Frontal" file={data.photoFront} onChange={(f) => updateData({ photoFront: f })} />
      <PhotoInput label="Lateral" file={data.photoSide} onChange={(f) => updateData({ photoSide: f })} />
      <PhotoInput label="Costas" file={data.photoBack} onChange={(f) => updateData({ photoBack: f })} />
    </div>

    <TextArea 
      label="Observações sobre as fotos (Opcional)"
      value={data.photoNotes}
      onChange={e => updateData({ photoNotes: e.target.value })}
      placeholder="Comentários sobre postura, etc."
      className="!min-h-[80px]"
    />

    <Button fullWidth onClick={onNext}>Continuar</Button>
  </div>
);

// --- Step 4: Measurements ---
export const StepMeasurements: React.FC<StepProps> = ({ data, updateData, onNext }) => (
  <div className="space-y-6">
    <StepHeader title="Medidas Corporais" subtitle="Medidas em centímetros." />
    
    <div className="grid grid-cols-2 gap-4">
      <Input label="Cintura (cm)" type="number" value={data.waist} onChange={e => updateData({ waist: e.target.value })} />
      <Input label="Quadril (cm)" type="number" value={data.hip} onChange={e => updateData({ hip: e.target.value })} />
      <Input label="Peito (cm)" type="number" value={data.chest} onChange={e => updateData({ chest: e.target.value })} />
      <Input label="Braço (cm)" type="number" value={data.arm} onChange={e => updateData({ arm: e.target.value })} />
      <div className="col-span-2">
        <Input label="Coxa (cm)" type="number" value={data.thigh} onChange={e => updateData({ thigh: e.target.value })} />
      </div>
    </div>

    <TextArea 
      label="Observações sobre medidas"
      value={data.measurementNotes}
      onChange={e => updateData({ measurementNotes: e.target.value })}
      className="!min-h-[80px]"
    />

    <Button fullWidth onClick={onNext}>Continuar</Button>
  </div>
);

// --- Step 5: Frequency ---
export const StepFrequency: React.FC<StepProps> = ({ data, updateData, onNext }) => (
  <div className="space-y-6">
    <StepHeader title="Frequência de Treino" subtitle="Quantas vezes por semana você consegue treinar?" />
    
    <div className="space-y-4">
      <SelectCard 
        selected={data.frequency === '3x'} 
        onClick={() => updateData({ frequency: '3x' })}
        icon="🟢"
      >
        Treinar 3x por semana
      </SelectCard>
      
      <SelectCard 
        selected={data.frequency === '5x'} 
        onClick={() => updateData({ frequency: '5x' })}
        icon="🔵"
      >
        Treinar 5x ou mais
      </SelectCard>
    </div>

    <Button fullWidth onClick={onNext} disabled={!data.frequency}>Continuar</Button>
  </div>
);

// --- Step 6: Aerobics ---
export const StepAerobics: React.FC<StepProps> = ({ data, updateData, onNext }) => {
  const toggleAerobic = (option: string) => {
    if (option === "Não desejo no momento") {
      updateData({ aerobics: ["Não desejo no momento"] });
      return;
    }

    let newAerobics = data.aerobics.filter(a => a !== "Não desejo no momento");
    if (newAerobics.includes(option)) {
      newAerobics = newAerobics.filter(a => a !== option);
    } else {
      newAerobics.push(option);
    }
    updateData({ aerobics: newAerobics });
  };

  return (
    <div className="space-y-6">
      <StepHeader title="Atividade Aeróbica" subtitle="O que você gosta de fazer?" />
      
      <div className="grid grid-cols-1 gap-3 max-h-[40vh] overflow-y-auto pr-2">
        {AEROBIC_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => toggleAerobic(option)}
            className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all
              ${data.aerobics.includes(option) 
                ? 'bg-brand-500/20 border-brand-500 text-brand-50' 
                : 'bg-dark-800 border-zinc-700 text-zinc-400 hover:bg-dark-700'
              }`}
          >
            <span className="font-medium">{option}</span>
            {data.aerobics.includes(option) && <Check size={16} className="text-brand-500" />}
          </button>
        ))}
      </div>

      <TextArea 
        label="Preferência ou observações"
        value={data.aerobicsNotes}
        onChange={e => updateData({ aerobicsNotes: e.target.value })}
        className="!min-h-[80px]"
      />

      <Button fullWidth onClick={onNext}>Continuar</Button>
    </div>
  );
};

// --- Step 7: Focus ---
export const StepFocus: React.FC<StepProps> = ({ data, updateData, onNext }) => (
  <div className="space-y-6">
    <StepHeader title="Foco do Treino" subtitle="O que você mais quer melhorar na composição corporal?" />
    
    <div className="space-y-3">
      {FOCUS_OPTIONS.map((opt) => (
        <SelectCard 
          key={opt.id}
          selected={data.focusBodyPart === opt.id}
          onClick={() => updateData({ focusBodyPart: opt.id })}
        >
          {opt.label}
        </SelectCard>
      ))}
    </div>

    <TextArea 
      label="Observações extras (Obrigatório)"
      value={data.focusNotes}
      onChange={e => updateData({ focusNotes: e.target.value })}
      placeholder="Ex: 'Quero mais definição', 'Tenho dificuldade em ganhar massa'..."
      className="!min-h-[100px]"
    />

    <Button fullWidth onClick={onNext} disabled={!data.focusBodyPart || !data.focusNotes}>Continuar</Button>
  </div>
);

// --- Step 8: Injuries ---
export const StepInjuries: React.FC<StepProps> = ({ data, updateData, onNext }) => (
  <div className="space-y-6">
    <StepHeader title="Lesões ou Restrições" subtitle="Segurança em primeiro lugar." />
    
    <div className="flex gap-4">
      <button 
        onClick={() => updateData({ hasInjuries: false })}
        className={`flex-1 p-6 rounded-2xl border transition-all text-center
          ${data.hasInjuries === false 
            ? 'bg-brand-500/20 border-brand-500 text-white' 
            : 'bg-dark-800 border-zinc-700 text-zinc-400 hover:bg-dark-700'
          }`}
      >
        <span className="block text-2xl mb-2">😊</span>
        <span className="font-bold">Não</span>
      </button>
      <button 
        onClick={() => updateData({ hasInjuries: true })}
        className={`flex-1 p-6 rounded-2xl border transition-all text-center
          ${data.hasInjuries === true 
            ? 'bg-amber-500/20 border-amber-500 text-white' 
            : 'bg-dark-800 border-zinc-700 text-zinc-400 hover:bg-dark-700'
          }`}
      >
        <span className="block text-2xl mb-2">🤕</span>
        <span className="font-bold">Sim</span>
      </button>
    </div>

    {data.hasInjuries && (
      <div className="space-y-4 animate-in slide-in-from-top-4 fade-in duration-300">
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex gap-3 text-amber-200 text-sm items-start">
          <AlertCircle className="shrink-0 mt-0.5" size={16} />
          <p>Por favor, detalhe sua lesão para adaptarmos o treino.</p>
        </div>
        <Input label="Local da lesão" value={data.injuryLocation} onChange={e => updateData({ injuryLocation: e.target.value })} />
        <Input label="Tipo de restrição" value={data.injuryRestriction} onChange={e => updateData({ injuryRestriction: e.target.value })} />
        <Input label="Exercícios que evita" value={data.injuryAvoid} onChange={e => updateData({ injuryAvoid: e.target.value })} />
        <TextArea label="Observações extras" value={data.injuryNotes} onChange={e => updateData({ injuryNotes: e.target.value })} />
      </div>
    )}

    <Button fullWidth onClick={onNext} disabled={data.hasInjuries === null}>Continuar</Button>
  </div>
);

// --- Step 9: Meta ---
export const StepGoal: React.FC<StepProps> = ({ data, onNext }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8 text-center">
      <StepHeader title="Sua Meta Inicial" subtitle="Vamos trabalhar com uma meta clara, possível e mensurável." />

      <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-zinc-700 p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-500"></div>
        
        <div className="space-y-2 mb-6">
          <p className="text-zinc-400 text-sm uppercase tracking-wider font-semibold">Meta definida para</p>
          <p className="text-5xl font-bold text-white">45 Dias</p>
        </div>

        <div className="flex items-center justify-between text-left border-t border-zinc-800 pt-6">
          <div>
            <p className="text-zinc-500 text-xs mb-1">Início</p>
            <p className="text-zinc-300 font-medium">{formatDate(data.startDate)}</p>
          </div>
          <div className="text-brand-500">
            <ChevronRight />
          </div>
          <div className="text-right">
            <p className="text-zinc-500 text-xs mb-1">Reavaliação</p>
            <p className="text-brand-400 font-bold text-lg">{formatDate(data.reviewDate)}</p>
          </div>
        </div>
      </div>

      <Button fullWidth onClick={onNext} variant="primary" className="py-4 text-lg">
        Finalizar Avaliação
      </Button>
    </div>
  );
};

// --- Step 10: Submission ---
export const StepFinish: React.FC<{ 
  onSendWhatsapp: () => void; 
  onSendEmail: () => void; 
  onReset: () => void;
}> = ({ onSendWhatsapp, onSendEmail, onReset }) => (
  <div className="space-y-8 text-center">
    <div className="mb-8">
      <div className="mx-auto w-20 h-20 bg-brand-500/20 rounded-full flex items-center justify-center mb-6">
        <Upload className="text-brand-500 w-10 h-10" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">Enviar Avaliação</h2>
      <p className="text-zinc-400">Agora vamos enviar sua avaliação para acompanhamento profissional.</p>
    </div>

    <div className="space-y-4">
      <Button 
        fullWidth 
        onClick={onSendWhatsapp} 
        className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-none border-none"
        icon={<span>📲</span>}
      >
        Enviar via WhatsApp
      </Button>
      
      <Button 
        fullWidth 
        variant="secondary" 
        onClick={onSendEmail}
        icon={<span>📧</span>}
      >
        Enviar por E-mail
      </Button>
    </div>

    <div className="pt-8 border-t border-zinc-800">
      <Button variant="ghost" onClick={onReset} className="text-sm">
        👉 Ir para meu Plano de Treino
      </Button>
    </div>
    
    <p className="text-xs text-zinc-600 mt-4">
      Avaliação feita. Agora é sobre constância.<br/>
      Mais treino. Menos ansiedade.
    </p>
  </div>
);