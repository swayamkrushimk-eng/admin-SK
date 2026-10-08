// Admin API Service connecting to Swayamkrushi Backend Server
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.swayamkrushi.org/api'

// ─── ADMIN AUTH & STATS ──────────────────────────────────────────────────
export async function adminLogin(password) {
  const res = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Authentication failed')
  return data
}

export async function fetchAdminStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/stats`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Failed to fetch admin stats:', err.message)
    return {
      articles: 0,
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
    }
  }
}

// ─── VISITOR ANALYTICS API ────────────────────────────────────────────────
export async function fetchAnalyticsSummary() {
  try {
    const res = await fetch(`${API_BASE_URL}/analytics/summary`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Failed to fetch analytics summary:', err.message)
    return {
      totalUniqueVisitors: 0,
      totalPageViews: 0,
      todayUniqueVisitors: 0,
      todayPageViews: 0,
      sevenDaysData: [],
      topPages: [],
      devices: [],
      recentVisits: []
    }
  }
}

// ─── SUBSCRIBERS & EMAIL BROADCASTS API ────────────────────────────────────
export async function fetchSubscribers(params = {}) {
  try {
    const query = new URLSearchParams(params).toString()
    const res = await fetch(`${API_BASE_URL}/subscribers${query ? `?${query}` : ''}`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Failed to fetch subscribers:', err.message)
    return []
  }
}

export async function deleteSubscriber(id) {
  const res = await fetch(`${API_BASE_URL}/subscribers/${id}`, {
    method: 'DELETE'
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to delete subscriber')
  return data
}

export async function updateSubscriberStatus(id, status) {
  const res = await fetch(`${API_BASE_URL}/subscribers/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to update subscriber status')
  return data
}

export async function sendNewsletterCampaign(payload) {
  const res = await fetch(`${API_BASE_URL}/newsletter/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to send campaign')
  return data
}

export async function fetchCampaigns() {
  try {
    const res = await fetch(`${API_BASE_URL}/newsletter/campaigns`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Failed to fetch campaigns:', err.message)
    return []
  }
}

// ─── CMS & SITE SETTINGS ─────────────────────────────────────────────────
export async function fetchSettings() {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Using default site settings fallback:', err.message)
    return {
      orgName: 'Swayamkrushi',
      tagline: 'A Haven for the Mentally Challenged Since 1987',
      phone1: '+91 9704245454',
      phone2: '+91 9963766729',
      email: 'swayamkrushimk@gmail.com',
      address: 'Survey No.687, 688, Jawaharnagar Village, Chennapur, Shamirpet Mandal, Secunderabad, Telangana.',
      regNo: 'Registered under Societies Registration Act & National Trust Act',
      founderQuote: 'From small beginnings in 1987 with 3 adults to a thriving lifelong residential sanctuary and vocational hub.',
      bankName: 'State Bank of India',
      accountNumber: '30248492048',
      ifscCode: 'SBIN0011662',
      upiId: 'swayamkrushi@sbi'
    }
  }
}

export async function updateSettings(settings) {
  const res = await fetch(`${API_BASE_URL}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to update settings')
  return data
}

// ─── ARTICLES API ──────────────────────────────────────────────────────────
export async function fetchArticles(params = {}) {
  try {
    const query = new URLSearchParams(params).toString()
    const url = `${API_BASE_URL}/articles${query ? `?${query}` : ''}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Backend API error:', err.message)
    return []
  }
}

export async function createArticle(articleData) {
  const res = await fetch(`${API_BASE_URL}/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to create article')
  return data
}

export async function updateArticle(id, articleData) {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to update article')
  return data
}

export async function deleteArticle(id) {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'DELETE'
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to delete article')
  return data
}

// ─── ACCOLADES & RECOGNITION API ───────────────────────────────────────────
export async function fetchAccolades() {
  try {
    const res = await fetch(`${API_BASE_URL}/accolades`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Backend API error for accolades:', err.message)
    return { featured: null, timeline: [], certificates: [] }
  }
}

export async function createAccolade(data) {
  const res = await fetch(`${API_BASE_URL}/accolades`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  const resData = await res.json()
  if (!res.ok) throw new Error(resData.error || 'Failed to create accolade')
  return resData
}

export async function updateAccolade(id, data) {
  const res = await fetch(`${API_BASE_URL}/accolades/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  const resData = await res.json()
  if (!res.ok) throw new Error(resData.error || 'Failed to update accolade')
  return resData
}

export async function deleteAccolade(id) {
  const res = await fetch(`${API_BASE_URL}/accolades/${id}`, {
    method: 'DELETE'
  })
  const resData = await res.json()
  if (!res.ok) throw new Error(resData.error || 'Failed to delete accolade')
  return resData
}

// ─── CERTIFICATES API ──────────────────────────────────────────────────────
export async function fetchCertificates() {
  try {
    const res = await fetch(`${API_BASE_URL}/certificates`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Backend API error for certificates:', err.message)
    return []
  }
}

export async function createCertificate(data) {
  const res = await fetch(`${API_BASE_URL}/certificates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  const resData = await res.json()
  if (!res.ok) throw new Error(resData.error || 'Failed to create certificate')
  return resData
}

export async function deleteCertificate(id) {
  const res = await fetch(`${API_BASE_URL}/certificates/${id}`, {
    method: 'DELETE'
  })
  const resData = await res.json()
  if (!res.ok) throw new Error(resData.error || 'Failed to delete certificate')
  return resData
}

// ─── FAQS API ──────────────────────────────────────────────────────────────
export async function fetchFaqs() {
  try {
    const res = await fetch(`${API_BASE_URL}/faqs`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Backend API error for FAQs:', err.message)
    return []
  }
}

export async function createFaq(data) {
  const res = await fetch(`${API_BASE_URL}/faqs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  const resData = await res.json()
  if (!res.ok) throw new Error(resData.error || 'Failed to create FAQ')
  return resData
}

export async function updateFaq(id, data) {
  const res = await fetch(`${API_BASE_URL}/faqs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  const resData = await res.json()
  if (!res.ok) throw new Error(resData.error || 'Failed to update FAQ')
  return resData
}

export async function deleteFaq(id) {
  const res = await fetch(`${API_BASE_URL}/faqs/${id}`, {
    method: 'DELETE'
  })
  const resData = await res.json()
  if (!res.ok) throw new Error(resData.error || 'Failed to delete FAQ')
  return resData
}

// ─── INQUIRIES API ─────────────────────────────────────────────────────────
export async function fetchInquiries() {
  try {
    const res = await fetch(`${API_BASE_URL}/inquiries`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Backend API error for inquiries:', err.message)
    return []
  }
}

export async function updateInquiryStatus(id, status) {
  const res = await fetch(`${API_BASE_URL}/inquiries/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  })
  const resData = await res.json()
  if (!res.ok) throw new Error(resData.error || 'Failed to update inquiry status')
  return resData
}

export async function deleteInquiry(id) {
  const res = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
    method: 'DELETE'
  })
  const resData = await res.json()
  if (!res.ok) throw new Error(resData.error || 'Failed to delete inquiry')
  return resData
}

// ─── INSIDERS VIDEO STORIES API ───────────────────────────────────────────
export async function fetchInsiders(params = {}) {
  try {
    const query = new URLSearchParams(params).toString()
    const url = `${API_BASE_URL}/insiders/admin${query ? `?${query}` : ''}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Backend API error for insiders:', err.message)
    return []
  }
}

export async function createInsider(insiderData) {
  const res = await fetch(`${API_BASE_URL}/insiders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(insiderData)
  })
  const resData = await res.json()
  if (!res.ok) throw new Error(resData.error || 'Failed to create insider story')
  return resData
}

export async function updateInsider(id, insiderData) {
  const res = await fetch(`${API_BASE_URL}/insiders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(insiderData)
  })
  const resData = await res.json()
  if (!res.ok) throw new Error(resData.error || 'Failed to update insider story')
  return resData
}

export async function deleteInsider(id) {
  const res = await fetch(`${API_BASE_URL}/insiders/${id}`, {
    method: 'DELETE'
  })
  const resData = await res.json()
  if (!res.ok) throw new Error(resData.error || 'Failed to delete insider story')
  return resData
}

// ─── CLOUDINARY DIRECT MEDIA UPLOAD HELPER (Images & Videos) ────────────────
export async function uploadImage(file) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('resourceType', 'image')

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData
  })
  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Image upload failed')
  }
  return data.url
}

export async function uploadMedia(file, resourceType = 'video') {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('resourceType', resourceType)

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData
  })
  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Media upload failed')
  }
  return data.url
}

// ─── MANAGING COMMITTEE API ───────────────────────────────────────────────
const COMMITTEE_STORAGE_KEY = 'swayamkrushi_committee_members'

export async function fetchCommitteeMembers() {
  try {
    const res = await fetch(`${API_BASE_URL}/committee`)
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem(COMMITTEE_STORAGE_KEY, JSON.stringify(data))
        return data
      }
    }
  } catch (err) {
    console.warn('Backend API error for committee:', err.message)
  }
  const local = localStorage.getItem(COMMITTEE_STORAGE_KEY)
  if (local) {
    try {
      const parsed = JSON.parse(local)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    } catch {}
  }
  return []
}

export async function createCommitteeMember(memberData) {
  try {
    const res = await fetch(`${API_BASE_URL}/committee`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memberData)
    })
    if (res.ok) {
      const saved = await res.json()
      const list = JSON.parse(localStorage.getItem(COMMITTEE_STORAGE_KEY) || '[]')
      list.push(saved)
      localStorage.setItem(COMMITTEE_STORAGE_KEY, JSON.stringify(list))
      return saved
    }
  } catch {}
  const list = JSON.parse(localStorage.getItem(COMMITTEE_STORAGE_KEY) || '[]')
  const newMember = { ...memberData, id: memberData.id || 'member-' + Date.now(), _id: 'local-' + Date.now() }
  list.push(newMember)
  localStorage.setItem(COMMITTEE_STORAGE_KEY, JSON.stringify(list))
  return newMember
}

export async function updateCommitteeMember(id, memberData) {
  try {
    const res = await fetch(`${API_BASE_URL}/committee/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memberData)
    })
    if (res.ok) {
      const updated = await res.json()
      const list = JSON.parse(localStorage.getItem(COMMITTEE_STORAGE_KEY) || '[]')
      const idx = list.findIndex((m) => m.id === id || m._id === id)
      if (idx !== -1) list[idx] = updated
      localStorage.setItem(COMMITTEE_STORAGE_KEY, JSON.stringify(list))
      return updated
    }
  } catch {}
  const list = JSON.parse(localStorage.getItem(COMMITTEE_STORAGE_KEY) || '[]')
  const idx = list.findIndex((m) => m.id === id || m._id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...memberData }
    localStorage.setItem(COMMITTEE_STORAGE_KEY, JSON.stringify(list))
    return list[idx]
  }
  return memberData
}

export async function deleteCommitteeMember(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/committee/${id}`, { method: 'DELETE' })
    if (res.ok) {
      const list = JSON.parse(localStorage.getItem(COMMITTEE_STORAGE_KEY) || '[]')
      const filtered = list.filter((m) => m.id !== id && m._id !== id)
      localStorage.setItem(COMMITTEE_STORAGE_KEY, JSON.stringify(filtered))
      return await res.json()
    }
  } catch {}
  const list = JSON.parse(localStorage.getItem(COMMITTEE_STORAGE_KEY) || '[]')
  const filtered = list.filter((m) => m.id !== id && m._id !== id)
  localStorage.setItem(COMMITTEE_STORAGE_KEY, JSON.stringify(filtered))
  return { success: true }
}

// ─── MEDIA BUZZ API ───────────────────────────────────────────────────────
const MEDIA_BUZZ_STORAGE_KEY = 'swayamkrushi_media_buzz'

export async function fetchMediaBuzz() {
  try {
    const res = await fetch(`${API_BASE_URL}/media-buzz`)
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem(MEDIA_BUZZ_STORAGE_KEY, JSON.stringify(data))
        return data
      }
    }
  } catch (err) {
    console.warn('Backend API error for media-buzz:', err.message)
  }
  const local = localStorage.getItem(MEDIA_BUZZ_STORAGE_KEY)
  if (local) {
    try {
      const parsed = JSON.parse(local)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    } catch {}
  }
  return []
}

export async function createMediaBuzz(articleData) {
  try {
    const res = await fetch(`${API_BASE_URL}/media-buzz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(articleData)
    })
    if (res.ok) {
      const saved = await res.json()
      const list = JSON.parse(localStorage.getItem(MEDIA_BUZZ_STORAGE_KEY) || '[]')
      list.unshift(saved)
      localStorage.setItem(MEDIA_BUZZ_STORAGE_KEY, JSON.stringify(list))
      return saved
    }
  } catch {}
  const list = JSON.parse(localStorage.getItem(MEDIA_BUZZ_STORAGE_KEY) || '[]')
  const newItem = { ...articleData, id: articleData.id || 'buzz-' + Date.now(), _id: 'local-' + Date.now() }
  list.unshift(newItem)
  localStorage.setItem(MEDIA_BUZZ_STORAGE_KEY, JSON.stringify(list))
  return newItem
}

export async function updateMediaBuzz(id, articleData) {
  try {
    const res = await fetch(`${API_BASE_URL}/media-buzz/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(articleData)
    })
    if (res.ok) {
      const updated = await res.json()
      const list = JSON.parse(localStorage.getItem(MEDIA_BUZZ_STORAGE_KEY) || '[]')
      const idx = list.findIndex((a) => a.id === id || a._id === id)
      if (idx !== -1) list[idx] = updated
      localStorage.setItem(MEDIA_BUZZ_STORAGE_KEY, JSON.stringify(list))
      return updated
    }
  } catch {}
  const list = JSON.parse(localStorage.getItem(MEDIA_BUZZ_STORAGE_KEY) || '[]')
  const idx = list.findIndex((a) => a.id === id || a._id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...articleData }
    localStorage.setItem(MEDIA_BUZZ_STORAGE_KEY, JSON.stringify(list))
    return list[idx]
  }
  return articleData
}

export async function deleteMediaBuzz(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/media-buzz/${id}`, { method: 'DELETE' })
    if (res.ok) {
      const list = JSON.parse(localStorage.getItem(MEDIA_BUZZ_STORAGE_KEY) || '[]')
      const filtered = list.filter((a) => a.id !== id && a._id !== id)
      localStorage.setItem(MEDIA_BUZZ_STORAGE_KEY, JSON.stringify(filtered))
      return await res.json()
    }
  } catch {}
  const list = JSON.parse(localStorage.getItem(MEDIA_BUZZ_STORAGE_KEY) || '[]')
  const filtered = list.filter((a) => a.id !== id && a._id !== id)
  localStorage.setItem(MEDIA_BUZZ_STORAGE_KEY, JSON.stringify(filtered))
  return { success: true }
}
