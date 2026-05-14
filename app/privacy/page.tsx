import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Kyberia Tech',
  description: 'Privacy Policy for Kyberia Tech — how we collect, use, and protect your personal information.',
}

const LAST_UPDATED = 'May 14, 2026'

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="about-hero" aria-label="Privacy Policy">
        <div className="section-eyebrow">Legal</div>
        <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(36px,5vw,64px)', letterSpacing: '-.03em', lineHeight: .92, marginBottom: 16 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 14, color: 'var(--g500)', marginTop: 8 }}>
          Last updated: {LAST_UPDATED}
        </p>
      </section>

      {/* Content */}
      <section style={{ padding: 'var(--section-py) var(--section-px)', width: '100%', borderTop: '1px solid var(--br2)' }}>
        <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 40 }}>

          {/* Intro */}
          <div className="pp-block">
            <p className="pp-lead">
              Kyberia Tech (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is a creative and technology studio registered in Cairo, Egypt and operating globally. This Privacy Policy explains what personal information we collect when you visit <strong>kyberia.tech</strong>, use our services, or contact us — and how we use, store, and protect that information.
            </p>
            <p className="pp-lead" style={{ marginTop: 16 }}>
              By using our website or submitting your information to us, you agree to the practices described in this policy.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 1. Information We Collect */}
          <div className="pp-block">
            <h2 className="pp-h2">1. Information We Collect</h2>

            <h3 className="pp-h3">Information you provide directly</h3>
            <p className="pp-body">When you fill out our contact form, submit a project request, or email us, we collect:</p>
            <ul className="pp-list">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number (if provided)</li>
              <li>Company name and country</li>
              <li>Project details, budget range, and message content</li>
              <li>Any files or attachments you choose to send</li>
            </ul>

            <h3 className="pp-h3">Account information</h3>
            <p className="pp-body">
              If you create an account on our platform (via our Portal or client area), we collect your name, email address, and any profile information you provide. Account authentication is handled by <strong>Clerk</strong> — their privacy policy applies to authentication data.
            </p>

            <h3 className="pp-h3">Information collected automatically</h3>
            <p className="pp-body">When you visit our website, we and our hosting provider (Vercel) may automatically collect:</p>
            <ul className="pp-list">
              <li>IP address and approximate geographic location</li>
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>Pages visited, time spent, and navigation path</li>
              <li>Referring URL</li>
            </ul>
            <p className="pp-body">This data is collected in aggregate for performance monitoring and does not identify you personally.</p>
          </div>

          <hr className="pp-rule" />

          {/* 2. How We Use Your Information */}
          <div className="pp-block">
            <h2 className="pp-h2">2. How We Use Your Information</h2>
            <p className="pp-body">We use the information we collect to:</p>
            <ul className="pp-list">
              <li>Respond to your enquiries and project requests</li>
              <li>Scope, quote, and deliver the services you engage us for</li>
              <li>Send project updates, invoices, and delivery confirmations</li>
              <li>Improve our website and service experience</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="pp-body">
              We do <strong>not</strong> use your information for unsolicited marketing unless you have explicitly opted in. We do <strong>not</strong> sell, rent, or trade your personal data to any third party.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 3. Legal Basis for Processing */}
          <div className="pp-block">
            <h2 className="pp-h2">3. Legal Basis for Processing</h2>
            <p className="pp-body">Where applicable (including for users in the European Union under GDPR), we process your personal data on the following legal bases:</p>
            <ul className="pp-list">
              <li><strong>Contractual necessity</strong> — to fulfil a project or service you have engaged us for</li>
              <li><strong>Legitimate interests</strong> — to respond to enquiries and improve our services</li>
              <li><strong>Consent</strong> — where you have explicitly agreed to a specific use (e.g. marketing emails)</li>
              <li><strong>Legal obligation</strong> — where we are required by law to process data</li>
            </ul>
          </div>

          <hr className="pp-rule" />

          {/* 4. Cookies */}
          <div className="pp-block">
            <h2 className="pp-h2">4. Cookies</h2>
            <p className="pp-body">Our website uses a small number of essential cookies required for the site to function (session management, security tokens). We do not use advertising or tracking cookies.</p>
            <p className="pp-body" style={{ marginTop: 12 }}>
              You can control cookie behaviour through your browser settings. Disabling cookies may affect the functionality of account-related features.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 5. Third-Party Services */}
          <div className="pp-block">
            <h2 className="pp-h2">5. Third-Party Services</h2>
            <p className="pp-body">We use the following third-party services in our operations. Each has its own privacy policy:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              {[
                { name: 'Vercel', role: 'Website hosting and infrastructure', url: 'https://vercel.com/legal/privacy-policy' },
                { name: 'Clerk', role: 'User authentication and account management', url: 'https://clerk.com/legal/privacy' },
                { name: 'Google Fonts / Fontshare', role: 'Web font delivery', url: 'https://fonts.google.com/about' },
              ].map(svc => (
                <div key={svc.name} style={{ padding: '14px 16px', background: 'var(--s1)', border: '1px solid var(--br2)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <strong style={{ fontSize: 13, color: 'var(--white)' }}>{svc.name}</strong>
                  <span style={{ fontSize: 12, color: 'var(--g300)' }}>{svc.role}</span>
                  <a href={svc.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: 'var(--pink)', fontFamily: 'var(--fm)' }}>{svc.url}</a>
                </div>
              ))}
            </div>
          </div>

          <hr className="pp-rule" />

          {/* 6. Data Retention */}
          <div className="pp-block">
            <h2 className="pp-h2">6. Data Retention</h2>
            <p className="pp-body">
              We retain enquiry and project data for as long as necessary to fulfil the services you engage us for, and for a period of <strong>3 years</strong> thereafter for business records and legal compliance purposes.
            </p>
            <p className="pp-body" style={{ marginTop: 12 }}>
              If you request deletion of your data, we will delete or anonymise it within 30 days, except where we are legally required to retain it.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 7. International Transfers */}
          <div className="pp-block">
            <h2 className="pp-h2">7. International Data Transfers</h2>
            <p className="pp-body">
              Kyberia Tech operates globally. When you submit data to us, it may be stored or processed in countries outside your own, including Egypt, the United States, and the European Union (via our infrastructure providers). We take reasonable steps to ensure your data is treated securely regardless of where it is processed.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 8. Your Rights */}
          <div className="pp-block">
            <h2 className="pp-h2">8. Your Rights</h2>
            <p className="pp-body">Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="pp-list">
              <li><strong>Access</strong> — request a copy of the data we hold about you</li>
              <li><strong>Rectification</strong> — request correction of inaccurate data</li>
              <li><strong>Erasure</strong> — request deletion of your data (&quot;right to be forgotten&quot;)</li>
              <li><strong>Restriction</strong> — request that we limit how we use your data</li>
              <li><strong>Portability</strong> — receive your data in a structured, machine-readable format</li>
              <li><strong>Objection</strong> — object to processing based on legitimate interests</li>
              <li><strong>Withdraw consent</strong> — where processing is based on consent, withdraw it at any time</li>
            </ul>
            <p className="pp-body" style={{ marginTop: 12 }}>
              To exercise any of these rights, contact us at <a href="mailto:hello@kyberia.tech">hello@kyberia.tech</a>. We will respond within 30 days.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 9. Security */}
          <div className="pp-block">
            <h2 className="pp-h2">9. Security</h2>
            <p className="pp-body">
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. Our website is served over HTTPS, and access to any stored data is restricted to authorised personnel only.
            </p>
            <p className="pp-body" style={{ marginTop: 12 }}>
              No method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 10. Children */}
          <div className="pp-block">
            <h2 className="pp-h2">10. Children&apos;s Privacy</h2>
            <p className="pp-body">
              Our services are not directed at individuals under the age of 16. We do not knowingly collect personal data from children. If you believe a child has submitted personal information to us, please contact us and we will delete it promptly.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 11. Changes */}
          <div className="pp-block">
            <h2 className="pp-h2">11. Changes to This Policy</h2>
            <p className="pp-body">
              We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last updated&quot; date at the top of this page. We encourage you to review this page periodically. Continued use of our website after changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 12. Contact */}
          <div className="pp-block">
            <h2 className="pp-h2">12. Contact Us</h2>
            <p className="pp-body">If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
            <div style={{ marginTop: 20, padding: '20px 24px', background: 'var(--s1)', border: '1px solid var(--br2)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--white)', fontFamily: 'var(--fd)' }}>Kyberia Tech</div>
              <div style={{ fontSize: 13, color: 'var(--g300)' }}>Cairo, Egypt</div>
              <a href="mailto:hello@kyberia.tech" style={{ fontSize: 13, color: 'var(--pink)' }}>hello@kyberia.tech</a>
              <a href="https://kyberia.tech" style={{ fontSize: 13, color: 'var(--pink)' }}>kyberia.tech</a>
            </div>
          </div>

          {/* Back link */}
          <div style={{ paddingTop: 16 }}>
            <Link href="/" style={{ fontFamily: 'var(--fm)', fontSize: 11, color: 'var(--g500)', letterSpacing: '.08em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              ← Back to Homepage
            </Link>
          </div>

        </div>
      </section>

      <style>{`
        .pp-lead  { font-size: 15px; color: var(--g300); line-height: 1.8; }
        .pp-h2    { font-family: var(--fd); font-weight: 700; font-size: clamp(18px,2.2vw,22px); letter-spacing: -.01em; margin-bottom: 14px; color: var(--white); }
        .pp-h3    { font-family: var(--fd); font-weight: 600; font-size: 14px; color: var(--pink); letter-spacing: .02em; margin: 20px 0 8px; text-transform: uppercase; font-size: 11px; letter-spacing: .12em; }
        .pp-body  { font-size: 14px; color: var(--g300); line-height: 1.8; }
        .pp-list  { margin: 10px 0 0 20px; display: flex; flex-direction: column; gap: 7px; }
        .pp-list li { font-size: 14px; color: var(--g300); line-height: 1.7; list-style: disc; }
        .pp-list li strong { color: var(--white); }
        .pp-rule  { border: none; border-top: 1px solid var(--br2); margin: 0; }
        .pp-block { display: flex; flex-direction: column; }
      `}</style>
    </>
  )
}
