'use client';

import { useEffect, useState } from 'react';
import { TemperatureViewer, Title } from '@/components';

const fetchTemperature = async () => {
  const url = process.env.NEXT_PUBLIC_API_HOST_URL;
  if (!url) return Promise.reject();
  const res = await fetch(url, { cache: 'force-cache', next: { revalidate: 60 * 60 } });
  return res.json();
};

export default function Home() {
  const [temperature, setTemperature] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    fetchTemperature().then((temperature) =>
      setTemperature(temperature?.DATAs?.DATA?.HANGANG || {}),
    );
  }, []);

  return (
    <main className="flex-1 flex flex-col gap-xl p-lg">
      <div className="flex flex-col gap-md">
        <Title size="lg">한강</Title>
        <TemperatureViewer ph={temperature['노량진']?.PH} temp={temperature['노량진']?.TEMP} />
      </div>
      <div className="flex flex-col gap-lg">
        <Title size="lg">한강 온도 전체 보기</Title>
        <div className="flex flex-col gap-lg">
          {Object.entries(temperature).map((entry) => {
            const [locale, tempInfo] = entry;
            return (
              <TemperatureViewer
                key={locale}
                locale={locale}
                ph={tempInfo.PH}
                temp={tempInfo.TEMP}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
