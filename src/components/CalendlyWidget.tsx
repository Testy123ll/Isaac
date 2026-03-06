export const CalendlyWidget = () => {

  return (
    <div className="w-full bg-slate-950/50 rounded-3xl border border-slate-800/50 p-2 sm:p-4 backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative z-10">
        <div className="text-center mb-6 mt-4">
          <h3 className="text-2xl font-bold text-white mb-2">Book an Engineering Review</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Select a time below to discuss architectural scaling, workflow automation, or a complete structural redesign of your platform.
          </p>
        </div>
        <iframe 
          src="https://calendly.com/isaactestimony-dev/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0f172a&text_color=f8fafc&primary_color=3b82f6"
          width="100%"
          height="700"
          frameBorder="0"
          className="w-full h-[700px] rounded-2xl overflow-hidden shadow-2xl bg-[#0f172a]"
          title="Schedule an Engineering Review"
        />
      </div>
    </div>
  );
};
