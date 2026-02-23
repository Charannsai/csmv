import { Building2, Mail, Phone } from "lucide-react";

export const metadata = {
    title: "Contact | Aura IT",
    description: "Get in touch with enterprise IT consultants.",
};

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Let's craft your technological backbone.</h2>
                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        Reach out for IT consulting, cloud migrations, vulnerability assessments, or custom engineering projects. Our senior architects normally respond within 24 hours.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    <div>
                        <h3 className="border-l border-primary pl-6 font-semibold text-slate-900">Global Headquarters</h3>
                        <address className="border-l border-slate-200 pl-6 pt-2 not-italic text-slate-600">
                            <p>404 Tech Innovation Park</p>
                            <p>Suite 200, Enterprise Avenue</p>
                            <p>San Francisco, CA 94107</p>
                        </address>
                    </div>
                    <div>
                        <h3 className="border-l border-primary pl-6 font-semibold text-slate-900">EMEA Hub</h3>
                        <address className="border-l border-slate-200 pl-6 pt-2 not-italic text-slate-600">
                            <p>12 Digital Square</p>
                            <p>London</p>
                            <p>EC1A 1BB, UK</p>
                        </address>
                    </div>
                </div>

                <div className="mt-16 bg-slate-50 rounded-2xl p-8 sm:p-12 lg:p-16 ring-1 ring-slate-200">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-1 border-b pb-8 lg:border-b-0 lg:border-r border-slate-200 lg:pr-8">
                            <h3 className="text-xl font-bold tracking-tight text-slate-900">How can we help?</h3>
                            <dl className="mt-8 space-y-6 text-base leading-7 text-slate-600">
                                <div className="flex gap-x-4 items-center">
                                    <dt className="flex-none text-primary">
                                        <span className="sr-only">Telephone</span>
                                        <Phone className="h-6 w-6" aria-hidden="true" />
                                    </dt>
                                    <dd>
                                        <a className="hover:text-slate-900" href="tel:+1(555)123-4567">
                                            +1 (555) 123-4567
                                        </a>
                                    </dd>
                                </div>
                                <div className="flex gap-x-4 items-center">
                                    <dt className="flex-none text-primary">
                                        <span className="sr-only">Email</span>
                                        <Mail className="h-6 w-6" aria-hidden="true" />
                                    </dt>
                                    <dd>
                                        <a className="hover:text-slate-900" href="mailto:consulting@aurait.com">
                                            consulting@aurait.com
                                        </a>
                                    </dd>
                                </div>
                                <div className="flex gap-x-4 items-start">
                                    <dt className="flex-none text-primary mt-1">
                                        <span className="sr-only">Office</span>
                                        <Building2 className="h-6 w-6" aria-hidden="true" />
                                    </dt>
                                    <dd>
                                        Monday-Friday<br />
                                        9:00 AM - 6:00 PM EST
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <form action="#" method="POST" className="lg:col-span-2">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-slate-900">First name</label>
                                    <div className="mt-2.5">
                                        <input type="text" name="first-name" id="first-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-slate-900">Last name</label>
                                    <div className="mt-2.5">
                                        <input type="text" name="last-name" id="last-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">Email</label>
                                    <div className="mt-2.5">
                                        <input type="email" name="email" id="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="message" className="block text-sm font-medium leading-6 text-slate-900">Message</label>
                                    <div className="mt-2.5">
                                        <textarea name="message" id="message" rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" defaultValue={""} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button type="button" className="rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors">
                                    Send Inquiry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
