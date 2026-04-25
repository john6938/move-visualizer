import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import Legend from './components/Legend';
import AbstractView from './components/AbstractView';
import type { DomainConfig } from './types';

const App: React.FC = () => {
  const [domains, setDomains] = useState<DomainConfig[]>([]);
  const [domainKey, setDomainKey] = useState<string>('');
  const [abstractIndex, setAbstractIndex] = useState(0);
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [showSubtype, setShowSubtype] = useState(false);
  const [xml, setXml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load domain index on mount
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/index.json`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: DomainConfig[]) => {
        setDomains(data);
        setDomainKey(data[0].key);
      })
      .catch(err => {
        setError(`Failed to load domain index: ${err.message}`);
        setLoading(false);
      });
  }, []);

  // Load abstract XML when domain or index changes
  useEffect(() => {
    if (!domainKey || domains.length === 0) return;
    const domain = domains.find(d => d.key === domainKey);
    if (!domain) return;
    const filename = domain.files[abstractIndex];
    if (!filename) return;

    setLoading(true);
    setError(null);
    fetch(`${import.meta.env.BASE_URL}data/${domain.folder}/${filename}`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then(text => {
        setXml(text);
        setLoading(false);
      })
      .catch(err => {
        setError(`Failed to load abstract: ${err.message}`);
        setLoading(false);
      });
  }, [domainKey, abstractIndex, domains]);

  const currentDomain = domains.find(d => d.key === domainKey);
  const totalAbstracts = currentDomain?.files.length ?? 0;

  const handleDomainChange = (key: string) => {
    setDomainKey(key);
    setAbstractIndex(0);
  };

  const handlePrev = () =>
    setAbstractIndex(i => (i === 0 ? totalAbstracts - 1 : i - 1));

  const handleNext = () =>
    setAbstractIndex(i => (i === totalAbstracts - 1 ? 0 : i + 1));

  // Fatal error before any domains loaded
  if (error && domains.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {domains.length > 0 && (
        <Controls
          domains={domains}
          currentDomain={domainKey}
          abstractIndex={abstractIndex}
          totalAbstracts={totalAbstracts}
          showAnnotation={showAnnotation}
          showSubtype={showSubtype}
          onDomainChange={handleDomainChange}
          onPrev={handlePrev}
          onNext={handleNext}
          onIndexChange={setAbstractIndex}
          onToggleAnnotation={() => setShowAnnotation(v => !v)}
          onToggleSubtype={() => setShowSubtype(v => !v)}
        />
      )}
      {showAnnotation && <Legend />}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
            Loading&hellip;
          </div>
        ) : error ? (
          <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg text-sm">
            {error}
          </div>
        ) : xml && currentDomain ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <AbstractView
              xml={xml}
              showAnnotation={showAnnotation}
              showSubtype={showSubtype}
              domainLabel={currentDomain.label}
              abstractNumber={abstractIndex + 1}
            />
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default App;
