import { genPageMetadata } from '@/app/seo';
import PageContainer from '@/components/PageContainer';
import Title from '@/components/ui/Title';
import Text from '@/components/ui/Text';
import PaddingContainer from '@/components/layout/PaddingContainer';

export const metadata = genPageMetadata({
  title: 'Contact Us',
  description:
    'Reach out to the KYYNK team for any questions, support requests, or partnership proposals. We are here to listen and will do our best to assist you.',
});

const ContactUsPage = () => {
  return (
    <PageContainer>
      <PaddingContainer>
        <div className="flex flex-col items-center text-center">
          <Title Tag="h2">Contact Us</Title>
          <Text>
            For any legal inquiries, please contact us at:{' '}
            <a href="mailto:legal@kyynk.com">legal@kyynk.com</a>
          </Text>
          <Text>
            Have a problem with billing? Reach out to us at:{' '}
            <a href="mailto:billing@kyynk.com">billing@kyynk.com</a>
          </Text>
          <Text>
            For any complaints, please contact us at:{' '}
            <a href="mailto:complaints@kyynk.com">complaints@kyynk.com</a>
          </Text>
        </div>
      </PaddingContainer>
    </PageContainer>
  );
};

export default ContactUsPage;
