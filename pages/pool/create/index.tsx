import { NextPage } from 'next';
import Box from '../../../components/Box';
import Page from '../../../components/Page';
import SmallLogo from '../../../components/SmallLogo';

const CreatePool: NextPage = () => {
  return (
    <Page bgImage="/images/bg-create-pool.jpg">
      <div className="mx-auto max-w-3xl">
        <SmallLogo />
        <Box className="">Hello World</Box>
      </div>
    </Page>
  );
};

export default CreatePool;
