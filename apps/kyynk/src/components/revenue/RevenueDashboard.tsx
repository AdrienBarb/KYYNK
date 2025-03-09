import { Card } from '../ui/Card';
import Text from '../ui/Text';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/Tooltip';
import { Info } from 'lucide-react';
import { getFiatWithCredits } from '@/utils/prices/getMediaPrice';
import React, { FC } from 'react';
import { formatCredits } from '@/utils/prices/formatCredits';
import { formatFiat } from '@/utils/prices/formatFiat';

interface RevenueDashboardProps {
  availableRevenue: number;
  incomingRevenue: number;
}

const RevenueDashboard: FC<RevenueDashboardProps> = async ({
  availableRevenue,
  incomingRevenue,
}) => {
  const { fiatPrice: incomingRevenueFiat, creditPrice: incomingRevenueCredit } =
    getFiatWithCredits(incomingRevenue);

  const {
    fiatPrice: availableRevenueFiat,
    creditPrice: availableRevenueCredit,
  } = getFiatWithCredits(availableRevenue);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card>
          <div className="flex items-center justify-between">
            <Text className="text-lg font-light mb-2">Incoming revenue</Text>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-2 cursor-pointer">
                  <Info size={20} strokeWidth={1} />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <Text>
                  The incoming revenue is from your sales that are currently
                  being validated. It takes 7 days to validate, so this revenue
                  will be available in 7 days.
                </Text>
              </TooltipContent>
            </Tooltip>
          </div>
          <Text className="text-2xl font-bold">
            {formatFiat(incomingRevenueFiat)} €
          </Text>
          <Text className="text-sm font-thin">
            {formatCredits(incomingRevenueCredit)} credits
          </Text>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <Text className="text-lg font-light mb-2">Available revenue</Text>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-2 cursor-pointer">
                  <Info size={20} strokeWidth={1} />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <Text>
                  The available revenue is the amount you can withdraw. It needs
                  to be higher than 50 euros to be eligible for withdrawal.
                </Text>
              </TooltipContent>
            </Tooltip>
          </div>
          <Text className="text-2xl font-bold">
            {formatFiat(availableRevenueFiat)} €
          </Text>
          <Text className="text-sm font-thin">
            {formatCredits(availableRevenueCredit)} credits
          </Text>
        </Card>
      </div>
    </div>
  );
};

export default RevenueDashboard;
