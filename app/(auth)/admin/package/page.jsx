import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';
import Package from '@/components/admin/Package';

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header at the Top */}
      <Header />

      {/* Main Content Layout */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              padding: '20px',
              backgroundColor: '#1a1a1a',
              minHeight: '100vh'
            }}>
              <div style={{
                width: '100%', 
                maxWidth: '1100px',
                backgroundColor: '#1a1a1a',  
                borderRadius: '8px',      
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
              }}>
                <Package />
              </div>
            </main>

      </div>
    </div>
  );
}
