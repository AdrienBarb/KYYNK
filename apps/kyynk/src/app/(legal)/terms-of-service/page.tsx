import React from 'react';
import PageContainer from '@/components/PageContainer';
import styles from '@/styles/Legal.module.scss';
import { useTranslations } from 'next-intl';
import { genPageMetadata } from '@/app/seo';
import Title from '@/components/ui/Title';
import Text from '@/components/ui/Text';

export const metadata = genPageMetadata({
  title: 'Terms of Service',
  description:
    'Review the Terms of Service of KYYNK to understand your rights and responsibilities as a user of our platform.',
});

const TermsOfUsePage = () => {
  const t = useTranslations();

  return (
    <PageContainer>
      <div className={styles.container}>
        <Title Tag="h1">Terms of Service</Title>
        <Text>Last Updated: February 2025</Text>
        <Title Tag="h2">1. Introduction</Title>
        <Text>
          Welcome to Kyynk. These Terms of Service (ToS) govern your use of our
          platform. By accessing or using our services, you agree to comply with
          these terms.
        </Text>
        <Title Tag="h2">2. Eligibility and Age Verification</Title>
        <Text>
          Users must be at least 18 years old to access Kyynk. All users must
          verify their identity by uploading a government-issued ID, which is
          reviewed by our internal verification team. Attempts to bypass
          verification will result in account termination.
        </Text>
        <Title Tag="h2">3. Content Management Policy & Procedures</Title>
        <Text>
          Kyynk enforces strict content management policies, including:
        </Text>
        <Text>
          - <strong>Pre-publication review:</strong> All content is reviewed
          before being published to ensure compliance.
        </Text>
        <Text>
          - <strong>Real-time monitoring:</strong> Our team actively monitors
          content and removes any violating materials.
        </Text>
        <Text>
          - <strong>Prohibited content:</strong> Child exploitation,
          non-consensual content, bestiality, extreme violence, and illegal
          activities are strictly prohibited.
        </Text>
        <Text>
          - <strong>Human trafficking prevention:</strong> The platform may not
          be used for any form of trafficking or exploitation.
        </Text>
        <Text>
          - <strong>Content removal:</strong> Any illegal or policy-violating
          content will be removed immediately.
        </Text>
        <Title Tag="h2">4. Title 18 U.S.C. 2257 Compliance</Title>
        <Text>
          Kyynk complies with U.S. record-keeping laws for adult content. We
          require all content providers to submit valid age verification
          documents. Our compliance officer can be reached at legal@kyynk.com.
        </Text>
        <Title Tag="h2">5. Payments, Refunds & Chargebacks</Title>
        <Text>
          - <strong>Payments:</strong> Users can purchase content using credits.
          Payouts to content creators follow our payment policies.
        </Text>
        <Text>
          - <strong>Refunds:</strong> All purchases are final and
          non-refundable, except where required by law.
        </Text>
        <Text>
          - <strong>Chargebacks:</strong> Unauthorized chargebacks may result in
          account suspension. If you believe a charge was unauthorized, contact
          billing@kyynk.com.
        </Text>
        <Title Tag="h2">6. Complaint & Content Removal Policy</Title>
        <Text>
          - <strong>User complaints:</strong> Users can report illegal or
          policy-violating content by emailing complaints@kyynk.com.
        </Text>
        <Text>
          - <strong>Resolution timeframe:</strong> Complaints will be reviewed
          within <strong>7 business days</strong>.
        </Text>
        <Text>
          - <strong>Content removal:</strong> Illegal content will be removed{' '}
          <strong>immediately</strong>.
        </Text>
        <Text>
          - <strong>Appeals:</strong> Individuals depicted in content may
          request removal via our complaint process.
        </Text>
        <Title Tag="h2">7. Prohibited Activities</Title>
        <Text>Users may not:</Text>
        <Text>- Upload or share illegal or non-consensual content.</Text>
        <Text>
          - Use the platform for trafficking, exploitation, or other unlawful
          activities.
        </Text>
        <Text>- Engage in harassment, threats, or abusive behavior.</Text>
        <Title Tag="h2">8. Account Suspension & Termination</Title>
        <Text>
          Kyynk may suspend or terminate user accounts for violations of these
          terms. Users can appeal a termination decision by contacting
          legal@kyynk.com.
        </Text>
        <Title Tag="h2">9. Liability and Indemnification</Title>
        <Text>
          Users agree to indemnify and hold Kyynk harmless from any claims,
          damages, or legal actions resulting from their activities on the
          platform.
        </Text>
        <Title Tag="h2">10. Governing Law</Title>
        <Text>
          These Terms of Service are governed by the laws of [Your
          Jurisdiction].
        </Text>
        <Title Tag="h2">11. Contact Information</Title>
        <Text>For legal or compliance inquiries, contact:</Text>
        <Text>
          <strong>Legal & Compliance:</strong> legal@kyynk.com
        </Text>
        <Text>
          <strong>Billing & Refunds:</strong> billing@kyynk.com
        </Text>
        <Text>
          <strong>User Complaints & Content Removal:</strong>{' '}
          complaints@kyynk.com
        </Text>
      </div>
    </PageContainer>
  );
};

export default TermsOfUsePage;
