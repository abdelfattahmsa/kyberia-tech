import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="kt-footer" role="contentinfo">
      <div className="kt-footer__inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <strong>KYBERIA TECH</strong>
            <p>Create. Design. Innovate.<br />Cairo, Egypt · Global since 2018.<br />Part of Peridot Holding.</p>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              <li><Link href="/services/branding">Branding &amp; Strategy</Link></li>
              <li><Link href="/services/design">Graphic Design</Link></li>
              <li><Link href="/services/web">Web &amp; Technology</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Studio</div>
            <ul className="footer-links">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Connect</div>
            <ul className="footer-links">
              <li><a href="https://linkedin.com/company/kyberiatech" target="_blank" rel="noopener">LinkedIn</a></li>
              <li><a href="https://labs.kyberia.tech" target="_blank" rel="noopener">Kyberia Labs</a></li>
              <li><a href="https://studio.kyberia.tech" target="_blank" rel="noopener">Kyberia Studio</a></li>
              <li><a href="https://blog.kyberia.tech" target="_blank" rel="noopener">Kyberia Blog</a></li>
              <li><a href="mailto:hello@kyberia.tech">hello@kyberia.tech</a></li>
              <li><a href="https://wa.me/message/SJXEXHUQIVT5C1" target="_blank" rel="noopener">WhatsApp</a></li>
              <li><a href="tel:+201128905160">+20 11 2890 5160</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Kyberia Tech · All rights reserved</div>
          <div className="footer-legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
