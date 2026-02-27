import { useState } from 'react'
import InputPage from './components/InputPage'
import ReportPage from './components/ReportPage'

const DEFAULT_DEPTS = [
  {
    id: 1,
    name: 'GTM',
    pct: '26',
    lowProd: '119',
    habitual: '54',
    habitualNote: '34 excluding Field Sales',
    burnoutNames: 'James Holloway\nSara Nettleton\nPeter Vance\nClaire Dunmore\nRyan Okafor\nLaura Fischetti',
    burnoutTotal: '8',
    burnoutRecurring: '2 appear on list 3 months in a row',
  },
  {
    id: 2,
    name: 'Product & Engineering',
    pct: '27',
    lowProd: '130',
    habitual: '39',
    habitualNote: '',
    burnoutNames: 'Marcus Tilden\nPriya Nair',
    burnoutTotal: '9',
    burnoutRecurring: '4 appear on list 3 months in a row',
  },
  {
    id: 3,
    name: 'G&A',
    pct: '22',
    lowProd: '38',
    habitual: '18',
    habitualNote: '',
    burnoutNames: 'Tom Brennan\nSofia Mercer',
    burnoutTotal: '5',
    burnoutRecurring: '4 appear on list 3 months in a row',
  },
]

const DEFAULT_COMPANY = {
  name: '',
  period: '',
  salary: '75000',
  targetHrs: '5.5',
}

export default function App() {
  const [page, setPage] = useState('input')
  const [company, setCompany] = useState(DEFAULT_COMPANY)
  const [depts, setDepts] = useState(DEFAULT_DEPTS)
  const [nextId, setNextId] = useState(4)

  const goToReport = () => setPage('report')
  const goToInput = () => setPage('input')

  return page === 'input'
    ? <InputPage
        company={company}
        setCompany={setCompany}
        depts={depts}
        setDepts={setDepts}
        nextId={nextId}
        setNextId={setNextId}
        onGenerate={goToReport}
      />
    : <ReportPage
        company={company}
        depts={depts}
        onBack={goToInput}
      />
}
