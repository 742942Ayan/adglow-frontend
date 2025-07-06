import React from 'react';

const OtpInput = ({ value, onChange }) => {
  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^[0-9]?$/.test(val)) return;

    const otpArray = value.split('');
    otpArray[index] = val;
    const newOtp = otpArray.join('');
    onChange(newOtp);

    // Auto focus next input
    if (val && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {[...Array(6)].map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          className="w-10 h-10 text-center border rounded-md text-lg"
          value={value[i] || ''}
          onChange={(e) => handleChange(e, i)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
