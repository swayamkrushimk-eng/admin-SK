import React, { useState, useEffect, useRef } from 'react'
import {
  LayoutDashboard,
  FileText,
  Award,
  FileImage,
  HelpCircle,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  RefreshCw,
  Plus,
  Search,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Sparkles,
  Upload,
  Check,
  X,
  Send,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Eye,
  Star,
  Layers,
  ChevronRight,
  ShieldCheck,
  Globe,
  Users,
  BarChart3,
  Monitor,
  Smartphone,
  Calendar,
  SendHorizontal,
  CheckSquare,
  Square,
  AlertCircle,
  Video,
  Play,
  Volume2,
  Crop,
  Mic,
  Quote,
  MessageSquareQuote,
  Newspaper,
  Users2,
  Radio
} from 'lucide-react'
import {
  adminLogin,
  fetchAdminStats,
  fetchAnalyticsSummary,
  fetchSubscribers,
  deleteSubscriber,
  updateSubscriberStatus,
  sendNewsletterCampaign,
  fetchCampaigns,
  fetchSettings,
  updateSettings,
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  fetchAccolades,
  createAccolade,
  updateAccolade,
  deleteAccolade,
  fetchCertificates,
  createCertificate,
  deleteCertificate,
  fetchFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  fetchInquiries,
  updateInquiryStatus,
  deleteInquiry,
  uploadImage,
  fetchInsiders,
  createInsider,
  updateInsider,
  deleteInsider,
  uploadMedia,
  fetchCommitteeMembers,
  createCommitteeMember,
  updateCommitteeMember,
  deleteCommitteeMember,
  fetchMediaBuzz,
  createMediaBuzz,
  updateMediaBuzz,
  deleteMediaBuzz
} from './services/api'
import TiptapEditor from './components/TiptapEditor'
import CircleCropModal from './components/CircleCropModal'
import defaultCircleLeft from './assets/images/circle-left.jpg'
import defaultCircleCenter from './assets/images/circle-facilitator.jpg'
import defaultCircleRight from './assets/images/circle-right.png'
import defaultJoinUsBadge from './assets/images/join-us-badge.png'
import {
  getVideoThumbnailUrl,
  getDeliveryVideoUrl,
  resolveArticleMedia
} from './utils/mediaUtils'

const DEFAULT_COMMITTEE_MEMBERS = [
  {
    id: 'manjulaa-kalyaan',
    name: 'Dr. Manjulaa Kalyaan',
    role: 'Founder & Director',
    roleCategory: 'Founder',
    designation: 'Founder Director, Swayamkrushi',
    credentials: 'Four-time National Award Winner · RCI Nominated Expert',
    badge: 'FOUNDER DIRECTOR',
    colorTheme: 'burgundy',
    image: '',
    bio: 'Visionary special educator who established Swayamkrushi in 1991. Starting with two girls in a rented flat, Dr. Kalyaan built South India’s premier model group homes, a five-acre permanent campus, and an affiliated B.Ed Special Education collegiate institution.',
    tags: ['Founded 1991', '4x National Awardee', 'Group Homes Pioneer', 'B.Ed Institution'],
    initials: 'MK',
    order: 1
  },
  {
    id: 'chenna-saratbabu',
    name: 'Dr. Chenna Saratbabu',
    role: 'Patron',
    roleCategory: 'Patron',
    designation: 'Advocate, Supreme Court BAR',
    credentials: 'President of Blind Cricket for Andhra Pradesh State Board',
    badge: 'PATRON',
    colorTheme: 'gold',
    image: '',
    bio: 'Eminent constitutional jurist and advocate at the Supreme Court Bar. Dr. Saratbabu is a dedicated champion of disability rights and sports inclusion, leading the Blind Cricket Association of Andhra Pradesh State Board and offering long-standing legal patronage to Swayamkrushi.',
    tags: ['Supreme Court BAR', 'President, AP Blind Cricket', 'Legal Patron'],
    initials: 'CS',
    order: 2
  },
  {
    id: 'ram-prasad-talluri',
    name: 'Mr. Ram Prasad Talluri',
    role: 'President',
    roleCategory: 'Presidency',
    designation: 'President, Managing Committee',
    credentials: 'Philanthropist & Institutional Leader',
    badge: 'PRESIDENT',
    colorTheme: 'indigo',
    image: '',
    bio: 'Providing strategic executive governance, corporate partnerships, and philanthropic support to advance Swayamkrushi’s campus expansion and rehabilitation programs.',
    tags: ['Executive Governance', 'Philanthropy', 'Institutional Growth'],
    initials: 'RT',
    order: 3
  },
  {
    id: 'jayaram-reddy',
    name: 'Mr. A. Jayaram Reddy',
    role: 'President',
    roleCategory: 'Presidency',
    designation: 'President, Managing Committee',
    credentials: 'Civic Leader & Institutional Administrator',
    badge: 'PRESIDENT',
    colorTheme: 'indigo',
    image: '',
    bio: 'Seasoned administrator steering organizational compliance, community relations, and sustainable infrastructure programs for the organization.',
    tags: ['Policy Governance', 'Infrastructure', 'Community Relations'],
    initials: 'JR',
    order: 4
  },
  {
    id: 'satyanarayana-murthy',
    name: 'Capt. Varanasi Satyanarayana Murthy',
    role: 'Vice President',
    roleCategory: 'Presidency',
    designation: 'Vice President, Managing Committee',
    credentials: 'Master Mariner & Veteran Administrator',
    badge: 'VICE PRESIDENT',
    colorTheme: 'burgundy',
    image: '',
    bio: 'Brings disciplined operational governance, administrative expertise, and crisis management leadership to Swayamkrushi’s residential welfare and daily campus routines.',
    tags: ['Master Mariner', 'Campus Operations', 'Welfare Management'],
    initials: 'VM',
    order: 5
  },
  {
    id: 'bhanoji-rao',
    name: 'Bhanoji Rao AVSM VSM (Retd)',
    role: 'Vice President',
    roleCategory: 'Presidency',
    designation: 'Vice President, Managing Committee',
    credentials: 'Ati Vishisht Seva Medal (AVSM) · Vishisht Seva Medal (VSM)',
    badge: 'VICE PRESIDENT',
    colorTheme: 'burgundy',
    image: '',
    bio: 'Decorated military commander and recipient of the prestigious presidential AVSM and VSM honors. Providing highest-standard ethical stewardship, national outreach, and institutional mentorship.',
    tags: ['AVSM & VSM Recipient', 'Military Veteran', 'Ethical Governance'],
    initials: 'BR',
    order: 6
  },
  {
    id: 't-suresh',
    name: 'Mr. T. Suresh',
    role: 'Secretary',
    roleCategory: 'Secretariat',
    designation: 'Secretary (Group Captain Retd)',
    credentials: 'Honorary Secretary · Defense & Aviation Veteran',
    badge: 'SECRETARY',
    colorTheme: 'indigo',
    image: '',
    bio: 'Distinguished defense veteran bringing organizational rigor, statutory governance, and operational precision to the Managing Committee secretariat.',
    tags: ['Group Captain Retd', 'Secretariat Admin', 'Statutory Compliance'],
    initials: 'TS',
    order: 7
  },
  {
    id: 'b-suresh-kumar',
    name: 'Mr. B. Suresh Kumar',
    role: 'Secretary',
    roleCategory: 'Secretariat',
    designation: 'Secretary (Advocate)',
    credentials: 'Honorary Secretary · Legal Counsel',
    badge: 'SECRETARY',
    colorTheme: 'indigo',
    image: '',
    bio: 'Practicing advocate managing legal compliance, statutory filings, society trust matters, and safeguarding the rights and legal protections of the trainees and residents.',
    tags: ['Advocate & Legal Counsel', 'Rights Advocacy', 'Regulatory Compliance'],
    initials: 'SK',
    order: 8
  },
  {
    id: 'malleswari-bandaru',
    name: 'Dr. Malleswari Bandaru',
    role: 'Executive Member',
    roleCategory: 'Executive',
    designation: 'Executive Committee Member',
    credentials: 'Academic & Healthcare Consultant',
    badge: 'EXECUTIVE MEMBER',
    colorTheme: 'slate',
    image: '',
    bio: 'Advising on therapeutic curriculum development, healthcare protocols, and medical rehabilitation for neurodivergent individuals and group home residents.',
    tags: ['Healthcare Protocol', 'Curriculum Design', 'Medical Advisory'],
    initials: 'MB',
    order: 9
  },
  {
    id: 's-jayram',
    name: 'Mr. S. Jayram',
    role: 'Executive Member',
    roleCategory: 'Executive',
    designation: 'Executive Committee Member',
    credentials: 'Community Outreach & Vocational Specialist',
    badge: 'EXECUTIVE MEMBER',
    colorTheme: 'slate',
    image: '',
    bio: 'Facilitates community engagement, family counseling networks, and vocational workshops to help young adults transition smoothly into workplace employment.',
    tags: ['Vocational Outreach', 'Family Support', 'Trainee Placement'],
    initials: 'SJ',
    order: 10
  },
  {
    id: 'k-jayalakshmi',
    name: 'Mrs. K. Jayalakshmi',
    role: 'Executive Member',
    roleCategory: 'Executive',
    designation: 'Executive Committee Member',
    credentials: 'Residential Welfare & Vocational Mentorship',
    badge: 'EXECUTIVE MEMBER',
    colorTheme: 'slate',
    image: '',
    bio: 'Champions daily quality of life in the group homes, arts-and-crafts training, and compassionate residential mentorship for residents with intellectual disabilities.',
    tags: ['Group Home Care', 'Vocational Crafts', 'Resident Welfare'],
    initials: 'KJ',
    order: 11
  }
]

const DEFAULT_MEDIA_ARTICLES = [
  {
    id: 'hindu-35-years-milestone',
    title: 'NGO Celebrates 35 Years of Serving Persons with Intellectual Disabilities',
    outlet: 'The Hindu',
    outletType: 'Print & Newspapers',
    date: 'August 2026',
    category: 'Newspaper Clipping',
    badge: 'THE HINDU SPOTLIGHT',
    image: '',
    isClipping: true,
    excerpt: 'Swayamkrushi, a Hyderabad-based non-profit organisation working for persons with intellectual disabilities, is celebrating 35 years of service with a focus on education, vocational training and independent living. Founder Manjula Kalyan was felicitated by dignitaries.',
    readTime: 'Newspaper Report',
    tags: ['The Hindu', '35th Anniversary', 'Founder Felicitation', 'Special Education'],
    articleUrl: 'https://share.google/YhznuCLOlokk6iVY6',
    featured: true,
    order: 1
  },
  {
    id: 'newsmeter-classrooms-to-careers',
    title: 'From Classrooms to Careers, Hyderabad’s Swayamkrushi Has Been Empowering Lives for Over 3 Decades',
    outlet: 'NewsMeter',
    outletType: 'Digital & Magazines',
    date: '2026',
    category: 'In-Depth Feature',
    badge: 'FEATURE STORY',
    image: '',
    isClipping: false,
    excerpt: 'A comprehensive investigation into how Swayamkrushi nurtures children with intellectual challenges into self-reliant adults equipped with job skills, emotional independence, and dignified careers across corporate and creative fields.',
    readTime: '5 min read',
    tags: ['NewsMeter', 'Career Transitions', 'Vocational Training', '3 Decades'],
    articleUrl: 'https://newsmeter.in/hyderabad/from-classrooms-to-careers-hyderabads-swayamkrushi-has-been-empowering-lives-for-over-3-decades-772608',
    featured: true,
    order: 2
  },
  {
    id: 'telangana-today-35-years',
    title: 'Swayamkrushi Marks 35 Years of Empowering Persons with Intellectual Disabilities',
    outlet: 'Telangana Today',
    outletType: 'Print & Newspapers',
    date: 'August 2026',
    category: 'E-Paper & Print',
    badge: 'TELANGANA TODAY',
    image: '',
    isClipping: false,
    excerpt: 'Telangana Today spotlights the 35th-anniversary celebration of Swayamkrushi, highlighting the school, women’s group homes, and university-affiliated B.Ed Special Education collegiate institution.',
    readTime: 'E-Paper Edition',
    tags: ['Telangana Today', '35 Years', 'Hyderabad District', 'Special Education'],
    articleUrl: 'https://epaper.telanganatoday.com/article/Hyderabad?OrgId=30830d8e731&imageview=1&standalone=1&device=mobile',
    shareUrl: 'https://share.google/hr29E4yqbsxGLYhfz',
    featured: true,
    order: 3
  },
  {
    id: 'sakshi-hyderabad-district',
    title: 'Sakshi Hyderabad District Edition: 35 ఏళ్ల స్వయంకృషి సేవా ప్రస్థానం',
    outlet: 'Sakshi Telugu Daily',
    outletType: 'Print & Newspapers',
    date: '09/08/2026',
    category: 'Regional Press',
    badge: 'SAKSHI E-PAPER',
    image: '',
    isClipping: false,
    excerpt: 'సాక్షి హైదరాబాద్ ఎడిషన్ కథనం: మూడున్నర దశాబ్దాలుగా మానసిక వికలాంగుల వికాసం, విద్యాబోధన, జీవనోపాధి కల్పిస్తున్న స్వయంకృషి సంస్థ సేవలు ఆదర్శనీయం.',
    readTime: 'Telugu E-Paper',
    tags: ['Sakshi Daily', 'Telugu E-Paper', 'District Edition', 'Residential Care'],
    articleUrl: 'https://epaper.sakshi.com/Hyderabad_District?eid=123&edate=09/08/2026&pgid=916473&device=desktop&view=3',
    shareUrl: 'https://share.google/eUEsCRt1PCmGTv3wc',
    featured: false,
    order: 4
  },
  {
    id: 'newsmeter-bharati-saini-art',
    title: 'Art Without Limits: Uttarakhand Artist Bharati Saini Turns Elbow Stumps into Tools for Painting',
    outlet: 'NewsMeter',
    outletType: 'Digital & Magazines',
    date: '2026',
    category: 'Fine Arts & Inclusion',
    badge: 'HUMAN IMPACT',
    image: '',
    isClipping: false,
    excerpt: 'An inspiring profile on artist Bharati Saini, who triumphed over adversity to produce breathtaking paintings, highlighting the boundless creative potential fostered within the Swayamkrushi family.',
    readTime: '4 min read',
    tags: ['Fine Arts', 'Inspiring Story', 'NewsMeter', 'Creative Vocational'],
    articleUrl: 'https://newsmeter.in/lifestyle/art-without-limits-uttarakhand-artist-bharati-saini-turns-elbow-stumps-into-tools-for-painting-774531',
    featured: false,
    order: 5
  },
  {
    id: 'telangana-today-digital-archive',
    title: 'Swayamkrushi Marks 35 Years Of Empowering Persons With Disabilities',
    outlet: 'Telangana Today Digital',
    outletType: 'Digital & Magazines',
    date: 'August 2026',
    category: 'Online Edition',
    badge: 'DIGITAL NEWS',
    image: '',
    isClipping: false,
    excerpt: 'Digital media report on the anniversary convention celebrating 35 years of inclusive education, parent support programs, vocational crafts, and independent living.',
    readTime: '3 min read',
    tags: ['Digital Press', 'Telangana Today', 'Milestone Celebration'],
    articleUrl: 'https://share.google/qjsO3mphDfJO4K8o3',
    featured: false,
    order: 6
  }
]

export default function App() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Active Tab
  const [activeTab, setActiveTab] = useState('dashboard') // dashboard, analytics, committee, mediabuzz, articles, accolades, certificates, faqs, inquiries, newsletter, settings

  // Toast notifications
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  // Dashboard Stats & Analytics
  const [stats, setStats] = useState({
    articles: 0,
    committee: 0,
    mediaBuzz: 0,
    accolades: 0,
    certificates: 0,
    faqs: 0,
    inquiries: 0,
    unreadInquiries: 0,
    subscribers: 0,
    uniqueVisitors: 0,
    todayUniqueVisitors: 0,
    totalViews: 0,
    campaigns: 0
  })
  const [analytics, setAnalytics] = useState({
    totalUniqueVisitors: 0,
    totalPageViews: 0,
    todayUniqueVisitors: 0,
    todayPageViews: 0,
    sevenDaysData: [],
    topPages: [],
    devices: [],
    recentVisits: []
  })

  // Data states
  const [articles, setArticles] = useState([])
  const [committeeMembers, setCommitteeMembers] = useState([])
  const [mediaBuzzItems, setMediaBuzzItems] = useState([])
  const [committeeCategoryFilter, setCommitteeCategoryFilter] = useState('all')
  const [mediaTypeFilter, setMediaTypeFilter] = useState('all')
  const [accolades, setAccolades] = useState({ featured: null, timeline: [] })
  const [certificates, setCertificates] = useState([])
  const [faqs, setFaqs] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [subscribers, setSubscribers] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [settings, setSettings] = useState({
    orgName: '',
    tagline: '',
    phone1: '',
    phone2: '',
    email: '',
    address: '',
    regNo: '',
    founderQuote: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    upiId: '',
    circleLeftImage: '',
    circleCenterImage: '',
    circleRightImage: '',
    joinUsBadgeImage: '',
    circleLeftPos: 'center 50%',
    circleCenterPos: 'center 50%',
    circleRightPos: 'center 52%'
  })

  // Committee Form & Modal state
  const [editingCommitteeMember, setEditingCommitteeMember] = useState(null)
  const [showCommitteeModal, setShowCommitteeModal] = useState(false)
  const [committeeForm, setCommitteeForm] = useState({
    id: '',
    name: '',
    role: 'Executive Member',
    roleCategory: 'Executive',
    designation: '',
    credentials: '',
    badge: 'EXECUTIVE MEMBER',
    colorTheme: 'burgundy',
    image: '',
    bio: '',
    tags: '',
    initials: '',
    order: 0
  })

  // Media Buzz Form & Modal state
  const [editingMediaBuzz, setEditingMediaBuzz] = useState(null)
  const [showMediaBuzzModal, setShowMediaBuzzModal] = useState(false)
  const [mediaBuzzForm, setMediaBuzzForm] = useState({
    id: '',
    title: '',
    outlet: '',
    outletType: 'Print & Newspapers',
    date: '',
    category: 'General Coverage',
    badge: 'MEDIA SPOTLIGHT',
    image: '',
    isClipping: false,
    excerpt: '',
    readTime: 'Read Report',
    tags: '',
    articleUrl: '',
    shareUrl: '',
    featured: false,
    order: 0
  })

  // Loading & Filter states
  const [loading, setLoading] = useState(false)
  const [articleSectionFilter, setArticleSectionFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [subscriberSearch, setSubscriberSearch] = useState('')

  // Newsletter selection & campaign composer state
  const [selectedSubscribers, setSelectedSubscribers] = useState([]) // array of email strings
  const [campaignForm, setCampaignForm] = useState({
    subject: '',
    category: 'Newsletter & Updates',
    contentHtml: ''
  })
  const [sendingCampaign, setSendingCampaign] = useState(false)

  // Modal / Form states
  const [editingArticle, setEditingArticle] = useState(null)
  const [articleForm, setArticleForm] = useState({
    id: '',
    title: '',
    excerpt: '',
    contentHtml: '',
    paragraphs: [''],
    category: 'Stories & Milestones',
    section: 'main',
    attribution: 'Swayamkrushi Archives',
    featuredMediaType: 'image',
    mediaType: 'image',
    imageUrl: '',
    videoUrl: '',
    videoThumbnailUrl: '',
    videoPosterUrl: '',
    imageAlt: '',
    hasThumbnail: true,
    featured: false,
    order: 0
  })

  const [editingAccolade, setEditingAccolade] = useState(null)
  const [accoladeForm, setAccoladeForm] = useState({
    id: '',
    year: '',
    title: '',
    presenter: '',
    presentedBy: '',
    badge: '',
    shortDesc: '',
    fullDesc: '',
    imageUrl: '',
    imageLabel: '',
    isFeatured: false,
    order: 0
  })

  const [certificateForm, setCertificateForm] = useState({
    title: '',
    caption: '',
    year: '',
    imageUrl: '',
    order: 0
  })

  const [editingFaq, setEditingFaq] = useState(null)
  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    category: 'General',
    order: 0
  })

  const [uploadingImage, setUploadingImage] = useState(false)
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [showAccoladeModal, setShowAccoladeModal] = useState(false)
  const [showCertModal, setShowCertModal] = useState(false)
  const [showFaqModal, setShowFaqModal] = useState(false)

  // Insiders Video Stories State
  const [insiders, setInsiders] = useState([])
  const [insiderCategoryFilter, setInsiderCategoryFilter] = useState('all')
  const [insiderSearch, setInsiderSearch] = useState('')
  const [showInsiderModal, setShowInsiderModal] = useState(false)
  const [editingInsider, setEditingInsider] = useState(null)
  const [insiderForm, setInsiderForm] = useState({
    id: '',
    name: '',
    role: '',
    category: 'Educators & Staff',
    tag: 'INSIDER STORY',
    orgBadge: 'SWAYAMKRUSHI',
    duration: '2:30',
    thumbnail: '',
    videoUrl: '',
    quote: '',
    description: '',
    order: 0,
    active: true
  })
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [previewingVideo, setPreviewingVideo] = useState(null)

  // Interactive Circle Cropper Modal State
  const [cropModal, setCropModal] = useState({
    isOpen: false,
    imageSrc: '',
    title: 'Crop Photo to Circle',
    subtitle: 'Drag image to pan, scroll or use slider to zoom into the exact circle area.',
    targetField: '',
    targetSetter: null
  })
  // Ref so async handlers always get the latest targetField / targetSetter without stale closure
  const cropModalRef = useRef({ targetField: '', targetSetter: null })

  // ─── DIRECT SPEAK & DIRECTOR'S VOICE DEDICATED PAGE STATE ────────────────
  const [directSpeakSelectedId, setDirectSpeakSelectedId] = useState('story-encounter')
  const [directSpeakViewMode, setDirectSpeakViewMode] = useState('split') // 'split' | 'editor' | 'preview'
  const [savingDirectSpeak, setSavingDirectSpeak] = useState(false)
  const [directSpeakForm, setDirectSpeakForm] = useState({
    id: 'story-encounter',
    title: 'Chance Encounter That Changed My Life',
    category: "Director's Voice",
    attribution: 'Ms Manjula Kalyan',
    excerpt: 'A chance encounter with Dr Maria Egg-Benes, a renowned special educator from Switzerland, at a workshop in Bengaluru, turned out to be the turning point in my life, and a defining moment which revealed the path I was to take to serve the less fortunate in society.',
    contentHtml: '',
    paragraphs: [],
    mediaType: 'image',
    imageUrl: '',
    videoUrl: '',
    imageAlt: 'Chance Encounter That Changed My Life',
    hasThumbnail: true,
    section: 'right',
    featured: false,
    order: 1
  })

  // Sync Direct Speak form whenever articles list changes or active Direct Speak item switches
  useEffect(() => {
    if (articles && articles.length > 0) {
      const match =
        articles.find((a) => (a.id || a._id) === directSpeakSelectedId) ||
        articles.find((a) => a.id === 'story-encounter') ||
        articles.find((a) => a.category?.toLowerCase().includes('director')) ||
        articles.find((a) => a.title?.toLowerCase().includes('chance encounter'))

      if (match) {
        setDirectSpeakForm({
          id: match.id || match._id || 'story-encounter',
          _id: match._id,
          title: match.title || '',
          category: match.category || "Director's Voice",
          attribution: match.attribution || 'Ms Manjula Kalyan',
          excerpt: match.excerpt || '',
          contentHtml: match.contentHtml || (match.paragraphs ? match.paragraphs.map((p) => `<p>${p}</p>`).join('') : ''),
          paragraphs: match.paragraphs || [],
          mediaType: match.mediaType || (match.videoUrl ? 'video' : 'image'),
          imageUrl: match.imageUrl || '',
          videoUrl: match.videoUrl || '',
          imageAlt: match.imageAlt || match.title || '',
          hasThumbnail: match.hasThumbnail !== false,
          section: match.section || 'right',
          featured: match.featured || false,
          order: match.order || 1
        })
      }
    }
  }, [articles, directSpeakSelectedId])


  const showNotification = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' })
    }, 4000)
  }

  // Check auth session
  useEffect(() => {
    const token = localStorage.getItem('swayamkrushi_admin_token')
    if (token) {
      setIsAuthenticated(true)
      loadInitialData()
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError('')
    try {
      const res = await adminLogin(passwordInput)
      if (res.success) {
        localStorage.setItem('swayamkrushi_admin_token', res.token)
        setIsAuthenticated(true)
        showNotification('Welcome to Swayamkrushi Admin & CMS Portal!')
        loadInitialData()
      }
    } catch (err) {
      setAuthError(err.message || 'Invalid passcode')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('swayamkrushi_admin_token')
    setIsAuthenticated(false)
    setPasswordInput('')
  }

  const loadInitialData = async () => {
    setLoading(true)
    try {
      const [
        statsData,
        analyticsData,
        settingsData,
        articlesData,
        accoladesData,
        faqsData,
        inqData,
        certsData,
        subsData,
        campData,
        insidersData,
        committeeData,
        mediaData
      ] = await Promise.all([
        fetchAdminStats(),
        fetchAnalyticsSummary(),
        fetchSettings(),
        fetchArticles(),
        fetchAccolades(),
        fetchFaqs(),
        fetchInquiries(),
        fetchCertificates(),
        fetchSubscribers(),
        fetchCampaigns(),
        fetchInsiders(),
        fetchCommitteeMembers(),
        fetchMediaBuzz()
      ])

      if (statsData) setStats(statsData)
      if (analyticsData) setAnalytics(analyticsData)
      if (settingsData) setSettings(settingsData)
      if (articlesData) setArticles(articlesData)
      if (accoladesData) {
        setAccolades({
          featured: accoladesData.featured,
          timeline: accoladesData.timeline || []
        })
      }
      if (certsData && certsData.length) {
        setCertificates(certsData)
      } else if (accoladesData?.certificates) {
        setCertificates(accoladesData.certificates)
      }
      if (faqsData) setFaqs(faqsData)
      if (inqData) setInquiries(inqData)
      if (subsData) {
        setSubscribers(subsData)
        // Default select all active subscribers
        setSelectedSubscribers(subsData.filter((s) => s.status === 'active').map((s) => s.email))
      }
      if (campData) setCampaigns(campData)
      if (insidersData) setInsiders(insidersData)

      if (committeeData && committeeData.length > 0) {
        setCommitteeMembers(committeeData)
      } else {
        const local = localStorage.getItem('swayamkrushi_committee_members')
        if (local) {
          try { setCommitteeMembers(JSON.parse(local)) } catch (e) { setCommitteeMembers(DEFAULT_COMMITTEE_MEMBERS) }
        } else {
          setCommitteeMembers(DEFAULT_COMMITTEE_MEMBERS)
        }
      }

      if (mediaData && mediaData.length > 0) {
        setMediaBuzzItems(mediaData)
      } else {
        const local = localStorage.getItem('swayamkrushi_media_buzz')
        if (local) {
          try { setMediaBuzzItems(JSON.parse(local)) } catch (e) { setMediaBuzzItems(DEFAULT_MEDIA_ARTICLES) }
        } else {
          setMediaBuzzItems(DEFAULT_MEDIA_ARTICLES)
        }
      }
    } catch (err) {
      console.error('Error loading data:', err)
      showNotification('Error loading initial data: ' + err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // ─── INSIDERS VIDEO STORIES ACTIONS ─────────────────────────────────────
  const openNewInsiderModal = () => {
    setEditingInsider(null)
    setInsiderForm({
      id: '',
      name: '',
      role: '',
      category: 'Educators & Staff',
      tag: 'INSIDER STORY',
      orgBadge: 'SWAYAMKRUSHI',
      duration: '2:30',
      thumbnail: '',
      videoUrl: '',
      quote: '',
      description: '',
      order: insiders.length + 1,
      active: true
    })
    setShowInsiderModal(true)
  }

  const openEditInsiderModal = (item) => {
    setEditingInsider(item)
    setInsiderForm({
      id: item.id || '',
      name: item.name || '',
      role: item.role || '',
      category: item.category || 'Educators & Staff',
      tag: item.tag || 'INSIDER STORY',
      orgBadge: item.orgBadge || 'SWAYAMKRUSHI',
      duration: item.duration || '2:30',
      thumbnail: item.thumbnail || '',
      videoUrl: item.videoUrl || '',
      quote: item.quote || '',
      description: item.description || '',
      order: item.order || 0,
      active: item.active !== false
    })
    setShowInsiderModal(true)
  }

  const handleSaveInsider = async (e) => {
    e.preventDefault()
    try {
      if (editingInsider) {
        await updateInsider(editingInsider.id, insiderForm)
        showNotification('Insider video updated successfully!')
      } else {
        await createInsider(insiderForm)
        showNotification('New insider video published!')
      }
      setShowInsiderModal(false)
      const refreshed = await fetchInsiders()
      if (refreshed) setInsiders(refreshed)
    } catch (err) {
      showNotification('Failed to save insider story: ' + err.message, 'error')
    }
  }

  const handleDeleteInsider = async (id, name) => {
    if (!window.confirm(`Delete insider video for "${name}"?`)) return
    try {
      await deleteInsider(id)
      showNotification('Insider video removed successfully')
      const refreshed = await fetchInsiders()
      if (refreshed) setInsiders(refreshed)
    } catch (err) {
      showNotification('Failed to delete insider story: ' + err.message, 'error')
    }
  }

  const handleToggleInsiderActive = async (item) => {
    try {
      const updated = !item.active
      await updateInsider(item.id, { active: updated })
      showNotification(`Video marked as ${updated ? 'Active' : 'Draft'}`)
      const refreshed = await fetchInsiders()
      if (refreshed) setInsiders(refreshed)
    } catch (err) {
      showNotification('Failed to toggle status: ' + err.message, 'error')
    }
  }

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingThumbnail(true)
    try {
      const url = await uploadMedia(file)
      setInsiderForm((prev) => ({ ...prev, thumbnail: url }))
      showNotification('Thumbnail image uploaded to Cloudinary!')
    } catch (err) {
      showNotification('Thumbnail upload failed: ' + err.message, 'error')
    } finally {
      setUploadingThumbnail(false)
    }
  }

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Auto-detect duration from video file
    try {
      const videoElem = document.createElement('video')
      videoElem.preload = 'metadata'
      videoElem.src = URL.createObjectURL(file)
      videoElem.onloadedmetadata = () => {
        window.URL.revokeObjectURL(videoElem.src)
        const sec = Math.round(videoElem.duration)
        if (!isNaN(sec) && sec > 0) {
          const mins = Math.floor(sec / 60)
          const remSecs = sec % 60
          const formattedDuration = `${mins}:${remSecs.toString().padStart(2, '0')}`
          setInsiderForm((prev) => ({ ...prev, duration: formattedDuration }))
        }
      }
    } catch (err) {
      console.warn('Could not auto-detect video duration:', err)
    }

    setUploadingVideo(true)
    try {
      const url = await uploadMedia(file)
      setInsiderForm((prev) => ({ ...prev, videoUrl: url }))
      showNotification('Video file uploaded to Cloudinary!')
    } catch (err) {
      showNotification('Video upload failed: ' + err.message, 'error')
    } finally {
      setUploadingVideo(false)
    }
  }

  // ─── CLOUDINARY IMAGE UPLOAD HELPER ──────────────────────────────────────
  const handleFileUpload = async (e, targetSetter, fieldName = 'imageUrl') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const uploadedUrl = await uploadImage(file)
      targetSetter((prev) => ({
        ...prev,
        [fieldName]: uploadedUrl
      }))
      showNotification('Image uploaded to Cloudinary successfully!')
    } catch (err) {
      showNotification('Image upload failed: ' + err.message, 'error')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleArticleVideoUpload = async (e, targetSetter, fieldName = 'videoUrl') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingVideo(true)
    try {
      const uploadedUrl = await uploadMedia(file)
      const autoThumb = getVideoThumbnailUrl(uploadedUrl) || ''
      targetSetter((prev) => ({
        ...prev,
        [fieldName]: uploadedUrl,
        videoThumbnailUrl: autoThumb,
        featuredMediaType: 'video',
        mediaType: 'video',
        hasThumbnail: true
      }))
      showNotification('Video uploaded & Cloudinary thumbnail generated successfully!')
    } catch (err) {
      showNotification('Video upload failed: ' + err.message, 'error')
    } finally {
      setUploadingVideo(false)
    }
  }

  // ─── INTERACTIVE CIRCULAR IMAGE CROP HANDLERS ────────────────────────────
  const handleOpenCropModal = (imageSrc, targetField, targetSetter, title, subtitle) => {
    if (!imageSrc) return
    // Keep ref in sync so async save handler always reads latest values
    cropModalRef.current = { targetField, targetSetter }
    setCropModal({
      isOpen: true,
      imageSrc,
      title: title || 'Crop Photo to Circle',
      subtitle: subtitle || 'Drag to reposition, use slider to zoom into the circular area.',
      targetField,
      targetSetter
    })
  }

  const handleFileSelectForCrop = (e, targetSetter, fieldName, title, subtitle) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      // Keep ref in sync
      cropModalRef.current = { targetField: fieldName, targetSetter }
      setCropModal({
        isOpen: true,
        imageSrc: reader.result,
        title: title || 'Crop New Photo to Circle',
        subtitle: subtitle || 'Drag to position and zoom inside the circular preview before saving.',
        targetField: fieldName,
        targetSetter
      })
    }
    reader.readAsDataURL(file)
    e.target.value = '' // Reset so user can pick same file again if desired
  }

  // Helper: strip MongoDB internal fields before sending to API
  const cleanSettingsPayload = (s) => {
    const { _id, __v, createdAt, updatedAt, key, ...clean } = s
    return clean
  }

  const handleSaveCroppedResult = async (croppedResult) => {
    const { file, blob, previewUrl } = croppedResult
    // Use ref — never the stale closure value from cropModal state
    const { targetField: fieldName, targetSetter } = cropModalRef.current

    if (!targetSetter || !fieldName) {
      console.warn('handleSaveCroppedResult: missing targetField or targetSetter')
      return
    }

    setUploadingImage(true)
    try {
      // Upload cropped PNG to Cloudinary via backend
      const uploadedUrl = await uploadImage(file || new File([blob], 'cropped.png', { type: 'image/png' }))

      // Update React state AND immediately persist the new URL to DB
      targetSetter((prevSettings) => {
        const nextSettings = { ...prevSettings, [fieldName]: uploadedUrl }
        // Persist to database right away so it survives page refresh
        updateSettings(cleanSettingsPayload(nextSettings))
          .then(() => console.log('Auto-saved circle image to DB'))
          .catch((e) => console.warn('Auto-save DB error:', e))
        return nextSettings
      })

      showNotification('✓ Circular crop saved & synced to main website!')
    } catch (uploadErr) {
      console.warn('Cloudinary upload failed, storing data URL:', uploadErr)
      // Fallback: store base64 data URL directly
      targetSetter((prevSettings) => {
        const nextSettings = { ...prevSettings, [fieldName]: previewUrl }
        updateSettings(cleanSettingsPayload(nextSettings))
          .then(() => console.log('Auto-saved circle image (data URL) to DB'))
          .catch((e) => console.warn('Auto-save DB error:', e))
        return nextSettings
      })
      showNotification('✓ Circular crop applied & synced to website!')
    } finally {
      setUploadingImage(false)
    }
  }

  // ─── ARTICLES ACTIONS ───────────────────────────────────────────────────
  const openNewArticleModal = () => {
    setEditingArticle(null)
    setArticleForm({
      id: '',
      title: '',
      excerpt: '',
      contentHtml: '',
      paragraphs: [''],
      category: 'Stories & Milestones',
      section: 'main',
      attribution: 'Swayamkrushi Archives',
      featuredMediaType: 'image',
      mediaType: 'image',
      imageUrl: '',
      videoUrl: '',
      videoThumbnailUrl: '',
      videoPosterUrl: '',
      imageAlt: '',
      hasThumbnail: true,
      featured: false,
      order: articles.length + 1
    })
    setShowArticleModal(true)
  }

  const openEditArticleModal = (art) => {
    setEditingArticle(art)
    let initialHtml = art.contentHtml || ''
    if (!initialHtml && art.paragraphs && art.paragraphs.length) {
      initialHtml = art.paragraphs.map((p) => `<p>${p}</p>`).join('')
    }

    const hasThumb = art.hasThumbnail !== undefined
      ? !!art.hasThumbnail
      : (art.showThumbnail !== undefined ? !!art.showThumbnail : true)

    const rawVideo = art.videoUrl || ''
    const generatedThumb = getVideoThumbnailUrl(rawVideo)
    const mediaTypeDetermined = art.featuredMediaType || art.mediaType || (rawVideo ? 'video' : 'image')

    setArticleForm({
      id: art.id,
      title: art.title || '',
      excerpt: art.excerpt || '',
      contentHtml: initialHtml,
      paragraphs: art.paragraphs && art.paragraphs.length ? art.paragraphs : [''],
      category: art.category || 'Stories & Milestones',
      section: art.section || 'main',
      attribution: art.attribution || 'Swayamkrushi Archives',
      featuredMediaType: mediaTypeDetermined,
      mediaType: mediaTypeDetermined,
      imageUrl: art.imageUrl || '',
      videoUrl: rawVideo,
      videoThumbnailUrl: art.videoThumbnailUrl || generatedThumb || '',
      videoPosterUrl: art.videoPosterUrl || '',
      imageAlt: art.imageAlt || '',
      hasThumbnail: hasThumb,
      featured: !!art.featured,
      order: art.order || 0
    })
    setShowArticleModal(true)
  }

  const handleSaveArticle = async (e) => {
    e.preventDefault()
    try {
      let finalParagraphs = []
      if (articleForm.contentHtml) {
        const div = document.createElement('div')
        div.innerHTML = articleForm.contentHtml
        const ps = Array.from(div.querySelectorAll('p, blockquote, h1, h2, h3, li'))
        if (ps.length > 0) {
          finalParagraphs = ps.map((el) => el.textContent.trim()).filter((t) => t.length > 0)
        }
      }

      if (finalParagraphs.length === 0 && articleForm.paragraphs) {
        finalParagraphs = articleForm.paragraphs.filter((p) => p.trim().length > 0)
      }

      const isTextType = articleForm.hasThumbnail === false || articleForm.featuredMediaType === 'text' || articleForm.mediaType === 'text'
      const isVideoType = !isTextType && (articleForm.featuredMediaType === 'video' || articleForm.mediaType === 'video') && Boolean(articleForm.videoUrl && articleForm.videoUrl.trim().length > 5)

      const finalMediaType = isTextType ? 'text' : (isVideoType ? 'video' : 'image')
      const finalHasThumb = !isTextType

      const rawVideo = isVideoType ? articleForm.videoUrl.trim() : ''
      const generatedThumb = getVideoThumbnailUrl(rawVideo)
      const customPoster = isVideoType && articleForm.videoPosterUrl && articleForm.videoPosterUrl.trim().length > 5 ? articleForm.videoPosterUrl.trim() : ''
      const finalThumbnailUrl = isVideoType ? (articleForm.videoThumbnailUrl?.trim() || generatedThumb || '') : ''

      const cleanedPayload = {
        ...articleForm,
        featuredMediaType: finalMediaType,
        mediaType: finalMediaType,
        videoUrl: rawVideo,
        videoThumbnailUrl: finalThumbnailUrl,
        videoPosterUrl: customPoster,
        hasThumbnail: finalHasThumb,
        showThumbnail: finalHasThumb,
        imageUrl: finalMediaType === 'image' ? (articleForm.imageUrl?.trim() || '') : (customPoster || finalThumbnailUrl || articleForm.imageUrl || ''),
        paragraphs: finalParagraphs.length > 0 ? finalParagraphs : [articleForm.excerpt]
      }

      if (editingArticle) {
        await updateArticle(editingArticle.id || editingArticle._id, cleanedPayload)
        showNotification('Article updated successfully!')
      } else {
        await createArticle(cleanedPayload)
        showNotification('New article published successfully!')
      }
      setShowArticleModal(false)
      const refreshed = await fetchArticles()
      if (refreshed) setArticles(refreshed)
      const st = await fetchAdminStats()
      if (st) setStats(st)
    } catch (err) {
      showNotification('Failed to save article: ' + err.message, 'error')
    }
  }

  const handleDeleteArticle = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete article "${title}"?`)) return
    try {
      await deleteArticle(id)
      showNotification('Article deleted successfully')
      setArticles((prev) => prev.filter((a) => a.id !== id && a._id !== id))
      const st = await fetchAdminStats()
      if (st) setStats(st)
    } catch (err) {
      showNotification('Failed to delete article: ' + err.message, 'error')
    }
  }

  // ─── DIRECT SPEAK DEDICATED ACTIONS ──────────────────────────────────────
  const handleSaveDirectSpeak = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setSavingDirectSpeak(true)
    try {
      let finalParagraphs = []
      if (directSpeakForm.contentHtml) {
        const div = document.createElement('div')
        div.innerHTML = directSpeakForm.contentHtml
        const ps = Array.from(div.querySelectorAll('p, blockquote, h1, h2, h3, li'))
        if (ps.length > 0) {
          finalParagraphs = ps.map((el) => el.textContent.trim()).filter((t) => t.length > 0)
        }
      }

      if (finalParagraphs.length === 0 && directSpeakForm.paragraphs) {
        finalParagraphs = directSpeakForm.paragraphs.filter((p) => p.trim().length > 0)
      }

      const isThumb = directSpeakForm.hasThumbnail !== false && directSpeakForm.hasThumbnail !== 'false'
      const isVideoType = directSpeakForm.mediaType === 'video' && Boolean(directSpeakForm.videoUrl && directSpeakForm.videoUrl.trim().length > 5)

      const cleanedPayload = {
        ...directSpeakForm,
        mediaType: isVideoType ? 'video' : 'image',
        videoUrl: isVideoType ? directSpeakForm.videoUrl.trim() : '',
        hasThumbnail: isThumb,
        showThumbnail: isThumb,
        imageUrl: isThumb ? (directSpeakForm.imageUrl || '') : '',
        paragraphs: finalParagraphs.length > 0 ? finalParagraphs : [directSpeakForm.excerpt]
      }

      const targetId = directSpeakForm.id || directSpeakForm._id || 'story-encounter'
      const existing = articles.find((a) => a.id === targetId || a._id === targetId)

      if (existing) {
        await updateArticle(existing.id || existing._id, cleanedPayload)
      } else {
        await createArticle(cleanedPayload)
      }

      showNotification("✨ Director's Voice / Direct Speak page updated & published successfully!")
      const refreshed = await fetchArticles()
      if (refreshed) setArticles(refreshed)
      const st = await fetchAdminStats()
      if (st) setStats(st)
    } catch (err) {
      showNotification("Failed to save Director's Voice: " + err.message, 'error')
    } finally {
      setSavingDirectSpeak(false)
    }
  }

  const handleSelectDirectSpeakArticle = (art) => {
    setDirectSpeakSelectedId(art.id || art._id)
    let initialHtml = art.contentHtml || ''
    if (!initialHtml && art.paragraphs && art.paragraphs.length) {
      initialHtml = art.paragraphs.map((p) => `<p>${p}</p>`).join('')
    }
    const hasThumb = art.hasThumbnail !== undefined
      ? !!art.hasThumbnail
      : (art.showThumbnail !== undefined ? !!art.showThumbnail : true)

    setDirectSpeakForm({
      id: art.id || art._id,
      _id: art._id,
      title: art.title || '',
      category: art.category || "Director's Voice",
      attribution: art.attribution || 'Ms Manjula Kalyan',
      excerpt: art.excerpt || '',
      contentHtml: initialHtml,
      paragraphs: art.paragraphs && art.paragraphs.length ? art.paragraphs : [''],
      mediaType: art.mediaType || (art.videoUrl ? 'video' : 'image'),
      imageUrl: art.imageUrl || '',
      videoUrl: art.videoUrl || '',
      imageAlt: art.imageAlt || art.title || '',
      hasThumbnail: hasThumb,
      section: art.section || 'right',
      featured: !!art.featured,
      order: art.order || 1
    })
  }

  const handleCreateNewDirectSpeakPost = () => {
    const newId = 'story-direct-speak-' + Date.now().toString(36)
    setDirectSpeakSelectedId(newId)
    setDirectSpeakForm({
      id: newId,
      title: 'Direct Speak: New Column Entry',
      category: "Director's Voice",
      attribution: 'Ms Manjula Kalyan, Founder & Director',
      excerpt: "Enter a short summary or reflection of this Director's Voice piece here...",
      contentHtml: '<h2>Direct Speak</h2><p>Write your direct reflection here...</p>',
      paragraphs: ['Write your direct reflection here...'],
      mediaType: 'image',
      imageUrl: '',
      videoUrl: '',
      imageAlt: "Director's Voice",
      hasThumbnail: true,
      section: 'right',
      featured: false,
      order: 1
    })
  }

  // ─── SUBSCRIBERS & NEWSLETTER CAMPAIGN ACTIONS ───────────────────────────
  const handleToggleSubscriber = (email) => {
    setSelectedSubscribers((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    )
  }

  const handleSelectAllSubscribers = () => {
    const activeEmails = filteredSubscribers.filter((s) => s.status === 'active').map((s) => s.email)
    if (selectedSubscribers.length === activeEmails.length) {
      setSelectedSubscribers([])
    } else {
      setSelectedSubscribers(activeEmails)
    }
  }

  const handleSendCampaign = async (e) => {
    e.preventDefault()
    if (!campaignForm.subject.trim()) {
      showNotification('Please enter an email subject line', 'error')
      return
    }
    if (!campaignForm.contentHtml.trim()) {
      showNotification('Please enter email body content', 'error')
      return
    }
    if (selectedSubscribers.length === 0) {
      showNotification('Please select at least 1 subscriber to receive the broadcast', 'error')
      return
    }

    if (!window.confirm(`Send broadcast email to ${selectedSubscribers.length} recipient(s)?`)) return

    setSendingCampaign(true)
    try {
      const res = await sendNewsletterCampaign({
        subject: campaignForm.subject,
        category: campaignForm.category,
        contentHtml: campaignForm.contentHtml,
        selectedEmails: selectedSubscribers
      })
      showNotification(res.message || 'Campaign sent successfully!')
      setCampaignForm({ subject: '', category: 'Newsletter & Updates', contentHtml: '' })
      const [campData, st] = await Promise.all([fetchCampaigns(), fetchAdminStats()])
      if (campData) setCampaigns(campData)
      if (st) setStats(st)
    } catch (err) {
      showNotification('Failed to send broadcast: ' + err.message, 'error')
    } finally {
      setSendingCampaign(false)
    }
  }

  const handleDeleteSubscriber = async (id, email) => {
    if (!window.confirm(`Remove subscriber ${email}?`)) return
    try {
      await deleteSubscriber(id)
      setSubscribers((prev) => prev.filter((s) => s._id !== id))
      setSelectedSubscribers((prev) => prev.filter((e) => e !== email))
      showNotification('Subscriber removed')
      const st = await fetchAdminStats()
      if (st) setStats(st)
    } catch (err) {
      showNotification('Failed to delete subscriber: ' + err.message, 'error')
    }
  }

  const handleToggleSubStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'active' ? 'unsubscribed' : 'active'
    try {
      await updateSubscriberStatus(id, nextStatus)
      setSubscribers((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: nextStatus } : s))
      )
      showNotification(`Subscriber marked as ${nextStatus}`)
    } catch (err) {
      showNotification('Failed to update status: ' + err.message, 'error')
    }
  }

  // ─── ACCOLADES ACTIONS ──────────────────────────────────────────────────
  const openNewAccoladeModal = () => {
    setEditingAccolade(null)
    setAccoladeForm({
      id: '',
      year: new Date().getFullYear().toString(),
      title: '',
      presenter: '',
      presentedBy: '',
      badge: '',
      shortDesc: '',
      fullDesc: '',
      imageUrl: '',
      imageLabel: '',
      isFeatured: false,
      order: accolades.timeline.length + 1
    })
    setShowAccoladeModal(true)
  }

  const openEditAccoladeModal = (acc) => {
    setEditingAccolade(acc)
    setAccoladeForm({
      id: acc.id,
      year: acc.year || '',
      title: acc.title || '',
      presenter: acc.presenter || '',
      presentedBy: acc.presentedBy || '',
      badge: acc.badge || '',
      shortDesc: acc.shortDesc || '',
      fullDesc: acc.fullDesc || '',
      imageUrl: acc.imageUrl || '',
      imageLabel: acc.imageLabel || '',
      isFeatured: !!acc.isFeatured,
      order: acc.order || 0
    })
    setShowAccoladeModal(true)
  }

  const handleSaveAccolade = async (e) => {
    e.preventDefault()
    try {
      if (editingAccolade) {
        await updateAccolade(editingAccolade.id, accoladeForm)
        showNotification('Accolade updated successfully!')
      } else {
        await createAccolade(accoladeForm)
        showNotification('Accolade added successfully!')
      }
      setShowAccoladeModal(false)
      const refreshed = await fetchAccolades()
      if (refreshed) {
        setAccolades({
          featured: refreshed.featured,
          timeline: refreshed.timeline || []
        })
      }
    } catch (err) {
      showNotification('Failed to save accolade: ' + err.message, 'error')
    }
  }

  const handleDeleteAccolade = async (id, title) => {
    if (!window.confirm(`Delete recognition milestone "${title}"?`)) return
    try {
      await deleteAccolade(id)
      showNotification('Accolade deleted successfully')
      const refreshed = await fetchAccolades()
      if (refreshed) {
        setAccolades({
          featured: refreshed.featured,
          timeline: refreshed.timeline || []
        })
      }
    } catch (err) {
      showNotification('Failed to delete accolade: ' + err.message, 'error')
    }
  }

  // ─── CERTIFICATES ACTIONS ───────────────────────────────────────────────
  const handleSaveCertificate = async (e) => {
    e.preventDefault()
    try {
      await createCertificate(certificateForm)
      showNotification('Certificate uploaded and added successfully!')
      setShowCertModal(false)
      setCertificateForm({ title: '', caption: '', year: '', imageUrl: '', order: 0 })
      const certs = await fetchCertificates()
      setCertificates(certs)
    } catch (err) {
      showNotification('Failed to add certificate: ' + err.message, 'error')
    }
  }

  const handleDeleteCert = async (id, title) => {
    if (!window.confirm(`Delete certificate "${title}"?`)) return
    try {
      await deleteCertificate(id)
      showNotification('Certificate deleted')
      setCertificates((prev) => prev.filter((c) => c._id !== id && c.id !== id))
    } catch (err) {
      showNotification('Failed to delete certificate: ' + err.message, 'error')
    }
  }

  // ─── FAQ ACTIONS ────────────────────────────────────────────────────────
  const openNewFaqModal = () => {
    setEditingFaq(null)
    setFaqForm({ question: '', answer: '', category: 'General', order: faqs.length + 1 })
    setShowFaqModal(true)
  }

  const openEditFaqModal = (faq) => {
    setEditingFaq(faq)
    setFaqForm({
      question: faq.question || '',
      answer: faq.answer || '',
      category: faq.category || 'General',
      order: faq.order || 0
    })
    setShowFaqModal(true)
  }

  const handleSaveFaq = async (e) => {
    e.preventDefault()
    try {
      if (editingFaq) {
        await updateFaq(editingFaq._id, faqForm)
        showNotification('FAQ updated successfully!')
      } else {
        await createFaq(faqForm)
        showNotification('New FAQ added!')
      }
      setShowFaqModal(false)
      const refreshed = await fetchFaqs()
      if (refreshed) setFaqs(refreshed)
    } catch (err) {
      showNotification('Failed to save FAQ: ' + err.message, 'error')
    }
  }

  const handleDeleteFaq = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return
    try {
      await deleteFaq(id)
      showNotification('FAQ deleted successfully')
      setFaqs((prev) => prev.filter((f) => f._id !== id))
    } catch (err) {
      showNotification('Failed to delete FAQ: ' + err.message, 'error')
    }
  }

  // ─── INQUIRIES ACTIONS ──────────────────────────────────────────────────
  const handleToggleInquiryStatus = async (id, currentStatus) => {
    try {
      const nextStatus = currentStatus === 'read' ? 'pending' : 'read'
      await updateInquiryStatus(id, nextStatus)
      setInquiries((prev) =>
        prev.map((inq) => (inq._id === id ? { ...inq, status: nextStatus } : inq))
      )
      showNotification(`Marked inquiry as ${nextStatus}`)
      const st = await fetchAdminStats()
      if (st) setStats(st)
    } catch (err) {
      showNotification('Failed to update status: ' + err.message, 'error')
    }
  }

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry message?')) return
    try {
      await deleteInquiry(id)
      setInquiries((prev) => prev.filter((inq) => inq._id !== id))
      showNotification('Inquiry deleted')
      const st = await fetchAdminStats()
      if (st) setStats(st)
    } catch (err) {
      showNotification('Failed to delete inquiry: ' + err.message, 'error')
    }
  }

  // ─── CMS SETTINGS ACTIONS ────────────────────────────────────────────────
  const handleSaveSettings = async (e) => {
    e.preventDefault()
    try {
      // Strip MongoDB internals (_id, __v, createdAt, updatedAt, key) before sending
      const payload = cleanSettingsPayload(settings)
      const updated = await updateSettings(payload)
      // Merge DB response back into state (preserving any in-memory-only fields)
      setSettings((prev) => ({ ...prev, ...updated }))
      showNotification('✓ All settings saved successfully!')
    } catch (err) {
      showNotification('Failed to save settings: ' + err.message, 'error')
    }
  }


  // ─── MANAGING COMMITTEE ACTIONS ─────────────────────────────────────────
  const openNewCommitteeModal = () => {
    setEditingCommitteeMember(null)
    setCommitteeForm({
      id: '',
      name: '',
      role: 'Executive Member',
      roleCategory: 'Executive',
      designation: '',
      credentials: '',
      badge: 'EXECUTIVE MEMBER',
      colorTheme: 'burgundy',
      image: '',
      bio: '',
      tags: '',
      initials: '',
      order: committeeMembers.length + 1
    })
    setShowCommitteeModal(true)
  }

  const openEditCommitteeModal = (member) => {
    setEditingCommitteeMember(member)
    setCommitteeForm({
      id: member.id || member._id || '',
      name: member.name || '',
      role: member.role || 'Executive Member',
      roleCategory: member.roleCategory || 'Executive',
      designation: member.designation || '',
      credentials: member.credentials || '',
      badge: member.badge || 'EXECUTIVE MEMBER',
      colorTheme: member.colorTheme || 'burgundy',
      image: member.image || '',
      bio: member.bio || '',
      tags: Array.isArray(member.tags) ? member.tags.join(', ') : (member.tags || ''),
      initials: member.initials || '',
      order: member.order || 0
    })
    setShowCommitteeModal(true)
  }

  const handleSaveCommittee = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...committeeForm,
        tags: typeof committeeForm.tags === 'string'
          ? committeeForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : committeeForm.tags,
        initials: committeeForm.initials || (committeeForm.name ? committeeForm.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() : '')
      }

      if (editingCommitteeMember) {
        const id = editingCommitteeMember.id || editingCommitteeMember._id
        await updateCommitteeMember(id, payload)
        showNotification('Managing Committee member updated successfully!')
      } else {
        await createCommitteeMember(payload)
        showNotification('New Managing Committee member added!')
      }
      setShowCommitteeModal(false)
      const refreshed = await fetchCommitteeMembers()
      if (refreshed && refreshed.length > 0) {
        setCommitteeMembers(refreshed)
      } else {
        if (editingCommitteeMember) {
          setCommitteeMembers((prev) => prev.map((m) => (m.id === editingCommitteeMember.id || m._id === editingCommitteeMember._id) ? { ...m, ...payload } : m))
        } else {
          setCommitteeMembers((prev) => [...prev, { ...payload, id: payload.id || 'mem-' + Date.now() }])
        }
      }
    } catch (err) {
      showNotification('Failed to save committee member: ' + err.message, 'error')
    }
  }

  const handleDeleteCommittee = async (id, name) => {
    if (!window.confirm(`Remove "${name}" from the Managing Committee?`)) return
    try {
      await deleteCommitteeMember(id)
      showNotification('Committee member deleted successfully')
      const refreshed = await fetchCommitteeMembers()
      if (refreshed && refreshed.length > 0) {
        setCommitteeMembers(refreshed)
      } else {
        setCommitteeMembers((prev) => prev.filter((m) => m.id !== id && m._id !== id))
      }
    } catch (err) {
      showNotification('Failed to delete committee member: ' + err.message, 'error')
    }
  }

  // ─── MEDIA BUZZ & PRESS ACTIONS ──────────────────────────────────────────
  const openNewMediaBuzzModal = () => {
    setEditingMediaBuzz(null)
    setMediaBuzzForm({
      id: '',
      title: '',
      outlet: '',
      outletType: 'Print & Newspapers',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      category: 'General Coverage',
      badge: 'MEDIA SPOTLIGHT',
      image: '',
      isClipping: false,
      excerpt: '',
      readTime: '3 min read',
      tags: '',
      articleUrl: '',
      shareUrl: '',
      featured: false,
      order: mediaBuzzItems.length + 1
    })
    setShowMediaBuzzModal(true)
  }

  const openEditMediaBuzzModal = (item) => {
    setEditingMediaBuzz(item)
    setMediaBuzzForm({
      id: item.id || item._id || '',
      title: item.title || '',
      outlet: item.outlet || '',
      outletType: item.outletType || 'Print & Newspapers',
      date: item.date || '',
      category: item.category || 'General Coverage',
      badge: item.badge || 'MEDIA SPOTLIGHT',
      image: item.image || '',
      isClipping: !!item.isClipping,
      excerpt: item.excerpt || '',
      readTime: item.readTime || '3 min read',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : (item.tags || ''),
      articleUrl: item.articleUrl || '',
      shareUrl: item.shareUrl || '',
      featured: !!item.featured,
      order: item.order || 0
    })
    setShowMediaBuzzModal(true)
  }

  const handleSaveMediaBuzz = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...mediaBuzzForm,
        tags: typeof mediaBuzzForm.tags === 'string'
          ? mediaBuzzForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : mediaBuzzForm.tags
      }

      if (editingMediaBuzz) {
        const id = editingMediaBuzz.id || editingMediaBuzz._id
        await updateMediaBuzz(id, payload)
        showNotification('Media press article updated successfully!')
      } else {
        await createMediaBuzz(payload)
        showNotification('New media press article published!')
      }
      setShowMediaBuzzModal(false)
      const refreshed = await fetchMediaBuzz()
      if (refreshed && refreshed.length > 0) {
        setMediaBuzzItems(refreshed)
      } else {
        if (editingMediaBuzz) {
          setMediaBuzzItems((prev) => prev.map((m) => (m.id === editingMediaBuzz.id || m._id === editingMediaBuzz._id) ? { ...m, ...payload } : m))
        } else {
          setMediaBuzzItems((prev) => [...prev, { ...payload, id: payload.id || 'buzz-' + Date.now() }])
        }
      }
    } catch (err) {
      showNotification('Failed to save media buzz: ' + err.message, 'error')
    }
  }

  const handleDeleteMediaBuzz = async (id, title) => {
    if (!window.confirm(`Delete media press article "${title}"?`)) return
    try {
      await deleteMediaBuzz(id)
      showNotification('Media press article deleted successfully')
      const refreshed = await fetchMediaBuzz()
      if (refreshed && refreshed.length > 0) {
        setMediaBuzzItems(refreshed)
      } else {
        setMediaBuzzItems((prev) => prev.filter((m) => m.id !== id && m._id !== id))
      }
    } catch (err) {
      showNotification('Failed to delete media buzz: ' + err.message, 'error')
    }
  }

  const handleToggleFeaturedBuzz = async (item) => {
    try {
      const updated = !item.featured
      const id = item.id || item._id
      await updateMediaBuzz(id, { featured: updated })
      showNotification(`Article ${updated ? 'pinned to Featured Spotlights' : 'unpinned from Spotlight'}`)
      const refreshed = await fetchMediaBuzz()
      if (refreshed && refreshed.length > 0) {
        setMediaBuzzItems(refreshed)
      } else {
        setMediaBuzzItems((prev) => prev.map((m) => (m.id === id || m._id === id) ? { ...m, featured: updated } : m))
      }
    } catch (err) {
      showNotification('Failed to toggle spotlight: ' + err.message, 'error')
    }
  }

  // Filtered lists
  const filteredArticles = articles.filter((art) => {
    const matchesSection = articleSectionFilter === 'all' || art.section === articleSectionFilter
    const matchesSearch =
      !searchQuery ||
      art.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSection && matchesSearch
  })

  const filteredCommitteeMembers = committeeMembers.filter((mem) => {
    const matchesCategory = committeeCategoryFilter === 'all' || mem.roleCategory === committeeCategoryFilter
    const matchesSearch =
      !searchQuery ||
      mem.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.designation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.credentials?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.bio?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const filteredMediaBuzz = mediaBuzzItems.filter((item) => {
    const matchesType = mediaTypeFilter === 'all' || item.outletType === mediaTypeFilter
    const matchesSearch =
      !searchQuery ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.outlet?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const filteredSubscribers = subscribers.filter((sub) => {
    return (
      !subscriberSearch ||
      sub.email?.toLowerCase().includes(subscriberSearch.toLowerCase()) ||
      sub.name?.toLowerCase().includes(subscriberSearch.toLowerCase())
    )
  })

  const directSpeakStories = articles.filter(
    (a) =>
      a.id === 'story-encounter' ||
      a.id === 'story-direct-speak' ||
      a.category?.toLowerCase().includes('director') ||
      a.title?.toLowerCase().includes('chance encounter') ||
      a.title?.toLowerCase().includes('direct speak')
  )

  // ─── LOGIN SCREEN ────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <main className="admin-login-wrapper" role="main" aria-label="Admin Login">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <span className="admin-stamp">MANAGEMENT PORTAL</span>
            <h1 className="admin-login-title">Swayamkrushi CMS</h1>
            <p className="admin-login-subtitle">
              Publish articles, manage IP visitor analytics, broadcast email newsletters & edit website settings.
            </p>
          </div>

          {authError && <div className="admin-alert admin-alert-error">{authError}</div>}

          <form onSubmit={handleLogin}>
            <div className="admin-form-group">
              <label htmlFor="adminPass">Admin Passcode</label>
              <input
                id="adminPass"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter passcode (default: swayamkrushi2026)"
                required
                className="admin-input"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="admin-btn admin-btn-primary admin-btn-block admin-btn-lg"
            >
              {authLoading ? 'Verifying Credentials...' : 'Unlock CMS Console'}
            </button>
          </form>

          <div className="admin-login-footer">
            <a href="http://localhost:5173" className="admin-back-link" target="_blank" rel="noreferrer">
              <Globe size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
              Open Public Website (Port 5173) ↗
            </a>
          </div>
        </div>
      </main>
    )
  }

  // ─── AUTHENTICATED DASHBOARD ─────────────────────────────────────────────
  return (
    <div className="admin-app">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          <CheckCircle2 size={16} />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Admin Masthead Bar */}
      <header className="admin-topbar">
        <div className="admin-topbar-brand">
          <ShieldCheck size={20} color="#2a9d8f" />
          <h2>SWAYAMKRUSHI MANAGEMENT CONSOLE</h2>
        </div>
        <div className="admin-topbar-actions">
          <a href="http://localhost:5173" className="admin-btn admin-btn-outline" target="_blank" rel="noreferrer">
            <ExternalLink size={14} />
            <span>View Public Site</span>
          </a>
          <button onClick={handleLogout} className="admin-btn admin-btn-danger-outline">
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="admin-body">
        {/* Navigation Sidebar */}
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <button
              className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={18} className="admin-nav-icon" />
              <span>Dashboard</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <BarChart3 size={18} className="admin-nav-icon" />
              <span>IP Visitors & Traffic</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'newsletter' ? 'active' : ''}`}
              onClick={() => setActiveTab('newsletter')}
            >
              <SendHorizontal size={18} className="admin-nav-icon" />
              <span>Newsletter & Emails ({subscribers.length})</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'committee' ? 'active' : ''}`}
              onClick={() => setActiveTab('committee')}
            >
              <Users2 size={18} className="admin-nav-icon" />
              <span>Managing Committee ({committeeMembers.length})</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'mediabuzz' ? 'active' : ''}`}
              onClick={() => setActiveTab('mediabuzz')}
            >
              <Newspaper size={18} className="admin-nav-icon" />
              <span>Media Buzz & Press ({mediaBuzzItems.length})</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'articles' ? 'active' : ''}`}
              onClick={() => setActiveTab('articles')}
            >
              <FileText size={18} className="admin-nav-icon" />
              <span>Articles & Blog ({articles.length})</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'directSpeak' ? 'active' : ''}`}
              onClick={() => setActiveTab('directSpeak')}
            >
              <Mic size={18} className="admin-nav-icon" />
              <span>Direct Speak (Director's Voice)</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'insiders' ? 'active' : ''}`}
              onClick={() => setActiveTab('insiders')}
            >
              <Video size={18} className="admin-nav-icon" />
              <span>Insiders Videos ({insiders.length})</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'accolades' ? 'active' : ''}`}
              onClick={() => setActiveTab('accolades')}
            >
              <Award size={18} className="admin-nav-icon" />
              <span>Accolades ({accolades.timeline.length + (accolades.featured ? 1 : 0)})</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'certificates' ? 'active' : ''}`}
              onClick={() => setActiveTab('certificates')}
            >
              <FileImage size={18} className="admin-nav-icon" />
              <span>Certificates & Media ({certificates.length})</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'faqs' ? 'active' : ''}`}
              onClick={() => setActiveTab('faqs')}
            >
              <HelpCircle size={18} className="admin-nav-icon" />
              <span>FAQs Manager ({faqs.length})</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'inquiries' ? 'active' : ''}`}
              onClick={() => setActiveTab('inquiries')}
            >
              <Mail size={18} className="admin-nav-icon" />
              <span>Contact Messages ({inquiries.length})</span>
              {stats.unreadInquiries > 0 && (
                <span className="admin-counter-pill">{stats.unreadInquiries}</span>
              )}
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} className="admin-nav-icon" />
              <span>Website Settings CMS</span>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="admin-content-area">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="admin-tab-content">
              <div className="admin-content-header">
                <div>
                  <h1 className="admin-section-title">Overview & Live Analytics</h1>
                  <p className="admin-section-desc">
                    Tracking unique IP visitors, managing committee, media buzz, newsletters, published stories & messages.
                  </p>
                </div>
                <button onClick={loadInitialData} className="admin-btn admin-btn-secondary">
                  <RefreshCw size={14} />
                  <span>Refresh Data</span>
                </button>
              </div>

              {/* Stats Grid */}
              <div className="admin-stats-grid">
                {/* 1. Unique IP Visitors */}
                <div className="admin-stat-card" onClick={() => setActiveTab('analytics')}>
                  <div className="admin-stat-icon-wrap" style={{ background: '#e0f2fe' }}>
                    <Users size={22} color="#0284c7" />
                  </div>
                  <div className="admin-stat-info">
                    <span className="admin-stat-count">{analytics.totalUniqueVisitors || stats.uniqueVisitors}</span>
                    <span className="admin-stat-label">Unique IP Visitors</span>
                  </div>
                  <span className="admin-stat-action">
                    Today: {analytics.todayUniqueVisitors || stats.todayUniqueVisitors} unique IPs <ChevronRight size={13} style={{ display: 'inline' }} />
                  </span>
                </div>

                {/* 2. Newsletter Subscribers */}
                <div className="admin-stat-card" onClick={() => setActiveTab('newsletter')}>
                  <div className="admin-stat-icon-wrap" style={{ background: '#ecfdf5' }}>
                    <SendHorizontal size={22} color="#059669" />
                  </div>
                  <div className="admin-stat-info">
                    <span className="admin-stat-count">{subscribers.length}</span>
                    <span className="admin-stat-label">Newsletter Subscribers</span>
                  </div>
                  <span className="admin-stat-action">
                    Send Email Broadcast <ChevronRight size={13} style={{ display: 'inline' }} />
                  </span>
                </div>

                {/* 2b. Managing Committee */}
                <div className="admin-stat-card" onClick={() => setActiveTab('committee')}>
                  <div className="admin-stat-icon-wrap" style={{ background: '#ede9fe' }}>
                    <Users2 size={22} color="#7c3aed" />
                  </div>
                  <div className="admin-stat-info">
                    <span className="admin-stat-count">{committeeMembers.length}</span>
                    <span className="admin-stat-label">Managing Committee</span>
                  </div>
                  <span className="admin-stat-action">
                    Manage Board & Patrons <ChevronRight size={13} style={{ display: 'inline' }} />
                  </span>
                </div>

                {/* 2c. Media Buzz & Press */}
                <div className="admin-stat-card" onClick={() => setActiveTab('mediabuzz')}>
                  <div className="admin-stat-icon-wrap" style={{ background: '#ffedd5' }}>
                    <Newspaper size={22} color="#ea580c" />
                  </div>
                  <div className="admin-stat-info">
                    <span className="admin-stat-count">{mediaBuzzItems.length}</span>
                    <span className="admin-stat-label">Media Buzz & Press</span>
                  </div>
                  <span className="admin-stat-action">
                    Newspapers & Digital Articles <ChevronRight size={13} style={{ display: 'inline' }} />
                  </span>
                </div>

                {/* 3. Published Articles */}
                <div className="admin-stat-card" onClick={() => setActiveTab('articles')}>
                  <div className="admin-stat-icon-wrap" style={{ background: '#fdf2f8' }}>
                    <FileText size={22} color="#db2777" />
                  </div>
                  <div className="admin-stat-info">
                    <span className="admin-stat-count">{articles.length}</span>
                    <span className="admin-stat-label">Published Stories</span>
                  </div>
                  <span className="admin-stat-action">
                    Manage with Tiptap <ChevronRight size={13} style={{ display: 'inline' }} />
                  </span>
                </div>

                {/* 3b. Direct Speak / Director's Voice */}
                <div className="admin-stat-card" onClick={() => setActiveTab('directSpeak')}>
                  <div className="admin-stat-icon-wrap" style={{ background: '#fff1f2' }}>
                    <Mic size={22} color="#be123c" />
                  </div>
                  <div className="admin-stat-info">
                    <span className="admin-stat-count">Director's Voice</span>
                    <span className="admin-stat-label">Direct Speak Story</span>
                  </div>
                  <span className="admin-stat-action">
                    Edit Image & Text <ChevronRight size={13} style={{ display: 'inline' }} />
                  </span>
                </div>

                {/* 4. Insiders Video Stories */}
                <div className="admin-stat-card" onClick={() => setActiveTab('insiders')}>
                  <div className="admin-stat-icon-wrap" style={{ background: '#fae8ff' }}>
                    <Video size={22} color="#9333ea" />
                  </div>
                  <div className="admin-stat-info">
                    <span className="admin-stat-count">{insiders.length}</span>
                    <span className="admin-stat-label">Insiders Videos</span>
                  </div>
                  <span className="admin-stat-action">
                    Upload & Manage Videos <ChevronRight size={13} style={{ display: 'inline' }} />
                  </span>
                </div>

                {/* 5. Contact Inquiries */}
                <div className="admin-stat-card" onClick={() => setActiveTab('inquiries')}>
                  <div className="admin-stat-icon-wrap" style={{ background: '#fef3c7' }}>
                    <Mail size={22} color="#d97706" />
                  </div>
                  <div className="admin-stat-info">
                    <span className="admin-stat-count">{inquiries.length}</span>
                    <span className="admin-stat-label">Contact Inquiries</span>
                  </div>
                  <span className="admin-stat-action">
                    {stats.unreadInquiries} New Unread <ChevronRight size={13} style={{ display: 'inline' }} />
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="admin-quick-actions">
                <h2 className="admin-subsection-title">Quick Actions</h2>
                <div className="admin-actions-row">
                  <button onClick={openNewCommitteeModal} className="admin-btn admin-btn-primary" style={{ background: '#6e1e38' }}>
                    <Plus size={15} />
                    <span>Add Committee Member</span>
                  </button>
                  <button onClick={openNewMediaBuzzModal} className="admin-btn admin-btn-primary" style={{ background: '#ea580c' }}>
                    <Plus size={15} />
                    <span>Add Media Buzz Report</span>
                  </button>
                  <button onClick={() => setActiveTab('directSpeak')} className="admin-btn admin-btn-secondary">
                    <Mic size={15} />
                    <span>Direct Speak (Director's Voice)</span>
                  </button>
                  <button onClick={openNewArticleModal} className="admin-btn admin-btn-secondary">
                    <Plus size={15} />
                    <span>Post Story (Tiptap)</span>
                  </button>
                  <button onClick={openNewInsiderModal} className="admin-btn admin-btn-secondary">
                    <Video size={15} />
                    <span>Upload Insider Video</span>
                  </button>
                  <button onClick={() => setActiveTab('newsletter')} className="admin-btn admin-btn-secondary">
                    <SendHorizontal size={15} />
                    <span>Broadcast Email to Subscribers</span>
                  </button>
                  <button onClick={() => setActiveTab('analytics')} className="admin-btn admin-btn-secondary">
                    <BarChart3 size={15} />
                    <span>View Visitor Traffic & IPs</span>
                  </button>
                  <button onClick={() => setActiveTab('settings')} className="admin-btn admin-btn-secondary">
                    <Settings size={15} />
                    <span>Edit CMS & Phone Numbers</span>
                  </button>
                </div>
              </div>

              {/* Recent Inquiries Snippet */}
              <div className="admin-recent-block">
                <div className="admin-subhead-row">
                  <h2 className="admin-subsection-title">Recent Contact Inquiries</h2>
                  <button onClick={() => setActiveTab('inquiries')} className="admin-link-btn">
                    View All ({inquiries.length}) →
                  </button>
                </div>
                {inquiries.length === 0 ? (
                  <p className="admin-empty-text">No messages received yet.</p>
                ) : (
                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Name</th>
                          <th>Email / Phone</th>
                          <th>Type</th>
                          <th>Message Preview</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries.slice(0, 5).map((inq) => (
                          <tr key={inq._id}>
                            <td className="admin-nowrap">
                              {new Date(inq.createdAt).toLocaleDateString()}
                            </td>
                            <td><strong>{inq.name}</strong></td>
                            <td>
                              <div>{inq.email}</div>
                              {inq.phone && <small style={{ color: '#777' }}>{inq.phone}</small>}
                            </td>
                            <td>
                              <span className="admin-tag">{inq.type || 'General'}</span>
                            </td>
                            <td className="admin-truncate-text">{inq.message}</td>
                            <td>
                              <span className={`admin-badge-status ${inq.status === 'read' ? 'status-read' : 'status-pending'}`}>
                                {inq.status === 'read' ? 'Read' : 'New'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: VISITOR ANALYTICS & IP TRACKING */}
          {activeTab === 'analytics' && (
            <div className="admin-tab-content">
              <div className="admin-content-header">
                <div>
                  <h1 className="admin-section-title">IP-Based Visitor Analytics</h1>
                  <p className="admin-section-desc">
                    Accurate unique audience tracking based on distinct IP addresses and page interactions.
                  </p>
                </div>
                <button onClick={loadInitialData} className="admin-btn admin-btn-secondary">
                  <RefreshCw size={14} />
                  <span>Refresh Traffic</span>
                </button>
              </div>

              {/* Highlight Cards */}
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="admin-stat-icon-wrap" style={{ background: '#e0f2fe' }}>
                    <Users size={22} color="#0284c7" />
                  </div>
                  <div className="admin-stat-info">
                    <span className="admin-stat-count">{analytics.totalUniqueVisitors}</span>
                    <span className="admin-stat-label">Total Unique IP Visitors</span>
                  </div>
                  <span className="admin-stat-action">All-time unique audience</span>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon-wrap" style={{ background: '#ecfdf5' }}>
                    <Calendar size={22} color="#059669" />
                  </div>
                  <div className="admin-stat-info">
                    <span className="admin-stat-count">{analytics.todayUniqueVisitors}</span>
                    <span className="admin-stat-label">Today's Unique Visitors</span>
                  </div>
                  <span className="admin-stat-action">Distinct IPs today</span>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon-wrap" style={{ background: '#fef3c7' }}>
                    <Eye size={22} color="#d97706" />
                  </div>
                  <div className="admin-stat-info">
                    <span className="admin-stat-count">{analytics.totalPageViews}</span>
                    <span className="admin-stat-label">Total Page Views</span>
                  </div>
                  <span className="admin-stat-action">Total page hits tracked</span>
                </div>
              </div>

              {/* 7-Day Activity Trend & Top Pages Grid */}
              <div className="admin-grid-2" style={{ marginBottom: '24px' }}>
                <div className="admin-recent-block">
                  <h2 className="admin-subsection-title">7-Day Traffic Trend</h2>
                  {analytics.sevenDaysData.length === 0 ? (
                    <p className="admin-empty-text">No traffic history in the last 7 days yet.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {analytics.sevenDaysData.map((day) => (
                        <div key={day.date} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                          <span style={{ width: '90px', fontWeight: '600' }}>{day.date}</span>
                          <div style={{ flex: 1, height: '18px', background: '#f0ebe1', borderRadius: '3px', overflow: 'hidden', display: 'flex' }}>
                            <div
                              style={{
                                width: `${Math.min(100, Math.max(10, day.uniqueVisitors * 15))}%`,
                                background: '#6e1e38',
                                color: '#fff',
                                fontSize: '10px',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                paddingLeft: '6px'
                              }}
                            >
                              {day.uniqueVisitors} IPs
                            </div>
                          </div>
                          <span style={{ fontSize: '12px', color: '#777', width: '70px', textAlign: 'right' }}>
                            {day.views} views
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="admin-recent-block">
                  <h2 className="admin-subsection-title">Top Visited Pages</h2>
                  {analytics.topPages.length === 0 ? (
                    <p className="admin-empty-text">No page data tracked yet.</p>
                  ) : (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Page Path</th>
                          <th>Views</th>
                          <th>Unique IPs</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics.topPages.map((p) => (
                          <tr key={p.page}>
                            <td><code>{p.page}</code></td>
                            <td><strong>{p.views}</strong></td>
                            <td>{p.uniqueVisitors}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Recent Visitor Logs */}
              <div className="admin-recent-block">
                <h2 className="admin-subsection-title">Recent Visitor IP Logs</h2>
                {analytics.recentVisits.length === 0 ? (
                  <p className="admin-empty-text">No visitor logs recorded yet.</p>
                ) : (
                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Timestamp</th>
                          <th>Visitor IP</th>
                          <th>Page Visited</th>
                          <th>Device</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics.recentVisits.map((v, i) => (
                          <tr key={i}>
                            <td className="admin-nowrap">{new Date(v.createdAt).toLocaleString()}</td>
                            <td><code>{v.ip}</code></td>
                            <td>{v.page}</td>
                            <td>
                              <span className="admin-tag">
                                {v.device === 'mobile' ? (
                                  <Smartphone size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                                ) : (
                                  <Monitor size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                                )}
                                {v.device}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: NEWSLETTER & SUBSCRIBERS */}
          {activeTab === 'newsletter' && (
            <div className="admin-tab-content">
              <div className="admin-content-header">
                <div>
                  <h1 className="admin-section-title">Newsletter & Email Broadcasts</h1>
                  <p className="admin-section-desc">
                    Manage subscribers collected from the website footer and dispatch formatted email updates via Gmail SMTP.
                  </p>
                </div>
                <button onClick={loadInitialData} className="admin-btn admin-btn-secondary">
                  <RefreshCw size={14} />
                  <span>Refresh Subscribers</span>
                </button>
              </div>

              {/* ─── EMAIL BROADCAST COMPOSER ───────────────────────── */}
              <div className="admin-quick-actions" style={{ marginBottom: '28px' }}>
                <h2 className="admin-subsection-title">
                  <SendHorizontal size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: '-3px' }} />
                  Compose Broadcast Update
                </h2>
                <p style={{ fontSize: '13px', color: '#665c54', margin: '0 0 16px 0' }}>
                  Targeted recipients: <strong>{selectedSubscribers.length}</strong> selected subscriber(s).
                </p>

                <form onSubmit={handleSendCampaign}>
                  <div className="admin-grid-2">
                    <div className="admin-form-group">
                      <label>Email Subject Line *</label>
                      <input
                        type="text"
                        required
                        value={campaignForm.subject}
                        onChange={(e) => setCampaignForm({ ...campaignForm, subject: e.target.value })}
                        placeholder="e.g. Swayamkrushi Autumn Highlights & Upcoming Annual Sports Day"
                        className="admin-input"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Category / Banner Tag</label>
                      <select
                        value={campaignForm.category}
                        onChange={(e) => setCampaignForm({ ...campaignForm, category: e.target.value })}
                        className="admin-select"
                      >
                        <option value="Newsletter & Updates">Newsletter & Updates</option>
                        <option value="Milestone & Event Announcement">Milestone & Event Announcement</option>
                        <option value="Annual Progress Report">Annual Progress Report</option>
                        <option value="Sponsorship & Support Appeal">Sponsorship & Support Appeal</option>
                        <option value="Urgent Notice">Urgent Notice</option>
                      </select>
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Broadcast Message Body (Tiptap Editor) *</label>
                    <TiptapEditor
                      content={campaignForm.contentHtml}
                      onChange={(html) => setCampaignForm((prev) => ({ ...prev, contentHtml: html }))}
                      placeholder="Write your email update here... You can format text, embed Cloudinary photos, and add links."
                    />
                  </div>

                  <div className="admin-form-actions">
                    <button
                      type="submit"
                      disabled={sendingCampaign || selectedSubscribers.length === 0}
                      className="admin-btn admin-btn-primary admin-btn-lg"
                    >
                      <Send size={16} />
                      <span>{sendingCampaign ? 'Sending Email via SMTP...' : `Send Broadcast to ${selectedSubscribers.length} Recipient(s)`}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* ─── SUBSCRIBERS TABLE ──────────────────────────────── */}
              <div className="admin-recent-block" style={{ marginBottom: '28px' }}>
                <div className="admin-subhead-row">
                  <div>
                    <h2 className="admin-subsection-title">Subscribed Audience ({subscribers.length})</h2>
                    <p style={{ fontSize: '13px', color: '#776e65', margin: 0 }}>
                      Select specific subscribers or click 'Select All' to include them in email campaigns.
                    </p>
                  </div>

                  <div className="admin-btn-group">
                    <button
                      type="button"
                      onClick={handleSelectAllSubscribers}
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                    >
                      {selectedSubscribers.length === filteredSubscribers.filter((s) => s.status === 'active').length ? (
                        <>
                          <CheckSquare size={13} />
                          <span>Deselect All</span>
                        </>
                      ) : (
                        <>
                          <Square size={13} />
                          <span>Select All Active</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="admin-search-group" style={{ marginBottom: '14px', maxWidth: '300px' }}>
                  <input
                    type="text"
                    placeholder="Search subscribers by email..."
                    value={subscriberSearch}
                    onChange={(e) => setSubscriberSearch(e.target.value)}
                    className="admin-input"
                  />
                </div>

                {filteredSubscribers.length === 0 ? (
                  <p className="admin-empty-text">No subscribers found.</p>
                ) : (
                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th style={{ width: '40px' }}>Select</th>
                          <th>Subscriber Email</th>
                          <th>Source</th>
                          <th>Status</th>
                          <th>Date Subscribed</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSubscribers.map((sub) => {
                          const isSelected = selectedSubscribers.includes(sub.email)
                          return (
                            <tr key={sub._id}>
                              <td>
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleToggleSubscriber(sub.email)}
                                  disabled={sub.status !== 'active'}
                                />
                              </td>
                              <td>
                                <strong>{sub.email}</strong>
                                {sub.name && <div style={{ fontSize: '12px', color: '#777' }}>{sub.name}</div>}
                              </td>
                              <td><span className="admin-tag">{sub.source || 'footer'}</span></td>
                              <td>
                                <span className={`admin-badge-status ${sub.status === 'active' ? 'status-read' : 'status-pending'}`}>
                                  {sub.status === 'active' ? 'Active' : 'Unsubscribed'}
                                </span>
                              </td>
                              <td className="admin-nowrap">{new Date(sub.createdAt).toLocaleDateString()}</td>
                              <td>
                                <div className="admin-btn-group">
                                  <button
                                    onClick={() => handleToggleSubStatus(sub._id, sub.status)}
                                    className="admin-btn-action admin-btn-edit"
                                    title="Toggle status"
                                  >
                                    {sub.status === 'active' ? 'Unsubscribe' : 'Reactivate'}
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSubscriber(sub._id, sub.email)}
                                    className="admin-btn-action admin-btn-delete"
                                    title="Delete subscriber"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* ─── CAMPAIGN HISTORY ──────────────────────────────── */}
              <div className="admin-recent-block">
                <h2 className="admin-subsection-title">Past Broadcast History ({campaigns.length})</h2>
                {campaigns.length === 0 ? (
                  <p className="admin-empty-text">No email campaigns dispatched yet.</p>
                ) : (
                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Date Sent</th>
                          <th>Subject Line</th>
                          <th>Category</th>
                          <th>Recipients</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaigns.map((camp) => (
                          <tr key={camp._id}>
                            <td className="admin-nowrap">{new Date(camp.createdAt).toLocaleString()}</td>
                            <td><strong>{camp.subject}</strong></td>
                            <td><span className="admin-tag">{camp.category}</span></td>
                            <td>{camp.recipientCount} emails</td>
                            <td>
                              <span className="admin-badge-status status-read">
                                <Check size={11} style={{ display: 'inline', marginRight: '3px' }} />
                                Delivered
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: MANAGING COMMITTEE */}
          {activeTab === 'committee' && (
            <div className="admin-tab-content">
              <div className="admin-content-header">
                <div>
                  <h1 className="admin-section-title">Managing Committee & Governance</h1>
                  <p className="admin-section-desc">
                    Manage committee members, patrons, executive governance, designations, credentials, bios, and portraits.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={loadInitialData} className="admin-btn admin-btn-secondary">
                    <RefreshCw size={14} />
                    <span>Refresh</span>
                  </button>
                  <button onClick={openNewCommitteeModal} className="admin-btn admin-btn-primary" style={{ background: '#6e1e38' }}>
                    <Plus size={15} />
                    <span>Add Committee Member</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="admin-filter-bar">
                <div className="admin-filter-group">
                  <label>Category Filter:</label>
                  <select
                    value={committeeCategoryFilter}
                    onChange={(e) => setCommitteeCategoryFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="all">All Categories ({committeeMembers.length})</option>
                    <option value="Founder">Founder Director</option>
                    <option value="Patron">Patrons</option>
                    <option value="Presidency">Presidency & Vice Presidents</option>
                    <option value="Secretariat">Secretariat</option>
                    <option value="Executive">Executive Board</option>
                    <option value="General">General Members</option>
                  </select>
                </div>
                <div className="admin-search-group">
                  <div style={{ position: 'relative' }}>
                    <Search size={15} style={{ position: 'absolute', left: '10px', top: '12px', color: '#8c8278' }} />
                    <input
                      type="text"
                      placeholder="Search by name, role, designation..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="admin-input"
                      style={{ paddingLeft: '32px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Committee Members Table */}
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '60px' }}>Portrait</th>
                      <th>Name & Role</th>
                      <th>Category</th>
                      <th>Designation & Credentials</th>
                      <th>Bio Preview</th>
                      <th>Order</th>
                      <th style={{ width: '110px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCommitteeMembers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="admin-table-empty">
                          No committee members found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredCommitteeMembers.map((mem) => {
                        const themeColor = mem.colorTheme === 'gold' ? '#d97706' : mem.colorTheme === 'indigo' ? '#4f46e5' : mem.colorTheme === 'slate' ? '#475569' : '#6e1e38'
                        return (
                          <tr key={mem.id || mem._id}>
                            <td>
                              {mem.image ? (
                                <img
                                  src={mem.image}
                                  alt={mem.name}
                                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${themeColor}` }}
                                />
                              ) : (
                                <div
                                  style={{
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '50%',
                                    background: themeColor,
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    letterSpacing: '1px'
                                  }}
                                >
                                  {mem.initials || (mem.name ? mem.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : 'SK')}
                                </div>
                              )}
                            </td>
                            <td>
                              <div style={{ fontWeight: 700, color: '#2d161e', fontSize: '14px' }}>{mem.name}</div>
                              <div style={{ fontSize: '12px', color: themeColor, fontWeight: 600 }}>{mem.role}</div>
                              {mem.badge && (
                                <span className="admin-tag" style={{ fontSize: '10px', marginTop: '2px', background: '#f5f0eb' }}>
                                  {mem.badge}
                                </span>
                              )}
                            </td>
                            <td>
                              <span className="admin-tag" style={{ color: themeColor, borderColor: themeColor }}>
                                {mem.roleCategory || 'Executive'}
                              </span>
                            </td>
                            <td>
                              <div style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>{mem.designation || '—'}</div>
                              {mem.credentials && (
                                <div style={{ fontSize: '11.5px', color: '#776e65', marginTop: '2px' }}>{mem.credentials}</div>
                              )}
                            </td>
                            <td className="admin-truncate-text" style={{ maxWidth: '240px', fontSize: '12px' }}>
                              {mem.bio}
                            </td>
                            <td>
                              <span className="admin-tag">{mem.order || 0}</span>
                            </td>
                            <td className="admin-nowrap">
                              <button
                                onClick={() => openEditCommitteeModal(mem)}
                                className="admin-btn-icon admin-btn-edit"
                                title="Edit Member"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteCommittee(mem.id || mem._id, mem.name)}
                                className="admin-btn-icon admin-btn-delete"
                                title="Delete Member"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: MEDIA BUZZ & PRESS */}
          {activeTab === 'mediabuzz' && (
            <div className="admin-tab-content">
              <div className="admin-content-header">
                <div>
                  <h1 className="admin-section-title">Media Buzz & Press Coverage</h1>
                  <p className="admin-section-desc">
                    Manage newspaper clippings, digital media features, regional press coverage and external links.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={loadInitialData} className="admin-btn admin-btn-secondary">
                    <RefreshCw size={14} />
                    <span>Refresh</span>
                  </button>
                  <button onClick={openNewMediaBuzzModal} className="admin-btn admin-btn-primary" style={{ background: '#ea580c' }}>
                    <Plus size={15} />
                    <span>Add Media Buzz Report</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="admin-filter-bar">
                <div className="admin-filter-group">
                  <label>Outlet Type:</label>
                  <select
                    value={mediaTypeFilter}
                    onChange={(e) => setMediaTypeFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="all">All Outlets ({mediaBuzzItems.length})</option>
                    <option value="Print & Newspapers">Print & Newspapers</option>
                    <option value="Digital & Magazines">Digital & Magazines</option>
                    <option value="TV & Broadcast">TV & Broadcast</option>
                    <option value="Radio & Podcasts">Radio & Podcasts</option>
                  </select>
                </div>
                <div className="admin-search-group">
                  <div style={{ position: 'relative' }}>
                    <Search size={15} style={{ position: 'absolute', left: '10px', top: '12px', color: '#8c8278' }} />
                    <input
                      type="text"
                      placeholder="Search headlines, outlets, topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="admin-input"
                      style={{ paddingLeft: '32px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Media Buzz Table */}
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '70px' }}>Media</th>
                      <th>Headline & Outlet</th>
                      <th>Type & Category</th>
                      <th>Date / Read</th>
                      <th>Excerpt Preview</th>
                      <th>Spotlight</th>
                      <th style={{ width: '120px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMediaBuzz.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="admin-table-empty">
                          No media coverage articles found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredMediaBuzz.map((item) => (
                        <tr key={item.id || item._id}>
                          <td>
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #d4cdc3' }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: '56px',
                                  height: '40px',
                                  borderRadius: '4px',
                                  background: item.isClipping ? '#fef3c7' : '#f5f0eb',
                                  border: '1px dashed #c4b5a5',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#776e65',
                                  fontSize: '11px',
                                  fontWeight: 600
                                }}
                              >
                                {item.isClipping ? 'Clipping' : 'Article'}
                              </div>
                            )}
                          </td>
                          <td>
                            <div style={{ fontWeight: 700, color: '#2d161e', fontSize: '13.5px', marginBottom: '2px' }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: '12px', color: '#ea580c', fontWeight: 600 }}>
                              📰 {item.outlet}
                            </div>
                            {item.badge && (
                              <span className="admin-tag" style={{ fontSize: '10px', marginTop: '2px', background: '#fff7ed', color: '#ea580c', borderColor: '#fed7aa' }}>
                                {item.badge}
                              </span>
                            )}
                          </td>
                          <td>
                            <span className="admin-tag">{item.outletType || 'Print'}</span>
                            <div style={{ fontSize: '11px', color: '#777', marginTop: '3px' }}>{item.category}</div>
                          </td>
                          <td className="admin-nowrap">
                            <div style={{ fontSize: '12px', fontWeight: 600 }}>{item.date}</div>
                            <div style={{ fontSize: '11px', color: '#888' }}>{item.readTime || 'Report'}</div>
                          </td>
                          <td className="admin-truncate-text" style={{ maxWidth: '220px', fontSize: '12px' }}>
                            {item.excerpt}
                          </td>
                          <td>
                            <button
                              onClick={() => handleToggleFeaturedBuzz(item)}
                              className={`admin-btn-icon ${item.featured ? 'admin-btn-star-active' : ''}`}
                              title={item.featured ? 'Pinned in Spotlight Banner' : 'Pin to Spotlight'}
                              style={{ color: item.featured ? '#d97706' : '#9ca3af' }}
                            >
                              <Star size={16} fill={item.featured ? '#d97706' : 'none'} />
                            </button>
                          </td>
                          <td className="admin-nowrap">
                            {item.articleUrl && (
                              <a
                                href={item.articleUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="admin-btn-icon"
                                title="Open Live Media Link"
                                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                              >
                                <ExternalLink size={14} />
                              </a>
                            )}
                            <button
                              onClick={() => openEditMediaBuzzModal(item)}
                              className="admin-btn-icon admin-btn-edit"
                              title="Edit Article"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteMediaBuzz(item.id || item._id, item.title)}
                              className="admin-btn-icon admin-btn-delete"
                              title="Delete Article"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ARTICLES & STORIES MANAGER */}
          {activeTab === 'articles' && (
            <div className="admin-tab-content">
              <div className="admin-content-header">
                <div>
                  <h1 className="admin-section-title">Articles & News Editor</h1>
                  <p className="admin-section-desc">
                    Write, edit, format with Tiptap, upload images to Cloudinary, and publish stories to the frontpage.
                  </p>
                </div>
                <button onClick={openNewArticleModal} className="admin-btn admin-btn-primary">
                  <Plus size={15} />
                  <span>Write New Article</span>
                </button>
              </div>

              {/* Filters and Search Bar */}
              <div className="admin-filter-bar">
                <div className="admin-filter-group">
                  <label>Section Placement:</label>
                  <select
                    value={articleSectionFilter}
                    onChange={(e) => setArticleSectionFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="all">All Sections ({articles.length})</option>
                    <option value="left">Left Column (The Compass)</option>
                    <option value="main">Center / Main Headlines</option>
                    <option value="right">Right Column (The Chronicle)</option>
                    <option value="feature">Featured Highlights</option>
                  </select>
                </div>
                <div className="admin-search-group">
                  <div style={{ position: 'relative' }}>
                    <Search size={15} style={{ position: 'absolute', left: '10px', top: '12px', color: '#8c8278' }} />
                    <input
                      type="text"
                      placeholder="Search articles by title or keyword..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="admin-input"
                      style={{ paddingLeft: '32px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Articles Table */}
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '60px' }}>Thumb</th>
                      <th>Title & Excerpt</th>
                      <th>Category</th>
                      <th>Section</th>
                      <th>Attribution</th>
                      <th>Order</th>
                      <th style={{ width: '130px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArticles.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="admin-table-empty">
                          No articles found matching filter.
                        </td>
                      </tr>
                    ) : (
                      filteredArticles.map((art) => {
                        const isVideo = art.mediaType === 'video' || Boolean(art.videoUrl)
                        return (
                          <tr key={art.id || art._id}>
                            <td>
                              {art.imageUrl ? (
                                <div style={{ position: 'relative', width: '48px', height: '36px', display: 'inline-block' }}>
                                  <img src={art.imageUrl} alt="" className="admin-table-thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  {isVideo && (
                                    <span style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', color: '#fff' }}>
                                      <Play size={13} fill="#fff" />
                                    </span>
                                  )}
                                </div>
                              ) : isVideo ? (
                                <div className="admin-table-thumb-placeholder" style={{ background: '#2a1a1e', color: '#e03131' }}>
                                  <Video size={18} color="#e03131" />
                                </div>
                              ) : (
                                <div className="admin-table-thumb-placeholder">
                                  <FileText size={18} color="#8c8278" />
                                </div>
                              )}
                            </td>
                            <td>
                              <strong className="admin-item-title">{art.title}</strong>
                              <p className="admin-item-snippet">{art.excerpt}</p>
                              <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
                                {art.featured && (
                                  <span className="admin-badge-featured">
                                    <Star size={10} style={{ display: 'inline', marginRight: '3px' }} />
                                    FEATURED
                                  </span>
                                )}
                                {isVideo && (
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#6e1e38', color: '#fff', padding: '2px 6px', borderRadius: '3px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px' }}>
                                    <Play size={9} fill="#fff" /> VIDEO STORY
                                  </span>
                                )}
                              </div>
                            </td>
                            <td><span className="admin-tag">{art.category}</span></td>
                            <td>
                              <span className="admin-section-pill">{art.section || 'main'}</span>
                            </td>
                            <td style={{ color: '#777' }}>{art.attribution}</td>
                            <td>{art.order}</td>
                            <td>
                              <div className="admin-btn-group">
                                <button
                                  onClick={() => openEditArticleModal(art)}
                                  className="admin-btn-action admin-btn-edit"
                                  title="Edit with Tiptap"
                                >
                                  <Edit3 size={13} style={{ display: 'inline', marginRight: '4px' }} />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteArticle(art.id || art._id, art.title)}
                                  className="admin-btn-action admin-btn-delete"
                                  title="Delete Article"
                                >
                                  <Trash2 size={13} style={{ display: 'inline', marginRight: '4px' }} />
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: DIRECT SPEAK & DIRECTOR'S VOICE DEDICATED PAGE */}
          {activeTab === 'directSpeak' && (
            <div className="admin-tab-content admin-direct-speak-container">
              {/* Header Banner */}
              <div className="admin-direct-speak-header-banner">
                <div className="admin-ds-header-left">
                  <span className="admin-ds-badge">
                    <Mic size={12} />
                    Director's Voice & Direct Speak
                  </span>
                  <h1 className="admin-ds-title">Direct Speak Editorial & Page Manager</h1>
                  <p className="admin-ds-desc">
                    Dedicated editor for the Director's Voice section ("Chance Encounter That Changed My Life" & "Direct Speak"). Manage the page headline, hero archival photo, summary excerpt, author attribution, and rich formatted text.
                  </p>
                </div>
                <div className="admin-ds-header-actions">
                  <div className="admin-ds-mode-selector">
                    <button
                      type="button"
                      className={`admin-ds-mode-btn ${directSpeakViewMode === 'split' ? 'active' : ''}`}
                      onClick={() => setDirectSpeakViewMode('split')}
                    >
                      <Layers size={13} />
                      Split View
                    </button>
                    <button
                      type="button"
                      className={`admin-ds-mode-btn ${directSpeakViewMode === 'editor' ? 'active' : ''}`}
                      onClick={() => setDirectSpeakViewMode('editor')}
                    >
                      <Edit3 size={13} />
                      Editor Only
                    </button>
                    <button
                      type="button"
                      className={`admin-ds-mode-btn ${directSpeakViewMode === 'preview' ? 'active' : ''}`}
                      onClick={() => setDirectSpeakViewMode('preview')}
                    >
                      <Eye size={13} />
                      Live Preview
                    </button>
                  </div>

                  <a
                    href="http://localhost:5173/#/article/story-encounter"
                    target="_blank"
                    rel="noreferrer"
                    className="admin-btn admin-btn-outline"
                    style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff' }}
                  >
                    <ExternalLink size={14} />
                    <span>View on Website</span>
                  </a>

                  <button
                    onClick={handleSaveDirectSpeak}
                    disabled={savingDirectSpeak}
                    className="admin-btn admin-btn-primary"
                    style={{ background: '#d4af37', color: '#1b1418', fontWeight: 700 }}
                  >
                    {savingDirectSpeak ? <RefreshCw size={14} className="spin" /> : <Check size={14} />}
                    <span>{savingDirectSpeak ? 'Saving...' : 'Save & Publish'}</span>
                  </button>
                </div>
              </div>

              {/* Story Switcher Bar */}
              <div className="admin-ds-switcher-bar">
                <div className="admin-ds-switcher-pills">
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#6e1e38', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Select Story:
                  </span>
                  {directSpeakStories.length > 0 ? (
                    directSpeakStories.map((st) => (
                      <button
                        key={st.id || st._id}
                        type="button"
                        className={`admin-ds-pill ${(directSpeakForm.id === st.id || directSpeakForm._id === st._id) ? 'active' : ''}`}
                        onClick={() => handleSelectDirectSpeakArticle(st)}
                      >
                        <FileText size={13} />
                        <span>{st.title || 'Untitled Direct Speak'}</span>
                      </button>
                    ))
                  ) : (
                    <button
                      type="button"
                      className="admin-ds-pill active"
                    >
                      <FileText size={13} />
                      <span>Chance Encounter That Changed My Life</span>
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleCreateNewDirectSpeakPost}
                  className="admin-btn admin-btn-secondary"
                  style={{ fontSize: '12px', padding: '5px 12px' }}
                >
                  <Plus size={13} />
                  <span>+ New Direct Speak Entry</span>
                </button>
              </div>

              {/* Main Grid: Editor & Preview */}
              <div className={`admin-ds-main-grid mode-${directSpeakViewMode}`}>
                {/* LEFT: EDITORIAL FORM */}
                {(directSpeakViewMode === 'split' || directSpeakViewMode === 'editor') && (
                  <div className="admin-ds-editor-column">
                    {/* 1. Metadata & Headings */}
                    <div className="admin-ds-card">
                      <h3 className="admin-ds-card-title">
                        <Edit3 size={16} color="#6e1e38" />
                        1. Headline & Editorial Metadata
                      </h3>
                      <div className="admin-form-group">
                        <label>Article Title / Headline *</label>
                        <input
                          type="text"
                          value={directSpeakForm.title}
                          onChange={(e) => setDirectSpeakForm((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. Chance Encounter That Changed My Life"
                          className="admin-input"
                          required
                        />
                      </div>

                      <div className="admin-form-row">
                        <div className="admin-form-group">
                          <label>Category / Series Tag *</label>
                          <input
                            type="text"
                            value={directSpeakForm.category}
                            onChange={(e) => setDirectSpeakForm((prev) => ({ ...prev, category: e.target.value }))}
                            placeholder="e.g. Director's Voice"
                            className="admin-input"
                          />
                        </div>
                        <div className="admin-form-group">
                          <label>Author Attribution / Byline *</label>
                          <input
                            type="text"
                            value={directSpeakForm.attribution}
                            onChange={(e) => setDirectSpeakForm((prev) => ({ ...prev, attribution: e.target.value }))}
                            placeholder="e.g. Ms Manjula Kalyan, Founder & Director"
                            className="admin-input"
                          />
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label>Lead Summary / Excerpt *</label>
                        <textarea
                          rows={3}
                          value={directSpeakForm.excerpt}
                          onChange={(e) => setDirectSpeakForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                          placeholder="Opening reflection / summary paragraph..."
                          className="admin-textarea"
                          style={{ minHeight: '80px' }}
                        />
                      </div>
                    </div>

                    {/* 2. Hero Visual / Image & Video Management */}
                    <div className="admin-ds-card">
                      <h3 className="admin-ds-card-title">
                        {directSpeakForm.mediaType === 'video' ? <Video size={16} color="#6e1e38" /> : <FileImage size={16} color="#6e1e38" />}
                        2. Hero Media (Photo or Video Story)
                      </h3>

                      <div className="admin-thumb-toggle-header">
                        <span className="admin-thumb-toggle-label">Hero Display Format:</span>
                        <div className="admin-thumb-toggle-switch">
                          <button
                            type="button"
                            className={`admin-toggle-pill ${directSpeakForm.hasThumbnail !== false && directSpeakForm.mediaType !== 'video' ? 'active-yes' : ''}`}
                            onClick={() => setDirectSpeakForm((prev) => ({ ...prev, hasThumbnail: true, mediaType: 'image' }))}
                          >
                            <FileImage size={12} />
                            Photo Image
                          </button>
                          <button
                            type="button"
                            className={`admin-toggle-pill ${directSpeakForm.hasThumbnail !== false && directSpeakForm.mediaType === 'video' ? 'active-yes' : ''}`}
                            onClick={() => setDirectSpeakForm((prev) => ({ ...prev, hasThumbnail: true, mediaType: 'video' }))}
                          >
                            <Video size={12} />
                            Video Story
                          </button>
                          <button
                            type="button"
                            className={`admin-toggle-pill ${directSpeakForm.hasThumbnail === false ? 'active-no' : ''}`}
                            onClick={() => setDirectSpeakForm((prev) => ({ ...prev, hasThumbnail: false }))}
                          >
                            <X size={12} />
                            Text Only
                          </button>
                        </div>
                      </div>

                      {directSpeakForm.hasThumbnail === false ? (
                        <div className="admin-no-thumb-banner">
                          <AlertCircle size={20} className="admin-no-thumb-icon" />
                          <div>
                            <strong>Text-Only Column Mode Active</strong>
                            <p>This Director's Voice page will display clean broadsheet typography without a top hero banner photo or video.</p>
                          </div>
                        </div>
                      ) : directSpeakForm.mediaType === 'video' ? (
                        <div className="admin-ds-media-box">
                          <div className="admin-ds-media-preview-wrap" style={{ background: '#000' }}>
                            {directSpeakForm.videoUrl ? (
                              <video
                                src={getDeliveryVideoUrl(directSpeakForm.videoUrl)}
                                poster={directSpeakForm.imageUrl}
                                controls
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                              />
                            ) : (
                              <div className="admin-ds-media-empty">
                                <Video size={32} color="#8c8278" />
                                <span style={{ display: 'block', marginTop: '6px' }}>No Video Uploaded</span>
                              </div>
                            )}
                          </div>

                          <div className="admin-ds-media-controls">
                            <div className="admin-ds-media-btn-row">
                              <label className="admin-btn admin-btn-primary" style={{ cursor: 'pointer', margin: 0 }}>
                                <Upload size={14} />
                                <span>{uploadingVideo ? 'Uploading Video to Cloudinary...' : 'Upload Video File'}</span>
                                <input
                                  type="file"
                                  accept="video/mp4,video/webm,video/ogg,video/quicktime"
                                  style={{ display: 'none' }}
                                  disabled={uploadingVideo}
                                  onChange={(e) => handleArticleVideoUpload(e, setDirectSpeakForm, 'videoUrl')}
                                />
                              </label>

                              {directSpeakForm.videoUrl && (
                                <button
                                  type="button"
                                  className="admin-btn admin-btn-danger-outline"
                                  onClick={() => setDirectSpeakForm((prev) => ({ ...prev, videoUrl: '' }))}
                                >
                                  <Trash2 size={13} />
                                  <span>Reset Video</span>
                                </button>
                              )}
                            </div>

                            <div className="admin-form-group" style={{ marginBottom: '8px' }}>
                              <label style={{ fontSize: '11px' }}>Video URL (Cloudinary or MP4 CDN)</label>
                              <input
                                type="text"
                                value={directSpeakForm.videoUrl}
                                onChange={(e) => setDirectSpeakForm((prev) => ({ ...prev, videoUrl: e.target.value, mediaType: 'video' }))}
                                placeholder="https://res.cloudinary.com/.../video.mp4"
                                className="admin-input"
                                style={{ fontSize: '12px' }}
                              />
                            </div>

                            <div className="admin-form-group" style={{ marginBottom: '8px' }}>
                              <label style={{ fontSize: '11px' }}>Optional Video Poster / Thumbnail Photo</label>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <input
                                  type="text"
                                  value={directSpeakForm.imageUrl}
                                  onChange={(e) => setDirectSpeakForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                                  placeholder="Poster image URL..."
                                  className="admin-input"
                                  style={{ fontSize: '12px', flex: 1 }}
                                />
                                <label className="admin-btn admin-btn-secondary" style={{ cursor: 'pointer', margin: 0, padding: '6px 10px', fontSize: '11px' }}>
                                  <Upload size={12} /> Poster
                                  <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    disabled={uploadingImage}
                                    onChange={(e) => handleFileUpload(e, setDirectSpeakForm, 'imageUrl')}
                                  />
                                </label>
                              </div>
                            </div>

                            <div className="admin-form-group" style={{ marginBottom: 0 }}>
                              <label style={{ fontSize: '11px' }}>Video Caption / Title</label>
                              <input
                                type="text"
                                value={directSpeakForm.imageAlt}
                                onChange={(e) => setDirectSpeakForm((prev) => ({ ...prev, imageAlt: e.target.value }))}
                                placeholder="e.g. Director's Special Address & Reflections"
                                className="admin-input"
                                style={{ fontSize: '12px' }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="admin-ds-media-box">
                          <div className="admin-ds-media-preview-wrap">
                            {directSpeakForm.imageUrl ? (
                              <img src={directSpeakForm.imageUrl} alt="" className="admin-ds-media-img" />
                            ) : (
                              <div className="admin-ds-media-empty">
                                <FileImage size={32} color="#8c8278" />
                                <span style={{ display: 'block', marginTop: '6px' }}>Default Archival Portrait</span>
                              </div>
                            )}
                          </div>

                          <div className="admin-ds-media-controls">
                            <div className="admin-ds-media-btn-row">
                              <label className="admin-btn admin-btn-primary" style={{ cursor: 'pointer', margin: 0 }}>
                                <Upload size={14} />
                                <span>{uploadingImage ? 'Uploading to Cloudinary...' : 'Upload New Photo'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  disabled={uploadingImage}
                                  onChange={(e) => handleFileUpload(e, setDirectSpeakForm, 'imageUrl')}
                                />
                              </label>

                              {directSpeakForm.imageUrl && (
                                <button
                                  type="button"
                                  className="admin-btn admin-btn-secondary"
                                  onClick={() => handleOpenCropModal(
                                    directSpeakForm.imageUrl,
                                    'imageUrl',
                                    setDirectSpeakForm,
                                    "Crop Director's Portrait",
                                    'Reposition and crop photo to focus on the Director.'
                                  )}
                                >
                                  <Crop size={14} />
                                  <span>Crop Photo</span>
                                </button>
                              )}

                              {directSpeakForm.imageUrl && (
                                <button
                                  type="button"
                                  className="admin-btn admin-btn-danger-outline"
                                  onClick={() => setDirectSpeakForm((prev) => ({ ...prev, imageUrl: '' }))}
                                >
                                  <Trash2 size={13} />
                                  <span>Reset</span>
                                </button>
                              )}
                            </div>

                            <div className="admin-form-group" style={{ marginBottom: '8px' }}>
                              <label style={{ fontSize: '11px' }}>Image URL (Cloudinary or Web)</label>
                              <input
                                type="text"
                                value={directSpeakForm.imageUrl}
                                onChange={(e) => setDirectSpeakForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                                placeholder="https://res.cloudinary.com/..."
                                className="admin-input"
                                style={{ fontSize: '12px' }}
                              />
                            </div>

                            <div className="admin-form-group" style={{ marginBottom: 0 }}>
                              <label style={{ fontSize: '11px' }}>Image Caption / Alt Text</label>
                              <input
                                type="text"
                                value={directSpeakForm.imageAlt}
                                onChange={(e) => setDirectSpeakForm((prev) => ({ ...prev, imageAlt: e.target.value }))}
                                placeholder="e.g. Ms Manjula Kalyan at Swayamkrushi"
                                className="admin-input"
                                style={{ fontSize: '12px' }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 3. Full Rich Text Body (Tiptap Editor) */}
                    <div className="admin-ds-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h3 className="admin-ds-card-title" style={{ margin: 0, padding: 0, border: 'none' }}>
                          <Sparkles size={16} color="#6e1e38" />
                          3. Full Story & Reflections (Tiptap Rich Editor)
                        </h3>
                        <span style={{ fontSize: '11.5px', color: '#776e65', fontWeight: 600 }}>
                          {directSpeakForm.contentHtml ? directSpeakForm.contentHtml.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length : 0} words
                        </span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#776e65', margin: '0 0 12px 0' }}>
                        Use formatting tools below to format paragraphs, add section subtitles (H2, H3), blockquotes, lists, embed photos directly, and format Director's reflections.
                      </p>
                      <TiptapEditor
                        content={directSpeakForm.contentHtml}
                        onChange={(html) => setDirectSpeakForm((prev) => ({ ...prev, contentHtml: html }))}
                        placeholder="Write the full Director's Voice / Direct Speak reflections..."
                      />
                    </div>
                  </div>
                )}

                {/* RIGHT: LIVE BROADSHEET PREVIEW */}
                {(directSpeakViewMode === 'split' || directSpeakViewMode === 'preview') && (
                  <div className="admin-ds-preview-column">
                    <div className="admin-ds-broadsheet-preview">
                      <div className="admin-ds-preview-top-bar">
                        <span className="admin-ds-preview-label">
                          <Eye size={12} style={{ display: 'inline', marginRight: '5px' }} />
                          Live Broad-sheet Preview
                        </span>
                        <span style={{ fontSize: '11px', color: '#8c8278' }}>
                          Matches Frontpage / Article View
                        </span>
                      </div>

                      {/* Breadcrumb */}
                      <nav className="admin-ds-bs-breadcrumb">
                        <span>← Back</span>
                        <span>/</span>
                        <span>Home</span>
                        <span>/</span>
                        <span style={{ color: '#6e1e38', fontWeight: 700 }}>
                          {directSpeakForm.category || "Director's Voice"}
                        </span>
                      </nav>

                      {/* Badge */}
                      <div className="admin-ds-bs-badge">
                        <span className="admin-ds-bs-dot" />
                        <span>{directSpeakForm.category?.toUpperCase() || "DIRECTOR'S VOICE"}</span>
                      </div>

                      {/* Headline */}
                      <h1 className="admin-ds-bs-title">
                        {directSpeakForm.title || 'Chance Encounter That Changed My Life'}
                      </h1>

                      {/* Lede Summary */}
                      {directSpeakForm.excerpt && (
                        <p className="admin-ds-bs-lede">
                          {directSpeakForm.excerpt}
                        </p>
                      )}

                      {/* Byline */}
                      <div className="admin-ds-bs-byline">
                        <span className="admin-ds-bs-author">
                          {directSpeakForm.attribution ? `By ${directSpeakForm.attribution}` : 'By SWAYAMKRUSHI ARCHIVES'}
                        </span>
                        <span>Published in Swayamkrushi Archives</span>
                      </div>

                      {/* Hero Image / Video */}
                      {directSpeakForm.hasThumbnail !== false && (
                        <figure className="admin-ds-bs-hero-fig">
                          {directSpeakForm.mediaType === 'video' || directSpeakForm.videoUrl ? (
                            <div style={{ position: 'relative', width: '100%', background: '#0d0709', borderRadius: '4px', overflow: 'hidden' }}>
                              <video
                                src={getDeliveryVideoUrl(directSpeakForm.videoUrl)}
                                poster={directSpeakForm.imageUrl}
                                controls
                                style={{ width: '100%', maxHeight: '420px', display: 'block', margin: '0 auto' }}
                              />
                            </div>
                          ) : (
                            <img
                              src={directSpeakForm.imageUrl || defaultCircleCenter}
                              alt={directSpeakForm.imageAlt || directSpeakForm.title}
                              className="admin-ds-bs-hero-img"
                            />
                          )}
                          <figcaption className="admin-ds-bs-caption">
                            Archival spotlight: {directSpeakForm.title || "Director's Voice"} — Swayamkrushi, Secunderabad.
                          </figcaption>
                        </figure>
                      )}

                      {/* Rendered Body */}
                      <div
                        className="admin-ds-bs-body"
                        dangerouslySetInnerHTML={{
                          __html: directSpeakForm.contentHtml || (
                            directSpeakForm.paragraphs && directSpeakForm.paragraphs.length
                              ? directSpeakForm.paragraphs.map((p) => `<p>${p}</p>`).join('')
                              : `<p>${directSpeakForm.excerpt || 'Article text will appear here...'}</p>`
                          )
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Sticky Save Bar */}
              <div className="admin-ds-bottom-bar">
                <span style={{ fontSize: '13px', color: '#666' }}>
                  Changes saved here will immediately update the live <strong>{directSpeakForm.title}</strong> page on the public website.
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={() => {
                      const match = articles.find((a) => (a.id || a._id) === directSpeakSelectedId)
                      if (match) handleSelectDirectSpeakArticle(match)
                    }}
                  >
                    Discard Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDirectSpeak}
                    disabled={savingDirectSpeak}
                    className="admin-btn admin-btn-primary"
                    style={{ fontWeight: 700 }}
                  >
                    {savingDirectSpeak ? <RefreshCw size={14} className="spin" /> : <Check size={14} />}
                    <span>{savingDirectSpeak ? 'Saving...' : 'Save & Publish Changes'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: INSIDERS VIDEO STORIES & TESTIMONIALS */}
          {activeTab === 'insiders' && (
            <div className="admin-tab-content">
              <div className="admin-content-header">
                <div>
                  <h1 className="admin-section-title">Insiders Video Stories & Testimonials</h1>
                  <p className="admin-section-desc">
                    Manage speaker video stories, testimonials, custom thumbnails, quotes, and timestamps displayed on the Insiders Wall.
                  </p>
                </div>
                <button onClick={openNewInsiderModal} className="admin-btn admin-btn-primary">
                  <Plus size={16} />
                  <span>Add New Story</span>
                </button>
              </div>

              {/* Quick Metrics Bar */}
              {(() => {
                const totalCount = insiders.length
                const activeCount = insiders.filter((i) => i.active !== false).length
                const draftCount = totalCount - activeCount
                const videoCount = insiders.filter((i) => !!i.videoUrl).length

                return (
                  <div className="admin-metrics-strip">
                    <div className="admin-metric-card">
                      <div className="admin-metric-icon" style={{ background: '#fae8ff', color: '#9333ea' }}>
                        <Video size={20} />
                      </div>
                      <div>
                        <div className="admin-metric-val">{totalCount}</div>
                        <div className="admin-metric-lbl">Total Stories</div>
                      </div>
                    </div>
                    <div className="admin-metric-card">
                      <div className="admin-metric-icon" style={{ background: '#e6f4ea', color: '#137333' }}>
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <div className="admin-metric-val">{activeCount}</div>
                        <div className="admin-metric-lbl">Live on Wall</div>
                      </div>
                    </div>
                    <div className="admin-metric-card">
                      <div className="admin-metric-icon" style={{ background: '#fef7e0', color: '#b06000' }}>
                        <Clock size={20} />
                      </div>
                      <div>
                        <div className="admin-metric-val">{draftCount}</div>
                        <div className="admin-metric-lbl">Drafts / Hidden</div>
                      </div>
                    </div>
                    <div className="admin-metric-card">
                      <div className="admin-metric-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                        <Play size={20} />
                      </div>
                      <div>
                        <div className="admin-metric-val">{videoCount}</div>
                        <div className="admin-metric-lbl">Cloudinary Videos</div>
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* Filter Bar & Search */}
              <div className="admin-filter-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '22px' }}>
                <div className="admin-filter-tabs">
                  {[
                    { id: 'all', label: 'All Stories', count: insiders.length },
                    { id: 'Educators & Staff', label: 'Educators & Staff', count: insiders.filter(i => i.category === 'Educators & Staff').length },
                    { id: 'Therapists', label: 'Therapists', count: insiders.filter(i => i.category === 'Therapists').length },
                    { id: 'Alumni & Trainees', label: 'Alumni & Trainees', count: insiders.filter(i => i.category === 'Alumni & Trainees').length },
                    { id: 'Parents & Families', label: 'Parents & Families', count: insiders.filter(i => i.category === 'Parents & Families').length }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`admin-filter-tab ${insiderCategoryFilter === tab.id ? 'active' : ''}`}
                      onClick={() => setInsiderCategoryFilter(tab.id)}
                    >
                      <span>{tab.label}</span>
                      <span style={{ fontSize: '11px', opacity: 0.85, fontWeight: 700 }}>({tab.count})</span>
                    </button>
                  ))}
                </div>

                <div className="admin-search-box" style={{ maxWidth: '280px' }}>
                  <Search size={15} className="admin-search-icon" />
                  <input
                    type="text"
                    placeholder="Search name, role, quote..."
                    value={insiderSearch}
                    onChange={(e) => setInsiderSearch(e.target.value)}
                    className="admin-search-input"
                  />
                  {insiderSearch && (
                    <button
                      type="button"
                      onClick={() => setInsiderSearch('')}
                      style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Insiders Video Cards Grid */}
              {(() => {
                const filtered = insiders.filter((item) => {
                  const matchCat = insiderCategoryFilter === 'all' || item.category === insiderCategoryFilter
                  const q = insiderSearch.toLowerCase()
                  const matchSearch = !q ||
                    (item.name && item.name.toLowerCase().includes(q)) ||
                    (item.role && item.role.toLowerCase().includes(q)) ||
                    (item.tag && item.tag.toLowerCase().includes(q)) ||
                    (item.quote && item.quote.toLowerCase().includes(q))
                  return matchCat && matchSearch
                })

                if (filtered.length === 0) {
                  return (
                    <div className="admin-empty-state">
                      <Video size={48} color="#6e1e38" style={{ marginBottom: '14px', opacity: 0.6 }} />
                      <h3 style={{ fontSize: '18px', color: '#2d161e', margin: '0 0 6px' }}>No Video Stories Found</h3>
                      <p style={{ color: '#665c54', fontSize: '14px', maxWidth: '420px', margin: '0 auto 16px' }}>
                        {insiderSearch
                          ? `No stories matched "${insiderSearch}". Try clearing your search keyword.`
                          : `No stories in "${insiderCategoryFilter}". Click "Add New Story" to create one.`}
                      </p>
                      {insiderSearch ? (
                        <button onClick={() => setInsiderSearch('')} className="admin-btn admin-btn-secondary">
                          Clear Search
                        </button>
                      ) : (
                        <button onClick={openNewInsiderModal} className="admin-btn admin-btn-primary">
                          <Plus size={15} />
                          <span>Add First Story</span>
                        </button>
                      )}
                    </div>
                  )
                }

                const getCatClass = (cat) => {
                  if (!cat) return 'category-educators'
                  if (cat.includes('Therapist')) return 'category-therapists'
                  if (cat.includes('Alumni')) return 'category-alumni'
                  if (cat.includes('Parent')) return 'category-parents'
                  return 'category-educators'
                }

                return (
                  <div className="admin-insiders-grid">
                    {filtered.map((item) => (
                      <div key={item.id || item._id} className="admin-insider-card">
                        {/* Card Header with Category & Live/Draft Toggle */}
                        <div className="admin-insider-card-header">
                          <span className={`admin-category-pill ${getCatClass(item.category)}`}>
                            {item.category || 'Staff'}
                          </span>

                          <button
                            onClick={() => handleToggleInsiderActive(item)}
                            className={`admin-insider-status-badge ${item.active !== false ? 'status-live' : 'status-draft'}`}
                            title={item.active !== false ? 'Click to make Draft' : 'Click to Publish Live'}
                          >
                            {item.active !== false ? (
                              <>
                                <CheckCircle2 size={12} />
                                <span>Live on Wall</span>
                              </>
                            ) : (
                              <>
                                <Clock size={12} />
                                <span>Draft (Hidden)</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Media Stage (16:9 Thumbnail + Play Button + Badges) */}
                        <div className="admin-insider-card-media">
                          {item.thumbnail ? (
                            <img src={item.thumbnail} alt={item.name} loading="lazy" />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, #3d1b27 0%, #1c0a12 100%)', color: '#f7f5f0', gap: '6px' }}>
                              <Video size={36} opacity={0.6} />
                              <span style={{ fontSize: '11px', opacity: 0.6, letterSpacing: '0.5px' }}>NO THUMBNAIL</span>
                            </div>
                          )}

                          {item.orgBadge && (
                            <span className="admin-insider-media-badge">{item.orgBadge}</span>
                          )}
                          <span className="admin-insider-duration-badge">
                            <Clock size={11} /> {item.duration || '2:30'}
                          </span>

                          <button
                            type="button"
                            className="admin-insider-play-overlay"
                            onClick={() => setPreviewingVideo(item)}
                            title="Watch Video Story Preview"
                          >
                            <Play size={20} fill="currentColor" />
                          </button>
                        </div>

                        {/* Content Body */}
                        <div className="admin-insider-card-body">
                          {item.tag && (
                            <span className="admin-insider-card-tag">{item.tag}</span>
                          )}
                          <h3 className="admin-insider-card-title">{item.name}</h3>
                          <p className="admin-insider-card-role">{item.role}</p>

                          {item.quote && (
                            <blockquote className="admin-insider-card-quote">
                              “{item.quote}”
                            </blockquote>
                          )}

                          {/* Footer Info & Actions */}
                          <div className="admin-insider-card-footer">
                            <div>
                              {item.videoUrl ? (
                                <span className="admin-video-has-file-badge">
                                  <CheckCircle2 size={12} /> Video Attached
                                </span>
                              ) : (
                                <span className="admin-video-no-file-badge">
                                  <AlertCircle size={12} /> Text / Audio Story
                                </span>
                              )}
                            </div>

                            <div className="admin-btn-group">
                              <button
                                onClick={() => openEditInsiderModal(item)}
                                className="admin-btn-edit-prominent"
                                title="Edit this video story"
                              >
                                <Edit3 size={13} />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteInsider(item.id || item._id, item.name)}
                                className="admin-btn-action admin-btn-delete"
                                title="Delete Story"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })()}
            </div>
          )}

          {/* TAB 3: ACCOLADES & AWARDS MANAGER */}
          {activeTab === 'accolades' && (
            <div className="admin-tab-content">
              <div className="admin-content-header">
                <div>
                  <h1 className="admin-section-title">Accolades & Milestones</h1>
                  <p className="admin-section-desc">
                    Manage presidential honors, state recognition, awards, and historical milestones.
                  </p>
                </div>
                <button onClick={openNewAccoladeModal} className="admin-btn admin-btn-primary">
                  <Plus size={15} />
                  <span>Add New Accolade</span>
                </button>
              </div>

              {/* Featured Accolade Spotlight */}
              {accolades.featured && (
                <div className="admin-spotlight-card">
                  <div className="admin-spotlight-badge">
                    <Star size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    CURRENT FEATURED PINNACLE AWARD
                  </div>
                  <div className="admin-spotlight-content">
                    {accolades.featured.imageUrl && (
                      <img
                        src={accolades.featured.imageUrl}
                        alt=""
                        className="admin-spotlight-img"
                      />
                    )}
                    <div className="admin-spotlight-details">
                      <h3>
                        {accolades.featured.year} — {accolades.featured.title}
                      </h3>
                      <p><strong>Presented by:</strong> {accolades.featured.presentedBy || accolades.featured.presenter}</p>
                      <p>{accolades.featured.shortDesc}</p>
                      <div className="admin-btn-group" style={{ marginTop: '10px' }}>
                        <button
                          onClick={() => openEditAccoladeModal(accolades.featured)}
                          className="admin-btn admin-btn-secondary"
                        >
                          <Edit3 size={14} />
                          <span>Edit Featured Accolade</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Accolades Timeline List */}
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '60px' }}>Thumb</th>
                      <th>Year</th>
                      <th>Title & Summary</th>
                      <th>Presented By / Presenter</th>
                      <th>Badge</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accolades.timeline.map((acc) => (
                      <tr key={acc.id}>
                        <td>
                          {acc.imageUrl ? (
                            <img src={acc.imageUrl} alt="" className="admin-table-thumb" />
                          ) : (
                            <div className="admin-table-thumb-placeholder">
                              <Award size={18} color="#8c8278" />
                            </div>
                          )}
                        </td>
                        <td><strong>{acc.year}</strong></td>
                        <td>
                          <strong className="admin-item-title">{acc.title}</strong>
                          <p className="admin-item-snippet">{acc.shortDesc}</p>
                        </td>
                        <td>{acc.presentedBy || acc.presenter || '—'}</td>
                        <td>{acc.badge ? <span className="admin-tag">{acc.badge}</span> : '—'}</td>
                        <td>
                          <div className="admin-btn-group">
                            <button
                              onClick={() => openEditAccoladeModal(acc)}
                              className="admin-btn-action admin-btn-edit"
                            >
                              <Edit3 size={13} style={{ display: 'inline', marginRight: '4px' }} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAccolade(acc.id, acc.title)}
                              className="admin-btn-action admin-btn-delete"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CERTIFICATES & MEDIA GALLERY */}
          {activeTab === 'certificates' && (
            <div className="admin-tab-content">
              <div className="admin-content-header">
                <div>
                  <h1 className="admin-section-title">Certificates & Media Gallery</h1>
                  <p className="admin-section-desc">
                    Manage official 80G, 12A, Societies Registration certificates and photo gallery records on Cloudinary.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCertificateForm({ title: '', caption: '', year: '', imageUrl: '', order: certificates.length + 1 })
                    setShowCertModal(true)
                  }}
                  className="admin-btn admin-btn-primary"
                >
                  <Upload size={15} />
                  <span>Upload Certificate / Image</span>
                </button>
              </div>

              <div className="admin-media-grid">
                {certificates.map((cert) => (
                  <div key={cert._id || cert.id} className="admin-media-card">
                    <div className="admin-media-thumb-wrap">
                      <img src={cert.imageUrl} alt={cert.title} className="admin-media-img" />
                    </div>
                    <div className="admin-media-info">
                      <h4 className="admin-media-title">{cert.title}</h4>
                      {cert.year && <span className="admin-tag">{cert.year}</span>}
                      {cert.caption && <p className="admin-media-caption">{cert.caption}</p>}
                    </div>
                    <div className="admin-media-actions">
                      <button
                        onClick={() => handleDeleteCert(cert._id || cert.id, cert.title)}
                        className="admin-btn-action admin-btn-delete"
                      >
                        <Trash2 size={13} style={{ display: 'inline', marginRight: '4px' }} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FAQS MANAGER */}
          {activeTab === 'faqs' && (
            <div className="admin-tab-content">
              <div className="admin-content-header">
                <div>
                  <h1 className="admin-section-title">Frequently Asked Questions (FAQ)</h1>
                  <p className="admin-section-desc">
                    Add, edit, or remove public FAQ items for visitors, families, and donors.
                  </p>
                </div>
                <button onClick={openNewFaqModal} className="admin-btn admin-btn-primary">
                  <Plus size={15} />
                  <span>Add New FAQ</span>
                </button>
              </div>

              <div className="admin-faq-list">
                {faqs.map((faq, index) => (
                  <div key={faq._id || index} className="admin-faq-item">
                    <div className="admin-faq-header">
                      <h3>
                        <span className="admin-faq-number">Q{index + 1}.</span> {faq.question}
                      </h3>
                      <div className="admin-btn-group">
                        <button
                          onClick={() => openEditFaqModal(faq)}
                          className="admin-btn-action admin-btn-edit"
                        >
                          <Edit3 size={13} style={{ display: 'inline', marginRight: '4px' }} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(faq._id)}
                          className="admin-btn-action admin-btn-delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <div className="admin-faq-body">
                      <p>{faq.answer}</p>
                      {faq.category && <span className="admin-tag">{faq.category}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: INQUIRIES & MESSAGES INBOX */}
          {activeTab === 'inquiries' && (
            <div className="admin-tab-content">
              <div className="admin-content-header">
                <div>
                  <h1 className="admin-section-title">Messages & Contact Inquiries</h1>
                  <p className="admin-section-desc">
                    Submissions received from the public Contact and Volunteer forms.
                  </p>
                </div>
                <button onClick={loadInitialData} className="admin-btn admin-btn-secondary">
                  <RefreshCw size={14} />
                  <span>Refresh Inbox</span>
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div className="admin-empty-state">
                  <Mail size={40} color="#8c8278" style={{ marginBottom: '12px' }} />
                  <h3>No Inquiries Yet</h3>
                  <p>Messages submitted through the website contact forms will appear here.</p>
                </div>
              ) : (
                <div className="admin-inquiries-list">
                  {inquiries.map((inq) => (
                    <div
                      key={inq._id}
                      className={`admin-inquiry-card ${inq.status === 'read' ? 'is-read' : 'is-unread'}`}
                    >
                      <div className="admin-inquiry-top">
                        <div className="admin-inquiry-sender">
                          <strong>{inq.name}</strong>
                          <span className="admin-inquiry-meta">
                            <Mail size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                            <a href={`mailto:${inq.email}`}>{inq.email}</a>
                            {inq.phone && (
                              <>
                                {' · '}
                                <Phone size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                                {inq.phone}
                              </>
                            )}
                          </span>
                        </div>
                        <div className="admin-inquiry-time">
                          <span className="admin-tag">{inq.type || 'General'}</span>
                          <span className="admin-date-text">
                            <Clock size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                            {new Date(inq.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="admin-inquiry-message">
                        <p>{inq.message}</p>
                      </div>

                      <div className="admin-inquiry-footer">
                        <button
                          onClick={() => handleToggleInquiryStatus(inq._id, inq.status)}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          <Check size={14} />
                          <span>{inq.status === 'read' ? 'Mark as Unread' : 'Mark as Read'}</span>
                        </button>
                        <a
                          href={`mailto:${inq.email}?subject=Re: Swayamkrushi NGO Inquiry`}
                          className="admin-btn admin-btn-primary admin-btn-sm"
                        >
                          <Send size={13} />
                          <span>Reply by Email</span>
                        </a>
                        <button
                          onClick={() => handleDeleteInquiry(inq._id)}
                          className="admin-btn-action admin-btn-delete"
                          title="Delete message"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: WEBSITE CMS & SETTINGS */}
          {activeTab === 'settings' && (
            <div className="admin-tab-content">
              <div className="admin-content-header">
                <div>
                  <h1 className="admin-section-title">Website CMS & Global Settings</h1>
                  <p className="admin-section-desc">
                    Configure phone numbers, contact email, physical address, founder quotes, and bank donation details.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="admin-settings-form">
                <div className="admin-form-section">
                  <h2 className="admin-subsection-title">
                    <Building size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: '-3px' }} />
                    1. Organization & Contact Info
                  </h2>
                  <div className="admin-grid-2">
                    <div className="admin-form-group">
                      <label>Organization Name</label>
                      <input
                        type="text"
                        value={settings.orgName || ''}
                        onChange={(e) => setSettings({ ...settings, orgName: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Primary Email (used for SMTP & contact)</label>
                      <input
                        type="email"
                        value={settings.email || ''}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="admin-input"
                        placeholder="swayamkrushimk@gmail.com"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Primary Phone Number</label>
                      <input
                        type="text"
                        value={settings.phone1 || ''}
                        onChange={(e) => setSettings({ ...settings, phone1: e.target.value })}
                        className="admin-input"
                        placeholder="+91 9704245454"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Secondary Phone Number</label>
                      <input
                        type="text"
                        value={settings.phone2 || ''}
                        onChange={(e) => setSettings({ ...settings, phone2: e.target.value })}
                        className="admin-input"
                        placeholder="+91 9963766729"
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Physical Address</label>
                    <textarea
                      rows={2}
                      value={settings.address || ''}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="admin-textarea"
                      placeholder="Survey No.687, 688, Jawaharnagar Village..."
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Legal Registration Subtitle</label>
                    <input
                      type="text"
                      value={settings.regNo || ''}
                      onChange={(e) => setSettings({ ...settings, regNo: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div className="admin-form-section">
                  <h2 className="admin-subsection-title">
                    <Sparkles size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: '-3px' }} />
                    2. Taglines & Founder Quotes
                  </h2>
                  <div className="admin-form-group">
                    <label>Website Header Tagline</label>
                    <input
                      type="text"
                      value={settings.tagline || ''}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Founder Quotation</label>
                    <textarea
                      rows={3}
                      value={settings.founderQuote || ''}
                      onChange={(e) => setSettings({ ...settings, founderQuote: e.target.value })}
                      className="admin-textarea"
                    />
                  </div>
                </div>

                <div className="admin-form-section">
                  <h2 className="admin-subsection-title">
                    <CreditCard size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: '-3px' }} />
                    3. Bank Donation & Financial Info
                  </h2>
                  <div className="admin-grid-2">
                    <div className="admin-form-group">
                      <label>Bank Name</label>
                      <input
                        type="text"
                        value={settings.bankName || ''}
                        onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Account Number</label>
                      <input
                        type="text"
                        value={settings.accountNumber || ''}
                        onChange={(e) => setSettings({ ...settings, accountNumber: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>IFSC Code</label>
                      <input
                        type="text"
                        value={settings.ifscCode || ''}
                        onChange={(e) => setSettings({ ...settings, ifscCode: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>UPI ID</label>
                      <input
                        type="text"
                        value={settings.upiId || ''}
                        onChange={(e) => setSettings({ ...settings, upiId: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-form-section">
                  <h2 className="admin-subsection-title">
                    <FileImage size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: '-3px' }} />
                    4. Hero Circles & Visual Brand Assets (Public Website Top Section)
                  </h2>
                  <p style={{ fontSize: '13.5px', color: '#555', margin: '0 0 20px 0' }}>
                    Preview the live circular crop and upload new photos, adjust vertical face alignment, or paste direct image URLs for the interconnected hero circles and top-right badge.
                  </p>

                  <div className="admin-grid-3">
                    {/* 1. Left Circle (Excluded) */}
                    <div className="admin-circle-crop-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '12px' }}>
                        <span style={{ fontWeight: 800, fontSize: '12px', color: '#6e1e38', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                          1. Left Circle (Excluded)
                        </span>
                        <span className={`admin-crop-badge ${settings.circleLeftImage ? 'admin-crop-badge-custom' : 'admin-crop-badge-default'}`}>
                          {settings.circleLeftImage ? '● Custom Image' : '● Default Photo'}
                        </span>
                      </div>

                      {/* Interactive Circular Crop Live Preview */}
                      <div
                        className="admin-circle-crop-box-wrapper"
                        onClick={() => handleOpenCropModal(
                          settings.circleLeftImage || defaultCircleLeft,
                          'circleLeftImage',
                          setSettings,
                          'Crop Left Circle Photo (Excluded)',
                          'Drag, zoom, and rotate the photo into a round circle shape.'
                        )}
                        title="Click to open interactive circle cropper"
                      >
                        <div className="admin-circle-crop-box">
                          <img
                            src={settings.circleLeftImage || defaultCircleLeft}
                            alt="Left Circle Live Preview"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: settings.circleLeftPos || 'center 50%',
                              filter: 'grayscale(1) brightness(.92) contrast(1.05)'
                            }}
                            onError={(e) => { e.target.src = defaultCircleLeft }}
                          />
                        </div>
                        <div className="admin-circle-crop-overlay">
                          <Crop size={22} color="#e5a93c" />
                          <span>Crop Circle</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenCropModal(
                          settings.circleLeftImage || defaultCircleLeft,
                          'circleLeftImage',
                          setSettings,
                          'Crop Left Circle Photo (Excluded)',
                          'Drag, zoom, and rotate the photo into a round circle shape.'
                        )}
                        className="admin-circle-crop-trigger-btn"
                      >
                        <Crop size={14} />
                        <span>Interactive Circle Cropper</span>
                      </button>

                      <div style={{ width: '100%', textAlign: 'left', marginTop: '6px' }}>
                        <label style={{ fontSize: '11px', fontWeight: 700, color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                          Crop Focus / Alignment
                        </label>
                        <select
                          value={settings.circleLeftPos || 'center 50%'}
                          onChange={(e) => setSettings({ ...settings, circleLeftPos: e.target.value })}
                          className="admin-select"
                          style={{ fontSize: '12.5px', marginBottom: '10px' }}
                        >
                          <option value="center 30%">Top / Upper (30%)</option>
                          <option value="center 40%">Upper-Middle (40%)</option>
                          <option value="center 50%">Center (50%)</option>
                          <option value="center 60%">Lower-Middle (60%)</option>
                          <option value="center 70%">Bottom (70%)</option>
                        </select>

                        <label style={{ fontSize: '11px', fontWeight: 700, color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                          Upload & Crop New Photo
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileSelectForCrop(
                            e,
                            setSettings,
                            'circleLeftImage',
                            'Crop Left Circle Photo (Excluded)',
                            'Position and zoom the image inside the circular viewport.'
                          )}
                          className="admin-file-input"
                          disabled={uploadingImage}
                        />
                        <input
                          type="text"
                          placeholder="Or paste direct image URL..."
                          value={settings.circleLeftImage || ''}
                          onChange={(e) => setSettings({ ...settings, circleLeftImage: e.target.value })}
                          className="admin-input"
                          style={{ marginTop: '8px', fontSize: '12px' }}
                        />
                      </div>

                      {settings.circleLeftImage && (
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, circleLeftImage: '' })}
                          className="admin-btn-remove-img"
                          style={{ marginTop: '10px', width: '100%', textAlign: 'center' }}
                        >
                          Reset to Default Image
                        </button>
                      )}
                    </div>

                    {/* 2. Center Facilitator Circle (Founder) */}
                    <div className="admin-circle-crop-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '12px' }}>
                        <span style={{ fontWeight: 800, fontSize: '12px', color: '#6e1e38', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                          2. Center Facilitator
                        </span>
                        <span className={`admin-crop-badge ${settings.circleCenterImage ? 'admin-crop-badge-custom' : 'admin-crop-badge-default'}`}>
                          {settings.circleCenterImage ? '● Custom Image' : '● Default Photo'}
                        </span>
                      </div>

                      {/* Interactive Circular Crop Live Preview */}
                      <div
                        className="admin-circle-crop-box-wrapper"
                        onClick={() => handleOpenCropModal(
                          settings.circleCenterImage || defaultCircleCenter,
                          'circleCenterImage',
                          setSettings,
                          'Crop Facilitator Center Circle Photo',
                          'Drag, zoom, and rotate the photo into a round circle shape.'
                        )}
                        title="Click to open interactive circle cropper"
                      >
                        <div className="admin-circle-crop-box center-facilitator">
                          <img
                            src={settings.circleCenterImage || defaultCircleCenter}
                            alt="Center Circle Live Preview"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: settings.circleCenterPos || 'center 50%'
                            }}
                            onError={(e) => { e.target.src = defaultCircleCenter }}
                          />
                        </div>
                        <div className="admin-circle-crop-overlay">
                          <Crop size={22} color="#e5a93c" />
                          <span>Crop Circle</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenCropModal(
                          settings.circleCenterImage || defaultCircleCenter,
                          'circleCenterImage',
                          setSettings,
                          'Crop Facilitator Center Circle Photo',
                          'Drag, zoom, and rotate the photo into a round circle shape.'
                        )}
                        className="admin-circle-crop-trigger-btn"
                      >
                        <Crop size={14} />
                        <span>Interactive Circle Cropper</span>
                      </button>

                      <div style={{ width: '100%', textAlign: 'left', marginTop: '6px' }}>
                        <label style={{ fontSize: '11px', fontWeight: 700, color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                          Crop Focus / Alignment
                        </label>
                        <select
                          value={settings.circleCenterPos || 'center 50%'}
                          onChange={(e) => setSettings({ ...settings, circleCenterPos: e.target.value })}
                          className="admin-select"
                          style={{ fontSize: '12.5px', marginBottom: '10px' }}
                        >
                          <option value="center 30%">Top / Upper (30%)</option>
                          <option value="center 40%">Upper-Middle (40%)</option>
                          <option value="center 50%">Center (50%)</option>
                          <option value="center 60%">Lower-Middle (60%)</option>
                          <option value="center 70%">Bottom (70%)</option>
                        </select>

                        <label style={{ fontSize: '11px', fontWeight: 700, color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                          Upload & Crop New Photo
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileSelectForCrop(
                            e,
                            setSettings,
                            'circleCenterImage',
                            'Crop Facilitator Center Circle Photo',
                            'Position and zoom the image inside the circular viewport.'
                          )}
                          className="admin-file-input"
                          disabled={uploadingImage}
                        />
                        <input
                          type="text"
                          placeholder="Or paste direct image URL..."
                          value={settings.circleCenterImage || ''}
                          onChange={(e) => setSettings({ ...settings, circleCenterImage: e.target.value })}
                          className="admin-input"
                          style={{ marginTop: '8px', fontSize: '12px' }}
                        />
                      </div>

                      {settings.circleCenterImage && (
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, circleCenterImage: '' })}
                          className="admin-btn-remove-img"
                          style={{ marginTop: '10px', width: '100%', textAlign: 'center' }}
                        >
                          Reset to Default Image
                        </button>
                      )}
                    </div>

                    {/* 3. Right Circle (Included) */}
                    <div className="admin-circle-crop-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '12px' }}>
                        <span style={{ fontWeight: 800, fontSize: '12px', color: '#6e1e38', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                          3. Right Circle (Included)
                        </span>
                        <span className={`admin-crop-badge ${settings.circleRightImage ? 'admin-crop-badge-custom' : 'admin-crop-badge-default'}`}>
                          {settings.circleRightImage ? '● Custom Image' : '● Default Photo'}
                        </span>
                      </div>

                      {/* Interactive Circular Crop Live Preview */}
                      <div
                        className="admin-circle-crop-box-wrapper"
                        onClick={() => handleOpenCropModal(
                          settings.circleRightImage || defaultCircleRight,
                          'circleRightImage',
                          setSettings,
                          'Crop Right Circle Photo (Included)',
                          'Drag, zoom, and rotate the photo into a round circle shape.'
                        )}
                        title="Click to open interactive circle cropper"
                      >
                        <div className="admin-circle-crop-box">
                          <img
                            src={settings.circleRightImage || defaultCircleRight}
                            alt="Right Circle Live Preview"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: settings.circleRightPos || 'center 52%'
                            }}
                            onError={(e) => { e.target.src = defaultCircleRight }}
                          />
                        </div>
                        <div className="admin-circle-crop-overlay">
                          <Crop size={22} color="#e5a93c" />
                          <span>Crop Circle</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenCropModal(
                          settings.circleRightImage || defaultCircleRight,
                          'circleRightImage',
                          setSettings,
                          'Crop Right Circle Photo (Included)',
                          'Drag, zoom, and rotate the photo into a round circle shape.'
                        )}
                        className="admin-circle-crop-trigger-btn"
                      >
                        <Crop size={14} />
                        <span>Interactive Circle Cropper</span>
                      </button>

                      <div style={{ width: '100%', textAlign: 'left', marginTop: '6px' }}>
                        <label style={{ fontSize: '11px', fontWeight: 700, color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                          Crop Focus / Alignment
                        </label>
                        <select
                          value={settings.circleRightPos || 'center 52%'}
                          onChange={(e) => setSettings({ ...settings, circleRightPos: e.target.value })}
                          className="admin-select"
                          style={{ fontSize: '12.5px', marginBottom: '10px' }}
                        >
                          <option value="center 35%">Top / Faces Focus (35%)</option>
                          <option value="center 42%">Upper-Middle (42%)</option>
                          <option value="center 52%">Center 5-Persons (52%)</option>
                          <option value="center 60%">Lower-Middle (60%)</option>
                          <option value="center 70%">Bottom (70%)</option>
                        </select>

                        <label style={{ fontSize: '11px', fontWeight: 700, color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                          Upload & Crop New Photo
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileSelectForCrop(
                            e,
                            setSettings,
                            'circleRightImage',
                            'Crop Right Circle Photo (Included)',
                            'Position and zoom the image inside the circular viewport.'
                          )}
                          className="admin-file-input"
                          disabled={uploadingImage}
                        />
                        <input
                          type="text"
                          placeholder="Or paste direct image URL..."
                          value={settings.circleRightImage || ''}
                          onChange={(e) => setSettings({ ...settings, circleRightImage: e.target.value })}
                          className="admin-input"
                          style={{ marginTop: '8px', fontSize: '12px' }}
                        />
                      </div>

                      {settings.circleRightImage && (
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, circleRightImage: '' })}
                          className="admin-btn-remove-img"
                          style={{ marginTop: '10px', width: '100%', textAlign: 'center' }}
                        >
                          Reset to Default Image
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 4. Join Us Hero Floating Badge */}
                  <div className="admin-form-group" style={{ background: '#ffffff', border: '1px solid #e0d8cc', borderRadius: '8px', padding: '18px', marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 800, fontSize: '12px', color: '#6e1e38', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        Hero "Join Us" Floating Badge (Top-Right of Hero)
                      </span>
                      <span className={`admin-crop-badge ${settings.joinUsBadgeImage ? 'admin-crop-badge-custom' : 'admin-crop-badge-default'}`}>
                        {settings.joinUsBadgeImage ? '● Custom Badge' : '● Default Hand-Drawn Badge'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ width: '120px', height: '120px', padding: '10px', border: '2px dashed #6e1e38', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fcfaf6' }}>
                        <img
                          src={settings.joinUsBadgeImage || defaultJoinUsBadge}
                          alt="Badge Live Preview"
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                          onError={(e) => { e.target.src = defaultJoinUsBadge }}
                        />
                      </div>

                      <div style={{ flex: 1, minWidth: '260px' }}>
                        <div className="admin-image-picker-row">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, setSettings, 'joinUsBadgeImage')}
                            className="admin-file-input"
                            disabled={uploadingImage}
                          />
                          <span className="admin-or-divider">OR</span>
                          <input
                            type="text"
                            placeholder="Paste direct Badge Image URL..."
                            value={settings.joinUsBadgeImage || ''}
                            onChange={(e) => setSettings({ ...settings, joinUsBadgeImage: e.target.value })}
                            className="admin-input"
                          />
                        </div>
                        {settings.joinUsBadgeImage && (
                          <button
                            type="button"
                            onClick={() => setSettings({ ...settings, joinUsBadgeImage: '' })}
                            className="admin-btn-remove-img"
                            style={{ marginTop: '10px' }}
                          >
                            Reset to Default Badge
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="admin-form-actions">
                  <button type="submit" className="admin-btn admin-btn-primary admin-btn-lg">
                    <Check size={16} />
                    <span>Save CMS Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* ─── MODAL: ARTICLE CREATE / EDIT WITH TIPTAP ────────────────────── */}
      {showArticleModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal admin-modal-lg">
            <div className="admin-modal-header">
              <h2>{editingArticle ? 'Edit Article / Blog Post' : 'Write & Publish New Article'}</h2>
              <button onClick={() => setShowArticleModal(false)} className="admin-modal-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveArticle}>
              <div className="admin-form-group">
                <label>Article Title *</label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  placeholder="e.g., A Day in the Life at Swayamkrushi"
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label>Excerpt / Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                  placeholder="Brief 1-2 sentence hook displayed on frontpage cards..."
                  className="admin-textarea"
                />
              </div>

              <div className="admin-grid-3">
                <div className="admin-form-group">
                  <label>Section Placement</label>
                  <select
                    value={articleForm.section}
                    onChange={(e) => setArticleForm({ ...articleForm, section: e.target.value })}
                    className="admin-select"
                  >
                    <option value="main">Main / Center Column</option>
                    <option value="left">Left Column (The Compass)</option>
                    <option value="right">Right Column (The Chronicle)</option>
                    <option value="feature">Featured Highlight</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                    placeholder="Stories & Milestones"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Attribution / Byline</label>
                  <input
                    type="text"
                    value={articleForm.attribution}
                    onChange={(e) => setArticleForm({ ...articleForm, attribution: e.target.value })}
                    placeholder="Swayamkrushi Archives"
                    className="admin-input"
                  />
                </div>
              </div>

              {/* Media Display Mode & Featured Media (Photo or Video) */}
              <div className="admin-form-group">
                <div className="admin-thumb-toggle-header">
                  <label className="admin-thumb-toggle-label">
                    Featured Media / Thumbnail Mode
                  </label>
                  <div className="admin-thumb-toggle-switch">
                    <button
                      type="button"
                      className={`admin-toggle-pill ${articleForm.hasThumbnail !== false && articleForm.featuredMediaType !== 'video' && articleForm.mediaType !== 'video' && articleForm.featuredMediaType !== 'text' ? 'active-yes' : ''}`}
                      onClick={() => setArticleForm((prev) => ({ ...prev, hasThumbnail: true, featuredMediaType: 'image', mediaType: 'image' }))}
                    >
                      <FileImage size={13} /> Photo Image
                    </button>
                    <button
                      type="button"
                      className={`admin-toggle-pill ${articleForm.hasThumbnail !== false && (articleForm.featuredMediaType === 'video' || articleForm.mediaType === 'video') ? 'active-yes' : ''}`}
                      onClick={() => setArticleForm((prev) => ({ ...prev, hasThumbnail: true, featuredMediaType: 'video', mediaType: 'video' }))}
                    >
                      <Video size={13} /> Video Clip / Story
                    </button>
                    <button
                      type="button"
                      className={`admin-toggle-pill ${articleForm.hasThumbnail === false || articleForm.featuredMediaType === 'text' || articleForm.mediaType === 'text' ? 'active-no' : ''}`}
                      onClick={() => setArticleForm((prev) => ({ ...prev, hasThumbnail: false, featuredMediaType: 'text', mediaType: 'text' }))}
                    >
                      <X size={13} /> Text Only
                    </button>
                  </div>
                </div>

                {articleForm.hasThumbnail === false || articleForm.featuredMediaType === 'text' || articleForm.mediaType === 'text' ? (
                  <div className="admin-no-thumb-banner">
                    <AlertCircle size={16} className="admin-no-thumb-icon" />
                    <div>
                      <strong>Text-Only Card Format Active</strong>
                      <p>This article will display directly on the website without a thumbnail photo or video, featuring the headline, lede excerpt, attribution, and &ldquo;READ MORE&rdquo; link.</p>
                    </div>
                  </div>
                ) : articleForm.featuredMediaType === 'video' || articleForm.mediaType === 'video' ? (
                  <div className="admin-thumb-picker-container" style={{ borderLeft: '3px solid #6e1e38' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#3d342f', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                      <Video size={14} color="#6e1e38" /> 1. Upload Video File (MP4 / WebM) or Paste URL:
                    </label>
                    <div className="admin-image-picker-row">
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/ogg,video/quicktime"
                        onChange={(e) => handleArticleVideoUpload(e, setArticleForm, 'videoUrl')}
                        className="admin-file-input"
                        disabled={uploadingVideo}
                      />
                      <span className="admin-or-divider">OR</span>
                      <input
                        type="text"
                        placeholder="Paste video URL (e.g. Cloudinary MP4 CDN)"
                        value={articleForm.videoUrl || ''}
                        onChange={(e) => {
                          const val = e.target.value
                          const autoThumb = getVideoThumbnailUrl(val)
                          setArticleForm((prev) => ({
                            ...prev,
                            videoUrl: val,
                            videoThumbnailUrl: autoThumb || prev.videoThumbnailUrl,
                            featuredMediaType: 'video',
                            mediaType: 'video'
                          }))
                        }}
                        className="admin-input"
                      />
                    </div>
                    {uploadingVideo && <p className="admin-uploading-text" style={{ color: '#6e1e38', fontWeight: 600 }}>Uploading video to Cloudinary CDN & generating thumbnail...</p>}

                    {/* Optional Custom Poster / Thumbnail Photo */}
                    <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px dashed #ded7ce' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#3d342f', display: 'flex', alignItems: 'center', gap: '5px', margin: 0 }}>
                          <FileImage size={14} color="#6e1e38" /> 2. Optional Video Poster / Thumbnail Photo:
                        </label>
                        {articleForm.videoPosterUrl ? (
                          <span style={{ fontSize: '11px', color: '#6e1e38', fontWeight: 700 }}>Custom Poster Active</span>
                        ) : articleForm.videoUrl ? (
                          <span style={{ fontSize: '11px', color: '#2d6a4f' }}>✓ Auto Cloudinary JPG Thumbnail Active</span>
                        ) : null}
                      </div>
                      <div className="admin-image-picker-row">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, setArticleForm, 'videoPosterUrl')}
                          className="admin-file-input"
                          disabled={uploadingImage}
                        />
                        <span className="admin-or-divider">OR</span>
                        <input
                          type="text"
                          placeholder="Paste custom poster image URL"
                          value={articleForm.videoPosterUrl || ''}
                          onChange={(e) => setArticleForm({ ...articleForm, videoPosterUrl: e.target.value })}
                          className="admin-input"
                        />
                      </div>
                      {uploadingImage && <p className="admin-uploading-text">Uploading poster photo to Cloudinary...</p>}
                    </div>

                    {/* Live Video & Poster Preview */}
                    {(articleForm.videoUrl || articleForm.videoPosterUrl || articleForm.videoThumbnailUrl || articleForm.imageUrl) && (
                      <div className="admin-img-preview-box" style={{ marginTop: '14px', background: '#0d0709', padding: '12px', borderRadius: '6px' }}>
                        <div style={{ width: '100%', maxHeight: '220px', overflow: 'hidden', borderRadius: '4px' }}>
                          {articleForm.videoUrl ? (
                            <video
                              src={getDeliveryVideoUrl(articleForm.videoUrl)}
                              poster={articleForm.videoPosterUrl || articleForm.videoThumbnailUrl || getVideoThumbnailUrl(articleForm.videoUrl) || articleForm.imageUrl}
                              controls
                              style={{ width: '100%', maxHeight: '200px', display: 'block', background: '#000' }}
                            />
                          ) : (
                            <img
                              src={articleForm.videoPosterUrl || articleForm.videoThumbnailUrl || articleForm.imageUrl}
                              alt="Video Poster Preview"
                              style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                            />
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                          {articleForm.videoUrl && (
                            <button
                              type="button"
                              onClick={() => setArticleForm((prev) => ({ ...prev, videoUrl: '', videoThumbnailUrl: '' }))}
                              className="admin-btn-remove-img"
                            >
                              Remove Video
                            </button>
                          )}
                          {articleForm.videoPosterUrl && (
                            <button
                              type="button"
                              onClick={() => setArticleForm((prev) => ({ ...prev, videoPosterUrl: '' }))}
                              className="admin-btn-remove-img"
                              style={{ background: '#776e65' }}
                            >
                              Remove Custom Poster (Use Auto JPG)
                            </button>
                          )}
                          {(articleForm.videoThumbnailUrl || getVideoThumbnailUrl(articleForm.videoUrl)) && (
                            <a
                              href={articleForm.videoThumbnailUrl || getVideoThumbnailUrl(articleForm.videoUrl)}
                              target="_blank"
                              rel="noreferrer"
                              style={{ fontSize: '11px', color: '#f3c27b', textDecoration: 'underline', marginLeft: 'auto' }}
                            >
                              View Auto Thumbnail (.jpg)
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="admin-thumb-picker-container">
                    <div className="admin-image-picker-row">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, setArticleForm, 'imageUrl')}
                        className="admin-file-input"
                        disabled={uploadingImage}
                      />
                      <span className="admin-or-divider">OR</span>
                      <input
                        type="text"
                        placeholder="Paste image URL (e.g. Cloudinary CDN)"
                        value={articleForm.imageUrl || ''}
                        onChange={(e) => setArticleForm({ ...articleForm, imageUrl: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    {uploadingImage && <p className="admin-uploading-text">Uploading image to Cloudinary...</p>}
                    {articleForm.imageUrl && (
                      <div className="admin-img-preview-box">
                        <div className="admin-preview-img-wrapper">
                          <img src={articleForm.imageUrl} alt="Cover Preview" className="admin-preview-img" />
                          <button
                            type="button"
                            onClick={() => setArticleForm((prev) => ({ ...prev, imageUrl: '' }))}
                            className="admin-img-remove-btn-corner"
                            title="Remove cover image (✕)"
                            aria-label="Remove image"
                          >
                            <X size={12} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => setArticleForm((prev) => ({ ...prev, imageUrl: '' }))}
                          className="admin-btn-remove-img"
                        >
                          Remove Photo
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 🌟 TIPTAP RICH TEXT & MEDIA EDITOR */}
              <div className="admin-form-group">
                <label>Article Body & Rich Story Content (Tiptap Editor)</label>
                <p style={{ fontSize: '12px', color: '#776e65', margin: '0 0 8px 0' }}>
                  Use formatting tools below to add headings, bold/italics, quotes, alignments, multiple inline images to Cloudinary, and YouTube videos.
                </p>
                <TiptapEditor
                  content={articleForm.contentHtml}
                  onChange={(html) => setArticleForm((prev) => ({ ...prev, contentHtml: html }))}
                  placeholder="Type your story here... You can embed photos, format headings, and add quotes."
                />
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Display Priority / Order</label>
                  <input
                    type="number"
                    value={articleForm.order}
                    onChange={(e) => setArticleForm({ ...articleForm, order: Number(e.target.value) })}
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group admin-checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={articleForm.featured}
                      onChange={(e) => setArticleForm({ ...articleForm, featured: e.target.checked })}
                    />
                    Mark as Spotlight / Featured Article
                  </label>
                </div>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <Check size={15} />
                  <span>{editingArticle ? 'Save Changes' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: ACCOLADE CREATE / EDIT ──────────────────────────────── */}
      {showAccoladeModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>{editingAccolade ? 'Edit Accolade' : 'Add New Accolade'}</h2>
              <button onClick={() => setShowAccoladeModal(false)} className="admin-modal-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAccolade}>
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Year *</label>
                  <input
                    type="text"
                    required
                    value={accoladeForm.year}
                    onChange={(e) => setAccoladeForm({ ...accoladeForm, year: e.target.value })}
                    placeholder="e.g. 2004 or 1999"
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Badge / Category</label>
                  <input
                    type="text"
                    value={accoladeForm.badge}
                    onChange={(e) => setAccoladeForm({ ...accoladeForm, badge: e.target.value })}
                    placeholder="e.g. National Honor"
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Accolade Title *</label>
                <input
                  type="text"
                  required
                  value={accoladeForm.title}
                  onChange={(e) => setAccoladeForm({ ...accoladeForm, title: e.target.value })}
                  placeholder="e.g. National Award from President Dr. A.P.J. Abdul Kalam"
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label>Presented By / Presenter</label>
                <input
                  type="text"
                  value={accoladeForm.presentedBy}
                  onChange={(e) => setAccoladeForm({ ...accoladeForm, presentedBy: e.target.value })}
                  placeholder="e.g. Ministry of Social Justice & Empowerment"
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label>Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={accoladeForm.shortDesc}
                  onChange={(e) => setAccoladeForm({ ...accoladeForm, shortDesc: e.target.value })}
                  className="admin-textarea"
                />
              </div>

              <div className="admin-form-group">
                <label>Full Story / Description</label>
                <textarea
                  rows={3}
                  value={accoladeForm.fullDesc}
                  onChange={(e) => setAccoladeForm({ ...accoladeForm, fullDesc: e.target.value })}
                  className="admin-textarea"
                />
              </div>

              <div className="admin-form-group">
                <label>Photo / Award Image (Upload to Cloudinary)</label>
                <div className="admin-image-picker-row">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setAccoladeForm, 'imageUrl')}
                    className="admin-file-input"
                    disabled={uploadingImage}
                  />
                  <span className="admin-or-divider">OR</span>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={accoladeForm.imageUrl}
                    onChange={(e) => setAccoladeForm({ ...accoladeForm, imageUrl: e.target.value })}
                    className="admin-input"
                  />
                </div>
                {accoladeForm.imageUrl && (
                  <div className="admin-img-preview-box">
                    <div className="admin-preview-img-wrapper">
                      <img src={accoladeForm.imageUrl} alt="Preview" className="admin-preview-img" />
                      <button
                        type="button"
                        onClick={() => setAccoladeForm((prev) => ({ ...prev, imageUrl: '' }))}
                        className="admin-img-remove-btn-corner"
                        title="Remove image (✕)"
                        aria-label="Remove image"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAccoladeForm((prev) => ({ ...prev, imageUrl: '' }))}
                      className="admin-btn-remove-img"
                    >
                      Remove Photo
                    </button>
                  </div>
                )}
              </div>

              <div className="admin-form-group admin-checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={accoladeForm.isFeatured}
                    onChange={(e) => setAccoladeForm({ ...accoladeForm, isFeatured: e.target.checked })}
                  />
                  Set as Highlighted Pinnacle Award (Main Spotlight)
                </label>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowAccoladeModal(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <Check size={15} />
                  <span>{editingAccolade ? 'Save Changes' : 'Add Accolade'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: CERTIFICATE UPLOAD ──────────────────────────────────── */}
      {showCertModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>Upload Certificate or Media Document</h2>
              <button onClick={() => setShowCertModal(false)} className="admin-modal-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCertificate}>
              <div className="admin-form-group">
                <label>Certificate Title *</label>
                <input
                  type="text"
                  required
                  value={certificateForm.title}
                  onChange={(e) => setCertificateForm({ ...certificateForm, title: e.target.value })}
                  placeholder="e.g. 80G Tax Exemption Certificate"
                  className="admin-input"
                />
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Year / Validity</label>
                  <input
                    type="text"
                    value={certificateForm.year}
                    onChange={(e) => setCertificateForm({ ...certificateForm, year: e.target.value })}
                    placeholder="e.g. 2024-2029"
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Order</label>
                  <input
                    type="number"
                    value={certificateForm.order}
                    onChange={(e) => setCertificateForm({ ...certificateForm, order: Number(e.target.value) })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Caption / Notes</label>
                <input
                  type="text"
                  value={certificateForm.caption}
                  onChange={(e) => setCertificateForm({ ...certificateForm, caption: e.target.value })}
                  placeholder="e.g. Issued by Director of Income Tax"
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label>Certificate Image / Document *</label>
                <div className="admin-image-picker-row">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setCertificateForm, 'imageUrl')}
                    className="admin-file-input"
                    disabled={uploadingImage}
                  />
                  <span className="admin-or-divider">OR</span>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={certificateForm.imageUrl}
                    onChange={(e) => setCertificateForm({ ...certificateForm, imageUrl: e.target.value })}
                    className="admin-input"
                    required
                  />
                </div>
                {certificateForm.imageUrl && (
                  <div className="admin-img-preview-box">
                    <div className="admin-preview-img-wrapper">
                      <img src={certificateForm.imageUrl} alt="Preview" className="admin-preview-img" />
                      <button
                        type="button"
                        onClick={() => setCertificateForm((prev) => ({ ...prev, imageUrl: '' }))}
                        className="admin-img-remove-btn-corner"
                        title="Remove document (✕)"
                        aria-label="Remove image"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCertificateForm((prev) => ({ ...prev, imageUrl: '' }))}
                      className="admin-btn-remove-img"
                    >
                      Remove Document
                    </button>
                  </div>
                )}
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowCertModal(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <Upload size={15} />
                  <span>Upload & Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: FAQ CREATE / EDIT ────────────────────────────────────── */}
      {showFaqModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>{editingFaq ? 'Edit FAQ Item' : 'Add New FAQ Item'}</h2>
              <button onClick={() => setShowFaqModal(false)} className="admin-modal-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveFaq}>
              <div className="admin-form-group">
                <label>Question *</label>
                <input
                  type="text"
                  required
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  placeholder="e.g. How can I sponsor a resident?"
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label>Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  placeholder="Detailed answer for visitors..."
                  className="admin-textarea"
                />
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={faqForm.category}
                    onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                    placeholder="General / Admissions / Donations"
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Order</label>
                  <input
                    type="number"
                    value={faqForm.order}
                    onChange={(e) => setFaqForm({ ...faqForm, order: Number(e.target.value) })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowFaqModal(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <Check size={15} />
                  <span>{editingFaq ? 'Save Changes' : 'Create FAQ'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: INSIDERS VIDEO CREATE / EDIT ─────────────────────────── */}
      {showInsiderModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '720px' }}>
            <div className="admin-modal-header">
              <div>
                <h2>{editingInsider ? `Edit Story: ${editingInsider.name}` : 'Add New Insider Video Story'}</h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#665c54' }}>
                  {editingInsider ? 'Update speaker details, change video files, or edit quote text.' : 'Fill in the speaker info, upload thumbnail & video file, and set the featured quote.'}
                </p>
              </div>
              <button onClick={() => setShowInsiderModal(false)} className="admin-modal-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveInsider}>
              {/* SECTION 1: SPEAKER & CATEGORY */}
              <div className="admin-form-card">
                <h3 className="admin-form-card-title">
                  <Users size={15} /> 1. Speaker & Role Information
                </h3>
                
                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>Speaker Name *</label>
                    <input
                      type="text"
                      required
                      value={insiderForm.name}
                      onChange={(e) => setInsiderForm({ ...insiderForm, name: e.target.value })}
                      placeholder="e.g. Ms Manjula Kalyan"
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Category *</label>
                    <select
                      value={insiderForm.category}
                      onChange={(e) => setInsiderForm({ ...insiderForm, category: e.target.value })}
                      className="admin-select"
                    >
                      <option value="Educators & Staff">Educators & Staff</option>
                      <option value="Therapists">Therapists</option>
                      <option value="Alumni & Trainees">Alumni & Trainees</option>
                      <option value="Parents & Families">Parents & Families</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Designation / Role / Organization *</label>
                  <input
                    type="text"
                    required
                    value={insiderForm.role}
                    onChange={(e) => setInsiderForm({ ...insiderForm, role: e.target.value })}
                    placeholder="e.g. Founder & Director, Swayamkrushi"
                    className="admin-input"
                  />
                </div>

                <div className="admin-grid-3">
                  <div className="admin-form-group">
                    <label>Eyebrow Tag</label>
                    <input
                      type="text"
                      value={insiderForm.tag}
                      onChange={(e) => setInsiderForm({ ...insiderForm, tag: e.target.value })}
                      placeholder="e.g. FOUNDER REFLECTIONS"
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Department Badge</label>
                    <input
                      type="text"
                      value={insiderForm.orgBadge}
                      onChange={(e) => setInsiderForm({ ...insiderForm, orgBadge: e.target.value })}
                      placeholder="e.g. DIRECTOR / CLINIC / ALUMNUS"
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Duration</span>
                      <span style={{ fontSize: '11px', color: '#6e1e38', fontWeight: 700 }}>
                        {insiderForm.duration ? `Auto: ${insiderForm.duration}` : 'Auto-detected'}
                      </span>
                    </label>
                    <input
                      type="text"
                      value={insiderForm.duration}
                      onChange={(e) => setInsiderForm({ ...insiderForm, duration: e.target.value })}
                      placeholder="e.g. 2:18 (Auto-extracted from video)"
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: MEDIA UPLOADS (THUMBNAIL & VIDEO) */}
              <div className="admin-form-card">
                <h3 className="admin-form-card-title">
                  <Video size={15} /> 2. Media Uploads & Video File
                </h3>

                {/* Thumbnail Upload */}
                <div className="admin-form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Upload size={13} /> Video Thumbnail Image
                  </label>
                  <div className="admin-file-upload-row" style={{ marginTop: '6px' }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="admin-file-input"
                      disabled={uploadingThumbnail}
                    />
                    <span className="admin-or-divider">OR URL</span>
                    <input
                      type="text"
                      placeholder="Paste thumbnail URL"
                      value={insiderForm.thumbnail}
                      onChange={(e) => setInsiderForm({ ...insiderForm, thumbnail: e.target.value })}
                      className="admin-input"
                      style={{ flex: 1, minWidth: '180px' }}
                    />
                  </div>
                  {uploadingThumbnail && (
                    <p className="admin-uploading-text">Uploading thumbnail image to Cloudinary...</p>
                  )}
                  {insiderForm.thumbnail && (
                    <div className="admin-img-preview-box" style={{ marginTop: '8px' }}>
                      <img src={insiderForm.thumbnail} alt="Thumbnail Preview" className="admin-preview-img" style={{ maxHeight: '110px' }} />
                      <button
                        type="button"
                        onClick={() => setInsiderForm({ ...insiderForm, thumbnail: '' })}
                        className="admin-btn-remove-img"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Video Upload */}
                <div className="admin-form-group">
                  <label style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Play size={13} /> Video Media File (MP4, Cloudinary Video, WebM)
                  </label>
                  <div className="admin-file-upload-row" style={{ marginTop: '6px' }}>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/ogg,video/quicktime"
                      onChange={handleVideoUpload}
                      className="admin-file-input"
                      disabled={uploadingVideo}
                    />
                    <span className="admin-or-divider">OR URL</span>
                    <input
                      type="text"
                      placeholder="Paste video file URL or Cloudinary stream link"
                      value={insiderForm.videoUrl}
                      onChange={(e) => {
                        const url = e.target.value
                        setInsiderForm({ ...insiderForm, videoUrl: url })
                        if (url && (url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:'))) {
                          try {
                            const v = document.createElement('video')
                            v.preload = 'metadata'
                            v.src = url
                            v.onloadedmetadata = () => {
                              const sec = Math.round(v.duration)
                              if (!isNaN(sec) && sec > 0) {
                                const mins = Math.floor(sec / 60)
                                const rem = sec % 60
                                const fmt = `${mins}:${rem.toString().padStart(2, '0')}`
                                setInsiderForm((prev) => ({ ...prev, duration: fmt }))
                              }
                            }
                          } catch (err) {}
                        }
                      }}
                      className="admin-input"
                      style={{ flex: 1, minWidth: '180px' }}
                    />
                  </div>
                  {uploadingVideo && (
                    <p className="admin-uploading-text">Uploading video to Cloudinary & auto-calculating duration...</p>
                  )}
                  {insiderForm.videoUrl && (
                    <div style={{ marginTop: '10px', borderRadius: '6px', overflow: 'hidden', background: '#000', maxHeight: '140px', position: 'relative' }}>
                      <video
                        src={getDeliveryVideoUrl(insiderForm.videoUrl)}
                        controls
                        onLoadedMetadata={(e) => {
                          const sec = Math.round(e.target.duration)
                          if (!isNaN(sec) && sec > 0) {
                            const mins = Math.floor(sec / 60)
                            const rem = sec % 60
                            const fmt = `${mins}:${rem.toString().padStart(2, '0')}`
                            setInsiderForm((prev) => ({ ...prev, duration: fmt }))
                          }
                        }}
                        style={{ width: '100%', maxHeight: '140px', objectFit: 'contain' }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 3: QUOTE & STORY DESCRIPTION */}
              <div className="admin-form-card">
                <h3 className="admin-form-card-title">
                  <Sparkles size={15} /> 3. Featured Quote & Story Description
                </h3>

                <div className="admin-form-group">
                  <label>Featured Quote (Key Highlight shown on Card)</label>
                  <textarea
                    rows={2}
                    value={insiderForm.quote}
                    onChange={(e) => setInsiderForm({ ...insiderForm, quote: e.target.value })}
                    placeholder="e.g. Every child deserves to live their best life. We don’t just teach them daily routines; we give them dignity and a lifelong family."
                    className="admin-textarea"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Story Description / Transcript Summary</label>
                  <textarea
                    rows={3}
                    value={insiderForm.description}
                    onChange={(e) => setInsiderForm({ ...insiderForm, description: e.target.value })}
                    placeholder="Full background context, narrative, or interview description..."
                    className="admin-textarea"
                  />
                </div>
              </div>

              {/* SECTION 4: DISPLAY ORDER & STATUS */}
              <div className="admin-form-card">
                <h3 className="admin-form-card-title">
                  <Layers size={15} /> 4. Visibility & Wall Placement
                </h3>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>Display Order (Lower numbers show first)</label>
                    <input
                      type="number"
                      value={insiderForm.order}
                      onChange={(e) => setInsiderForm({ ...insiderForm, order: Number(e.target.value) })}
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group admin-checkbox-group" style={{ marginTop: '24px' }}>
                    <label>
                      <input
                        type="checkbox"
                        checked={insiderForm.active}
                        onChange={(e) => setInsiderForm({ ...insiderForm, active: e.target.checked })}
                      />
                      <span><strong>Publish Live</strong> on public Insiders wall</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowInsiderModal(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <Check size={16} />
                  <span>{editingInsider ? 'Save Changes' : 'Publish Video Story'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: VIDEO PREVIEW ────────────────────────────────────────── */}
      {previewingVideo && (
        <div className="admin-modal-overlay" onClick={() => setPreviewingVideo(null)}>
          <div className="admin-modal" style={{ maxWidth: '640px', background: '#ffffff', padding: '0', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#1b1418' }}>
              <button
                onClick={() => setPreviewingVideo(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  zIndex: 10,
                  background: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>

              {previewingVideo.videoUrl ? (
                <video
                  src={getDeliveryVideoUrl(previewingVideo.videoUrl)}
                  poster={previewingVideo.thumbnail}
                  controls
                  autoPlay
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  {previewingVideo.thumbnail && (
                    <img src={previewingVideo.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#6e1e38', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Play size={24} fill="currentColor" />
                    </div>
                    <span style={{ fontSize: '12px', color: '#f7f5f0' }}>No direct video file uploaded (Audio/Text story)</span>
                  </div>
                </div>
              )}
            </div>

            <div style={{ padding: '20px 24px' }}>
              <span style={{ color: '#6e1e38', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                {previewingVideo.tag} · {previewingVideo.duration}
              </span>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#2d161e', margin: '4px 0 2px' }}>
                {previewingVideo.name}
              </h2>
              <p style={{ fontSize: '13px', color: '#666', margin: '0 0 14px' }}>
                {previewingVideo.role}
              </p>

              {previewingVideo.quote && (
                <blockquote style={{ background: '#fbf9f5', borderLeft: '3px solid #6e1e38', padding: '10px 14px', margin: '0 0 12px', fontStyle: 'italic', fontSize: '13.5px', color: '#333' }}>
                  “{previewingVideo.quote}”
                </blockquote>
              )}

              {previewingVideo.description && (
                <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#555', margin: 0 }}>
                  {previewingVideo.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: MANAGING COMMITTEE CREATE / EDIT ─────────────────────── */}
      {showCommitteeModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '680px' }}>
            <div className="admin-modal-header">
              <h2>{editingCommitteeMember ? `Edit Member: ${editingCommitteeMember.name}` : 'Add New Committee Member'}</h2>
              <button onClick={() => setShowCommitteeModal(false)} className="admin-modal-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCommittee}>
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={committeeForm.name}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, name: e.target.value })}
                    placeholder="e.g. Dr. Manjulaa Kalyaan"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Governance Category *</label>
                  <select
                    value={committeeForm.roleCategory}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, roleCategory: e.target.value })}
                    className="admin-select"
                  >
                    <option value="Founder">Founder Director</option>
                    <option value="Patron">Patron</option>
                    <option value="Presidency">Presidency (President / VP)</option>
                    <option value="Secretariat">Secretariat (Secretary)</option>
                    <option value="Executive">Executive Committee</option>
                    <option value="General">General Board</option>
                  </select>
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Board Role Title *</label>
                  <input
                    type="text"
                    required
                    value={committeeForm.role}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, role: e.target.value })}
                    placeholder="e.g. Founder & Director or President"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Card Badge Text</label>
                  <input
                    type="text"
                    value={committeeForm.badge}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, badge: e.target.value })}
                    placeholder="e.g. FOUNDER DIRECTOR or PRESIDENT"
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Official Designation</label>
                  <input
                    type="text"
                    value={committeeForm.designation}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, designation: e.target.value })}
                    placeholder="e.g. Founder Director, Swayamkrushi or Advocate, Supreme Court BAR"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Color Theme</label>
                  <select
                    value={committeeForm.colorTheme}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, colorTheme: e.target.value })}
                    className="admin-select"
                  >
                    <option value="burgundy">Burgundy / Claret (Founder & Leadership)</option>
                    <option value="gold">Gold / Amber (Patrons & Honors)</option>
                    <option value="indigo">Indigo / Royal Blue (Presidency & Secretariat)</option>
                    <option value="slate">Slate / Charcoal (Executive Members)</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-group">
                <label>Key Credentials & Honors</label>
                <input
                  type="text"
                  value={committeeForm.credentials}
                  onChange={(e) => setCommitteeForm({ ...committeeForm, credentials: e.target.value })}
                  placeholder="e.g. Four-time National Award Winner · RCI Nominated Expert"
                  className="admin-input"
                />
              </div>

              {/* Portrait Image */}
              <div className="admin-form-group">
                <label>Portrait Photo (Upload or Paste URL)</label>
                <div className="admin-image-picker-row">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setCommitteeForm, 'image')}
                    className="admin-file-input"
                    disabled={uploadingImage}
                  />
                  <span className="admin-or-divider">OR</span>
                  <input
                    type="text"
                    placeholder="Paste image URL (e.g. Cloudinary / Imgur)"
                    value={committeeForm.image}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, image: e.target.value })}
                    className="admin-input"
                  />
                </div>
                {uploadingImage && <p className="admin-uploading-text">Uploading photo to Cloudinary...</p>}
                {committeeForm.image && (
                  <div className="admin-img-preview-box" style={{ marginTop: '10px' }}>
                    <div className="admin-preview-img-wrapper" style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden' }}>
                      <img src={committeeForm.image} alt="Portrait Preview" className="admin-preview-img" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      <button
                        type="button"
                        onClick={() => setCommitteeForm((prev) => ({ ...prev, image: '' }))}
                        className="admin-img-remove-btn-corner"
                        title="Remove photo"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCommitteeForm((prev) => ({ ...prev, image: '' }))}
                      className="admin-btn-remove-img"
                    >
                      Remove Photo (Use Monogram)
                    </button>
                  </div>
                )}
              </div>

              <div className="admin-form-group">
                <label>Biography & Governance Profile *</label>
                <textarea
                  rows={4}
                  required
                  value={committeeForm.bio}
                  onChange={(e) => setCommitteeForm({ ...committeeForm, bio: e.target.value })}
                  placeholder="Comprehensive profile, background, societal contributions, and role at Swayamkrushi..."
                  className="admin-textarea"
                />
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={committeeForm.tags}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, tags: e.target.value })}
                    placeholder="e.g. Founded 1991, 4x National Awardee, Group Homes Pioneer"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Display Order / Priority</label>
                  <input
                    type="number"
                    value={committeeForm.order}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, order: Number(e.target.value) })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowCommitteeModal(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" style={{ background: '#6e1e38' }}>
                  <Check size={16} />
                  <span>{editingCommitteeMember ? 'Save Changes' : 'Add Committee Member'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: MEDIA BUZZ & PRESS CREATE / EDIT ─────────────────────── */}
      {showMediaBuzzModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '680px' }}>
            <div className="admin-modal-header">
              <h2>{editingMediaBuzz ? `Edit Press: ${editingMediaBuzz.title}` : 'Add New Media Buzz Report'}</h2>
              <button onClick={() => setShowMediaBuzzModal(false)} className="admin-modal-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveMediaBuzz}>
              <div className="admin-form-group">
                <label>Article Headline / Report Title *</label>
                <input
                  type="text"
                  required
                  value={mediaBuzzForm.title}
                  onChange={(e) => setMediaBuzzForm({ ...mediaBuzzForm, title: e.target.value })}
                  placeholder="e.g. NGO Celebrates 35 Years of Serving Persons with Intellectual Disabilities"
                  className="admin-input"
                />
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Publication / News Outlet *</label>
                  <input
                    type="text"
                    required
                    value={mediaBuzzForm.outlet}
                    onChange={(e) => setMediaBuzzForm({ ...mediaBuzzForm, outlet: e.target.value })}
                    placeholder="e.g. The Hindu, Sakshi, Telangana Today, NewsMeter"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Outlet Type *</label>
                  <select
                    value={mediaBuzzForm.outletType}
                    onChange={(e) => setMediaBuzzForm({ ...mediaBuzzForm, outletType: e.target.value })}
                    className="admin-select"
                  >
                    <option value="Print & Newspapers">Print & Newspapers</option>
                    <option value="Digital & Magazines">Digital & Magazines</option>
                    <option value="TV & Broadcast">TV & Broadcast</option>
                    <option value="Radio & Podcasts">Radio & Podcasts</option>
                  </select>
                </div>
              </div>

              <div className="admin-grid-3">
                <div className="admin-form-group">
                  <label>Publication Date</label>
                  <input
                    type="text"
                    value={mediaBuzzForm.date}
                    onChange={(e) => setMediaBuzzForm({ ...mediaBuzzForm, date: e.target.value })}
                    placeholder="e.g. August 2026 or 09/08/2026"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={mediaBuzzForm.category}
                    onChange={(e) => setMediaBuzzForm({ ...mediaBuzzForm, category: e.target.value })}
                    placeholder="e.g. Newspaper Clipping or In-Depth Feature"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Badge Text</label>
                  <input
                    type="text"
                    value={mediaBuzzForm.badge}
                    onChange={(e) => setMediaBuzzForm({ ...mediaBuzzForm, badge: e.target.value })}
                    placeholder="e.g. THE HINDU SPOTLIGHT"
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Article Live URL / Web Link</label>
                  <input
                    type="url"
                    value={mediaBuzzForm.articleUrl}
                    onChange={(e) => setMediaBuzzForm({ ...mediaBuzzForm, articleUrl: e.target.value })}
                    placeholder="https://..."
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Alternative Share / E-Paper Link</label>
                  <input
                    type="url"
                    value={mediaBuzzForm.shareUrl}
                    onChange={(e) => setMediaBuzzForm({ ...mediaBuzzForm, shareUrl: e.target.value })}
                    placeholder="https://share.google/..."
                    className="admin-input"
                  />
                </div>
              </div>

              {/* Media Image / Newspaper Clipping */}
              <div className="admin-form-group">
                <label>Clipping Photo / Cover Image (Upload or Paste URL)</label>
                <div className="admin-image-picker-row">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setMediaBuzzForm, 'image')}
                    className="admin-file-input"
                    disabled={uploadingImage}
                  />
                  <span className="admin-or-divider">OR</span>
                  <input
                    type="text"
                    placeholder="Paste image URL (e.g. Cloudinary CDN)"
                    value={mediaBuzzForm.image}
                    onChange={(e) => setMediaBuzzForm({ ...mediaBuzzForm, image: e.target.value })}
                    className="admin-input"
                  />
                </div>
                {uploadingImage && <p className="admin-uploading-text">Uploading image to Cloudinary...</p>}
                {mediaBuzzForm.image && (
                  <div className="admin-img-preview-box" style={{ marginTop: '10px' }}>
                    <div className="admin-preview-img-wrapper" style={{ maxHeight: '140px' }}>
                      <img src={mediaBuzzForm.image} alt="Cover Preview" className="admin-preview-img" style={{ maxHeight: '140px', objectFit: 'contain' }} />
                      <button
                        type="button"
                        onClick={() => setMediaBuzzForm((prev) => ({ ...prev, image: '' }))}
                        className="admin-img-remove-btn-corner"
                        title="Remove image"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMediaBuzzForm((prev) => ({ ...prev, image: '' }))}
                      className="admin-btn-remove-img"
                    >
                      Remove Image
                    </button>
                  </div>
                )}
              </div>

              <div className="admin-form-group admin-checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={mediaBuzzForm.isClipping}
                    onChange={(e) => setMediaBuzzForm({ ...mediaBuzzForm, isClipping: e.target.checked })}
                  />
                  <span><strong>Physical Newspaper / Magazine Scan Clipping</strong> (Displays scan frame on website)</span>
                </label>
              </div>

              <div className="admin-form-group">
                <label>Excerpt / Summary Preview *</label>
                <textarea
                  rows={3}
                  required
                  value={mediaBuzzForm.excerpt}
                  onChange={(e) => setMediaBuzzForm({ ...mediaBuzzForm, excerpt: e.target.value })}
                  placeholder="Key highlight, opening sentences or full summary of the news story..."
                  className="admin-textarea"
                />
              </div>

              <div className="admin-grid-3">
                <div className="admin-form-group">
                  <label>Read Time / Format</label>
                  <input
                    type="text"
                    value={mediaBuzzForm.readTime}
                    onChange={(e) => setMediaBuzzForm({ ...mediaBuzzForm, readTime: e.target.value })}
                    placeholder="e.g. 5 min read, Newspaper Report"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={mediaBuzzForm.tags}
                    onChange={(e) => setMediaBuzzForm({ ...mediaBuzzForm, tags: e.target.value })}
                    placeholder="The Hindu, 35th Anniversary"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Display Priority</label>
                  <input
                    type="number"
                    value={mediaBuzzForm.order}
                    onChange={(e) => setMediaBuzzForm({ ...mediaBuzzForm, order: Number(e.target.value) })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-form-group admin-checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={mediaBuzzForm.featured}
                    onChange={(e) => setMediaBuzzForm({ ...mediaBuzzForm, featured: e.target.checked })}
                  />
                  <span><strong>Pin to Featured Spotlights</strong> (Highlighted with Gold border at the top of Media Buzz)</span>
                </label>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowMediaBuzzModal(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" style={{ background: '#ea580c' }}>
                  <Check size={16} />
                  <span>{editingMediaBuzz ? 'Save Changes' : 'Publish Media Buzz Report'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: INTERACTIVE CIRCLE CROPPER ───────────────────────────── */}
      <CircleCropModal
        isOpen={cropModal.isOpen}
        imageSrc={cropModal.imageSrc}
        title={cropModal.title}
        subtitle={cropModal.subtitle}
        onClose={() => setCropModal((prev) => ({ ...prev, isOpen: false }))}
        onSaveCroppedImage={handleSaveCroppedResult}
      />
    </div>
  )
}
