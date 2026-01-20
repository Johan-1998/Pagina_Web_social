"use client";

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.11 17.59c-.27-.14-1.6-.79-1.85-.88-.25-.09-.44-.14-.62.14-.18.27-.71.88-.87 1.06-.16.18-.32.21-.59.07-.27-.14-1.15-.42-2.2-1.35-.82-.73-1.38-1.63-1.54-1.9-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.53-.44-.46-.62-.47h-.53c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.99 2.67 1.13 2.85.14.18 1.95 2.98 4.73 4.18.66.29 1.17.46 1.57.59.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.28.23-.62.23-1.16.16-1.28-.07-.11-.25-.18-.53-.32z"
      />
      <path
        fill="currentColor"
        d="M16.04 3C9.39 3 4 8.39 4 15.04c0 2.33.66 4.5 1.8 6.34L4 29l7.82-1.75a12 12 0 0 0 4.22.77c6.65 0 12.04-5.39 12.04-12.04C28.08 8.39 22.69 3 16.04 3zm0 21.93c-1.34 0-2.59-.27-3.72-.77l-.53-.24-4.64 1.04 1.02-4.52-.28-.56a9.89 9.89 0 0 1-1.3-4.84c0-5.47 4.46-9.93 9.93-9.93 5.47 0 9.93 4.46 9.93 9.93 0 5.47-4.46 9.93-9.93 9.93z"
      />
    </svg>
  );
}

function buildWhatsAppLink() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const msg = encodeURIComponent("Hola. Quiero orientación sobre un caso de servicios públicos en Bogotá. ¿Me pueden ayudar?");
  return `https://wa.me/${number}?text=${msg}`;
}

export default function FloatingWhatsApp() {
  const wa = buildWhatsAppLink();

  return (
    <a
      href={wa}
      rel="noopener"
      aria-label="Abrir WhatsApp"
      title="WhatsApp"
      className="fixed bottom-5 right-5 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg"
      style={{ background: "var(--wa)" }}
    >
      <WhatsAppIcon />
    </a>
  );
}