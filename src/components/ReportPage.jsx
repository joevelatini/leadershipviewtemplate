import styles from './ReportPage.module.css'

function calcDept(dept, salary, targetHrs) {
  const workdayHrs = 8
  const unusedPerDay = workdayHrs - parseFloat(targetHrs || 5.5)
  const workdays = 260
  const hrsPerFTE = 2080
  const sal = parseFloat(salary || 75000)
  const lowProd = parseInt(dept.lowProd) || 0
  const unusedHrs = Math.round(lowProd * unusedPerDay * workdays)
  const ftes = (unusedHrs / hrsPerFTE).toFixed(1)
  const dollarValue = Math.round((unusedHrs / hrsPerFTE) * sal)
  return { unusedHrs, ftes, dollarValue, unusedPerDay }
}

function fmt(n) { return Number(n).toLocaleString() }
function fmtD(n) { return '$' + Number(n).toLocaleString() }

export default function ReportPage({ company, depts, onBack }) {
  const salary = company.salary || '75000'
  const targetHrs = company.targetHrs || '5.5'

  const calculated = depts.map(d => calcDept(d, salary, targetHrs))
  const unusedPerDay = parseFloat(targetHrs) ? (8 - parseFloat(targetHrs)) : 2.5

  const footnoteDepts = depts.filter(d => d.habitualNote)

  return (
    <div className={`${styles.page} report-page`}>
      {/* Controls - hidden on print */}
      <div className={`${styles.controls} report-controls`}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Edit Data
        </button>
        <button className={styles.pdfBtn} onClick={() => window.print()}>
          <DownloadIcon />
          Download PDF
        </button>
      </div>

      {/* Report Slide */}
      <div className={`${styles.slide} report-slide`}>

        {/* Header */}
        <div className={styles.reportHeader}>
          <div>
            <h1 className={styles.reportTitle}>{company.name || 'Acme'} Leadership View</h1>
            <div className={styles.reportSubtitle}>Workforce Productivity Intelligence &nbsp;·&nbsp; {company.period || 'This Period'}</div>
          </div>
          <div className={styles.reportBadge}>Powered by ActivTrak</div>
        </div>

        {/* Org Chart */}
        <div className={styles.org}>
          <div className={styles.ceoBox}>CEO</div>
          <div className={styles.orgConnectorV}></div>
          <div className={styles.orgHRow}>
            {depts.map((dept, i) => (
              <div key={dept.id} className={styles.orgDeptWrap}>
                <div className={styles.orgVLine}></div>
                <div className={styles.deptCard}>
                  <div className={styles.deptCardName}>{dept.name}</div>
                  <div className={styles.deptCardPct}>{dept.pct || '0'}%</div>
                  <div className={styles.deptCardStat}>≤ {targetHrs} Avg Productive Hrs/Day</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thEmpty}></th>
              {depts.map(d => <th key={d.id} className={styles.th}>{d.name}</th>)}
            </tr>
          </thead>
          <tbody>

            {/* Burnout Row */}
            <tr>
              <td className={`${styles.rowHeader} ${styles.burnout}`}>🔴 Burnout Risks<br />(11+ Hour Days)</td>
              {depts.map(d => {
                const names = d.burnoutNames ? d.burnoutNames.split('\n').filter(n => n.trim()) : []
                return (
                  <td key={d.id} className={styles.cell}>
                    <span className={styles.tag}>11+ Hour Days</span>
                    <ul className={styles.nameList}>
                      {names.map((n, i) => <li key={i}>{n.trim()}</li>)}
                    </ul>
                    {(d.burnoutTotal || d.burnoutRecurring) && (
                      <div className={styles.cellNote}>
                        {d.burnoutTotal ? `${d.burnoutTotal} Total averaging 10+ hr days` : ''}
                        {d.burnoutRecurring ? <><br />({d.burnoutRecurring})</> : ''}
                      </div>
                    )}
                  </td>
                )
              })}
            </tr>

            {/* Productivity Row */}
            <tr>
              <td className={`${styles.rowHeader} ${styles.productivity}`}>≤ {targetHrs} Avg Daily Productivity</td>
              {depts.map((d, i) => (
                <td key={d.id} className={`${styles.cell} ${styles.cellBig}`}>
                  {fmt(parseInt(d.lowProd) || 0)}
                  {footnoteDepts.indexOf(d) >= 0 && <sup className={styles.sup}>{footnoteDepts.indexOf(d) + 1}</sup>}
                  <span className={styles.cellSub}>Employees</span>
                </td>
              ))}
            </tr>

            {/* Habitual Row */}
            <tr>
              <td className={`${styles.rowHeader} ${styles.habitual}`}>Habitual Flags</td>
              {depts.map(d => (
                <td key={d.id} className={`${styles.cell} ${styles.cellBig}`}>
                  {fmt(parseInt(d.habitual) || 0)}
                  <span className={styles.cellSub}>
                    Employees<br />
                    <span className={styles.cellSubMuted}>on list 3 months in a row</span>
                  </span>
                </td>
              ))}
            </tr>

            {/* Optimization Row */}
            <tr>
              <td className={`${styles.rowHeader} ${styles.opportunity}`}>💡 Optimization<br />Opportunity</td>
              {depts.map((d, i) => {
                const c = calculated[i]
                return (
                  <td key={d.id} className={`${styles.cell} ${styles.cellOpp}`}>
                    <div className={styles.oppHrs}>{fmt(c.unusedHrs)} hrs/yr</div>
                    <div className={styles.oppCalc}>{fmt(parseInt(d.lowProd) || 0)} employees × {c.unusedPerDay} unused hrs/day</div>
                    <div className={styles.oppFtes}>≈ {c.ftes} FTEs</div>
                    <div className={styles.oppDollar}>{fmtD(c.dollarValue)} / yr</div>
                    <div className={styles.oppSalary}>@ {fmtD(parseFloat(salary))} annual salary</div>
                  </td>
                )
              })}
            </tr>

          </tbody>
        </table>

        {/* Footnotes */}
        <div className={styles.footnotes}>
          {footnoteDepts.map((d, i) => (
            <p key={d.id}><sup>{i + 1}</sup> {d.habitualNote}</p>
          ))}
          <p>• Unused hours calculated as {unusedPerDay} hrs/day (8hr day – {targetHrs}hr productive avg) × 260 working days. FTE = total unused hrs ÷ 2,080 hrs/yr.</p>
        </div>

      </div>
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}
