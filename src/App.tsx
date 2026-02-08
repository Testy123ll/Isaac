import { Hero } from './components/Hero';
import { HackerTerminal } from './components/HackerTerminal';
import { SystemCapabilities } from './components/SystemCapabilities';
import { SelectedWorks } from './components/SelectedWorks';
import { SuccessLogs } from './components/SuccessLogs';
import { ExecutionProtocol } from './components/ExecutionProtocol';
import { TechnicalLogs } from './components/TechnicalLogs';
import { SystemQueries } from './components/SystemQueries';
import { ContactTerminal } from './components/ContactTerminal';
import { SocialDock } from './components/SocialDock';

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-purple-600 selection:text-white overflow-hidden">
      <Hero />
      <SystemCapabilities />
      <HackerTerminal />
      <SelectedWorks />
      <SuccessLogs />
      <ExecutionProtocol />
      <TechnicalLogs />
      <SystemQueries />
      <ContactTerminal />
      <SocialDock />
    </main>
  )
}

export default App
