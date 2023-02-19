import SearchResults from 'src/modules/search/components/SearchResults';
import Search from 'src/modules/search/components/Search';

export default async function Home() {
  return (
    <>
      <Search />
      <SearchResults />
    </>
  );
}
