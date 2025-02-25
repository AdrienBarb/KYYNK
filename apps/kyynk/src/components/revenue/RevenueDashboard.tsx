import { Card } from '../ui/Card';
import Text from '../ui/Text';

const RevenueDashboard = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <Text className="text-lg font-light mb-2">Incoming revenue</Text>
        <Text className="text-2xl font-bold">14000 €</Text>
        <Text className="text-sm font-thin">1500 credits</Text>
      </Card>
      <Card>
        <Text className="text-lg font-light mb-2">Available revenue</Text>
        <Text className="text-2xl font-bold">14000 €</Text>
        <Text className="text-sm font-thin">1500 credits</Text>
      </Card>
    </div>
  );
};

export default RevenueDashboard;
