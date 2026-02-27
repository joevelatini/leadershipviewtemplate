import styles from './InputPage.module.css'

const BADGE_COLORS = ['#2980b9', '#27ae60', '#e67e22', '#8e44ad', '#16a085']

export default function InputPage({ company, setCompany, depts, setDepts, nextId, setNextId, onGenerate, onClear }) {
  const updateCompany = (field, val) => setCompany(prev => ({ ...prev, [field]: val }))

  const updateDept = (id, field, val) => {
    setDepts(prev => prev.map(d => d.id === id ? { ...d, [field]: val } : d))
  }

  const addDept = () => {
    setDepts(prev => [...prev, {
      id: nextId,
      name: '',
      pct: '',
      lowProd: '',
      habitual: '',
      habitualNote: '',
      burnoutNames: '',
      burnoutTotal: '',
      burnoutRecurring: '',
    }])
    setNextId(n => n + 1)
  }

  const removeDept = (id) => {
    if (depts.length <= 1) return
    setDepts(prev => prev.filter(d => d.id !== id))
  }

  const handleGenerate = () => {
    if (!company.name.trim() || !company.period.trim()) {
      alert('Please fill in Company Name and Report Period.')
      return
    }
    onGenerate()
  }

  const handleClear = () => {
    if (window.confirm('Clear all data and start from scratch?')) {
      onClear()
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>ActivTrak Leadership View</div>
          <h1 className={styles.title}>Build Your Report</h1>
          <p className={styles.subtitle}>Fill in the data below to generate an executive-ready leadership view</p>
        </div>

        {/* Steps */}
        <div className={styles.steps}>
          <div className={`${styles.stepDot} ${styles.active}`}>1</div>
          <div className={styles.stepLine}></div>
          <div className={styles.stepDot}>2</div>
        </div>

        {/* Company Info Card */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Company Info</div>
          <div className={styles.formRow}>
            <FormGroup label="Company / Customer Name">
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Acme Corp"
                value={company.name}
                onChange={e => updateCompany('name', e.target.value)}
              />
            </FormGroup>
            <FormGroup label="Report Period (Month / Quarter)">
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Q3 2024"
                value={company.period}
                onChange={e => updateCompany('period', e.target.value)}
              />
            </FormGroup>
          </div>
          <div className={styles.formRow}>
            <FormGroup label="Avg Annual Salary ($)">
              <input
                type="number"
                className={styles.input}
                placeholder="e.g. 75000"
                value={company.salary}
                onChange={e => updateCompany('salary', e.target.value)}
              />
            </FormGroup>
            <FormGroup label="Target Productive Hrs/Day">
              <input
                type="number"
                className={styles.input}
                placeholder="e.g. 5.5"
                step="0.1"
                value={company.targetHrs}
                onChange={e => updateCompany('targetHrs', e.target.value)}
              />
            </FormGroup>
          </div>
        </div>

        {/* Departments Card */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Departments</div>

          {depts.map((dept, idx) => (
            <DeptSection
              key={dept.id}
              dept={dept}
              idx={idx}
              color={BADGE_COLORS[idx % BADGE_COLORS.length]}
              targetHrs={company.targetHrs || '5.5'}
              canRemove={depts.length > 1}
              onChange={(field, val) => updateDept(dept.id, field, val)}
              onRemove={() => removeDept(dept.id)}
            />
          ))}

          <button className={styles.addDeptBtn} onClick={addDept}>
            + Add Another Department
          </button>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionRow}>
          <button className={styles.clearBtn} onClick={handleClear}>
            ↺ Clear All Data
          </button>
          <button className={styles.generateBtn} onClick={handleGenerate}>
            Generate Leadership View →
          </button>
        </div>

      </div>
    </div>
  )
}

function FormGroup({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        fontSize: '11px',
        fontWeight: 500,
        color: '#8fa8be',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
      }}>{label}</label>
      {children}
    </div>
  )
}

function DeptSection({ dept, idx, color, canRemove, onChange, onRemove }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '12px',
      padding: '20px 24px',
      marginBottom: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ fontFamily: "'Inter', -apple-system, sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            background: `${color}33`,
            color: color,
            padding: '2px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 700,
          }}>Dept {idx + 1}</span>
          {dept.name || 'New Department'}
        </h3>
        {canRemove && (
          <button onClick={onRemove} style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            color: '#e74c3c',
            padding: '4px 10px',
            fontSize: '11px',
            cursor: 'pointer',
          }}>Remove</button>
        )}
      </div>

      <TwoCol>
        <FormGroup label="Department Name">
          <input type="text" style={inputStyle} placeholder="e.g. Sales" value={dept.name} onChange={e => onChange('name', e.target.value)} />
        </FormGroup>
        <FormGroup label="% of Org Below Target">
          <input type="number" style={inputStyle} placeholder="e.g. 24" value={dept.pct} onChange={e => onChange('pct', e.target.value)} />
        </FormGroup>
      </TwoCol>

      <ThreeCol>
        <FormGroup label="Low Productivity Employees">
          <input type="number" style={inputStyle} placeholder="e.g. 45" value={dept.lowProd} onChange={e => onChange('lowProd', e.target.value)} />
        </FormGroup>
        <FormGroup label="Habitual Flags (3+ months)">
          <input type="number" style={inputStyle} placeholder="e.g. 18" value={dept.habitual} onChange={e => onChange('habitual', e.target.value)} />
        </FormGroup>
        <FormGroup label="Footnote (optional)">
          <input type="text" style={inputStyle} placeholder="e.g. excl. field reps" value={dept.habitualNote} onChange={e => onChange('habitualNote', e.target.value)} />
        </FormGroup>
      </ThreeCol>

      <div style={{ marginBottom: '12px' }}>
        <FormGroup label="Burnout Risk Names (one per line)">
          <textarea
            style={{ ...inputStyle, minHeight: '72px', resize: 'vertical' }}
            placeholder={"e.g. Employee Name\nEmployee Name\nEmployee Name"}
            value={dept.burnoutNames}
            onChange={e => onChange('burnoutNames', e.target.value)}
          />
        </FormGroup>
      </div>

      <TwoCol>
        <FormGroup label="Total 10+ Hr Day Employees">
          <input type="number" style={inputStyle} placeholder="e.g. 12" value={dept.burnoutTotal} onChange={e => onChange('burnoutTotal', e.target.value)} />
        </FormGroup>
        <FormGroup label="Recurring Note">
          <input type="text" style={inputStyle} placeholder="e.g. 3 appear 3 months in a row" value={dept.burnoutRecurring} onChange={e => onChange('burnoutRecurring', e.target.value)} />
        </FormGroup>
      </TwoCol>
    </div>
  )
}

function TwoCol({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>{children}</div>
}
function ThreeCol({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>{children}</div>
}

const inputStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px',
  padding: '10px 14px',
  fontFamily: "'Inter', -apple-system, sans-serif",
  fontSize: '14px',
  color: '#fff',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s',
}
