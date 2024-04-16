import lodash from 'lodash';
import Title from '@/components/Title';

interface TProps {
  locale?: string;
  temp?: number;
  ph?: number;
}

export default function TemperatureViewer({ locale, ph, temp }: TProps) {
  return (
    <div className="flex flex-col gap-md">
      {!!locale && <Title>{locale}</Title>}
      <div className="flex gap-md">
        <span>온도</span>
        <span>{!lodash.isNil(temp) ? `${temp}°C` : '정보 없음'}</span>
      </div>
      <div className="flex gap-md">
        <span>PH</span>
        <span>{!lodash.isNil(ph) ? ph : '정보 없음'}</span>
      </div>
    </div>
  );
}
