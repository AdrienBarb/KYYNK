import { Card } from '../ui/Card';
import Text from '../ui/Text';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/Tooltip';
import { Info } from 'lucide-react';
import { getPriceWithCredits } from '@/utils/prices/getMediaPrice';
import React, { FC } from 'react';

interface RevenueDashboardProps {
  availableRevenue: number;
  incomingRevenue: number;
}

const RevenueDashboard: FC<RevenueDashboardProps> = async ({
  availableRevenue,
  incomingRevenue,
}) => {
  const { fiatPrice: incomingRevenueFiat, creditPrice: incomingRevenueCredit } =
    getPriceWithCredits(incomingRevenue);

  const {
    fiatPrice: availableRevenueFiat,
    creditPrice: availableRevenueCredit,
  } = getPriceWithCredits(availableRevenue);

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
                <Text>Information about incoming revenue</Text>
              </TooltipContent>
            </Tooltip>
          </div>
          <Text className="text-2xl font-bold">{incomingRevenueFiat} €</Text>
          <Text className="text-sm font-thin">
            {incomingRevenueCredit} credits
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
                <Text>Information about available revenue</Text>
              </TooltipContent>
            </Tooltip>
          </div>
          <Text className="text-2xl font-bold">{availableRevenueFiat} €</Text>
          <Text className="text-sm font-thin">
            {availableRevenueCredit} credits
          </Text>
        </Card>
      </div>
    </div>
  );
};

export default RevenueDashboard;
