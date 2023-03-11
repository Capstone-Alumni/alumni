'use client';

import { Box, Typography, useTheme } from '@mui/material';

import { GetAppliedJobListByIdResponse } from '../hooks/usePublicGetAppliedJobListById';
import UsersAppliedJobListTable from './UsersAppliedJobListTable';

const UsersAppliedJobListPage = ({
  data,
}: {
  data: GetAppliedJobListByIdResponse;
}) => {
  const theme = useTheme();

  const onPreviewCandidates = async (id: string) => {
    // await approveEvent({ jobId: id });
    // reload();
  };

  const onDownloadResumeCandidate = async (id: string) => {
    console.log(id);
    // await fetch('https://cors-anywhere.herokuapp.com/' + id, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/pdf',
    //   },
    // })
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     // Create blob link to download
    //     const url = window.URL.createObjectURL(new Blob([blob]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', `FileName.pdf`);

    //     // Append to html link element page
    //     document.body.appendChild(link);

    //     fileDownload(url, 'GiaAn.pdf');

    //     // Start download
    //     // link.click();

    //     // Clean up and remove the link
    //     link.parentNode && link.parentNode.removeChild(link);
    //   });
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: theme.spacing(4),
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">Danh sách những người đã nộp</Typography>
      </Box>

      <Box
        sx={{
          width: '100%',
        }}
      >
        <UsersAppliedJobListTable
          data={data}
          page={1}
          onPreview={onPreviewCandidates}
          onDownload={onDownloadResumeCandidate}
          onChangePage={(nextPage) => {
            // setParams((prevParams) => ({ ...prevParams, page: nextPage }));
          }}
        />
      </Box>
    </Box>
  );
};

export default UsersAppliedJobListPage;
