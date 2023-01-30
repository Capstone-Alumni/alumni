'use client';

import { noop } from 'lodash';
import CreateNewsForm from 'src/modules/news/components/CreateNewsForm';

export default function Page() {
  return <CreateNewsForm onSubmit={noop} onClose={noop} />;
}
