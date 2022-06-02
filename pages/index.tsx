import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import type { NextPage } from 'next';
import Image from 'next/image';
import PageContainer from '../components/PageContainer';

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Box
        display="flex"
        height="100%"
        width="100%"
        flexDirection={{
          xs: 'column',
          md: 'row',
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width={{ xs: '200px', sm: '300px', md: '400px', lg: '500px' }}
          alignSelf={{ xs: 'center', md: 'flex-end' }}
        >
          <Image
            src="/images/killua.png"
            layout="responsive"
            width={712}
            height={1122}
            loading="eager"
          />
        </Box>
        <Box display="flex" flexDirection="column" mb="150px">
          <Typography variant="h1">ANIPOOL</Typography>
          <Typography variant="h6">
            Create anime quiz pools integrated with anilist.co
          </Typography>
          <Box mt="15px">
            <Button variant="contained" size="large">
              Login with anilist
            </Button>
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Home;
