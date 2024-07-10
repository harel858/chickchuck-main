function Footer() {
  return (
    <footer className="p-4 bg-gray-800 text-white">
      <div className="flex justify-center space-x-4">
        <a href="/privacypolicy" className="underline">
          מדיניות פרטיות
        </a>
        <a href="/TermsAndConditions" className="underline">
          תנאים והגבלות
        </a>
      </div>
    </footer>
  );
}

export default Footer;
