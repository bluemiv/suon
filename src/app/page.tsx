'use client';

import { useLayoutEffect, useMemo, useState } from 'react';
import { TemperatureViewer, Title } from '@/components';

const fetchTemperature = async () => {
  const url = process.env.NEXT_PUBLIC_API_HOST_URL;
  if (!url) return Promise.reject();
  const res = await fetch(url, { cache: 'force-cache', next: { revalidate: 60 * 60 } });
  return res.json();
};

export default function Home() {
  const [temperature, setTemperature] = useState<{ [key: string]: any }>({});

  useLayoutEffect(() => {
    fetchTemperature().then((temperature) =>
      setTemperature(
        Object.entries(
          (temperature?.DATAs?.DATA?.HANGANG || {}) as {
            [key: string]: any;
          },
        ).reduce((acc, entry) => {
          const [locale, tempInfo] = entry;
          if (!tempInfo?.TEMP) return acc;
          return { ...acc, [locale]: tempInfo };
        }, {}),
      ),
    );
  }, []);

  const randomTemperature = useMemo(
    () =>
      Object.entries(temperature)?.[Math.floor(Math.random() * Object.keys(temperature).length)],
    [temperature],
  );

  return (
    <main className="flex-1 flex flex-col gap-xl p-lg">
      {!!randomTemperature && (
        <div className="flex flex-col gap-md">
          <Title size="lg">{randomTemperature[0]} 온도</Title>
          <TemperatureViewer ph={randomTemperature[1].PH} temp={randomTemperature[1].TEMP} />
        </div>
      )}
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
