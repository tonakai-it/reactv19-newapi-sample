
import './App.css'
import FormSample from './FormSample/FormSample'
import RefSample from './RefSample/RefSample'
import PromiseErrorClient from './UseSample/PromiseErrorClient'
import UseSample from './UseSample/UseSample'

function App() {
  return (
    <main>
      <section><h1>React v19 code sample</h1></section>
      <FormSample />
      <RefSample />
      <UseSample />
      <PromiseErrorClient />
    </main>
  )
}

export default App
