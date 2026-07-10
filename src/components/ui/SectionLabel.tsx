import { cx } from "../../lib/cx";

/** The recurring eyebrow: a tick, an index, and a label in letter-spaced grotesk. */
export default function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cx("inline-flex items-center gap-3", className)}>
      <span className="h-px w-8 bg-gradient-to-r from-nova-sky/70 to-transparent" />
      <span className="label">{children}</span>
    </span>
  );
}
