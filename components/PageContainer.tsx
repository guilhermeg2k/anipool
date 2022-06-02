import { Box } from '@mui/system';
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <Box display="flex" width="100vw" height="100vh" p={2}>
      {children}
    </Box>
  );
};

export default React.memo(PageContainer);
