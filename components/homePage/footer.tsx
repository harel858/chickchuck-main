function Footer() {
  return (
    <footer className="p-4 bg-gray-800 text-white">
      <div className="flex justify-center space-x-4">
        <a href="/privacy-policy" className="underline">
          מדיניות פרטיות
        </a>
        <a href="/terms-and-conditions" className="underline">
          תנאים והגבלות
        </a>
      </div>
    </footer>
  );
}

export default Footer;
