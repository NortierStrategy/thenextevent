"use client";

import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import InView from "@/components/ui/InView";
import type { Dictionary } from "@/lib/i18n";

export default function Team({ dict }: { dict: Dictionary }) {
  const { team } = dict;

  return (
    <Section id="equipe">
      <SectionTitle label={team.label} title={team.title} italicWord={team.italicWord} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {team.members.map((member) => (
          <InView key={member.name}>
            <div className="flex flex-col items-center text-center p-7 border border-red/[0.08] rounded-[4px] hover:border-red/20 transition-colors duration-500">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red to-red-dark flex items-center justify-center mb-5">
                <span className="font-playfair text-2xl font-light text-white">{member.initials}</span>
              </div>
              <h3 className="font-playfair text-lg text-text font-light mb-1">{member.name}</h3>
              <p className="font-outfit text-[11px] font-semibold uppercase tracking-[3px] text-red mb-3">{member.role}</p>
              <p className="font-outfit text-sm text-text-muted font-light leading-relaxed mb-5">{member.specialty}</p>
              <div className="mt-auto pt-4 border-t border-red/[0.08] w-full">
                <span className="font-playfair text-2xl text-text font-light">{member.stat}</span>
                <span className="block font-outfit text-[11px] text-text-muted uppercase tracking-[2px] mt-1">{member.statLabel}</span>
              </div>
            </div>
          </InView>
        ))}
      </div>
    </Section>
  );
}
