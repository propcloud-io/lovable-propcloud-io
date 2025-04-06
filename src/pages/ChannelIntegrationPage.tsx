import React from 'react';
import { Helmet } from 'react-helmet';
import ChannelIntegration from '@/components/onboarding/ChannelIntegration';
import { Toaster } from '@/components/ui/toaster';

const ChannelIntegrationPage = () => {
  return (
    <>
      <Helmet>
        <title>Channel Integration | Your Property Management</title>
      </Helmet>
      
      <div className="container mx-auto py-8 px-4">
        <ChannelIntegration />
      </div>
      
      <Toaster />
    </>
  );
};

export default ChannelIntegrationPage;