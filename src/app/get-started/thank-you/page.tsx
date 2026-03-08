import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#0F0F0F]">
      <div className="sticky top-0 z-10 flex items-center justify-between max-w-2xl mx-auto px-6 py-4 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#222]">
        <Link href="/" className="font-bold text-lg transition-colors duration-300 hover:text-[#7C5CFF]">
          SolidLine Digital
        </Link>
        <Link href="/" className="bg-[#7C5CFF] px-5 py-2 rounded-full text-sm font-semibold transition-all hover:bg-[#6B4FE0]">
          Home
        </Link>
      </div>
      <div className="max-w-xl mx-auto py-24 px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#7C5CFF]/20 text-[#7C5CFF] text-3xl mb-6">✔</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Request received</h1>
          <p className="text-[#888] text-lg mb-2">Thank you for submitting your project request.</p>
          <p className="text-[#888]">We will review your answers and contact you within 24 hours.</p>
        </div>
        <div className="border border-[#222] rounded-xl p-6 mb-10 text-left">
          <h2 className="font-semibold mb-4">What happens next:</h2>
          <ol className="list-decimal list-inside text-[#888] space-y-2">
            <li>We review your business information</li>
            <li>We discuss the project with you</li>
            <li>We start designing your website</li>
          </ol>
        </div>
        <p className="text-[#888] text-sm mb-8 text-center">
          If you have urgent questions:{" "}
          <a href="mailto:hello@solidline.dev" className="text-[#7C5CFF] hover:underline">hello@solidline.dev</a>
        </p>
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-[#7C5CFF] px-8 py-3 rounded-full font-semibold transition-all hover:bg-[#6B4FE0]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
