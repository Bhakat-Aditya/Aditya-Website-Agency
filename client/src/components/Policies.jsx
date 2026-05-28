import React from "react";

const PolicyLayout = ({ title, children }) => (
  <main className="bg-zinc-950 min-h-screen text-zinc-300 px-6 py-16 md:py-24 font-sans selection:bg-zinc-800 selection:text-white">
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
          {title}
        </h1>
        <p className="text-sm text-zinc-500 mt-2">Last Updated: May 2026</p>
      </div>
      <div className="space-y-6 text-base leading-relaxed tracking-wide">
        {children}
      </div>
      <div className="pt-12 border-t border-zinc-900 text-center">
        <a
          href="/"
          className="text-sm text-zinc-500 hover:text-white transition-colors duration-200"
        >
          &larr; Back to Aditya Web Agency
        </a>
      </div>
    </div>
  </main>
);

export const Terms = () => (
  <PolicyLayout title="Terms and Conditions">
    <p>
      Welcome to Aditya Web Agency. These Terms and Conditions govern your use
      of our website and the purchase of our web development, UI/UX design, and
      digital systems services. By accessing our website or hiring our agency,
      you agree to be bound by these terms.
    </p>
    <h2 className="text-xl font-medium text-white pt-4">
      1. Services Provided
    </h2>
    <p>
      Aditya Web Agency offers information technology services, including but
      not limited to custom MERN stack development, frontend/backend
      engineering, digital brochure sites, high-converting landing pages,
      premium web animation (GSAP), custom client portals, and third-party
      CRM/API integrations.
    </p>
    <h2 className="text-xl font-medium text-white pt-4">
      2. Client Obligations
    </h2>
    <p>
      Clients must provide accurate project requirements, branding assets, text
      content, and timely feedback necessary for project completion. Aditya Web
      Agency is not liable for project delays caused by a client's failure to
      provide required assets.
    </p>
    <h2 className="text-xl font-medium text-white pt-4">
      3. Intellectual Property
    </h2>
    <p>
      Upon complete and final payment of the project invoice, all rights,
      titles, and intellectual property ownership of the custom code and designs
      created specifically for the client will be transferred entirely to the
      client. Aditya Web Agency retains the right to display the completed work
      in its portfolio and marketing materials unless a formal non-disclosure
      agreement (NDA) is signed.
    </p>
    <h2 className="text-xl font-medium text-white pt-4">
      4. Limitation of Liability
    </h2>
    <p>
      Aditya Web Agency strives to deliver secure, optimized, and
      high-performance digital solutions. However, we are not liable for any
      indirect, incidental, or consequential damages resulting from website
      downtime, unauthorized third-party security breaches, or changes made to
      the source code by the client or external parties post-delivery.
    </p>
    <h2 className="text-xl font-medium text-white pt-4">5. Governing Law</h2>
    <p>
      These terms are governed by and construed in accordance with the laws of
      West Bengal, India. Any disputes arising out of these terms shall be
      subject to the exclusive jurisdiction of the courts in Paschim Medinipur,
      West Bengal.
    </p>
  </PolicyLayout>
);

export const Privacy = () => (
  <PolicyLayout title="Privacy Policy">
    <p>
      At Aditya Web Agency, we value your privacy and are committed to
      protecting your personal data. This Privacy Policy outlines how we
      collect, use, and safeguard your information when you visit our website or
      engage our software development and web design services.
    </p>
    <h2 className="text-xl font-medium text-white pt-4">
      1. Information We Collect
    </h2>
    <p>
      We collect personal information that you voluntarily provide to us when
      contacting us for service inquiries, requesting quotes, or booking
      professional consultations. This information may include your name,
      business name, phone number, email address, physical location, and any
      technical project briefs or credentials shared to execute services.
    </p>
    <h2 className="text-xl font-medium text-white pt-4">
      2. How We Use Your Information
    </h2>
    <p>
      The information we collect is used strictly to respond to your inquiries,
      process transaction payments securely, provide maintenance/technical
      support, and comply with official tax and business compliance requirements
      in India.
    </p>
    <h2 className="text-xl font-medium text-white pt-4">
      3. Data Sharing and Protection
    </h2>
    <p>
      We do not sell, rent, or trade your personal information to third parties.
      Data is shared with external services only when absolutely necessary—such
      as secure, compliant payment gateways (e.g., PhonePe) to safely process
      transactions.
    </p>
    <h2 className="text-xl font-medium text-white pt-4">4. Cookies</h2>
    <p>
      Our website may use standard cookies to improve your user experience,
      track analytical website traffic patterns, and optimize the performance of
      our interface animations. You can choose to disable cookies through your
      browser settings at any time.
    </p>
  </PolicyLayout>
);

export const Refund = () => (
  <PolicyLayout title="Refund Policy">
    <p>
      Thank you for choosing Aditya Web Agency for your digital development and
      design needs. Because we specialize in custom, highly tailored digital
      solutions, our refund guidelines are structured based on the specific
      phase of work completed.
    </p>
    <h2 className="text-xl font-medium text-white pt-4">
      1. Project Onboarding and Deposits
    </h2>
    <p>
      To initiate a project, an initial deposit or milestone payment is
      typically required. Once work on project strategy, asset curation, or
      UI/UX wireframing has begun, the initial deposit becomes non-refundable,
      as it directly compensates for the specialized hours and resources already
      allocated.
    </p>
    <h2 className="text-xl font-medium text-white pt-4">
      2. Mid-Project Cancellations
    </h2>
    <p>
      If a project is canceled by the client midway through development, the
      client is required to pay for all development milestones achieved up to
      the official date of cancellation. Any payments made toward fully
      completed and approved project milestones cannot be refunded.
    </p>
    <h2 className="text-xl font-medium text-white pt-4">
      3. Final Project Delivery
    </h2>
    <p>
      Once the final custom application, website, or digital system code is
      deployed to the production server or transferred over to the client's
      host/repository, no refunds will be issued under any circumstances.
    </p>
    <h2 className="text-xl font-medium text-white pt-4">
      4. Retainers and Support Services
    </h2>
    <p>
      Payments made for monthly technical support, website maintenance
      contracts, or ongoing developer retainers are non-refundable.
    </p>
  </PolicyLayout>
);
