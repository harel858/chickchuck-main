export default function Page() {
  return (
    <div className="p-4">
      <main className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
          <p className="mb-4">
            This privacy policy applies to the Quickly web application (hereby
            referred to as the "Application") created by Harel Levi (hereby
            referred to as the "Service Provider"). This application is
            accessible via web browsers and is provided as a Freemium service.
            This service is intended for use "AS IS".
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">
            Information Collection and Use
          </h2>
          <p className="mb-4">
            The Application collects information when you access and use it.
            This information may include:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Your device's Internet Protocol (IP) address</li>
            <li>
              The pages of the Application that you visit, the time and date of
              your visit, the time spent on those pages
            </li>
            <li>The operating system and browser you use</li>
            <li>
              Information related to OAuth 2 authentication for accessing Google
              Calendar API, including user identifiers and access tokens.
            </li>
          </ul>
          <p className="mb-4">
            The Application does not gather precise information about the
            physical location of your device.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Third Party Access</h2>
          <p className="mb-4">
            Only aggregated, anonymized data is periodically transmitted to
            external services to aid the Service Provider in improving the
            Application and their service. The Service Provider may share your
            information with third parties in the following scenarios:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              With Google, as necessary, to authenticate users and access Google
              Calendar API in compliance with Google's OAuth 2 policies.
            </li>
            <li>
              As required by law, such as to comply with a subpoena or similar
              legal process.
            </li>
            <li>
              When the Service Provider believes in good faith that disclosure
              is necessary to protect their rights, protect your safety or the
              safety of others, investigate fraud, or respond to a government
              request.
            </li>
            <li>
              With trusted service providers who work on behalf of the Service
              Provider, do not have independent use of the information disclosed
              to them, and have agreed to adhere to the rules set forth in this
              privacy statement.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Opt-Out Rights</h2>
          <p className="mb-4">
            You can stop all collection of information by the Application easily
            by discontinuing its use. You may delete your account or cease using
            the Application.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Data Retention Policy</h2>
          <p className="mb-4">
            The Service Provider will retain user-provided data for as long as
            you have an active account with the Application and for a reasonable
            time thereafter. If you wish to request the deletion of
            user-provided data, please contact the Service Provider at
            harellevi85@gmail.com, and they will respond in a reasonable time.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Children</h2>
          <p className="mb-4">
            The Service Provider does not knowingly collect personally
            identifiable information from children under the age of 13. The
            Application is not directed at children under 13 years of age.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Security</h2>
          <p className="mb-4">
            The Service Provider is committed to safeguarding the
            confidentiality of your information. They provide physical,
            electronic, and procedural safeguards to protect the information
            they process and maintain.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Changes</h2>
          <p className="mb-4">
            This Privacy Policy may be updated from time to time for any reason.
            The Service Provider will notify users of any changes by updating
            this page with the revised Privacy Policy. Users are advised to
            review this Privacy Policy periodically for any changes, as
            continued use of the Application is deemed approval of all changes.
          </p>
          <p className="mb-4">
            This privacy policy is effective as of 2024-04-22.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Your Consent</h2>
          <p className="mb-4">
            By using the Application, you consent to the processing of your
            information as described in this Privacy Policy.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Contact Us</h2>
          <p className="mb-4">
            If you have any questions regarding privacy while using the
            Application or about the practices described in this Privacy Policy,
            please contact the Service Provider via email at
            harellevi85@gmail.com.
          </p>
        </div>

        <hr className="my-8" />

        <p className="text-sm">
          This privacy policy page was generated by{" "}
          <a
            href="https://app-privacy-policy-generator.nisrulz.com/"
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            App Privacy Policy Generator
          </a>
        </p>
      </main>
    </div>
  );
}
