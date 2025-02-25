import { Card } from '../ui/Card';
import Text from '../ui/Text';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/Tooltip';
import { Info } from 'lucide-react';
import { getPriceWithCredits } from '@/utils/prices/getMediaPrice';
import { auth } from '@/auth';
import { getUserSales } from '@/services/sales/getUserSales';
import { getUserSalesDetails } from '@/services/sales/getUserSalesDetails';
import SalesList from './SalesList';

const RevenueDashboard = async () => {
  const session = await auth();

  const { incomingRevenue, availableRevenue } = await getUserSales({
    userId: session?.user.id!,
  });

  const sales = await getUserSalesDetails({
    userId: session?.user.id!,
  });

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
      <SalesList sales={sales} />
    </div>
  );
};

export default RevenueDashboard;
