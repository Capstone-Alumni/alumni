import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from '@mui/lab';
import { Typography } from '@mui/material';
import EditorPreview from '@share/components/editor/EditorPreview';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { formatDate } from '@share/utils/formatDate';
import { usePathname } from 'next/navigation';
import useGetFundReportList from '../hooks/useGetFundReportList';

const FundReportList = () => {
  const pathname = usePathname();

  const fundId = pathname?.split('/')[2];

  const { data, isLoading: loadingReportList } = useGetFundReportList(
    fundId || '',
  );

  if (loadingReportList || !fundId) {
    return <LoadingIndicator />;
  }

  return (
    <Timeline
      nonce={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {data?.data.items.map(report => (
        <TimelineItem key={report.id}>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography color="text.secondary">
              {formatDate(new Date(report.createdAt))}
            </Typography>
            <Typography variant="h6">{report.title}</Typography>
            <EditorPreview value={report.content} />
          </TimelineContent>
        </TimelineItem>
      ))}
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
      </TimelineItem>
    </Timeline>
  );
};

export default FundReportList;
