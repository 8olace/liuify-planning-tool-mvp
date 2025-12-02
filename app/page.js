export default function Home() {
  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '12px', color: '#2c3e50' }}>Getting Started</h3>
          <p style={{ color: '#666', marginBottom: '16px', fontSize: '14px' }}>
            Welcome to Liuify Planning Tool MVP. Start by managing your guards and shifts.
          </p>
          <ul style={{ fontSize: '14px', color: '#666', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Add guards to your system</li>
            <li style={{ marginBottom: '8px' }}>Create shifts and assign locations</li>
            <li style={{ marginBottom: '8px' }}>Manage assignments and availability</li>
          </ul>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '12px', color: '#2c3e50' }}>Setup Required</h3>
          <p style={{ color: '#666', marginBottom: '16px', fontSize: '14px' }}>
            Before using the app, ensure Supabase environment variables are configured:
          </p>
          <code style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', fontSize: '12px', display: 'block', color: '#333' }}>
            NEXT_PUBLIC_SUPABASE_URL<br />
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '12px', color: '#2c3e50' }}>Quick Links</h3>
          <ul style={{ fontSize: '14px', paddingLeft: '0', listStyle: 'none' }}>
            <li style={{ marginBottom: '8px' }}>
              <a href="/guards" style={{ color: '#3498db', textDecoration: 'none' }}>
                → Manage Guards
              </a>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <a href="/shifts" style={{ color: '#3498db', textDecoration: 'none' }}>
                → Manage Shifts
              </a>
            </li>
            <li>
              <a href="/locations" style={{ color: '#3498db', textDecoration: 'none' }}>
                → Manage Locations
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
