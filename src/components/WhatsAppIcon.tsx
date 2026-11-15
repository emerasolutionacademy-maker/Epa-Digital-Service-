import React from 'react';

export function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.031 2C6.504 2 2.022 6.482 2.022 12.008c0 1.763.461 3.484 1.337 5.002L2 22l5.115-1.341a9.97 9.97 0 0 0 4.916 1.292h.004c5.525 0 10.007-4.482 10.009-10.008.001-2.674-1.04-5.188-2.93-7.079A9.946 9.946 0 0 0 12.031 2Zm5.825 14.167c-.245.69-1.434 1.318-1.994 1.399-.506.074-1.147.105-1.852-.118-.428-.135-.976-.319-1.678-.622-2.952-1.274-4.881-4.243-5.028-4.44-.148-.196-1.2-1.596-1.2-3.044 0-1.448.758-2.16 1.028-2.454.27-.295.588-.368.785-.368.196 0 .393.002.564.01.181.009.423-.069.662.505.245.59.834 2.036.907 2.183.074.148.123.32.025.516-.098.196-.148.32-.295.49-.148.173-.31.385-.442.517-.148.148-.302.309-.13.604.172.295.764 1.261 1.641 2.043 1.127 1.005 2.078 1.317 2.373 1.464.294.147.466.123.638-.074.172-.196.736-.86.933-1.155.196-.294.392-.245.662-.147.27.098 1.718.81 2.013.957.295.148.491.221.565.344.073.123.073.713-.172 1.403Z" />
    </svg>
  );
}

interface WhatsAppButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * Green (#1FAF5B) button reserved exclusively for WhatsApp actions.
 */
export function WhatsAppButton({
  href,
  children,
  className = '',
  ariaLabel,
}: WhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#1FAF5B] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#19944C] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1FAF5B] whitespace-nowrap ${className}`}
    >
      <WhatsAppIcon className="h-4 w-4 shrink-0" />
      <span>{children}</span>
    </a>
  );
}
