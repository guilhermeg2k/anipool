import type { NextPage } from 'next';
import Button from '../components/general/Button';
import Page from '../components/general/Page';

const Home: NextPage = () => {
  return (
    <Page bgImage="images/bg-home.jpg">
      <Button className='bg-green-500 hover:bg-green-400 active:bg-green-500'>Login with anilist</Button>
    </Page>
  );
};

export default Home;
