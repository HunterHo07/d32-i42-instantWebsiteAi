'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLayout from '@/components/shared/PageLayout';
import DemoInterface from '@/components/demo/DemoInterface';

export default function DemoPage() {
  const searchParams = useSearchParams();
  const [initialTemplate, setInitialTemplate] = useState('modern-business');
  const [initialName, setInitialName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Get query parameters
    const template = searchParams.get('template');
    const name = searchParams.get('name');
    
    if (template) {
      setInitialTemplate(template);
    }
    
    if (name) {
      setInitialName(name);
    }
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [searchParams]);
  
  if (isLoading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <h2 className="text-xl text-white">Loading Demo...</h2>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <DemoInterface 
        initialTemplate={initialTemplate}
        initialName={initialName}
      />
    </PageLayout>
  );
}
