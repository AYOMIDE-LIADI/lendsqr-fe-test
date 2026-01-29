import "./GeneralDetails.scss";

interface User {
  id: string | number;
  first_name?: string;
  last_name?: string;
  username?: string;
  phone?: string;
  email?: string;
  bvn?: string;
  gender?: string;
  maritalStatus?: string;
  children?: number;
  residence?: string;
  bankName?: string;
  accountBalance?: number;
}

interface InfoItem {
  label: string;
  value: string;
}

interface SectionProps {
  title?: string;
  items: InfoItem[];
  columns?: number;
}

const Section = ({ title, items, columns = 5 }: SectionProps) => {
  return (
    <div className="gd-section">
      {title && <p className="gd-title">{title}</p>}

      <div
        className="gd-grid"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {items.map((item, idx) => (
          <div className="gd-item" key={idx}>
            <p className="gd-label">{item.label}</p>
            <p className="gd-value">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface GeneralDetailsProps {
  user: User;
}

const randomFrom = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const randomBVN = () =>
  Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join("");

const safeLower = (val?: string, fallback = "user") =>
  (val?.trim() ? val.trim().toLowerCase() : fallback);

const GeneralDetails = ({ user }: GeneralDetailsProps) => {
  const firstName = user.first_name?.trim() || user.username?.trim() || "User";
  const lastName = user.last_name?.trim() || "";
  const phone = user.phone?.trim() || "N/A";
  const email = user.email?.trim() || "N/A";

  const gender = user.gender ?? randomFrom(["Male", "Female"]);
  const maritalStatus = user.maritalStatus ?? randomFrom(["Single", "Married", "Divorced"]);
  const children = user.children ?? Math.floor(Math.random() * 4);
  const residence = user.residence ?? randomFrom([
    "Parent’s Apartment",
    "Rented Apartment",
    "Owned Apartment",
    "Family House",
  ]);

  const education = randomFrom(["B.Sc", "HND", "M.Sc"]);
  const employmentStatus = randomFrom(["Employed", "Self-Employed"]);
  const sector = randomFrom(["FinTech", "Healthcare", "Retail", "Education"]);
  const duration = `${Math.floor(Math.random() * 6) + 1} years`;
  const incomeMin = Math.floor(Math.random() * 200 + 100) * 1000;
  const incomeMax = incomeMin + 200000;
  const loanRepayment = Math.floor(Math.random() * 90 + 10) * 1000;

  const guarantorName = randomFrom(["Debby Ogana", "Samuel Ade", "Blessing James"]);

  return (
    <div className="general-details">
      <Section
        title="Personal Information"
        items={[
          { label: "FULL NAME", value: `${firstName} ${lastName}`.trim() || "N/A" },
          { label: "PHONE NUMBER", value: phone },
          { label: "EMAIL ADDRESS", value: email },
          { label: "BVN", value: user.bvn ?? randomBVN() },
          { label: "GENDER", value: gender },
          { label: "MARITAL STATUS", value: maritalStatus },
          { label: "CHILDREN", value: String(children) },
          { label: "TYPE OF RESIDENCE", value: residence },
        ]}
      />

      <Section
        title="Education and Employment"
        columns={4}
        items={[
          { label: "LEVEL OF EDUCATION", value: education },
          { label: "EMPLOYMENT STATUS", value: employmentStatus },
          { label: "SECTOR OF EMPLOYMENT", value: sector },
          { label: "DURATION OF EMPLOYMENT", value: duration },
          { label: "OFFICE EMAIL", value: email },
          {
            label: "MONTHLY INCOME",
            value: `₦${incomeMin.toLocaleString()} - ₦${incomeMax.toLocaleString()}`,
          },
          {
            label: "LOAN REPAYMENT",
            value: `₦${loanRepayment.toLocaleString()}`,
          },
        ]}
      />

      <Section
        title="Socials"
        columns={3}
        items={[
          { label: "TWITTER", value: `@${safeLower(firstName)}` },
          { label: "FACEBOOK", value: `${firstName} ${lastName}`.trim() || "N/A" },
          {
            label: "INSTAGRAM",
            value: `@${safeLower(firstName)}_${safeLower(lastName, "user")}`,
          },
        ]}
      />

      <Section
        title="Guarantor"
        items={[
          { label: "FULL NAME", value: guarantorName },
          { label: "PHONE NUMBER", value: "08012345678" },
          {
            label: "EMAIL ADDRESS",
            value: `${guarantorName.split(" ")[0].toLowerCase()}@gmail.com`,
          },
          { label: "RELATIONSHIP", value: randomFrom(["Brother", "Sister"]) },
        ]}
      />
    </div>
  );
};

export default GeneralDetails;
