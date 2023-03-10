import { useState } from 'react';
// material
import { Dialog } from '@mui/material';
// import JobForm from './JobForm';
// import useOwnerGetJobById from '../hooks/useOwnerGetJobById';
import { Job } from '../types';
import dynamic from 'next/dynamic';

const PdfPreview = dynamic(() => import('@share/components/editor/PdfReview'), {
  ssr: false,
});
// ----------------------------------------------------------------------
interface FormDialogsProps {
  isPreview?: boolean;
  children?: React.ReactNode;
}

export default function PdfResumePreview({
  isPreview,
  children,
}: FormDialogsProps) {
  const [open, setOpen] = useState(false);

  // const {
  //   fetchApi: getJob,
  //   data: jobData,
  //   isLoading: isGettingJob,
  // } = useOwnerGetJobById();

  // useEffect(() => {
  //   getJob({ jobId: data.id });
  // }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>{children}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ width: '700px', margin: '0 auto' }}
      >
        <PdfPreview
          url="https://www.africau.edu/images/default/sample.pdf"
          width="200"
          pageNumber={1}
        />
      </Dialog>
    </div>
  );
}
