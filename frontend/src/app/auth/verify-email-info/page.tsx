export default function VerifyEmailInfoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Verify Your Email</h1>
      <p className="text-gray-600 max-w-md mb-6">
        We’ve sent a verification link to your email. Please open it to activate
        your account.
      </p>

      <p className="text-sm text-gray-500">
        Didn’t get the email? Check spam or click below:
      </p>

      <form
        action="/api/auth/resend-verification"
        method="POST"
        className="mt-4"
      >
        <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition">
          Resend Verification Email
        </button>
      </form>

      <a className="mt-6 text-green-700 hover:underline" href="/auth/signin">
        Back to Sign In
      </a>
    </div>
  );
}
