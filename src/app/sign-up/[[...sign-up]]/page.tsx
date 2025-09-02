import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surf-light via-surf-blue to-surf-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-surf-blue to-surf-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-3xl">M</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-surf-navy mb-2">
            Maikekai Surf
          </h1>
          <p className="text-surf-blue font-medium">Costa Rica</p>
        </div>
        
        <SignUp 
          appearance={{
            elements: {
              card: "shadow-2xl border-0",
              headerTitle: "text-surf-navy font-serif font-bold text-2xl",
              headerSubtitle: "text-gray-600 font-sans",
              formButtonPrimary: "bg-surf-blue hover:bg-surf-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl",
              formButtonSecondary: "bg-surf-sand hover:bg-yellow-400 text-surf-navy font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl",
              formFieldInput: "border-2 border-gray-200 focus:border-surf-blue focus:ring-2 focus:ring-surf-blue/20 rounded-lg transition-all duration-200",
              formFieldLabel: "text-surf-navy font-medium",
              footerActionLink: "text-surf-blue hover:text-surf-dark font-medium transition-colors",
            }
          }}
        />
      </div>
    </div>
  );
}
