export default function ChatBubble() {
  return (
    <a
      className="kt-chat"
      href="https://wa.me/message/SJXEXHUQIVT5C1"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with the Kyberia team on WhatsApp"
      title="Message us"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <div className="kt-chat__tooltip">Message the team →</div>
    </a>
  )
}
