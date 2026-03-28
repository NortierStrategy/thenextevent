import InView from "@/components/ui/InView";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "black" | "dark";
  compact?: boolean;
}

export default function Section({
  children,
  className = "",
  id,
  variant = "black",
  compact = false,
}: SectionProps) {
  return (
    <InView
      as="section"
      id={id}
      className={`${compact ? "py-14 md:py-16" : "py-16 md:py-24"} px-6 md:px-8 ${variant === "dark" ? "bg-dark" : "bg-black"} ${className}`}
    >
      <div className="max-w-[1200px] mx-auto">{children}</div>
    </InView>
  );
}
