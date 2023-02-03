import PublicNewsDetails from 'src/modules/news/components/PublicNewsDetails';
import { newDetailsData } from 'src/modules/news/__mockData__/getNewsListForSchoolAdmin';

export default function NewsDetailsPage() {
  const { data } = newDetailsData;
  return <PublicNewsDetails data={data} />;
}
