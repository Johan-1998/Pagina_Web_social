"use client";

export default function FloatingWhatsApp() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573114244234";
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola, necesito ayuda con un caso de servicios públicos."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:opacity-90"
    >
      <span className="sr-only">WhatsApp</span>
      {/* Ícono simple */}
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19.11 17.63c-.28-.14-1.64-.81-1.9-.9-.26-.1-.45-.14-.64.14-.19.28-.73.9-.9 1.09-.16.19-.33.21-.61.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.33.43-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.64-1.54-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.43 0 1.42 1.02 2.8 1.16 2.99.14.19 2.01 3.07 4.87 4.31.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.12.55-.08 1.64-.67 1.88-1.31.23-.64.23-1.19.16-1.31-.07-.12-.26-.19-.54-.33z"
        />
        <path
          fill="currentColor"
          d="M26.68 5.32A13.4 13.4 0 0 0 16.01 1C8.83 1 3 6.83 3 14c0 2.28.6 4.5 1.74 6.46L3 31l10.8-1.7A12.92 12.92 0 0 0 16 27c7.18 0 13.01-5.83 13.01-13a13 13 0 0 0-2.33-8.68zM16 25.1c-1.93 0-3.83-.52-5.49-1.52l-.39-.23-6.41 1.01 1.03-6.25-.25-.4A10.93 10.93 0 0 1 5.1 14C5.1 7.98 9.98 3.1 16 3.1c2.92 0 5.66 1.14 7.72 3.2A10.84 10.84 0 0 1 26.9 14c0 6.02-4.88 11.1-10.9 11.1z"
        />
      </svg>
    </a>
  );
}
