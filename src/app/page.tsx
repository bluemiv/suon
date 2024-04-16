'use client';

import { useEffect, useState } from 'react';

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
    <main className="flex-1">
      <div className="text-2xl">
        <div className="font-semibold">한강</div>
        <div className="flex gap-md">
          <span>온도</span>
          <span>{temperature['노량진']?.TEMP}</span>
        </div>
        <div className="flex gap-md">
          <span>PH</span>
          <span>{temperature['노량진']?.PH}</span>
        </div>
      </div>
      <div>
        <div>한강 온도 전체 보기</div>
        <div>
          {Object.entries(temperature).map((entry) => {
            const [locale, tempInfo] = entry;
            return (
              <div key={locale}>
                <div>
                  <span>{locale}</span>
                  <div className="flex gap-md">
                    <span>온도</span>
                    <span>{tempInfo?.TEMP}</span>
                  </div>
                  <div className="flex gap-md">
                    <span>PH</span>
                    <span>{tempInfo?.PH}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
