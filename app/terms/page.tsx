import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Kyberia Tech',
  description: 'Terms and Conditions for Kyberia Tech — the rules and agreements governing use of our website and services.',
}

const LAST_UPDATED = 'May 14, 2026'

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="about-hero" aria-label="Terms and Conditions">
        <div className="section-eyebrow">Legal</div>
        <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(36px,5vw,64px)', letterSpacing: '-.03em', lineHeight: .92, marginBottom: 16 }}>
          Terms &amp; Conditions
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
              These Terms and Conditions (&quot;Terms&quot;) govern your use of the website <strong>kyberia.tech</strong> and any services provided by Kyberia Tech (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), a creative and technology studio registered in Cairo, Egypt and operating globally.
            </p>
            <p className="pp-lead" style={{ marginTop: 16 }}>
              By accessing our website or engaging our services, you confirm that you have read, understood, and agreed to these Terms. If you do not agree, please do not use our website or services.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 1. Services */}
          <div className="pp-block">
            <h2 className="pp-h2">1. Services</h2>
            <p className="pp-body">
              Kyberia Tech provides branding and strategy, graphic design, and web design and development services. The specific scope, deliverables, timeline, and pricing for any engagement are defined in a separate project agreement, proposal, or statement of work (&quot;Project Agreement&quot;) agreed upon in writing between you and Kyberia Tech.
            </p>
            <p className="pp-body" style={{ marginTop: 12 }}>
              These Terms apply in addition to any Project Agreement. In the event of a conflict between these Terms and a Project Agreement, the Project Agreement shall prevail for that specific engagement.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 2. Website Use */}
          <div className="pp-block">
            <h2 className="pp-h2">2. Use of This Website</h2>
            <p className="pp-body">You agree to use this website only for lawful purposes. You must not:</p>
            <ul className="pp-list">
              <li>Use the site in any way that violates applicable local, national, or international law or regulation</li>
              <li>Attempt to gain unauthorised access to any part of our website, servers, or databases</li>
              <li>Transmit any unsolicited or unauthorised advertising or promotional material</li>
              <li>Reproduce, duplicate, copy, or re-sell any part of our website without express written consent</li>
              <li>Use automated tools (bots, scrapers, crawlers) to access or extract data from the site</li>
            </ul>
            <p className="pp-body" style={{ marginTop: 12 }}>
              We reserve the right to suspend or terminate access to users who violate these conditions.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 3. Intellectual Property */}
          <div className="pp-block">
            <h2 className="pp-h2">3. Intellectual Property</h2>

            <h3 className="pp-h3">Our content</h3>
            <p className="pp-body">
              All content on this website — including text, graphics, logos, icons, images, and code — is the property of Kyberia Tech or its content suppliers and is protected by applicable intellectual property laws. Nothing on this site grants you a licence to reproduce or use our content without prior written permission.
            </p>

            <h3 className="pp-h3">Client deliverables</h3>
            <p className="pp-body">
              Ownership of deliverables produced for a client (design files, code, brand assets) is governed by the relevant Project Agreement. Unless otherwise agreed in writing, full intellectual property rights in deliverables transfer to the client upon receipt of final payment in full.
            </p>
            <p className="pp-body" style={{ marginTop: 12 }}>
              Kyberia Tech retains the right to display completed work in its portfolio, case studies, and promotional materials unless the client requests confidentiality in writing.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 4. Payments */}
          <div className="pp-block">
            <h2 className="pp-h2">4. Payments and Fees</h2>
            <p className="pp-body">
              Payment terms for client projects are specified in the Project Agreement. Unless otherwise stated:
            </p>
            <ul className="pp-list">
              <li>A deposit (typically 50%) is required before work commences</li>
              <li>Final payment is due prior to delivery of final files or launch</li>
              <li>Invoices are payable within the period stated on the invoice</li>
              <li>Late payments may incur interest or result in work being paused</li>
              <li>Prices are quoted exclusive of applicable taxes unless stated otherwise</li>
            </ul>
            <p className="pp-body" style={{ marginTop: 12 }}>
              We do not issue refunds on work already completed or in progress. Deposits are non-refundable if a project is cancelled by the client after work has commenced.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 5. Project Conduct */}
          <div className="pp-block">
            <h2 className="pp-h2">5. Project Conduct and Responsibilities</h2>

            <h3 className="pp-h3">Client responsibilities</h3>
            <p className="pp-body">To enable us to deliver effectively, clients agree to:</p>
            <ul className="pp-list">
              <li>Provide accurate, complete, and timely information, materials, and feedback</li>
              <li>Designate a primary point of contact with authority to approve decisions</li>
              <li>Review and respond to submissions within agreed timeframes</li>
              <li>Ensure all materials provided to us are owned by the client or properly licensed</li>
            </ul>

            <h3 className="pp-h3">Scope changes</h3>
            <p className="pp-body">
              Any changes to the agreed scope of work must be requested in writing. Scope changes may affect the timeline and price and will be agreed upon before implementation.
            </p>

            <h3 className="pp-h3">Revisions</h3>
            <p className="pp-body">
              The number of revision rounds included in a project is defined in the Project Agreement. Revisions beyond the agreed rounds will be quoted and charged separately.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 6. Confidentiality */}
          <div className="pp-block">
            <h2 className="pp-h2">6. Confidentiality</h2>
            <p className="pp-body">
              Both parties agree to keep confidential any non-public information shared during a project engagement — including business strategies, financial data, and technical specifications. This obligation survives the completion or termination of any project.
            </p>
            <p className="pp-body" style={{ marginTop: 12 }}>
              Confidentiality does not apply to information that is or becomes publicly available through no fault of the receiving party, or that the receiving party already possessed independently.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 7. Disclaimers */}
          <div className="pp-block">
            <h2 className="pp-h2">7. Disclaimers</h2>
            <p className="pp-body">
              This website and its content are provided on an &quot;as is&quot; basis. To the fullest extent permitted by law, we make no warranties — express or implied — regarding the accuracy, completeness, or fitness for a particular purpose of any content on this site.
            </p>
            <p className="pp-body" style={{ marginTop: 12 }}>
              We do not guarantee that the website will be uninterrupted, error-free, or free from viruses or other harmful components. We reserve the right to modify, suspend, or discontinue the website at any time without notice.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 8. Limitation of Liability */}
          <div className="pp-block">
            <h2 className="pp-h2">8. Limitation of Liability</h2>
            <p className="pp-body">
              To the maximum extent permitted by applicable law, Kyberia Tech shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our website or services — including loss of profit, data, or business opportunity.
            </p>
            <p className="pp-body" style={{ marginTop: 12 }}>
              Our total liability for any claim arising from a project engagement shall not exceed the total fees paid by the client for that specific project in the three months preceding the claim.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 9. Third-Party Links */}
          <div className="pp-block">
            <h2 className="pp-h2">9. Third-Party Links</h2>
            <p className="pp-body">
              Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them. Visiting a linked site is at your own risk.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 10. Termination */}
          <div className="pp-block">
            <h2 className="pp-h2">10. Termination</h2>
            <p className="pp-body">
              Either party may terminate a project engagement by providing written notice. Upon termination:
            </p>
            <ul className="pp-list">
              <li>The client is liable for payment of all work completed up to the date of termination</li>
              <li>Kyberia Tech will deliver all completed work to the client upon receipt of outstanding payment</li>
              <li>Deposits and payments for completed phases are non-refundable</li>
            </ul>
          </div>

          <hr className="pp-rule" />

          {/* 11. Governing Law */}
          <div className="pp-block">
            <h2 className="pp-h2">11. Governing Law</h2>
            <p className="pp-body">
              These Terms are governed by and construed in accordance with the laws of the Arab Republic of Egypt. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Cairo, Egypt, unless otherwise agreed in writing.
            </p>
            <p className="pp-body" style={{ marginTop: 12 }}>
              For clients located in the European Union, nothing in these Terms affects your statutory rights under applicable EU law.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 12. Changes */}
          <div className="pp-block">
            <h2 className="pp-h2">12. Changes to These Terms</h2>
            <p className="pp-body">
              We may update these Terms from time to time. When we do, we will revise the &quot;Last updated&quot; date at the top of this page. Continued use of our website or services after changes are posted constitutes your acceptance of the revised Terms. We encourage you to review this page periodically.
            </p>
          </div>

          <hr className="pp-rule" />

          {/* 13. Contact */}
          <div className="pp-block">
            <h2 className="pp-h2">13. Contact Us</h2>
            <p className="pp-body">If you have any questions or concerns about these Terms, please contact us:</p>
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
