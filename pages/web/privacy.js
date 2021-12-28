import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import Logo from "../../src/assets/img/logo.png";
import "../../src/css/aos.css";
import Aos from "aos";
// import validator from 'bootstrap-validator'

import Head from "next/head";
import { Button } from "@material-ui/core";

export default function Privacy() {
  const [session, loading] = useSession();
  React.useEffect(() => {
    Aos.init();
  });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Ubycohub Privacy</title>
      </Head>
      <div className="light-grey">
        {/* <!-- Content Starts --> */}
        <header className="">
         

          <nav className="navbar navbar-expand-lg navbar-light px-4 py-0">
            {/* <a className="navbar-brand" href="#">Navbar</a> */}
            <img src={Logo} alt="Ubyco" className="logo-navbar" />
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="fa fa-bars"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item mx-2 active">
                  <a className="nav-link" href="#contact">
                    Contact Us
                  </a>
                </li>

                <li className="nav-item mx-2 active">
                  <a className="nav-link" href="#rate-calculator">
                    Rate Calculator
                  </a>
                </li>
                {!session && (
                  <li className="nav-item mx-2">
                    <a className="nav-link" href="/login">
                      Sign In
                    </a>
                  </li>
                )}

                {session?.role == 2 && (
                  <>
                    <li className="nav-item mx-2 active">
                      <a className="nav-link" href="/admin/dashboard">
                        Admin Dashboard
                      </a>
                    </li>
                    <button
                      variant="contained"
                      color="primary"
                      onClick={() => signOut()}
                    >
                      sign Out
                    </button>
                  </>
                )}

                {session?.role == 1 && (
                  <>
                    <li className="nav-item mx-2 active">
                      <a className="nav-link" href="/user/dashboard">
                        Dashboard
                      </a>
                    </li>
                    <li className="nav-item mx-2">
                      <button
                        variant="contained"
                        color="primary"
                        onClick={() => signOut()}
                      >
                        sign Out
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </header>

        {/* <!-- Section --> */}
        <div className="section light-grey back two">
          <div className="container">
            <div className="privacy">
              <p>
                This Privacy policy between UBYCOHUB Enterprises (hereinafter
                referred to as UBYCOHUB) and you, constitutes our commitment to
                your privacy on our website, apps, social media platforms,
                administrative records and premises.
              </p>

              <p>&nbsp;</p>

              <p>
                <strong>1.0 Your Privacy Rights</strong>
              </p>

              <p>
                This Privacy Policy describes your privacy rights regarding our
                collection, use, storage, sharing and protection of your
                personal information. It applies to the UBYCOHUB website, apps,
                platforms and all database applications, services, tools and
                physical contact with us regardless of how you access or use
                them.
              </p>

              <p>
                If you have created a username, identification code, password or
                any other piece of information as part of our access security
                measures, you must treat such information as confidential, and
                you must not disclose it to any third party. We reserve the
                right to disable any user identification code or password,
                whether chosen by you or allocated by us, at any time, if in our
                opinion you have failed to comply with any of the provisions of
                these Conditions. If you know or suspect that anyone other than
                you know your security details, you must promptly notify us a
              </p>

              <p>&nbsp;</p>

              <p>
                <strong>2.0 Consent</strong>
              </p>

              <p>
                You accept this Privacy Policy when you give consent upon access
                to our platforms, or use our services, content, features,
                technologies or functions offered on our website, apps, digital
                platforms or visit any of our offices for official or
                non-official purposes (collectively “UBYCOHUB's services”). This
                Policy governs the use of UBYCOHUB's services and intervention
                projects by our users and stakeholders unless otherwise agreed
                through written contract.&nbsp;We may amend this Privacy Policy
                at any time by posting a revised version on our website, apps,
                platforms, or placing such notice at conspicuous points at our
                office facilities. The revised version will be effective 7-days
                after publication.
              </p>

              <p>&nbsp;</p>

              <p>
                <strong>3.0&nbsp;Your Personal Information</strong>
              </p>

              <p>
                When you use UBYCOHUB's Services, we may collect information
                sent to us by your computer, mobile phone or other electronic
                access device. The automatically collected information includes
                but not limited to- data about the pages you access, computer IP
                address, device ID or unique identifier, device type,
                geo-location information, computer and connection information,
                mobile network information, statistics on page views, traffic to
                and from the sites, referral URL, ad data, standard web log
                data, still and moving images.
              </p>

              <p>
                We may also collect information you provide us including but not
                limited to - information on web forms, survey responses, account
                update information, email, phone number, organization you
                represent, official position, correspondence with UBYCOHUB'S
                support services and telecommunication with UBYCOHUB. We may
                also collect information about your transactions, enquiries and
                your activities on our platforms or service channels.&nbsp;
              </p>

              <p>
                We may also use information provided by third parties like
                social media sites. Information about you provided by other
                sites are not controlled by UBYCOHUB and we are therefore not
                liable for how they use it.
              </p>

              <p>&nbsp;</p>

              <p>
                <strong>4.0 What we do with your personal information</strong>
              </p>

              <p>
                The purpose of our collecting your personal information is to
                give you efficient, enjoyable and secure service. We may use
                your information to:
              </p>

              <ol>
                <li>Provide UBYCOHUB's services and support;</li>
                <li>
                  Process applications and send notices about your transactions
                  to requisite parties;
                </li>
                <li>Verify your identity;</li>
                <li>
                  Resolve disputes, collect fees, and troubleshoot problems;
                </li>
                <li>
                  Manage risk, detect, prevent, and/or remediate fraud or other
                  potentially prohibited or illegal activities;
                </li>
                <li>
                  Detect, prevent or remediate violation of Laws, Regulations,
                  Standards, Guidelines and Frameworks;
                </li>
                <li>
                  Improve UBYCOHUB's Services by implementing aggregate customer
                  or user preferences;
                </li>
                <li>
                  Measure the performance of the UBYCOHUB's Services and improve
                  content, technology and layout;
                </li>
                <li>
                  Track information breach and remediate such identified
                  breaches;
                </li>
                <li>
                  Manage and protect our information technology and physical
                  infrastructure;
                </li>
                <li>
                  Contact you at any time through your provided telephone
                  number, email address or other contact details.
                </li>
              </ol>

              <p>&nbsp;</p>

              <p>
                <strong>5.0 Cookies</strong>
              </p>

              <p>
                Cookies are small files placed on your computer’s hard drive
                that enables the website to identify your computer as you view
                different pages. Cookies allow websites and applications to
                store your preferences in order to present contents, options or
                functions that are specific to you. Like most interactive
                websites, our website uses cookies to enable the tracking of
                your activity for the duration of a session. Our website uses
                only encrypted session cookies which are erased either after a
                predefined timeout period or once the user logs out of the
                platform and closes the browser. Session cookies do not collect
                information from the user’s computer. They will typically store
                information in the form of a session identification that does
                not personally identify the user.
              </p>

              <p>&nbsp;</p>

              <p>
                <strong>6.0 How we protect your personal information</strong>
              </p>

              <p>
                We store and process your personal information on our computers
                in Nigeria. Where we need to transfer your data to another
                country, such country must have an adequate data protection law.
                We will seek your consent where we need to send your data to a
                country without an adequate data protection law. We protect your
                information using physical, technical, and administrative
                security measures to reduce the risks of loss, misuse,
                unauthorized access, disclosure and alteration. Some of the
                safeguards we use are firewalls and data encryption, physical
                access controls to our data centers, and information access
                authorization controls.
              </p>

              <p>&nbsp;</p>

              <p>
                <strong>
                  7.0 How We Share your information within UBYCOHUB and other
                  users
                </strong>
              </p>

              <p>
                During your interaction with any of our platforms or premises,
                we may provide Ministries, Departments, Agencies (MDAs), other
                organs of government, private sector operators performing
                government functions, with information such as your name,
                contact details, or other details you provide us for the purpose
                of performing their statutory mandate to you or third parties.
              </p>

              <p>&nbsp;</p>

              <p>
                We work with third parties, banks, financial institutions and
                corporate bodies to perform UBYCOHUB's services and implement
                its mandate. In doing so, a third party may share information
                about you with us, such as your email address or mobile phone
                number.
              </p>

              <p>
                You accept that your pictures and testimonials on all social
                media platforms about UBYCOHUB can be used for limited
                promotional purposes by us. This does not include your
                trademarked or copyrighted materials.
              </p>

              <p>
                From time to time we may send you relevant information such as
                news items, enforcement notice, statutorily mandated notices and
                other informative notices to help UBYCOHUB serve you better. We
                may also share your personal information in compliance with
                National or international laws; crime prevention and risk
                management agencies and service providers.
              </p>

              <p>&nbsp;</p>

              <p>
                <strong>8.0 Security</strong>
              </p>

              <p>
                We promise to and will always hold your information securely. To
                prevent unauthorized access to your information, we have
                implemented strong controls and security safeguards at the
                technical and operational levels. You should see the padlock
                symbol in your URL address bar once you are successfully logged
                into the platform. The URL address will also start with https://
                depicting a secure webpage. SSL applies encryption between two
                points such as your device and the connecting server. Any data
                transmitted during the session will be encrypted before
                transmission and decrypted at the receiving end. This is to
                ensure that data cannot be read during transmission.
              </p>

              <p>
                UBYCOHUB has also taken measures to comply with global
                Information Security Management Systems (ISMS) we therefore have
                put in place digital and physical security measures to limit or
                eliminate possibilities of data privacy breach incidents.
              </p>

              <p>&nbsp;</p>

              <p>
                <strong>9.0 Data Confidentiality Rights</strong>
              </p>

              <p>
                Your information is regarded as confidential and will not be
                divulged to any third party except under legal and/or regulatory
                conditions. You have the right to request sight of, and copies
                of any and all information we keep on you. While UBYCOHUB is
                responsible for safeguarding the information entrusted to us,
                your role in fulfilling confidentiality duties includes, but is
                not limited to, adopting and enforcing appropriate security
                measures such as non-sharing of passwords and other platform
                login details, adherence with physical security protocols on our
                platforms, dealing with only authorized officers of UBYCOHUB.
              </p>

              <p>&nbsp;</p>

              <p>
                <strong>10.0 Links to Other Websites and Premises</strong>
              </p>

              <p>
                Certain transaction processing channels may require links to
                other websites other than ours. Please note that UBYCOHUB is not
                responsible and has no control over websites outside its domain.
                We do not monitor or review the content of other party’s
                websites which are linked from our website or media platforms.
                Opinions expressed or materials appearing on such websites are
                not necessarily shared or endorsed by us, and UBYCOHUB should
                not be regarded as the publisher of such opinions or materials.
              </p>

              <p>
                Please be aware that we are not responsible for the privacy
                practices, or content of these sites. We encourage our users to
                be aware of when they leave our site and to read the privacy
                statements of these sites. You should evaluate the security and
                trustworthiness of any other site connected to this site or
                accessed through this site yourself, before disclosing any
                personal information to them. UBYCOHUB will not accept any
                responsibility for any loss or damage in whatever manner,
                howsoever caused, resulting from your disclosure to third
                parties of personal information.
              </p>

              <p>&nbsp;</p>

              <p>
                <strong>11.0 Governing Law</strong>
              </p>

              <p>
                This Privacy Policy is made pursuant to and in compliance with
                the Nigeria Data Protection Regulation (2019) and other relevant
                Nigerian laws, regulations or international conventions
                applicable to Nigeria. Where any provision of this Policy is
                deemed inconsistent with a law, regulation or convention, such
                provision shall be subject to the overriding law, regulation or
                convention.
              </p>

              <p>&nbsp;</p>

              <p>
                <b>COOKIES POLICY</b>
              </p>

              <p>
                Cookies are small text files which are transferred from our
                websites, apps, platforms or portals and stored on your device.
                We use cookies to help us provide you with a personalized
                service, and to help make our websites or portals better for
                you.
              </p>

              <p>
                Our cookies may be session cookies (temporary cookies that
                identify and track users within our websites or portals which
                are deleted when you close your browser or leave your session)
                or persistent cookies (cookies which enable our websites or
                portals to “remember” who you are and to remember your
                preferences within our websites or portals and which will stay
                on your computer or device after you close your browser or leave
                your session
              </p>

              <p>We use the following different types of cookies:</p>

              <p>
                <strong>Essential cookies</strong>
              </p>

              <p>
                These are cookies which are needed for our websites or portals
                to function properly, for example, these cookies allow you to
                access secure areas of our website/portal.
              </p>

              <p>
                <strong>Performance cookies.</strong>
              </p>

              <p>
                These cookies collect information about how visitors and users
                use our websites and portals. These cookies don’t collect
                information that identifies a visitor or user. All information
                these cookies collect is aggregated and therefore anonymous. We
                only use these cookies to improve how our website and portal.
              </p>

              <p>
                <strong>Functionality cookies.</strong>
              </p>

              <p>
                These cookies allow our websites and portals to remember choices
                you make (such as your user name, language or the region you are
                in) and provide enhanced, more personal features. These cookies
                can also be used to remember changes you have made to text size,
                fonts and other parts of web pages that you can customize. They
                may also be used to provide services you have asked for. The
                information these cookies collect may be anonymized and they
                cannot track your browsing activity on other websites.
              </p>

              <p>
                Like most interactive websites, our website uses cookies to
                enable the tracking of your activity for the duration of a
                session. Our website uses only encrypted session cookies which
                are erased either after a predefined timeout period or once the
                user logs out of the platform and closes the browser. Session
                cookies do not collect information from the user’s computer.
                They will typically store information in the form of a session
                identification that does not personally identify the user.
              </p>

              <p>&nbsp;</p>

              <p>
                <b>DATA PROTECTION POLICY</b>
              </p>

              <p>
                UBYCOHUB's Data Protection Policy&nbsp;refers to
                our&nbsp;commitment to treat information of employees,
                customers, stakeholders and other interested parties with the
                utmost care and confidentiality. With this policy, we ensure
                that we gather, store and handle data fairly, transparently and
                with respect towards individual rights.
              </p>

              <p>&nbsp;</p>

              <p>
                <strong>Scope</strong>
              </p>

              <p>
                This policy refers to all parties who provide any amount of
                information to us.
              </p>

              <p>
                <strong>
                  What is covered under the Data Protection Policy?
                </strong>
              </p>

              <p>
                UBYCOHUB's employees must follow this policy. Freelancers,
                consultants, partners and any other external entity are also
                covered. Generally, our policy refers to anyone we collaborate
                with&nbsp;or acts on our behalf and may need occasional access
                to data.
              </p>

              <p>
                <strong>Policy Elements</strong>
              </p>

              <p>
                As part of our operations, we need to obtain and process
                information. This information includes any offline or online
                data&nbsp;that makes a person identifiable such as names,
                addresses, usernames and passwords, digital footprints,
                photographs, National identity numbers, financial data etc.
              </p>

              <p>
                UBYCOHUB collects this information in a transparent way and only
                with the full cooperation and knowledge of interested parties.
                Once this information is available to us, the following rules
                apply.
              </p>

              <p>&nbsp;</p>

              <p>
                <strong>Our data will be:</strong>
              </p>

              <ul>
                <li>Accurate and kept up-to-date;</li>
                <li>Collected fairly and for lawful purposes only;</li>
                <li>
                  Processed by the company within its legal and moral
                  boundaries;
                </li>
                <li>
                  Protected against any unauthorized or illegal access by
                  internal or external parties.
                </li>
              </ul>

              <p>Our data will not be:</p>

              <ul>
                <li>
                  Transferred to organizations, states or countries that do not
                  have adequate data protection policies;
                </li>
                <li>
                  Distributed to any party other than the ones agreed upon by
                  the data’s owner (exempting legitimate requests from law
                  enforcement authorities).
                </li>
              </ul>

              <p>
                In addition to ways of handling data, UBYCOHUB has direct
                obligations towards people to whom the data belongs.
                Specifically we:
              </p>

              <ul>
                <li>Let people know which of their data is collected;</li>
                <li>Inform people about how we’ll process their data;</li>
                <li>
                  Inform people about who has access to their information;
                </li>
                <li>
                  Have provisions in cases of lost, corrupted or compromised
                  data;
                </li>
                <li>
                  Allow people to request that we&nbsp;modify, erase, reduce or
                  correct data&nbsp;contained in our&nbsp;databases°
                </li>
              </ul>

              <p>
                <strong>Actions</strong>
              </p>

              <p>To exercise data protection we’re&nbsp;committed to:</p>

              <ul>
                <li>Restricting and monitoring access to sensitive data;</li>
                <li>Developing transparent data collection procedures;</li>
                <li>
                  Training employees in online privacy and security measures;
                </li>
                <li>
                  Building secure networks to protect online data from
                  cyberattacks;
                </li>
                <li>
                  Establishing clear procedures for reporting privacy breaches
                  or data misuse;
                </li>
                <li>
                  Including contract clauses or communicate statements on
                  how&nbsp;we handle data;
                </li>
                <li>Establishing data protection practices.</li>
              </ul>

              <p>&nbsp;</p>

              <p>Last Updated 11th Of November, 2021.</p>
            </div>
          </div>
        </div>
        {/* <!-- Section Ends --> */}
      </div>
    </>
  );
}
