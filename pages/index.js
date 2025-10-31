import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!email) return;
    setStatus('loading');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('🎉 Check your email to confirm!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Error. Try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Try again.');
    }

    setTimeout(() => { setStatus('idle'); setMessage(''); }, 5000);
  };

  return (
    <div style={{ fontFamily: '-apple-system, sans-serif', minHeight: '100vh' }}>
      <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '20px 0', position: 'sticky', top: 0 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#2563eb' }}>✈️ SkyScout South</div>
        </div>
      </nav>

      <section style={{ padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(32px, 8vw, 56px)', fontWeight: 800, marginBottom: '24px', lineHeight: 1.2 }}>
            The Best Flight Deals<br/>From Your Local Airports
          </h1>
          <p style={{ fontSize: 'clamp(18px, 4vw, 24px)', color: '#6b7280', marginBottom: '32px' }}>
            Curated deals for Southern travelers
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', margin: '32px 0' }}>
            {['ATL', 'BNA', 'CHA', 'HSV', 'BHM', 'TYS'].map(code => (
              <span key={code} style={{ background: '#f3f4f6', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 500 }}>
                {code}
              </span>
            ))}
          </div>

          <div style={{ maxWidth: '600px', margin: '48px auto' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === 'loading'}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                style={{ 
                  flex: '1 1 250px', 
                  padding: '16px 24px', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '10px', 
                  fontSize: '16px',
                  minWidth: '250px'
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={status === 'loading' || !email}
                style={{ 
                  padding: '16px 40px', 
                  background: status === 'loading' ? '#94a3b8' : '#2563eb', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '10px', 
                  fontSize: '16px', 
                  fontWeight: 600, 
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {status === 'loading' ? 'Subscribing...' : 'Get Deals Free'}
              </button>
            </div>
            
            {message && (
              <div style={{ 
                marginTop: '16px',
                padding: '12px 24px', 
                borderRadius: '8px', 
                background: status === 'success' ? '#dcfce7' : '#fee2e2', 
                color: status === 'success' ? '#166534' : '#991b1b', 
                fontSize: '14px', 
                fontWeight: 500 
              }}>
                {message}
              </div>
            )}
            
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>
              Join <strong>2,847 local travelers</strong> saving hundreds
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '16px' }}>Choose Your Plan</h2>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '60px' }}>Start free, upgrade anytime</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <PricingCard tier="Free" price="$0" features={['1 weekly email', 'All 6 airports', 'Basic alerts']} />
            <PricingCard tier="Pro" price="$49/yr" popular features={['2-3 weekly emails', 'Early access', 'Award alerts', 'Mobile app']} />
            <PricingCard tier="Premium" price="$99/yr" features={['Everything in Pro', 'Up to 5 emails/week', 'Business class deals', 'VIP concierge']} />
          </div>
        </div>
      </section>

      <footer style={{ background: '#111827', color: '#9ca3af', padding: '40px 24px', textAlign: 'center' }}>
        <p>&copy; 2025 SkyScout South. Serving the Southeast.</p>
      </footer>
    </div>
  );
}

function PricingCard({ tier, price, features, popular }) {
  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '16px', 
      padding: '40px', 
      border: popular ? '2px solid #2563eb' : '2px solid #e5e7eb',
      position: 'relative',
      boxShadow: popular ? '0 20px 40px rgba(37, 99, 235, 0.15)' : 'none'
    }}>
      {popular && (
        <div style={{ 
          position: 'absolute', 
          top: '-12px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          background: '#2563eb', 
          color: 'white', 
          padding: '4px 16px', 
          borderRadius: '12px', 
          fontSize: '12px', 
          fontWeight: 700 
        }}>
          MOST POPULAR
        </div>
      )}
      <div style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>{tier}</div>
      <div style={{ fontSize: '48px', fontWeight: 800, marginBottom: '24px' }}>{price}</div>
      <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', fontSize: '15px' }}>
        {features.map((f, i) => (
          <li key={i} style={{ padding: '12px 0', display: 'flex', gap: '12px' }}>
            <span style={{ color: '#2563eb', fontWeight: 700 }}>✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
