import type { Metadata } from "next";
import Link from "next/link";
import AnimatedWordmark from "../animated-wordmark";
import ScrollHeader from "../scroll-header";
import HomeWhatsApp from "../home-whatsapp";
import { ArrowFillLink } from "../arrow-fill-button";
import { CategoryMegaMenu, MobileCategoryMenu, ProductSearch } from "../nav-discovery";
import { buildPageMetadata } from "../seo";
import AboutFooter from "../about-us/about-footer";
import "./privacy.css";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | TruePrint",
  description: "Read how TruePrint collects, uses and protects personal data, and learn about your privacy choices.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <main className="pageShell privacyPageShell">
      <div className="siteCard privacyPage" id="top">
        <div className="headerFrame">
          <header className="siteHeader" data-site-header>
            <AnimatedWordmark />
            <nav className="desktopNav" aria-label="Primary navigation">
              <Link href="/">Home</Link><CategoryMegaMenu /><Link href="/about-us">About</Link><Link href="/contact-trueprint">Contact</Link>
            </nav>
            <div className="headerTools"><ProductSearch /><ArrowFillLink className="talkExpertButton" href="/contact-trueprint" label="Talk to expert" /></div>
            <details className="mobileMenu">
              <summary aria-label="Open navigation"><span /><span /><span /></summary>
              <nav aria-label="Mobile navigation">
                <ProductSearch variant="mobile" />
                <div className="mobileMenuLinks">
                  <Link href="/">Home</Link><MobileCategoryMenu /><Link href="/#services">Services</Link><Link href="/#materials">Materials</Link><Link href="/about-us">About</Link><Link href="/contact-trueprint">Contact</Link>
                </div>
                <ArrowFillLink className="mobileTalkButton" href="/contact-trueprint" label="Talk to expert" />
              </nav>
            </details>
          </header>
        </div>
        <ScrollHeader />
        <section className="privacyHero" aria-labelledby="privacy-title">
          <span className="privacyGhost" aria-hidden="true">PRIVACY</span>
          <div className="privacyHeroContent">
            <p className="privacyEyebrow">TRUEPRINT · YOUR INFORMATION</p>
            <h1 id="privacy-title">Privacy <em>Policy.</em></h1>
            <div className="privacyDates">
              <p><span>Last Updated</span><time dateTime="2026-09-23">23 September 2026</time></p>
            </div>
          </div>
        </section>
        <article className="privacyCopy" aria-label="TruePrint privacy policy">
          <p>{"This Privacy Policy governs the manner in which "}<strong>{"TruePrint"}</strong>{" (“the Company,” “we,” “us,” or “our”) collects, uses, maintains, and discloses information collected from users (“you” or “users”) of our website, "}<a href="https://thetrueprint.com/"><strong>{"https://thetrueprint.com/"}</strong></a>{". This Privacy Policy applies to the website and the products, services, enquiries, sourcing requests, and other services offered by TruePrint."}</p>
          <p>{"TruePrint is committed to protecting your privacy and handling your personal data responsibly and transparently. This Privacy Policy describes how we handle personal data with reference to the "}<strong>{"Digital Personal Data Protection Act, 2023 (“DPDP Act”)"}</strong>{", the "}<strong>{"Digital Personal Data Protection Rules, 2025 (“DPDP Rules”)"}</strong>{", and other applicable laws and regulations relating to personal data protection in India, as and when their provisions apply."}</p>
          <h2>{"Information Collection"}</h2>
          <p>{"We may collect personal data from users in various ways, including when you visit our website, submit an enquiry, request a quotation, request a callback, submit a product sourcing request, upload reference material, communicate with our team, or otherwise interact with our services."}</p>
          <p>{"The types of personal data we may collect include, but are not limited to:"}</p>
          <ul><li>{"Name"}</li><li>{"Work or business email address"}</li><li>{"Phone or mobile number"}</li><li>{"Organisation or company name"}</li><li>{"Product or service requirements"}</li><li>{"Project details"}</li><li>{"Quantity, budget, timeline, and customization requirements where provided"}</li><li>{"Product references, images, sketches, designs, or other files submitted by you"}</li><li>{"Information provided through WhatsApp, email, telephone, or other communication channels"}</li><li>{"Information relating to quotations, orders, and business transactions"}</li><li>{"Any other information voluntarily provided by you"}</li></ul>
          <p>{"When submitting a sourcing request, users may also provide reference images or other materials to help us understand and fulfil their requirements."}</p>
          <p>{"We may also automatically collect certain technical information when you access our website, including IP address, browser type, device information, operating system, pages visited, referring website, date and time of access, and other information generated through the use of cookies or similar technologies."}</p>
          <h2>{"Use of Personal Data"}</h2>
          <p>{"We may collect and use personal data for the following purposes:"}</p>
          <ul><li><strong>{"To respond to enquiries:"}</strong>{" To understand your requirements and respond to your questions, requests, and enquiries."}</li><li><strong>{"To provide quotations:"}</strong>{" To prepare and provide quotations based on the products, quantities, specifications, customization requirements, and other information provided by you."}</li><li><strong>{"To provide our services:"}</strong>{" To source, customize, manufacture, package, and coordinate delivery of products requested by you."}</li><li><strong>{"To process sourcing requests:"}</strong>{" To identify suitable products, suppliers, manufacturers, and customization options based on the information and references you provide."}</li><li><strong>{"To communicate with you:"}</strong>{" To contact you regarding your enquiry, quotation, project, order, production, delivery, or customer support requirements."}</li><li><strong>{"To process transactions:"}</strong>{" To manage orders, invoices, payments, refunds, and other business-related transactions where applicable."}</li><li><strong>{"To maintain business records:"}</strong>{" To maintain appropriate records for accounting, tax, legal, administrative, and operational purposes."}</li><li><strong>{"To improve our website and services:"}</strong>{" To understand how users interact with our website and improve our products, services, website functionality, and customer experience."}</li><li><strong>{"To maintain security:"}</strong>{" To protect our website, systems, users, and business against unauthorized access, fraud, abuse, security incidents, and other unlawful activities."}</li><li><strong>{"To comply with applicable laws:"}</strong>{" To comply with legal, regulatory, governmental, or other lawful requirements."}</li></ul>
          <h2>{"Reference Materials and Uploaded Files"}</h2>
          <p>{"Users may provide photographs, product references, sketches, designs, links, or other files when submitting a sourcing or customization request."}</p>
          <p>{"We use such materials only as reasonably necessary to understand your requirements, identify suitable products, prepare quotations, evaluate customization options, and provide our services."}</p>
          <p>{"You should ensure that you have the necessary rights or authorization to provide any material belonging to another person or organization."}</p>
          <p>{"Users should not submit passwords, payment credentials, government identification documents, or other sensitive personal information through general enquiry or sourcing forms unless specifically requested through an appropriate secure process."}</p>
          <p>{"The website may accept reference files through its project and sourcing forms. Form submissions and any uploaded files are processed using Supabase."}</p>
          <h2>{"Cookies and Similar Technologies"}</h2>
          <p>{"TruePrint may use cookies and similar technologies to provide and improve our website and services."}</p>
          <p>{"Cookies may be used for purposes including:"}</p>
          <ul><li>{"Website functionality"}</li><li>{"Security"}</li><li>{"Session management"}</li><li>{"Remembering preferences"}</li><li>{"Website analytics"}</li><li>{"Performance measurement"}</li><li>{"Understanding website usage"}</li><li>{"Marketing or advertising measurement, where applicable"}</li></ul>
          <p>{"Where consent is required under applicable law for non-essential cookies or similar technologies, the appropriate consent mechanism will be provided."}</p>
          <p>{"You may also manage or disable cookies through your browser settings. Disabling certain cookies may affect the functionality of some parts of our website."}</p>
          <h2>{"Information Protection"}</h2>
          <p>{"We adopt reasonable technical and organizational measures to protect personal data against unauthorized access, alteration, disclosure, loss, misuse, destruction, or other unlawful processing."}</p>
          <p>{"Our security measures may include access controls, authentication mechanisms, restricted administrative access, secure hosting, secure data transmission, backups, monitoring, logging, and other safeguards appropriate to the nature and risks associated with the personal data we process."}</p>
          <p>{"Although we take reasonable measures to protect personal data, no method of transmission or storage over the internet can be guaranteed to be completely secure."}</p>
          <h2>{"Information Sharing"}</h2>
          <p>{"We do not sell, rent, or trade your personal data."}</p>
          <p>{"We may share personal data where reasonably necessary to provide our services, fulfil your requirements, operate our website, or comply with applicable law."}</p>
          <p>{"Depending on the nature of the service, information may be shared with trusted service providers and business partners, including:"}</p>
          <ul><li>{"Product suppliers and manufacturers"}</li><li>{"Printing and customization partners"}</li><li>{"Production and packaging partners"}</li><li>{"Logistics and delivery providers"}</li><li>{"Website and hosting providers"}</li><li>{"Cloud and technology service providers"}</li><li>{"Email and communication service providers"}</li><li>{"Payment service providers, where applicable"}</li><li>{"Analytics and security service providers"}</li><li>{"Professional advisers and authorized service providers"}</li></ul>
          <p>{"We take reasonable steps to ensure that third parties handling personal data on our behalf process it only for authorized purposes and maintain appropriate safeguards."}</p>
          <p>{"Our website uses Cloudflare Turnstile to verify form submissions and help prevent abuse. Turnstile may process technical information, such as IP address and browser or device information, to perform that check."}</p>
          <p>{"We may also disclose personal data when required by law, regulation, court order, governmental authority, or other valid legal process, or where necessary to protect our rights, property, users, or business."}</p>
          <h2>{"Third-Party Websites and Services"}</h2>
          <p>{"Our website may contain links to or integrations with third-party websites, platforms, applications, or services."}</p>
          <p>{"These third parties may include communication platforms, payment providers, social media platforms, logistics providers, or other external services."}</p>
          <p>{"For example, our WhatsApp contact link opens a service operated by Meta. Information you send through WhatsApp is also handled under that service’s privacy terms."}</p>
          <p>{"We do not control the privacy practices, content, or security of third-party websites and services. Any information you provide directly to a third party will be subject to that third party's own privacy policy and terms."}</p>
          <p>{"We encourage users to review the privacy policies of third-party websites and services before providing them with personal data."}</p>
          <h2>{"Communication and Marketing"}</h2>
          <p>{"We may contact you regarding your enquiries, quotations, projects, orders, deliveries, and other services requested by you."}</p>
          <p>{"Where permitted by applicable law, we may also send information regarding our products, services, offers, or updates."}</p>
          <p>{"Where separate consent is required for promotional communications, we will obtain the appropriate consent."}</p>
          <p>{"You may opt out of promotional communications at any time by using the unsubscribe mechanism provided in the communication or by contacting us through the available communication channels."}</p>
          <p>{"Opting out of promotional communications will not prevent us from sending essential communications relating to your active enquiry, quotation, project, order, or business relationship."}</p>
          <h2>{"Consent"}</h2>
          <p>{"Where consent is required for processing your personal data, TruePrint will obtain consent through a clear affirmative action in accordance with applicable law."}</p>
          <p>{"Consent will be obtained in a manner that is free, specific, informed, unconditional, and unambiguous."}</p>
          <p>{"Where processing is based on consent, you may withdraw your consent at any time."}</p>
          <p>{"Withdrawal of consent will not affect the lawfulness of processing carried out before the withdrawal."}</p>
          <p>{"Please note that withdrawing consent may affect our ability to provide certain services where the relevant personal data is necessary for providing those services."}</p>
          <h2>{"Data Retention"}</h2>
          <p>{"We retain personal data only for as long as reasonably necessary for the purposes for which it was collected or as required or permitted by applicable law."}</p>
          <p>{"The retention period may vary depending on the nature of the information and the purpose for which it was collected."}</p>
          <p>{"Enquiry and communication information may be retained for a reasonable period to manage enquiries and follow-up. Information relating to quotations, projects, orders, invoices, and business transactions may be retained for as long as necessary for business, accounting, tax, legal, and operational purposes."}</p>
          <p>{"When personal data is no longer required, we take reasonable steps to delete, erase, or anonymize it, subject to applicable legal and operational requirements."}</p>
          <h2>{"Data Accuracy"}</h2>
          <p>{"We take reasonable steps to maintain accurate and relevant personal data."}</p>
          <p>{"Users are responsible for providing accurate and up-to-date information when submitting enquiries, sourcing requests, or entering into a business relationship with TruePrint."}</p>
          <p>{"If you believe that the personal data we hold about you is inaccurate or incomplete, you may contact us and request correction."}</p>
          <h2>{"Your Privacy Rights"}</h2>
          <p>{"Subject to applicable law, you may have the following rights in relation to your personal data:"}</p>
          <ul><li><strong>{"Right to access:"}</strong>{" You may request information about the personal data we process and other information you are entitled to receive under applicable law."}</li><li><strong>{"Right to correction:"}</strong>{" You may request correction of inaccurate or incomplete personal data."}</li><li><strong>{"Right to erasure:"}</strong>{" You may request deletion or erasure of personal data where applicable under law."}</li><li><strong>{"Right to withdraw consent:"}</strong>{" Where processing is based on consent, you may withdraw your consent."}</li><li><strong>{"Right to grievance redressal:"}</strong>{" You may raise a grievance regarding the processing of your personal data."}</li><li><strong>{"Right to nominate:"}</strong>{" Where applicable under the DPDP Act, you may nominate another individual to exercise your rights in accordance with applicable law."}</li></ul>
          <p>{"To exercise your applicable rights, please contact TruePrint through the contact details provided below. We may request reasonable information to verify your identity before processing certain requests."}</p>
          <h2>{"Personal Data Breaches"}</h2>
          <p>{"In the event of a personal data breach, TruePrint will take reasonable steps to identify, contain, investigate, and address the incident and implement appropriate remedial measures."}</p>
          <p>{"Where required by applicable law, we will notify affected individuals and the relevant authority in accordance with the applicable requirements of the DPDP Act and DPDP Rules."}</p>
          <h2>{"Children's Privacy"}</h2>
          <p>{"Our products and services are primarily intended for businesses, organizations, professionals, and corporate customers."}</p>
          <p>{"We do not knowingly seek to collect children's personal data for unrelated purposes. Where applicable law requires additional safeguards or verifiable parental consent for processing a child's personal data, we will comply with the applicable legal requirements."}</p>
          <h2>{"International Data Processing"}</h2>
          <p>{"Some of our third-party service providers may process or store personal data outside India."}</p>
          <p>{"Where personal data is transferred or processed outside India, TruePrint will comply with applicable requirements and restrictions under Indian law and take reasonable measures to protect the personal data."}</p>
          <h2>{"Compliance with Laws"}</h2>
          <p>{"We may collect, use, retain, or disclose personal data where required or permitted by applicable law, regulation, court order, governmental authority, or lawful request."}</p>
          <p>{"We may also process or disclose information where reasonably necessary to protect our rights, property, website, users, employees, service providers, or business interests, prevent fraud or abuse, investigate security incidents, or enforce applicable terms and policies."}</p>
          <h2>{"Changes to this Privacy Policy"}</h2>
          <p>{"TruePrint reserves the right to update or revise this Privacy Policy from time to time to reflect changes in our services, technology, data-processing practices, third-party services, or applicable laws and regulations."}</p>
          <p>{"Any changes will be published on this page, and the "}<strong>{"“Last Updated”"}</strong>{" date will be revised accordingly."}</p>
          <p>{"We encourage users to review this Privacy Policy periodically to remain informed about how we collect, use, and protect personal data."}</p>
          <h2>{"Contacting Us"}</h2>
          <p>{"If you have any questions about this Privacy Policy, our data-processing practices, your personal data, or your dealings with TruePrint, please contact us through the contact options available on our website:"}</p>
          <p><strong>{"TruePrint"}</strong><br /><strong>{"Website:"}</strong>{" "}<a href="https://thetrueprint.com/">{"https://thetrueprint.com/"}</a><br /><strong>{"Contact page:"}</strong>{" "}<a href="https://thetrueprint.com/contact-trueprint">{"https://thetrueprint.com/contact-trueprint"}</a></p>
          <p>{"For privacy-related requests, please clearly mention "}<strong>{"“Privacy / DPDP Request – TruePrint”"}</strong>{" in your communication."}</p>
          <p>{"We will review and respond to privacy-related requests and grievances in accordance with applicable law."}</p>
          <p><strong>{"© 2026 TruePrint. All Rights Reserved."}</strong></p>
        </article>
        <AboutFooter isAboutPage={false} /><HomeWhatsApp />
      </div>
    </main>
  );
}
