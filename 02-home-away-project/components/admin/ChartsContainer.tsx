import { fetchChartsData } from '@/utils/actions';
import Chart from './Chart';

async function ChartsContainer() {
  const bookings = await fetchChartsData();
  if (bookings.length < 1) return null;
  return <Chart data={bookings} />;
}
export default ChartsContainer;
