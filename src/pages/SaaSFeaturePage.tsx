import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  CreditCard,
  FileSpreadsheet,
  Headphones,
  Image,
  Layers,
  Package,
  Plus,
  RefreshCcw,
  ShieldCheck,
  Truck,
  Upload,
  Users,
} from 'lucide-react';
import { useApp, type Screen } from '../context/AppContext';

interface FeatureConfig {
  title: string;
  subtitle: string;
  icon: typeof CreditCard;
  primaryAction: string;
  secondaryAction?: string;
  stats: Array<{ label: string; value: string; tone: string }>;
  items: Array<{ title: string; meta: string; status: string }>;
}

const configs: Record<string, FeatureConfig> = {
  wallet: {
    title: 'Wallet & Financials',
    subtitle: 'Real balance, penalties, revenue tracking, subscriptions, and renewal status.',
    icon: CreditCard,
    primaryAction: 'Record Renewal',
    secondaryAction: 'Export Report',
    stats: [
      { label: 'Available Balance', value: '$8,420', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Pending Payouts', value: '$1,260', tone: 'bg-emerald-50 text-emerald-700' },
      { label: 'Penalties', value: '3 units', tone: 'bg-rose-50 text-rose-700' },
    ],
    items: [
      { title: 'Annual subscription renewal', meta: 'TechVault Store • due in 21 days', status: 'Manual renewal' },
      { title: 'Delay penalty deducted', meta: 'Order ORD-9921 • first 2 hour rule', status: '-1 wallet unit' },
      { title: 'Marketplace revenue split', meta: 'Multi-vendor checkout payout', status: 'Processed' },
    ],
  },
  employees: {
    title: 'Employees & Permissions',
    subtitle: 'Role-based access for store owner, orders, inventory, and support staff.',
    icon: Users,
    primaryAction: 'Invite Employee',
    secondaryAction: 'Review Roles',
    stats: [
      { label: 'Active Staff', value: '8', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Custom Roles', value: '4', tone: 'bg-purple-50 text-purple-700' },
      { label: 'Pending Invites', value: '2', tone: 'bg-amber-50 text-amber-700' },
    ],
    items: [
      { title: 'Orders Staff', meta: 'Can confirm, prepare, and mark delivery status', status: 'Enabled' },
      { title: 'Inventory Staff', meta: 'Can adjust stock and receive minimum stock alerts', status: 'Enabled' },
      { title: 'Support Staff', meta: 'Can message customers and manage complaints', status: 'Limited' },
    ],
  },
  'bulk-import': {
    title: 'Bulk Product Import',
    subtitle: 'CSV import for up to 20 products with image validation and ordering checks.',
    icon: FileSpreadsheet,
    primaryAction: 'Upload CSV',
    secondaryAction: 'View Rules',
    stats: [
      { label: 'Upload Limit', value: '20', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Required Images', value: '1-20', tone: 'bg-emerald-50 text-emerald-700' },
      { label: 'Last Errors', value: '0', tone: 'bg-gray-100 text-gray-700' },
    ],
    items: [
      { title: 'CSV ordering column', meta: 'Duplicate ordering detection is enforced', status: 'Required' },
      { title: 'Images folder', meta: 'Images must be named 1 through 20', status: 'Required' },
      { title: 'Auto product codes', meta: 'Generated after validation passes', status: 'Ready' },
    ],
  },
  reports: {
    title: 'Reports & Analytics',
    subtitle: 'Merchant and platform reporting for revenue, orders, inventory, and complaints.',
    icon: BarChart3,
    primaryAction: 'Generate Report',
    secondaryAction: 'Download CSV',
    stats: [
      { label: 'Revenue', value: '$142K', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Orders', value: '1,240', tone: 'bg-emerald-50 text-emerald-700' },
      { label: 'Complaints', value: '5', tone: 'bg-rose-50 text-rose-700' },
    ],
    items: [
      { title: 'Sales summary', meta: 'Weekly and monthly revenue views', status: 'Live' },
      { title: 'Low stock report', meta: 'Minimum quantity threshold alerts', status: 'Live' },
      { title: 'Return requests', meta: 'Return and exchange status review', status: 'Live' },
    ],
  },
  support: {
    title: 'Support Center',
    subtitle: 'Customer help for orders, returns, privacy, complaints, and merchant communication.',
    icon: Headphones,
    primaryAction: 'Start Support Chat',
    secondaryAction: 'Contact Us',
    stats: [
      { label: 'Open Tickets', value: '3', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Avg Response', value: '12m', tone: 'bg-emerald-50 text-emerald-700' },
      { label: 'Returns', value: '2', tone: 'bg-amber-50 text-amber-700' },
    ],
    items: [
      { title: 'Return after delivery', meta: 'Available after delivered status', status: 'Allowed' },
      { title: 'Reverse shipping', meta: 'Required after shipment departure', status: 'Policy' },
      { title: 'Merchant chat', meta: 'Text and image message support', status: 'Available' },
    ],
  },
  finance: {
    title: 'Financial Management',
    subtitle: 'Admin controls for subscriptions, revenue, payouts, penalties, and platform reports.',
    icon: CreditCard,
    primaryAction: 'Review Payouts',
    secondaryAction: 'Export Ledger',
    stats: [
      { label: 'Platform Revenue', value: '$142K', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Subscriptions', value: '156', tone: 'bg-emerald-50 text-emerald-700' },
      { label: 'Paused Stores', value: '4', tone: 'bg-rose-50 text-rose-700' },
    ],
    items: [
      { title: 'Annual subscriptions', meta: 'Manual renewal queue and expiry status', status: 'Open' },
      { title: 'Penalty deductions', meta: 'Delay and cancellation wallet deductions', status: 'Audited' },
      { title: 'Merchant payouts', meta: 'Multi-vendor checkout settlement', status: 'Ready' },
    ],
  },
  'users-mgmt': {
    title: 'User Management',
    subtitle: 'Admin governance for customers, merchants, employees, and RBAC access.',
    icon: Users,
    primaryAction: 'Invite User',
    secondaryAction: 'Audit Roles',
    stats: [
      { label: 'Customers', value: '8.4K', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Merchants', value: '156', tone: 'bg-purple-50 text-purple-700' },
      { label: 'Staff Roles', value: '4', tone: 'bg-emerald-50 text-emerald-700' },
    ],
    items: [
      { title: 'Store Owner', meta: 'Full store permissions', status: 'Active' },
      { title: 'Orders Staff', meta: 'Order status and complaints access', status: 'Active' },
      { title: 'Support Staff', meta: 'Customer messaging access', status: 'Limited' },
    ],
  },
  'stores-mgmt': {
    title: 'Store Management',
    subtitle: 'Admin controls for store approvals, subscription status, and operational health.',
    icon: ShieldCheck,
    primaryAction: 'Approve Store',
    secondaryAction: 'Pause Store',
    stats: [
      { label: 'Active Stores', value: '156', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Pending Review', value: '4', tone: 'bg-amber-50 text-amber-700' },
      { label: 'Expired', value: '2', tone: 'bg-rose-50 text-rose-700' },
    ],
    items: [
      { title: 'FashionHub approval', meta: 'Merchant onboarding review', status: 'Pending' },
      { title: 'TechVault renewal', meta: 'Annual subscription paid', status: 'Active' },
      { title: 'Store pause policy', meta: 'Expired subscription enforcement', status: 'Ready' },
    ],
  },
  'categories-mgmt': {
    title: 'Category Management',
    subtitle: 'Admin category controls for customer browsing, filters, and product classification.',
    icon: Layers,
    primaryAction: 'Add Category',
    secondaryAction: 'Reorder Categories',
    stats: [
      { label: 'Categories', value: '8', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Subcategories', value: '32', tone: 'bg-emerald-50 text-emerald-700' },
      { label: 'Products Mapped', value: '9', tone: 'bg-gray-100 text-gray-700' },
    ],
    items: [
      { title: 'Electronics', meta: 'Phones, laptops, audio, accessories', status: 'Active' },
      { title: 'Fashion', meta: 'Men, women, kids, shoes', status: 'Active' },
      { title: 'Automotive', meta: 'Parts, tools, care', status: 'Active' },
    ],
  },
  'banners-mgmt': {
    title: 'Banner Management',
    subtitle: 'Admin tools for marketplace hero banners, store promotions, and campaign scheduling.',
    icon: Image,
    primaryAction: 'Create Banner',
    secondaryAction: 'Schedule Campaign',
    stats: [
      { label: 'Active Banners', value: '3', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Campaigns', value: '5', tone: 'bg-purple-50 text-purple-700' },
      { label: 'CTR', value: '8.2%', tone: 'bg-emerald-50 text-emerald-700' },
    ],
    items: [
      { title: 'Free Shipping', meta: 'Orders over $50 promotion', status: 'Live' },
      { title: 'Spring Sale', meta: 'Up to 50% off campaign', status: 'Live' },
      { title: 'New Arrivals', meta: 'Latest trends banner', status: 'Scheduled' },
    ],
  },
  about: {
    title: 'About MARKET',
    subtitle: 'A multi-vendor marketplace SaaS for customers, merchants, and admins.',
    icon: ShieldCheck,
    primaryAction: 'Browse Stores',
    secondaryAction: 'Contact Support',
    stats: [
      { label: 'Merchants', value: '156', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Orders', value: '1.2K', tone: 'bg-emerald-50 text-emerald-700' },
      { label: 'Languages', value: 'EN / AR', tone: 'bg-purple-50 text-purple-700' },
    ],
    items: [
      { title: 'Customer marketplace', meta: 'Browse, favorite, chat, and checkout', status: 'Available' },
      { title: 'Merchant SaaS', meta: 'Products, orders, inventory, wallet, theme', status: 'Available' },
      { title: 'Admin governance', meta: 'Users, stores, finance, reports', status: 'Available' },
    ],
  },
  contact: {
    title: 'Contact Us',
    subtitle: 'Reach marketplace support or continue a merchant conversation.',
    icon: Headphones,
    primaryAction: 'Open Messages',
    secondaryAction: 'Support Center',
    stats: [
      { label: 'Response Time', value: '12m', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Open Chats', value: '3', tone: 'bg-emerald-50 text-emerald-700' },
      { label: 'Support Staff', value: '4', tone: 'bg-purple-50 text-purple-700' },
    ],
    items: [
      { title: 'Customer support', meta: 'Order, return, and account help', status: 'Online' },
      { title: 'Merchant support', meta: 'Store setup and subscription help', status: 'Online' },
      { title: 'Complaint system', meta: 'Escalate order issues', status: 'Ready' },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Data, account, messaging, and marketplace safety policies.',
    icon: ShieldCheck,
    primaryAction: 'Review Policy',
    secondaryAction: 'Security Settings',
    stats: [
      { label: 'Policy Version', value: '1.0', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Data Controls', value: 'Active', tone: 'bg-emerald-50 text-emerald-700' },
      { label: 'Messages', value: 'In-app', tone: 'bg-gray-100 text-gray-700' },
    ],
    items: [
      { title: 'In-app notifications', meta: 'Order updates and store alerts', status: 'Covered' },
      { title: 'Messaging', meta: 'Customer and merchant communication', status: 'Covered' },
      { title: 'Account security', meta: 'Profile and merchant access controls', status: 'Covered' },
    ],
  },
  'track-orders': {
    title: 'Track Orders',
    subtitle: 'Customer order tracking with shipment status and return restrictions.',
    icon: Truck,
    primaryAction: 'Refresh Tracking',
    secondaryAction: 'Request Return',
    stats: [
      { label: 'Active Orders', value: '3', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Delivered', value: '8', tone: 'bg-emerald-50 text-emerald-700' },
      { label: 'Return Eligible', value: '2', tone: 'bg-amber-50 text-amber-700' },
    ],
    items: [
      { title: 'ORD-9921', meta: 'Pending merchant confirmation', status: 'Pending' },
      { title: 'ORD-9917', meta: 'Manual shipping company entry', status: 'Out for Delivery' },
      { title: 'ORD-9918', meta: 'Return available after delivery', status: 'Delivered' },
    ],
  },
  returns: {
    title: 'Returns & Exchanges',
    subtitle: 'Return, exchange, and reverse-shipping workflows after delivery.',
    icon: RefreshCcw,
    primaryAction: 'Request Return',
    secondaryAction: 'Request Exchange',
    stats: [
      { label: 'Return Requests', value: '2', tone: 'bg-amber-50 text-amber-700' },
      { label: 'Exchange Requests', value: '1', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Returned', value: '4', tone: 'bg-emerald-50 text-emerald-700' },
    ],
    items: [
      { title: 'After delivery return', meta: 'Customer return eligibility', status: 'Allowed' },
      { title: 'After shipment departure', meta: 'Reverse shipping fees may apply', status: 'Policy' },
      { title: 'Merchant delay penalty', meta: 'First 2 hour cancellation rule', status: 'Tracked' },
    ],
  },
  login: {
    title: 'Login',
    subtitle: 'Access customer profile, merchant dashboard, and admin controls.',
    icon: Users,
    primaryAction: 'Continue to Profile',
    secondaryAction: 'Register Merchant',
    stats: [
      { label: 'Customer', value: 'Ready', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Merchant', value: 'Ready', tone: 'bg-emerald-50 text-emerald-700' },
      { label: 'Admin', value: 'Ready', tone: 'bg-purple-50 text-purple-700' },
    ],
    items: [
      { title: 'Customer account', meta: 'Orders, wishlist, messages', status: 'Available' },
      { title: 'Merchant account', meta: 'Dashboard and store management', status: 'Available' },
      { title: 'Admin account', meta: 'Platform governance', status: 'Available' },
    ],
  },
  default: {
    title: 'Marketplace Operations',
    subtitle: 'Manage the selected SaaS marketplace workflow.',
    icon: ShieldCheck,
    primaryAction: 'Create Item',
    secondaryAction: 'Review',
    stats: [
      { label: 'Active', value: '24', tone: 'bg-blue-50 text-blue-700' },
      { label: 'Pending', value: '6', tone: 'bg-amber-50 text-amber-700' },
      { label: 'Completed', value: '84', tone: 'bg-emerald-50 text-emerald-700' },
    ],
    items: [
      { title: 'Operational queue', meta: 'Review marketplace activity', status: 'Active' },
      { title: 'Admin action required', meta: 'Governance workflow', status: 'Pending' },
      { title: 'Customer notification', meta: 'In-app status update', status: 'Sent' },
    ],
  },
};

const titles: Partial<Record<Screen, string>> = {
  finance: 'Financial Management',
  'users-mgmt': 'User Management',
  'stores-mgmt': 'Store Management',
  'categories-mgmt': 'Category Management',
  'banners-mgmt': 'Banner Management',
  about: 'About MARKET',
  contact: 'Contact Us',
  privacy: 'Privacy Policy',
  'track-orders': 'Track Orders',
  returns: 'Returns & Exchanges',
  login: 'Login',
};

export default function SaaSFeaturePage({ type }: { type: Screen }) {
  const { goBack, navigate, showToast } = useApp();
  const config = configs[type] ?? {
    ...configs.default,
    title: titles[type] ?? configs.default.title,
  };
  const Icon = config.icon;

  const handlePrimary = () => {
    if (type === 'bulk-import') showToast('CSV upload validation started');
    else if (type === 'support') navigate('messages');
    else if (type === 'contact') navigate('messages');
    else if (type === 'about') navigate('stores');
    else if (type === 'login') navigate('profile');
    else showToast(`${config.primaryAction} completed`);
  };

  const handleSecondary = () => {
    if (type === 'track-orders') navigate('orders-mgmt');
    else if (type === 'returns') showToast('Return request opened');
    else if (type === 'about' || type === 'contact') navigate('support');
    else if (type === 'login') navigate('sell');
    else showToast(`${config.secondaryAction ?? 'Action'} ready`);
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <header className="shrink-0 border-b border-gray-100 bg-white px-4 py-4 lg:hidden">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-800">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-black text-gray-950">{config.title}</h1>
            <p className="text-[11px] font-bold text-gray-400">SaaS marketplace workflow</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-28 no-scrollbar lg:p-8">
        <section className="mx-auto max-w-6xl">
          <div className="mb-6 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-gray-100 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8 lg:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-100">
                <Icon size={26} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-gray-950 lg:text-4xl">{config.title}</h1>
                <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-gray-500 lg:text-base">{config.subtitle}</p>
              </div>
            </div>

            <div className="mt-5 flex gap-3 lg:mt-0">
              <button onClick={handlePrimary} className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-black text-white shadow-lg shadow-blue-100 transition-transform active:scale-95">
                {type === 'bulk-import' ? <Upload size={18} /> : <Plus size={18} />}
                {config.primaryAction}
              </button>
              {config.secondaryAction && (
                <button onClick={handleSecondary} className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gray-100 px-5 text-sm font-black text-gray-800 transition-transform active:scale-95">
                  <RefreshCcw size={17} />
                  {config.secondaryAction}
                </button>
              )}
            </div>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            {config.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                <p className="text-xs font-black uppercase tracking-wider text-gray-400">{stat.label}</p>
                <p className={`mt-3 w-fit rounded-xl px-3 py-2 text-xl font-black ${stat.tone}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
            <section className="overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-gray-100">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="text-base font-black text-gray-950">Workflow Items</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {config.items.map((item) => (
                  <button key={item.title} onClick={() => showToast(`${item.title} selected`)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-blue-600">
                        {type === 'track-orders' ? <Truck size={18} /> : type === 'banners-mgmt' ? <Image size={18} /> : <Package size={18} />}
                      </span>
                      <div>
                        <h3 className="text-sm font-black text-gray-900">{item.title}</h3>
                        <p className="text-xs font-medium text-gray-500">{item.meta}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-blue-600">{item.status}</span>
                  </button>
                ))}
              </div>
            </section>

            <aside className="rounded-[24px] bg-gray-950 p-5 text-white shadow-sm">
              <h2 className="text-base font-black">PRD Coverage</h2>
              <div className="mt-4 space-y-3">
                {['Accessible navigation', 'Toast feedback', 'Role-aware workflow', 'Mobile and desktop layouts'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span className="text-sm font-bold text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('home')} className="mt-6 h-11 w-full rounded-2xl bg-white text-sm font-black text-gray-950 transition-transform active:scale-95">
                Back to Marketplace
              </button>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
