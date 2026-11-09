import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Reveal } from "@/components/ui/reveal";
import type { Package } from "@/content/types";

export function Plans({ packages }: { packages: Package[] }) {
  return (
    <div className="flex flex-col gap-6">
      {packages.map((pkg) => (
        <Reveal key={pkg.name} className="flex flex-wrap gap-px border border-line bg-line">
          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-2.5 bg-ink px-[22px] py-6">
            <h3 className="display m-0 text-[24px]">{pkg.name}</h3>
            <p className="m-0 font-medium text-mint">{pkg.tagline}</p>
            <p className="m-0 text-[15.5px] text-soft">{pkg.summary}</p>
          </div>
          <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-px">
            {pkg.tiers.map((tier) => (
              <div key={tier.name} className="relative flex flex-wrap gap-x-6 gap-y-1.5 bg-ink px-[22px] py-[18px]">
                <GlowingEffect disabled={false} proximity={48} spread={30} inactiveZone={0.01} borderWidth={1} />
                <div className="flex-[0_0_190px]">
                  <b className="text-[17px] font-semibold">{tier.name}</b>
                  <span className="block font-mono text-[12px] text-muted">{tier.size}</span>
                </div>
                <p className="m-0 flex-[1_1_260px] text-[15.5px] text-soft">{tier.scope}</p>
                <p className="m-0 flex-[0_0_170px] font-mono text-[12.5px] text-muted">{tier.team}</p>
              </div>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
