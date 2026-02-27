import { useState } from 'react'
import InputPage from './components/InputPage'
import ReportPage from './components/ReportPage'

export const BLANK_DEPT = (id) => ({
  id,
  name: '',
  pct: '',
  lowProd: '',
  habitual: '',
  habitualNote: '',
  burnoutNames: '',
  burnoutTotal: '',
  burnoutRecurring: '',
})

export const BLANK_COMPANY = {
  name: '',
  period: '',
  salary: '',
  targetHrs: '',
}

const INITIAL_DEPTS = [BLANK_DEPT(1), BLANK_DEPT(2), BLANK_DEPT(3)]

export default function App() {
  const [page, setPage] = useState('input')
  const [company, setCompany] = useState({ ...BLANK_COMPANY })
  const [depts, setDepts] = useState(INITIAL_DEPTS)
  const [nextId, setNextId] = useState(4)

  const goToReport = () => setPage('report')
  const goToInput = () => setPage('input')

  const clearAll = () => {
    setCompany({ ...BLANK_COMPANY })
    setDepts([BLANK_DEPT(1), BLANK_DEPT(2), BLANK_DEPT(3)])
    setNextId(4)
  }

  return page === 'input'
    ? <InputPage
        company={company}
        setCompany={setCompany}
        depts={depts}
        setDepts={setDepts}
        nextId={nextId}
        setNextId={setNextId}
        onGenerate={goToReport}
        onClear={clearAll}
      />
    : <ReportPage
        company={company}
        depts={depts}
        onBack={goToInput}
      />
}
