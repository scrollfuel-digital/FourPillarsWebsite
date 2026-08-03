import {
  Home,
  BarChart3,
  Users,
  Award,
  MapPin,
  Wrench,
  FileText,
  Landmark,
  Phone,
  Eye,
  ShieldCheck,
} from 'lucide-react';

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: any;
  iconColor: string;
  iconBg: string;
}

export interface FeatureCard {
  num: string;
  icon: any;
  iconColor: string;
  iconBg: string;
  tagLabel: string;
  tagBg: string;
  tagColor: string;
  accent: string;
  title: string;
  desc: string;
}

export interface CustomerJourneyStep {
  step: string;
  desc: string;
  icon: any;
  color: string;
  satisfaction: string;
}

export interface VideoTestimonial {
  id: string;
  name: string;
  project: string;
  duration: string;
  thumbnail?: string;
  active?: boolean;
}

export const ROTATING_PHRASES = [
  'Residential Plots',
  'Luxury Apartments',
  'Investment Opportunities',
  'Future Growth',
];

export const HERO_TRUST_BADGES = [
  { label: '15+ Years', sub: 'Experience', icon: Award },
  { label: '1500+ Families', sub: 'Happy Customers', icon: Users },
  { label: '100% Legal', sub: 'NMRDA Approved', icon: ShieldCheck },
];

export const STATS: StatItem[] = [
  {
    value: 2000,
    suffix: '+',
    label: 'Plots Delivered',
    icon: Home,
    iconColor: '#85B7EB',
    iconBg: 'rgba(24,95,165,.18)',
  },
  {
    value: 200,
    suffix: '+',
    label: 'Land Developed',
    icon: BarChart3,
    iconColor: '#5DCAA5',
    iconBg: 'rgba(15,110,86,.18)',
  },
  {
    value: 1500,
    suffix: '+',
    label: 'Happy Families',
    icon: Users,
    iconColor: '#AFA9EC',
    iconBg: 'rgba(83,74,183,.18)',
  },
  {
    value: 15,
    suffix: ' Yr',
    label: 'Years Experience',
    icon: Award,
    iconColor: '#EF9F27',
    iconBg: 'rgba(186,117,23,.18)',
  },
];

export const FEATURES: FeatureCard[] = [
  {
    num: '01',
    icon: MapPin,
    iconColor: '#185FA5',
    iconBg: '#EEF3FB',
    tagLabel: 'Growth Zone',
    tagBg: '#EEF3FB',
    tagColor: '#0C447C',
    accent: '#185FA5',
    title: 'Strategic Locations',
    desc: 'Projects located in high-growth areas with strong future development potential.',
  },
  {
    num: '02',
    icon: Wrench,
    iconColor: '#0F6E56',
    iconBg: '#E1F5EE',
    tagLabel: 'Premium Layouts',
    tagBg: '#E1F5EE',
    tagColor: '#085041',
    accent: '#0F6E56',
    title: 'Quality Infrastructure',
    desc: 'Well-planned layouts, wide roads, utilities, and modern amenities.',
  },
  {
    num: '03',
    icon: FileText,
    iconColor: '#534AB7',
    iconBg: '#EEEDFE',
    tagLabel: '100% Legal',
    tagBg: '#EEEDFE',
    tagColor: '#3C3489',
    accent: '#534AB7',
    title: 'Transparent Transactions',
    desc: 'Professional guidance and complete transparency throughout the buying process.',
  },
  {
    num: '04',
    icon: BarChart3,
    iconColor: '#0F6E56',
    iconBg: '#E1F5EE',
    tagLabel: 'High ROI',
    tagBg: '#E1F5EE',
    tagColor: '#085041',
    accent: '#0F6E56',
    title: 'Investment Opportunities',
    desc: 'Projects designed to deliver long-term value and appreciation.',
  },
  {
    num: '05',
    icon: Landmark,
    iconColor: '#BA7517',
    iconBg: '#FAEEDA',
    tagLabel: 'Up to 80%',
    tagBg: '#FAEEDA',
    tagColor: '#633806',
    accent: '#BA7517',
    title: 'Easy Financing',
    desc: 'Up to 80% bank loan assistance for eligible buyers through leading financial institutions.',
  },
  {
    num: '06',
    icon: Users,
    iconColor: '#185FA5',
    iconBg: '#EEF3FB',
    tagLabel: 'Support',
    tagBg: '#EEF3FB',
    tagColor: '#0C447C',
    accent: '#185FA5',
    title: 'Dedicated Customer Support',
    desc: 'Personalized assistance from inquiry to property possession.',
  },
];

export const ABOUT_TAGS = [
  { label: 'NMRDA Approved', bg: '#EEF3FB', color: '#0C447C', border: '#C5D7F4' },
  { label: 'Clear Titles', bg: '#E1F5EE', color: '#085041', border: '#9FE1CB' },
  { label: 'RERA Compliant', bg: '#EEEDFE', color: '#3C3489', border: '#CECBF6' },
  { label: 'Easy Financing', bg: '#FAEEDA', color: '#633806', border: '#FAC775' },
];

export const COMPANY_HIGHLIGHTS = [
  "Nagpur's Finest",
  'Bank Loan Ready',
  'Top Financiers',
];

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  { id: '1', name: 'Rajesh Sharma', project: 'Melbourne City', duration: '2:34' },
  { id: '2', name: 'Amit Gupta', project: 'Canberra City', duration: '1:50' },
  { id: '3', name: 'Sneha Patel', project: 'Bhakti Avenue', duration: '2:12' },
];

export const CUSTOMER_JOURNEY_STEPS: CustomerJourneyStep[] = [
  {
    step: 'Initial Inquiry',
    desc: 'First contact through our website inquiry form or helpline',
    icon: Phone,
    color: 'from-blue-500 to-cyan-500',
    satisfaction: '98%',
  },
  {
    step: 'Site Visit',
    desc: 'Professional guided tour with detailed project explanation & vehicle pickup',
    icon: Eye,
    color: 'from-emerald-500 to-teal-500',
    satisfaction: '96%',
  },
  {
    step: 'Documentation',
    desc: 'Transparent legal process with complete NMRDA & RERA documentation support',
    icon: ShieldCheck,
    color: 'from-purple-500 to-pink-500',
    satisfaction: '99%',
  },
  {
    step: 'Possession',
    desc: 'Smooth handover process with all layout amenities ready for immediate construction',
    icon: Home,
    color: 'from-amber-500 to-orange-500',
    satisfaction: '97%',
  },
];
