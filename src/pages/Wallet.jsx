// 📁 src/pages/Wallet.jsx (Add inside existing Wallet component)
{
  referralEarnings && referralEarnings.length > 0 && (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Referral Commissions</h3>
      <ul className="list-disc ml-5 text-sm">
        {referralEarnings.map((e, i) => (
          <li key={i}>
            ₹{e.amount} from Level {e.level} ({e.source}) –{" "}
            <span className="text-gray-600">{e.fromUserName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
