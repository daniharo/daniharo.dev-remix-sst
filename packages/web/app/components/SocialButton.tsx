export type SocialButtonProps = {
  href: string;
  children: React.ReactNode;
};

export const SocialButton = ({ href, children }: SocialButtonProps) => (
  <a
    className="flex h-12 w-12 items-center justify-center rounded-full border border-solid transition-colors hover:bg-white hover:text-black"
    href={href}
    target="_blank"
  >
    {children}
  </a>
);
