export const metadata = {
    title: "About Us | Aura IT",
    description: "Learn more about Aura IT's mission and expertise.",
};

export default function AboutPage() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl pt-24 pb-16 px-6 sm:pt-32 lg:px-8">
                <div className="mx-auto max-w-3xl lg:mx-0">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                        Who we are
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        Aura IT is a premier technology consulting firm specializing in architecting modern tech stacks, implementing high-grade cybersecurity protocols, and transforming data into actionable insights.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl lg:mt-24 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-24">
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900">Our Mission</h3>
                            <p className="mt-6 text-base leading-7 text-slate-600">
                                To simplify complex enterprise technology. We believe in building resilient infrastructure that allows businesses to scale rapidly without worrying about technical debt, security breaches, or system downtimes. Our approach integrates closely with your leadership teams to guarantee outcomes, not just deliverables.
                            </p>

                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 mt-12">The Engineering Standard</h3>
                            <p className="mt-6 text-base leading-7 text-slate-600">
                                Aura IT prides itself on meticulous code quality, cloud-native operational standards, and an unyielding commitment to security. Every engineer in our firm operates with an enterprise-level maturity to ensure that mission-critical systems run flawlessly.
                            </p>
                        </div>

                        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
                            <div className="border-t border-slate-200 pt-6">
                                <dt className="text-base font-medium text-slate-500">Founded</dt>
                                <dd className="mt-2 text-3xl font-bold tracking-tight text-slate-900">2016</dd>
                            </div>
                            <div className="border-t border-slate-200 pt-6">
                                <dt className="text-base font-medium text-slate-500">Enterprise Clients</dt>
                                <dd className="mt-2 text-3xl font-bold tracking-tight text-slate-900">150+</dd>
                            </div>
                            <div className="border-t border-slate-200 pt-6">
                                <dt className="text-base font-medium text-slate-500">Global Reach</dt>
                                <dd className="mt-2 text-3xl font-bold tracking-tight text-slate-900">12 Countries</dd>
                            </div>
                            <div className="border-t border-slate-200 pt-6">
                                <dt className="text-base font-medium text-slate-500">Uptime Record</dt>
                                <dd className="mt-2 text-3xl font-bold tracking-tight text-slate-900">99.999%</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
