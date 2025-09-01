'use client';
import { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

export default function NepaliTTS() {
  const [text, setText] = useState('नमस्ते! तपाईंलाई कस्तो छ?');
  const { speak, voices } = useSpeechSynthesis();
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const handleSpeak = () => {
    if (!text) return;
    speak({ text, voice: selectedVoice || undefined });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Text Input */}
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="border p-2 w-full rounded" rows={4} />

      {/* Voice Selection */}
      <select
        className="border p-2 rounded w-full"
        onChange={(e) => {
          const voice = voices.find((v) => v.name === e.target.value);
          setSelectedVoice(voice || null);
        }}
      >
        <option value="">-- Select Voice --</option>
        {voices.map((voice, i) => (
          <option key={i} value={voice.name} className="text-black/70">
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>

      {/* Speak Button */}
      <button onClick={handleSpeak} className="bg-blue-600 text-white px-4 py-2 rounded">
        🔊 Speak
      </button>
    </div>
  );
}
