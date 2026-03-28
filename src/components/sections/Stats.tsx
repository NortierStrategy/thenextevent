import Counter from "@/components/ui/Counter";
import type { Dictionary } from "@/lib/i18n";

interface StatsProps {
  dict: Dictionary;
}

export default function Stats({ dict }: StatsProps) {
  return (
    <section className="bg-dark border-y border-red/[0.08] py-8 md:py-11 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {dict.stats.map((stat) => (
            <Counter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
