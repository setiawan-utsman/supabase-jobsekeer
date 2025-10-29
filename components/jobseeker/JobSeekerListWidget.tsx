import React from 'react'
import { Card } from '../ui/card'
import { DollarSign, LocateIcon } from 'lucide-react'
import { useJobSekeerStore } from '@/store/useJobSekeerStore'

interface IJobSeekerListWidgetProps {
 item: any   
}

export default function JobSeekerListWidget({ item }: IJobSeekerListWidgetProps) {
const {cardActive, setCardActive} = useJobSekeerStore()

  return (
    <Card
      className={`py-3 px-4 gap-2 group cursor-pointer hover:bg-primary/5 hover:border-primary transition-all ${cardActive?.id === item?.id ? 'bg-primary/5 border-primary' : 'border-gray-400/40' }`}
    onClick={() => setCardActive(item)}>
      <div className="flex items-center gap-2">
        <img width={30} height={30} src="/illustrations/16x16.png" alt="Logo" />
        <div className="space-y-1">
          <div className="font-semibold group-hover:text-primary group-hover:font-semibold capitalize">{item?.title}</div>
          <div className="text-sm text-gray-600/60">Rakamin</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-gray-400">
          <LocateIcon width={20} height={20} />
        </div>
        <div className="text-sm">Jakarta Selatan</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-gray-400">
          <DollarSign width={20} height={20} />
        </div>
        <div className="text-sm">{item?.salary_range?.display_text}</div>
      </div>
    </Card>
  );
}
