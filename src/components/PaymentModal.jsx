import React, { useState } from 'react';
import { X, CreditCard, CheckCircle } from 'lucide-react';

const PaymentModal = ({ show, onClose, onSuccess, amount = 10 }) => {
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [loading, setLoading] = useState(false);

  const handleMockPayment = () => {
    setLoading(true);
    setPaymentStatus('processing');
    
    // Simulate random payment success (90% success rate for demo)
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success
      setPaymentStatus(success ? 'success' : 'failed');
      setLoading(false);
      
      if (success) {
        setTimeout(() => {
          onSuccess();
        }, 1000);
      }
    }, 2000);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Unlock Vendor Details</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="payment-info">
          <div className="price-card">
            <h3>₹{amount}</h3>
            <p>One-time vendor unlock fee</p>
          </div>
          
          {paymentStatus === 'idle' && (
            <div className="payment-options">
              <button className="pay-btn" onClick={handleMockPayment} disabled={loading}>
                {loading ? 'Processing...' : '✅ Pay ₹10 & Unlock'}
                <CreditCard size={20} />
              </button>
              <button className="free-btn" onClick={onSuccess}>
                🎉 Demo Mode - Unlock Free
              </button>
            </div>
          )}

          {paymentStatus === 'processing' && (
            <div className="processing">
              <div className="spinner"></div>
              <p>Processing payment...</p>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="success-state">
              <CheckCircle size={64} className="success-icon" />
              <h3>✅ Payment Successful!</h3>
              <p>Vendor details unlocked</p>
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div className="error-state">
              <h3>❌ Payment Failed</h3>
              <p>Try again or use Demo Mode</p>
              <button className="retry-btn" onClick={handleMockPayment}>
                Retry Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

